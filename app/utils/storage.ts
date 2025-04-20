// utils/storage.ts
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
    async setItem(key: string, value: string) {
        if (Platform.OS !== 'web') {
            await AsyncStorage.setItem(key, value);
        } else {
            localStorage.setItem(key, value);
        }
    },
    async getItem(key: string): Promise<string | null> {
        if (Platform.OS !== 'web') {
            return await AsyncStorage.getItem(key);
        } else {
            return localStorage.getItem(key);
        }
    },
    async removeItem(key: string) {
        if (Platform.OS !== 'web') {
            await AsyncStorage.removeItem(key);
        } else {
            localStorage.removeItem(key);
        }
    }
};
