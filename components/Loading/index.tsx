import React from "react";
import { View } from "react-native";

import LottieView from "lottie-react-native";

interface ILoadingProps {
  size: number;
}

export default function Loading({ size }: ILoadingProps) {
  return (
    <View style={{ height: size, aspectRatio: 1 }}>
      <LottieView
        style={{ flex: 1 }}
        source={require("../../assets/images/loading.json")}
        autoPlay
        loop
      />
    </View>
  );
}
