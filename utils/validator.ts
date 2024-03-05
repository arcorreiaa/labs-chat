import { Alert } from "react-native";
import Toast from "react-native-toast-message";

export const validatorEmailAndPassword = (email: string, password: string) => {
  if (!email || !password) {
    Toast.show({
      type: "error",
      text1: "Por favor, preencha todos os campos!",
      position: "top",
      topOffset: 70,
    });
    return true;
  }
};

export const validatorRegister = (
  email: string,
  password: string,
  userName: string,
  profile: string
) => {
  if (!email || !password || !userName || !profile) {
    Toast.show({
      type: "error",
      text1: "Por favor, preencha todos os campos!",
      position: "top",
      topOffset: 70,
    });
    return true;
  }
};
