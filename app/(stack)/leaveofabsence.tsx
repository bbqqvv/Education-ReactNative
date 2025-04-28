import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Animated,
  Easing,
  FlatList,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { LeaveRequestApi } from '@/app/api/leave-rquest/leave-request.service';
import { LeaveRequest, LeaveRequestStatus } from '@/app/api/leave-rquest/leave-request.type';
import { useAuth } from '@/app/hooks/useAuth';

// Types
type LeaveStatus = 'approved' | 'pending' | 'rejected';
type FilterStatus = 'all' | LeaveStatus;

interface LeaveApplication {
  id: string;
  status: LeaveStatus;
  senderName: string;
  reason: string;
  fromDate: string;
  toDate: string;
  createdAt: string;
  className: string;
  recipient: string;
  imageFile: string | null;
}

// Helper Functions
const getStatusText = (status: LeaveStatus | FilterStatus): string => {
  const statusMap: Record<string, string> = {
    [LeaveRequestStatus.APPROVED]: 'Đã duyệt',
    [LeaveRequestStatus.PENDING]: 'Chờ duyệt',
    [LeaveRequestStatus.REJECTED]: 'Từ chối',
    all: 'Tất cả',
  };
  return statusMap[status] || status;
};

const getStatusColor = (status: LeaveStatus | FilterStatus): string => {
  const colorMap: Record<string, string> = {
    approved: '#10B981',
    pending: '#F59E0B',
    rejected: '#EF4444',
    all: '#6B7280'
  };
  return colorMap[status] || '#6B7280';
};

const getStatusIcon = (status: LeaveStatus): string => {
  const iconMap: Record<string, string> = {
    approved: 'checkmark-circle',
    pending: 'time',
    rejected: 'close-circle'
  };
  return iconMap[status] || 'help-circle';
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN');
};

const calculateDays = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

// Sub Components
const StatusBadge = React.memo(({ status }: { status: LeaveStatus }) => (
  <View style={styles.statusBadge}>
    <Ionicons name={getStatusIcon(status)} size={16} color={getStatusColor(status)} />
    <Text style={[styles.statusText, { color: getStatusColor(status) }]}>
      {getStatusText(status)}
    </Text>
  </View>
));

const LeaveCard = React.memo(({ item }: { item: LeaveApplication }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.leaveCard, { opacity: fadeAnim }]}>
      <View style={styles.cardHeader}>
        <StatusBadge status={item.status} />
        <Text style={styles.daysBadge}>
          {calculateDays(item.fromDate, item.toDate)} ngày
        </Text>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.applicantText}>{item.senderName}</Text>
        <Text style={styles.reasonText}>{item.reason}</Text>
        <Text style={styles.classText}>Lớp: {item.className}</Text>

        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={16} color="#6B7280" />
          <Text style={styles.detailText}>
            {formatDate(item.fromDate)} - {formatDate(item.toDate)}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="time" size={16} color="#6B7280" />
          <Text style={styles.detailText}>
            Gửi: {formatDate(item.createdAt)} {new Date(item.createdAt).toLocaleTimeString('vi-VN')}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="person" size={16} color="#6B7280" />
          <Text style={styles.detailText}>Gửi đến: {item.recipient}</Text>
        </View>
      </View>
    </Animated.View>
  );
});

const FilterTab = React.memo(({
  status,
  isActive,
  count,
  onPress
}: {
  status: FilterStatus;
  isActive: boolean;
  count: number;
  onPress: (status: FilterStatus) => void
}) => (
  <TouchableOpacity
    style={[
      styles.tabButton,
      isActive && styles.activeTabButton,
      isActive && { borderBottomColor: getStatusColor(status) }
    ]}
    onPress={() => onPress(status)}
    activeOpacity={0.7}
  >
    <Text style={[
      styles.tabText,
      isActive && { color: getStatusColor(status) }
    ]}>
      {getStatusText(status)}
      {status !== 'all' && ` (${count})`}
    </Text>
  </TouchableOpacity>
));

// Main Component
const LeaveList = () => {
  const router = useRouter();
  const { role, user, isLoading: authLoading } = useAuth();
  const [leaveRequests, setLeaveRequests] = useState<LeaveApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeStatus, setActiveStatus] = useState<FilterStatus>('all');

  const fetchLeaveRequests = async () => {
    try {
      let response;

      // Phân quyền theo role
      if (role === 'ROLE_STUDENT' || role === 'ROLE_TEACHER') {
        response = await LeaveRequestApi.getMyRequests(); // Chỉ xem đơn của chính mình
      } else if (role === 'ROLE_ADMIN') {
        response = await LeaveRequestApi.getAll(); // ADMIN xem tất cả đơn
      } else {
        throw new Error('Không có quyền truy cập');
      }
      
      if (response.success) {
        const mappedData = response.data?.map((item: LeaveRequest) => ({
          ...item,
          status: item.status.toLowerCase() as LeaveStatus
        }));
        setLeaveRequests(mappedData);
      } else {
        setError(response.message || 'Lỗi khi tải dữ liệu');
      }
    } catch (err) {
      setError(err.message || 'Lỗi kết nối máy chủ');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchLeaveRequests();
  };

  // Filter and count applications
  const { filteredApplications, statusCounts } = useMemo(() => {
    const counts = {
      all: leaveRequests.length,
      approved: 0,
      pending: 0,
      rejected: 0,
    };

    const filtered = leaveRequests.filter(app => {
      counts[app.status]++;
      return activeStatus === 'all' || app.status === activeStatus;
    });

    return { filteredApplications: filtered, statusCounts: counts };
  }, [activeStatus, leaveRequests]);

  const handleBack = () => router.back();

  const handleCreateLeave = () => {
    // Cho phép cả STUDENT và TEACHER tạo đơn
    if (role === 'ROLE_STUDENT' || role === 'ROLE_TEACHER') {
      router.push('/(stack)/leaveform');
    } else {
      alert('Bạn không có quyền tạo đơn xin nghỉ');
    }
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#06b6d4" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchLeaveRequests}>
          <Text style={styles.retryText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header with Gradient */}
      <LinearGradient
        colors={['#06b6d4', '#0891b2']}
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
          <Text style={styles.headerTitle}>
            {role === 'ROLE_STUDENT' 
              ? `Đơn xin nghỉ của ${user?.name || 'bạn'}` 
              : 'Quản lý đơn xin nghỉ'}
          </Text>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      {/* Status Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabContainer}
      >
        {(['all', 'pending', 'approved', 'rejected'] as FilterStatus[]).map((status) => (
          <FilterTab
            key={status}
            status={status}
            isActive={activeStatus === status}
            count={statusCounts[status]}
            onPress={setActiveStatus}
          />
        ))}
      </ScrollView>

      {/* Leave Applications List */}
      <FlatList
        data={filteredApplications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <LeaveCard item={item} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#06b6d4']}
            tintColor="#06b6d4"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="file-tray" size={48} color="#D1D5DB" />
            <Text style={styles.emptyText}>Không có đơn nào</Text>
            <Text style={styles.emptySubtext}>
              {activeStatus === 'all' 
                ? 'Bạn chưa có đơn xin nghỉ nào' 
                : `Không có đơn ở trạng thái ${getStatusText(activeStatus)}`}
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContainer}
      />

      {/* Create New Leave Button */}
      {(role === 'ROLE_STUDENT' || role === 'ROLE_TEACHER') && (
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateLeave}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.createButtonText}>Tạo đơn xin nghỉ mới</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
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
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: 'center',
  },
  headerRight: {
    width: 32,
  },
  tabContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tabButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 16,
  },
  activeTabButton: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  leaveCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  daysBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '600',
    color: '#3B82F6',
  },
  cardBody: {
    gap: 8,
  },
  applicantText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  classText: {
    fontSize: 14,
    color: '#4B5563',
  },
  reasonText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  detailText: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 16,
    fontWeight: '500',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
  },
  createButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#06b6d4',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 16,
    marginBottom: 10,
  },
  retryText: {
    color: '#06b6d4',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LeaveList;