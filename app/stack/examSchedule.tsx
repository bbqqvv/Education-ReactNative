import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Animated,
  Easing,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';

const examSchedule = [
  {
    id: '1',
    day: "11",
    month: "JAN",
    subject: "Science",
    weekday: "Monday",
    time: "09:00 AM",
    location: "Room 301",
    type: "Midterm"
  },
  {
    id: '2',
    day: "13",
    month: "JAN",
    subject: "English",
    weekday: "Wednesday",
    time: "09:00 AM",
    location: "Room 205",
    type: "Quiz"
  },
  {
    id: '3',
    day: "15",
    month: "JAN",
    subject: "Hindi",
    weekday: "Friday",
    time: "09:00 AM",
    location: "Room 102",
    type: "Final"
  },
  {
    id: '4',
    day: "18",
    month: "JAN",
    subject: "Math",
    weekday: "Monday",
    time: "09:00 AM",
    location: "Room 401",
    type: "Midterm"
  },
  {
    id: '5',
    day: "20",
    month: "JAN",
    subject: "Social Study",
    weekday: "Wednesday",
    time: "09:00 AM",
    location: "Room 303",
    type: "Quiz"
  },
  {
    id: '6',
    day: "22",
    month: "JAN",
    subject: "Drawing",
    weekday: "Friday",
    time: "09:00 AM",
    location: "Art Room",
    type: "Practical"
  },
  {
    id: '7',
    day: "25",
    month: "JAN",
    subject: "Computer",
    weekday: "Monday",
    time: "09:00 AM",
    location: "Lab 2",
    type: "Final"
  },
];

export default function ClassScreen() {
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const renderItem = ({ item }) => (
    <Animated.View
      style={[
        styles.itemContainer,
        { opacity: fadeAnim }
      ]}
    >
      <View style={styles.dateContainer}>
        <Text style={styles.day}>{item.day}</Text>
        <Text style={styles.month}>{item.month}</Text>
        <View style={[
          styles.examTypeBadge,
          {
            backgroundColor: getExamTypeColor(item.type),
            shadowColor: getExamTypeColor(item.type)
          }
        ]}>
          <Text style={styles.examTypeText}>{item.type}</Text>
        </View>
      </View>
      <View style={styles.subjectContainer}>
        <Text style={styles.subject}>{item.subject}</Text>
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={14} color="#6b7280" />
            <Text style={styles.metaText}>{item.weekday}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color="#6b7280" />
            <Text style={styles.metaText}>{item.time}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={14} color="#6b7280" />
            <Text style={styles.metaText}>{item.location}</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  );

  const getExamTypeColor = (type) => {
    const colors = {
      'Midterm': '#3b82f6',
      'Final': '#ef4444',
      'Quiz': '#10b981',
      'Practical': '#f59e0b'
    };
    return colors[type] || '#6b7280';
  };

  return (

    <View style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={['#06b6d4', '#0891b2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Lịch Thi</Text>
          <View style={styles.headerRight} />
        </View>

        <View style={styles.headerInfo}>
          <Text style={styles.headerSubtitle}>Kỳ thi học kỳ 1 - 2023</Text>
          <Text style={styles.headerCount}>{examSchedule.length} bài kiểm tra</Text>
        </View>
      </LinearGradient>

      <StatusBar barStyle="light-content" />


      {/* Exam List */}
      <FlatList
        data={examSchedule}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>Lịch thi theo ngày</Text>
        }
      />

      {/* Download Button */}
      <TouchableOpacity
        style={styles.downloadButton}
        activeOpacity={0.8}
      >
        <Ionicons name="download-outline" size={20} color="#fff" />
        <Text style={styles.downloadText}>Tải xuống lịch thi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: 'center',
  },
  headerRight: {
    width: 32,
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerSubtitle: {
    color: "#e0f2fe",
    fontSize: 14,
  },
  headerCount: {
    color: "#fff",
    fontSize: 14,
    fontWeight: '500',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginVertical: 16,
    marginLeft: 4,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dateContainer: {
    width: 60,
    alignItems: "center",
    marginRight: 12,
  },
  day: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
  },
  month: {
    fontSize: 12,
    color: "#6b7280",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  examTypeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  examTypeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  subjectContainer: {
    flex: 1,
  },
  subject: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  metaContainer: {
    gap: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 13,
    color: "#6b7280",
    marginLeft: 6,
  },
  downloadButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: "#06b6d4",
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  downloadText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

function getExamTypeColor(type: string): string {
  throw new Error("Function not implemented.");
}