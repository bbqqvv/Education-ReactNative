import { API_ENDPOINTS } from "@/constants/api";
import apiClient from "../apiClient";
import { QuoteRequest, QuoteResponse } from "./quote.type";

export const QuoteApi = {

    async addOrUpdateQuote(data: QuoteRequest): Promise<QuoteResponse> {
        const response = await apiClient.post(
            API_ENDPOINTS.QUOTE.ADD_OR_UPDATE,
            data
        );
        return response.data;
    },
    async getRandomQuote(): Promise<QuoteResponse> {
        const response = await apiClient.get(API_ENDPOINTS.QUOTE.GET_QUOTE);
        return response.data.data;
    },
};
