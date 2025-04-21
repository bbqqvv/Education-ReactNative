// api/user/user.service.ts

import { ApiResponse } from "../api-response";
import { API_ENDPOINTS } from "@/constants/api";
import {
  ChangePasswordRequest,
  UpdateProfileRequest,
  UserResponse,
} from "./user.type";
import apiClient from "../apiClient";

export const UserApi = {
  /**
   * Cập nhật thông tin cá nhân (profile)
   */
  async updateProfile(
    data: UpdateProfileRequest
  ): Promise<ApiResponse<UserResponse>> {
    const response = await apiClient.put(API_ENDPOINTS.USER.PROFILE, data);
    return response.data;
  },

  /**
   * Đổi mật khẩu
   */
  async changePassword(
    data: ChangePasswordRequest
  ): Promise<ApiResponse<string>> {
    const response = await apiClient.put(API_ENDPOINTS.USER.CHANGE_PASSWORD, data);
    return response.data;
  },

  /**
   * Lấy thông tin người dùng hiện tại
   */
  async getCurrentUser(): Promise<ApiResponse<UserResponse>> {
    const response = await apiClient.get(API_ENDPOINTS.USER.CURRENT);
    return response.data;
  },

  /**
   * Lấy danh sách bạn học cùng lớp (STUDENT)
   */
  async getClassmates(): Promise<ApiResponse<UserResponse[]>> {
    const response = await apiClient.get(API_ENDPOINTS.USER.CLASSMATES);
    return response.data;
  },

  /**
   * Lấy danh sách giáo viên dạy lớp của học sinh (STUDENT)
   */
  async getTeachersForMyClass(): Promise<ApiResponse<UserResponse[]>> {
    const response = await apiClient.get(API_ENDPOINTS.USER.CLASS_TEACHERS);
    return response.data;
  },

  /**
   * Lấy danh sách lớp giáo viên đang dạy (TEACHER)
   */
  async getMyClasses(): Promise<ApiResponse<Set<string>>> {
    const response = await apiClient.get(API_ENDPOINTS.USER.MY_CLASSES);
    return response.data;
  },

  /**
   * Lấy danh sách học sinh trong một lớp (TEACHER)
   */
  async getStudentsInClass(
    className: string
  ): Promise<ApiResponse<UserResponse[]>> {
    const response = await apiClient.get(
      API_ENDPOINTS.USER.CLASS_STUDENTS(className)
    );
    return response.data;
  },

  /**
   * Lấy tất cả người dùng (ADMIN)
   */
  async getAllUsers(): Promise<ApiResponse<UserResponse[]>> {
    const response = await apiClient.get(API_ENDPOINTS.USER.GET_ALL);
    return response.data;
  },

  /**
   * Xoá người dùng theo ID (ADMIN)
   */
  async deleteUser(id: string): Promise<ApiResponse<string>> {
    const response = await apiClient.delete(API_ENDPOINTS.USER.DELETE(id));
    return response.data;
  },
};
