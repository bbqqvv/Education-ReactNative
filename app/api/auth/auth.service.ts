import { AuthenticationRequest, JwtResponse, OtpRequest, OtpResponse, OtpVerificationRequest, OtpVerificationResponse, ResetPasswordRequest, ResetPasswordResponse, UserCreationRequest, UserResponse } from './auth.types';
import { ApiResponse } from '../api-response';
import { API_ENDPOINTS } from '@/constants/api';
import apiClient from '../apiClient';


export const AuthApi = {
    // async register(data: UserCreationRequest): Promise<UserResponse> {
    //     const response = await authApi.post(API_ENDPOINTS.AUTH.REGISTER, data);
    //     return response.data;
    // },

    async login(data: AuthenticationRequest): Promise<JwtResponse> {
        const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, data);
        return response.data;
    },

    async forgotPassword(data: OtpRequest): Promise<ApiResponse<OtpResponse>> {
        const response = await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
        return response.data;
    },

    async verifyOtp(data: OtpVerificationRequest): Promise<ApiResponse<OtpVerificationResponse>> {
        const response = await apiClient.post(API_ENDPOINTS.AUTH.VERIFY_OTP, data);
        return response.data;
    },

    async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<ResetPasswordResponse>> {
        const response = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
        return response.data;
    },
};