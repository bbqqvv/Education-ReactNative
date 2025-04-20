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
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNewsletter } from '../hooks/useNewsletter';
import { MaterialIcons, FontAwesome, Feather, Ionicons } from '@expo/vector-icons';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import * as Haptics from 'expo-haptics';
import { SafeAreaView } from 'react-native-safe-area-context';

const NewsDetailScreen = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { id } = params;
  const { newsletter, loading, error } = useNewsletter(id as string);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (newsletter) {
      setLikeCount(newsletter.likeCount || 0);
    }
  }, [newsletter]);

  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    // TODO: Call API to update like
  };

  const handleBookmark = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setBookmarked(!bookmarked);
    // TODO: Call API to update bookmark status
  };

  const handleShare = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await Share.share({
        title: newsletter?.title,
        message: `Check out this article: ${newsletter?.title}\n\n${newsletter?.excerpt || 'Interesting read'}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const openImageGallery = (index: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // TODO: Implement image gallery viewer
    console.log('Open image at index:', index);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4E83FF" />
        <Text style={styles.loadingText}>Loading article details...</Text>
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
            <View style={styles.authorContainer}>
              <FontAwesome name="user-circle" size={16} color="#64748B" />
              <Text style={styles.metaText}>{newsletter?.author || 'Unknown Author'}</Text>
            </View>

            <View style={styles.spacer} />

            <View style={styles.dateContainer}>
              <Feather name="calendar" size={14} color="#64748B" />
              <Text style={styles.metaText}>
                {newsletter?.createdAt ? new Date(newsletter.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                }) : 'N/A'}
              </Text>
            </View>
          </View>

          {newsletter?.tags && newsletter.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {newsletter.tags.map((tag, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.tag}
                  activeOpacity={0.7}
                >
                  <Text style={styles.tagText}>#{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {newsletter?.content && (
            <View style={styles.htmlContent}>
              <RenderHtml
                contentWidth={width - 40}
                source={{ html: newsletter.content }}
                tagsStyles={{
                  p: {
                    fontSize: 16,
                    lineHeight: 26,
                    color: '#334155',
                    marginBottom: 16,
                    fontFamily: 'System'
                  },
                  h1: {
                    fontSize: 24,
                    fontWeight: '700',
                    marginVertical: 20,
                    color: '#1E293B',
                    lineHeight: 32
                  },
                  h2: {
                    fontSize: 20,
                    fontWeight: '600',
                    marginVertical: 18,
                    color: '#1E293B',
                    lineHeight: 28
                  },
                  h3: {
                    fontSize: 18,
                    fontWeight: '600',
                    marginVertical: 16,
                    color: '#1E293B',
                    lineHeight: 26
                  },
                  a: {
                    color: '#4E83FF',
                    textDecorationLine: 'none'
                  },
                  ul: {
                    marginBottom: 16
                  },
                  li: {
                    fontSize: 16,
                    lineHeight: 24,
                    color: '#334155',
                    marginBottom: 8
                  }
                }}
                baseStyle={{
                  fontSize: 16,
                  color: '#334155',
                }}
              />
            </View>
          )}

          {newsletter?.contentImages && newsletter.contentImages.length > 0 && (
            <View style={styles.imageGallery}>
              <Text style={styles.sectionTitle}>Ảnh liên quan</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.galleryScrollContainer}
              >
                {newsletter.contentImages.map((img, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => openImageGallery(index)}
                    style={styles.galleryImageWrapper}
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
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#4E83FF" />
        </TouchableOpacity>

        <View style={styles.centerActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleLike}
            activeOpacity={0.7}
          >
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={24}
              color={liked ? "#FF4E4E" : "#64748B"}
            />
            <Text style={[styles.actionText, liked && styles.likedText]}>
              {likeCount}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleShare}
            activeOpacity={0.7}
          >
            <Ionicons name="share-social-outline" size={22} color="#64748B" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleBookmark}
          activeOpacity={0.7}
        >
          <Ionicons
            name={bookmarked ? "bookmark" : "bookmark-outline"}
            size={22}
            color={bookmarked ? "#4E83FF" : "#64748B"}
          />
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
    fontFamily: 'System',
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
    fontFamily: 'System',
    fontWeight: '500',
    lineHeight: 24,
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
    fontFamily: 'System',
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
    lineHeight: 36,
    fontFamily: 'System',
  },
  excerpt: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 20,
    lineHeight: 24,
    fontFamily: 'System',
    fontStyle: 'italic',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  spacer: {
    width: 16,
    height: 1,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'System',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
  },
  tagText: {
    fontSize: 13,
    color: '#4E83FF',
    fontWeight: '500',
    fontFamily: 'System',
  },
  htmlContent: {
    marginBottom: 24,
  },
  imageGallery: {
    marginBottom: 24,
  },
  galleryScrollContainer: {
    paddingRight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
    fontFamily: 'System',
  },
  galleryImageWrapper: {
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  galleryImage: {
    width: 180,
    height: 140,
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
  centerActions: {
    flexDirection: 'row',
    gap: 24,
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
    fontFamily: 'System',
  },
  likedText: {
    color: '#FF4E4E',
  },
});

export default NewsDetailScreen;