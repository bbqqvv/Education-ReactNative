// api/newsletter/newsletter.service.ts

import { ApiResponse, PaginatedResponse } from '../api-response';
import { API_ENDPOINTS } from '@/constants/api';
import apiClient from '../apiClient';
import { NewsletterLikeResponse, NewsletterRequest, NewsletterResponse } from './newsletter.type';

export const NewsletterApi = {
    // Thêm hoặc cập nhật bài viết newsletter
    async addOrUpdateNewsletter(data: NewsletterRequest): Promise<ApiResponse<NewsletterResponse>> {
        const response = await apiClient.post(API_ENDPOINTS.NEWSLETTER.ADD_OR_UPDATE, data);
        return response.data;
    },

    // Lấy danh sách newsletter phân trang
    async getAllNewsletters(params?: any): Promise<ApiResponse<PaginatedResponse<NewsletterResponse>>> {
        const response = await apiClient.get(API_ENDPOINTS.NEWSLETTER.LIST, { params });
        return response.data;
    },

    // Lấy chi tiết một bài viết
    async getNewsletterById(id: string): Promise<ApiResponse<NewsletterResponse>> {
        const response = await apiClient.get(API_ENDPOINTS.NEWSLETTER.DETAIL(id));
        return response.data;
    },

    // Xoá một newsletter
    async deleteNewsletter(id: string): Promise<ApiResponse<string>> {
        const response = await apiClient.delete(API_ENDPOINTS.NEWSLETTER.DELETE(id));
        return response.data;
    },

    // Lấy bài viết theo danh mục
    async getByCategory(category: string, params?: any): Promise<ApiResponse<PaginatedResponse<NewsletterResponse>>> {
        const response = await apiClient.get(API_ENDPOINTS.NEWSLETTER.GET_BY_CATEGORY(category), { params });
        return response.data;
    },

    // Like bài viết newsletter
    async likeNewsletter(id: string): Promise<ApiResponse<NewsletterLikeResponse>> {
        const response = await apiClient.patch(API_ENDPOINTS.NEWSLETTER.LIKE(id));
        return response.data;
    }
};
