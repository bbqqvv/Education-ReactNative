import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import NewsItem from '@/components/NewsItem';
import { Ionicons } from '@expo/vector-icons';

const AllNewsScreen = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  const params = useLocalSearchParams();
  const newsData = JSON.parse(params.newsData as string);

  const handleNewsPress = (newsItem) => {
    router.push({
      pathname: '/stack/detail-new',
      params: {
        id: newsItem.id,
        title: newsItem.title,
        date: newsItem.date,
        time: newsItem.time,
        content: newsItem.content,
        author: newsItem.author
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tất cả tin tức</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <FlatList
        data={newsData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => handleNewsPress(item)}
            style={styles.newsItem}
          >
            <NewsItem
              title={item.title}
              date={item.date}
              time={item.time}
              image={item.image}
              verticalLayout={true}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  newsItem: {
    marginBottom: 16,
  },
  header: {
    backgroundColor: '#59CBE8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default AllNewsScreen;