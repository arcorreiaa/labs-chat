import React, { useRef, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import CustomButton from "@/components/Button";
import { useRouter } from "expo-router";
import CustomInput from "@/components/Input";
import Loading from "@/components/Loading";
import { validatorEmailAndPassword } from "@/utils/validator";
import CustomKeyboardView from "@/components/Keyboard";
import { useAuth } from "@/context/authContext";
import { handleUnavailable } from "@/utils/commons";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

export default function SignIn() {
  const { login } = useAuth();
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    const areFieldsValid = validatorEmailAndPassword(
      emailRef.current,
      passwordRef.current
    );

    if (areFieldsValid) {
      return;
    }

    setLoading(true);

    const response = await login(emailRef.current, passwordRef.current);

    setLoading(false);

    if (!response.success) {
      Toast.show({
        type: "error",
        text1: `Erro ao entrar na conta! ${response.msg}`,
        position: "top",
        topOffset: 70,
      });
    }
  };

  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />

      <View
        className="flex-1 gap-12"
        style={{ paddingTop: 40, paddingHorizontal: 10 }}
      >
        <View className="items-center flex mt-10">
          <Image
            style={{ height: 300, width: 400 }}
            resizeMode="contain"
            source={require("../assets/images//login2.jpeg")}
          />
        </View>

        <View className="gap-10">
          <Text className="font=-bold tracking-wider text-center text-neutral-800 text-4xl ">
            Entrar
          </Text>

          <View className="gap-4">
            <CustomInput
              onChangeText={(value) => (emailRef.current = value)}
              placeholder="E-mail"
              icon={<Octicons name="mail" size={20} color="gray" />}
              inputMode="email"
            />

            <View className="gap-3">
              <CustomInput
                onChangeText={(value) => (passwordRef.current = value)}
                placeholder="Senha"
                icon={<Octicons name="lock" size={20} color="gray" />}
                isPassword={true}
              />
              <Pressable onPress={handleUnavailable}>
                <Text className="font-semibold text-right text-[12px] text-neutral-500">
                  Esqueceu a senha?
                </Text>
              </Pressable>
            </View>

            <View>
              {loading ? (
                <View className="flex-row justify-center">
                  <Loading size={44} />
                </View>
              ) : (
                <CustomButton title="Entrar" onPress={onLogin} />
              )}
            </View>

            <View className="flex-row justify-center gap-2">
              <Text className="font-semibold text-neutral-500 text-[12px]">
                Não tem uma conta?
              </Text>

              <Pressable onPress={() => router.push("/signUp")}>
                <Text className="font-bold  text-[#3ebb7a] text-[12px]">
                  Criar conta
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <Toast />
    </CustomKeyboardView>
  );
}
