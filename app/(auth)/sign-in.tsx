import React, { useState, useCallback, useEffect } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import useAuth from "@/hooks/auth/useAuth";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function LoginPage() {
  const { handleLogin, loading, error } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [localError, setLocalError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

  const handleSubmit = async () => {
    if (!username || !password) {
      setLocalError("Còn thiếu trường người dùng hoặc mật khẩu.");
      return;
    }

    setLocalError(""); // Reset local error message

    try {
      const response = await handleLogin(username, password);
      if (response?.token) {
        router.replace("/(tabs)/home");
      } else {
        setLocalError("Invalid username or password.");
      }
    } catch (err) {
      console.error("Login failed", err);
      setLocalError("Login failed. Please try again.");
    }
  };

  const handleTogglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-gray-100">
      <View className="w-11/12 max-w-md p-5 bg-white rounded-lg shadow-md">
        <Text className="text-2xl font-bold text-gray-800 mb-5 text-center">
          Login to Your Account
        </Text>

        {/* Username Input */}
        <View className="mb-4">
          <Text className="text-sm text-gray-600 mb-1">Username</Text>
          <TextInput
            className="bg-gray-100 border border-gray-300 rounded p-2 text-base text-gray-800"
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View className="mb-4">
          <Text className="text-sm text-gray-600 mb-1">Password</Text>
          <View className="flex-row items-center">
            <TextInput
              className="flex-1 bg-gray-100 border border-gray-300 rounded p-2 text-base text-gray-800"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              className="absolute right-2"
              onPress={handleTogglePasswordVisibility}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#555"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className={`bg-blue-500 py-3 rounded justify-center items-center mt-5 ${loading ? "bg-gray-400" : ""
            }`}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-white text-base font-semibold">Login</Text>
          )}
        </TouchableOpacity>

        {/* Error Messages */}
        {(localError || error) && (
          <Text className="text-red-500 text-sm mt-2 text-center">
            {localError || error}
          </Text>
        )}

        {/* Footer Link */}
        <Text className="text-sm text-gray-600 mt-5 text-center">
          Don't have an account?{" "}
          <Link href="/(auth)/sign-up" className="text-blue-500 font-semibold">
            Sign Up
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}