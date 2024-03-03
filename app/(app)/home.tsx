import { useAuth } from "@/context/authContext";
import React from "react";
import { Text, View } from "react-native";

export default function Home() {
  const { user } = useAuth();

  console.log("usuario", user);

  return (
    <View className="flex-1 bg-white">
      <Text>Home</Text>
    </View>
  );
}
