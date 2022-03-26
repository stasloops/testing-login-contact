import { createContext } from "react";

export const AuthContext = createContext({
  isLoaded: false,
  user: null,
  token: null,
  setUser: (foo: object) => {},
  setToken: (foo: object) => {},
  logOut: () => {},
});
