import { View, Text, TextInput, TouchableOpacity } from "react-native";
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
    router.push("/otp");
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-6 relative">
      {/* Nút quay lại*/}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-10 left-4 p-2 rounded-full bg-gray-100"
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <View className="w-full max-w-sm mt-6">
        {/* Tiêu đề */}
        <Text className="text-2xl font-bold">Quên mật khẩu</Text>
        <Text className="text-gray-500 mt-2">
          Vui lòng nhập email để đặt lại mật khẩu
        </Text>

        {/* Ô nhập email */}
        <Text className="font-semibold mt-6">Email</Text>
        <TextInput
          className={`w-full border ${
            emailError ? "border-red-500" : "border-gray-300"
          } rounded-lg p-4 mt-2`}
          placeholder="Nhập email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (emailError) setEmailError("");
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError && <Text className="text-red-500 mt-1">{emailError}</Text>}

        {/* Nút đặt lại mật khẩu */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="mt-6 bg-[#63BAD5] p-4 rounded-lg w-full"
        >
          <Text className="text-white font-semibold text-lg text-center">
            Đặt Lại Mật khẩu
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
