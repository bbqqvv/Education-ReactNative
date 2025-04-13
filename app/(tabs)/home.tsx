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
import { useAuth } from "@/context/AuthContext";
import SearchField from "@/components/SearchField";
import Quote from "@/components/Quote";
import NotificationButton from "@/components/NotificationButton";
import HomeProfile from "@/components/HomeProfile";
import { quotes } from "@/constants";
import { features } from "@/constants";
import FeatureItem from "@/components/FeatureItem";
import NewsItem from "@/components/NewsItem";
import FooterHome from "@/components/FooterHome"; // Sửa chính tả
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const handleFeaturePress = (label: string) => {
    switch(label) {
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
        console.log('Feature clicked:', label);
    }
  };

  // ... (phần còn lại giữ nguyên)
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* ... (phần header giữ nguyên) */}

        {/* Feature List */}
        <FlatList
          data={features}
          keyExtractor={(item, index) => `feature-${index}`}
          renderItem={({ item }) => (
            <FeatureItem 
              icon={item.icon} 
              label={item.label}
              onPress={() => handleFeaturePress(item.label)}
            />
          )}
          numColumns={4}
          contentContainerStyle={styles.featureList}
        />

        {/* ... (phần còn lại giữ nguyên) */}
      </ScrollView>
    </SafeAreaView>
  );
}

// ... (styles giữ nguyên)