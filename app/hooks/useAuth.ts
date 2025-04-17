import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchUserInfo, setToken } from '../store/slices/authSlice';

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { token, user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('authToken');
                if (storedToken && (!token || !user)) {
                    dispatch(setToken(storedToken));
                    await dispatch(fetchUserInfo()); // đợi fetch user sau khi set token
                }
            } catch (error) {
                console.error('Lỗi khi load token từ AsyncStorage:', error);
            }
        };

        if (!token) {
            initAuth();
        }
    }, [ token, user]);  
};
