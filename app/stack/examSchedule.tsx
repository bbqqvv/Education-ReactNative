import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const examSchedule = [
  { day: "11", month: "JAN", subject: "Science", weekday: "Monday", time: "09:00 AM" },
  { day: "13", month: "JAN", subject: "English", weekday: "Wednesday", time: "09:00 AM" },
  { day: "15", month: "JAN", subject: "Hindi", weekday: "Friday", time: "09:00 AM" },
  { day: "18", month: "JAN", subject: "Math", weekday: "Monday", time: "09:00 AM" },
  { day: "20", month: "JAN", subject: "Social Study", weekday: "Wednesday", time: "09:00 AM" },
  { day: "22", month: "JAN", subject: "Drawing", weekday: "Friday", time: "09:00 AM" },
  { day: "25", month: "JAN", subject: "Computer", weekday: "Monday", time: "09:00 AM" },
];

export default function ClassScreen() {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.dateContainer}>
        <Text style={styles.day}>{item.day}</Text>
        <Text style={styles.month}>{item.month}</Text>
      </View>
      <View style={styles.subjectContainer}>
        <Text style={styles.subject}>{item.subject}</Text>
        <Text style={styles.weekday}>{item.weekday}</Text>
      </View>
      <View style={styles.timeContainer}>
        <Ionicons name="time-outline" size={18} color="#999" />
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lịch thi</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* List */}
      <FlatList
        data={examSchedule}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      {/* Download Button */}
      <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.downloadText}>Tải xuống</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#5DC5D3",
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  dateContainer: {
    width: 50,
    alignItems: "center",
  },
  day: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  month: {
    fontSize: 12,
    color: "#999",
    textTransform: "uppercase",
  },
  subjectContainer: {
    flex: 1,
    marginLeft: 12,
  },
  subject: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  weekday: {
    fontSize: 13,
    color: "#777",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    marginLeft: 6,
    color: "#999",
    fontSize: 13,
  },
  downloadButton: {
    backgroundColor: "#00A9C0",
    paddingVertical: 14,
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 32,
  },
  downloadText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
