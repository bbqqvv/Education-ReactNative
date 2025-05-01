import React, { useEffect, useMemo, useCallback } from "react";
import { useUser } from "../hooks/useUser";
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
import { UserResponse } from "../api/user/user.type";
import { useRouter } from "expo-router";

const PersonalInfoScreen: React.FC = () => {
    const { currentUser, loading, refresh } = useUser();
    const router = useRouter();

    useEffect(() => {
        refresh();
    }, [refresh]);

    const handleEditPress = useCallback(() => {
        if (currentUser) {
            router.push({
                pathname: "/(stack)/edit-profile-screen",
                params: { user: JSON.stringify(currentUser) },
            });
        }
    }, [router, currentUser]);

    const handleBackPress = useCallback(() => {
        console.log("Back button pressed");
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4e83ff" />
            </View>
        );
    }

    return (
        <PersonalInfoScreenContent
            user={currentUser}
            onEditPress={handleEditPress}
            onBackPress={handleBackPress}
        />
    );
};

const PersonalInfoScreenContent: React.FC<{
    user: UserResponse | null;
    onEditPress: () => void;
    onBackPress: () => void;
}> = ({ user, onEditPress, onBackPress }) => {
    const safeUser = useMemo(() => {
        return (
            user || {
                id: "",
                fullName: "Người dùng",
                userCode: "",
                role: "ROLE_STUDENT",
                email: "",
                profile: {
                    dateOfBirth: undefined,
                    gender: undefined,
                    phoneNumber: undefined,
                    address: undefined,
                    fatherName: undefined,
                    motherName: undefined,
                    fatherPhoneNumber: undefined,
                    motherPhoneNumber: undefined,
                },
                teachingClasses: [],
                studentClass: "Chưa có lớp",
            }
        );
    }, [user]);

    const formatDate = useCallback((date?: string) => {
        return date ? format(new Date(date), "dd/MM/yyyy", { locale: vi }) : "Chưa cập nhật";
    }, []);

    return (
        <LinearGradient colors={["#f0f4ff", "#e6f0ff"]} style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={onBackPress}
                        style={styles.backButton}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="arrow-back" size={24} color="#1e293b" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Hồ sơ cá nhân</Text>

                    <TouchableOpacity
                        onPress={onEditPress}
                        style={styles.editButton}
                        activeOpacity={0.7}
                    >
                        <Feather name="edit-3" size={18} color="#4e83ff" />
                        <Text style={styles.editButtonText}>Chỉnh sửa</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Nội dung */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Avatar và thông tin cơ bản */}
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
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>{safeUser.fullName}</Text>
                        <Text style={styles.userCode}>{safeUser.userCode || "Chưa có mã"}</Text>
                    </View>
                </View>

                {/* Thông tin cá nhân */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <MaterialCommunityIcons
                            name="card-account-details"
                            size={20}
                            color="#4e83ff"
                        />
                        <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
                    </View>
                    <InfoRow icon="account" label="Họ và tên" value={safeUser.fullName} />
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
                    <InfoRow
                        icon="home"
                        label="Địa chỉ"
                        value={safeUser.profile?.address || "Chưa cập nhật"}
                    />
                </View>

                {/* Thông tin liên hệ */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <MaterialCommunityIcons name="contacts" size={20} color="#4e83ff" />
                        <Text style={styles.sectionTitle}>Liên hệ</Text>
                    </View>
                    <InfoRow
                        icon="phone"
                        label="Số điện thoại"
                        value={safeUser.profile?.phoneNumber || "Chưa cập nhật"}
                    />
                    <InfoRow
                        icon="email"
                        label="Email"
                        value={safeUser.email || "Chưa cập nhật"}
                    />
                </View>

                {/* Thông tin gia đình */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <MaterialCommunityIcons name="account-group" size={20} color="#4e83ff" />
                        <Text style={styles.sectionTitle}>Thông tin gia đình</Text>
                    </View>
                    <InfoRow
                        icon="account"
                        label="Tên cha"
                        value={safeUser.profile?.fatherName || "Chưa cập nhật"}
                    />
                    <InfoRow
                        icon="phone"
                        label="Số điện thoại cha"
                        value={safeUser.profile?.fatherPhoneNumber || "Chưa cập nhật"}
                    />
                    <InfoRow
                        icon="account"
                        label="Tên mẹ"
                        value={safeUser.profile?.motherName || "Chưa cập nhật"}
                    />
                    <InfoRow
                        icon="phone"
                        label="Số điện thoại mẹ"
                        value={safeUser.profile?.motherPhoneNumber || "Chưa cập nhật"}
                    />
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

const InfoRow: React.FC<{
    icon: string;
    label: string;
    value: string;
}> = ({ icon, label, value }) => (
    <View style={styles.infoRow}>
        <View style={styles.infoIcon}>
            <MaterialCommunityIcons name={icon} size={22} color="#64748b" />
        </View>
        <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
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