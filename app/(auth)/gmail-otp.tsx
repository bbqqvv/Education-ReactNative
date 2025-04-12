import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function OTPVerification() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", ""]);

  const handleChange = (text, index) => {
    if (text.length <= 1) {
      let newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Nút quay lại */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>

        {/* Tiêu đề */}
        <Text style={styles.title}>Kiểm tra Email của bạn</Text>
        <Text style={styles.subtitle}>
          Chúng tôi đã gửi mã đặt lại gồm 5 số trong hộp thư của bạn
        </Text>

        {/* Ô nhập OTP */}
        <View style={styles.otpContainer}>
          {otp.map((value, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              keyboardType="numeric"
              maxLength={1}
              value={value}
              onChangeText={(text) => handleChange(text, index)}
            />
          ))}
        </View>

        {/* Nút Xác minh mã */}
        <TouchableOpacity
          onPress={() => alert("Mã đã được xác minh!")}
          style={styles.verifyButton}
        >
          <Text style={styles.verifyButtonText}>Xác minh mã</Text>
        </TouchableOpacity>

        {/* Gửi lại mã */}
        <Text style={styles.resendText}>
          Bạn chưa nhận được SMS? <Text style={styles.resendLink}>Gửi lại</Text>
        </Text>
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
  },
  contentContainer: {
    width: "100%",
    maxWidth: 384,
    marginTop: -50,
  },
  backButton: {
    position: "absolute",
    top: 48,
    left: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 48,
  },
  subtitle: {
    color: "#6b7280",
    marginTop: 8,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  otpInput: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 20,
  },
  verifyButton: {
    marginTop: 24,
    backgroundColor: "#D3EAF2",
    padding: 16,
    borderRadius: 8,
    width: "100%",
  },
  verifyButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
  resendText: {
    color: "#6b7280",
    textAlign: "center",
    marginTop: 16,
  },
  resendLink: {
    color: "#3b82f6",
    fontWeight: "600",
  },
});
