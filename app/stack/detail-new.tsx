import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Share,
  Platform,
  Animated,
  Easing,
  Linking,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const NewsDetailScreen = () => {
  const params = useLocalSearchParams();
  const router = useRouter();

  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0.98))[0];

  // State for favorite status
  const [isFavorite, setIsFavorite] = useState(false);
  const [heartScale] = useState(new Animated.Value(1));

  const title = params.title || "Tiêu đề bài viết";
  const date = params.date || "01/01/2023";
  const time = params.time || "10:00";
  const author = params.author || "Tác giả";
  const content = params.content || "Nội dung bài viết chi tiết sẽ được hiển thị ở đây...";
  const imageUrl = params.imageUrl || null;

  // Load favorite status on mount
  useEffect(() => {
    loadFavoriteStatus();
    animateScreenEntry();
  }, []);

  const animateScreenEntry = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const loadFavoriteStatus = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites) {
        const favorites = JSON.parse(savedFavorites);
        setIsFavorite(favorites.includes(title));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      // Heart animation
      Animated.sequence([
        Animated.timing(heartScale, {
          toValue: 1.4,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(heartScale, {
          toValue: 0.9,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(heartScale, {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(heartScale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      // Haptic feedback
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      const savedFavorites = await AsyncStorage.getItem('favorites');
      let favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

      if (isFavorite) {
        favorites = favorites.filter(item => item !== title);
      } else {
        favorites.push(title);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const onShare = async () => {
    try {
      await Haptics.selectionAsync();
      await Share.share({
        message: `${title}\n\n${content.substring(0, 100)}...\n\nĐọc thêm tại ứng dụng Trường THPT Trần Cao Vân`,
        title: title,
        url: 'https://truongtrancaovan.edu.vn',
      });
    } catch (error) {
      console.error('Error sharing:', error.message);
    }
  };

  const handleOpenOriginal = () => {
    Linking.openURL('https://truongtrancaovan.edu.vn');
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết tin tức</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cover Image */}
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={styles.coverImage}
            resizeMode="cover"
          />
        )}

        {/* Article */}
        <View style={styles.articleContainer}>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <MaterialIcons name="date-range" size={16} color="#59CBE8" />
              <Text style={styles.metaText}>{date} • {time}</Text>
            </View>
            <View style={styles.metaItem}>
              <Feather name="user" size={16} color="#59CBE8" />
              <Text style={styles.metaText}>{author}</Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <AnimatedTouchable
              onPress={toggleFavorite}
              style={{ transform: [{ scale: heartScale }] }}
              activeOpacity={0.7}
            >
              <FontAwesome
                name={isFavorite ? "heart" : "heart-o"}
                size={24}
                color={isFavorite ? "#FF3B30" : "#888"}
              />
            </AnimatedTouchable>

            <TouchableOpacity onPress={onShare} activeOpacity={0.7}>
              <Feather name="share-2" size={24} color="#888" />
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.content}>
              {content}
              {"\n\n"}
              {content}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.originalLink}
            onPress={handleOpenOriginal}
            activeOpacity={0.7}
          >
            <Text style={styles.originalLinkText}>Xem bài viết gốc trên website</Text>
            <Feather name="external-link" size={16} color="#59CBE8" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#59CBE8',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingHorizontal: 20,
    paddingBottom: 16,
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
  coverImage: {
    width: width,
    height: width * 0.6,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  articleContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
    marginBottom: 16,
    lineHeight: 32,
    letterSpacing: 0.2,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 24,
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contentContainer: {
    paddingTop: 8,
  },
  content: {
    fontSize: 16,
    color: '#444',
    lineHeight: 28,
    textAlign: 'justify',
    marginBottom: 8,
  },
  originalLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 8,
  },
  originalLinkText: {
    color: '#59CBE8',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default NewsDetailScreen;