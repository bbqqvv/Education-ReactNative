import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Share,
  Linking,
  useWindowDimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNewsletter } from '../hooks/useNewsletter';
import * as Haptics from 'expo-haptics';
import RenderHtml from 'react-native-render-html';
import { format } from 'date-fns';

const NewsDetailScreen = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { id } = params;
  const { newsletter, loading, error, liked, likeCount, handleLike } = useNewsletter(id as string);

  const handleShare = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await Share.share({
        title: newsletter?.title,
        message: `${newsletter?.title}\n\n${newsletter?.excerpt || 'Read this interesting article'}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const openImage = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4E83FF" />
        <Text style={styles.loadingText}>Loading article...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="warning-outline" size={48} color="#FF4E4E" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.backText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {newsletter?.thumbnailUrl && (
          <Image
            source={{ uri: newsletter.thumbnailUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        <View style={styles.content}>
          <Text style={styles.title}>{newsletter?.title}</Text>

          {newsletter?.excerpt && (
            <Text style={styles.excerpt}>{newsletter.excerpt}</Text>
          )}

          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Ionicons name="person-outline" size={16} color="#64748B" />
              <Text style={styles.metaText}>{newsletter?.author || 'System'}</Text>
            </View>

            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={16} color="#64748B" />
              <Text style={styles.metaText}>
                {newsletter?.createdAt
                  ? format(new Date(newsletter.createdAt), 'MMM d, yyyy')
                  : 'N/A'}
              </Text>
            </View>

            <View style={styles.metaItem}>
              <Ionicons name="eye-outline" size={16} color="#64748B" />
              <Text style={styles.metaText}>{newsletter?.viewCount || 0}</Text>
            </View>
          </View>

          {newsletter?.tags && newsletter.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {newsletter.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>
          )}

          {newsletter?.content && (
            <View style={styles.htmlContent}>
              <RenderHtml
                contentWidth={width - 40}
                source={{ html: newsletter.content }}
                tagsStyles={{
                  p: { fontSize: 16, lineHeight: 24, color: '#334155', marginBottom: 16 },
                  h1: { fontSize: 24, fontWeight: '700', marginVertical: 20, color: '#1E293B' },
                  h2: { fontSize: 20, fontWeight: '600', marginVertical: 18, color: '#1E293B' },
                  h3: { fontSize: 18, fontWeight: '600', marginVertical: 16, color: '#1E293B' },
                  a: { color: '#4E83FF', textDecorationLine: 'none' },
                  ul: { marginBottom: 16 },
                  li: { fontSize: 16, color: '#334155', marginBottom: 8 },
                  img: { maxWidth: width - 40, borderRadius: 8, marginVertical: 16 }
                }}
              />
            </View>
          )}

          {newsletter?.contentImages && newsletter.contentImages.length > 0 && (
            <View style={styles.imageGallery}>
              <Text style={styles.sectionTitle}>Related Images</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.galleryScroll}
              >
                {newsletter.contentImages.map((img, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => openImage(img)}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={{ uri: img }}
                      style={styles.galleryImage}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.actionBar}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleLike}
          activeOpacity={0.7}
        >
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={24}
            color={liked ? '#FF4E4E' : '#64748B'}
          />
          <Text style={[styles.actionText, liked && styles.likedText]}>{likeCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleShare}
          activeOpacity={0.7}
        >
          <MaterialIcons name="share" size={24} color="#64748B" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#4E83FF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    color: '#64748B',
    fontSize: 16,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  errorText: {
    color: '#FF4E4E',
    fontSize: 16,
    marginVertical: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  backText: {
    color: '#4E83FF',
    fontWeight: '600',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 240,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
    lineHeight: 34,
  },
  excerpt: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 20,
    lineHeight: 24,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#64748B',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: '#4E83FF',
    fontWeight: '500',
  },
  htmlContent: {
    marginBottom: 24,
  },
  imageGallery: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  galleryScroll: {
    paddingRight: 20,
  },
  galleryImage: {
    width: 180,
    height: 120,
    borderRadius: 8,
    marginRight: 12,
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 5,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  likedText: {
    color: '#FF4E4E',
  },
});

export default NewsDetailScreen;