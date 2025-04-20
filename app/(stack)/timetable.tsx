import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Animated,
  Easing
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';

// Vietnamese locale configuration
LocaleConfig.locales['vi'] = {
  monthNames: [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ],
  monthNamesShort: [
    'Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6',
    'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'
  ],
  dayNames: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: 'Hôm nay'
};
LocaleConfig.defaultLocale = 'vi';

const Timetable = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, []);

  const handleBack = () => {
    router.back();
  };

  // Sample timetable data
  const timetableData = {
    '2025-04-14': [
      { id: '1', subject: 'Toán', time: '07:30 - 09:00', room: 'P.101', type: 'Lý thuyết', teacher: 'Nguyễn Văn A' },
      { id: '2', subject: 'Vật lý', time: '09:15 - 10:45', room: 'P.202', type: 'Thực hành', teacher: 'Trần Thị B' },
    ],
    '2025-04-15': [
      { id: '3', subject: 'Ngữ văn', time: '07:30 - 09:00', room: 'P.103', type: 'Lý thuyết', teacher: 'Phạm Văn C' },
      { id: '4', subject: 'Lịch sử', time: '09:15 - 10:45', room: 'P.204', type: 'Seminar', teacher: 'Lê Thị D' },
    ],
    '2025-04-16': [
      { id: '5', subject: 'Hóa học', time: '07:30 - 09:00', room: 'Lab.1', type: 'Thí nghiệm', teacher: 'Hoàng Văn E' },
      { id: '6', subject: 'Sinh học', time: '09:15 - 10:45', room: 'Lab.2', type: 'Thí nghiệm', teacher: 'Vũ Thị F' },
    ],
    '2025-04-17': [
      { id: '7', subject: 'Toán', time: '07:30 - 09:00', room: 'P.101', type: 'Lý thuyết', teacher: 'Nguyễn Văn A' },
      { id: '8', subject: 'Vật lý', time: '09:15 - 10:45', room: 'P.202', type: 'Bài tập', teacher: 'Trần Thị B' },
    ],
    '2025-04-18': [
      { id: '9', subject: 'Ngữ văn', time: '07:30 - 09:00', room: 'P.103', type: 'Thảo luận', teacher: 'Phạm Văn C' },
      { id: '10', subject: 'Lịch sử', time: '09:15 - 10:45', room: 'P.204', type: 'Lý thuyết', teacher: 'Lê Thị D' },
    ],
    '2025-04-19': [
      { id: '11', subject: 'Hóa học', time: '07:30 - 09:00', room: 'Lab.1', type: 'Thí nghiệm', teacher: 'Hoàng Văn E' },
      { id: '12', subject: 'Sinh học', time: '09:15 - 10:45', room: 'Lab.2', type: 'Thí nghiệm', teacher: 'Vũ Thị F' },
    ],
  };

  const getSubjectsForSelectedDate = () => {
    return timetableData[selectedDate] || [];
  };

  // Mark dates with classes
  const markedDates = {};
  Object.keys(timetableData).forEach(date => {
    markedDates[date] = {
      marked: true,
      dotColor: '#06b6d4',
      activeOpacity: 0.8
    };
  });
  markedDates[selectedDate] = {
    selected: true,
    selectedColor: '#06b6d4',
    selectedTextColor: '#fff',
    marked: true,
    dotColor: '#fff'
  };

  const getClassTypeColor = (type) => {
    const colors = {
      'Lý thuyết': '#3b82f6',
      'Thực hành': '#10b981',
      'Thí nghiệm': '#ef4444',
      'Seminar': '#8b5cf6',
      'Bài tập': '#f59e0b',
      'Thảo luận': '#ec4899'
    };
    return colors[type] || '#6b7280';
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header with Gradient */}
      <LinearGradient
        colors={['#4A90E2', '#59CBE8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thời Khóa Biểu</Text>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      {/* Calendar */}
      <View style={styles.calendarContainer}>
        <Calendar
          current={selectedDate}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          theme={{
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#374151',
            selectedDayBackgroundColor: '#06b6d4',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#06b6d4',
            dayTextColor: '#1f2937',
            textDisabledColor: '#d1d5db',
            arrowColor: '#06b6d4',
            monthTextColor: '#1f2937',
            textMonthFontWeight: '600',
            textDayFontSize: 14,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 13,
            'stylesheet.calendar.header': {
              week: {
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-around'
              }
            }
          }}
        />
      </View>

      {/* Class List */}
      <ScrollView
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.dateHeader}>
          <Ionicons name="calendar" size={20} color="#06b6d4" />
          <Text style={styles.dateHeaderText}>
            {new Date(selectedDate).toLocaleDateString('vi-VN', {
              weekday: 'long',
              day: 'numeric',
              month: 'numeric',
              year: 'numeric'
            })}
          </Text>
        </View>

        {getSubjectsForSelectedDate().length > 0 ? (
          getSubjectsForSelectedDate().map((subject) => (
            <Animated.View
              key={subject.id}
              style={[
                styles.subjectCard,
                { opacity: fadeAnim }
              ]}
            >
              <View style={styles.subjectHeader}>
                <Text style={styles.subjectTitle}>{subject.subject}</Text>
                <View style={[
                  styles.classTypeBadge,
                  { backgroundColor: getClassTypeColor(subject.type) }
                ]}>
                  <Text style={styles.classTypeText}>{subject.type}</Text>
                </View>
              </View>

              <View style={styles.subjectDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={16} color="#6b7280" />
                  <Text style={styles.detailText}>{subject.time}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="location-outline" size={16} color="#6b7280" />
                  <Text style={styles.detailText}>{subject.room}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="person-outline" size={16} color="#6b7280" />
                  <Text style={styles.detailText}>{subject.teacher}</Text>
                </View>
              </View>
            </Animated.View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="school-outline" size={48} color="#d1d5db" />
            <Text style={styles.emptyText}>Không có lịch học trong ngày này</Text>
          </View>
        )}

        {/* Download Button */}
        <TouchableOpacity
          style={styles.downloadButton}
          activeOpacity={0.8}
        >
          <Ionicons name="download-outline" size={20} color="#fff" />
          <Text style={styles.downloadButtonText}>Tải xuống thời khóa biểu</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: {
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
  calendarContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 8,
  },
  dateHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 8,
  },
  subjectCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subjectTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  classTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  classTypeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  subjectDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#4b5563',
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 16,
    textAlign: 'center',
  },
  downloadButton: {
    backgroundColor: '#06b6d4',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
});

export default Timetable;