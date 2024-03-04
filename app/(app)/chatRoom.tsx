import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ChatRoomHeader from "@/components/Header/ChatRoomHeader";
import MessageList from "@/components/MessageList";
import { Feather } from "@expo/vector-icons";
import CustomKeyboardView from "@/components/Keyboard";

interface IChatRoomProps {}

export default function ChatRoom({}: IChatRoomProps) {
  const useItem = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState([]);

  return (
    <CustomKeyboardView inChat={true}>
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />
        <ChatRoomHeader useItem={useItem} router={router} />

        <View className="h-3 border-b border-neutral-300" />

        <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
          <View className="flex-1">
            <MessageList messages={messages} />
          </View>

          <View className="pt-2" style={{ marginBottom: 20 }}>
            <View className="flex-row justify-between mx-3 bg-white border p-2 border-neutral-300 rounded-full pl-5">
              <TextInput
                placeholder="Mensagem..."
                style={{ fontSize: 16 }}
                className="flex-1 mr-2"
              />

              <TouchableOpacity className="bg-neutral-200 p-2 mr-[1px] rounded-full">
                <Feather name="send" size={20} color={"#737373"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
