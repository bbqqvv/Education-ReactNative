
import { AuthProvider } from '@/context/AuthContext';
import { Stack } from 'expo-router';
import "../global.css";
export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="stack" options={{ headerShown: false }} /> */}
        <Stack.Screen name="+not-found" />
      </Stack>
    </AuthProvider>
  );
}
