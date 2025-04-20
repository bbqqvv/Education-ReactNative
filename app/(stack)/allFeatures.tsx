import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Animated,
  Platform,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

interface Item {
  id: string;
  name: string;
  type: string;
  date: string;
  route: string;
}

const AllItemsScreen = () => {
  const router = useRouter();
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Sample data with proper typing
  const allItems: Item[] = [
    { id: '1', name: 'Lớp học', type: 'Môn học', date: 'Hôm nay, 08:00', route: '/stack/class' },
    { id: '2', name: 'Lịch thi', type: 'Kiểm tra', date: '20/05, 09:30', route: '/stack/examSchedule' },
    { id: '3', name: 'Xin nghỉ', type: 'Xin nghỉ', date: 'Đã gửi 15/05', route: '/stack/leaveofabsence' },
    { id: '4', name: 'Vi phạm', type: 'Vi phạm', date: '14/05, 13:15', route: '/stack/violate' },
    { id: '5', name: 'Thời khóa biểu', type: 'TKB', date: 'Tuần 20', route: '/stack/timetable' },
    { id: '6', name: 'Họp phụ huynh', type: 'Sự kiện', date: '25/05, 14:00', route: '/stack/events' },
  ];

  const filterOptions = ['Tất cả', 'Môn học', 'Xin nghỉ', 'Kiểm tra', 'Vi phạm', 'TKB', 'Sự kiện'];

  const handleBack = useCallback(() => {
    Haptics.selectionAsync();
    router.push('/(tabs)/home');
  }, [router]);

  const handleItemPress = useCallback((item: Item) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(item.route);
  }, [router]);

  const handleFilterPress = useCallback(() => {
    Haptics.selectionAsync();
    setFilterModalVisible(true);
  }, []);

  const applyFilter = useCallback((option: string) => {
    Haptics.selectionAsync();
    setActiveFilter(option);
    setFilterModalVisible(false);
  }, []);

  const filteredItems = activeFilter === 'Tất cả'
    ? allItems
    : allItems.filter(item => item.type === activeFilter);

  // Animation when component mounts
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#59CBE8" />
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Header with shadow */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Tất cả mục</Text>

        <TouchableOpacity
          onPress={handleFilterPress}
          activeOpacity={0.7}
        >
          <View style={styles.filterBadge}>
            <Ionicons name="filter" size={20} color="white" />
            {activeFilter !== 'Tất cả' && (
              <View style={styles.filterIndicator} />
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Content with FlatList for better performance */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemCard}
            onPress={() => handleItemPress(item)}
            activeOpacity={0.8}
          >
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
              <View style={styles.itemMeta}>
                <View style={[styles.typeBadge, {
                  backgroundColor: getTypeColor(item.type).background
                }]}>
                  <Text style={[styles.itemType, {
                    color: getTypeColor(item.type).text
                  }]}>
                    {item.type}
                  </Text>
                </View>
                <Text style={styles.itemDate}>{item.date}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#C5C5C5" />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="file-tray-outline" size={48} color="#D1D5DB" />
            <Text style={styles.emptyText}>Không có mục nào</Text>
          </View>
        }
      />

      {/* Filter Modal with backdrop animation */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setFilterModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Bộ lọc</Text>

                {filterOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.filterOption,
                      activeFilter === option && styles.activeFilterOption
                    ]}
                    onPress={() => applyFilter(option)}
                    activeOpacity={0.7}
                  >
                    <Text style={[
                      styles.filterOptionText,
                      activeFilter === option && styles.activeFilterOptionText
                    ]}>
                      {option}
                    </Text>
                    {activeFilter === option && (
                      <Ionicons name="checkmark" size={18} color="#59CBE8" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableOpacity>
      </Modal>
    </Animated.View>
  );
};

// Helper function for type colors
const getTypeColor = (type: string) => {
  const colors: Record<string, { background: string; text: string }> = {
    'Môn học': { background: '#EFF6FF', text: '#3B82F6' },
    'Kiểm tra': { background: '#FEF2F2', text: '#EF4444' },
    'Xin nghỉ': { background: '#ECFDF5', text: '#10B981' },
    'Vi phạm': { background: '#F5F3FF', text: '#8B5CF6' },
    'TKB': { background: '#FFFBEB', text: '#F59E0B' },
    'Sự kiện': { background: '#F0F9FF', text: '#0EA5E9' },
  };
  return colors[type] || { background: '#F3F4F6', text: '#6B7280' };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 16,
    color: '#6B7280',
  },
  header: {
    backgroundColor: '#59CBE8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 10,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  filterBadge: {
    position: 'relative',
    padding: 4,
  },
  filterIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 12,
  },
  itemType: {
    fontSize: 12,
    fontWeight: '500',
  },
  itemDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    marginTop: 16,
    color: '#6B7280',
    fontSize: 16,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#111827',
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activeFilterOption: {
    backgroundColor: '#F0F9FF',
  },
  filterOptionText: {
    fontSize: 16,
    color: '#374151',
  },
  activeFilterOptionText: {
    color: '#59CBE8',
    fontWeight: '500',
  },
});

export default AllItemsScreen;