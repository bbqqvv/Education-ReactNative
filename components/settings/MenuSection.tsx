import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MenuItem from "./MenuItem";

const MenuSection = ({ title, items }) => {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.menuTitle}>{title}</Text>
            <View style={styles.menuItemsContainer}>
                {items.map((item, index) => (
                    <MenuItem
                        key={item.text}
                        icon={item.icon}
                        text={item.text}
                        color={item.color}
                        onPress={item.onPress}
                        isLast={index === items.length - 1}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    menuTitle: {
        fontSize: 12,
        fontWeight: "500",
        color: "#8E8E93",
        paddingHorizontal: 20,
        paddingVertical: 12,
        letterSpacing: 0.5,
        fontFamily: "Inter-Medium",
        textTransform: "uppercase",
    },
    menuItemsContainer: {
        backgroundColor: "#FFF",
        borderRadius: 16,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 1,
    },
});

export default MenuSection;