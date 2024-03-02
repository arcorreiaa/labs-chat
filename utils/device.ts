import { Platform } from "react-native";

export const onIphone = Platform.OS === "ios";

export const onAndroid = Platform.OS === "android";
