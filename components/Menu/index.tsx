import { useAuth } from "@/context/authContext";
import React, { ReactNode } from "react";
import { Button, Text, View } from "react-native";
import { MenuOption } from "react-native-popup-menu";

interface ICustomMenuItemsProps {
  title: string;
  action: (value: unknown) => void;
  value: unknown;
  icon: ReactNode;
}

export default function CustomMenuItems({
  action,
  icon,
  title,
  value,
}: ICustomMenuItemsProps) {
  return (
    <MenuOption onSelect={() => action(value)}>
      <View className="px-4 py-1 flex-row justify-between items-center">
        <Text
          style={{ fontSize: 16 }}
          className="font-semibold text-neutral-600"
        >
          {title}
        </Text>
        {icon}
      </View>
    </MenuOption>
  );
}
