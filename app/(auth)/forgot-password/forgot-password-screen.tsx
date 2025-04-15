import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = () => {
    if (!email) {
      setEmailError("Vui lòng nhập email");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Email không hợp lệ");
      return;
    }

    setEmailError("");
    router.push("/forgot-password/components/otp");
  };

  return (
    <View style={styles.container}>
      {/* Nút quay lại*/}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        {/* Tiêu đề */}
        <Text style={styles.title}>Quên mật khẩu</Text>
        <Text style={styles.subtitle}>
          Vui lòng nhập email để đặt lại mật khẩu
        </Text>

        {/* Ô nhập email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, emailError && styles.inputError]}
          placeholder="Nhập email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (emailError) setEmailError("");
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError && <Text style={styles.errorText}>{emailError}</Text>}

        {/* Nút đặt lại mật khẩu */}
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Đặt Lại Mật khẩu</Text>
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
    lineHeight: 32,
  },
  subtitle: {
    color: "#6b7280",
    marginTop: 8,
  },
  label: {
    fontWeight: "600",
    marginTop: 24,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  inputError: {
    borderColor: "#ef4444",
  },
  errorText: {
    color: "#ef4444",
    marginTop: 4,
  },
  submitButton: {
    marginTop: 24,
    backgroundColor: "#63BAD5",
    padding: 16,
    borderRadius: 8,
    width: "100%",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
});
