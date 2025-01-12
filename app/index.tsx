import useAuth from "@/hooks/auth/useAuth";
import { Redirect } from "expo-router";
import { ActivityIndicator, SafeAreaView } from "react-native";

const Page = () => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#00A8FF" />
      </SafeAreaView>
    );
  }

  if (token) {
    return <Redirect href="/(tabs)/home" />;
  }
  return <Redirect href="/(auth)/welcome" />;
};

export default Page;