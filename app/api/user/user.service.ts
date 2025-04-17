import axios from 'axios';
import { ApiResponse } from '../api-response';
import { API_BASE_URL, API_ENDPOINTS } from '@/constants/api';
import { ChangePasswordRequest, UpdateProfileRequest, UserResponse } from './user.type';

// Tạo một instance của axios
const userApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

export const UserApi = {
  // Cập nhật thông tin profile người dùng
  async updateProfile(data: UpdateProfileRequest): Promise<ApiResponse<UserResponse>> {
    const response = await userApi.put(API_ENDPOINTS.USER.PROFILE, data);
    return response.data;
  },

  // Đổi mật khẩu người dùng
  async changePassword(data: ChangePasswordRequest): Promise<ApiResponse<string>> {
    const response = await userApi.put(API_ENDPOINTS.USER.CHANGE_PASSWORD, data);
    return response.data;
  },

  async getCurrentUser(): Promise<ApiResponse<UserResponse>> {
    const response = await userApi.get(API_ENDPOINTS.USER.CURRENT);
    return response.data;
  },

  // Lấy danh sách bạn cùng lớp
  async getClassmates(): Promise<ApiResponse<UserResponse[]>> {
    const response = await userApi.get(API_ENDPOINTS.USER.CLASSMATES);
    return response.data;
  },

  // Lấy danh sách giáo viên của lớp học
  async getTeachersForMyClass(): Promise<ApiResponse<UserResponse[]>> {
    const response = await userApi.get(API_ENDPOINTS.USER.CLASS_TEACHERS);
    return response.data;
  },

  // Lấy danh sách các lớp mà giáo viên đang giảng dạy
  async getMyClasses(): Promise<ApiResponse<Set<string>>> {
    const response = await userApi.get(API_ENDPOINTS.USER.MY_CLASSES);
    return response.data;
  },

  // Lấy danh sách học sinh trong lớp học (dành cho giáo viên)
  async getStudentsInClass(className: string): Promise<ApiResponse<UserResponse[]>> {
    const response = await userApi.get(`${API_ENDPOINTS.USER.CLASS}/${className}/students`);
    return response.data;
  },
};
