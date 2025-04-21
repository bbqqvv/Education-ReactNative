import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Linking,
    ActivityIndicator,
    Platform,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface UserProfile {
    id: string;
    fullName: string;
    userCode: string;
    studentClass?: string;
    teachingClasses?: string[];
    role: string;
    profile?: {
        phoneNumber?: string;
        dateOfBirth?: string;
        gender?: string;
        address?: string;
    };
    email: string;
}

interface PersonalInfoScreenProps {
    user?: UserProfile;
    isLoading?: boolean;
    onEditPress?: () => void;
    onBackPress?: () => void;
}

const PersonalInfoScreen: React.FC<PersonalInfoScreenProps> = ({
    user,
    isLoading = false,
    onEditPress,
    onBackPress,
}) => {
    const safeUser: UserProfile = user || {
        id: '',
        fullName: 'Người dùng',
        userCode: '',
        role: 'ROLE_STUDENT',
        email: '',
        profile: {},
    };

    const handleCallPress = (phoneNumber?: string) => {
        if (phoneNumber) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            Linking.openURL(`tel:${phoneNumber}`);
        }
    };

    const handleEmailPress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        Linking.openURL(`mailto:${safeUser.email}`);
    };

    const handleEdit = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onEditPress?.();
    };

    const handleBack = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onBackPress?.();
    };

    const formatDate = (date?: string) => {
        return date ? format(new Date(date), "dd/MM/yyyy", { locale: vi }) : "Chưa cập nhật";
    };

    const getRoleLabel = () => {
        return safeUser.role === "ROLE_TEACHER" ? "Giáo viên" : "Học sinh";
    };

    const getClassLabel = () => {
        if (safeUser.role === "ROLE_TEACHER") {
            return safeUser.teachingClasses?.join(", ") || "Chưa có lớp";
        }
        return safeUser.studentClass || "Chưa có lớp";
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4e83ff" />
            </View>
        );
    }

    return (
        <LinearGradient colors={["#f0f4ff", "#e6f0ff"]} style={styles.container}>
            {/* Header with shadow */}
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={handleBack}
                        style={styles.backButton}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="arrow-back" size={24} color="#1e293b" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Hồ sơ cá nhân</Text>

                    <TouchableOpacity
                        onPress={handleEdit}
                        style={styles.editButton}
                        activeOpacity={0.7}
                    >
                        <Feather name="edit-3" size={18} color="#4e83ff" />
                        <Text style={styles.editButtonText}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Avatar and Basic Info */}
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarWrapper}>
                        <Image
                            source={{
                                uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    safeUser.fullName
                                )}&background=4e83ff&color=fff&size=128`,
                            }}
                            style={styles.avatar}
                        />
                        <View style={styles.avatarBadge}>
                            <MaterialCommunityIcons
                                name={safeUser.role === "ROLE_TEACHER" ? "teach" : "school"}
                                size={16}
                                color="#fff"
                            />
                        </View>
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
                            {safeUser.fullName}
                        </Text>
                        <Text style={styles.userCode}>{safeUser.userCode || "Chưa có mã"}</Text>

                        <View style={styles.tagsContainer}>
                            <View style={[styles.tag, styles.roleTag]}>
                                <Text style={styles.tagText}>{getRoleLabel()}</Text>
                            </View>
                            <View style={[styles.tag, styles.classTag]}>
                                <Text style={styles.tagText}>{getClassLabel()}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Personal Info Section */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <MaterialCommunityIcons
                            name="card-account-details"
                            size={20}
                            color="#4e83ff"
                        />
                        <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
                    </View>

                    <InfoRow
                        icon="account"
                        label="Họ và tên"
                        value={safeUser.fullName}
                    />

                    <InfoRow
                        icon="calendar"
                        label="Ngày sinh"
                        value={formatDate(safeUser.profile?.dateOfBirth)}
                    />

                    <InfoRow
                        icon="gender-male-female"
                        label="Giới tính"
                        value={safeUser.profile?.gender || "Chưa cập nhật"}
                    />
                </View>

                {/* Contact Info Section */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <MaterialCommunityIcons name="contacts" size={20} color="#4e83ff" />
                        <Text style={styles.sectionTitle}>Liên hệ</Text>
                    </View>

                    <TouchableOpacity
                        onPress={handleEmailPress}
                        activeOpacity={0.7}
                    >
                        <InfoRow
                            icon="email"
                            label="Email"
                            value={safeUser.email}
                            isPressable
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleCallPress(safeUser.profile?.phoneNumber)}
                        activeOpacity={0.7}
                    >
                        <InfoRow
                            icon="phone"
                            label="Điện thoại"
                            value={safeUser.profile?.phoneNumber || "Chưa cập nhật"}
                            isPressable={!!safeUser.profile?.phoneNumber}
                        />
                    </TouchableOpacity>

                    <InfoRow
                        icon="map-marker"
                        label="Địa chỉ"
                        value={safeUser.profile?.address || "Chưa cập nhật"}
                    />
                </View>

                {/* Class Information */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <MaterialCommunityIcons
                            name={safeUser.role === "ROLE_TEACHER" ? "teach" : "school"}
                            size={20}
                            color="#4e83ff"
                        />
                        <Text style={styles.sectionTitle}>
                            {safeUser.role === "ROLE_TEACHER" ? "Lớp giảng dạy" : "Lớp học"}
                        </Text>
                    </View>

                    <InfoRow
                        icon="account-group"
                        label={
                            safeUser.role === "ROLE_TEACHER" ? "Các lớp phụ trách" : "Lớp hiện tại"
                        }
                        value={getClassLabel()}
                    />
                </View>

                {/* Bottom padding */}
                <View style={{ height: 30 }} />
            </ScrollView>
        </LinearGradient>
    );
};

const InfoRow: React.FC<{
    icon: string;
    label: string;
    value: string;
    isPressable?: boolean;
}> = ({ icon, label, value, isPressable = false }) => (
    <View style={styles.infoRow}>
        <View style={styles.infoIcon}>
            <MaterialCommunityIcons
                name={icon}
                size={22}
                color={isPressable ? "#4e83ff" : "#64748b"}
            />
        </View>
        <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text
                style={[
                    styles.infoValue,
                    isPressable && styles.pressableText,
                    !value && styles.emptyValue
                ]}
                numberOfLines={2}
                ellipsizeMode="tail"
            >
                {value || "Chưa cập nhật"}
            </Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8fafc",
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    headerContainer: {
        backgroundColor: "#f0f4ff",
        paddingBottom: 8,
        ...Platform.select({
            ios: {
                shadowColor: "#64748b",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: "#cbd5e1",
            },
        }),
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#1e293b",
        fontFamily: "sans-serif-medium",
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.7)',
    },
    editButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: "rgba(78, 131, 255, 0.1)",
        borderRadius: 12,
    },
    editButtonText: {
        color: "#4e83ff",
        fontWeight: "600",
        fontSize: 15,
    },
    avatarContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 24,
        marginBottom: 8,
    },
    avatarWrapper: {
        position: "relative",
        shadowColor: "#4e83ff",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: "#fff",
        backgroundColor: "#f1f5f9",
    },
    avatarBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#4e83ff',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    nameContainer: {
        marginLeft: 20,
        flex: 1,
    },
    name: {
        fontSize: 22,
        fontWeight: "600",
        color: "#1e293b",
        marginBottom: 4,
    },
    userCode: {
        fontSize: 15,
        color: "#64748b",
        marginBottom: 12,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    tag: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    tagText: {
        fontWeight: "600",
        fontSize: 13,
    },
    roleTag: {
        backgroundColor: "rgba(120, 40, 200, 0.1)",
    },
    classTag: {
        backgroundColor: "rgba(78, 131, 255, 0.1)",
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        marginHorizontal: 20,
        marginBottom: 16,
        padding: 20,
        shadowColor: "#64748b",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#f1f5f9",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1e293b",
        marginLeft: 10,
    },
    infoRow: {
        flexDirection: "row",
        paddingVertical: 12,
    },
    infoIcon: {
        width: 40,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingTop: 2,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 14,
        color: "#94a3b8",
        marginBottom: 4,
        fontWeight: "500",
    },
    infoValue: {
        fontSize: 16,
        color: "#1e293b",
        fontWeight: "500",
        lineHeight: 22,
    },
    pressableText: {
        color: "#4e83ff",
    },
    emptyValue: {
        color: "#94a3b8",
        fontStyle: 'italic',
    },
});

export default PersonalInfoScreen;