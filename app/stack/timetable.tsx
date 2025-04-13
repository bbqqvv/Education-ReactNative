import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Timetable = () => {
  const router = useRouter();
  
  const handleBack = () => {
    router.back();
  };

  // Sample timetable data
  const timetableData = [
    { subject: 'Science', day: 'Monday', time: '09:00 AM' },
    { subject: 'English', day: 'Wednesday', time: '09:00 AM' },
    { subject: 'Hindi', day: 'Friday', time: '09:00 AM' },
    { subject: 'Math', day: 'Monday', time: '09:00 AM' },
    { subject: 'Social Study', day: 'Wednesday', time: '09:00 AM' },
    { subject: 'Drawing', day: 'Friday', time: '09:00 AM' },
    { subject: 'Computer', day: 'Monday', time: '09:00 AM' },
  ];

  // Current week dates
  const weekDates = [
    { day: 'Mon', date: '14' },
    { day: 'Tue', date: '15' },
    { day: 'Wed', date: '16' },
    { day: 'Thu', date: '17' },
    { day: 'Fri', date: '18' },
    { day: 'Sat', date: '19' },
    { day: 'Sun', date: '20' },
  ];

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

      {/* Week Calendar */}
      <View style={styles.weekContainer}>
        {weekDates.map((item, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.dayText}>{item.day}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      {/* Timetable List */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {timetableData.map((item, index) => (
          <View key={index} style={styles.subjectCard}>
            <Text style={styles.subjectTitle}>{item.subject}</Text>
            <View style={styles.subjectInfo}>
              <Text style={styles.subjectDetail}>{item.day}</Text>
              <Text style={styles.subjectDetail}>{item.time}</Text>
            </View>
          </View>
        ))}

        {/* Download Button */}
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadButtonText}>Tải xuống</Text>
          <Text style={styles.downloadButtonSubText}>Xem</Text>
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
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 16,
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
  downloadButton: {
    backgroundColor: '#59CBE8',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  downloadButtonSubText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
});

export default Timetable;