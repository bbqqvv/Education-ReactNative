import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Platform,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type ViolationLevel = 'LIGHT' | 'MEDIUM' | 'SEVERE';

type Violation = {
    id: string;
    userCode: string;
    violationCode: string;
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
            LIGHT: 'Nhẹ',
            MEDIUM: 'Trung bình',
            SEVERE: 'Nặng',
        };
        return levelMap[level] || level;
    };

    const getLevelColor = (level: ViolationLevel): string => {
        const colorMap: Record<ViolationLevel, string> = {
            LIGHT: '#4CAF50',
            MEDIUM: '#FFA000',
            SEVERE: '#F44336',
        };
        return colorMap[level] || '#9E9E9E';
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
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
                        <Text style={styles.infoLabel}>Mã sinh viên:</Text>
                        <Text style={styles.infoValue}>{violation.userCode}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Họ và tên:</Text>
                        <Text style={styles.infoValue}>{violation.fullName}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Vai trò:</Text>
                        <Text style={styles.infoValue}>{violation.role === 'STUDENT' ? 'Học sinh' : 'Giáo viên'}</Text>
                    </View>
                </View>

                {/* Violation Info */}
                <View style={styles.detailSection}>
                    <Text style={styles.sectionTitle}>Thông tin vi phạm</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Mã vi phạm:</Text>
                        <Text style={styles.infoValue}>{violation.violationCode}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Mức độ:</Text>
                        <View style={[styles.levelBadge, { backgroundColor: getLevelColor(violation.level) }]}>
                            <Text style={styles.levelText}>{getViolationLevelText(violation.level)}</Text>
                        </View>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Ngày vi phạm:</Text>
                        <Text style={styles.infoValue}>{formatDate(violation.createdAt)}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Người ghi nhận:</Text>
                        <Text style={styles.infoValue}>{violation.createdBy}</Text>
                    </View>
                </View>

                {/* Description */}
                <View style={styles.detailSection}>
                    <Text style={styles.sectionTitle}>Mô tả chi tiết</Text>
                    <Text style={styles.descriptionText}>{violation.description}</Text>
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
    detailContent: { padding: 16 },
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
        marginBottom: 12,
    },
    infoLabel: { fontSize: 14, color: '#616161' },
    infoValue: { fontSize: 14, fontWeight: '500', color: '#212121' },
    levelBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    levelText: { fontSize: 12, fontWeight: '600', color: 'white' },
    descriptionText: { fontSize: 14, lineHeight: 20, color: '#424242' },
});

export default ViolationDetail;
