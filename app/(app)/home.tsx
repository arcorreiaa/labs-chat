import ChatList from "@/components/ChatList";
import Loading from "@/components/Loading";
import { useAuth } from "@/context/authContext";
import { usersRef } from "@/firebaseConfig";
import { IUser } from "@/types/user";
import { StatusBar } from "expo-status-bar";
import { getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

export default function Home() {
  const { user } = useAuth();
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (user?.uid) {
      getUsers();
    }
  }, []);

  const getUsers = async () => {
    const q = query(usersRef, where("userId", "!=", user?.uid));
    const querySnapshot = await getDocs(q);
    let data: IUser[] = [];

    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() } as IUser);
    });

    setUsers(data);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      {users.length > 0 ? (
        <ChatList users={users} />
      ) : (
        <View className="flex items-center justify-center h-full ">
          <Loading size={60} />
        </View>
      )}
    </View>
  );
}
