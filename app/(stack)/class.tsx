import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Animated,
  ActivityIndicator,
  StatusBar,
  Platform
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '../hooks/useUser';
import { UserResponse } from '../api/user/user.type';

const Class = () => {
  const router = useRouter();
  const { getClassmates, getTeachersForMyClass } = useUser();

  const [activeTab, setActiveTab] = useState<'student' | 'teacher'>('student');
  const [searchText, setSearchText] = useState('');
  const [students, setStudents] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'student') {
          const data = await getClassmates();
          console.log("Students data:", data); // 👈

          setStudents(data);
        } else {
          const data = await getTeachersForMyClass();
          console.log("Teachers data:", data); // 👈

          setTeachers(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleBackPress = () => {
    Haptics.selectionAsync();
    router.push('/(tabs)/home');
  };

  const handleItemPress = (item: UserResponse) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: '/(stack)/detail-class',
      params: {
        fullName: item.fullName,
        email: item.email,
        dateOfBirth: item.profile?.dateOfBirth,
        gender: item.profile?.gender,
        role: item.role,
        ...(item.role === 'ROLE_TEACHER' ? {
          teachingClasses: Array.from(item.teachingClasses || []),
        } : {}),
      },
    });
  };

  const handleTabChange = (tab: 'student' | 'teacher') => {
    Haptics.selectionAsync();
    setActiveTab(tab);
  };

  const filteredData = useMemo(() => {
    const data = activeTab === 'student' ? students : teachers;
    console.log("Raw Data:", data); // 👈 Kiểm tra dữ liệu trước khi lọc
    const filtered = data.filter(item =>
      item.fullName?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchText.toLowerCase()) ||
      item.userCode?.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log("Filtered Data:", filtered); // 👈 Kiểm tra dữ liệu đã lọc
    return filtered;
  }, [activeTab, searchText, students, teachers]);

  return (
<View style={styles.container}>
      <View style={styles.safeArea}>
        <LinearGradient
          colors={['#4A90E2', '#59CBE8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={handleBackPress}
              style={styles.backButton}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Lớp 12A1</Text>
            <View style={{ width: 24 }} />
          </View>
        </LinearGradient>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm học sinh, giáo viên..."
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
            returnKeyType="search"
          />
          {searchText.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchText('')}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>

        {/* Tab Switch */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'student' && styles.activeTab]}
            onPress={() => handleTabChange('student')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, activeTab === 'student' && styles.activeTabText]}>
              Học sinh ({students.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'teacher' && styles.activeTab]}
            onPress={() => handleTabChange('teacher')}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, activeTab === 'teacher' && styles.activeTabText]}>
              Giáo viên ({teachers.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* List */}
        <ScrollView
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4A90E2" />
            </View>
          ) : filteredData.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialIcons name="search-off" size={48} color="#D1D5DB" />
              <Text style={styles.emptyText}>Không tìm thấy kết quả</Text>
            </View>
          ) : (
            filteredData.map((item, index) => (
              <TouchableOpacity
                key={`${item.id}-${index}`}
                style={styles.card}
                onPress={() => handleItemPress(item)}
                activeOpacity={0.7}
              >
                <Image
                  source={require('../../assets/images/avatar.png')}
                  style={styles.avatar}
                />
                <View style={styles.info}>
                  <View style={styles.nameRow}>
                    <Text style={styles.name} numberOfLines={1}>{item.fullName}</Text>
                    <Text style={styles.idText}>{item.userCode}</Text>
                  </View>
                  <Text style={styles.detailText}>
                    {item.profile?.gender || 'Không xác định'} • {item.profile?.dateOfBirth || 'Không xác định'}
                  </Text>
                  {activeTab === 'teacher' && (
                    <Text style={styles.subjectText}>
                      {Array.from(item.teachingClasses || []).join(', ')}
                    </Text>
                  )}
                  {activeTab === 'student' && (
                    <Text style={styles.emailText} numberOfLines={1}>
                      {item.email}
                    </Text>
                  )}
                </View>
                <Ionicons name="chevron-forward" size={20} color="#D1D5DB" style={styles.chevronIcon} />
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  safeArea: {
    flex: 1,
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
  backButton: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 0,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginHorizontal: 20,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#59CBE8',
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
    flexGrow: 1, // Đảm bảo danh sách chiếm toàn bộ không gian
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#E5E7EB',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  info: {
    flex: 1,
    marginLeft: 16,
    marginRight: 8,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  idText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  detailText: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  subjectText: {
    fontSize: 13,
    color: '#59CBE8',
    fontWeight: '500',
  },
  emailText: {
    fontSize: 13,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  chevronIcon: {
    marginLeft: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#9CA3AF',
    marginTop: 16,
  },
  loadingContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
});

export default Class;