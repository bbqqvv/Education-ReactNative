import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useChatAi } from '../hooks/useChatAI';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: string;
}

export default function ChatAi() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Use the custom hook
  const { chatWithAi, loading: isTyping, error, reset } = useChatAi();

  const getTimeString = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const userMessage = {
      text: input,
      isUser: true,
      timestamp: getTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      // Call the API using the custom hook
      const response = await chatWithAi({ message: input });

      const aiMessage = {
        text: response.reply, // Assuming the response has a 'message' property
        isUser: false,
        timestamp: getTimeString(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      // Handle error (the hook already sets the error state)
      const errorMessage = {
        text: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.',
        isUser: false,
        timestamp: getTimeString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (error) {
      // You can show an alert or handle the error in another way
      console.error('Chat error:', error);
    }
  }, [error]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Image
              source={require('@/assets/images/ai-avatar.png')}
              style={styles.headerAvatar}
            />
            <Text style={styles.headerText}>Trợ lý AI</Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {/* Chat Content */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatContainer}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="interactive"
        >
          {messages.length === 0 && (
            <View style={styles.welcomeContainer}>
              <Image
                source={require('@/assets/images/ai-welcome.png')}
                style={styles.welcomeImage}
              />
              <Text style={styles.welcomeTitle}>Xin chào! Tôi có thể giúp gì cho bạn?</Text>
              <Text style={styles.welcomeSubtitle}>Hỏi tôi bất cứ điều gì về Trường THPT Trần Cao Vân</Text>
            </View>
          )}

          {messages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.messageRow,
                msg.isUser ? styles.userRow : styles.aiRow,
              ]}
            >
              {!msg.isUser && (
                <Image
                  source={require('@/assets/images/ai-avatar.png')}
                  style={styles.avatar}
                />
              )}
              <View
                style={[
                  styles.messageBubble,
                  msg.isUser ? styles.userBubble : styles.aiBubble,
                ]}
              >
                <Text style={msg.isUser ? styles.userText : styles.aiText}>{msg.text}</Text>
                <Text style={[
                  styles.timestamp,
                  msg.isUser ? styles.userTimestamp : styles.aiTimestamp
                ]}>
                  {msg.timestamp}
                </Text>
              </View>
            </View>
          ))}

          {isTyping && (
            <View style={[styles.messageRow, styles.aiRow]}>
              <Image
                source={require('@/assets/images/ai-avatar.png')}
                style={styles.avatar}
              />
              <View style={[styles.messageBubble, styles.aiBubble]}>
                <View style={styles.typingIndicator}>
                  <View style={styles.typingDot} />
                  <View style={styles.typingDot} />
                  <View style={styles.typingDot} />
                </View>
              </View>
            </View>
          )}
        </ScrollView>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // Giảm offset
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.safeArea}>
              {/* Header + ScrollView */}
              <ScrollView
                ref={scrollViewRef}
                style={styles.chatContainer}
                contentContainerStyle={styles.messagesContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                {/* ...messages... */}
              </ScrollView>

              {/* Input */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập tin nhắn..."
                  placeholderTextColor="#9CA3AF"
                  value={input}
                  onChangeText={setInput}
                  onSubmitEditing={handleSend}
                  multiline
                  blurOnSubmit={false}
                />
                <TouchableOpacity
                  onPress={handleSend}
                  style={[
                    styles.sendButton,
                    !input.trim() && styles.disabledButton
                  ]}
                  disabled={!input.trim() || isTyping}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="send"
                    size={20}
                    color={input.trim() ? "#fff" : "#9CA3AF"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </Animated.View>
  );
}

// Styles remain the same as in your original code
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: 16,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 10,
  },
  backButton: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  messagesContainer: {
    paddingVertical: 16,
    paddingBottom: 80,
  },
  welcomeContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  welcomeImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  aiRow: {
    justifyContent: 'flex-start',
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 14,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  aiBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  userBubble: {
    backgroundColor: '#59CBE8',
    borderBottomRightRadius: 4,
  },
  aiText: {
    color: '#111827',
    fontSize: 16,
    lineHeight: 24,
  },
  userText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
  },
  timestamp: {
    fontSize: 11,
    marginTop: 6,
  },
  aiTimestamp: {
    color: '#9CA3AF',
    alignSelf: 'flex-start',
  },
  userTimestamp: {
    color: 'rgba(255,255,255,0.7)',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  input: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    marginRight: 12,
    maxHeight: 120,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#59CBE8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#E5E7EB',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9CA3AF',
    marginHorizontal: 2,
  },
});