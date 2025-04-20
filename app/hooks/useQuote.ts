// app/hooks/useQuote.ts
import { useState, useCallback } from "react";
import { QuoteApi } from "../api/quote/quote.service";
import { QuoteResponse } from "../api/quote/quote.type";

export const useQuote = () => {
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomQuote = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await QuoteApi.getRandomQuote();
      setQuote(data);
    } catch (err: any) {
      console.error("Lỗi fetch quote:", err);
      setError("Không thể tải trích dẫn.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { quote, loading, error, fetchRandomQuote };
};
