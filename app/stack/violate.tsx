
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ViolationScreen = () => {
  const router = useRouter();
  const [selectedViolation, setSelectedViolation] = useState(null);

  const handleBackPress = () => {
    router.push('/(tabs)/home');
  };

  const violations = [
    {
      id: "123",
      studentCode: "B21DCCN001",
      fullName: "Bùi Quốc Văn",
      role: "STUDENT",
      description: "Bị tố an trap",
      level: "HIGH",
      createdAt: "2025-04-11T15:30:00",
      createdBy: "giangvien01"
    },
    {
      id: "124",
      studentCode: "B21DCCN001",
      fullName: "Nguyễn Văn Thành",
      role: "STUDENT",
      description: "Ko tỏ tình huỳnh minh",
      level: "MEDIUM",
      createdAt: "2025-04-11T15:30:00",
      createdBy: "giangvien01"
    },
    {
      id: "125",
      studentCode: "B21DCCN001",
      fullName: "Đàm Phương Nam",
      role: "STUDENT",
      description: "Bị liễu đùa giỡn tình cảm",
      level: "HIGH",
      createdAt: "2025-04-11T15:30:00",
      createdBy: "giangvien01"
    },
    // ... thêm các vi phạm khác nếu cần
  ];

  const getViolationLevel = (level) => {
    switch (level) {
      case 'LOW': return 'Nhẹ';
      case 'MEDIUM': return 'Trung bình';
      case 'HIGH': return 'Nặng';
      default: return level;
    }
  };


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  };

  return (
    <View style={styles.container}>
      {!selectedViolation ? (
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBackPress}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Danh sách vi phạm</Text>
            <View style={{ width: 24 }} /> {/* Placeholder để căn giữa tiêu đề */}
          </View>
          
          <ScrollView contentContainerStyle={styles.listContainer}>
            {violations.map((violation) => (
              <TouchableOpacity
                key={violation.id}
                onPress={() => setSelectedViolation(violation)}
                style={styles.violationCard}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardName}>{violation.fullName}</Text>
                  <Text style={[styles.cardLevel, styles[`level${violation.level}`]]}>
                    {getViolationLevel(violation.level)}
                  </Text>
                </View>
                <Text style={styles.cardCode}>MSSV: {violation.studentCode}</Text>
                <Text style={styles.cardDate}>{formatDate(violation.createdAt)}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>{violation.description}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      ) : (
        <View style={styles.detailWrapper}>
          {/* Header chi tiết */}
          <View style={styles.detailHeader}>
            <TouchableOpacity onPress={() => setSelectedViolation(null)}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.detailHeaderTitle}>Chi tiết vi phạm</Text>
            <View style={{ width: 24 }} />
          </View>
          
          {/* Nội dung chi tiết */}
          <ScrollView contentContainerStyle={styles.detailContent}>
            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>Thông tin học sinh</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Mã sinh viên:</Text>
                <Text style={styles.infoValue}>{selectedViolation.studentCode}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Họ và tên:</Text>
                <Text style={styles.infoValue}>{selectedViolation.fullName}</Text>
              </View>
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>Thông tin vi phạm</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Mức độ:</Text>
                <Text style={[styles.infoValue, styles[`level${selectedViolation.level}`]]}>
                  {getViolationLevel(selectedViolation.level)}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Ngày vi phạm:</Text>
                <Text style={styles.infoValue}>{formatDate(selectedViolation.createdAt)}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Người ghi nhận:</Text>
                <Text style={styles.infoValue}>{selectedViolation.createdBy}</Text>
              </View>
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.sectionTitle}>Mô tả chi tiết</Text>
              <View style={styles.descriptionBox}>
                <Text style={styles.descriptionText}>{selectedViolation.description}</Text>
              </View>
            </View>

            <View style={styles.footer}>
              <Image 
                style={styles.footerImage} 
                source={require("@/assets/images/img-rm.png")} 
              />
              <Text style={styles.footerText}>
                &copy; 2025 Trường THPT Trần Cao Vân. All rights reserved.
              </Text>
            </View>
          </ScrollView>
        </View>
      )}
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
  },
  listContainer: {
    padding: 16,
    paddingBottom: 20,
  },
  violationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eaeaea',
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
    marginBottom: 8,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardLevel: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  cardCode: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 13,
    color: '#888',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  // Chi tiết vi phạm
  detailWrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  detailHeader: {
    backgroundColor: '#59CBE8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  detailHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  detailContent: {
    padding: 16,
    paddingBottom: 40,
  },
  detailSection: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',

    color: '#59CBE8',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    flex: 1,
    textAlign: 'right',
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
  // Màu mức độ
  levelLOW: {
    color: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  levelMEDIUM: {
    color: '#FFC107',
    backgroundColor: '#FFF8E1',
  },
  levelHIGH: {
    color: '#F44336',
    backgroundColor: '#FFEBEE',
  },
  // Footer
  footer: {
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#F8F8F8',
  },
  footerImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

export default ViolationScreen;
