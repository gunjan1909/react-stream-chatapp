import { useMutation } from "@tanstack/react-query";
import { UseMutationResult } from "@tanstack/react-query/build/lib/types";
import axios, { AxiosResponse } from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { StreamChat } from "stream-chat";
import { useLocalStorage } from "../hooks/useLocalStorage";

// type for authcontext
type AuthContext = {
  signup: UseMutationResult<AxiosResponse, unknown, User>;
  login: UseMutationResult<{ token: string; user: User }, unknown, string>;
  user?: User;
  streamChat?: StreamChat;
  logout: UseMutationResult<AxiosResponse, unknown, void>;
};

//type for the User
type User = {
  id: string;
  name: string;
  image?: string;
};

const Context = createContext<AuthContext | null>(null);

export function useAuth() {
  return useContext(Context) as AuthContext;
}

//make sure that user property is required else same as useAuth()
export function useLoggedInAuth() {
  return useContext(Context) as AuthContext &
    Required<Pick<AuthContext, "user">>;
}

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  //custom hook: same as useState just stores in the local storage
  const [user, setUser] = useLocalStorage<User>("user");
  const [token, setToken] = useLocalStorage<string>("token");
  const [streamChat, setStreamChat] = useState<StreamChat>();

  //signup route mutation react query backend connection and axios post
  const signup = useMutation({
    mutationFn: (user: User) => {
      return axios.post(`${import.meta.env.VITE_SERVER_URL}/signup`, user);
    },
    onSuccess() {
      navigate("/login");
    },
  });

  //login route mutation react query backend connection and post
  const login = useMutation({
    mutationFn: (id: string) => {
      return axios
        .post(`${import.meta.env.VITE_SERVER_URL}/login`, { id })
        .then((res) => {
          return res.data as { token: string; user: User };
        });
    },
    onSuccess(data) {
      setUser(data.user);
      setToken(data.token);
    },
  });

  //logout route mutation react query backend connection and post
  const logout = useMutation({
    mutationFn: () => {
      return axios.post(`${import.meta.env.VITE_SERVER_URL}/logout`, { token });
    },
    onSuccess() {
      setUser(undefined);
      setToken(undefined);
      setStreamChat(undefined);
    },
  });

  //set up a connection to Stream Chat API using the useEffect hook and the provided user and token props. It ensures that the connection is only set up once and that the cleanup function disconnects the user from Stream Chat API whenever the user and token props change.
  useEffect(() => {
    //console.log("AuthContext Useeffect");
    if (token == null || user == null) return;
    const chat = new StreamChat(import.meta.env.VITE_STREAM_API_KEY!);

    if (chat.tokenManager.token === token && chat.userID === user.id) return;

    let isInterrupted = false;
    const connectPromise = chat.connectUser(user, token).then(() => {
      if (isInterrupted) return;
      setStreamChat(chat);
    });

    return () => {
      isInterrupted = true;
      setStreamChat(undefined);

      connectPromise.then(() => {
        chat.disconnectUser();
      });
    };
  }, [token, user]);

  return (
    <Context.Provider value={{ signup, login, user, streamChat, logout }}>
      {children}
    </Context.Provider>
  );
}
