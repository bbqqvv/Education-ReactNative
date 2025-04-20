import { API_BASE_URL, API_TIMEOUT } from "@/constants/api";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
});

// Interceptor: Gắn token nếu cần
apiClient.interceptors.request.use(async (config) => {
  const noAuthUrls = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/verify-otp",
    "/auth/reset-password",
    "/quotes/random",
  ];

  // Bỏ qua auth cho các URL không cần
  if (config.url && !noAuthUrls.some((url) => config.url?.startsWith(url))) {
    const token = await SecureStore.getItemAsync("authToken");
    console.log("Token from SecureStore:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

// Interceptor: Bắt lỗi 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token hết hạn hoặc không hợp lệ.");
      // Optional: Xử lý logout hoặc chuyển hướng về trang login
    }
    return Promise.reject(error);
  }
);

export default apiClient;
