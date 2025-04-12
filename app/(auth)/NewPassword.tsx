import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
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

  return (
    <View className="flex items-center justify-center min-h-screen bg-white px-6 relative">
      {/* Nút quay lại */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-10 left-4 p-2 rounded-full bg-gray-100"
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <View className="w-full max-w-sm mt-6">
        {/* Tiêu đề */}
        <Text className="text-2xl font-bold">Đặt mật khẩu mới</Text>
        <Text className="text-gray-500 mt-2">
          Tạo mật khẩu mới. Đảm bảo nó khác với những cái trước để bảo mật.
        </Text>

        {/* Mật khẩu */}
        <Text className="font-semibold mt-6">Mật Khẩu</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
            marginTop: 8,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: isPasswordFocused ? "#FFA500" : "#D1D5DB", // Viền vàng cam khi focus
          }}
        >
          <TextInput
            style={{ flex: 1, outlineStyle: "none" }} // Xóa viền vàng bên trong
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

        {/* Nhập lại mật khẩu */}
        <Text className="font-semibold mt-4">Nhập Lại Mật Khẩu</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
            marginTop: 8,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: isConfirmFocused ? "#FFA500" : "#D1D5DB", // Viền vàng cam khi focus
          }}
        >
          <TextInput
            style={{ flex: 1, outlineStyle: "none" }} // Xóa viền vàng bên trong
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

        {/* Nút cập nhật */}
        <TouchableOpacity
          onPress={() => router.push("/result-forgot")}
          disabled={
            !password || !confirmPassword || password !== confirmPassword
          }
          className={`mt-6 p-4 rounded-lg w-full ${
            password && confirmPassword && password === confirmPassword
              ? "bg-[#63BAD5]"
              : "bg-[#CFE9F1]"
          }`}
        >
          <Text className="text-white font-semibold text-lg text-center">
            Cập nhật mật khẩu
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
