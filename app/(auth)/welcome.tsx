import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Welcome = () => {
  const router = useRouter();
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Xác định slide cuối cùng
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Skip Button */}
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/edu-options");
        }}
        className="absolute top-5 right-5 z-10"
      >
        <Text className="text-gray-500 text-base font-semibold mt-10">Bỏ qua</Text>
      </TouchableOpacity>

      {/* Swiper Section */}
      <Swiper
        ref={swiperRef}
        loop={false}
        showsPagination
        dot={<View className="w-8 h-2 mx-1 bg-gray-300 rounded-full" />}
        activeDot={<View className="w-8 h-2 mx-1 bg-[#63BAD5] rounded-full" />}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex-1 justify-center items-center px-6">
            {/* Slide Image */}
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />

            {/* Slide Title */}
            <Text className="text-2xl font-bold text-gray-800 text-center mt-8">
              {item.title}
            </Text>

            {/* Slide Description */}
            <Text className="text-base text-gray-600 text-center mt-4 px-4">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      {/* Button Section */}
      <View className="px-6">
        <CustomButton
          title={isLastSlide ? "Bắt đầu" : "Tiếp theo"}
          onPress={() =>
            isLastSlide
              ? router.replace("/(auth)/edu-options")
              : swiperRef.current?.scrollBy(1)
          }
          className={`w-full mb-5 py-3 rounded-full ${isLastSlide ? "bg-[#97D1E3]" : "bg-[#63BAD5]"}`}
        />
      </View>
    </SafeAreaView>
  );
};

export default Welcome;