import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const Quote = ({ quote, author, onReload }) => {
  const [loading, setLoading] = useState(false);

  // Function to handle reloading the quote
  const handleReload = async () => {
    setLoading(true);
    await onReload();
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Đường kẻ bên trái */}
      <View style={styles.line} />

      {/* Nội dung trích dẫn */}
      <View style={styles.content}>
        <Text style={styles.quote}>"{quote}"</Text>
        <Text style={styles.author}>- {author}</Text>
      </View>

      {/* Nút reload */}
      <View style={styles.reloadContainer}>
        {loading ? (
          <ActivityIndicator size="small" color="#63BAD5" />
        ) : (
          <TouchableOpacity onPress={handleReload}>
            <Ionicons name="reload-outline" size={24} color="#63BAD5" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#EBF4F6", 
    padding: 20,
  },
  line: {
    width: 4,
    height: "100%",
    backgroundColor: "#63BAD5",
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  quote: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
  },
  author: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    color: "#6B7280",
  },
  reloadContainer: {
    marginLeft: 16,
  },
});

export default Quote;
