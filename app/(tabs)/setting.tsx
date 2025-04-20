import React from "react";
import { SafeAreaView, ScrollView, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAppDispatch } from "../store/hooks";
import { logoutUser } from "../store/slices/authSlice";
import ProfileCard from "@/components/settings/ProfileCard";
import MenuSection from "@/components/settings/MenuSection";


const Setting = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      {
        text: "Huỷ",
        style: "cancel",
      },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: async () => {
          await dispatch(logoutUser());
          router.push("/sign-in/sign-in");
        },
      },
    ]);
  };

  const user = {
    name: "Seven Kay",
    email: "seven.kay@example.com",
  };

  const menuSections = [
    {
      title: "TÀI KHOẢN",
      items: [
        { icon: "person-outline", text: "Thông tin cá nhân", onPress: () => { } },
        { icon: "lock-closed-outline", text: "Bảo mật tài khoản", onPress: () => { } },
        { icon: "notifications-outline", text: "Thông báo", onPress: () => { } },
      ],
    },
    {
      title: "HỖ TRỢ",
      items: [
        { icon: "help-circle-outline", text: "Trung tâm trợ giúp", onPress: () => { } },
        { icon: "information-circle-outline", text: "Điều khoản & Chính sách", onPress: () => { } },
        { icon: "star-outline", text: "Đánh giá ứng dụng", onPress: () => { } },
      ],
    },
    {
      title: "KHÁC",
      items: [
        { icon: "log-out-outline", text: "Đăng xuất", color: "#FF3B30", onPress: handleLogout },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <ProfileCard user={user} />

        {menuSections.map((section, index) => (
          <MenuSection
            key={`section-${index}`}
            title={section.title}
            items={section.items}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  scrollContainer: {
    paddingBottom: 30,
  },
});

export default Setting;