import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ICustomButtonProps extends TouchableOpacityProps {
  title: string;
}

export default function CustomButton({ title, ...rest }: ICustomButtonProps) {
  return (
    <TouchableOpacity
      {...rest}
      className="bg-[#6bd49e] rounded-xl justify-center items-center h-14"
    >
      <Text className="text-white font-bold tracking-wider text-[18px]">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
