import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HelpCenterScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Trung tâm trợ giúp</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    text: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1E293B",
    },
});

export default HelpCenterScreen;