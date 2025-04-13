import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";

interface FeatureItemProps {
  icon: any; // Hoặc sử dụng `ImageSourcePropType` từ react-native
  label: string;
  onPress: (label: string) => void;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, label, onPress }) => {
  const handlePress = () => {
    onPress(label); // Truyền label về component cha khi nhấn
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.touchable}>
      <View style={styles.container}>
        <View style={styles.borderFeatures}>
          <Image 
            source={icon} 
            style={styles.icon} 
            resizeMode="contain" 
            accessibilityLabel={label}
          />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    margin: 8,
    width: '22%', // Hiển thị đúng 4 cột
    alignItems: 'center',
  },
  container: {
    alignItems: "center",
    width: '100%',
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
    elevation: 2, // Shadow cho Android
    shadowColor: '#000', // Shadow cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    width: 45,
    height: 45,
    tintColor: '#59CBE8', // Màu icon
  },
  label: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 8,
    fontWeight: "600",
    color: '#333',
  },
});

export default FeatureItem;