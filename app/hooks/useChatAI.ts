import { useState } from 'react';
import { ChatAiApi } from '../api/bot/bot.service';
import { ChatBotRequest, ChatBotResponse } from '../api/bot/bot.type';

export const useChatAi = () => {
  const [response, setResponse] = useState<ChatBotResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const chatWithAi = async (data: ChatBotRequest) => {
    try {
      setLoading(true);
      setError(null);
      const result = await ChatAiApi.ChatAi(data);
      setResponse(result);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    chatWithAi,
    response,
    loading,
    error,
    reset: () => {
      setResponse(null);
      setError(null);
    },
  };
};