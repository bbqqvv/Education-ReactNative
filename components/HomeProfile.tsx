import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";

const HomeProfile = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) {
        return null; // Hoặc loader
    }

    return (
        <View style={styles.container}>
            {/* Avatar */}
            <TouchableOpacity>
                <Image
                    source={require("../assets/images/avatar.png")}
                    style={styles.avatar}
                />
            </TouchableOpacity>

            {/* User Info */}
            <View>
                <Text style={styles.name}>{user.fullName}</Text>
                <Text style={styles.school}>{user.studentClass} - THPT TCV</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    avatar: {
        width: 35,
        height: 35,
        borderRadius: 100,
    },
    name: {
        fontStyle: "italic",
        fontWeight: "bold",
        color: "#4B5563",
    },
    school: {
        fontSize: 10,
        color: "#4B5563",
    },
});

export default HomeProfile;
