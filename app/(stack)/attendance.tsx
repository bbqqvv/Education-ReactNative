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
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { AttendanceService } from '../api/attendance/attendance.service';
import { AttendanceResponse } from '../api/attendance/attendance.types';
import * as Animatable from 'react-native-animatable';
import { format, parseISO, subDays } from 'date-fns';
import { vi } from 'date-fns/locale';
import FilterModal from '@/components/FilterModal';

// Constants for status values
const STATUS_LABELS: { [key: string]: string } = {
  ALL: 'Tất cả',
  PRESENT: 'Có mặt',
  ABSENT: 'Vắng',
  LATE: 'Muộn',
  EXCUSED: 'Nghỉ phép',
};

const STATUS_COLORS: { [key: string]: string } = {
  ALL: '#9CA3AF',
  PRESENT: '#10B981',
  ABSENT: '#EF4444',
  LATE: '#F59E0B',
  EXCUSED: '#3B82F6',
};

function AttendanceComponent() {
  const [attendances, setAttendances] = useState<AttendanceResponse[]>([]);
  const [filteredAttendances, setFilteredAttendances] = useState<AttendanceResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    searchQuery: '',
    statusFilter: 'ALL',
    dateFilter: 'ALL',
    customStartDate: subDays(new Date(), 7),
    customEndDate: new Date(),
  });

  const router = useRouter();

  // Fetch attendance data
  const fetchClassAttendance = async () => {
    try {
      setLoading(true);
      const response = await AttendanceService.getAttendanceByClass('12A1');
      setAttendances(response.data);
      applyFilters(response.data, filters);
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert('Lỗi', 'Không thể tải danh sách điểm danh');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Apply filters to data
  const applyFilters = (data: AttendanceResponse[], filterParams: typeof filters) => {
    let result = [...data];

    // Apply status filter
    if (filterParams.statusFilter !== 'ALL') {
      result = result.filter(item => item.status === filterParams.statusFilter);
    }

    // Apply date filter
    const now = new Date();
    switch (filterParams.dateFilter) {
      case 'TODAY':
        result = result.filter(item => {
          const itemDate = parseISO(item.date);
          return (
            itemDate.getDate() === now.getDate() &&
            itemDate.getMonth() === now.getMonth() &&
            itemDate.getFullYear() === now.getFullYear()
          );
        });
        break;
      case 'WEEK':
        const startOfWeek = subDays(now, now.getDay());
        result = result.filter(item => parseISO(item.date) >= startOfWeek);
        break;
      case 'MONTH':
        result = result.filter(item => {
          const itemDate = parseISO(item.date);
          return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
        });
        break;
      case 'CUSTOM':
        result = result.filter(item => {
          const itemDate = parseISO(item.date);
          return itemDate >= filterParams.customStartDate && itemDate <= filterParams.customEndDate;
        });
        break;
    }

    // Apply search filter
    if (filterParams.searchQuery) {
      const query = filterParams.searchQuery.toLowerCase();
      result = result.filter(item =>
        item.studentName.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query)
      );
    }

    setFilteredAttendances(result);
  };

  // Handle filter changes from modal
  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    applyFilters(attendances, newFilters);
    setShowFilterModal(false);
  };

  // Reset all filters
  const resetFilters = () => {
    const defaultFilters = {
      searchQuery: '',
      statusFilter: 'ALL',
      dateFilter: 'ALL',
      customStartDate: subDays(new Date(), 7),
      customEndDate: new Date(),
    };
    setFilters(defaultFilters);
    applyFilters(attendances, defaultFilters);
  };

  useEffect(() => {
    fetchClassAttendance();
  }, []);

  const renderItem = ({ item, index }: { item: AttendanceResponse; index: number }) => (
    <Animatable.View
      animation="fadeInUp"
      delay={index * 50}
      style={styles.attendanceCard}
      useNativeDriver
    >
      <View style={styles.attendanceHeader}>
        <Text style={styles.studentName} numberOfLines={1} ellipsizeMode="tail">
          {item.studentName}
        </Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: STATUS_COLORS[item.status] },
          ]}
        >
          <Text style={styles.statusText}>
            {STATUS_LABELS[item.status] || item.status}
          </Text>
        </View>
      </View>
      <View style={styles.attendanceDetails}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={16} color="#6b7280" />
          <Text style={styles.detailText}>
            {format(parseISO(item.date), 'PPP', { locale: vi })}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time-outline" size={16} color="#6b7280" />
          <Text style={styles.detailText}>
            {format(parseISO(item.date), 'p', { locale: vi })}
          </Text>
        </View>
      </View>
    </Animatable.View>
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
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push('/home')}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Danh sách điểm danh</Text>
          <TouchableOpacity onPress={() => setShowFilterModal(true)}>
            <Ionicons name="filter" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Filter Summary Bar */}
      {(!loading && (filters.statusFilter !== 'ALL' || filters.dateFilter !== 'ALL' || filters.searchQuery)) && (
        <View style={styles.filterSummary}>
          <Text style={styles.filterSummaryText}>
            Đang lọc: {filteredAttendances.length} kết quả
          </Text>
          <TouchableOpacity onPress={resetFilters}>
            <Text style={styles.clearFilterText}>Xóa bộ lọc</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Attendance List */}
      <FlatList
        data={filteredAttendances}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchClassAttendance}
            colors={['#4A90E2']}
            tintColor="#4A90E2"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            {loading ? (
              <>
                <ActivityIndicator size="large" color="#4A90E2" />
                <Text style={styles.emptyText}>Đang tải danh sách...</Text>
              </>
            ) : (
              <>
                <Ionicons name="people-outline" size={48} color="#d1d5db" />
                <Text style={styles.emptyText}>
                  {attendances.length === 0
                    ? 'Không có dữ liệu điểm danh'
                    : 'Không tìm thấy kết quả phù hợp'}
                </Text>
                <TouchableOpacity
                  style={styles.refreshButton}
                  onPress={fetchClassAttendance}
                >
                  <Ionicons name="refresh" size={20} color="#4A90E2" />
                  <Text style={styles.refreshButtonText}>Thử lại</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        }
        ListHeaderComponent={
          <Text style={styles.listHeader}>
            Tổng số: {filteredAttendances.length} bản ghi
          </Text>
        }
      />

      {/* Filter Modal */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleApplyFilters}
        onReset={resetFilters}
        initialFilters={filters}
      />
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
  headerRightPlaceholder: {
    width: 32,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 8,
  },
  listHeader: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
    textAlign: 'right',
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
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
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
    fontSize: 16,
    color: '#6b7280',
    marginTop: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  refreshButtonText: {
    fontSize: 14,
    color: '#4A90E2',
    marginLeft: 8,
    fontWeight: '500',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#06b6d4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f0f7ff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  filterSummaryText: {
    fontSize: 14,
    color: '#4b5563',
  },
  clearFilterText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
  },
});

export default AttendanceComponent;