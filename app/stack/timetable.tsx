import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Calendar, LocaleConfig } from 'react-native-calendars';

// Cấu hình ngôn ngữ (tuỳ chọn)
LocaleConfig.locales['vi'] = {
  monthNames: [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ],
  monthNamesShort: [
    'Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6',
    'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'
  ],
  dayNames: ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: 'Hôm nay'
};
LocaleConfig.defaultLocale = 'vi';

const Timetable = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const handleBack = () => {
    router.back();
  };

  // Dữ liệu thời khóa biểu mẫu
  const timetableData = {
    '2025-04-14': [
      { subject: 'Toán', time: '07:30 - 09:00', room: 'P.101' },
      { subject: 'Vật lý', time: '09:15 - 10:45', room: 'P.202' },
    ],
    '2025-04-15': [
      { subject: 'Ngữ văn', time: '07:30 - 09:00', room: 'P.103' },
      { subject: 'Lịch sử', time: '09:15 - 10:45', room: 'P.204' },
    ],
    '2025-04-16': [
      { subject: 'Hóa học', time: '07:30 - 09:00', room: 'Lab.1' },
      { subject: 'Sinh học', time: '09:15 - 10:45', room: 'Lab.2' },
    ],
    '2025-04-17': [
      { subject: 'Toán', time: '07:30 - 09:00', room: 'P.101' },
      { subject: 'Vật lý', time: '09:15 - 10:45', room: 'P.202' },
    ],
    '2025-04-18': [
      { subject: 'Ngữ văn', time: '07:30 - 09:00', room: 'P.103' },
      { subject: 'Lịch sử', time: '09:15 - 10:45', room: 'P.204' },
    ],
    '2025-04-19': [
      { subject: 'Hóa học', time: '07:30 - 09:00', room: 'Lab.1' },
      { subject: 'Sinh học', time: '09:15 - 10:45', room: 'Lab.2' },
    ],
    '2025-04-20': [
      { subject: 'Hóa học', time: '07:30 - 09:00', room: 'Lab.1' },
      { subject: 'Sinh học', time: '09:15 - 10:45', room: 'Lab.2' },
    ],
    // Thêm dữ liệu cho các ngày khác...
  };

  // Lấy danh sách môn học theo ngày được chọn
  const getSubjectsForSelectedDate = () => {
    return timetableData[selectedDate] || [];
  };

  // Đánh dấu các ngày có lịch học
  const markedDates = {};
  Object.keys(timetableData).forEach(date => {
    markedDates[date] = { marked: true, dotColor: '#59CBE8' };
  });
  markedDates[selectedDate] = { 
    selected: true, 
    selectedColor: '#59CBE8',
    marked: true,
    dotColor: 'white'
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thời khóa biểu</Text>
        <View style={{ width: 24 }} />
      </View>
      {/* Calendar */}
      <View style={styles.calendarContainer}>
        <Calendar
          current={selectedDate}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          theme={{
            calendarBackground: '#fff',
            selectedDayBackgroundColor: '#59CBE8',
            selectedDayTextColor: '#fff',
            todayTextColor: '#59CBE8',
            dayTextColor: '#333',
            textDisabledColor: '#ddd',
            arrowColor: '#59CBE8',
            monthTextColor: '#333',
            textMonthFontWeight: 'bold',
            textDayFontSize: 14,
            textMonthFontSize: 16,
          }}
        />
      </View>

      {/* Danh sách môn học */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        <Text style={styles.sectionTitle}>
          Lịch học ngày {new Date(selectedDate).toLocaleDateString('vi-VN')}
        </Text>

        {getSubjectsForSelectedDate().length > 0 ? (
          getSubjectsForSelectedDate().map((subject, index) => (
            <View key={index} style={styles.subjectCard}>
              <Text style={styles.subjectTitle}>{subject.subject}</Text>
              <View style={styles.subjectInfo}>
                <Text style={styles.subjectDetail}>{subject.time}</Text>
                <Text style={styles.subjectDetail}>Phòng: {subject.room}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Không có lịch học trong ngày này</Text>
        )}

        {/* Nút tải xuống */}
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadButtonText}>Tải xuống thời khóa biểu</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#59CBE8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  calendarContainer: {
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 20,
  },
  subjectCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  subjectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subjectInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subjectDetail: {
    fontSize: 14,
    color: '#555',
  },

  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontSize: 14,
  },
  downloadButton: {
    backgroundColor: '#59CBE8',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Timetable;