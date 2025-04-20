// Quote.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useQuote } from "../../app/hooks/useQuote";

const Quote = () => {
  const { quote, loading, error, fetchRandomQuote } = useQuote();
  // console.log("Quote component rendered", quote?.content, quote?.author);

  useEffect(() => {
    fetchRandomQuote();
  }, [fetchRandomQuote]);

  return (
    <View style={styles.container}>
      <View style={styles.line} />

      <View style={styles.content}>
        {error ? (
          <Text style={[styles.quote, { color: "red" }]}>{error}</Text>
        ) : loading ? (
          <Text style={styles.quote}>Đang tải trích dẫn...</Text>
        ) : quote ? (
          <>
            <Text style={styles.quote}>"{quote.content}"</Text>
            <Text style={styles.author}>- {quote.author}</Text>
          </>
        ) : (
          <Text style={styles.quote}>Không có trích dẫn</Text>
        )}
      </View>

      <View style={styles.reloadContainer}>
        {loading ? (
          <ActivityIndicator size="small" color="#63BAD5" />
        ) : (
          <TouchableOpacity onPress={fetchRandomQuote}>
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
