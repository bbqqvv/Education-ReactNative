
import { Stack } from 'expo-router';
import "../global.css";
import { PersistGate } from 'redux-persist/integration/react';
import React from 'react';
import store, { persistor } from './store/store';
import { Provider } from 'react-redux';
export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </PersistGate>

    </Provider>

  );
}