import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Dữ liệu mẫu
const studentData = Array(6).fill({
  id: Math.random().toString(),
  name: 'Học Sinh',
  dob: '02/06/2004',
  gender: 'Nữ',
  type: 'student',
  email: 'hocsinh@example.com',
  phone: '0123456789',
  address: '123 Đường ABC, Quận 1, TP.HCM'
});

const teacherData = Array(4).fill({
  id: Math.random().toString(),
  name: 'Giáo Viên',
  dob: '15/03/1985',
  gender: 'Nam',
  type: 'teacher',
  email: 'giaovien@example.com',
  phone: '0987654321',
  address: '456 Đường XYZ, Quận 3, TP.HCM',
  subject: 'Toán học',
  yearsOfExperience: 10
});

const Class = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'student' | 'teacher'>('student');
  const [searchText, setSearchText] = useState('');

  const handleBackPress = () => {
    router.push('/(tabs)/home');
  };

  const handleItemPress = (item: any) => {
    router.push({
      pathname: '/stack/detail-class',
      params: {
        ...item,
        ...(item.type === 'teacher' ? {
          subject: item.subject,
          yearsOfExperience: item.yearsOfExperience
        } : {})
      }
    });
  };

  // Sử dụng useMemo để tối ưu hiệu năng
  const filteredData = useMemo(() => {
    const data = activeTab === 'student' ? studentData : teacherData;
    return data.filter(item => 
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [activeTab, searchText]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lớp học của tôi</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Tab Switch */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'student' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('student')}
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
          onPress={() => setActiveTab('teacher')}
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
      <ScrollView contentContainerStyle={styles.listContainer}>
        {filteredData.map((item, index) => (
          <TouchableOpacity 
            key={`${item.id}-${index}`} 
            style={styles.card}
            onPress={() => handleItemPress(item)}
          >
            <Image
              source={require('../../assets/images/avatar.png')}
              style={styles.avatar}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.dob}>
                {item.gender} | {item.dob}
              </Text>
              {activeTab === 'teacher' && (
                <Text style={styles.subject}>{item.subject}</Text>
              )}
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        ))}
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
    textAlign: 'center',
    marginRight: 110,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#EAEAEA',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#59CBE8',
  },
  tabText: {
    color: '#555',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#ddd',
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dob: {
    fontSize: 13,
    color: '#555',
    marginTop: 2,
  },
  subject: {
    fontSize: 13,
    color: '#59CBE8',
    marginTop: 2,
    fontWeight: '600',
  },
});

export default Class;