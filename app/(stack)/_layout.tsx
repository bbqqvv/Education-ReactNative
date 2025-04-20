// app/stack/_layout.js
import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Ẩn mặc định cho tất cả
      }}
    />
  );
}