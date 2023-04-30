import { config } from "dotenv";
config();

import fastify from "fastify";
import cors from "@fastify/cors";
import { userRoutes } from "./routes/users";

//create new fastify app(same as express)
const app = fastify();

// register the client url with cors
app.register(cors, {
  origin: process.env.CLIENT_URL,
});

//register user routes
app.register(userRoutes);

//start server and console log
app.listen({ port: parseInt(process.env.PORT!) }).then(() => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
