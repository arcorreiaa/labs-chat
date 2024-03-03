import { onIphone } from "@/utils/device";
import React from "react";
import { Alert, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { blurhash } from "@/utils/commons";
import { useAuth } from "@/context/authContext";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import CustomMenuItems from "../Menu";
import { AntDesign, Feather } from "@expo/vector-icons";
import Separator from "../Separator";

export default function HomeHeader() {
  const { top } = useSafeAreaInsets();
  const defaultProfileImageUrl = "https://picsum.photos/seed/696/3000/2000";
  const { user, logout } = useAuth();

  const handleProfile = () => {
    Alert.alert("Tela ainda não disponivel");
  };

  const onLogout = async () => {
    await logout();
  };

  return (
    <View
      className="flex-row justify-between px-5 bg-indigo-400 pb-6 rounded-b-3xl shadow "
      style={{ paddingTop: onIphone ? top : top + 10 }}
    >
      <Text style={{ fontSize: 22 }} className="font-medium text-white">
        Bate Papo
      </Text>

      <View>
        <Menu>
          <MenuTrigger>
            <Image
              style={{ height: 35, aspectRatio: 1, borderRadius: 100 }}
              source={
                user?.profileUrl ? user?.profileUrl : defaultProfileImageUrl
              }
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
              action={handleProfile}
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
