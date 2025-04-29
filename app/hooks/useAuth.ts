import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchUserInfo, setToken } from '../store/slices/authSlice';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const authState = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('authToken');
                console.log("Stored token from AsyncStorage:", storedToken); // ✅

                if (storedToken && (!authState.token || !authState.user)) {
                    console.log("Dispatching setToken()..."); // ✅
                    // Dispatch setToken nếu chưa có token trong Redux store
                    dispatch(setToken(storedToken));

                    console.log("Dispatching fetchUserInfo()..."); // ✅
                    // Dispatch fetchUserInfo để lấy thông tin người dùng sau khi có token
                    await dispatch(fetchUserInfo());
                }
            } catch (error) {
                console.error('Lỗi khi load token từ AsyncStorage:', error);
            }
        };

        // Kiểm tra token và user, chỉ gọi initAuth khi chưa có token hoặc user
        if (!authState.token && !authState.user) {
            initAuth();
        }
    }, [authState.token, authState.user, dispatch]);
    // Trả về các giá trị cần thiết
    return {
        role: authState.user?.role, // ROLE_STUDENT, ROLE_TEACHER, etc.
        user: authState.user,
        token: authState.token,
        isLoading: authState.loading,
        error: authState.error
    };
};
