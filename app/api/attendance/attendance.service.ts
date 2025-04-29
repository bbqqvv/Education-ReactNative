// attendance.service.ts
import { AttendanceRequest, AttendanceResponse } from './attendance.types';
import { ApiResponse } from '../api-response';
import { API_ENDPOINTS } from '@/constants/api';
import apiClient from '../apiClient';

export const AttendanceService = {
    async recordAttendance(data: AttendanceRequest): Promise<ApiResponse<AttendanceResponse>> {
        const response = await apiClient.post(API_ENDPOINTS.ATTENDANCE.RECORD, data);
        return response.data;
    },

    async bulkRecordAttendance(data: AttendanceRequest[]): Promise<ApiResponse<AttendanceResponse[]>> {
        const response = await apiClient.post(API_ENDPOINTS.ATTENDANCE.BULK_RECORD, data);
        return response.data;
    },

    async getAttendanceByClass(className: string): Promise<ApiResponse<AttendanceResponse[]>> {
        const response = await apiClient.get(`${API_ENDPOINTS.ATTENDANCE.GET_BY_CLASS}/${encodeURIComponent(className)}`);
        return response.data;
    },

    async getAttendanceByStudent(studentId: string): Promise<ApiResponse<AttendanceResponse[]>> {
        const response = await apiClient.get(`${API_ENDPOINTS.ATTENDANCE.GET_BY_STUDENT}/${encodeURIComponent(studentId)}`);
        return response.data;
    },

    async getAttendanceByDateRange(startDate: string, endDate: string): Promise<ApiResponse<AttendanceResponse[]>> {
        const response = await apiClient.get(API_ENDPOINTS.ATTENDANCE.GET_BY_DATE_RANGE, {
            params: {
                startDate,
                endDate,
            },
        });
        return response.data;
    },
};
