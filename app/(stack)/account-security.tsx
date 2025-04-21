import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Switch,
    Alert,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

const AccountSecurity = () => {
    const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
    const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [activeDevices, setActiveDevices] = useState([
        { id: '1', name: 'iPhone 13 Pro', os: 'iOS', lastActive: '2 giờ trước', current: true },
        { id: '2', name: 'iPad Pro', os: 'iPadOS', lastActive: '3 ngày trước', current: false },
        { id: '3', name: 'Samsung Galaxy S22', os: 'Android', lastActive: '1 tuần trước', current: false },
    ]);

    const toggleBiometric = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setIsBiometricEnabled(prev => !prev);
    };

    const toggleTwoFactor = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setIsTwoFactorEnabled(prev => !prev);
    };

    const handleChangePassword = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        Alert.alert(
            "Đổi mật khẩu",
            "Bạn sẽ nhận được email hướng dẫn đổi mật khẩu",
            [
                { text: "Hủy", style: "cancel" },
                { text: "Tiếp tục", onPress: () => setIsLoading(true) }
            ]
        );
    };

    const handleDeviceRemove = (deviceId: string) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        Alert.alert(
            "Xóa thiết bị",
            "Bạn có chắc chắn muốn xóa thiết bị này khỏi danh sách đăng nhập?",
            [
                { text: "Hủy", style: "cancel" },
                {
                    text: "Xóa",
                    style: "destructive",
                    onPress: () => {
                        setActiveDevices(prev => prev.filter(device => device.id !== deviceId));
                    }
                }
            ]
        );
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4e83ff" />
                <Text style={styles.loadingText}>Đang xử lý...</Text>
            </View>
        );
    }

    return (
        <LinearGradient colors={["#f0f4ff", "#e6f0ff"]} style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        activeOpacity={0.7}
                        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                    >
                        <Ionicons name="arrow-back" size={24} color="#1e293b" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Bảo mật tài khoản</Text>
                    <View style={{ width: 24 }} /> {/* Spacer for balance */}
                </View>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Security Status Card */}
                <View style={styles.statusCard}>
                    <View style={styles.statusHeader}>
                        <MaterialCommunityIcons name="shield-check" size={24} color="#4e83ff" />
                        <Text style={styles.statusTitle}>Tình trạng bảo mật</Text>
                    </View>
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusBadgeText}>Mạnh</Text>
                    </View>
                    <Text style={styles.statusDescription}>
                        Tài khoản của bạn được bảo vệ với xác thực 2 lớp và mật khẩu mạnh.
                    </Text>
                </View>

                {/* Security Options */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tùy chọn bảo mật</Text>

                    <SecurityOption
                        icon="fingerprint"
                        title="Mở khóa bằng vân tay/face ID"
                        description="Sử dụng sinh trắc học để đăng nhập nhanh hơn"
                        rightComponent={
                            <Switch
                                value={isBiometricEnabled}
                                onValueChange={toggleBiometric}
                                trackColor={{ false: "#e2e8f0", true: "#4e83ff" }}
                                thumbColor="#fff"
                            />
                        }
                    />

                    <SecurityOption
                        icon="cellphone-key"
                        title="Xác thực 2 lớp (2FA)"
                        description="Yêu cầu mã xác minh khi đăng nhập"
                        rightComponent={
                            <Switch
                                value={isTwoFactorEnabled}
                                onValueChange={toggleTwoFactor}
                                trackColor={{ false: "#e2e8f0", true: "#4e83ff" }}
                                thumbColor="#fff"
                            />
                        }
                    />

                    <SecurityOption
                        icon="lock-reset"
                        title="Đổi mật khẩu"
                        description="Cập nhật mật khẩu mới thường xuyên"
                        rightComponent={<MaterialIcons name="chevron-right" size={24} color="#94a3b8" />}
                        onPress={handleChangePassword}
                    />
                </View>

                {/* Active Devices */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Thiết bị đang hoạt động</Text>
                        <Text style={styles.deviceCount}>{activeDevices.length} thiết bị</Text>
                    </View>

                    {activeDevices.map(device => (
                        <DeviceItem
                            key={device.id}
                            name={device.name}
                            os={device.os}
                            lastActive={device.lastActive}
                            isCurrent={device.current}
                            onRemove={() => handleDeviceRemove(device.id)}
                        />
                    ))}
                </View>

                {/* Security Tips */}
                <View style={styles.tipsCard}>
                    <Text style={styles.tipsTitle}>Mẹo bảo mật</Text>
                    <SecurityTip icon="shield-key" text="Không chia sẻ mã OTP với bất kỳ ai" />
                    <SecurityTip icon="update" text="Cập nhật ứng dụng thường xuyên" />
                    <SecurityTip icon="email-alert" text="Kiểm tra email đăng nhập bất thường" />
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

const SecurityOption = ({ icon, title, description, rightComponent, onPress }: {
    icon: string;
    title: string;
    description: string;
    rightComponent: React.ReactNode;
    onPress?: () => void;
}) => (
    <TouchableOpacity
        style={styles.optionItem}
        activeOpacity={0.7}
        onPress={onPress}
    >
        <View style={styles.optionLeft}>
            <MaterialCommunityIcons
                name={icon}
                size={22}
                color="#4e83ff"
                style={styles.optionIcon}
            />
            <View style={styles.optionText}>
                <Text style={styles.optionTitle}>{title}</Text>
                <Text style={styles.optionDescription}>{description}</Text>
            </View>
        </View>
        {rightComponent}
    </TouchableOpacity>
);

const DeviceItem = ({ name, os, lastActive, isCurrent, onRemove }: {
    name: string;
    os: string;
    lastActive: string;
    isCurrent: boolean;
    onRemove: () => void;
}) => (
    <View style={styles.deviceItem}>
        <View style={styles.deviceIcon}>
            <MaterialCommunityIcons
                name={os === 'iOS' ? 'apple' : os === 'Android' ? 'android' : 'tablet'}
                size={24}
                color="#4e83ff"
            />
        </View>
        <View style={styles.deviceInfo}>
            <View style={styles.deviceHeader}>
                <Text style={styles.deviceName}>{name}</Text>
                {isCurrent && (
                    <View style={styles.currentBadge}>
                        <Text style={styles.currentBadgeText}>Hiện tại</Text>
                    </View>
                )}
            </View>
            <Text style={styles.deviceDetails}>{os} • Hoạt động {lastActive}</Text>
        </View>
        {!isCurrent && (
            <TouchableOpacity
                style={styles.removeButton}
                activeOpacity={0.7}
                onPress={onRemove}
            >
                <MaterialIcons name="delete-outline" size={20} color="#ef4444" />
            </TouchableOpacity>
        )}
    </View>
);

const SecurityTip = ({ icon, text }: { icon: string; text: string }) => (
    <View style={styles.tipItem}>
        <MaterialCommunityIcons
            name={icon}
            size={18}
            color="#4e83ff"
            style={styles.tipIcon}
        />
        <Text style={styles.tipText}>{text}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
    },
    loadindText: {
        marginTop: 16,
        color: '#64748b',
        fontSize: 16,
    },
    headerContainer: {
        backgroundColor: '#f0f4ff',
        paddingBottom: 8,
        ...Platform.select({
            ios: {
                shadowColor: '#64748b',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: '#cbd5e1',
            },
        }),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        paddingBottom: 20,
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.7)',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1e293b',
        fontFamily: 'sans-serif-medium',
    },
    scrollContainer: {
        paddingBottom: 40,
    },
    statusCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginHorizontal: 20,
        marginTop: 16,
        marginBottom: 24,
        padding: 20,
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    statusHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    statusTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1e293b',
        marginLeft: 10,
    },
    statusBadge: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        marginBottom: 12,
    },
    statusBadgeText: {
        color: '#10b981',
        fontWeight: '600',
        fontSize: 14,
    },
    statusDescription: {
        fontSize: 14,
        color: '#64748b',
        lineHeight: 22,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginHorizontal: 20,
        marginBottom: 16,
        padding: 20,
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1e293b',
    },
    deviceCount: {
        fontSize: 14,
        color: '#64748b',
        fontWeight: '500',
    },
    optionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    optionIcon: {
        marginRight: 16,
    },
    optionText: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1e293b',
        marginBottom: 4,
    },
    optionDescription: {
        fontSize: 13,
        color: '#94a3b8',
    },
    deviceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    deviceIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(78, 131, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    deviceInfo: {
        flex: 1,
    },
    deviceHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    deviceName: {
        fontSize: 15,
        fontWeight: '500',
        color: '#1e293b',
    },
    currentBadge: {
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 6,
        marginLeft: 8,
    },
    currentBadgeText: {
        fontSize: 12,
        color: '#10b981',
        fontWeight: '500',
    },
    deviceDetails: {
        fontSize: 13,
        color: '#94a3b8',
    },
    removeButton: {
        padding: 8,
        marginLeft: 8,
    },
    tipsCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginHorizontal: 20,
        marginBottom: 24,
        padding: 20,
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    tipsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: 16,
    },
    tipItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    tipIcon: {
        marginRight: 12,
    },
    tipText: {
        fontSize: 14,
        color: '#64748b',
        flex: 1,
    },
});

export default AccountSecurity;