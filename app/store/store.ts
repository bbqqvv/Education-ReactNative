import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './slices/authSlice';

// Gộp các reducer (chuẩn bị cho mở rộng)
const rootReducer = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], // Chỉ persist auth (sau này thêm gì thì bỏ vào đây)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Cần khi dùng redux-persist
    }),
});

// Export kiểu type để dùng cho hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
