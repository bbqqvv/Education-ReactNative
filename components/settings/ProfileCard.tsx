import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const ProfileCard = ({ user }) => {
    return (
        <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
                <Image
                    source={user.avatar || require("../../assets/images/avatar.png")}
                    style={styles.avatar}
                />
                <TouchableOpacity style={styles.editIcon}>
                    <Feather name="edit-2" size={16} color="#FFF" />
                </TouchableOpacity>
            </View>

            <Text style={styles.name}>{user.name || "Người dùng"}</Text>
            <Text style={styles.email}>{user.email || "email@example.com"}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    profileCard: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        padding: 24,
        margin: 16,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    avatarContainer: {
        position: "relative",
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#5E8BFF",
    },
    editIcon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#5E8BFF",
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#FFF",
    },
    name: {
        fontSize: 20,
        fontWeight: "600",
        color: "#1A1A1A",
        marginBottom: 4,
        fontFamily: "Inter-SemiBold",
    },
    email: {
        fontSize: 14,
        color: "#8E8E93",
        marginBottom: 20,
        fontFamily: "Inter-Regular",
    },
    profileStats: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 8,
        paddingHorizontal: 20,
    },
    statItem: {
        alignItems: "center",
        flex: 1,
    },
    statItemMiddle: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: "#F0F0F0",
    },
    statValue: {
        fontSize: 18,
        fontWeight: "600",
        color: "#5E8BFF",
        fontFamily: "Inter-SemiBold",
    },
    statLabel: {
        fontSize: 12,
        color: "#8E8E93",
        marginTop: 4,
        fontFamily: "Inter-Regular",
    },
});

export default ProfileCard;