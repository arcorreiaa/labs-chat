import { Alert } from "react-native";

export const validatorEmailAndPassword = (email: string, password: string) => {
  if (!email || !password) {
    Alert.alert("Por favor, preencha todos os campos!");
    return;
  }
};

export const validatorRegister = (
  email: string,
  password: string,
  userName: string,
  profile: string
) => {
  if (!email || !password || !userName || !profile) {
    Alert.alert("Por favor, preencha todos os campos!");
    return;
  }
};
