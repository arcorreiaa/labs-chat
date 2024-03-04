import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ChatRoomHeader from "@/components/Header/ChatRoomHeader";
import MessageList from "@/components/MessageList";
import { Feather } from "@expo/vector-icons";
import CustomKeyboardView from "@/components/Keyboard";
import { useAuth } from "@/context/authContext";
import { getRoomId } from "@/utils/commons";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";

interface IChatRoomProps {}

export default function ChatRoom({}: IChatRoomProps) {
  const useItem = useLocalSearchParams(); //segundo usuario
  const { user } = useAuth(); //usuario logado
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const textRef = useRef<string>("");
  const inputRef = useRef<TextInput>(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    createRoomIfNotExists();

    let roomId = getRoomId(user?.userId, useItem?.userId);
    const docRef = doc(db, "rooms", roomId);

    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setMessages([...allMessages]);
    });

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      updateScrollView
    );

    return () => {
      unsub();
      keyboardDidShowListener.remove();
    };
  }, []);

  const createRoomIfNotExists = async () => {
    let roomId = getRoomId(user?.userId, useItem?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const onCleanWhenSend = () => {
    textRef.current = "";
    if (inputRef)
      (inputRef as { current?: { clear?: () => void } })?.current?.clear?.();
  };

  const sendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;

    try {
      let roomId = getRoomId(user?.userId, useItem?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messageRef = collection(docRef, "messages");
      onCleanWhenSend();
      const newDoc = await addDoc(messageRef, {
        userId: user?.userId,
        text: message,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      Alert.alert("Mensagem", error.message);
    }
  };

  useEffect(() => {
    updateScrollView();
  }, [messages]);

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <CustomKeyboardView inChat={true}>
      <View className="flex-1 bg-[#f5f7f6] ">
        <StatusBar style="dark" />
        <ChatRoomHeader useItem={useItem} router={router} />

        <View className="h-3 border-b border-neutral-300" />

        <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
          <View className="flex-1">
            <MessageList
              scrollViewRef={scrollViewRef}
              messages={messages}
              currentUser={user}
            />
          </View>

          <View className="pt-2" style={{ marginBottom: 20 }}>
            <View className="flex-row justify-between mx-3 bg-white border p-2 border-neutral-300 rounded-full pl-5">
              <TextInput
                ref={inputRef}
                onChangeText={(value) => (textRef.current = value)}
                placeholder="Mensagem..."
                style={{
                  fontSize: 16,
                  flex: 1,
                  marginRight: 2,
                  textAlignVertical: "top",
                }}
                className="flex-1 mr-2"
                multiline={true}
              />

              <TouchableOpacity
                style={{
                  width: 35,
                  height: 35,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={sendMessage}
                className="bg-[#caf4dd] p-2 mr-[1px] rounded-full "
              >
                <Feather name="send" size={20} color={"#737373"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}
