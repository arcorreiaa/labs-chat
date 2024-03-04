import { onIphone } from "@/utils/device";
import React from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { blurhash, defaultImage, handleUnavailable } from "@/utils/commons";
import { useAuth } from "@/context/authContext";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import CustomMenuItems from "../Menu";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import Separator from "../Separator";

export default function HomeHeader() {
  const { top } = useSafeAreaInsets();
  const { user, logout } = useAuth();

  const onLogout = async () => {
    await logout();
  };

  const credit = () => {
    Alert.alert("Credito:  @arcoofc");
  };

  return (
    <View
      className="flex-row justify-between px-5 bg-[#6bd49e]  pb-6  shadow "
      style={{ paddingTop: onIphone ? top : top + 10 }}
    >
      <Pressable onPress={credit}>
        <Text style={{ fontSize: 22 }} className="font-medium text-white">
          Chat dos amigos
        </Text>
      </Pressable>

      <View>
        <Menu style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
          <Pressable onPress={handleUnavailable}>
            <Ionicons name="person-add" size={20} color={"darkgreen"} />
          </Pressable>
          <MenuTrigger>
            <Image
              style={{ height: 35, aspectRatio: 1, borderRadius: 100 }}
              source={user?.profileUrl ? user?.profileUrl : defaultImage}
              placeholder={blurhash}
              transition={500}
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                borderRadius: 10,
                borderCurve: "continuous",
                marginTop: 40,
                // marginLeft: -30,
                backgroundColor: "white",
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 0 },
                width: 160,
              },
            }}
          >
            <CustomMenuItems
              title="Perfil"
              action={handleUnavailable}
              value={null}
              icon={<Feather name="user" size={20} color="#737373" />}
            />
            <Separator />
            <CustomMenuItems
              title="Sair"
              action={onLogout}
              value={null}
              icon={<AntDesign name="logout" size={20} color="#737373" />}
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
}
