import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { TextInput } from "react-native";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const RateAppScreen = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Xử lý gửi đánh giá
    setSubmitted(true);
    // Giả lập gửi đánh giá lên server
    setTimeout(() => {
      // Sau khi gửi thành công có thể chuyển hướng hoặc hiển thị thông báo
    }, 1500);
  };

  const handleRateOnStore = () => {
    // Mở cửa hàng ứng dụng để đánh giá
    Linking.openURL("market://details?id=your.package.name");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {!submitted ? (
        <>
          <View style={styles.header}>
            <Text style={styles.headerText}>Đánh giá ứng dụng</Text>
            <Text style={styles.subHeader}>
              Chia sẻ trải nghiệm của bạn với chúng tôi
            </Text>
          </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.ratingQuestion}>
              Bạn hài lòng với ứng dụng này như thế nào?
            </Text>

            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                  activeOpacity={0.7}
                >
                  <AntDesign
                    name={star <= rating ? "star" : "staro"}
                    size={40}
                    color={star <= rating ? "#FFD700" : "#CBD5E1"}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.ratingText}>
              {rating === 0
                ? "Chọn số sao đánh giá"
                : rating === 1
                  ? "Rất không hài lòng"
                  : rating === 2
                    ? "Không hài lòng"
                    : rating === 3
                      ? "Bình thường"
                      : rating === 4
                        ? "Hài lòng"
                        : "Rất hài lòng"}
            </Text>
          </View>

          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackTitle}>
              Ý kiến của bạn (không bắt buộc)
            </Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="feedback" size={24} color="#94A3B8" />
              <TextInput
                style={styles.input}
                placeholder="Hãy chia sẻ trải nghiệm của bạn..."
                placeholderTextColor="#94A3B8"
                multiline
                numberOfLines={4}
                value={feedback}
                onChangeText={setFeedback}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={rating === 0}
          >
            <LinearGradient
              colors={
                rating === 0 ? ["#E2E8F0", "#E2E8F0"] : ["#4F46E5", "#7C3AED"]
              }
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.submitButtonText}>Gửi đánh giá</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.rateLaterButton}
            onPress={() => Linking.openURL("mailto:support@edumanager.com")}
          >
            <Text style={styles.rateLaterText}>Góp ý với hỗ trợ</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.thankYouContainer}>
          <View style={styles.thankYouContent}>
            <AntDesign name="checkcircle" size={60} color="#10B981" />
            <Text style={styles.thankYouTitle}>Cảm ơn đánh giá của bạn!</Text>
            <Text style={styles.thankYouText}>
              Chúng tôi trân trọng mọi ý kiến đóng góp để cải thiện ứng dụng tốt
              hơn.
            </Text>

            <TouchableOpacity
              style={styles.rateOnStoreButton}
              onPress={handleRateOnStore}
            >
              <Feather name="external-link" size={18} color="#FFFFFF" />
              <Text style={styles.rateOnStoreText}>Đánh giá trên cửa hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    marginTop: 32,
    marginBottom: 24,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
  },
  ratingContainer: {
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  ratingQuestion: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 24,
    textAlign: "center",
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  ratingText: {
    fontSize: 16,
    color: "#475569",
    fontWeight: "500",
  },
  feedbackContainer: {
    marginBottom: 32,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1E293B",
    marginLeft: 12,
    maxHeight: 150,
    textAlignVertical: "top",
  },
  submitButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 2,
  },
  gradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  rateLaterButton: {
    alignItems: "center",
    padding: 16,
  },
  rateLaterText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4F46E5",
  },
  thankYouContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
  thankYouContent: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  thankYouTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 24,
    marginBottom: 12,
    textAlign: "center",
  },
  thankYouText: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  rateOnStoreButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4F46E5",
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  rateOnStoreText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 8,
  },
});

export default RateAppScreen;
