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
  import * as SecureStore from 'expo-secure-store';
  
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
      const token = await SecureStore.getItemAsync('authToken');
      const formData = new FormData();
    
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === 'imageFile' && typeof value === 'object' && value.uri) {
            formData.append(key, {
              uri: value.uri,
              name: value.name || 'image.jpg',
              type: value.type || 'image/jpeg',
            } as any);  // React Native FormData cần cast kiểu
          } 
          else if (key === 'fromDate' || key === 'toDate') {
            // Nếu là ngày, thì format chuẩn yyyy-MM-dd
            const dateStr = (typeof value === 'string') ? value : new Date(value).toISOString().split('T')[0];
            formData.append(key, dateStr);
          }
          else {
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
            'Authorization': `Bearer ${token}`,
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
   * Lấy danh sách đơn xin nghỉ của người dùng hiện tại
   */
  async getMyRequests(): Promise<LeaveRequestsResponse> {
    const response = await apiClient.get(API_ENDPOINTS.LEAVE_REQUESTS.GET_MY_REQUESTS);
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