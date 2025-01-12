import { Text, View, Button, Alert } from "react-native";
import React from "react";
import useAuth from "@/hooks/auth/useAuth";

const Setting = () => {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert("Success", "You have been logged out.");
    } catch (error) {
      console.error("Logout failed:", error);
      Alert.alert("Error", "Logout failed. Please try again.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl mb-5">
        Welcome, {user?.username || "User"}!
      </Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Setting;