import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ResetPassword() {
  const router = useRouter();

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
        <Text className="text-2xl font-bold">Đặt lại mật khẩu</Text>
        <Text className="text-gray-500 mt-2">
          Mật khẩu của bạn đã được đặt lại thành công. Nhấn xác nhận để đặt mật
          khẩu mới.
        </Text>

        {/* Nút xác nhận */}
        <TouchableOpacity
          onPress={() => router.push("/NewPassword")} // Điều hướng về trang đăng nhập
          className="mt-6 bg-[#63BAD5] p-4 rounded-lg w-full"
        >
          <Text className="text-white font-semibold text-lg text-center">
            Xác nhận
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
