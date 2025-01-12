import React, { useRef, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from 'react-native-swiper';
import { onboarding } from "@/constants";

const Welcome = () => {
  const router = useRouter();
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-gray-100 px-5">
      <Text className="text-3xl font-bold text-gray-900 mb-2">Welcome</Text>
      <Text className="text-lg text-gray-600 mb-10 text-center">
        Are you a student or a teacher?
      </Text>

      {/* Student Button */}
      <TouchableOpacity
        className="bg-blue-500 py-3 px-5 rounded-full mb-4 w-4/5 items-center shadow-lg"
        onPress={() => router.push("/(auth)/sign-in")}
      >
        <Text className="text-white text-base font-semibold">
          I am a Student
        </Text>
      </TouchableOpacity>

      {/* Teacher Button */}
      <TouchableOpacity
        className="bg-amber-500 py-3 px-5 rounded-full w-4/5 items-center shadow-lg"
        onPress={() => router.push("/(auth)/sign-in")}
      >
        <Text className="text-white text-base font-semibold">
          I am a Teacher
        </Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        showsPagination={false}
        dot={<View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />}
        activeDot={<View className="w-[32px] h-[4px] mx-1 bg-[#00A8FF] rounded-full" />}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item, index) => (
          <View>
            <Text key={index}>{item.title}</Text>
          </View>))}
      </Swiper>
    </SafeAreaView >
  );
};

export default Welcome;