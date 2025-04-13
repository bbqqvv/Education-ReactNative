import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const LeaveList = () => {
  const router = useRouter();
  
  const handleBack = () => {
    router.back();
  };

  const handleCreateLeave = () => {
    router.push('/stack/leaveform');
  };

  // Sample data
  const leaveApplications = [
    {
      id: 1,
      status: 'pending',
      applicant: 'Bùi Quốc Văn',
      reason: 'Việc gia đình',
      date: '03/05/2022 - 03/05/2022'
    },
    {
      id: 2,
      status: 'pending',
      applicant: 'Bùi Quốc Văn',
      reason: 'Việc gia đình',
      date: '03/05/2022 - 03/05/2022'
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Xin nghỉ</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Status Summary */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText1}>Đã duyệt 1</Text>
        <Text style={styles.statusText2}>Chờ duyệt 1</Text>
        <Text style={styles.statusText3}>Từ chối 1</Text>
      </View>

      <View style={styles.divider} />

      {/* Leave Applications List */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {leaveApplications.map((item) => (
          <View key={item.id} style={styles.leaveCard}>
            <Text style={styles.cardTitle}>Chờ duyệt</Text>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}><Text style={styles.boldText}>Người làm đơn:</Text> {item.applicant}</Text>
              <Text style={styles.cardText}><Text style={styles.boldText}>Lý do:</Text> {item.reason}</Text>
              <Text style={styles.cardText}><Text style={styles.boldText}>Nghỉ từ:</Text> {item.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Create New Leave Button */}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateLeave}>
        <Text style={styles.createButtonText}>Viết đơn xin nghỉ</Text>
      </TouchableOpacity>
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
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8F8F8',
  },
  statusText1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    borderColor: 'green',
    borderWidth: 3,
    borderRadius: 20,
    padding: 8,
  },
  statusText2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    borderColor: 'blue',
    borderWidth: 3,
    borderRadius: 20,
    padding: 8,
  },
  statusText3: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    borderColor: 'red',
    borderWidth: 3,
    borderRadius: 20,
    padding: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  leaveCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFA000',
    marginBottom: 8,
  },
  cardContent: {
    marginLeft: 4,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
  },
  createButton: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#59CBE8',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LeaveList;