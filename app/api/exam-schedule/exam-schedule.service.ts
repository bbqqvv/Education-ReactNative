// api/exam-schedule/exam-schedule.service.ts

import { API_ENDPOINTS } from '@/constants/api';
import apiClient from '../apiClient';
import { ApiResponse } from '../api-response';
import {
    ExamScheduleRequest,
    ExamScheduleResponse
} from './exam-schedule.type';

export const ExamScheduleApi = {
    async create(data: ExamScheduleRequest): Promise<ApiResponse<ExamScheduleResponse>> {
        const res = await apiClient.post(API_ENDPOINTS.EXAM.CREATE, data);
        return res.data;
    },

    async update(id: string, data: ExamScheduleRequest): Promise<ApiResponse<ExamScheduleResponse>> {
        const res = await apiClient.put(API_ENDPOINTS.EXAM.UPDATE(id), data);
        return res.data;
    },

    async getMySchedule(): Promise<ApiResponse<ExamScheduleResponse[]>> {
        const res = await apiClient.get(API_ENDPOINTS.EXAM.MY_SCHEDULE);
        return res.data;
    },

    async getByClass(className: string): Promise<ApiResponse<ExamScheduleResponse[]>> {
        const res = await apiClient.get(API_ENDPOINTS.EXAM.BY_CLASS(className));
        return res.data;
    },

    async delete(id: string): Promise<ApiResponse<void>> {
        const res = await apiClient.delete(API_ENDPOINTS.EXAM.DELETE(id));
        return res.data;
    }
};
