import { GestureResponderEvent, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const NotificationButton = ({ notificationCount = 10 }) => {
    function handleOpenNotification(event: GestureResponderEvent): void {
        console.log("Notification button pressed");
    }

    return (
        <View style={styles.container}>
            {/* Notification Icon */}
            <TouchableOpacity onPress={handleOpenNotification} style={styles.iconButton}>
                <Ionicons name="notifications-outline" size={20} color="#63BAD5" />
            </TouchableOpacity>

            {/* Notification Badge */}
            {notificationCount > 0 && (
                <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{notificationCount}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: 40,
        height: 40, 
        borderRadius: 20, 
        borderWidth: 1,
        borderColor: "#E5E5E5",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    iconButton: {
        justifyContent: "center",
        alignItems: "center",
    },
    badgeContainer: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "#EF4444", // Red-500
        borderRadius: 50, // Full rounded
        width: 16, // w-4
        height: 16, // h-4
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        color: "#fff", // White text
        fontSize: 10, // text-xs
        fontWeight: "600", // font-semibold
    },
});

export default NotificationButton;
