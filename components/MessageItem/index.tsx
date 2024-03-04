import React from "react";
import { Text, View } from "react-native";
import { Message } from "@/types/message";

interface IMessageItemProps {
  message: Message[];
  currentUser: [];
}

export default function MessageItem({
  message,
  currentUser,
}: IMessageItemProps) {
  if (currentUser?.userId === message?.userId) {
    return (
      <View className="flex-row justify-end mb-3 mr-3">
        <View style={{ width: 350 }}>
          <View className="flex self-end p-3 rounded-2xl bg-white border border-neutral-200">
            <Text style={{ fontSize: 14 }}>{message?.text}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{ width: 350 }} className="ml-3 mb-3">
        <View className="flex self-start p-3 px-4 rounded-2xl bg-indigo-100 border border-indigo-200">
          <Text style={{ fontSize: 14 }}>{message?.text}</Text>
        </View>
      </View>
    );
  }
}
