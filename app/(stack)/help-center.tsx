import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  TextInput,
} from "react-native";
import {
  MaterialIcons,
  Feather,
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const HelpCenterScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  // Danh mục hỗ trợ
  const categories = [
    { id: "all", name: "Tất cả" },
    { id: "teaching", name: "Giảng dạy" },
    { id: "learning", name: "Học tập" },
    { id: "account", name: "Tài khoản" },
    { id: "payment", name: "Thanh toán" },
  ];

  // Dữ liệu câu hỏi thường gặp
  const faqs = [
    {
      question: "Làm thế nào để tạo lớp học mới?",
      answer:
        "Vào mục 'Lớp học' > nhấn nút '+' ở góc phải > điền thông tin lớp và nhấn 'Tạo lớp'.",
      category: "teaching",
    },
    {
      question: "Cách thêm học viên vào lớp học?",
      answer:
        "Vào lớp học cần thêm > chọn 'Thành viên' > nhấn 'Thêm học viên' và nhập email hoặc mã học viên.",
      category: "teaching",
    },
    {
      question: "Làm sao để nộp bài tập?",
      answer:
        "Vào mục 'Bài tập' > chọn bài tập cần nộp > nhấn 'Nộp bài' và tải lên tệp của bạn.",
      category: "learning",
    },
    {
      question: "Cách xem lịch học trong tuần?",
      answer:
        "Vào mục 'Lịch học' để xem toàn bộ lịch trình. Bạn có thể lọc theo ngày/tuần/tháng.",
      category: "learning",
    },
    {
      question: "Làm thế nào để đổi mật khẩu?",
      answer:
        "Vào 'Cá nhân' > 'Cài đặt tài khoản' > 'Đổi mật khẩu' và làm theo hướng dẫn.",
      category: "account",
    },
    {
      question: "Cách thanh toán học phí trực tuyến?",
      answer:
        "Vào 'Thanh toán' > chọn gói học > chọn phương thức thanh toán và làm theo hướng dẫn.",
      category: "payment",
    },
  ];

  // Lọc câu hỏi theo danh mục và từ khóa tìm kiếm
  const filteredFaqs = faqs.filter(
    (faq) =>
      (activeCategory === "all" || faq.category === activeCategory) &&
      (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Phương thức liên hệ hỗ trợ
  const contactMethods = [
    {
      id: 1,
      name: "Hỗ trợ trực tuyến",
      icon: "headset",
      iconSet: Ionicons,
      action: () => Linking.openURL("https://eduapp.com/livechat"),
      available: "24/7",
    },
    {
      id: 2,
      name: "Email hỗ trợ",
      icon: "email-outline",
      iconSet: MaterialCommunityIcons,
      action: () => Linking.openURL("mailto:support@eduapp.com"),
      available: "Trong giờ hành chính",
    },
    {
      id: 3,
      name: "Hotline",
      icon: "phone-in-talk",
      iconSet: MaterialIcons,
      action: () => Linking.openURL("tel:19001234"),
      available: "8:00 - 22:00",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Trung tâm hỗ trợ</Text>
        <Text style={styles.subHeader}>Chúng tôi luôn sẵn sàng hỗ trợ bạn</Text>
      </View>

      {/* Ô tìm kiếm */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Feather
            name="search"
            size={20}
            color="#64748B"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm câu hỏi..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Feather name="x" size={20} color="#64748B" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Danh mục hỗ trợ */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryItem,
              activeCategory === category.id && styles.activeCategory,
            ]}
            onPress={() => setActiveCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === category.id && styles.activeCategoryText,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Câu hỏi thường gặp */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Câu hỏi thường gặp</Text>

        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((item, index) => (
            <View key={index} style={styles.faqItem}>
              <TouchableOpacity
                style={styles.faqQuestionContainer}
                onPress={() =>
                  setExpandedFaqIndex(expandedFaqIndex === index ? null : index)
                }
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name={
                    item.category === "teaching"
                      ? "class"
                      : item.category === "learning"
                      ? "school"
                      : item.category === "account"
                      ? "person"
                      : "payment"
                  }
                  size={20}
                  color="#3B82F6"
                  style={styles.faqIcon}
                />
                <Text style={styles.faqQuestion}>{item.question}</Text>
                <AntDesign
                  name={expandedFaqIndex === index ? "up" : "down"}
                  size={16}
                  color="#64748B"
                />
              </TouchableOpacity>

              {expandedFaqIndex === index && (
                <View style={styles.faqAnswerContainer}>
                  <Text style={styles.faqAnswer}>{item.answer}</Text>
                  <TouchableOpacity
                    style={styles.helpfulButtons}
                    onPress={() => alert("Cảm ơn phản hồi của bạn!")}
                  >
                    <Text style={styles.helpfulText}>
                      Câu trả lời có hữu ích không?
                    </Text>
                    <View style={styles.helpfulButtonGroup}>
                      <FontAwesome
                        name="thumbs-o-up"
                        size={16}
                        color="#64748B"
                      />
                      <FontAwesome
                        name="thumbs-o-down"
                        size={16}
                        color="#64748B"
                        style={styles.thumbDown}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
        ) : (
          <View style={styles.noResultsContainer}>
            <MaterialIcons name="search-off" size={40} color="#E2E8F0" />
            <Text style={styles.noResultsText}>
              Không tìm thấy câu hỏi phù hợp
            </Text>
            <Text style={styles.noResultsSubText}>
              Hãy thử từ khóa khác hoặc liên hệ hỗ trợ
            </Text>
          </View>
        )}
      </View>

      {/* Liên hệ hỗ trợ */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Liên hệ hỗ trợ</Text>
        <Text style={styles.contactDescription}>
          Đội ngũ hỗ trợ luôn sẵn sàng giúp đỡ bạn
        </Text>

        <View style={styles.contactMethods}>
          {contactMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={styles.contactMethod}
              onPress={method.action}
              activeOpacity={0.7}
            >
              <View style={styles.contactIcon}>
                <method.iconSet name={method.icon} size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.contactMethodText}>{method.name}</Text>
              <Text style={styles.contactMethodTime}>{method.available}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Tài liệu hướng dẫn */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tài liệu hướng dẫn</Text>

        <TouchableOpacity style={styles.guideItem}>
          <MaterialCommunityIcons
            name="file-document-outline"
            size={24}
            color="#3B82F6"
          />
          <View style={styles.guideTextContainer}>
            <Text style={styles.guideTitle}>Hướng dẫn giáo viên</Text>
            <Text style={styles.guideSubtitle}>
              Cách sử dụng các tính năng giảng dạy
            </Text>
          </View>
          <AntDesign name="right" size={16} color="#64748B" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.guideItem}>
          <MaterialCommunityIcons
            name="file-video-outline"
            size={24}
            color="#3B82F6"
          />
          <View style={styles.guideTextContainer}>
            <Text style={styles.guideTitle}>Video hướng dẫn</Text>
            <Text style={styles.guideSubtitle}>
              Các video hướng dẫn chi tiết
            </Text>
          </View>
          <AntDesign name="right" size={16} color="#64748B" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  contentContainer: {
    paddingBottom: 30,
  },
  header: {
    padding: 24,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  headerText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: "#64748B",
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1E293B",
    padding: 0,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "#F1F5F9",
  },
  activeCategory: {
    backgroundColor: "#3B82F6",
  },
  categoryText: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
  },
  activeCategoryText: {
    color: "#FFFFFF",
  },
  section: {
    marginTop: 12,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 16,
  },
  contactDescription: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 16,
  },
  faqItem: {
    marginBottom: 16,
  },
  faqQuestionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  faqIcon: {
    marginRight: 12,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: "500",
    color: "#334155",
    flex: 1,
    marginRight: 12,
  },
  faqAnswerContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 22,
  },
  helpfulButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  helpfulText: {
    fontSize: 13,
    color: "#64748B",
  },
  helpfulButtonGroup: {
    flexDirection: "row",
  },
  thumbDown: {
    marginLeft: 16,
  },
  noResultsContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 16,
    color: "#64748B",
    marginTop: 16,
    fontWeight: "500",
  },
  noResultsSubText: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 4,
  },
  contactMethods: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  contactMethod: {
    alignItems: "center",
    width: "30%",
  },
  contactIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  contactMethodText: {
    fontSize: 14,
    color: "#334155",
    textAlign: "center",
    fontWeight: "500",
  },
  contactMethodTime: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 4,
    textAlign: "center",
  },
  guideItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  guideTextContainer: {
    flex: 1,
    marginLeft: 16,
    marginRight: 8,
  },
  guideTitle: {
    fontSize: 16,
    color: "#334155",
    fontWeight: "500",
  },
  guideSubtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
  },
});

export default HelpCenterScreen;
