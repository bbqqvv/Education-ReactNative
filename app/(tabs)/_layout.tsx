import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: '#00A8FF',
        tabBarInactiveTintColor: '#AAAAAA',
        tabBarIconStyle: styles.tabBarIcon,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24} // Đặt kích thước icon chuẩn
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="mission"
        options={{
          title: 'Mission',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'rocket' : 'rocket-outline'}
              size={24} // Đặt kích thước icon chuẩn
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="message"
        options={{
          title: 'Message',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
              size={24} // Đặt kích thước icon chuẩn
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="setting"
        options={{
          title: 'Setting',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? 'settings' : 'settings-outline'}
              size={24} // Đặt kích thước icon chuẩn
              color={color}
            />
          ),
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
  },
  tabBarLabel: {
    fontSize: 11, // Cỡ chữ vừa phải
    fontWeight: '600',
    textAlign: 'center',
  },
  tabBarIcon: {
    marginTop: 7, 
  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
