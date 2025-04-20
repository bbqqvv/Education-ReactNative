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
  ActivityIndicator,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { LeaveRequestApi } from '@/app/api/leave-rquest/leave-request.service';
import { CreateLeaveRequestRequest } from '@/app/api/leave-rquest/leave-request.type';

const LeaveApplication = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateLeaveRequestRequest>({
    recipient: 'Giáo viên chủ nhiệm',
    senderName: '',
    reason: '',
    className: '',
    fromDate: new Date().toISOString().split('T')[0], // Stored as string for API
    toDate: new Date().toISOString().split('T')[0],
    imageFile: null,
  });
  const [startDate, setStartDate] = useState(new Date()); // For date picker
  const [endDate, setEndDate] = useState(new Date()); // For date picker
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (date: Date): string => {
    try {
      if (!(date instanceof Date) || isNaN(date.getTime())) {
        return 'Chọn ngày';
      }
      return date.toLocaleDateString('vi-VN');
    } catch {
      return 'Chọn ngày';
    }
  };

  const onDateChange = (event: any, selectedDate: Date | undefined, field: 'startDate' | 'endDate') => {
    const currentDate = selectedDate || (field === 'startDate' ? startDate : endDate);
    if (field === 'startDate') {
      setStartDate(currentDate);
      setFormData({ ...formData, fromDate: currentDate.toISOString().split('T')[0] });
      setShowStartDatePicker(false);
    } else {
      setEndDate(currentDate);
      setFormData({ ...formData, toDate: currentDate.toISOString().split('T')[0] });
      setShowEndDatePicker(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setFormData({ ...formData, imageFile: result.assets[0].uri });
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, imageFile: null });
  };

  const handleSubmit = async () => {
    if (!formData.senderName || !formData.reason || !formData.className) {
      Alert.alert('Thiếu thông tin', 'Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }

    try {
      setIsLoading(true);
      console.log('Submitting form:', formData);

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (key === 'imageFile' && value) {
            formDataToSend.append(key, {
              uri: value,
              name: 'evidence.jpg',
              type: 'image/jpeg',
            } as any);
          } else {
            formDataToSend.append(key, value.toString());
          }
        }
      });

      // Log FormData entries
    for (let pair of (formDataToSend as any)._parts) {
      console.log(`FormData entry: ${pair[0]} = ${pair[1]}`);
    }

      const response = await LeaveRequestApi.create(formDataToSend);
      console.log('Response:', response);

      if (response.success) {
        Alert.alert('Thành công', 'Đơn xin nghỉ đã được gửi');
        router.back();
      } else {
        Alert.alert('Lỗi', response.message || 'Gửi đơn thất bại');
      }
    } catch (error: any) {
      console.log('Error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      if (error.response?.status === 403) {
        Alert.alert('Lỗi', 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
        router.push('/login');
      } else {
        Alert.alert('Lỗi', error.message || 'Đã xảy ra lỗi khi gửi đơn');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
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
          <Text style={styles.label}>
            Kính gửi: <Text style={styles.required}>*</Text>
          </Text>
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

        {/* Sender Name */}
        <View style={styles.section}>
          <Text style={styles.label}>
            Người làm đơn: <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nhập họ và tên"
              placeholderTextColor="#999"
              value={formData.senderName}
              onChangeText={(text) => setFormData({ ...formData, senderName: text })}
            />
          </View>
        </View>

        {/* Class Name */}
        <View style={styles.section}>
          <Text style={styles.label}>
            Lớp: <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nhập tên lớp"
              placeholderTextColor="#999"
              value={formData.className}
              onChangeText={(text) => setFormData({ ...formData, className: text })}
            />
          </View>
        </View>

        <View style={styles.divider} />

        {/* Leave Period */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Thời gian nghỉ: <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.dateContainer}>
            <TouchableOpacity
              style={[styles.input, styles.dateInput]}
              onPress={() => setShowStartDatePicker(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.dateText}>{formatDate(startDate)}</Text>
              <MaterialIcons name="date-range" size={20} color="#59CBE8" />
            </TouchableOpacity>

            <Text style={styles.toText}>đến</Text>

            <TouchableOpacity
              style={[styles.input, styles.dateInput]}
              onPress={() => setShowEndDatePicker(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.dateText}>{formatDate(endDate)}</Text>
              <MaterialIcons name="date-range" size={20} color="#59CBE8" />
            </TouchableOpacity>
          </View>

          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="spinner"
              onChange={(event, date) => onDateChange(event, date, 'startDate')}
            />
          )}

          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="spinner"
              onChange={(event, date) => onDateChange(event, date, 'endDate')}
              minimumDate={startDate}
            />
          )}
        </View>

        <View style={styles.divider} />

        {/* Reason */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Lý do nghỉ: <Text style={styles.required}>*</Text>
          </Text>
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
          {formData.imageFile ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: formData.imageFile }} style={styles.uploadedImage} />
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
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