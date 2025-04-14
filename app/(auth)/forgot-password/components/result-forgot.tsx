import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Icon Check */}
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark" size={40} color="#63BAD5" />
        </View>

        {/* Title */}
        <Text style={styles.title}>Thành Công</Text>
        <Text style={styles.subtitle}>
          Chúc mừng! Mật khẩu của bạn đã{"\n"}được thay đổi. Nhấn tiếp tục đăng
          nhập.
        </Text>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("/(auth)/sign-in/SignIn")}
        >
          <Text style={styles.loginButtonText}>Trở về trang đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  contentContainer: {
    width: "100%",
    maxWidth: 384,
    alignItems: "center",
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: "#63BAD5",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 24,
  },
  subtitle: {
    color: "#6b7280",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
  loginButton: {
    marginTop: 24,
    padding: 12,
    width: "100%",
    backgroundColor: "#63BAD5",
    borderRadius: 8,
    maxWidth: 320,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
});
