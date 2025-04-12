import { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function OTPVerification() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputRefs = useRef([]);

  // Xử lý nhập từng số
  const handleChange = (text, index) => {
    if (text.length > 1) {
      // Nếu paste nhiều số, chỉ lấy số đầu tiên
      text = text[0];
    }

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Tự động chuyển đến ô tiếp theo khi nhập
    if (text && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Tự động submit nếu đã nhập đủ
    if (newOtp.every((num) => num !== "")) {
      handleSubmit();
    }
  };

  // Xử lý xóa và quay lại ô trước
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = () => {
    if (otp.every((num) => num !== "")) {
      router.push("/ResetPassword");
    }
  };

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
        <Text className="text-2xl font-bold text-center">
          Kiểm tra Email của bạn
        </Text>
        <Text className="text-gray-500 mt-2 text-center">
          Chúng tôi đã gửi mã gồm 5 số vào email của bạn
        </Text>

        {/* Ô nhập OTP */}
        <View className="flex flex-row justify-between mt-6 px-4">
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={{
                width: 50,
                height: 50,
                borderWidth: 1,
                borderRadius: 10,
                textAlign: "center",
                fontSize: 18,
                borderColor: digit ? "#63BAD5" : "#ccc",
              }}
              maxLength={1}
              keyboardType="numeric"
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              autoFocus={index === 0}
            />
          ))}
        </View>

        {/* Nút xác minh */}
        <TouchableOpacity
          onPress={handleSubmit}
          className={`mt-6 p-4 rounded-lg w-full ${
            otp.every((num) => num !== "") ? "bg-[#63BAD5]" : "bg-gray-300"
          }`}
          disabled={otp.some((num) => num === "")}
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
