// api/chat-room/chat-room.service.ts

import { ApiResponse } from "../api-response";
import { API_ENDPOINTS } from "@/constants/api";
import apiClient from "../apiClient";
import { ChatRoomRequest, ChatRoomResponse } from "./room.type";

export const RoomApi = {
  async createRoom(
    data: ChatRoomRequest
  ): Promise<ApiResponse<ChatRoomResponse>> {
    const response = await apiClient.post(API_ENDPOINTS.CHATROOM.CREATE, data);
    return response.data;
  },

  async getMyRooms(): Promise<ApiResponse<ChatRoomResponse[]>> {
    const response = await apiClient.post(API_ENDPOINTS.CHATROOM.MY_ROOMS);
    return response.data;
  },
};
