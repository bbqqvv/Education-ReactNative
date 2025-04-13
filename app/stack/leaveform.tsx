import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const LeaveApplication = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('27/01/2023');
  const [endDate, setEndDate] = useState('27/01/2023');
  const [reason, setReason] = useState('');
  
  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đơn xin nghỉ</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Form */}
      <ScrollView contentContainerStyle={styles.formContainer}>
        {/* Recipient */}
        <View style={styles.section}>
          <Text style={styles.label}>Kính gửi:</Text>
          <Text style={styles.value}>Giáo viên chủ nhiệm</Text>
        </View>

        {/* Applicant */}
        <View style={styles.section}>
          <Text style={styles.label}>Người làm đơn:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập họ và tên"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.divider} />

        {/* Leave Period */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thời gian nghỉ:</Text>
          <View style={styles.dateContainer}>
            <TextInput
              style={[styles.input, styles.dateInput1]}
              value={startDate}
              onChangeText={setStartDate}
            />
            <Text style={styles.toText}>Đến:</Text>
            <TextInput
              style={[styles.input, styles.dateInput2]}
              value={endDate}
              onChangeText={setEndDate}
            />
          </View>
        </View>

        <View style={styles.divider} />

        {/* Reason */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lý do nghỉ:</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Nhập lý do nghỉ"
            value={reason}
            onChangeText={setReason}
            multiline
          />
        </View>

        <View style={styles.divider} />

        {/* Evidence */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bằng chứng nếu có</Text>
          <TouchableOpacity style={styles.uploadPlaceholder}>
            <Ionicons name="cloud-upload-outline" size={40} color="#59CBE8" />
            <Text style={styles.uploadText}>Tải lên bằng chứng</Text>
          </TouchableOpacity>
        </View>

        {/* Buttons Row */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.previewButton}>
            <Text style={styles.previewButtonText}>Xem trước</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Xác nhận</Text>
          </TouchableOpacity>
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
  formContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateInput1: {
    width: 130,
    marginRight: 20,
    textAlign: 'center',
  },
  dateInput2: {
    width: 130,
    marginLeft: 20,
    textAlign: 'center',
  },
  toText: {
    marginHorizontal: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  uploadPlaceholder: {
    borderWidth: 1,
    borderColor: '#59CBE8',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    marginTop: 8,
    color: '#59CBE8',
    fontSize: 16,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  previewButton: {
    backgroundColor: '#F8F8F8',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#59CBE8',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  previewButtonText: {
    color: '#555',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LeaveApplication;