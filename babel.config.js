module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // Remova a linha abaixo, pois expo-router/babel não é mais necessário
      // "expo-router/babel",
      "react-native-reanimated/plugin",
    ],
  };
};
