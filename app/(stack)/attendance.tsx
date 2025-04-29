import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router'; // Import useRouter
import { AttendanceService } from '../api/attendance/attendance.service';
import { AttendanceResponse } from '../api/attendance/attendance.types';

function AttendanceComponent() {
  const [attendances, setAttendances] = useState<AttendanceResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Sử dụng router để điều hướng

  useEffect(() => {
    async function fetchClassAttendance() {
      try {
        setLoading(true);
        const response = await AttendanceService.getAttendanceByClass('12A1');
        setAttendances(response.data);
      } catch (error) {
        console.error('Error:', error.message);
        Alert.alert('Lỗi', 'Không thể tải danh sách điểm danh');
      } finally {
        setLoading(false);
      }
    }

    fetchClassAttendance();
  }, []);

  const renderItem = ({ item }: { item: AttendanceResponse }) => (
    <View style={styles.attendanceCard}>
      <View style={styles.attendanceHeader}>
        <Text style={styles.studentName}>{item.studentName}</Text>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                item.status === 'PRESENT'
                  ? '#4CAF50'
                  : item.status === 'ABSENT'
                  ? '#F44336'
                  : item.status === 'LATE'
                  ? '#FFC107'
                  : '#2196F3',
            },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.attendanceDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={16} color="#6b7280" />
          <Text style={styles.detailText}>
            {new Date(item.date).toLocaleDateString('vi-VN')}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time-outline" size={16} color="#6b7280" />
          <Text style={styles.detailText}>
            {new Date(item.date).toLocaleTimeString('vi-VN')}
          </Text>
        </View>
      </View>
    </View>
  );

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
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push('/home')} // Điều hướng về trang Home
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Danh sách điểm danh</Text>
        </View>
      </LinearGradient>

      {/* Attendance List */}
      <FlatList
        data={attendances}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          loading ? (
            <View style={styles.emptyState}>
              <Ionicons name="hourglass-outline" size={48} color="#d1d5db" />
              <Text style={styles.emptyText}>Đang tải danh sách...</Text>
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="people-outline" size={48} color="#d1d5db" />
              <Text style={styles.emptyText}>Không có dữ liệu điểm danh</Text>
            </View>
          )
        }
      />

      {/* Record Attendance Button */}
      <TouchableOpacity
        style={styles.recordButton}
        onPress={() => Alert.alert('Thông báo', 'Chức năng đang được phát triển')}
      >
        <Ionicons name="add-outline" size={20} color="#fff" />
        <Text style={styles.recordButtonText}>Thêm điểm danh</Text>
      </TouchableOpacity>
    </View>
  );
}

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
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  attendanceCard: {
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
  attendanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  studentName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  attendanceDetails: {
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
  recordButton: {
    backgroundColor: '#06b6d4',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  recordButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
});

export default AttendanceComponent;