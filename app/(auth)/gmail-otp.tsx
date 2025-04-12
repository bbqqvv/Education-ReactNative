import { View, Text, TextInput, TouchableOpacity } from "react-native";
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
    <View className="flex items-center justify-center min-h-screen bg-white px-6">
      <View className="w-full max-w-sm mt-[-50px]">
        {/* Nút quay lại */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-12 left-6"
        >
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>

        {/* Tiêu đề */}
        <Text className="text-2xl font-bold mt-12">Kiểm tra Email của bạn</Text>
        <Text className="text-gray-500 mt-2">
          Chúng tôi đã gửi mã đặt lại gồm 5 số trong hộp thư của bạn
        </Text>

        {/* Ô nhập OTP */}
        <View className="flex flex-row justify-between mt-6">
          {otp.map((value, index) => (
            <TextInput
              key={index}
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl"
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
          className="mt-6 bg-[#D3EAF2] p-4 rounded-lg w-full"
        >
          <Text className="text-white font-semibold text-lg text-center">
            Xác minh mã
          </Text>
        </TouchableOpacity>

        {/* Gửi lại mã */}
        <Text className="text-gray-500 text-center mt-4">
          Bạn chưa nhận được SMS?{" "}
          <Text className="text-blue-500 font-semibold">Gửi lại</Text>
        </Text>
      </View>
    </View>
  );
}
