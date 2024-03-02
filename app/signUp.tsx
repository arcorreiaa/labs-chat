import React, { useRef, useState } from "react";
import { Image, Pressable, StatusBar, Text, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import CustomButton from "@/components/Button";
import { useRouter } from "expo-router";
import CustomInput from "@/components/Input";
import Loading from "@/components/Loading";
import { validatorRegister } from "@/utils/validator";
import { Feather } from "@expo/vector-icons";
import CustomKeyboardView from "@/components/Keyboard";

export default function SignUp() {
  const router = useRouter();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const userNameRef = useRef("");
  const profileRef = useRef("");

  const [loading, setLoading] = useState(false);

  const onCreateAccount = async () => {
    validatorRegister(
      emailRef.current,
      passwordRef.current,
      userNameRef.current,
      profileRef.current
    );
  };

  return (
    <CustomKeyboardView className="flex-1">
      <StatusBar barStyle={"dark-content"} />

      <View
        className="flex-1 gap-12"
        style={{ paddingTop: 16, paddingHorizontal: 10 }}
      >
        <View className="items-center flex">
          <Image
            style={{ height: 300, width: 200 }}
            resizeMode="contain"
            source={require("../assets/images//register.png")}
          />
        </View>

        <View className="gap-10">
          <Text className="font=-bold tracking-wider text-center text-neutral-800 text-4xl ">
            Criar conta
          </Text>

          <View className="gap-4">
            <CustomInput
              onChangeText={(value) => (userNameRef.current = value)}
              placeholder="Nome"
              icon={<Feather name="user" size={20} color="gray" />}
            />

            <CustomInput
              onChangeText={(value) => (emailRef.current = value)}
              placeholder="E-mail"
              isPassword={false}
              icon={<Octicons name="mail" size={20} color="gray" />}
              inputMode="email"
            />

            <CustomInput
              onChangeText={(value) => (passwordRef.current = value)}
              placeholder="Senha"
              icon={<Octicons name="lock" size={20} color="gray" />}
              isPassword={true}
            />

            <CustomInput
              onChangeText={(value) => (profileRef.current = value)}
              placeholder="Link da imagem"
              icon={<Feather name="image" size={20} color="gray" />}
            />

            <View>
              {loading ? (
                <View className="flex-row justify-center">
                  <Loading size={44} />
                </View>
              ) : (
                <CustomButton title="Criar conta" onPress={onCreateAccount} />
              )}
            </View>

            <View className="flex-row justify-center gap-2">
              <Text className="font-semibold text-neutral-500 text-[12px]">
                Já tem uma conta?
              </Text>

              <Pressable onPress={() => router.push("/signIn")}>
                <Text className="font-bold text-indigo-500 text-[12px]">
                  Entrar
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
