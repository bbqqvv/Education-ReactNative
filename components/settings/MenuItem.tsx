import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MenuItem = ({ icon, text, color = "#1A1A1A", onPress, isLast }) => {
  return (
    <>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={onPress}
        activeOpacity={0.6}
      >
        <View style={styles.menuItemLeft}>
          <Ionicons name={icon} size={22} color={color} style={styles.icon} />
          <Text style={[styles.menuText, color === "#FF3B30" && styles.logoutText]}>
            {text}
          </Text>
        </View>
        {color !== "#FF3B30" && (
          <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
        )}
      </TouchableOpacity>
      {!isLast && <View style={styles.divider} />}
    </>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    color: "#1A1A1A",
    fontFamily: "Inter-Regular",
  },
  logoutText: {
    color: "#FF3B30",
    fontFamily: "Inter-Medium",
  },
  divider: {
    height: 1,
    backgroundColor: "#F5F5F5",
    marginHorizontal: 20,
  },
});

export default MenuItem;