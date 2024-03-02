import { onIphone } from "@/utils/device";
import React, { ReactNode } from "react";
import { KeyboardAvoidingView, ScrollView, TextInputProps } from "react-native";

interface ICustomKeyboardViewProps extends TextInputProps {
  children?: ReactNode;
}

export default function CustomKeyboardView({
  children,
}: ICustomKeyboardViewProps) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={onIphone ? "padding" : "height"}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
