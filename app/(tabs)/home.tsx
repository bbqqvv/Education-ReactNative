import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useAuth } from "@/context/AuthContext"; // Assuming you have the AuthContext set up
import SearchField from "@/components/SearchField";
import Quote from "@/components/Quote";
import NotificationButton from "@/components/NotificationButton";
import HomeProfile from "@/components/HomeProfile";
import { quotes } from "@/constants";
import { features } from "@/constants";

import FeatureItem from "@/components/FeatureItem";
import NewsItem from "@/components/NewsItem";
import FooterHome from "@/components/FotterHome";
import { useNavigation } from "expo-router";
import { useRouter } from "expo-router";

export default function Home() {
  const navigation = useNavigation();

  const router = useRouter();

  const handleFeaturePress = (label) => {
    if (label === 'Lớp học') {
      router.push('/stack/class'); // Giả sử bạn đã đăng ký màn hình này
    }
    else if(label === 'Lịch thi') {
      router.push('/stack/examSchedule'); // Giả sử bạn đã đăng ký màn hình này
    }
    else if(label === 'Xin nghỉ'){
      router.push('/stack/leaveofabsence');
    }
    else if(label === 'Vi phạm'){
      router.push('/stack/violate');
    }
    else if(label === 'TKB'){
      router.push('/stack/timetable');
    }
    else if(label === 'Tất cả'){
      router.push('/stack/allFeatures');
    }
     else {
      console.log('Feature clicked:', label);
    }
  };

  const { user, loading } = useAuth(); // Assuming you have this hook set up
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const newsData = [
    {
      title: "Tin hot mới nhất trên thế giới",
      date: "16th May",
      time: "09:32 pm",
      image: require("@/assets/images/avatar.png"),
    },
    {
      title: "Tin hot 2",
      date: "17th May",
      time: "10:15 am",
      image: require("@/assets/images/avatar.png"),
    },
    {
      title: "Tin hot 3",
      date: "18th May",
      time: "03:00 pm",
      image: require("@/assets/images/avatar.png"),
    },
    {
      title: "Tin hot 4",
      date: "19th May",
      time: "08:20 am",
      image: require("@/assets/images/avatar.png"),
    },
  ];

  const handleReloadQuote = async () => {
    const nextIndex = (currentQuoteIndex + 1) % quotes.length;
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentQuoteIndex(nextIndex);
        resolve();
      }, 1000); // Simulate a network delay
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
      <ScrollView>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerRow}>
            <HomeProfile />
            <View style={styles.headerActions}>
              <SearchField onSearch={(query) => console.log("Search:", query)} />
              <NotificationButton />
            </View>
          </View>
        </View>

        {/* Feature List */}
        <FlatList
          data={features}
          keyExtractor={(item, index) => `feature-${index}`}
          renderItem={({ item }) => <FeatureItem icon={item.icon} label={item.label}
          onPress={() => handleFeaturePress(item.label)}/>}
          numColumns={4}
          contentContainerStyle={styles.featureList}
          showsVerticalScrollIndicator={false}
        />

        {/* Single Quote Section */}
        <View style={styles.quoteContainer}>
          <Quote
            quote={quotes[currentQuoteIndex].quote}
            author={quotes[currentQuoteIndex].author}
            onReload={handleReloadQuote}
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
          <FlatList
            data={newsData}
            renderItem={({ item }) => (
              <NewsItem
                title={item.title}
                date={item.date}
                time={item.time}
                image={item.image}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.newsList}
            showsVerticalScrollIndicator={true}
            scrollEnabled={newsData.length > 3}
            style={styles.newsListStyle}
          />
        </View>
        <View style={styles.footer}>
          <FooterHome />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    padding: 16,
    backgroundColor: "#ffffff",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureList: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  quoteContainer: {
    padding: 10,
  },
  newsContainer: {
    flex: 1,
    padding: 10,
    marginLeft: 10,
    width: "95%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingTop: 16,
  },
  newsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 16,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  newsViewAll: {
    fontSize: 14,
    color: "#1E90FF",
    fontWeight: "500",
  },
  newsList: {
    paddingBottom: 16,
  },
  newsListStyle: {
    maxHeight: 300,
  },
  footer: {
    marginBottom: 100,
  }
});
