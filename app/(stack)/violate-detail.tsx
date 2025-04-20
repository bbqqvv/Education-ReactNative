import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
    SafeAreaView,
    Platform,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type ViolationLevel = 'LOW' | 'MEDIUM' | 'HIGH';

type Violation = {
    id: string;
    studentCode: string;
    fullName: string;
    role: string;
    description: string;
    level: ViolationLevel;
    createdAt: string;
    createdBy: string;
};

type Props = {
    violation: Violation;
    onBack: () => void;
};

const ViolationDetail: React.FC<Props> = ({ violation, onBack }) => {
    const getViolationLevelText = (level: ViolationLevel): string => {
        const levelMap: Record<ViolationLevel, string> = {
            LOW: 'Nhẹ',
            MEDIUM: 'Trung bình',
            HIGH: 'Nặng'
        };
        return levelMap[level] || level;
    };

    const getLevelColor = (level: ViolationLevel): string => {
        const colorMap: Record<ViolationLevel, string> = {
            LOW: '#4CAF50',
            MEDIUM: '#FFA000',
            HIGH: '#F44336'
        };
        return colorMap[level] || '#9E9E9E';
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${date.getFullYear()} ${hours}:${minutes}`;
    };

    return (
        <View style={styles.detailContainer}>
            <LinearGradient
                colors={['#4A90E2', '#59CBE8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.detailHeader}
            >
                <TouchableOpacity onPress={onBack} style={styles.backButton} activeOpacity={0.7}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.detailHeaderTitle}>Chi tiết vi phạm</Text>
                <View style={{ width: 24 }} />
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.detailContent}>
                {/* Student Info */}
                <View style={styles.detailSection}>
                    <Text style={styles.sectionTitle}>Thông tin học sinh</Text>
                    <View style={styles.infoRow}>
                        <View style={styles.infoLabelContainer}>
                            <Ionicons name="id-card" size={16} color="#4A90E2" />
                            <Text style={styles.infoLabel}>Mã sinh viên:</Text>
                        </View>
                        <Text style={styles.infoValue}>{violation.studentCode}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.infoLabelContainer}>
                            <Ionicons name="person" size={16} color="#4A90E2" />
                            <Text style={styles.infoLabel}>Họ và tên:</Text>
                        </View>
                        <Text style={styles.infoValue}>{violation.fullName}</Text>
                    </View>
                </View>

                {/* Violation Info */}
                <View style={styles.detailSection}>
                    <Text style={styles.sectionTitle}>Thông tin vi phạm</Text>
                    <View style={styles.infoRow}>
                        <View style={styles.infoLabelContainer}>
                            <Ionicons name="warning" size={16} color="#4A90E2" />
                            <Text style={styles.infoLabel}>Mức độ:</Text>
                        </View>
                        <View style={[styles.levelBadge, { backgroundColor: getLevelColor(violation.level) }]}>
                            <Text style={styles.levelText}>{getViolationLevelText(violation.level)}</Text>
                        </View>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.infoLabelContainer}>
                            <Ionicons name="calendar" size={16} color="#4A90E2" />
                            <Text style={styles.infoLabel}>Ngày vi phạm:</Text>
                        </View>
                        <Text style={styles.infoValue}>{formatDate(violation.createdAt)}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <View style={styles.infoLabelContainer}>
                            <Ionicons name="person-circle" size={16} color="#4A90E2" />
                            <Text style={styles.infoLabel}>Người ghi nhận:</Text>
                        </View>
                        <Text style={styles.infoValue}>{violation.createdBy}</Text>
                    </View>
                </View>

                {/* Description */}
                <View style={styles.detailSection}>
                    <Text style={styles.sectionTitle}>Mô tả chi tiết</Text>
                    <View style={styles.descriptionBox}>
                        <Text style={styles.descriptionText}>{violation.description}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    detailContainer: { flex: 1, backgroundColor: '#FFFFFF' },
    detailHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 16 : 50,
        paddingBottom: 16,
    },
    detailHeaderTitle: { fontSize: 18, fontWeight: '600', color: 'white' },
    backButton: { padding: 4 },
    detailContent: { padding: 16, paddingBottom: 40 },
    detailSection: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    sectionTitle: { fontSize: 16, fontWeight: '600', color: '#4A90E2', marginBottom: 12 },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    infoLabelContainer: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    infoLabel: { fontSize: 14, color: '#616161', marginLeft: 8 },
    infoValue: { fontSize: 14, fontWeight: '500', color: '#212121', textAlign: 'right', flex: 1 },
    levelBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginLeft: 8,
    },
    levelText: { fontSize: 12, fontWeight: '600', color: 'white' },
    descriptionBox: { backgroundColor: '#FAFAFA', borderRadius: 8, padding: 12 },
    descriptionText: { fontSize: 14, lineHeight: 20, color: '#424242' },
    footer: {
        alignItems: 'center',
        marginTop: 24,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },
    footerImage: { width: 80, height: 80, marginBottom: 8 },
    footerText: { fontSize: 12, color: '#9E9E9E', textAlign: 'center' },
});

export default ViolationDetail;
