import React from "react";
import { FlatList, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { IUser } from "@/types/user";

interface IChatRoomProps {
  //   users: IUser[];
}

export default function ChatRoom({}: IChatRoomProps) {
  const useItem = useLocalSearchParams();

  console.log(useItem, "tela chat");
  return (
    <View className="">
      <Text>tela do chat</Text>
    </View>
  );
}
