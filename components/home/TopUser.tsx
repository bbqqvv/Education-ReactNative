import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const TopUser = ({ name, title, image }) => {
  return (
    <View style={styles.card}>
      {/* Hình ảnh */}
      <Image source={image} style={styles.image} resizeMode="cover" />
      {/* Nội dung */}
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    overflow: "hidden",
    marginHorizontal: 8,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 100,
  },
  content: {
    padding: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  title: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});

export default TopUser;
