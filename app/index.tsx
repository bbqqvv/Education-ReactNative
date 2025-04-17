import { useEffect } from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { useRouter, useRootNavigationState } from 'expo-router';
import { useAuth } from './hooks/useAuth';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

const Page = () => {
  const { token, loading } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useAuth();

  useEffect(() => {
    // Only redirect after router is mounted
    if (!navigationState?.key || loading) return;

    if (token) {
      router.replace('/(tabs)/home');
    } else {
      router.replace('/(auth)/welcome');
    }
  }, [token, loading, navigationState]);

  // Loading screen until we can safely redirect
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#00A8FF" />
    </SafeAreaView>
  );
};

export default Page;
