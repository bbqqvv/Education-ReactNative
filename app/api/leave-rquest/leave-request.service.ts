// leave-request.service.ts
import { 
    LeaveRequest, 
    CreateLeaveRequestRequest, 
    UpdateLeaveRequestStatusRequest,
    LeaveRequestsResponse,
    LeaveRequestResponse
  } from './leave-request.type';
  import { API_ENDPOINTS } from '@/constants/api';
  import apiClient from '../apiClient';
  
  export const LeaveRequestApi = {
    /**
     * Lấy danh sách tất cả đơn xin nghỉ
     */
    async getAll(): Promise<LeaveRequestsResponse> {
      const response = await apiClient.get(API_ENDPOINTS.LEAVE_REQUESTS.GET_ALL);
      return response.data;
    },
  
    /**
     * Tạo đơn xin nghỉ mới
     */
    async create(data: CreateLeaveRequestRequest): Promise<LeaveRequestResponse> {
      const formData = new FormData();
      
      // Append các trường dữ liệu
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          // Xử lý đặc biệt cho file ảnh
          if (key === 'imageFile' && value instanceof File) {
            formData.append(key, value, value.name);
          } else {
            formData.append(key, value.toString());
          }
        }
      });
  
      const response = await apiClient.post(
        API_ENDPOINTS.LEAVE_REQUESTS.CREATE, 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    },
  
    /**
     * Cập nhật trạng thái đơn xin nghỉ
     */
    async updateStatus(
      id: string, 
      data: UpdateLeaveRequestStatusRequest
    ): Promise<LeaveRequestResponse> {
      const response = await apiClient.patch(
        `${API_ENDPOINTS.LEAVE_REQUESTS.UPDATE_STATUS}/${id}`,
        data
      );
      return response.data;
    },
  
    /**
     * Xóa đơn xin nghỉ
     */
    async delete(id: string): Promise<void> {
      await apiClient.delete(`${API_ENDPOINTS.LEAVE_REQUESTS.DELETE}/${id}`);
    },
  
    /**
     * Lấy chi tiết một đơn xin nghỉ
     */
    async getById(id: string): Promise<LeaveRequestResponse> {
      const response = await apiClient.get(
        `${API_ENDPOINTS.LEAVE_REQUESTS.GET_BY_ID}/${id}`
      );
      return response.data;
    }
  };