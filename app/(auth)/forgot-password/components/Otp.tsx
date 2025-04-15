import { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function OTPVerification() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length > 1) {
      text = text[0];
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (newOtp.every((num) => num !== "")) {
      handleSubmit();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    if (otp.every((num) => num !== "")) {
      router.push("/(auth)/forgot-password/components/reset-password");
    }
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        {/* Title */}
        <Text style={styles.title}>Kiểm tra Email của bạn</Text>
        <Text style={styles.subtitle}>
          Chúng tôi đã gửi mã gồm 5 số vào email của bạn
        </Text>

        {/* OTP Inputs */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={[
                styles.otpInput,
                digit ? styles.otpInputFilled : styles.otpInputEmpty,
              ]}
              maxLength={1}
              keyboardType="numeric"
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              autoFocus={index === 0}
            />
          ))}
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          style={[
            styles.verifyButton,
            otp.every((num) => num !== "")
              ? styles.verifyButtonActive
              : styles.verifyButtonDisabled,
          ]}
          disabled={otp.some((num) => num === "")}
        >
          <Text style={styles.verifyButtonText}>Xác minh mã</Text>
        </TouchableOpacity>

        {/* Resend Code */}
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
    textAlign: "center",
  },
  subtitle: {
    color: "#6b7280",
    marginTop: 8,
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    paddingHorizontal: 16,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
  },
  otpInputEmpty: {
    borderColor: "#ccc",
  },
  otpInputFilled: {
    borderColor: "#63BAD5",
  },
  verifyButton: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    width: "100%",
  },
  verifyButtonActive: {
    backgroundColor: "#63BAD5",
  },
  verifyButtonDisabled: {
    backgroundColor: "#e5e7eb",
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
