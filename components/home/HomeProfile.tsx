import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";

const HomeProfile = () => {
    return (
        <View style={styles.container}>
            {/* Avatar */}
            <View>
                <TouchableOpacity>
                    <Image
                        source={require("@/assets/images/avatar.png")}
                        style={styles.avatar}
                    />
                </TouchableOpacity>
            </View>

            {/* User Info */}
            <View>
                <Text style={styles.name}>Van Quoc Bui</Text>
                <Text style={styles.school}>Trường THPT Trần Cao Vân</Text>
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
