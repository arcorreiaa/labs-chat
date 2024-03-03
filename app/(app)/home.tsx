import { useAuth } from "@/context/authContext";
import React from "react";
import { Button, Text, View } from "react-native";

export default function Home() {
  const { logout, user } = useAuth();

  const onLogout = async () => {
    await logout();
  };

  console.log("usuario", user);

  return (
    <View>
      <Text>Home</Text>

      <Button title="Sair" onPress={onLogout} />
    </View>
  );
}
