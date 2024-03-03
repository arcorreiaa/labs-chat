import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import "../global.css";
import { AuthContextProvider, useAuth } from "@/context/authContext";
import { MenuProvider } from "react-native-popup-menu";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    //checa se o usuario esta autenticado ou não
    if (typeof isAuthenticated === "undefined") return;
    const inApp = segments[0] === "(app)";

    if (isAuthenticated && !inApp) {
      //redireciona pra home
      router.replace("/home");
    } else if (isAuthenticated === false) {
      router.replace("/signIn");
    }
  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
    </MenuProvider>
  );
}
