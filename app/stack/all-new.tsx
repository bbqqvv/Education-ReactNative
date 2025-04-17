import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Animated,
  Platform,
  StatusBar
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import NewsItem from '@/components/NewsItem';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = Platform.OS === 'ios' ? 100 : 80;

const AllNewsScreen = () => {
  const router = useRouter();

  const handleBack = () => {
    Haptics.selectionAsync();
    router.back();
  };

  const params = useLocalSearchParams();
  const newsData = JSON.parse(params.newsData as string);

  const handleNewsPress = (newsItem) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: '/stack/detail-new',
      params: {
        id: newsItem.id,
        title: newsItem.title,
        date: newsItem.date,
        time: newsItem.time,
        content: newsItem.content,
        author: newsItem.author,
        imageUrl: newsItem.image // Added imageUrl for consistency
      }
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleNewsPress(item)}
      activeOpacity={0.7}
      style={[
        styles.newsItem,
      ]}
    >
      <NewsItem
        title={item.title}
        date={item.date}
        time={item.time}
        image={item.image}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#59CBE8" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          style={styles.backButton}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tất cả tin tức</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={newsData}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View style={{ height: 8 }} />}
        ListFooterComponent={<View style={{ height: 30 }} />}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  newsItem: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#59CBE8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 16,
    height: HEADER_HEIGHT,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 10,
  },
  backButton: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.5,
  },
});

export default AllNewsScreen;