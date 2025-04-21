import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import { TimeTableApi } from '@/app/api/time-table/time-table.service';
import { TimeTableResponse, WeeklyScheduleResponse } from '@/app/api/time-table/time-table.type';

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
  const [weeklySchedule, setWeeklySchedule] = useState<WeeklyScheduleResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const getWeekStartDate = (date: string): string => {
    const selected = new Date(date);
    const day = selected.getDay();
    const diff = selected.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
    return new Date(selected.setDate(diff)).toISOString().split('T')[0];
  };

  const weekStart = useMemo(() => getWeekStartDate(selectedDate), [selectedDate]);

  useEffect(() => {
    fetchWeeklySchedule();
  }, [weekStart]);

  const fetchWeeklySchedule = async () => {
    try {
      setLoading(true);
      const className = '22itb'; // TODO: Fetch dynamically (e.g., from /api/users/current)
      const response = await TimeTableApi.getWeeklySchedule(className, weekStart);
      console.log('Weekly schedule response:', JSON.stringify(response, null, 2));
      if (response.success && response.data) {
        setWeeklySchedule(response.data);
        console.log('Set weekly schedule:', JSON.stringify(response.data, null, 2));
      } else {
        Alert.alert('Lỗi', response.message || 'Không thể tải thời khóa biểu');
      }
    } catch (error: any) {
      console.log('Error fetching weekly schedule:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi tải thời khóa biểu');
    } finally {
      setLoading(false);
      console.log('Loading state set to:', false);
    }
  };

  const getSubjectsForSelectedDate = (): TimeTableResponse[] => {
    if (!weeklySchedule) {
      console.log('No weekly schedule available');
      return [];
    }

    const normalizedSelectedDate = selectedDate.split('T')[0];
    console.log('Selected date (normalized):', normalizedSelectedDate);
    console.log('Schedule dates:', weeklySchedule.schedule.map(day => day.date));

    const dailySchedule = weeklySchedule.schedule.find(
      (day) => day.date === normalizedSelectedDate
    );

    console.log('Daily schedule for', normalizedSelectedDate, ':', dailySchedule);

    if (!dailySchedule) {
      console.log('No daily schedule found for', normalizedSelectedDate);
      return [];
    }

    console.log('Lessons for', normalizedSelectedDate, ':', dailySchedule.lessons);
    return dailySchedule.lessons.sort((a, b) => a.period - b.period);
  };

  // Log rendering details
  useEffect(() => {
    const lessons = getSubjectsForSelectedDate();
    console.log('Rendering with lessons:', lessons);
    console.log('Loading state:', loading);
  }, [selectedDate, weeklySchedule, loading]);

  const handleBack = () => {
    router.back();
  };

  // Mark dates with classes
  const markedDates: { [key: string]: any } = {};
  if (weeklySchedule) {
    weeklySchedule.schedule.forEach((day) => {
      if (day.lessons.length > 0) {
        markedDates[day.date] = {
          marked: true,
          dotColor: '#06b6d4',
          activeOpacity: 0.8,
        };
      }
    });
  }
  markedDates[selectedDate.split('T')[0]] = {
    selected: true,
    selectedColor: '#06b6d4',
    selectedTextColor: '#fff',
    marked: markedDates[selectedDate.split('T')[0]]?.marked || false,
    dotColor: '#fff',
  };

  // Map period to time slot
  const getTimeForPeriod = (period: number): string => {
    const timeSlots = {
      1: '07:30 - 09:00',
      2: '09:15 - 10:45',
      3: '13:00 - 14:30',
      4: '14:45 - 16:15',
    };
    return timeSlots[period] || `${period}:00 - ${period + 1}:30`;
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
          <Text style={styles.headerTitle}>Thời Khóa Biểu {weeklySchedule?.className || ''}</Text>
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
                justifyContent: 'space-around',
              },
            },
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
              year: 'numeric',
            })}
          </Text>
        </View>

        {(() => {
          console.log('Render: Loading state:', loading);
          if (loading) {
            return (
              <View style={styles.emptyState}>
                <Ionicons name="hourglass-outline" size={48} color="#d1d5db" />
                <Text style={styles.emptyText}>Đang tải thời khóa biểu...</Text>
              </View>
            );
          }

          const lessons = getSubjectsForSelectedDate();
          console.log('Render: Lessons length:', lessons.length);
          console.log('Render: Lessons content:', lessons);

          if (lessons.length > 0) {
            console.log('Render: Mapping lessons:', lessons);
            return (
              <View>
                <Text style={styles.debugText}>Rendering {lessons.length} lesson(s)</Text>
                {lessons.map((lesson: TimeTableResponse) => {
                  console.log('Render: Lesson ID:', lesson.id);
                  return (
                    <View key={lesson.id} style={styles.subjectCard}>
                      <View style={styles.subjectHeader}>
                        <Text style={styles.subjectTitle}>{lesson.subject}</Text>
                        <View style={styles.classTypeBadge}>
                          <Text style={styles.classTypeText}>Tiết {lesson.period}</Text>
                        </View>
                      </View>
                      <View style={styles.subjectDetails}>
                        <View style={styles.detailRow}>
                          <Ionicons name="time-outline" size={16} color="#6b7280" />
                          <Text style={styles.detailText}>{getTimeForPeriod(lesson.period)}</Text>
                        </View>
                        <View style={styles.detailRow}>
                          <Ionicons name="person-outline" size={16} color="#6b7280" />
                          <Text style={styles.detailText}>{lesson.teacherName}</Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            );
          }

          return (
            <View style={styles.emptyState}>
              <Ionicons name="school-outline" size={48} color="#d1d5db" />
              <Text style={styles.emptyText}>Không có lịch học trong ngày này</Text>
            </View>
          );
        })()}

        {/* Download Button (Placeholder) */}
        <TouchableOpacity
          style={styles.downloadButton}
          activeOpacity={0.8}
          onPress={() => Alert.alert('Thông báo', 'Chức năng tải xuống đang được phát triển')}
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
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
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
    backgroundColor: '#3b82f6',
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
  debugText: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Timetable;