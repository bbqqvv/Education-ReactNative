import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  Platform,
  Animated,
  StatusBar
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

// Sample data with more realistic information
const studentData = Array.from({ length: 6 }, (_, i) => ({
  id: Math.random().toString(),
  name: `Nguyễn Văn ${String.fromCharCode(65 + i)}`,
  dob: `0${i + 1}/06/2004`,
  gender: i % 2 === 0 ? 'Nam' : 'Nữ',
  type: 'student',
  email: `student${i + 1}@trancaovan.edu.vn`,
  phone: `098765432${i}`,
  address: `${i + 1}23 Đường ABC, Quận 1, TP.HCM`,
  studentId: `STU2023${1000 + i}`
}));

const teacherData = Array.from({ length: 4 }, (_, i) => ({
  id: Math.random().toString(),
  name: `Giáo viên ${String.fromCharCode(65 + i)}`,
  dob: `15/03/${1980 + i}`,
  gender: i % 2 === 0 ? 'Nam' : 'Nữ',
  type: 'teacher',
  email: `teacher${i + 1}@trancaovan.edu.vn`,
  phone: `098765432${i}`,
  address: `${i + 1}56 Đường XYZ, Quận 3, TP.HCM`,
  subject: ['Toán học', 'Ngữ văn', 'Vật lý', 'Hóa học'][i],
  yearsOfExperience: 5 + i,
  teacherId: `TCH2023${100 + i}`
}));

const Class = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'student' | 'teacher'>('student');
  const [searchText, setSearchText] = useState('');
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleBackPress = () => {
    Haptics.selectionAsync();
    router.push('/(tabs)/home');
  };

  const handleItemPress = (item: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: '/(stack)/detail-class',
      params: {
        ...item,
        ...(item.type === 'teacher' ? {
          subject: item.subject,
          yearsOfExperience: item.yearsOfExperience.toString()
        } : {})
      }
    });
  };

  const handleTabChange = (tab: 'student' | 'teacher') => {
    Haptics.selectionAsync();
    setActiveTab(tab);
  };

  const filteredData = useMemo(() => {
    const data = activeTab === 'student' ? studentData : teacherData;
    return data.filter(item =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase()) ||
      (activeTab === 'student' && item.id.toLowerCase().includes(searchText.toLowerCase())) ||
      (activeTab === 'teacher' && item.id.toLowerCase().includes(searchText.toLowerCase()))
    );
  }, [activeTab, searchText]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.safeArea}>
        {/* Header */}
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

            {/* Để cân giữa tiêu đề nếu không có nút bên phải */}
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
            style={[
              styles.tab,
              activeTab === 'student' && styles.activeTab,
            ]}
            onPress={() => handleTabChange('student')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'student' && styles.activeTabText,
              ]}
            >
              Học sinh ({studentData.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'teacher' && styles.activeTab,
            ]}
            onPress={() => handleTabChange('teacher')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'teacher' && styles.activeTabText,
              ]}
            >
              Giáo viên ({teacherData.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* List */}
        <ScrollView
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        >
          {filteredData.length === 0 ? (
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
                    <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                    {activeTab === 'student' && (
                      <Text style={styles.idText}>{item.id}</Text>
                    )}
                    {activeTab === 'teacher' && (
                      <Text style={styles.idText}>{item.id}</Text>
                    )}
                  </View>
                  <Text style={styles.detailText}>
                    {item.gender} • {item.dob}
                  </Text>
                  {activeTab === 'teacher' && (
                    <Text style={styles.subjectText}>
                      {item.subject} • {item.yearsOfExperience} năm kinh nghiệm
                    </Text>
                  )}
                  {activeTab === 'student' && (
                    <Text style={styles.emailText} numberOfLines={1}>
                      {item.email}
                    </Text>
                  )}
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color="#D1D5DB"
                  style={styles.chevronIcon}
                />
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
    </Animated.View>
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
});

export default Class;