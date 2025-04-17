import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import SearchField from '@/components/SearchField';
import Quote from '@/components/Quote';
import NotificationButton from '@/components/NotificationButton';
import HomeProfile from '@/components/HomeProfile';
import { quotes, features } from '@/constants';
import FeatureItem from '@/components/FeatureItem';
import NewsItem from '@/components/NewsItem';
import FooterHome from '@/components/FooterHome';
import { useRouter } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function Home() {
  // Load user token from Redux
  useAuth();

  // Get user and loading status from Redux store
  const { user, loading } = useSelector((state: RootState) => state.auth);

  const router = useRouter();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isQuoteLoading, setIsQuoteLoading] = useState(false);

  const handleFeaturePress = (label: string) => {
    console.log('Navigating to:', label);
    switch (label) {
      case 'Lớp học':
        router.push('/stack/class');
        break;
      case 'Lịch thi':
        router.push('/stack/examSchedule');
        break;
      case 'Xin nghỉ':
        router.push('/stack/leaveofabsence');
        break;
      case 'Vi phạm':
        router.push('/stack/violate');
        break;
      case 'TKB':
        router.push('/stack/timetable');
        break;
      case 'Tất cả':
        router.push('/stack/allFeatures');
        break;
      default:
        console.log('Unknown feature:', label);
    }
  };

  const newsData = [
    {
      title: 'Tin hot mới nhất trên thế giới',
      date: '16th May',
      time: '09:32 pm',
      image: require('@/assets/images/avatar.png') || null,
    },
  ];

  const handleReloadQuote = async () => {
    setIsQuoteLoading(true);
    const nextIndex = (currentQuoteIndex + 1) % quotes.length;
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentQuoteIndex(nextIndex);
        setIsQuoteLoading(false);
        resolve();
      }, 1000);
    });
  };

  // Display ActivityIndicator if loading
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: '#ffffff' }}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerRow}>
            <HomeProfile user={user} />
            <View style={styles.headerActions}>
              <SearchField onSearch={(query) => console.log('Search:', query)} />
              <NotificationButton />
            </View>
          </View>
        </View>

        {/* Feature List */}
        <View style={styles.featureContainer}>
          {/* Row 1 */}
          <View style={styles.featureRow}>
            {features.slice(0, 4).map((feature, index) => (
              <FeatureItem
                key={`feature-${index}`}
                icon={feature.icon}
                label={feature.label}
                onPress={() => handleFeaturePress(feature.label)}
              />
            ))}
            {features.slice(0, 4).length < 4 &&
              Array.from({ length: 4 - features.slice(0, 4).length }).map((_, i) => (
                <View key={`empty-first-${i}`} style={styles.emptyFeature} />
              ))}
          </View>

          {/* Row 2 */}
          {features.length > 4 && (
            <View style={styles.featureRow}>
              {features.slice(4).map((feature, index) => (
                <FeatureItem
                  key={`feature-${index + 4}`}
                  icon={feature.icon}
                  label={feature.label}
                  onPress={() => handleFeaturePress(feature.label)}
                />
              ))}
              {features.slice(4).length < 4 &&
                Array.from({ length: 4 - features.slice(4).length }).map((_, i) => (
                  <View key={`empty-second-${i}`} style={styles.emptyFeature} />
                ))}
            </View>
          )}
        </View>

        {/* Quote Section */}
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
          <View style={styles.newsHeader}>
            <Text style={styles.newsTitle}>Tin Tức Mới</Text>
            <TouchableOpacity>
              <Text style={styles.newsViewAll}>tất cả</Text>
            </TouchableOpacity>
          </View>
          {newsData.length > 0 ? (
            newsData.map((news, index) => (
              <NewsItem
                key={`news-${index}`}
                title={news.title}
                date={news.date}
                time={news.time}
                image={news.image}
              />
            ))
          ) : (
            <Text style={styles.noNewsText}>Không có tin tức mới</Text>
          )}
        </View>

        <FooterHome />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 16,
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  emptyFeature: {
    width: 72,
  },
  quoteContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 16,
    marginBottom: 16,
  },
  newsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 16,
    padding: 16,
    marginBottom: 16,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  newsViewAll: {
    fontSize: 14,
    color: '#1E90FF',
    fontWeight: '500',
  },
  noNewsText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    padding: 16,
  },
});
