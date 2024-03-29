import { Octicons } from "@expo/vector-icons";
import React, { ReactNode, useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

interface ICustomInputProps extends TextInputProps {
  icon?: ReactNode;
  isPassword?: boolean;
  isError?: boolean;
  errorTitle?: string;
}

export default function CustomInput({
  isPassword,
  icon,
  isError,
  errorTitle,
  ...rest
}: ICustomInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(isPassword);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <View>
      <View className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl h-14 justify-center ">
        {icon && icon}
        <TextInput
          {...rest}
          className=" flex-1 font-semibold text-neutral-700"
          placeholderTextColor={"gray"}
          secureTextEntry={isPassword && isPasswordVisible}
        />
        {isPassword && (
          <Pressable onPress={togglePasswordVisibility}>
            <Text>
              {isPasswordVisible ? (
                <Octicons name="eye-closed" size={20} color="gray" />
              ) : (
                <Octicons name="eye" size={20} color="gray" />
              )}
            </Text>
          </Pressable>
        )}
      </View>
      {isError && (
        <Text
          style={{ fontSize: 10 }}
          className="text-[red] flex self-end mr-4 mt-[5px]"
        >
          {errorTitle}
        </Text>
      )}
    </View>
  );
}
