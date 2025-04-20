import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  RefreshControl,
  Animated,
  Easing
} from 'react-native';

import HomeProfile from '@/components/HomeProfile';
import { quotes, features } from '@/constants';

import FooterHome from '@/components/FooterHome';
import { useRouter } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useNewsletter } from '../hooks/useNewsletter';
import FeatureItem from '@/components/home/FeatureItem';
import NewsItem from '@/components/home/NewsItem';
import NotificationButton from '@/components/home/NotificationButton';
import Quote from '@/components/home/Quote';
import SearchField from '@/components/home/SearchField';

export default function Home() {
  useAuth();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isQuoteLoading, setIsQuoteLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const { newsletters, error } = useNewsletter();


  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleFeaturePress = (label: string) => {
    const routes: Record<string, string> = {
      'Lớp học': '/(stack)/class',
      'Lịch thi': '/(stack)/examSchedule',
      'Xin nghỉ': '/(stack)/leaveofabsence',
      'Vi phạm': '/(stack)/violate',
      'TKB': '/(stack)/timetable',
      'Tất cả': '/(stack)/allFeatures'
    };

    if (routes[label]) {
      router.push(routes[label] as "/(stack)/class" | "/(stack)/examSchedule" | "/(stack)/leaveofabsence" | "/(stack)/violate" | "/(stack)/timetable" | "/(stack)/allFeatures");
    } else {
      console.log('Unknown feature:', label);
    }
  };


  const handleNewsPress = (newsItem: any) => {
    router.push({
      pathname: '/(stack)/detail-new',
      params: {
        id: newsItem.id,
      },
    });
  };

  const handleViewAllNews = () => {
    router.push({
      pathname: '/(stack)/all-new',
      params: {
        newsData: JSON.stringify(newsletters),
      },
    });
  };

  const handleReloadQuote = () => {
    setIsQuoteLoading(true);
    setTimeout(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
      setIsQuoteLoading(false);
    }, 800);
  };

  const onRefresh = () => {
    setRefreshing(true);
    handleReloadQuote();
    setTimeout(() => setRefreshing(false), 1500);
  };

  if (loading || !user) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <LinearGradient
          colors={['#f7f9fc', '#e3f2fd']}
          style={styles.loadingBackground}
        >
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
        </LinearGradient>
      </SafeAreaView>
    );
  }


  return (
    <Animated.View style={[styles.container]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#3b82f6"
            colors={['#3b82f6']}
          />
        }
      >
        {/* Header with gradient background */}
        <LinearGradient
          colors={['#79CDCD', '#E8E8E8']}
          style={styles.headerGradient}
        >
          <View style={styles.headerContainer}>
            <View style={styles.headerRow}>
              <HomeProfile user={user} />
              <View style={styles.headerActions}>
                <SearchField
                  onSearch={(query) => console.log('Search:', query)}
                  containerStyle={styles.searchContainer}
                />
                <NotificationButton />
              </View>
            </View>

          </View>
        </LinearGradient>

        {/* Main Content */}
        <View style={styles.contentContainer}>
          {/* Feature Grid */}
          <View style={styles.featureContainer}>
            <Text style={styles.sectionTitle}>Tính năng nổi bật</Text>
            <View style={styles.featureGrid}>
              {features.map((feature, index) => (
                <FeatureItem
                  key={`feature-${index}`}
                  icon={feature.icon}
                  label={feature.label}
                  onPress={() => handleFeaturePress(feature.label)}
                />
              ))}
            </View>
          </View>

          {/* Daily Quote */}
          <View style={styles.quoteContainer}>
            <Quote
              quote={quotes[currentQuoteIndex].quote}
              author={quotes[currentQuoteIndex].author}
              onReload={handleReloadQuote}
              isLoading={isQuoteLoading}
            />
          </View>

          {/* News Section */}
          <View style={styles.newsContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Tin tức mới nhất</Text>
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={handleViewAllNews}
              >
                <Text style={styles.viewAllText}>Xem tất cả</Text>
                <MaterialIcons name="chevron-right" size={20} color="#3b82f6" />
              </TouchableOpacity>
            </View>

            {newsletters.length === 0 ? (
              <ActivityIndicator size="large" color="#3b82f6" />
            ) : error ? (
              <Text style={{ color: 'red' }}>{error}</Text>
            ) : (
              <FlatList
                data={newsletters}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.newsList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.newsCard}>
                    <NewsItem
                      title={item.title}
                      excerpt={item.excerpt}
                      category={item.category}
                      createdAt={item.createdAt}
                      image={item.thumbnailUrl}
                      onPress={() => handleNewsPress(item)}
                    />
                  </View>
                )}
              />
            )}
          </View>


          {/* Upcoming Events */}
          <View style={styles.eventsContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Sự kiện sắp tới</Text>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>Xem tất cả</Text>
                <MaterialIcons name="chevron-right" size={20} color="#3b82f6" />
              </TouchableOpacity>
            </View>
            <View style={styles.eventCard}>
              <Text style={styles.eventTitle}>Lễ khai giảng năm học mới</Text>
              <Text style={styles.eventDate}>05/09/2023 - 07:30</Text>
              <Text style={styles.eventLocation}>Hội trường lớn</Text>
            </View>
          </View>
        </View>

        <View style={styles.footerHome}>
          <FooterHome />
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  loadingContainer: {
    flex: 1,
  },
  loadingBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: '#3b82f6',
    fontSize: 16,
  },
  scrollContainer: {
    paddingBottom: 24,
  },
  headerGradient: {
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    marginTop: 26,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  searchContainer: {
    marginHorizontal: 0,
  },
  contentContainer: {
    paddingHorizontal: 5,
    marginTop: 16,
  },
  featureContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  quoteContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 5,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  newsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  eventsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#79CDCD',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  newsList: {
    paddingBottom: 8,
  },
  newsCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  eventCard: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  footerHome: {
    marginBottom: 60
  }
});