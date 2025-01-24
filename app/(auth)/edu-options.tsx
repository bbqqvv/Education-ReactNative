import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

const EduOption = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Phần Tiêu đề */}
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-4xl font-bold text-[#63BAD5] mb-4">
          Chào mừng!
        </Text>
        <Text className="text-lg text-gray-600 text-center mb-8 px-4">
          Bạn là học sinh hay giáo viên? Hãy chọn vai trò của bạn để bắt đầu!
        </Text>

        {/* Phần Lựa chọn */}
        <View className="w-full">
          {/* Nút Học sinh */}
          <TouchableOpacity
            className="bg-[#63BAD5] py-4 rounded-full shadow-sm mb-6 items-center flex-row justify-center space-x-3"
            onPress={() => router.push("/(auth)/sign-in")}
            activeOpacity={0.7}
          >
            <Text className="text-white text-lg font-semibold tracking-wide">
              Tôi là Học sinh
            </Text>
          </TouchableOpacity>

          {/* Nút Giáo viên */}
          <TouchableOpacity
            className="bg-[#D5BA63] py-4 rounded-full shadow-sm items-center flex-row justify-center space-x-3"
            onPress={() => router.push("/(auth)/sign-in")}
            activeOpacity={0.7}
          >
            <Text className="text-white text-lg font-semibold tracking-wide">
              Tôi là Giáo viên
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Phần Footer */}
      <View className="py-6 border-t border-gray-200 items-center bg-white">
        <Text className="text-sm text-gray-500">
          Đừng lo, bạn có thể thay đổi vai trò sau!
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default EduOption;