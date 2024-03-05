import React from "react";
import { FlatList, Text, View } from "react-native";
import ChatItem from "../ChatItem";
import { useRouter } from "expo-router";
import { IUser } from "@/types/user";

interface IChatListProps {
  users: IUser[];
  currentUser: [];
}

export default function ChatList({ users, currentUser }: IChatListProps) {
  const router = useRouter();
  return (
    <View className="flex-1">
      <FlatList
        data={users}
        contentContainerStyle={{ flex: 1, paddingVertical: 25 }}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ChatItem
            router={router}
            noBorder={index + 1 === users.length}
            item={item}
            index={index}
            currentUser={currentUser}
          />
        )}
      />
    </View>
  );
}
