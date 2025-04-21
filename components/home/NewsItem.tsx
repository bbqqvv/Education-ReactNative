import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface NewsItemProps {
  title: string;
  excerpt: string;
  category: string;
  createdAt: string;
  image: string;
  onPress?: () => void;
}

const NewsItem: React.FC<NewsItemProps> = ({
  title,
  excerpt,
  category,
  createdAt,
  image,
  onPress,
}) => {
  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const formatter = new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      const parts = formatter.formatToParts(date);
      const get = (type: string) =>
        parts.find((p) => p.type === type)?.value || "";

      return {
        date: `${get("day")}/${get("month")}/${get("year")}`,
        time: `${get("hour")}:${get("minute")}`,
      };
    } catch (err) {
      return {
        date: "Không xác định",
        time: "",
      };
    }
  };

  
  const { date, time } = formatDateTime(createdAt);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.container}
      onPress={onPress}
    >
      {/* Image on the left */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
      </View>

      {/* Content on the right */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
        <Text style={styles.excerpt} numberOfLines={2}>
          {excerpt}
        </Text>
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <MaterialIcons name="calendar-today" size={14} color="#79CDCD" />
            <Text style={styles.metaText}>{date}</Text>
          </View>
          {time && (
            <View style={styles.metaItem}>
              <MaterialIcons name="access-time" size={14} color="#79CDCD" />
              <Text style={styles.metaText}>{time}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginRight: 16,
    flexDirection: "row",
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
    marginRight: 12,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  categoryBadge: {
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FF6B00",
    textTransform: "uppercase",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#222",
    marginBottom: 6,
    lineHeight: 20,
  },
  excerpt: {
    fontSize: 13,
    color: "#555",
    marginBottom: 8,
    lineHeight: 18,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
    marginBottom: 2,
  },
  metaText: {
    fontSize: 11,
    color: "#666",
    marginLeft: 4,
    fontWeight: "500",
  },
});

export default NewsItem;