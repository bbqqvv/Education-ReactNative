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
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { fetchUserInfo, loginUser } from "@/app/store/slices/authSlice";
import { AppDispatch } from "@/app/store/store";
import { Platform } from "react-native";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [biometricType, setBiometricType] = useState<string | null>(null);
  const [localError, setLocalError] = useState("");


  const dispatch: AppDispatch = useDispatch();
  const { token, loading, error } = useSelector((state: RootState) => state.auth);

  // Redirect after successful login
  useEffect(() => {
    if (token) {
      router.replace("/(tabs)/home");
    }
  }, [token]);

  // Handle errors from redux
  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

  // Lưu token vào AsyncStorage sau khi đăng nhập thành công
  const handleSubmit = async () => {
    if (!email || !password) {
      setLocalError("Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }

    setLocalError("");

    try {
      const resultAction = await dispatch(loginUser({ email, password }));

      if (loginUser.fulfilled.match(resultAction)) {
        // Lưu token vào SecureStore
        await SecureStore.setItemAsync('authToken', resultAction.payload.token);
        dispatch(fetchUserInfo());
      } else {
        const errorMsg = resultAction.payload || "Đăng nhập thất bại";
        setLocalError(errorMsg);
      }
    } catch (err) {
      console.error("Lỗi khi đăng nhập:", err);
      setLocalError("Đăng nhập thất bại. Vui lòng thử lại.");
    }
  };


  const handleBiometricAuth = async () => {
    try {
      if (Platform.OS === "web") {
        Alert.alert("Thiết bị không hỗ trợ sinh trắc học trên trình duyệt");
        return;
      }

      const savedEmail = await SecureStore.getItemAsync("email");
      const savedPassword = await SecureStore.getItemAsync("password");

      if (!savedEmail || !savedPassword) {
        Alert.alert("Không có thông tin đăng nhập", "Vui lòng đăng nhập bằng email và mật khẩu trước");
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: `Đăng nhập với ${biometricType}`,
        fallbackLabel: "Nhập mật khẩu",
        disableDeviceFallback: false,
      });

      if (result.success) {
        const loginResult = await dispatch(
          loginUser({ email: savedEmail, password: savedPassword })
        );

        if (loginUser.fulfilled.match(loginResult)) {
          dispatch(fetchUserInfo());
        } else {
          Alert.alert("Đăng nhập thất bại", "Không thể đăng nhập bằng sinh trắc học.");
        }
      }
    } catch (err) {
      console.error("Biometric auth failed", err);
      setLocalError("Xác thực sinh trắc học thất bại");
    }
  };

  // Check biometric support on component mount
  useEffect(() => {
    const checkBiometricSupport = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);

      if (compatible) {
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        if (!enrolled) {
          setIsBiometricSupported(false);
          return;
        }

        const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
        if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
          setBiometricType("Face ID");
        } else if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
          setBiometricType("Touch ID");
        }
      }
    };

    checkBiometricSupport();
  }, []);

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

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
            textContentType="emailAddress"
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
              autoComplete="password"
              textContentType="password"
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
            onPress={() => router.push("/(auth)/forgot-password/forgot-password-screen")}
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

        {/* Biometric Login Button */}
        {isBiometricSupported && biometricType && (
          <TouchableOpacity
            style={styles.biometricButton}
            onPress={handleBiometricAuth}
            disabled={loading}
          >
            <Ionicons
              name={biometricType === "Face ID" ? "person" : "finger-print"}
              size={24}
              color="#06b6d4"
            />
            <Text style={styles.biometricButtonText}>
              Đăng nhập bằng {biometricType}
            </Text>
          </TouchableOpacity>
        )}

        {/* Error Messages */}
        {localError && (
          <Text style={styles.errorText}>{localError}</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    maxWidth: 400,
    padding: 20,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 8,
    fontWeight: "500",
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
    position: "relative",
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
    paddingRight: 40,
  },
  eyeIcon: {
    position: "absolute",
    right: 12,
    padding: 8,
  },
  forgotPassword: {
    fontSize: 14,
    color: "#06b6d4",
    marginTop: 8,
    textAlign: "right",
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#06b6d4",
    paddingVertical: 14,
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
  biometricButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 16,
  },
  biometricButtonText: {
    color: "#06b6d4",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  errorText: {
    color: "#ef4444",
    fontSize: 14,
    marginTop: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});