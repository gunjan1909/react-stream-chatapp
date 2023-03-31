import { FastifyInstance } from "fastify";
import { StreamChat } from "stream-chat";

//creating the stream chat application ig
const streamChat = StreamChat.getInstance(
  process.env.STREAM_API_KEY!,
  process.env.STREAM_PRIVATE_API_KEY!
);

// map token and userid
const TOKEN_USER_ID_MAP = new Map<string, string>();

export async function userRoutes(app: FastifyInstance) {
  //signup route
  app.post<{
    Body: {
      id: string;
      name: string;
      image?: string;
    };
  }>("/signup", async (req, res) => {
    const { id, name, image } = req.body;
    if (id == null || id === "" || name == null || name === "") {
      return res.status(400).send();
    }

    const existingUser = await streamChat.queryUsers({ id });
    if (existingUser.users.length > 0) {
      return res
        .status(400)
        .send(`User ID is already in use by ${existingUser.users[0].name}`);
    }
    await streamChat.upsertUser({ id, name, image });
  });

  //login route
  app.post<{
    Body: {
      id: string;
    };
  }>("/login", async (req, res) => {
    const { id } = req.body;
    if (id == null || id === "") {
      return res.status(400).send();
    }

    const {
      users: [user],
    } = await streamChat.queryUsers({ id });
    if (user == null) return res.status(401).send();

    const token = streamChat.createToken(id);
    TOKEN_USER_ID_MAP.set(token, user.id);

    return {
      token,
      user: {
        name: user.name,
        id: user.id,
        image: user.image,
      },
    };
  });

  //logout route
  app.post<{ Body: { token: string } }>("/logout", async (req, res) => {
    const token = req.body.token;
    if (token == null || token === "") return res.status(400).send();
    const id = TOKEN_USER_ID_MAP.get(token);
    if (id == null) return res.status(400).send();
    await streamChat.revokeUserToken(id, new Date());
    TOKEN_USER_ID_MAP.delete(token);
  });
}
