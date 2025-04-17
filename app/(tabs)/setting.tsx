import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { logoutUser } from "../store/slices/authSlice";
import { useAppDispatch } from "../store/hooks";

const Setting = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Huỷ", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: async () => {
          await dispatch(logoutUser());
          router.push("/sign-in/sign-in");
          if (typeof window !== "undefined") {
            window.location.reload();
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#555" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cài Đặt</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image
            source={require("../../assets/images/avatar.png")}
            style={styles.avatar}
          />
          <Text style={styles.name}>Seven Kay</Text>
          <Text style={styles.email}>seven.kay@example.com</Text>

          <View style={styles.profileStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>42</Text>
              <Text style={styles.statLabel}>Bạn bè</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>128</Text>
              <Text style={styles.statLabel}>Nhóm</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2022</Text>
              <Text style={styles.statLabel}>Tham gia</Text>
            </View>
          </View>
        </View>

        {/* Settings Menu */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>TÀI KHOẢN</Text>

          <MenuItem
            icon="person-outline"
            text="Thông tin cá nhân"
            onPress={() => { }}
          />
          <MenuItem
            icon="lock-closed-outline"
            text="Bảo mật tài khoản"
            onPress={() => { }}
          />
          <MenuItem
            icon="notifications-outline"
            text="Thông báo"
            onPress={() => { }}
          />

          <Text style={styles.menuTitle}>HỖ TRỢ</Text>

          <MenuItem
            icon="help-circle-outline"
            text="Trung tâm trợ giúp"
            onPress={() => { }}
          />
          <MenuItem
            icon="information-circle-outline"
            text="Điều khoản & Chính sách"
            onPress={() => { }}
          />
          <MenuItem
            icon="star-outline"
            text="Đánh giá ứng dụng"
            onPress={() => { }}
          />

          <Text style={styles.menuTitle}>KHÁC</Text>

          <MenuItem
            icon="log-out-outline"
            text="Đăng xuất"
            color="#e74c3c"
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuItem = ({ icon, text, color = "#555", onPress }) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Ionicons name={icon} size={22} color={color} style={styles.icon} />
    <Text style={styles.menuText}>{text}</Text>
    <Ionicons name="chevron-forward" size={20} color="#aaa" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  headerRight: {
    width: 30,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#3498db",
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: "#777",
    marginBottom: 15,
  },
  profileStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  statItem: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3498db",
  },
  statLabel: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
  },
  menuContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 15,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 50,

  },
  menuTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
    paddingHorizontal: 20,
    paddingVertical: 8,
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  icon: {
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});

export default Setting;