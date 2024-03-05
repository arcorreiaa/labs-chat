import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { IUserDto } from "@/types/user";

type AuthState = boolean | undefined;

interface IAuthContext {
  user: IUserDto | null;
  isAuthenticated: AuthState;
  updateUserData: (userId: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    email: string,
    password: string,
    userName: string,
    profileUrl: string
  ) => Promise<{ success: boolean; data?: IUserDto | null; msg?: string }>;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  isAuthenticated: undefined,
  updateUserData: async (userId: string) => {},
  login: async (email: string, password: string) => {},
  logout: async () => {},
  register: async (
    email: string,
    password: string,
    userName: string,
    profileUrl: string
  ) => ({ success: false, msg: "Not implemented" }),
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUserDto | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<AuthState | undefined>(
    undefined
  );

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user as unknown as IUserDto);
        updateUserData(user.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return unsub;
  }, []);

  const updateUserData = async (userId: string) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUser((prevUser) => ({
        ...prevUser,
        username: docSnap.data().userName,
        profileUrl: docSnap.data().profileUrl,
        userId: docSnap.data().userId,
      }));
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response.user, "usuario login");
      return { success: true };
    } catch (error) {
      console.log(error, "erro login");
      let msg = error.message;

      if (msg.includes("(auth/invalid-email)")) msg = "E-mail inválido";

      if (msg.includes("auth/invalid-credential)")) msg = "Senha inválida";

      return { success: false, msg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, msg: error.message, error: error };
    }
  };

  const register = async (
    email: string,
    password: string,
    userName: string,
    profileUrl: string
  ) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", response?.user?.uid), {
        userName,
        profileUrl,
        userId: response?.user?.uid,
      });

      return { success: true, data: response?.user };
    } catch (error) {
      let msg = error.message;

      if (msg.includes("(auth/invalid-email)")) {
        msg = "E-mail inválido";
      }

      if (msg.includes("(auth/email-already-in-use)")) {
        msg = "Este email já está em uso!";
      }

      if (msg.includes("auth/weak-password")) {
        msg = "Senha menor que 6 caracteres!";
      }

      return { success: false, msg };
    }
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
