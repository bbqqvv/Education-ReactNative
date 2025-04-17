import { API_BASE_URL, API_TIMEOUT } from '@/constants/api';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
});

// Interceptor xử lý token
apiClient.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync('authToken');
    console.log('Token:', token); // Log token

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor xử lý lỗi toàn cụcs
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Redirect về màn hình Login nếu hết hạn token
        }
        return Promise.reject(error);
    }
);

export default apiClient;