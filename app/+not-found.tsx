import { Link, Stack } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text style={styles.title}>Oops!</Text>
        <Text style={styles.subtitle}>This screen doesn't exist.</Text>
        <TouchableOpacity onPress={() => {}}>
          <Link href="/" asChild>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Go to Home Screen</Text>
            </View>
          </Link>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#212121",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#757575",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#00A8FF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Hiệu ứng bóng
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
