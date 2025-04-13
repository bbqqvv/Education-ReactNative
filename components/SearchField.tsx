import React, { useState, useCallback, useMemo } from "react";
import {
  TextInput,
  TouchableOpacity,
  Animated,
  View,
  Modal,
  Easing,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SearchModal from "./SearchModal"; // Import SearchModal

const SearchField = () => {
  const [query, setQuery] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const scaleAnim = useState(new Animated.Value(0))[0];
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Dummy data
  const dummyData = useMemo(
    () => Array(10).fill(null).map((_, i) => `Kết quả ${i + 1}`),
    []
  );

  // Filtered data
  const filteredData = useMemo(
    () =>
      query
        ? dummyData.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        )
        : [],
    [query, dummyData]
  );

  // Show modal with animation
  const showModal = useCallback(() => {
    setModalVisible(true);
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, fadeAnim]);

  // Hide modal with animation
  const hideModal = useCallback(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => setModalVisible(false));
  }, [scaleAnim, fadeAnim]);

  return (
    <View>
      {/* Search Button */}
      <TouchableOpacity onPress={showModal} style={styles.searchButton}>
        <Ionicons name="search" size={20} color="#63BAD5" />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm"
          placeholderTextColor="#999"
          editable={false}
        />
      </TouchableOpacity>

      {/* Modal */}
      <Modal transparent visible={isModalVisible} animationType="none">
        {/* Overlay */}
        <Animated.View
          style={[
            {
              opacity: fadeAnim,
            },
          ]}
        />

        {/* Modal Content */}
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <SearchModal
            query={query}
            setQuery={setQuery}
            filteredData={filteredData}
            hideModal={hideModal}
          />
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  searchButton: {
    flexDirection: "row",
    alignItems: "center",
    width: 110, 
    borderColor: "#E5E5E5",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: 4,
    marginBottom: 4,
    fontSize: 12,
    color: "#333333",
  },

  modalContent: {
    position: "absolute",
    top: "33%",
    left: 10,
    right: 10,
    elevation: 5,
  },
});

export default SearchField;
