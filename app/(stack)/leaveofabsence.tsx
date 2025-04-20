import React, { useState, useMemo, useRef } from 'react';
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
  Easing,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

// Types
type LeaveStatus = 'approved' | 'pending' | 'rejected';
type FilterStatus = 'all' | LeaveStatus;

interface LeaveApplication {
  id: number;
  status: LeaveStatus;
  applicant: string;
  reason: string;
  date: string;
  days: number;
  submitted: string;
  type: string;
  approvedBy?: string;
  rejectedReason?: string;
}

// Sample Data
const SAMPLE_LEAVE_APPLICATIONS: LeaveApplication[] = [
  {
    id: 1,
    status: 'pending',
    applicant: 'Bùi Quốc Văn',
    reason: 'Việc gia đình',
    date: '03/05/2022 - 03/05/2022',
    days: 1,
    submitted: '02/05/2022 08:30',
    type: 'Nghỉ có phép'
  },
  {
    id: 2,
    status: 'approved',
    applicant: 'Nguyễn Văn A',
    reason: 'Khám bệnh',
    date: '05/05/2022 - 06/05/2022',
    days: 2,
    submitted: '04/05/2022 14:15',
    type: 'Nghỉ ốm',
    approvedBy: 'Trưởng phòng Nguyễn Thị B'
  },
  {
    id: 3,
    status: 'rejected',
    applicant: 'Trần Thị B',
    reason: 'Việc cá nhân',
    date: '10/05/2022 - 11/05/2022',
    days: 2,
    submitted: '09/05/2022 09:45',
    type: 'Nghỉ không lương',
    rejectedReason: 'Không đủ lý do chính đáng'
  },
  {
    id: 4,
    status: 'pending',
    applicant: 'Lê Văn C',
    reason: 'Đám cưới',
    date: '15/05/2022 - 16/05/2022',
    days: 2,
    submitted: '14/05/2022 10:20',
    type: 'Nghỉ có phép'
  }
];

// Helper Functions
const getStatusText = (status: LeaveStatus | FilterStatus): string => {
  const statusMap: Record<string, string> = {
    approved: 'Đã duyệt',
    pending: 'Chờ duyệt',
    rejected: 'Từ chối',
    all: 'Tất cả'
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
          {item.days} {item.days > 1 ? 'ngày' : 'ngày'}
        </Text>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.applicantText}>{item.applicant}</Text>
        <Text style={styles.reasonText}>{item.reason}</Text>

        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={16} color="#6B7280" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="time" size={16} color="#6B7280" />
          <Text style={styles.detailText}>Gửi: {item.submitted}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="document-text" size={16} color="#6B7280" />
          <Text style={styles.detailText}>Loại: {item.type}</Text>
        </View>

        {item.status === 'approved' && (
          <View style={styles.detailRow}>
            <Ionicons name="checkmark" size={16} color="#10B981" />
            <Text style={[styles.detailText, { color: '#10B981' }]}>
              Người duyệt: {item.approvedBy}
            </Text>
          </View>
        )}

        {item.status === 'rejected' && (
          <View style={styles.detailRow}>
            <Ionicons name="close" size={16} color="#EF4444" />
            <Text style={[styles.detailText, { color: '#EF4444' }]}>
              Lý do từ chối: {item.rejectedReason}
            </Text>
          </View>
        )}
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
  const [activeStatus, setActiveStatus] = useState<FilterStatus>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading data
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter and count applications
  const { filteredApplications, statusCounts } = useMemo(() => {
    const counts = {
      all: SAMPLE_LEAVE_APPLICATIONS.length,
      approved: 0,
      pending: 0,
      rejected: 0,
    };

    const filtered = SAMPLE_LEAVE_APPLICATIONS.filter(app => {
      counts[app.status]++;
      return activeStatus === 'all' || app.status === activeStatus;
    });

    return { filteredApplications: filtered, statusCounts: counts };
  }, [activeStatus]);

  const handleBack = () => router.back();
  const handleCreateLeave = () => router.push('/stack/leaveform');

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
          <Text style={styles.headerTitle}>Đơn Xin Nghỉ</Text>
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

      {/* Loading State */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#06b6d4" />
        </View>
      ) : (
        /* Leave Applications List */
        <FlatList
          data={filteredApplications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <LeaveCard item={item} />}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="file-tray" size={48} color="#D1D5DB" />
              <Text style={styles.emptyText}>Không có đơn nào</Text>
              <Text style={styles.emptySubtext}>Bạn chưa có đơn xin nghỉ nào ở mục này</Text>
            </View>
          }
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Create New Leave Button */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreateLeave}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.createButtonText}>Tạo đơn xin nghỉ mới</Text>
      </TouchableOpacity>
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
  reasonText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
});

export default LeaveList;