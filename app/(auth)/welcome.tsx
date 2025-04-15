import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Welcome = () => {
  const router = useRouter();
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/edu-option")}
        style={styles.skipButton}
      >
        <Text style={styles.skipText}>Bỏ qua</Text>
      </TouchableOpacity>

      {/* Swiper Section */}
      <Swiper
        ref={swiperRef}
        loop={false}
        showsPagination
        dot={<View style={styles.inactiveDot} />}
        activeDot={<View style={styles.activeDot} />}
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} style={styles.slideContainer}>
            {/* Slide Image */}
            <Image
              source={item.image}
              style={styles.slideImage}
              resizeMode="contain"
            />

            {/* Slide Title */}
            <Text style={styles.slideTitle}>{item.title}</Text>

            {/* Slide Description */}
            <Text style={styles.slideDescription}>{item.description}</Text>
          </View>
        ))}
      </Swiper>

      {/* Button Section */}
      <View style={styles.buttonContainer}>
        <CustomButton
          title={isLastSlide ? "Bắt đầu" : "Tiếp theo"}
          onPress={() =>
            isLastSlide
              ? router.replace("/(auth)/edu-option")
              : swiperRef.current?.scrollBy(1)
          }
          buttonStyle={[
            styles.button,
            isLastSlide ? styles.startButton : styles.nextButton,
          ]}
          textStyle={styles.buttonText}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  skipButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
  skipText: {
    color: "#6b7280",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 40,
  },
  slideContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  slideImage: {
    width: "100%",
    height: 300,
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    textAlign: "center",
    marginTop: 32,
  },
  slideDescription: {
    fontSize: 16,
    color: "#4b5563",
    textAlign: "center",
    marginTop: 16,
    paddingHorizontal: 16,
  },
  inactiveDot: {
    width: 32,
    height: 8,
    marginHorizontal: 4,
    backgroundColor: "#d1d5db",
    borderRadius: 4,
  },
  activeDot: {
    width: 32,
    height: 8,
    marginHorizontal: 4,
    backgroundColor: "#63BAD5",
    borderRadius: 4,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 999,
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: "#63BAD5",
  },
  startButton: {
    backgroundColor: "#97D1E3",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Welcome;