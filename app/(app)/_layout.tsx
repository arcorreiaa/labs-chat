import HomeHeader from "@/components/Header";
import { Stack } from "expo-router";
import React from "react";

export default function _Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          header: () => <HomeHeader />,
        }}
      />
    </Stack>
  );
}
