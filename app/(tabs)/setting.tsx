import React from "react";
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useAuth from "@/hooks/auth/useAuth";

const Setting = () => {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert("Success", "You have been logged out.");
    } catch (error) {
      console.error("Logout failed:", error);
      Alert.alert("Error", "Logout failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Hồ sơ người dùng */}
      <View style={styles.profileContainer}>
        <Image
          source={user?.avatar ? { uri: user.avatar } : require("../../assets/images/avatar.png")}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.username || "Seven Kay"}</Text>
        <Text style={styles.location}>Islamabad</Text>
        <Text style={styles.since}>Since 2022</Text>
      </View>

      {/* Menu cài đặt */}
      <View style={styles.menuContainer}>
        <MenuItem icon="settings-outline" text="Cài Đặt Chung" />
        <MenuItem icon="information-circle-outline" text="Hướng Dẫn Sử Dụng" bold />
        <MenuItem icon="log-out-outline" text="Đăng Xuất" onPress={handleLogout} />
      </View>
    </View>
  );
};

// Component item menu
const MenuItem = ({ icon, text, onPress, bold }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Ionicons name={icon} size={22} color="#3498db" style={styles.icon} />
    <Text style={[styles.menuText, bold && styles.boldText]}>{text}</Text>
  </TouchableOpacity>
);

// Định nghĩa styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  profileContainer: { alignItems: "center", marginBottom: 20 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: "bold", color: "#3498db" },
  location: { fontSize: 16, color: "#333" },
  since: { fontSize: 14, color: "#777" },

  menuContainer: { marginTop: 10 },
  menuItem: { flexDirection: "row", alignItems: "center", paddingVertical: 12 },
  icon: { marginRight: 10 },
  menuText: { fontSize: 16, color: "#333" },
  boldText: { fontWeight: "bold" },
});

export default Setting;
