import { Stack } from "expo-router";
import React from "react";
import { Provider } from "react-native-paper";

const Layout = () => {
  return (
    <Provider>
      <Stack screenOptions={{ headerShown: false }} />
    </Provider>
  );
};

export default Layout;
