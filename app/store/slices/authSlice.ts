import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthenticationRequest, JwtResponse } from '@/app/api/auth/auth.types';
import { AuthApi } from '@/app/api/auth/auth.service';
import { UserApi } from '@/app/api/user/user.service';
import { UserResponse } from '@/app/api/user/user.type';

// Redux state type
type AuthState = {
    token: string | null;
    user: UserResponse | null;
    loading: boolean;
    error: string | null;
};

// Initial state
const initialState: AuthState = {
    token: null,
    user: null,
    loading: false,
    error: null,
};

// Async thunk: login
export const loginUser = createAsyncThunk<JwtResponse, AuthenticationRequest, { rejectValue: string }>(
    'auth/loginUser',
    async (data, thunkAPI) => {
        try {
            const response = await AuthApi.login(data);
            await AsyncStorage.setItem('authToken', response.token);
            return response;
        } catch (err) {
            console.error("Login error:", err);
            return thunkAPI.rejectWithValue("Đăng nhập thất bại");
        }
    }
);

// Async thunk: fetch current user
export const fetchUserInfo = createAsyncThunk<UserResponse, void, { rejectValue: string }>(
    'auth/fetchUserInfo',
    async (_, thunkAPI) => {
        try {
            const response = await UserApi.getCurrentUser();
            if (!response || !response.data) {
                return thunkAPI.rejectWithValue("Không có dữ liệu người dùng");
            }
            return response.data;
        } catch (err) {
            console.error("Fetch user error:", err);
            return thunkAPI.rejectWithValue("Không thể lấy thông tin người dùng");
        }
    }
);

// Async thunk: logout
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    await AsyncStorage.removeItem('authToken');
    return true;
});

// Create slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
        setUser: (state, action: PayloadAction<UserResponse | null>) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
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
                state.error = action.payload ?? "Lỗi không xác định";
            })

            .addCase(fetchUserInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.token = null;
                state.user = null;
                AsyncStorage.removeItem('authToken');
                state.error = action.payload ?? "Không thể lấy thông tin người dùng";
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.token = null;
                state.user = null;
                state.error = null;
            });
    },
});

// Export actions & reducer
export const { setToken, setUser } = authSlice.actions;
export default authSlice.reducer;
