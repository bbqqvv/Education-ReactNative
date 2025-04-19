// api/violation/violation.service.ts

import { ApiResponse, PaginatedResponse } from '../api-response';
import { API_ENDPOINTS } from '@/constants/api';
import apiClient from '../apiClient';
import { ViolationRequest, ViolationResponse } from './violation.type';

export const ViolationApi = {
    async addViolation(data: ViolationRequest): Promise<ApiResponse<ViolationResponse>> {
        const response = await apiClient.post(API_ENDPOINTS.VIOLATION.ADD, data);
        return response.data;
    },

    async getAllViolations(params?: any): Promise<ApiResponse<PaginatedResponse<ViolationResponse>>> {
        const response = await apiClient.get(API_ENDPOINTS.VIOLATION.LIST, { params });
        return response.data;
    },

    async getViolationById(id: string): Promise<ApiResponse<ViolationResponse>> {
        const response = await apiClient.get(API_ENDPOINTS.VIOLATION.DETAIL(id)); // Dùng hàm DETAIL truyền id vào
        return response.data;
    },

    async deleteViolation(id: string): Promise<ApiResponse<string>> {
        const response = await apiClient.delete(API_ENDPOINTS.VIOLATION.DELETE(id)); // Dùng hàm DELETE truyền id vào
        return response.data;
    },

    async updateViolation(id: string, data: ViolationRequest): Promise<ApiResponse<ViolationResponse>> {
        const response = await apiClient.put(API_ENDPOINTS.VIOLATION.UPDATE(id), data); // Dùng hàm UPDATE truyền id vào
        return response.data;
    },

    async getMyViolations(params?: any): Promise<ApiResponse<PaginatedResponse<ViolationResponse>>> {
        const response = await apiClient.get(API_ENDPOINTS.VIOLATION.MY_VIOLATIONS, { params });
        return response.data;
    },
};
