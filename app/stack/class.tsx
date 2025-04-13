import React, { useState } from 'react';
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

const data = Array(6).fill({
  id: Math.random().toString(),
  name: 'Van Quoc Bui',
  dob: '02/06/2004',
  gender: 'Nữ',
});

const Class = () => {
  
    const router = useRouter();
  const [activeTab, setActiveTab] = useState('student');
  const handleFeaturePress = () => {
      router.push('/home'); // Giả sử bạn đã đăng ký màn hình này
  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="white" onPress={handleFeaturePress}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lớp học của tôi</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
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
            Học sinh (42)
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
            Giáo viên (14)
          </Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {data.map((item) => (
          <TouchableOpacity key={item.id} style={styles.card}>
            <Image
              source={require('../../assets/images/avatar.png')}
              style={styles.avatar}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.dob}>
                {item.gender} | {item.dob}
              </Text>
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
});

export default Class;
