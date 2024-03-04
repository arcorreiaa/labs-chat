import React from "react";
import { ScrollView } from "react-native";
import { Message } from "@/types/message";
import MessageItem from "../MessageItem";

interface IMessageListProps {
  messages: [];
  currentUser: [];
  scrollViewRef: unknown;
}

export default function MessageList({
  messages,
  currentUser,
  scrollViewRef,
}: IMessageListProps) {
  return (
    <ScrollView
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10 }}
    >
      {messages?.map((message, index) => {
        return (
          <MessageItem
            message={message}
            key={index}
            currentUser={currentUser}
          />
        );
      })}
    </ScrollView>
  );
}
