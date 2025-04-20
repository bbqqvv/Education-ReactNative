import React, { useRef, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  Image,
  Alert,
} from 'react-native';
import { FontAwesome, Feather, Ionicons } from '@expo/vector-icons';

const MessageDetailScreen = () => {
  const { id, title } = useLocalSearchParams();
  const router = useRouter();
  const scrollRef = useRef(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Đây là file tài liệu của lớp sinh học hôm nay',
      type: 'text',
      sender: 'other',
      senderName: 'Maya',
      senderAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      time: '10:30 AM'
    },
    {
      id: '2',
      text: 'Introduction to force',
      type: 'file',
      fileType: 'pdf',
      sender: 'other',
      senderName: 'Maya',
      senderAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      time: '10:32 AM'
    },
    {
      id: '3',
      text: 'Work and energy',
      type: 'file',
      fileType: 'doc',
      sender: 'other',
      senderName: 'Maya',
      senderAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      time: '10:33 AM'
    },
    {
      id: '4',
      text: 'Cảm ơn Maya rất nhiều.😍😍 Có ai vui lòng chia sẻ ghi chú lớp học của bạn về bài giảng này. 🙏',
      type: 'text',
      sender: 'me',
      time: '10:35 AM'
    },
    {
      id: '5',
      text: 'Tôi đã không viết ghi chú của bài giảng này. Nhưng tôi đã làm bài thuyết trình powerpoint về lực, năng lượng và công.',
      type: 'text',
      sender: 'other',
      senderName: 'Vishal',
      senderAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      time: '10:38 AM'
    },
    {
      id: '6',
      text: 'Force, Energy & Work',
      type: 'file',
      fileType: 'ppt',
      sender: 'other',
      senderName: 'Vishal',
      senderAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      time: '10:38 AM'
    },
    {
      id: '7',
      text: 'Cảm ơn Vishal rất nhiều ❤️❤️',
      type: 'text',
      sender: 'me',
      time: '10:40 AM'
    },
  ]);

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf': return 'file-pdf-o';
      case 'doc': return 'file-word-o';
      case 'ppt': return 'file-powerpoint-o';
      default: return 'file-o';
    }
  };

  const handleSendMessage = () => {
    if (message.trim() === '') return;

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      type: 'text',
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setMessage('');
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderMessage = (msg) => {
    const isMe = msg.sender === 'me';

    return (
      <View key={msg.id} style={[
        styles.messageWrapper,
        isMe ? styles.myMessageWrapper : styles.otherMessageWrapper
      ]}>
        {!isMe && (
          <Image
            source={{ uri: msg.senderAvatar }}
            style={styles.avatar}
          />
        )}

        <View style={styles.messageContent}>
          {!isMe && (
            <Text style={styles.senderName}>{msg.senderName}</Text>
          )}

          <View
            style={[
              styles.messageBubble,
              isMe ? styles.myMessage : styles.otherMessage,
              msg.type === 'file' && styles.fileMessageBubble
            ]}
          >
            {msg.type === 'file' ? (
              <TouchableOpacity
                style={[
                  styles.fileContainer,
                  isMe ? styles.myFile : styles.otherFile
                ]}
                activeOpacity={0.7}
              >
                <FontAwesome
                  name={getFileIcon(msg.fileType)}
                  size={22}
                  color={isMe ? '#fff' : '#007AFF'}
                />
                <Text style={[
                  styles.fileText,
                  isMe && styles.myFileText
                ]}>
                  {msg.text}
                </Text>
                <Feather
                  name="download"
                  size={20}
                  color={isMe ? '#fff' : '#007AFF'}
                />
              </TouchableOpacity>
            ) : (
              <Text style={[
                styles.messageText,
                isMe && styles.myMessageText
              ]}>
                {msg.text}
              </Text>
            )}
          </View>
          <Text style={[
            styles.timeText,
            isMe ? styles.myTimeText : styles.otherTimeText
          ]}>
            {msg.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerWrap}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Feather name="arrow-left" size={24} color="#007AFF" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
            <View style={styles.statusContainer}>
              <View style={styles.statusIndicator} />
              <Text style={styles.headerSubtitle}>Online</Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
              <Feather name="phone" size={20} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
              <Feather name="video" size={20} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
              <Feather name="more-vertical" size={20} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Messages List */}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map(renderMessage)}
      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <View style={styles.inputArea}>
          <TouchableOpacity
            style={styles.attachmentButton}
            activeOpacity={0.7}
          >
            <Ionicons name="attach" size={24} color="#007AFF" />
          </TouchableOpacity>

          <TextInput
            placeholder="Nhập tin nhắn..."
            placeholderTextColor="#999"
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            multiline
            onSubmitEditing={handleSendMessage}
          />

          <View style={styles.inputActions}>
            {message ? (
              <TouchableOpacity
                style={styles.sendButton}
                activeOpacity={0.7}
                onPress={handleSendMessage}
              >
                <Feather name="send" size={20} color="white" />
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.mediaButton}
                  activeOpacity={0.7}
                >
                  <Feather name="image" size={22} color="#007AFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.mediaButton}
                  activeOpacity={0.7}
                >
                  <Feather name="camera" size={22} color="#007AFF" />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {

    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerWrap: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerCenter: {
    flex: 1,
    marginHorizontal: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 12,
    borderRadius: 20,
  },
  messagesContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  messageWrapper: {
    marginBottom: 12,
    flexDirection: 'row',
  },
  myMessageWrapper: {
    justifyContent: 'flex-end',
  },
  otherMessageWrapper: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
    alignSelf: 'flex-end',
    marginBottom: 22,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e0e0e0',
  },
  messageContent: {
    maxWidth: '80%',
  },
  senderName: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
    marginLeft: 8,
    fontWeight: '500',
  },
  messageBubble: {
    maxWidth: '100%',
    padding: 12,
    borderRadius: 18,
  },
  fileMessageBubble: {
    padding: 0,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  myMessage: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e0e0e0',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  myMessageText: {
    color: '#fff',
  },
  timeText: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
  myTimeText: {
    textAlign: 'right',
    marginRight: 8,
  },
  otherTimeText: {
    textAlign: 'left',
    marginLeft: 8,
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
  },
  otherFile: {
    backgroundColor: '#f1f3f5',
  },
  myFile: {
    backgroundColor: 'rgba(0, 122, 255, 0.9)',
  },
  fileText: {
    marginHorizontal: 10,
    flex: 1,
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '500',
  },
  myFileText: {
    color: '#fff',
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e0e0e0',
  },
  attachmentButton: {
    padding: 8,
    marginRight: 4,
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f3f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    fontSize: 16,
    color: '#333',
    maxHeight: 100,
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  mediaButton: {
    padding: 8,
    marginHorizontal: 2,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
});

export default MessageDetailScreen;