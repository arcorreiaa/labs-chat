import { db } from "@/firebaseConfig";
import { ICreatedAt } from "@/types/message";
import { ICurrentUser, IUser } from "@/types/user";
import { blurhash, defaultImage, formatDate, getRoomId } from "@/utils/commons";
import { Image } from "expo-image";
import { Router } from "expo-router";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface IChatItemProps {
  item: IUser;
  index: number;
  noBorder: boolean;
  router: Router;
  currentUser: ICurrentUser;
}

type lastMessage = {
  userId?: string;
  text?: string;
  createdAt?: ICreatedAt;
};

export default function ChatItem({
  item,
  index,
  noBorder,
  router,
  currentUser,
}: IChatItemProps) {
  const [lastMessage, setLastMessage] = useState<lastMessage | undefined>(
    undefined
  );
  const openChatRoom = () => {
    router.push({ pathname: "/chatRoom", params: item });
  };

  useEffect(() => {
    let roomId = getRoomId(currentUser?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);

    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setLastMessage(allMessages[0] ? allMessages[0] : null);
    });

    return unsub;
  }, []);

  const renderTime = () => {
    if (lastMessage && lastMessage.createdAt) {
      let date = lastMessage.createdAt;

      if (date.seconds !== undefined) {
        return formatDate(new Date(date.seconds * 1000));
      }
    }
  };

  const renderLastMessage = () => {
    if (typeof lastMessage === undefined) return "Carregando...";
    if (lastMessage) {
      if (currentUser?.userId === lastMessage?.userId)
        return "Você: " + lastMessage.text;
      return lastMessage?.text;
    } else {
      return "Diga oi 👋🏼";
    }
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
        source={{ uri: item?.profileUrl ? item?.profileUrl : defaultImage }}
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
            {renderTime()}
          </Text>
        </View>
        <Text style={{ fontSize: 12 }} className="font-medium text-neutral-500">
          {renderLastMessage()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
