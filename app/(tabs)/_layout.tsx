import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Animated } from 'react-native';
import React, { useRef } from 'react';

export default function Layout() {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const animateTabPress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: '#63BAD5', // Màu chủ đạo cho tab active
        tabBarInactiveTintColor: '#AAAAAA',
        tabBarIconStyle: styles.tabBarIcon,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ focused, color }) => (
            <Animated.View style={{ transform: [{ scale: focused ? scaleValue : 1 }] }}>
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={24}
                color={color}
              />
            </Animated.View>
          ),
        }}
        listeners={{
          tabPress: animateTabPress,
        }}
      />
      <Tabs.Screen
        name="ChatAi"
        options={{
          title: 'Chat Bot',
          tabBarIcon: ({ focused, color }) => (
            <Animated.View style={{ transform: [{ scale: focused ? scaleValue : 1 }] }}>
              <Ionicons
                name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
                size={24}
                color={color}
              />
            </Animated.View>
          ),
        }}
        listeners={{
          tabPress: animateTabPress,
        }}
      />

      <Tabs.Screen
        name="Message"
        options={{
          title: 'Tin nhắn',
          tabBarIcon: ({ focused, color }) => (
            <Animated.View style={{ transform: [{ scale: focused ? scaleValue : 1 }] }}>
              <Ionicons
                name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
                size={24}
                color={color}
              />
            </Animated.View>
          ),
        }}
        listeners={{
          tabPress: animateTabPress,
        }}
      />

      <Tabs.Screen
        name="Setting"
        options={{
          title: 'Cài đặt',
          tabBarIcon: ({ focused, color }) => (
            <Animated.View style={{ transform: [{ scale: focused ? scaleValue : 1 }] }}>
              <Ionicons
                name={focused ? 'settings' : 'settings-outline'}
                size={24}
                color={color}
              />
            </Animated.View>
          ),
        }}
        listeners={{
          tabPress: animateTabPress,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    backgroundColor: '#212121', // Màu nền đậm hơn
    borderRadius: 30,
    height: 70, // Chiều cao hợp lý
    marginHorizontal: 15,
    marginBottom: 20, // Tạo khoảng cách với cạnh dưới
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
    borderTopWidth: 0, // Loại bỏ đường viền trên cùng
  },
  tabBarLabel: {
    fontSize: 11, // Cỡ chữ vừa phải
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 5, // Thêm khoảng cách giữa icon và text
  },
  tabBarIcon: {
    marginTop: 7,
  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});