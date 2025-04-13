import React, { useState, useCallback, useEffect } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import useAuth from "@/hooks/auth/useAuth";
import { Link, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function LoginPage() {
  const { loading, error } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [localError, setLocalError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = async (username, password) => {
    // Giả lập API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'admin' && password === '123456') {
          resolve({ token: 'abc123' });
        } else {
          reject(new Error('Invalid username or password.'));
        }
      }, 1000);
    });
  };

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

    setLocalError("");

    try {
      const response = await handleLogin(username, password);
      if (response?.token) {
        router.replace("/(tabs)/home");
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
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.welcomeText}>Chào mừng</Text>
        <Text style={styles.loginTitle}>Đăng nhập</Text>
        <Text style={styles.subtitle}>
          Chào mừng bạn đến với lớp học của Văn Quốc Bùi, vui lòng nhập thông
          tin để đăng nhập bên dưới
        </Text>

        {/* Username Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập email"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Mật khẩu</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Nhập mật khẩu của bạn"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={handleTogglePasswordVisibility}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#555"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/ForgotPasswordScreen")}
          >
            <Text style={styles.forgotPassword}>Quên mật khẩu</Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.loginButton, loading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Đăng nhập</Text>
          )}
        </TouchableOpacity>

        {/* Error Messages */}
        {(localError || error) && (
          <Text style={styles.errorText}>{localError || error}</Text>
        )}

        {/* Footer Link */}
        <Text style={styles.footerText}>
          Chưa có tài khoản?{" "}
          <Link href="/(auth)/sign-up" style={styles.signupLink}>
            Đăng ký
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  card: {
    width: "90%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#06b6d4",
    marginBottom: 20,
    textAlign: "center",
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
    marginLeft: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: "#1f2937",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: "#1f2937",
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
  },
  forgotPassword: {
    fontSize: 14,
    color: "#000",
    marginTop: 8,
    textAlign: "right",
  },
  loginButton: {
    backgroundColor: "#06b6d4",
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#9ca3af",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#4b5563",
    marginTop: 20,
    textAlign: "center",
  },
  signupLink: {
    color: "#06b6d4",
    fontWeight: "600",
  },
});
