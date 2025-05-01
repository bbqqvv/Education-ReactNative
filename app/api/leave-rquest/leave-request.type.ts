// leave-request.types.ts
import { ApiResponse } from '../api-response';

export enum LeaveRequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED"
}
// Đơn xin nghỉ
export interface LeaveRequest {
  id: string;
  senderName: string;
  recipient: string;
  reason: string;
  className: string;
  imageFile: string | null;
  fromDate: string;
  toDate: string;
  status: LeaveRequestStatus;
  createdAt: string;
}
// Tạo đơn xin nghỉ
export interface CreateLeaveRequestRequest {
  senderName: string;
  recipient: string;
  reason: string;
  className: string;
  imageFile?: File | null;
  fromDate: string;
  toDate: string;
}
//cật nhật trạng thái đơn xin nghỉ
export interface UpdateLeaveRequestStatusRequest {
  status: LeaveRequestStatus;
  rejectedReason?: string;
}

// Response types
export type LeaveRequestsResponse = ApiResponse<LeaveRequest[]>;
export type LeaveRequestResponse = ApiResponse<LeaveRequest>;


