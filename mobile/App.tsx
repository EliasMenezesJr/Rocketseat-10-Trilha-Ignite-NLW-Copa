import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { NativeBaseProvider, StatusBar } from "native-base";
import React from "react";

import { Loading } from "./src/conponents/Loading";
import { THEME } from "./src/styles/theme";
import { SignIn } from "./src/screens/SignIn";

export default function App() {
  const [fontsLoader] = useFonts({
    useFonts,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor='transparent'
        translucent
      />

      {fontsLoader ? <Loading /> : <SignIn />}
    </NativeBaseProvider>
  );
}
