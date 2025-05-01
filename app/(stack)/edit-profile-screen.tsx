import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Platform,
    KeyboardAvoidingView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { UpdateProfileRequest } from '../api/user/user.type';
import { useUser } from '../hooks/useUser';

const EditProfileScreen: React.FC = () => {
    const router = useRouter();
    const { user } = useLocalSearchParams();
    const parsedUser = user ? JSON.parse(user as string) : null;

    const { updateProfile } = useUser();

    const [formData, setFormData] = useState<UpdateProfileRequest>({
        address: parsedUser?.profile?.address || '',
        phoneNumber: parsedUser?.profile?.phoneNumber || '',
        dateOfBirth: parsedUser?.profile?.dateOfBirth || '',
        gender: parsedUser?.profile?.gender || '',
        fatherName: parsedUser?.profile?.fatherName || '',
        motherName: parsedUser?.profile?.motherName || '',
        fatherPhoneNumber: parsedUser?.profile?.fatherPhoneNumber || '',
        motherPhoneNumber: parsedUser?.profile?.motherPhoneNumber || '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [activeField, setActiveField] = useState<string | null>(null);

    const handleInputChange = useCallback((field: keyof UpdateProfileRequest, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleDateChange = useCallback((event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            handleInputChange('dateOfBirth', selectedDate.toISOString());
        }
    }, [handleInputChange]);

    const handleSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            await updateProfile(formData);
            Alert.alert('Thành công', 'Thông tin đã được cập nhật');
            router.back();
        } catch (error) {
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi cập nhật thông tin');
        } finally {
            setIsLoading(false);
        }
    }, [formData, updateProfile, router]);

    const handleCancel = useCallback(() => {
        router.back();
    }, [router]);

    const handleFocus = (field: string) => {
        setActiveField(field);
    };

    const handleBlur = () => {
        setActiveField(null);
    };

    return (
        <LinearGradient
            colors={['#f8fafc', '#f1f5f9']}
            style={styles.container}
        >
            {/* Header */}
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={handleCancel}
                        style={styles.backButton}
                        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                    >
                        <Ionicons name="arrow-back" size={24} color="#1e293b" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Chỉnh sửa hồ sơ</Text>

                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
                        disabled={isLoading}
                        activeOpacity={0.8}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.saveButtonText}>Lưu</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Basic Information Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>Thông tin cơ bản</Text>

                        <View style={[
                            styles.inputContainer,
                            activeField === 'fullName' && styles.inputContainerActive
                        ]}>
                            <MaterialCommunityIcons
                                name="account"
                                size={22}
                                color={activeField === 'fullName' ? '#4e83ff' : '#64748b'}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Họ và tên"
                                placeholderTextColor="#94a3b8"
                                value={parsedUser?.fullName || ''}
                                editable={false}
                                onFocus={() => handleFocus('fullName')}
                                onBlur={handleBlur}
                            />
                        </View>

                        <View style={[
                            styles.inputContainer,
                            activeField === 'userCode' && styles.inputContainerActive
                        ]}>
                            <MaterialCommunityIcons
                                name="identifier"
                                size={22}
                                color={activeField === 'userCode' ? '#4e83ff' : '#64748b'}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Mã người dùng"
                                placeholderTextColor="#94a3b8"
                                value={parsedUser?.userCode || ''}
                                editable={false}
                                onFocus={() => handleFocus('userCode')}
                                onBlur={handleBlur}
                            />
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.inputContainer,
                                activeField === 'dateOfBirth' && styles.inputContainerActive
                            ]}
                            onPress={() => {
                                setShowDatePicker(true);
                                handleFocus('dateOfBirth');
                            }}
                            activeOpacity={0.8}
                        >
                            <MaterialCommunityIcons
                                name="calendar"
                                size={22}
                                color={activeField === 'dateOfBirth' ? '#4e83ff' : '#64748b'}
                                style={styles.inputIcon}
                            />
                            <Text style={[
                                styles.input,
                                !formData.dateOfBirth && styles.placeholderText,
                                activeField === 'dateOfBirth' && styles.inputActive
                            ]}>
                                {formData.dateOfBirth
                                    ? format(new Date(formData.dateOfBirth), 'dd/MM/yyyy', { locale: vi })
                                    : 'Chọn ngày sinh'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Contact Information Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>Thông tin liên hệ</Text>

                        <View style={[
                            styles.inputContainer,
                            activeField === 'email' && styles.inputContainerActive
                        ]}>
                            <MaterialCommunityIcons
                                name="email"
                                size={22}
                                color={activeField === 'email' ? '#4e83ff' : '#64748b'}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#94a3b8"
                                value={parsedUser?.email || ''}
                                editable={false}
                                onFocus={() => handleFocus('email')}
                                onBlur={handleBlur}
                            />
                        </View>

                        <View style={[
                            styles.inputContainer,
                            activeField === 'phoneNumber' && styles.inputContainerActive
                        ]}>
                            <MaterialCommunityIcons
                                name="phone"
                                size={22}
                                color={activeField === 'phoneNumber' ? '#4e83ff' : '#64748b'}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Số điện thoại"
                                placeholderTextColor="#94a3b8"
                                value={formData.phoneNumber}
                                onChangeText={(text) => handleInputChange('phoneNumber', text)}
                                keyboardType="phone-pad"
                                onFocus={() => handleFocus('phoneNumber')}
                                onBlur={handleBlur}
                            />
                        </View>
                    </View>

                    {/* Additional Information Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>Thông tin khác</Text>

                        <View style={[
                            styles.inputContainer,
                            activeField === 'gender' && styles.inputContainerActive
                        ]}>
                            <MaterialCommunityIcons
                                name="gender-male-female"
                                size={22}
                                color={activeField === 'gender' ? '#4e83ff' : '#64748b'}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Giới tính (Nam/Nữ/Khác)"
                                placeholderTextColor="#94a3b8"
                                value={formData.gender}
                                onChangeText={(text) => handleInputChange('gender', text)}
                                onFocus={() => handleFocus('gender')}
                                onBlur={handleBlur}
                            />
                        </View>

                        <View style={[
                            styles.inputContainer,
                            activeField === 'address' && styles.inputContainerActive,
                            styles.multilineInputContainer
                        ]}>
                            <MaterialCommunityIcons
                                name="home"
                                size={22}
                                color={activeField === 'address' ? '#4e83ff' : '#64748b'}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={[styles.input, styles.multilineInput]}
                                placeholder="Địa chỉ"
                                placeholderTextColor="#94a3b8"
                                value={formData.address}
                                onChangeText={(text) => handleInputChange('address', text)}
                                multiline
                                numberOfLines={3}
                                textAlignVertical="top"
                                onFocus={() => handleFocus('address')}
                                onBlur={handleBlur}
                            />
                        </View>
                    </View>

                    {/* Family Information Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionHeader}>Thông tin gia đình</Text>

                        <View style={[styles.inputContainer, activeField === 'fatherName' && styles.inputContainerActive]}>
                            <MaterialCommunityIcons
                                name="account"
                                size={22}
                                color={activeField === 'fatherName' ? '#4e83ff' : '#64748b'}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Tên cha"
                                placeholderTextColor="#94a3b8"
                                value={formData.fatherName}
                                onChangeText={(text) => handleInputChange('fatherName', text)}
                                onFocus={() => handleFocus('fatherName')}
                                onBlur={handleBlur}
                            />
                        </View>

                        <View style={[styles.inputContainer, activeField === 'fatherPhoneNumber' && styles.inputContainerActive]}>
                            <MaterialCommunityIcons
                                name="phone"
                                size={22}
                                color={activeField === 'fatherPhoneNumber' ? '#4e83ff' : '#64748b'}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Số điện thoại cha"
                                placeholderTextColor="#94a3b8"
                                value={formData.fatherPhoneNumber}
                                onChangeText={(text) => handleInputChange('fatherPhoneNumber', text)}
                                keyboardType="phone-pad"
                                onFocus={() => handleFocus('fatherPhoneNumber')}
                                onBlur={handleBlur}
                            />
                        </View>

                        <View style={[styles.inputContainer, activeField === 'motherName' && styles.inputContainerActive]}>
                            <MaterialCommunityIcons
                                name="account"
                                size={22}
                                color={activeField === 'motherName' ? '#4e83ff' : '#64748b'}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Tên mẹ"
                                placeholderTextColor="#94a3b8"
                                value={formData.motherName}
                                onChangeText={(text) => handleInputChange('motherName', text)}
                                onFocus={() => handleFocus('motherName')}
                                onBlur={handleBlur}
                            />
                        </View>

                        <View style={[styles.inputContainer, activeField === 'motherPhoneNumber' && styles.inputContainerActive]}>
                            <MaterialCommunityIcons
                                name="phone"
                                size={22}
                                color={activeField === 'motherPhoneNumber' ? '#4e83ff' : '#64748b'}
                                style={styles.inputIcon}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Số điện thoại mẹ"
                                placeholderTextColor="#94a3b8"
                                value={formData.motherPhoneNumber}
                                onChangeText={(text) => handleInputChange('motherPhoneNumber', text)}
                                keyboardType="phone-pad"
                                onFocus={() => handleFocus('motherPhoneNumber')}
                                onBlur={handleBlur}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {showDatePicker && (
                <DateTimePicker
                    value={formData.dateOfBirth ? new Date(formData.dateOfBirth) : new Date()}
                    mode="date"
                    display="spinner"
                    onChange={handleDateChange}
                    maximumDate={new Date()}
                    locale="vi"
                />
            )}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    headerContainer: {
        backgroundColor: '#ffffff',
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        paddingBottom: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1e293b',
        fontFamily: 'Inter-SemiBold',
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(78, 131, 255, 0.1)',
    },
    saveButton: {
        backgroundColor: '#4e83ff',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
        minWidth: 80,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#4e83ff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    saveButtonDisabled: {
        opacity: 0.7,
    },
    saveButtonText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
    },
    scrollContainer: {
        paddingVertical: 16,
        paddingBottom: 40,
    },
    section: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        marginHorizontal: 16,
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 1,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: '600',
        color: '#4e83ff',
        marginBottom: 16,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
        fontFamily: 'Inter-SemiBold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        paddingVertical: 12,
        marginBottom: 8,
    },
    inputContainerActive: {
        borderBottomColor: '#4e83ff',
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#1e293b',
        paddingVertical: 6,
        fontFamily: 'Inter-Regular',
    },
    inputActive: {
        color: '#4e83ff',
    },
    placeholderText: {
        color: '#94a3b8',
    },
    multilineInputContainer: {
        alignItems: 'flex-start',
        minHeight: 100,
    },
    multilineInput: {
        height: 'auto',
        maxHeight: 150,
    },
});

export default EditProfileScreen;