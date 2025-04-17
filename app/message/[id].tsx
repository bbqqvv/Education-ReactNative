import React, { useRef } from 'react';
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
} from 'react-native';
import { FontAwesome, Feather, Ionicons } from '@expo/vector-icons';

const messages = [
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
];

const MessageDetailScreen = () => {
  const { id, title } = useLocalSearchParams();
  const router = useRouter();
  const scrollRef = useRef(null);

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf': return 'file-pdf-o';
      case 'doc': return 'file-word-o';
      case 'ppt': return 'file-powerpoint-o';
      default: return 'file-o';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#007AFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>{title}</Text>
          <Text style={styles.headerSubtitle}>Online</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="phone" size={20} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="video" size={20} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="more-vertical" size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages List */}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg) => (
          <View key={msg.id} style={[
            styles.messageWrapper,
            msg.sender === 'me' ? styles.myMessageWrapper : styles.otherMessageWrapper
          ]}>
            {msg.sender === 'other' && (
              <Image
                source={{ uri: msg.senderAvatar }}
                style={styles.avatar}
              />
            )}

            <View style={styles.messageContent}>
              {msg.sender === 'other' && (
                <Text style={styles.senderName}>{msg.senderName}</Text>
              )}

              <View
                style={[
                  styles.messageBubble,
                  msg.sender === 'me' ? styles.myMessage : styles.otherMessage,
                ]}
              >
                {msg.type === 'file' ? (
                  <TouchableOpacity style={[
                    styles.fileContainer,
                    msg.sender === 'me' ? styles.myFile : styles.otherFile
                  ]}>
                    <FontAwesome
                      name={getFileIcon(msg.fileType)}
                      size={22}
                      color={msg.sender === 'me' ? '#fff' : '#007AFF'}
                    />
                    <Text style={[
                      styles.fileText,
                      msg.sender === 'me' && styles.myFileText
                    ]}>
                      {msg.text}
                    </Text>
                    <Feather
                      name="download"
                      size={20}
                      color={msg.sender === 'me' ? '#fff' : '#007AFF'}
                    />
                  </TouchableOpacity>
                ) : (
                  <Text style={[
                    styles.messageText,
                    msg.sender === 'me' && styles.myMessageText
                  ]}>
                    {msg.text}
                  </Text>
                )}
              </View>
              <Text style={[
                styles.timeText,
                msg.sender === 'me' ? styles.myTimeText : styles.otherTimeText
              ]}>
                {msg.time}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
      >
        <View style={styles.inputArea}>
          <TouchableOpacity style={styles.attachmentButton}>
            <Ionicons name="attach" size={24} color="#007AFF" />
          </TouchableOpacity>

          <TextInput
            placeholder="Nhập tin nhắn..."
            placeholderTextColor="#999"
            style={styles.input}
          />

          <View style={styles.inputActions}>
            <TouchableOpacity style={styles.mediaButton}>
              <Feather name="image" size={22} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton}>
              <Feather name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 4,
    marginRight: 8,
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
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  messagesContainer: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  messageWrapper: {
    marginBottom: 16,
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
  },
  messageContent: {
    maxWidth: '80%',
  },
  senderName: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
    marginLeft: 8,
  },
  messageBubble: {
    maxWidth: '100%',
    padding: 12,
    borderRadius: 18,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 6,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: '#eaeaea',
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
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  myTimeText: {
    alignSelf: 'flex-end',
    marginRight: 8,
  },
  otherTimeText: {
    alignSelf: 'flex-start',
    marginLeft: 8,
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
  },
  otherFile: {
    backgroundColor: '#f1f3f5',
  },
  myFile: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  fileText: {
    marginHorizontal: 8,
    flex: 1,
    fontSize: 16,
    color: '#007AFF',
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
    borderTopWidth: 1,
    borderTopColor: '#eaeaea',
  },
  attachmentButton: {
    padding: 6,
    marginRight: 4,
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f3f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 16,
    color: '#333',
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  mediaButton: {
    padding: 6,
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