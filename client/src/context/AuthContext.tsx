import { useMutation } from "@tanstack/react-query";
import {
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query/build/lib/types";
import axios, { AxiosResponse } from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

type AuthContext = {
  signup: UseMutationResult<AxiosResponse, unknown, User>;
};

type User = {
  id: string;
  name: string;
  image?: string;
};

const Context = createContext<AuthContext | null>(null);

export function useAuth() {
  return useContext(Context) as AuthContext;
}

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();

  const signup = useMutation({
    mutationFn: (user: User) => {
      return axios.post(`${import.meta.env.VITE_SERVER_URL}/signup`, user);
    },
    /* onSuccess() {
      navigate("/login");
    },*/
  });

  return <Context.Provider value={{ signup }}>{children}</Context.Provider>;
}
