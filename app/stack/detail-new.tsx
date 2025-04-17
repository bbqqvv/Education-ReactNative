import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

const NewsDetailScreen = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  
  // Placeholder content if params are empty
  const title = params.title || "Tiêu đề bài viết";
  const date = params.date || "01/01/2023";
  const time = params.time || "10:00";
  const author = params.author || "Tác giả";
  const content = params.content || "Nội dung bài viết chi tiết sẽ được hiển thị ở đây. Bài viết này cung cấp thông tin quan trọng về chủ đề đang được đề cập. Nội dung có thể bao gồm nhiều đoạn văn khác nhau để trình bày đầy đủ thông tin cho người đọc.";
  
  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết tin tức</Text>
        <View style={{ width: 24 }} /> {/* For balance */}
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.articleContainer}>
          <Text style={styles.title}>{title}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <MaterialIcons name="date-range" size={16} color="#666" />
              <Text style={styles.metaText}>{date} - {time}</Text>
            </View>
            
            <View style={styles.metaItem}>
              <Feather name="user" size={16} color="#666" />
              <Text style={styles.metaText}>{author}</Text>
            </View>
          </View>
          
          {/* <Image 
            source={require('@/assets/images/avatar.png')} 
            style={styles.image}
            resizeMode="cover"
            defaultSource={require('@/assets/images/splash.jpg')}
          /> */}
          
          <View style={styles.contentContainer}>
            <Text style={styles.content}>
              {content}
              {"\n\n"}
              {content} {/* Duplicate for demo */}
            </Text>
          </View>
          <View style={styles.footer}>
            <Image 
              style={styles.footerImage} 
              source={require("@/assets/images/img-rm.png")} 
            />
            <Text style={styles.footerText}>
              &copy; 2025 Trường THPT Trần Cao Vân. All rights reserved.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#59CBE8',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingTop: 50,
    paddingBottom: 16
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    
  },
  articleContainer: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 16,
    marginBottom: 12,
    color: '#222',
    lineHeight: 28,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 6,
  },
  image: {
    width: '100%',
    height: 220,
    backgroundColor: '#eee',
  },
  contentContainer: {
    padding: 16,
    paddingTop: 8,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    textAlign: 'justify',
  },
  // Footer
  footer: {
    alignItems: 'center',
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#F8F8F8',
  },
  footerImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

export default NewsDetailScreen;