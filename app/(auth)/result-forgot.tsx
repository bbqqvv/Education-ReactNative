import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white justify-center items-center px-6">
      <View className="w-full max-w-sm items-center">
        {/* Icon Check */}
        <View className="w-20 h-20 border-2 border-[#63BAD5] rounded-full flex items-center justify-center aspect-square">
          <Ionicons name="checkmark" size={40} color="#63BAD5" />
        </View>

        {/* Tiêu đề */}
        <Text className="text-xl font-bold mt-6">Thành Công</Text>
        <Text className="text-gray-500 text-center mt-2 leading-5">
          Chúc mừng! Mật khẩu của bạn đã{"\n"}được thay đổi. Nhấn tiếp tục đăng
          nhập.
        </Text>

        {/* Nút Cập Nhật Mật Khẩu */}
        <TouchableOpacity
          className="mt-6 p-3 w-full bg-[#63BAD5] rounded-lg max-w-xs"
          onPress={() => router.push("/sign-in")}
        >
          <Text className="text-white font-semibold text-lg text-center">
            Trở về trang đăng nhập
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
