import React, { useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useAuth } from '@/context/AuthContext';
import SearchField from '@/components/SearchField';
import Quote from '@/components/Quote';
import NotificationButton from '@/components/NotificationButton';
import HomeProfile from '@/components/HomeProfile';
import { quotes, features } from '@/constants';
import FeatureItem from '@/components/FeatureItem';
import NewsItem from '@/components/NewsItem';
import FooterHome from '@/components/FooterHome';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isQuoteLoading, setIsQuoteLoading] = useState(false);

  // Dữ liệu tin tức mẫu
  const newsData = [
    {
      id: '1',
      title: 'Hội thảo giáo dục 4.0',
      date: '16/05/2023',
      time: '09:32',
      image: require('@/assets/images/avatar.png'),
      content: 'Trường sẽ tổ chức hội thảo về giáo dục 4.0 vào ngày 20/05...',
      author: 'Ban giám hiệu'
    },
    {
      id: '2',
      title: 'Lễ tổng kết năm học',
      date: '18/05/2023',
      time: '14:00',
      image: require('@/assets/images/avatar.png'),
      content: 'Lễ tổng kết năm học 2022-2023 sẽ được tổ chức trọng thể...',
      author: 'Văn phòng nhà trường'
    },
    {
      id: '3',
      title: 'Thi học kỳ II',
      date: '22/05/2023',
      time: '07:30',
      image: require('@/assets/images/avatar.png'),
      content: 'Lịch thi học kỳ II sẽ bắt đầu từ ngày 25/05...',
      author: 'Phòng đào tạo'
    },
    {
      id: '1',
      title: 'Hội thảo giáo dục 4.0',
      date: '16/05/2023',
      time: '09:32',
      image: require('@/assets/images/avatar.png'),
      content: 'Trường sẽ tổ chức hội thảo về giáo dục 4.0 vào ngày 20/05...',
      author: 'Ban giám hiệu'
    },
    {
      id: '2',
      title: 'Lễ tổng kết năm học',
      date: '18/05/2023',
      time: '14:00',
      image: require('@/assets/images/avatar.png'),
      content: 'Lễ tổng kết năm học 2022-2023 sẽ được tổ chức trọng thể...',
      author: 'Văn phòng nhà trường'
    },
    {
      id: '3',
      title: 'Thi học kỳ II',
      date: '22/05/2023',
      time: '07:30',
      image: require('@/assets/images/avatar.png'),
      content: 'Lịch thi học kỳ II sẽ bắt đầu từ ngày 25/05...',
      author: 'Phòng đào tạo'
    }
  ];

  const handleFeaturePress = (label: string) => {
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

  const handleViewAllNews = () => {
    router.push({
      pathname: '/stack/all-new',
      params: {
        newsData: JSON.stringify(newsData)
      }
    });
  };

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
            <HomeProfile />
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

        {/* News Section - Updated */}
        <View style={styles.newsContainer}>
          <View style={styles.newsHeader}>
            <Text style={styles.newsTitle}>Tin Tức Mới</Text>
            <TouchableOpacity onPress={handleViewAllNews}>
              <Text style={styles.newsViewAll}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          
          {/* Vertical News List */}
          <View style={styles.newsList}>
            {newsData.slice(0, 3).map((item) => (
              <TouchableOpacity 
                key={item.id}
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
            ))}
          </View>
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
  newsList: {
    marginTop: 8,
  },
  newsItem: {
    marginBottom: 16,
  },
});