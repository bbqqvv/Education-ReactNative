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
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useChatAi } from '../hooks/useChatAI';

interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: string;
}

const { width } = Dimensions.get('window');

export default function ChatAi() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [inputHeight, setInputHeight] = useState(48);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);

  const { chatWithAi, loading: isTyping, error } = useChatAi();

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
    if (!input.trim() || isTyping) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const userMessage = {
      text: input,
      isUser: true,
      timestamp: getTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setInputHeight(48); // Reset input height after send
    Keyboard.dismiss();

    try {
      const response = await chatWithAi({ message: input });
      const aiMessage = {
        text: response.reply,
        isUser: false,
        timestamp: getTimeString(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = {
        text: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.',
        isUser: false,
        timestamp: getTimeString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleInputSizeChange = (event: any) => {
    const { contentSize } = event.nativeEvent;
    setInputHeight(Math.min(Math.max(contentSize.height, 48), 120));
  };

  useEffect(() => {
    if (messages.length > 0 && scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, isTyping]);

  const clearChat = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setMessages([]);
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            source={require('@/assets/images/ai-avatar.png')}
            style={styles.headerAvatar}
          />
          <Text style={styles.headerText}>Trợ lý AI</Text>
        </View>
        <TouchableOpacity
          onPress={clearChat}
          style={styles.clearButton}
          disabled={messages.length === 0}
        >
          <MaterialIcons
            name="delete-outline"
            size={24}
            color={messages.length === 0 ? '#CBD5E0' : '#64748B'}
          />
        </TouchableOpacity>
      </View>
      {/* Chat Content */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        style={styles.keyboardAvoidView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <ScrollView
              ref={scrollViewRef}
              style={styles.chatContainer}
              contentContainerStyle={styles.messagesContainer}
              keyboardDismissMode="interactive"
              showsVerticalScrollIndicator={false}
            >
              {messages.length === 0 ? (
                <View style={styles.welcomeContainer}>
                  <Image
                    source={require('@/assets/images/ai-welcome.png')}
                    style={styles.welcomeImage}
                  />
                  <Text style={styles.welcomeTitle}>Xin chào! Tôi có thể giúp gì cho bạn?</Text>
                  <Text style={styles.welcomeSubtitle}>
                    Hỏi tôi bất cứ điều gì về trường học, lịch trình hoặc thông tin khác
                  </Text>
                  <View style={styles.suggestionContainer}>
                    <Text style={styles.suggestionTitle}>Gợi ý:</Text>
                    <View style={styles.suggestionChips}>
                      <TouchableOpacity
                        style={styles.chip}
                        onPress={() => {
                          setInput('Lịch thi học kỳ này như thế nào?');
                          inputRef.current?.focus();
                        }}
                      >
                        <Text style={styles.chipText}>Lịch thi học kỳ này?</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.chip}
                        onPress={() => {
                          setInput('Thời khóa biểu của tôi?');
                          inputRef.current?.focus();
                        }}
                      >
                        <Text style={styles.chipText}>Thời khóa biểu của tôi?</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ) : (
                messages.map((msg, index) => (
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
                      <Text style={msg.isUser ? styles.userText : styles.aiText}>
                        {msg.text}
                      </Text>
                      <View style={styles.messageFooter}>
                        <Text
                          style={[
                            styles.timestamp,
                            msg.isUser ? styles.userTimestamp : styles.aiTimestamp,
                          ]}
                        >
                          {msg.timestamp}
                        </Text>
                        {msg.isUser && (
                          <Ionicons
                            name="checkmark-done"
                            size={14}
                            color="#4FD1C5"
                            style={styles.statusIcon}
                          />
                        )}
                      </View>
                    </View>
                  </View>
                ))
              )}

              {isTyping && (
                <View style={[styles.messageRow, styles.aiRow]}>
                  <Image
                    source={require('@/assets/images/ai-avatar.png')}
                    style={styles.avatar}
                  />
                  <View style={[styles.messageBubble, styles.aiBubble]}>
                    <View style={styles.typingContainer}>
                      <ActivityIndicator size="small" color="#64748B" />
                      <Text style={styles.typingText}>Đang trả lời...</Text>
                    </View>
                  </View>
                </View>
              )}
            </ScrollView>

            {/* Input Area */}
            <View style={styles.inputContainer}>
              <TextInput
                ref={inputRef}
                style={[styles.input, { height: inputHeight }]}
                placeholder="Nhập tin nhắn..."
                placeholderTextColor="#94A3B8"
                value={input}
                onChangeText={setInput}
                onSubmitEditing={handleSend}
                multiline
                blurOnSubmit={false}
                onContentSizeChange={handleInputSizeChange}
                returnKeyType="send"
                enablesReturnKeyAutomatically
              />
              <TouchableOpacity
                onPress={handleSend}
                style={[
                  styles.sendButton,
                  (!input.trim() || isTyping) && styles.disabledButton,
                ]}
                disabled={!input.trim() || isTyping}
                activeOpacity={0.8}
              >
                {isTyping ? (
                  <ActivityIndicator size="small" color="#94A3B8" />
                ) : (
                  <Ionicons
                    name="send"
                    size={20}
                    color={input.trim() ? '#FFFFFF' : '#94A3B8'}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  keyboardAvoidView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    zIndex: 10,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  clearButton: {
    padding: 6,
    borderRadius: 12,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#F8FAFC',
  },
  messagesContainer: {
    paddingTop: 16,
    paddingBottom: 100,
  },
  welcomeContainer: {
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  welcomeImage: {
    width: 140,
    height: 140,
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  suggestionContainer: {
    width: '100%',
    marginTop: 16,
  },
  suggestionTitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
    fontWeight: '500',
  },
  suggestionChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#EDF2F7',
    borderRadius: 20,
  },
  chipText: {
    fontSize: 14,
    color: '#4A5568',
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  aiRow: {
    justifyContent: 'flex-start',
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: width * 0.8,
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  aiBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  userBubble: {
    backgroundColor: '#3B82F6',
    borderBottomRightRadius: 4,
  },
  aiText: {
    color: '#1E293B',
    fontSize: 16,
    lineHeight: 24,
  },
  userText: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 6,
  },
  timestamp: {
    fontSize: 12,
    marginRight: 4,
  },
  aiTimestamp: {
    color: '#94A3B8',
  },
  userTimestamp: {
    color: 'rgba(255,255,255,0.7)',
  },
  statusIcon: {
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1E293B',
    marginRight: 12,
    maxHeight: 120,
    textAlignVertical: 'center',
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#E2E8F0',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  typingText: {
    marginLeft: 8,
    color: '#64748B',
    fontSize: 14,
  },
});