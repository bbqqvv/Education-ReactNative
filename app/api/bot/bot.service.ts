import { API_ENDPOINTS } from "@/constants/api";
import apiClient from "../apiClient";
import { ChatBotRequest, ChatBotResponse } from "./bot.type";

export const ChatAiApi = {
    async ChatAi(data: ChatBotRequest): Promise<ChatBotResponse> {
        const response = await apiClient.post(API_ENDPOINTS.CHATAI.ASK, data);
        return response.data;
    },
};