import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ViolationDetail = () => {
  // Mock data từ API
  const violationData = {
    id: "123456",
    studentCode: "B21DCCN001",
    fullName: "Nguyễn Văn A",
    role: "STUDENT",
    description: "Đi học muộn không lý do",
    level: "MEDIUM",
    createdAt: "2025-04-11T15:30:00",
    createdBy: "giangvien01"
  };

  // Chuyển đổi level thành tiếng Việt
  const getViolationLevel = (level) => {
    switch (level) {
      case 'LOW': return 'Nhẹ';
      case 'MEDIUM': return 'Trung bình';
      case 'HIGH': return 'Nặng';
      default: return level;
    }
  };

  // Định dạng ngày tháng
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  };

  const router = useRouter();
  const handleFeaturePress = () => {
    router.push('/(tabs)/home'); // Navigate back to the home screen
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="white" onPress={handleFeaturePress} />
        <Text style={styles.headerTitle}>Chi tiết vi phạm</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Nội dung */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Thông tin học sinh */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin học sinh</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Mã sinh viên:</Text>
            <Text style={styles.value}>{violationData.studentCode}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Họ và tên:</Text>
            <Text style={styles.value}>{violationData.fullName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Vai trò:</Text>
            <Text style={styles.value}>{violationData.role === 'STUDENT' ? 'Học sinh' : violationData.role}</Text>
          </View>
        </View>

        {/* Thông tin vi phạm */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin vi phạm</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Mã vi phạm:</Text>
            <Text style={styles.value}>{violationData.id}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Mức độ:</Text>
            <Text style={[styles.value, styles[`level${violationData.level}`]]}>
              {getViolationLevel(violationData.level)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Ngày tạo:</Text>
            <Text style={styles.value}>{formatDate(violationData.createdAt)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Người tạo:</Text>
            <Text style={styles.value}>{violationData.createdBy}</Text>
          </View>
        </View>

        {/* Mô tả vi phạm */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mô tả vi phạm</Text>
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionText}>{violationData.description}</Text>
          </View>
        </View>
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
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  descriptionBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  // Style cho các mức độ vi phạm
  levelLOW: {
    color: '#4CAF50', // Xanh lá cho mức nhẹ
  },
  levelMEDIUM: {
    color: '#FFC107', // Vàng cho mức trung bình
  },
  levelHIGH: {
    color: '#F44336', // Đỏ cho mức nặng
  },
});

export default ViolationDetail;