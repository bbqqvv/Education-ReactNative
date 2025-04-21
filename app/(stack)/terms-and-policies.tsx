import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { MaterialIcons, Feather, AntDesign } from "@expo/vector-icons";

const TermsAndPoliciesScreen = () => {
  const [activeTab, setActiveTab] = useState("terms");

  // Danh sách các điều khoản và chính sách
  const policies = {
    terms: {
      title: "Điều khoản sử dụng",
      content: [
        {
          title: "1. Chấp nhận điều khoản",
          content:
            "Bằng việc sử dụng ứng dụng này, bạn đồng ý với tất cả các điều khoản và điều kiện được nêu ra trong tài liệu này.",
        },
        {
          title: "2. Tài khoản người dùng",
          content:
            "Người dùng phải cung cấp thông tin chính xác khi đăng ký tài khoản. Mỗi người dùng chỉ được phép sở hữu một tài khoản duy nhất.",
        },
        {
          title: "3. Quyền truy cập",
          content:
            "Giáo viên có quyền tạo và quản lý lớp học. Học sinh chỉ có thể tham gia lớp học khi được giáo viên mời hoặc có mã lớp hợp lệ.",
        },
        {
          title: "4. Nội dung bài giảng",
          content:
            "Tất cả nội dung bài giảng được tải lên ứng dụng là tài sản của người tạo ra chúng. Ứng dụng không chịu trách nhiệm về bản quyền nội dung.",
        },
        {
          title: "5. Quyền hạn và trách nhiệm",
          content:
            "Giáo viên chịu trách nhiệm về nội dung bài giảng và quản lý lớp học. Học sinh có trách nhiệm tuân thủ nội quy lớp học.",
        },
      ],
    },
    privacy: {
      title: "Chính sách bảo mật",
      content: [
        {
          title: "1. Thu thập thông tin",
          content:
            "Chúng tôi thu thập thông tin cá nhân cần thiết để cung cấp dịch vụ, bao gồm họ tên, email, thông tin lớp học và lịch sử học tập.",
        },
        {
          title: "2. Sử dụng thông tin",
          content:
            "Thông tin được sử dụng để cung cấp và cải thiện dịch vụ, liên lạc với người dùng, và đảm bảo an toàn cho cộng đồng giáo dục.",
        },
        {
          title: "3. Bảo vệ thông tin",
          content:
            "Chúng tôi áp dụng các biện pháp bảo mật tiêu chuẩn ngành để bảo vệ thông tin người dùng khỏi truy cập trái phép.",
        },
        {
          title: "4. Chia sẻ thông tin",
          content:
            "Thông tin người dùng sẽ không được chia sẻ với bên thứ ba ngoại trừ các trường hợp theo yêu cầu pháp lý hoặc với sự đồng ý của người dùng.",
        },
        {
          title: "5. Dữ liệu học tập",
          content:
            "Kết quả học tập và quá trình học của học sinh sẽ được lưu trữ để phục vụ mục đích giáo dục và có thể được chia sẻ với giáo viên phụ trách.",
        },
      ],
    },
    community: {
      title: "Quy tắc cộng đồng",
      content: [
        {
          title: "1. Hành vi ứng xử",
          content:
            "Người dùng phải tôn trọng lẫn nhau, không sử dụng ngôn ngữ xúc phạm, phân biệt đối xử hoặc có hành vi không phù hợp trong môi trường giáo dục.",
        },
        {
          title: "2. Nội dung phù hợp",
          content:
            "Tất cả nội dung đăng tải phải phù hợp với mục đích giáo dục, không chứa thông tin sai lệch, bạo lực hoặc nội dung không lành mạnh.",
        },
        {
          title: "3. Quyền sở hữu trí tuệ",
          content:
            "Người dùng phải tôn trọng bản quyền, chỉ tải lên nội dung do mình sáng tạo hoặc có quyền chia sẻ.",
        },
        {
          title: "4. Vi phạm và xử lý",
          content:
            "Mọi vi phạm sẽ được xem xét và có thể dẫn đến việc tạm ngưng hoặc chấm dứt tài khoản tùy theo mức độ nghiêm trọng.",
        },
        {
          title: "5. Tương tác trong lớp học",
          content:
            "Mọi thảo luận trong lớp học cần tập trung vào nội dung học tập, không spam hoặc đăng nội dung không liên quan.",
        },
      ],
    },
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Điều khoản & Chính sách</Text>
        <Text style={styles.subHeader}>Cập nhật lần cuối: 15/06/2023</Text>
      </View>

      {/* Tab điều hướng */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "terms" && styles.activeTab]}
          onPress={() => setActiveTab("terms")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "terms" && styles.activeTabText,
            ]}
          >
            Điều khoản
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "privacy" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("privacy")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "privacy" && styles.activeTabText,
            ]}
          >
            Bảo mật
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "community" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("community")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "community" && styles.activeTabText,
            ]}
          >
            Cộng đồng
          </Text>
        </TouchableOpacity>
      </View>

      {/* Nội dung - Sửa ở đây: Thay đổi cấu trúc ScrollView */}
      <View style={styles.scrollContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.policyTitle}>{policies[activeTab].title}</Text>

          {policies[activeTab].content.map((item, index) => (
            <View key={index} style={styles.policyItem}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemContent}>{item.content}</Text>
            </View>
          ))}

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Nếu bạn có bất kỳ câu hỏi nào về điều khoản và chính sách của
              chúng tôi, vui lòng liên hệ:
            </Text>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={() => Linking.openURL("mailto:support@edumanager.com")}
            >
              <Feather name="mail" size={16} color="#3B82F6" />
              <Text style={styles.contactButtonText}>
                support@edumanager.com
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    padding: 24,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
  },
  subHeader: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#3B82F6",
  },
  tabText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#64748B",
  },
  activeTabText: {
    color: "#3B82F6",
    fontWeight: "600",
  },
  // Sửa ở đây: Thay đổi cách bố trí ScrollView
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40, // Thêm padding bottom để nội dung không bị che
  },
  policyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 24,
  },
  policyItem: {
    marginBottom: 24,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 8,
  },
  itemContent: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 22,
  },
  footer: {
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  footerText: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 16,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  contactButtonText: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "500",
    marginLeft: 8,
  },
});

export default TermsAndPoliciesScreen;
