import { API_BASE_URL, API_TIMEOUT } from '@/constants/api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Thay SecureStore bằng AsyncStorage

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
});

// Interceptor xử lý token
apiClient.interceptors.request.use(async (config) => {
    const noAuthUrls = ['/auth/login', '/auth/register', '/auth/forgot-password', '/auth/verify-otp', '/auth/reset-password'];

    // Nếu URL không cần auth thì bỏ qua việc gắn token
    if (config.url && !noAuthUrls.includes(config.url)) {
        const token = await AsyncStorage.getItem('authToken');  // Dùng AsyncStorage thay SecureStore
        console.log('Token:', token); // Log token nếu có

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
});

export default apiClient;
