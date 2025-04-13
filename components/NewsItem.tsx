import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const NewsItem = ({ title, date, time, image }) => {
  return (
    <View style={styles.container}>
      {/* Hình ảnh bên trái */}
      <Image source={image} style={styles.image} />
      {/* Nội dung bên phải */}
      <View style={styles.content}>
        <Text style={styles.category}>Tin mới</Text>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.metaContainer}>
          {/* Thông tin ngày tháng */}
          <View style={styles.meta}>
            <MaterialIcons name="calendar-today" size={14} color="#999" />
            <Text style={styles.metaText}>{date}</Text>
          </View>
          {/* Thông tin thời gian */}
          <View style={styles.meta}>
            <MaterialIcons name="access-time" size={14} color="#999" />
            <Text style={styles.metaText}>{time}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    marginBottom: 12,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: "space-around",
  },
  category: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  metaText: {
    fontSize: 12,
    color: "#999",
    marginLeft: 4,
  },
});

export default NewsItem;
