import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
  ActivityIndicator
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';

const LeaveApplication = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    recipient: 'Giáo viên chủ nhiệm',
    applicant: '',
    startDate: new Date(),
    endDate: new Date(),
    reason: '',
  });
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = () => {
    if (!formData.applicant || !formData.reason) {
      Alert.alert('Thiếu thông tin', 'Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Thành công', 'Đơn xin nghỉ của bạn đã được gửi');
      router.back();
    }, 1500);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN');
  };

  const onDateChange = (event, selectedDate, field) => {
    const currentDate = selectedDate || formData[field];
    setFormData({ ...formData, [field]: currentDate });
    if (field === 'startDate') setShowStartDatePicker(false);
    if (field === 'endDate') setShowEndDatePicker(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setUploadedImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đơn xin nghỉ</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Form */}
      <ScrollView
        contentContainerStyle={styles.formContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Recipient */}
        <View style={styles.section}>
          <Text style={styles.label}>Kính gửi: <Text style={styles.required}>*</Text></Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Giáo viên chủ nhiệm"
              placeholderTextColor="#999"
              value={formData.recipient}
              onChangeText={(text) => setFormData({ ...formData, recipient: text })}
            />
          </View>
        </View>

        {/* Applicant */}
        <View style={styles.section}>
          <Text style={styles.label}>Người làm đơn: <Text style={styles.required}>*</Text></Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nhập họ và tên"
              placeholderTextColor="#999"
              value={formData.applicant}
              onChangeText={(text) => setFormData({ ...formData, applicant: text })}
            />
          </View>
        </View>

        <View style={styles.divider} />

        {/* Leave Period */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thời gian nghỉ: <Text style={styles.required}>*</Text></Text>
          <View style={styles.dateContainer}>
            <TouchableOpacity
              style={[styles.input, styles.dateInput]}
              onPress={() => setShowStartDatePicker(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.dateText}>{formatDate(formData.startDate)}</Text>
              <MaterialIcons name="date-range" size={20} color="#59CBE8" />
            </TouchableOpacity>

            <Text style={styles.toText}>đến</Text>

            <TouchableOpacity
              style={[styles.input, styles.dateInput]}
              onPress={() => setShowEndDatePicker(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.dateText}>{formatDate(formData.endDate)}</Text>
              <MaterialIcons name="date-range" size={20} color="#59CBE8" />
            </TouchableOpacity>
          </View>

          {showStartDatePicker && (
            <DateTimePicker
              value={formData.startDate}
              mode="date"
              display="spinner"
              onChange={(event, date) => onDateChange(event, date, 'startDate')}
            />
          )}

          {showEndDatePicker && (
            <DateTimePicker
              value={formData.endDate}
              mode="date"
              display="spinner"
              onChange={(event, date) => onDateChange(event, date, 'endDate')}
              minimumDate={formData.startDate}
            />
          )}
        </View>

        <View style={styles.divider} />

        {/* Reason */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lý do nghỉ: <Text style={styles.required}>*</Text></Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Nhập lý do nghỉ"
              placeholderTextColor="#999"
              value={formData.reason}
              onChangeText={(text) => setFormData({ ...formData, reason: text })}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        <View style={styles.divider} />

        {/* Evidence */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bằng chứng (nếu có)</Text>
          {uploadedImage ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: uploadedImage }} style={styles.uploadedImage} />
              <TouchableOpacity style={styles.removeImageButton} onPress={removeImage}>
                <Ionicons name="close" size={20} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.uploadPlaceholder}
              onPress={pickImage}
              activeOpacity={0.7}
            >
              <Ionicons name="cloud-upload-outline" size={40} color="#59CBE8" />
              <Text style={styles.uploadText}>Tải lên bằng chứng</Text>
              <Text style={styles.uploadHint}>Hỗ trợ: JPG, PNG (tối đa 5MB)</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Buttons Row */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.previewButton}
            onPress={() => Alert.alert('Chức năng xem trước', 'Đang phát triển')}
            activeOpacity={0.7}
          >
            <Text style={styles.previewButtonText}>Xem trước</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            activeOpacity={0.7}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.submitButtonText}>Gửi đơn</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footerNote}>
          <Text style={styles.noteText}>Vui lòng kiểm tra kỹ thông tin trước khi gửi</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    backgroundColor: '#59CBE8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  formContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
    fontWeight: '600',
  },
  required: {
    color: '#FF3B30',
  },
  inputContainer: {
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    padding: 16,
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
    color: '#333',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateInput: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 52,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  toText: {
    marginHorizontal: 12,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  multilineInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  divider: {
    height: 1,
    backgroundColor: '#eaeaea',
    marginVertical: 20,
  },
  uploadPlaceholder: {
    borderWidth: 2,
    borderColor: '#59CBE8',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fcff',
  },
  uploadText: {
    marginTop: 12,
    color: '#59CBE8',
    fontSize: 16,
    fontWeight: '600',
  },
  uploadHint: {
    marginTop: 6,
    color: '#888',
    fontSize: 13,
  },
  imagePreviewContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    height: 200,
    marginTop: 8,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removeImageButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
  },
  previewButton: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flex: 1,
    marginRight: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButton: {
    backgroundColor: '#59CBE8',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    flex: 1,
    marginLeft: 12,
    alignItems: 'center',
    shadowColor: '#59CBE8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  previewButtonText: {
    color: '#555',
    fontSize: 16,
    fontWeight: '700',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  footerNote: {
    marginTop: 24,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  noteText: {
    color: '#888',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default LeaveApplication;