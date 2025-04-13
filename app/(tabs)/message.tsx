import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

const discussions = [
  {
    id: '1',
    title: 'Lớp XINH',
    messages: [
      { id: '1', text: 'You: Okay, I\'ll tell him', time: '8:34 am' },
    ],
  },
  {
    id: '2',
    title: 'Lớp HOA',
    messages: [
      { id: '2', text: 'You: Okay, I\'ll tell him', time: '8:34 am' },
    ],
  },
  {
    id: '3',
    title: 'Coffeccion',
    messages: [
      { id: '3', text: 'You: Okay, I\'ll tell him', time: '8:34 am' },
    ],
  },
];

const MessageScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.newButton}>
          <Text style={styles.newText}>+ New</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchText} placeholder="Search" />
      </View>
      <ScrollView>
        {discussions.map((discussion) => (
          <TouchableOpacity key={discussion.id} style={styles.discussionItem} 
          onPress={() => router.push({pathname: `/message/${discussion.id}`, params: { title: discussion.title }})}>
            <Image source={require('../../assets/images/avatar.png')} style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.discussionTitle}>{discussion.title}</Text>
              {discussion.messages.map((message) => (
                <Text key={message.id} style={styles.messageText}>{message.text}</Text>
              ))}
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.timeText}>{discussion.messages[0].time}</Text>
              <View style={styles.unreadDot} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  editText: {
    fontSize: 16,
    color: '#007AFF',
  },
  newButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  newText: {
    fontSize: 16,
    color: '#fff',
  },
  searchContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  searchText: {
    fontSize: 16,
    color: '#888',
  },
  discussionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  discussionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 14,
    color: '#666',
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#444',
    marginTop: 5,
  },
});

export default MessageScreen;
