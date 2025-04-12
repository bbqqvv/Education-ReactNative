import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function NewPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmFocused, setIsConfirmFocused] = useState(false);

  const isSubmitDisabled =
    !password || !confirmPassword || password !== confirmPassword;

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        {/* Title */}
        <Text style={styles.title}>Đặt mật khẩu mới</Text>
        <Text style={styles.subtitle}>
          Tạo mật khẩu mới. Đảm bảo nó khác với những cái trước để bảo mật.
        </Text>

        {/* Password */}
        <Text style={styles.label}>Mật Khẩu</Text>
        <View
          style={[
            styles.inputContainer,
            isPasswordFocused && styles.focusedInput,
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Nhập mật khẩu mới của bạn"
            placeholderTextColor="gray"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <Text style={styles.label}>Nhập Lại Mật Khẩu</Text>
        <View
          style={[
            styles.inputContainer,
            isConfirmFocused && styles.focusedInput,
          ]}
        >
          <TextInput
            style={styles.input}
            placeholder="Nhập lại mật khẩu"
            placeholderTextColor="gray"
            secureTextEntry={!isConfirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onFocus={() => setIsConfirmFocused(true)}
            onBlur={() => setIsConfirmFocused(false)}
          />
          <TouchableOpacity
            onPress={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
          >
            <Ionicons
              name={
                isConfirmPasswordVisible ? "eye-outline" : "eye-off-outline"
              }
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        {/* Update button */}
        <TouchableOpacity
          onPress={() => router.push("/result-forgot")}
          disabled={isSubmitDisabled}
          style={[
            styles.submitButton,
            isSubmitDisabled ? styles.disabledButton : styles.activeButton,
          ]}
        >
          <Text style={styles.submitButtonText}>Cập nhật mật khẩu</Text>
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
  label: {
    fontWeight: "600",
    marginTop: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginTop: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  focusedInput: {
    borderColor: "#FFA500",
  },
  input: {
    flex: 1,
    outlineStyle: "none",
  },
  submitButton: {
    marginTop: 24,
    padding: 16,
    borderRadius: 8,
    width: "100%",
  },
  activeButton: {
    backgroundColor: "#63BAD5",
  },
  disabledButton: {
    backgroundColor: "#CFE9F1",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
});
