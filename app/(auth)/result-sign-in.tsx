import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Success Icon */}
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark" size={40} color="#63BAD5" />
        </View>

        {/* Success Message */}
        <Text style={styles.header}>Thành Công</Text>
        <Text style={styles.message}>
          Chúc mừng! Bạn đã đăng kí thành công. Nhấn tiếp tục đăng nhập.
        </Text>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/sign-in")}
        >
          <Text style={styles.buttonText}>Trở về trang đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Layout styles
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  card: {
    width: "100%",
    maxWidth: 384,
    alignItems: "center",
  },

  // Icon styles
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#63BAD5",
    justifyContent: "center",
    alignItems: "center",
  },

  // Text styles
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 24,
    color: "#000000",
  },
  message: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },

  // Button styles
  button: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: "100%",
    maxWidth: 320,
    backgroundColor: "#63BAD5",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
