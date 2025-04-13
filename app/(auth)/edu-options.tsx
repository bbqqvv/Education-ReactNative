import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

const EduOption = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Chào mừng!</Text>
        <Text style={styles.subtitle}>
          Bạn là học sinh hay giáo viên? Hãy chọn vai trò của bạn để bắt đầu!
        </Text>

        {/* Options Section */}
        <View style={styles.optionsContainer}>
          {/* Student Button */}
          <TouchableOpacity
            style={[styles.button, styles.studentButton]}
            onPress={() => router.push("/(auth)/sign-in")}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Tôi là Học sinh</Text>
          </TouchableOpacity>

          {/* Teacher Button */}
          <TouchableOpacity
            style={[styles.button, styles.teacherButton]}
            onPress={() => router.push("/(auth)/sign-in")}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Tôi là Giáo viên</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Đừng lo, bạn có thể thay đổi vai trò sau!
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#63BAD5",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  optionsContainer: {
    width: "100%",
  },
  button: {
    paddingVertical: 16,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  studentButton: {
    backgroundColor: "#63BAD5",
    marginBottom: 24,
  },
  teacherButton: {
    backgroundColor: "#D5BA63",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  footer: {
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  footerText: {
    fontSize: 14,
    color: "#6b7280",
  },
});

export default EduOption;
