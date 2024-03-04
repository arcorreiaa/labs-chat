import React from "react";
import { Alert, Pressable, Text, TouchableOpacity, View } from "react-native";
import { Router, Stack } from "expo-router";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

interface IChatRoomHeader {
  useItem: unknown;
  router: Router;
}

export default function ChatRoomHeader({ router, useItem }: IChatRoomHeader) {
  const onCall = () => {
    Alert.alert("Função não disponivel");
  };

  return (
    <Stack.Screen
      options={{
        title: "",
        headerShadowVisible: false,
        headerLeft: () => (
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={() => router.back()}>
              <Entypo name="chevron-left" size={30} color={"#737373"} />
            </TouchableOpacity>

            <View className="flex-row item-center gap-3">
              <Image
                source={useItem?.profileUrl}
                style={{ height: 30, width: 30, borderRadius: 15 }}
              />
            </View>
            <Text
              className="text-neutral-700 font-medium"
              style={{ fontSize: 16 }}
            >
              {useItem?.userName}
            </Text>
          </View>
        ),

        headerRight: () => (
          <View className="flex-row items-center gap-8">
            <Pressable onPress={onCall}>
              <Ionicons name="call" size={20} color={"#737373"} />
            </Pressable>

            <Pressable onPress={onCall}>
              <Ionicons name="videocam" size={20} color={"#737373"} />
            </Pressable>
          </View>
        ),
      }}
    />
  );
}
