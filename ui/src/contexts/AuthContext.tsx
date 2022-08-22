import React, { useMemo, useState } from "react";
import jwtDecode, { InvalidTokenError } from "jwt-decode";

interface State {
  token?: string | null;
  username: string;
  name: string;
  setToken: (token: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

export const AuthContext = React.createContext<State>({
  username: "",
  name: "",
  setToken: (token) => {},
  isLoggedIn: false,
  logout: () => {},
});

const stateFromToken = (token: string) => {
  try {
    const data: { username: string; name: string } | undefined | null =
      jwtDecode(token);
    if (data && typeof data === "object") {
      return {
        username: data.username,
        name: data.name,
        token,
      };
    }
  } catch (e) {}
  return {
    name: "",
    username: "",
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<
    Omit<State, "setToken" | "isLoggedIn" | "logout">
  >(stateFromToken(localStorage.getItem("token") ?? ""));

  const isLoggedIn = useMemo(
    () => typeof state.token === "string" && state.token !== "",
    [state.token]
  );

  const logout = () => {
    setState({ token: undefined, name: "", username: "" });
    localStorage.removeItem("token");
  };

  const setToken = (token: string) => {
    if (token !== "") {
      setState(stateFromToken(token));
      localStorage.setItem("token", token);
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, setToken, isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
