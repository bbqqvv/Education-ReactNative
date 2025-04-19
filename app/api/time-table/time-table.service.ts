// api/time-table/time-table.service.ts

import { ApiResponse } from '../api-response';
import { API_ENDPOINTS } from '@/constants/api';
import apiClient from '../apiClient';
import { TimeTableRequest, TimeTableResponse, WeeklyScheduleResponse } from './time-table.type';

export const TimeTableApi = {
    // Tạo mới thời khóa biểu
    async createTimeTable(data: TimeTableRequest): Promise<ApiResponse<TimeTableResponse>> {
        const response = await apiClient.post(API_ENDPOINTS.TIMETABLES.CREATE, data);
        return response.data;
    },

    // Lấy thời khóa biểu của lớp
    async getTimeTableByClass(className: string): Promise<ApiResponse<TimeTableResponse[]>> {
        const response = await apiClient.get(API_ENDPOINTS.TIMETABLES.GET_BY_CLASS(className));
        return response.data;
    },

    // Lấy thời khóa biểu của người dùng hiện tại
    async getMyTimeTable(): Promise<ApiResponse<TimeTableResponse[]>> {
        // Lấy lớp của người dùng từ endpoint /users/current-user
        const userResponse = await apiClient.get(API_ENDPOINTS.USER.CURRENT);
        const className = userResponse.data.className;  // Giả sử response trả về có className
        const response = await apiClient.get(API_ENDPOINTS.TIMETABLES.GET_BY_CLASS(className));
        return response.data;
    },

    // Cập nhật thời khóa biểu
    async updateTimeTable(id: string, data: TimeTableRequest): Promise<ApiResponse<TimeTableResponse>> {
        const response = await apiClient.put(API_ENDPOINTS.TIMETABLES.UPDATE(id), data);
        return response.data;
    },

    // Xóa thời khóa biểu
    async deleteTimeTable(id: string): Promise<ApiResponse<void>> {
        const response = await apiClient.delete(API_ENDPOINTS.TIMETABLES.DELETE(id));
        return response.data;
    },

    // Lấy thời khóa biểu theo tuần
    async getWeeklySchedule(className: string, weekStartDate: string): Promise<ApiResponse<WeeklyScheduleResponse>> {
        const url = `${API_ENDPOINTS.TIMETABLES.GET_WEEKLY_SCHEDULE(className)}?weekStart=${weekStartDate}`;
        const response = await apiClient.get(url);
        return response.data;
    },
};
