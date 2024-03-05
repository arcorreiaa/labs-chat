import React from "react";
import { Alert, Pressable, Text, TouchableOpacity, View } from "react-native";
import { Router, Stack } from "expo-router";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { defaultImage, handleUnavailable } from "@/utils/commons";

interface IChatRoomHeader {
  useItem: unknown;
  router: Router;
}

export default function ChatRoomHeader({ router, useItem }: IChatRoomHeader) {
  return (
    <Stack.Screen
      options={{
        title: "",
        headerStyle: {
          backgroundColor: "#f5f7f6",
        },
        headerShadowVisible: false,
        headerLeft: () => (
          <View className="flex-row items-center gap-4 ">
            <TouchableOpacity onPress={() => router.back()}>
              <Entypo name="chevron-left" size={30} color={"#737373"} />
            </TouchableOpacity>

            <View className="flex-row item-center gap-3">
              <Image
                source={
                  useItem?.profileUrl ? useItem?.profileUrl : defaultImage
                }
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
            <Pressable onPress={handleUnavailable}>
              <Ionicons name="call" size={20} color={"#737373"} />
            </Pressable>

            <Pressable onPress={handleUnavailable}>
              <Ionicons name="videocam" size={20} color={"#737373"} />
            </Pressable>
          </View>
        ),
      }}
    />
  );
}
