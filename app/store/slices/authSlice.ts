import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticationRequest, JwtResponse, UserResponse } from '@/app/api/auth/auth.types';
import * as SecureStore from 'expo-secure-store';
import { AuthApi } from '@/app/api/auth/auth.service';
import { UserApi } from '@/app/api/user/user.service';

// Định nghĩa kiểu dữ liệu UserInfo và AuthState
type UserInfo = {
    fullName: string;
    email?: string;
    studentCode: string;
    studentClass: string;
    role: string;
};

type AuthState = {
    token: string | null;
    user: UserInfo | null;
    loading: boolean;
    error: string | null;
};

const initialState: AuthState = {
    token: null,
    user: null,
    loading: false,
    error: null,
};

// Đăng nhập
export const loginUser = createAsyncThunk<JwtResponse, AuthenticationRequest, { rejectValue: string }>(
    'auth/loginUser',
    async (data, thunkAPI) => {
        try {
            const response = await AuthApi.login(data);
            await AsyncStorage.setItem('authToken', response.token);
            console.log("Token:", response)
            return response;
        } catch (err) {
            console.log("Login error:", err);
            return thunkAPI.rejectWithValue("Đăng nhập thất bại");
        }
    }
);

// Lấy thông tin người dùng
export const fetchUserInfo = createAsyncThunk<UserResponse, void, { rejectValue: string }>(
    'auth/fetchUserInfo',
    async (_, thunkAPI) => {
        console.log("⚡ fetchUserInfo thunk được gọi"); // ✅
        try {
            const response = await UserApi.getCurrentUser();
            console.log("📥 API response from getCurrentUser:", response); // ✅

            if (!response || !response.data) {
                return thunkAPI.rejectWithValue('Không có dữ liệu người dùng');
            }
            return response.data;
        } catch (err) {
            console.error("❌ fetchUserInfo error:", err); // ✅
            return thunkAPI.rejectWithValue('Không thể lấy thông tin người dùng');
        }
    }
);


// Đăng xuất
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    await AsyncStorage.removeItem('authToken');
    await SecureStore.deleteItemAsync('authToken'); // 👈 Thêm dòng này
    return true;
});


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
        setUser: (state, action: PayloadAction<UserInfo | null>) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Đăng nhập
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Lỗi không xác định';
            })

            // Lấy thông tin người dùng
            .addCase(fetchUserInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.user = {
                    fullName: action.payload.fullName,
                    email: action.payload.email,
                    studentCode: action.payload.studentCode,
                    studentClass: action.payload.studentClass,
                    role: action.payload.role,
                };
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.token = null;
                state.user = null;
                AsyncStorage.removeItem('authToken');
                SecureStore.deleteItemAsync('authToken'); // 👈 Xóa ở đây luôn cho chắc
                state.error = action.payload ?? 'Không thể lấy thông tin người dùng';
                AsyncStorage.removeItem('authToken'); // Xóa token nếu không lấy được user info
            })
            // Đăng xuất
            .addCase(logoutUser.fulfilled, (state) => {
                state.token = null;
                state.user = null;
                state.error = null;
            });
    },
});

// Export actions và reducer
export const { setToken, setUser } = authSlice.actions;
export default authSlice.reducer;
