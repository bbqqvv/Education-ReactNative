import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function ChatAi() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    // Gửi tin nhắn người dùng
    const newMessages = [...messages, `🧑‍💻: ${input}`];
    setMessages(newMessages);
    setInput('');

    // Giả lập phản hồi AI
    setTimeout(() => {
      setMessages((prev) => [...prev, `🤖: AI trả lời "${input}"`]);
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>💬 Chat với AI</Text>
      <ScrollView style={styles.chatBox}>
        {messages.map((msg, index) => (
          <Text key={index} style={styles.message}>{msg}</Text>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập câu hỏi của bạn..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  chatBox: { flex: 1, marginBottom: 10 },
  message: { marginVertical: 4, fontSize: 16 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#63BAD5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  sendText: { color: '#fff', fontWeight: 'bold' },
});
