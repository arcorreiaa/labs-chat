import { onIphone } from "@/utils/device";
import React, { ReactNode } from "react";
import { KeyboardAvoidingView, ScrollView, TextInputProps } from "react-native";

interface ICustomKeyboardViewProps extends TextInputProps {
  children?: ReactNode;
  inChat?: boolean;
}

export default function CustomKeyboardView({
  children,
  inChat,
}: ICustomKeyboardViewProps) {
  let kavConfig = {};
  let scrollViewConfig = {};

  if (inChat) {
    kavConfig = { keyboardVerticalOffset: 85 };
    scrollViewConfig = { contentContainerStyle: { flex: 1 } };
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={onIphone ? "padding" : "height"}
      {...kavConfig}
    >
      <ScrollView
        style={{ flex: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
        {...scrollViewConfig}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
