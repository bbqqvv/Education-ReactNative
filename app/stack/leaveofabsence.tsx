import React, { useState } from 'react';
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
  const [activeStatus, setActiveStatus] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');
  
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
      status: 'approved',
      applicant: 'Nguyễn Văn A',
      reason: 'Khám bệnh',
      date: '05/05/2022 - 06/05/2022'
    },
    {
      id: 3,
      status: 'rejected',
      applicant: 'Trần Thị B',
      reason: 'Việc cá nhân',
      date: '10/05/2022 - 11/05/2022'
    },
    {
      id: 4,
      status: 'pending',
      applicant: 'Lê Văn C',
      reason: 'Đám cưới',
      date: '15/05/2022 - 16/05/2022'
    }
  ];

  // Lọc đơn theo trạng thái
  const filteredApplications = leaveApplications.filter(app => {
    if (activeStatus === 'all') return true;
    return app.status === activeStatus;
  });

  // Đếm số lượng từng trạng thái
  const statusCounts = {
    approved: leaveApplications.filter(app => app.status === 'approved').length,
    pending: leaveApplications.filter(app => app.status === 'pending').length,
    rejected: leaveApplications.filter(app => app.status === 'rejected').length,
  };

  // Chuyển đổi trạng thái sang tiếng Việt
  const getStatusText = (status) => {
    switch(status) {
      case 'approved': return 'Đã duyệt';
      case 'pending': return 'Chờ duyệt';
      case 'rejected': return 'Từ chối';
      default: return status;
    }
  };

  // Màu sắc cho từng trạng thái
  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return '#4CAF50'; // Xanh lá
      case 'pending': return '#FFA000'; // Cam
      case 'rejected': return '#F44336'; // Đỏ
      default: return '#333';
    }
  };

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

      {/* Status Filter */}
      <View style={styles.statusContainer}>
        <TouchableOpacity 
          style={[
            styles.statusButton, 
            activeStatus === 'all' && styles.activeStatusButton
          ]}
          onPress={() => setActiveStatus('all')}
        >
          <Text style={styles.statusText}>Tất cả</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.statusButton, 
            activeStatus === 'approved' && styles.activeStatusButton,
            { borderColor: '#4CAF50' }
          ]}
          onPress={() => setActiveStatus('approved')}
        >
          <Text style={styles.statusText}>Đã duyệt ({statusCounts.approved})</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.statusButton, 
            activeStatus === 'pending' && styles.activeStatusButton,
            { borderColor: '#FFA000' }
          ]}
          onPress={() => setActiveStatus('pending')}
        >
          <Text style={styles.statusText}>Chờ duyệt ({statusCounts.pending})</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.statusButton, 
            activeStatus === 'rejected' && styles.activeStatusButton,
            { borderColor: '#F44336' }
          ]}
          onPress={() => setActiveStatus('rejected')}
        >
          <Text style={styles.statusText}>Từ chối ({statusCounts.rejected})</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* Leave Applications List */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {filteredApplications.map((item) => (
          <View key={item.id} style={styles.leaveCard}>
            <Text style={[styles.cardTitle, { color: getStatusColor(item.status) }]}>
              {getStatusText(item.status)}
            </Text>
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
    flexWrap: 'wrap',
  },
  statusButton: {
    borderWidth: 2,
    borderRadius: 20,
    padding: 8,
    marginVertical: 4,
    backgroundColor: '#fff',
  },
  activeStatusButton: {
    backgroundColor: '#E3F2FD',
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
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