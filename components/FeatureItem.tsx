import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";

const FeatureItem = ({ icon, label }) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.borderFeatures}>
          <Image source={icon} style={styles.icon} resizeMode="contain" />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 12,
  },
  borderFeatures: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    width: 75,
    height: 75,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  icon: {
    width: 45,
    height: 45,
  },
  label: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 4,
    fontWeight: "600", 
  },
});

export default FeatureItem;
