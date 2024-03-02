import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: undefined,
  login: async (email: string, password: string) => {},
  logout: async () => {},
  register: async (
    email: string,
    password: string,
    userName: string,
    profileUrl: string
  ) => {},
});

type AuthState = true | false | undefined;

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    //onAuthStateChanged

    setTimeout(() => {
      setIsAuthenticated(false);
    }, 3000);
  }, []);

  const login = async (email: string, password: string) => {
    try {
    } catch (error) {}
  };

  const logout = async () => {
    try {
    } catch (error) {}
  };

  const register = async (
    email: string,
    password: string,
    userName: string,
    profileUrl: string
  ) => {
    try {
    } catch (error) {}
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wraooed inside AuthContextProvider");
  }
  return value;
};
