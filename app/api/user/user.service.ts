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
  async updateProfile(
    data: UpdateProfileRequest
  ): Promise<ApiResponse<UserResponse>> {
    const response = await apiClient.put(API_ENDPOINTS.USER.PROFILE, data);
    return response.data;
  },

  async changePassword(
    data: ChangePasswordRequest
  ): Promise<ApiResponse<string>> {
    const response = await apiClient.put(
      API_ENDPOINTS.USER.CHANGE_PASSWORD,
      data
    );
    return response.data;
  },

  async getCurrentUser(): Promise<ApiResponse<UserResponse>> {
    const response = await apiClient.get(API_ENDPOINTS.USER.CURRENT);
    return response.data;
  },

  async getClassmates(): Promise<ApiResponse<UserResponse[]>> {
    const response = await apiClient.get(API_ENDPOINTS.USER.CLASSMATES);
    return response.data;
  },

  async getTeachersForMyClass(): Promise<ApiResponse<UserResponse[]>> {
    const response = await apiClient.get(API_ENDPOINTS.USER.CLASS_TEACHERS);
    return response.data;
  },

  async getMyClasses(): Promise<ApiResponse<Set<string>>> {
    const response = await apiClient.get(API_ENDPOINTS.USER.MY_CLASSES);
    return response.data;
  },

  async getStudentsInClass(
    className: string
  ): Promise<ApiResponse<UserResponse[]>> {
    const response = await apiClient.get(
      `${API_ENDPOINTS.USER.CLASS}/${className}/students`
    );
    return response.data;
  },
};
