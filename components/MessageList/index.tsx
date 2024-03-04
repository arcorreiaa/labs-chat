import React from "react";
import { Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ChatRoomHeader from "@/components/Header/ChatRoomHeader";

interface IMessageListProps {
  messages?: [];
}

export default function MessageList({ messages }: IMessageListProps) {
  return (
    <View className="">
      <Text>MessageList</Text>
    </View>
  );
}
