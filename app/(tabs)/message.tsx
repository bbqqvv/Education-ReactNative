import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  Platform,
  Animated,
  Easing
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const discussions = [
  {
    id: '1',
    title: 'Lớp 12A1',
    lastMessage: 'Thông báo: Lịch kiểm tra học kỳ sẽ được gửi vào chiều nay',
    time: '8:34',
    unread: true,
    avatar: require('../../assets/images/avatar.png'),
    members: 32
  },
  {
    id: '2',
    title: 'Giáo viên chủ nhiệm',
    lastMessage: 'Em nhớ nộp bản tự đánh giá vào thứ 6 nhé',
    time: 'Hôm qua',
    unread: false,
    avatar: require('../../assets/images/avatar.png')
  },
  {
    id: '3',
    title: 'Ban cán sự lớp',
    lastMessage: 'Tuần này lớp mình có 2 bạn nghỉ học không phép',
    time: 'Thứ 2',
    unread: true,
    avatar: require('../../assets/images/avatar.png')
  },
  {
    id: '4',
    title: 'Nhóm học Toán',
    lastMessage: 'Bài tập về nhà đã được đăng trên Teams',
    time: '15:20',
    unread: false,
    avatar: require('../../assets/images/avatar.png'),
    members: 8
  },
];

const MessageScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, []);

  const handleDiscussionPress = (discussion) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: '/message/[id]',
      params: {
        id: discussion.id,
        title: discussion.title,
        avatar: discussion.avatar
      }
    });
  };

  const filteredDiscussions = discussions.filter(discussion =>
    discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    discussion.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Tin nhắn</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => {
                Haptics.selectionAsync();
                // Focus search input if needed
              }}
            >
              <Feather name="search" size={22} color="#59CBE8" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.newButton}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                // Handle new message action
              }}
            >
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={18} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm tin nhắn..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearSearchButton}
            >
              <Ionicons name="close-circle" size={18} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>

        {/* Discussions List */}
        <ScrollView
          contentContainerStyle={styles.discussionsContainer}
          showsVerticalScrollIndicator={false}
        >
          {filteredDiscussions.map((discussion) => (
            <TouchableOpacity
              key={discussion.id}
              style={[
                styles.discussionItem,
                discussion.unread && styles.unreadDiscussion
              ]}
              onPress={() => handleDiscussionPress(discussion)}
              activeOpacity={0.7}
            >
              <Image source={discussion.avatar} style={styles.avatar} />
              <View style={styles.discussionContent}>
                <View style={styles.discussionHeader}>
                  <Text style={styles.discussionTitle} numberOfLines={1}>
                    {discussion.title}
                  </Text>
                  <Text style={styles.timeText}>
                    {discussion.time}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.lastMessage,
                    discussion.unread && styles.unreadMessage
                  ]}
                  numberOfLines={1}
                >
                  {discussion.lastMessage}
                </Text>
                {discussion.members && (
                  <View style={styles.memberBadge}>
                    <Ionicons name="people" size={12} color="#59CBE8" />
                    <Text style={styles.memberText}>{discussion.members}</Text>
                  </View>
                )}
              </View>
              {discussion.unread ? (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadBadgeText}>1</Text>
                </View>
              ) : (
                <Ionicons name="checkmark-done" size={18} color="#9CA3AF" />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  searchButton: {
    padding: 4,
  },
  newButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#59CBE8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#59CBE8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  clearSearchButton: {
    padding: 4,
    marginLeft: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 0,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
  discussionsContainer: {
    paddingBottom: 20,
  },
  discussionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  unreadDiscussion: {
    backgroundColor: '#F8FAFE',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  discussionContent: {
    flex: 1,
    marginRight: 12,
  },
  discussionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  discussionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
    marginRight: 12,
  },
  timeText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  lastMessage: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  unreadMessage: {
    color: '#111827',
    fontWeight: '500',
  },
  unreadBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#59CBE8',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  unreadBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  memberText: {
    fontSize: 11,
    color: '#59CBE8',
    fontWeight: '600',
    marginLeft: 4,
  },
});

export default MessageScreen;