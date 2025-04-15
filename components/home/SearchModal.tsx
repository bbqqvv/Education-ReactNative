import React from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchModal = ({ query, setQuery, filteredData, hideModal }) => {
  return (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={hideModal}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Nhập nội dung tìm kiếm..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
          autoFocus
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => setQuery("")}>
            <Ionicons name="close" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Search Results */}
      <View style={styles.resultsContainer}>
        {filteredData.length > 0 ? (
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.resultItem}>
                <Text style={styles.resultText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.noResultsText}>
            {query ? "Không tìm thấy kết quả phù hợp." : "Nhập để tìm kiếm..."}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  input: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: "#333333",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "white",
  },
  resultsContainer: {
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  resultItem: {
    paddingVertical: 8,
  },
  resultText: {
    fontSize: 14,
    color: "#333333",
  },
  noResultsText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 16,
  },
});

export default SearchModal;
