import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Switch,
    Platform,
    RefreshControl,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

type NotificationItem = {
    id: string;
    title: string;
    message: string;
    time: string;
    icon: string;
    read: boolean;
    type: 'system' | 'academic' | 'social';
};

const NotificationsScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [notificationSettings, setNotificationSettings] = useState({
        messages: true,
        assignments: true,
        grades: true,
        events: false,
        announcements: true,
    });
    const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

    const [notifications, setNotifications] = useState<NotificationItem[]>([
        {
            id: '1',
            title: 'Bài tập mới',
            message: 'Bạn có bài tập môn Toán cần nộp vào ngày mai',
            time: '10 phút trước',
            icon: 'book',
            read: false,
            type: 'academic',
        },
        {
            id: '2',
            title: 'Điểm số cập nhật',
            message: 'Điểm kiểm tra 15 phút môn Lý đã được cập nhật',
            time: '2 giờ trước',
            icon: 'chart-line',
            read: true,
            type: 'academic',
        },
        {
            id: '3',
            title: 'Thông báo hệ thống',
            message: 'Phiên bản mới 2.1.0 đã sẵn sàng để cập nhật',
            time: '5 giờ trước',
            icon: 'alert-circle',
            read: true,
            type: 'system',
        },
        {
            id: '4',
            title: 'Lời mời kết bạn',
            message: 'Nguyễn Văn A đã gửi cho bạn lời mời kết bạn',
            time: '1 ngày trước',
            icon: 'account-plus',
            read: false,
            type: 'social',
        },
        {
            id: '5',
            title: 'Lịch học thay đổi',
            message: 'Lịch học thứ 6 tuần này đã được điều chỉnh',
            time: '2 ngày trước',
            icon: 'calendar-sync',
            read: true,
            type: 'academic',
        },
    ]);

    const onRefresh = () => {
        setRefreshing(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        // Simulate refresh
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    };

    const toggleNotification = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setNotificationsEnabled(prev => !prev);
    };

    const toggleNotificationSetting = (setting: keyof typeof notificationSettings) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setNotificationSettings(prev => ({
            ...prev,
            [setting]: !prev[setting],
        }));
    };

    const markAsRead = (id: string) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
    };

    const clearAllNotifications = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setNotifications(prev => prev.filter(notif => !notif.read));
    };

    const filteredNotifications = activeTab === 'unread'
        ? notifications.filter(notif => !notif.read)
        : notifications;

    const unreadCount = notifications.filter(notif => !notif.read).length;

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
                    <Text style={styles.headerTitle}>Thông báo</Text>
                    <TouchableOpacity
                        onPress={clearAllNotifications}
                        activeOpacity={0.7}
                        disabled={notifications.every(notif => !notif.read)}
                    >
                        <Text style={[
                            styles.clearButton,
                            notifications.every(notif => !notif.read) && styles.clearButtonDisabled
                        ]}>
                            Xóa tất cả
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        activeTab === 'all' && styles.tabButtonActive
                    ]}
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        setActiveTab('all');
                    }}
                    activeOpacity={0.7}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === 'all' && styles.tabTextActive
                    ]}>
                        Tất cả
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        activeTab === 'unread' && styles.tabButtonActive
                    ]}
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        setActiveTab('unread');
                    }}
                    activeOpacity={0.7}
                >
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
                    </View>
                    <Text style={[
                        styles.tabText,
                        activeTab === 'unread' && styles.tabTextActive
                    ]}>
                        Chưa đọc
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#4e83ff"
                        colors={['#4e83ff']}
                    />
                }
            >
                {/* Notification Toggle */}
                <View style={styles.toggleCard}>
                    <View style={styles.toggleContainer}>
                        <MaterialCommunityIcons name="bell" size={22} color="#4e83ff" />
                        <Text style={styles.toggleText}>Thông báo ứng dụng</Text>
                    </View>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={toggleNotification}
                        trackColor={{ false: "#e2e8f0", true: "#4e83ff" }}
                        thumbColor="#fff"
                    />
                </View>

                {/* Notification Settings */}
                {notificationsEnabled && (
                    <View style={styles.settingsCard}>
                        <Text style={styles.settingsTitle}>Cài đặt thông báo</Text>

                        <NotificationSetting
                            icon="message-text"
                            title="Tin nhắn"
                            enabled={notificationSettings.messages}
                            onToggle={() => toggleNotificationSetting('messages')}
                        />

                        <NotificationSetting
                            icon="book-education"
                            title="Bài tập"
                            enabled={notificationSettings.assignments}
                            onToggle={() => toggleNotificationSetting('assignments')}
                        />

                        <NotificationSetting
                            icon="chart-box"
                            title="Điểm số"
                            enabled={notificationSettings.grades}
                            onToggle={() => toggleNotificationSetting('grades')}
                        />

                        <NotificationSetting
                            icon="calendar"
                            title="Sự kiện"
                            enabled={notificationSettings.events}
                            onToggle={() => toggleNotificationSetting('events')}
                        />

                        <NotificationSetting
                            icon="bullhorn"
                            title="Thông báo chung"
                            enabled={notificationSettings.announcements}
                            onToggle={() => toggleNotificationSetting('announcements')}
                        />
                    </View>
                )}

                {/* Notifications List */}
                <View style={styles.notificationsContainer}>
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map(notification => (
                            <NotificationItem
                                key={notification.id}
                                title={notification.title}
                                message={notification.message}
                                time={notification.time}
                                icon={notification.icon}
                                read={notification.read}
                                type={notification.type}
                                onPress={() => markAsRead(notification.id)}
                            />
                        ))
                    ) : (
                        <View style={styles.emptyContainer}>
                            <MaterialCommunityIcons
                                name="bell-off"
                                size={48}
                                color="#cbd5e1"
                                style={styles.emptyIcon}
                            />
                            <Text style={styles.emptyText}>Không có thông báo</Text>
                            <Text style={styles.emptySubtext}>
                                {activeTab === 'unread'
                                    ? 'Bạn đã đọc tất cả thông báo'
                                    : 'Không có thông báo nào trong hệ thống'}
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

const NotificationSetting = ({ icon, title, enabled, onToggle }: {
    icon: string;
    title: string;
    enabled: boolean;
    onToggle: () => void;
}) => (
    <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
            <MaterialCommunityIcons
                name={icon}
                size={20}
                color={enabled ? "#4e83ff" : "#94a3b8"}
                style={styles.settingIcon}
            />
            <Text style={[
                styles.settingText,
                !enabled && styles.settingTextDisabled
            ]}>
                {title}
            </Text>
        </View>
        <Switch
            value={enabled}
            onValueChange={onToggle}
            trackColor={{ false: "#e2e8f0", true: "#4e83ff" }}
            thumbColor="#fff"
        />
    </View>
);

const NotificationItem = ({ title, message, time, icon, read, type, onPress }: {
    title: string;
    message: string;
    time: string;
    icon: string;
    read: boolean;
    type: 'system' | 'academic' | 'social';
    onPress: () => void;
}) => {
    const getTypeColor = () => {
        switch (type) {
            case 'academic': return '#4e83ff';
            case 'social': return '#10b981';
            case 'system': return '#f59e0b';
            default: return '#4e83ff';
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.notificationItem,
                !read && styles.unreadNotification
            ]}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <View style={[
                styles.notificationIcon,
                { backgroundColor: `${getTypeColor()}20` }
            ]}>
                <MaterialCommunityIcons
                    name={icon}
                    size={20}
                    color={getTypeColor()}
                />
            </View>
            <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                    <Text style={styles.notificationTitle}>{title}</Text>
                    {!read && <View style={styles.unreadDot} />}
                </View>
                <Text style={styles.notificationMessage}>{message}</Text>
                <Text style={styles.notificationTime}>{time}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    clearButton: {
        color: '#4e83ff',
        fontWeight: '600',
        fontSize: 15,
    },
    clearButtonDisabled: {
        color: '#cbd5e1',
    },
    tabsContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    tabButton: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    tabButtonActive: {
        borderBottomWidth: 2,
        borderBottomColor: '#4e83ff',
    },
    tabText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#64748b',
    },
    tabTextActive: {
        color: '#4e83ff',
        fontWeight: '600',
    },
    unreadBadge: {
        backgroundColor: '#ef4444',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    unreadBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    scrollContainer: {
        paddingBottom: 40,
    },
    toggleCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        marginHorizontal: 20,
        marginTop: 16,
        marginBottom: 12,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    toggleText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1e293b',
        marginLeft: 12,
    },
    settingsCard: {
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
    settingsTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: 16,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingIcon: {
        marginRight: 16,
    },
    settingText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#1e293b',
    },
    settingTextDisabled: {
        color: '#94a3b8',
    },
    notificationsContainer: {
        marginHorizontal: 20,
    },
    emptyContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    emptyIcon: {
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#64748b',
        textAlign: 'center',
    },
    notificationItem: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        marginBottom: 12,
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    unreadNotification: {
        borderLeftWidth: 3,
        borderLeftColor: '#4e83ff',
    },
    notificationIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    notificationContent: {
        flex: 1,
    },
    notificationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e293b',
        flex: 1,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4e83ff',
        marginLeft: 8,
    },
    notificationMessage: {
        fontSize: 14,
        color: '#64748b',
        marginBottom: 6,
        lineHeight: 20,
    },
    notificationTime: {
        fontSize: 12,
        color: '#94a3b8',
    },
});

export default NotificationsScreen;