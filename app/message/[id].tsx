import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';

const messages = [
  { id: '1', text: 'Đây là file tài liệu của lớp sinh học hôm nay', type: 'text', sender: 'other' },
  { id: '2', text: 'Introduction to force', type: 'file', fileType: 'pdf', sender: 'other' },
  { id: '3', text: 'Work and energy', type: 'file', fileType: 'doc', sender: 'other' },
  { id: '4', text: 'Cảm ơn Maya rất nhiều.😍😍 Có ai vui lòng chia sẻ ghi chú lớp học của bạn về bài giảng này. 🙏', type: 'text', sender: 'me' },
  { id: '5', text: 'Tôi đã không viết ghi chú của bài giảng này. Nhưng tôi đã làm bài thuyết trình powerpoint về lực, năng lượng và công.', type: 'text', sender: 'other' },
  { id: '6', text: 'Force, Energy & Work', type: 'file', fileType: 'pdf', sender: 'other' },
  { id: '7', text: 'Cảm ơn Vishal rất nhiều ❤️❤️', type: 'text', sender: 'me' },
];

const MessageDetailScreen = () => {
  const { id, title } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.headerIcons}>
          <Feather name="phone" size={20} color="#007AFF" style={styles.icon} />
          <Feather name="video" size={20} color="#007AFF" style={styles.icon} />
          <Feather name="info" size={20} color="#007AFF" style={styles.icon}/>
        </View>
      </View>

      {/* Danh sách tin nhắn */}
      <ScrollView contentContainerStyle={styles.messageContainer}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.sender === 'me' ? styles.myMessage : styles.otherMessage,
            ]}
          >
            {msg.type === 'file' ? (
              <View style={styles.fileContainer}>
                <FontAwesome name={msg.fileType === 'pdf' ? 'file-pdf-o' : 'file-word-o'} 
                size={24} color="#007AFF" />
                <Text style={styles.fileText}>{msg.text}</Text>
                <Feather name="download" size={20} color="#007AFF" />
              </View>
            ) : (
              <Text style={styles.messageText}>{msg.text}</Text>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Thanh nhập tin nhắn */}
      <View style={styles.inputContainer}>
        <TextInput placeholder="Nhập nội dung" style={styles.input} />
        <TouchableOpacity>
          <Feather name="send" size={24} color="#007AFF" />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          <Feather name="image" size={20} color="#007AFF" style={styles.icon} />
          <Feather name="film" size={20} color="#007AFF" style={styles.icon} />
          <Feather name="file-text" size={20} color="#007AFF" style={styles.icon}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  headerIcons: { flexDirection: 'row' },
  icon: { marginLeft: 16 },

  // Tin nhắn
  messageContainer: { padding: 16 },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAEAEA',
  },
  messageText: { fontSize: 16, color: '#333' },
  
  // File đính kèm
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  fileText: { marginLeft: 8, flex: 1, fontSize: 16 },

  // Thanh nhập tin nhắn
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: { flex: 1, fontSize: 16, padding: 10 },
});

export default MessageDetailScreen;
