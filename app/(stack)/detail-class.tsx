import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const DetailScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const isTeacher = params.type === 'teacher';

  const handleBackPress = () => {
    router.push('/(stack)/class');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={{ position: 'absolute', left: 20, top: 40 }}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={60} color="#59CBE8" />
        </View>
        <Text style={styles.name}>{params.fullName}</Text>
        <Text style={styles.type}>{isTeacher ? 'Giáo viên' : 'Học sinh'}</Text>
      </View>

      {/* Info Section */}
      <ScrollView contentContainerStyle={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Thông tin cơ bản</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Ngày sinh:</Text>
            <Text style={styles.infoValue}>{params.dateOfBirth}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Giới tính:</Text>
            <Text style={styles.infoValue}>{params.gender}</Text>
          </View>

          {isTeacher && (
            <>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Môn dạy:</Text>
                <Text style={styles.infoValue}>{params.subject}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Kinh nghiệm:</Text>
                <Text style={styles.infoValue}>{params.yearsOfExperience} năm</Text>
              </View>
            </>
          )}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Liên hệ</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{params.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Điện thoại:</Text>
            <Text style={styles.infoValue}>{params.phone}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Địa chỉ:</Text>
            <Text style={styles.infoValue}>{params.address}</Text>
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
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#f5f5f5',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#59CBE8',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  type: {
    fontSize: 16,
    color: '#59CBE8',
    marginTop: 5,
  },
  infoContainer: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#59CBE8',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoLabel: {
    width: 120,
    fontSize: 15,
    color: '#555',
  },
  infoValue: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
});

export default DetailScreen;