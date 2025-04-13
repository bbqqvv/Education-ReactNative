import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ResetPassword() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        {/* Title */}
        <Text style={styles.title}>Đặt lại mật khẩu</Text>
        <Text style={styles.subtitle}>
          Mật khẩu của bạn đã được đặt lại thành công. Nhấn xác nhận để đặt mật
          khẩu mới.
        </Text>

        {/* Confirm button */}
        <TouchableOpacity
          onPress={() => router.push("/NewPassword")}
          style={styles.confirmButton}
        >
          <Text style={styles.confirmButtonText}>Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 24,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 16,
    padding: 8,
    borderRadius: 999,
    backgroundColor: "#f3f4f6",
  },
  contentContainer: {
    width: "100%",
    maxWidth: 384,
    marginTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#6b7280",
    marginTop: 8,
  },
  confirmButton: {
    marginTop: 24,
    backgroundColor: "#63BAD5",
    padding: 16,
    borderRadius: 8,
    width: "100%",
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
});
