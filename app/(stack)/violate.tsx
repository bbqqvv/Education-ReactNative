import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
  Easing,
  Platform,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ViolationDetail from './violate-detail';

type ViolationLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type Violation = {
  id: string;
  studentCode: string;
  fullName: string;
  role: string;
  description: string;
  level: ViolationLevel;
  createdAt: string;
  createdBy: string;
};

const ViolationScreen = () => {
  const router = useRouter();
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(null);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, []);

  const handleBackPress = () => {
    // Nếu đang ở màn danh sách vi phạm thì quay về tab home
    if (!selectedViolation) {
      router.push('/(tabs)/home');
    } else {
      // Nếu đang ở màn chi tiết, chỉ quay lại danh sách
      setSelectedViolation(null);
    }
  };
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, []);


  const violations: Violation[] = [
    {
      id: "123",
      studentCode: "B21DCCN001",
      fullName: "Bùi Quốc Văn",
      role: "STUDENT",
      description: "Vi phạm nội quy lớp học: Sử dụng điện thoại trong giờ học",
      level: "HIGH",
      createdAt: "2025-04-11T15:30:00",
      createdBy: "Giáo viên Nguyễn Văn A"
    },
    {
      id: "124",
      studentCode: "B21DCCN002",
      fullName: "Nguyễn Văn Thành",
      role: "STUDENT",
      description: "Đi học muộn 15 phút",
      level: "MEDIUM",
      createdAt: "2025-04-10T08:15:00",
      createdBy: "Giáo viên Trần Thị B"
    },
    {
      id: "125",
      studentCode: "B21DCCN003",
      fullName: "Đàm Phương Nam",
      role: "STUDENT",
      description: "Không làm bài tập về nhà",
      level: "LOW",
      createdAt: "2025-04-09T10:45:00",
      createdBy: "Giáo viên Lê Văn C"
    },
    {
      id: "126",
      studentCode: "B21DCCN004",
      fullName: "Trần Thị Minh Anh",
      role: "STUDENT",
      description: "Nói chuyện riêng nhiều lần trong giờ học",
      level: "MEDIUM",
      createdAt: "2025-04-08T14:20:00",
      createdBy: "Giáo viên Phạm Thị D"
    },
  ];

  const getViolationLevelText = (level: ViolationLevel): string => {
    const levelMap: Record<ViolationLevel, string> = {
      LOW: 'Nhẹ',
      MEDIUM: 'Trung bình',
      HIGH: 'Nặng'
    };
    return levelMap[level] || level;
  };

  const getLevelColor = (level: ViolationLevel): string => {
    const colorMap: Record<ViolationLevel, string> = {
      LOW: '#4CAF50',
      MEDIUM: '#FFA000',
      HIGH: '#F44336'
    };
    return colorMap[level] || '#9E9E9E';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${date.getFullYear()} ${hours}:${minutes}`;
  };

  const renderViolationItem = ({ item }: { item: Violation }) => (
    <Animated.View style={{ opacity: fadeAnim }}>
      <TouchableOpacity
        onPress={() => setSelectedViolation(item)}
        style={styles.violationCard}
        activeOpacity={0.8}
      >
        <View style={styles.cardHeader}>
          <View style={styles.studentInfo}>
            <Text style={styles.cardName}>{item.fullName}</Text>
            <Text style={styles.cardCode}>{item.studentCode}</Text>
          </View>
          <View style={[styles.levelBadge, { backgroundColor: getLevelColor(item.level) }]}>
            <Text style={styles.levelText}>{getViolationLevelText(item.level)}</Text>
          </View>
        </View>
        <Text style={styles.cardDate}>
          <Ionicons name="time-outline" size={14} color="#757575" /> {formatDate(item.createdAt)}
        </Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.cardFooter}>
          <Text style={styles.createdByText}>Ghi nhận bởi: {item.createdBy}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={[styles.container, selectedViolation && { backgroundColor: '#FFFFFF' }]}>
      {!selectedViolation ? (
        <>
          <LinearGradient
            colors={['#4A90E2', '#59CBE8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.header}
          >
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Danh sách vi phạm</Text>
            <View style={{ width: 24 }} />
          </LinearGradient>

          <FlatList
            data={violations}
            renderItem={renderViolationItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Ionicons name="checkmark-circle" size={48} color="#E0E0E0" />
                <Text style={styles.emptyText}>Không có vi phạm nào</Text>
                <Text style={styles.emptySubText}>Hiện không có vi phạm nào được ghi nhận</Text>
              </View>
            }
          />
        </>
      ) : (
        <ViolationDetail
          violation={selectedViolation}
          onBack={handleBackPress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 16 : 50,
    paddingBottom: 16,
    elevation: 5,
  },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: 'white' },
  listContainer: { padding: 16, paddingBottom: 20 },
  violationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  studentInfo: { flex: 1 },
  cardName: { fontSize: 16, fontWeight: '600', color: '#212121' },
  cardCode: { fontSize: 13, color: '#757575', marginTop: 2 },
  levelBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  levelText: { fontSize: 12, fontWeight: '600', color: 'white' },
  cardDate: { fontSize: 13, color: '#757575', marginBottom: 8 },
  cardDescription: { fontSize: 14, color: '#424242', lineHeight: 20, marginBottom: 8 },
  cardFooter: { borderTopWidth: 1, borderTopColor: '#EEEEEE', paddingTop: 8, marginTop: 4 },
  createdByText: { fontSize: 12, color: '#9E9E9E', fontStyle: 'italic' },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
  emptyText: { fontSize: 16, color: '#616161', marginTop: 16, fontWeight: '500' },
  emptySubText: { fontSize: 14, color: '#9E9E9E', marginTop: 4 },
});

export default ViolationScreen;
