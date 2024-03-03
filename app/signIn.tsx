import React, { useRef, useState } from "react";
import { Alert, Image, Pressable, StatusBar, Text, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import CustomButton from "@/components/Button";
import { useRouter } from "expo-router";
import CustomInput from "@/components/Input";
import Loading from "@/components/Loading";
import { validatorEmailAndPassword } from "@/utils/validator";
import CustomKeyboardView from "@/components/Keyboard";
import { useAuth } from "@/context/authContext";

export default function SignIn() {
  const { login } = useAuth();
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    validatorEmailAndPassword(emailRef.current, passwordRef.current);

    setLoading(true);

    const response = await login(emailRef.current, passwordRef.current);

    setLoading(false);

    if (!response.success) {
      Alert.alert("Erro ao entrar na conta", response.msg);
    }
  };

  return (
    <CustomKeyboardView>
      <StatusBar barStyle={"dark-content"} />

      <View
        className="flex-1 gap-12"
        style={{ paddingTop: 16, paddingHorizontal: 10 }}
      >
        <View className="items-center flex">
          <Image
            style={{ height: 300, width: 200 }}
            resizeMode="contain"
            source={require("../assets/images//login.png")}
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
            />

            <View className="gap-3">
              <CustomInput
                onChangeText={(value) => (passwordRef.current = value)}
                placeholder="Senha"
                icon={<Octicons name="lock" size={20} color="gray" />}
                isPassword={true}
              />
              <Text className="font-semibold text-right text-[12px] text-neutral-500">
                Esqueceu a senha?
              </Text>
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
                <Text className="font-bold text-indigo-500 text-[12px]">
                  Criar conta
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
