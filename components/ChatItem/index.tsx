import { IUser } from "@/types/user";
import { blurhash } from "@/utils/commons";
import { Image } from "expo-image";
import { Router } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

interface IChatItemProps {
  item: IUser[];
  index: number;
  noBorder: boolean;
  router: Router;
}

export default function ChatItem({
  item,
  index,
  noBorder,
  router,
}: IChatItemProps) {
  const openChatRoom = () => {
    router.push({ pathname: "/chatRoom", params: item });
  };

  return (
    <TouchableOpacity
      className={`flex-row justify-between mx-4 items-center gap-3 mb-4 pb-2 ${
        noBorder ? "" : "border-b border-b-neutral-200"
      }`}
      onPress={openChatRoom}
    >
      <Image
        style={{ height: 40, width: 40, borderRadius: 20 }}
        source={{ uri: item?.profileUrl }}
        placeholder={blurhash}
        transition={500}
      />
      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text
            className="font-semibold text-neutral-800"
            style={{ fontSize: 18 }}
          >
            {item?.userName}
          </Text>

          <Text
            className="font-medium text-neutral-500"
            style={{ fontSize: 12 }}
          >
            tempo
          </Text>
        </View>
        <Text style={{ fontSize: 12 }} className="font-medium text-neutral-500">
          Ultima mensagem
        </Text>
      </View>
    </TouchableOpacity>
  );
}
