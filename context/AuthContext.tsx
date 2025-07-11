import { createContext, useEffect, useState } from "react";
import { api } from "../services/apiClient";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import router from "next/router";

type SignInCredentials = {
  email: string;
  password: string;
};

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  user: User;
  isAuthenticated: boolean;
};

export const authContext = createContext<AuthContextData>(
  {} as AuthContextData
);

let authChannel: BroadcastChannel;

function signOut() {
  destroyCookie(undefined, "nextauth.token");
  destroyCookie(undefined, "nextauth.refreshToken");

  authChannel.postMessage("signOut");

  router.push("/");
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case "signOut":
          signOut();
          break;
        default:
          break;
      }
    };
  }, []);

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { email, permissions, roles } = response?.data;
          setUser({ email, permissions, roles });
        })
        .catch(() => {
          destroyCookie(undefined, "nextauth.token");
          destroyCookie(undefined, "nextauth.refreshToken");

          router.push("/");
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      const { token, refreshToken, permissions, roles } = response.data;

      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setCookie(undefined, "nextauth.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setUser({ email, permissions, roles });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <authContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </authContext.Provider>
  );
}
