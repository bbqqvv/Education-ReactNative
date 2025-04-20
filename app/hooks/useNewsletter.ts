import { useState, useEffect } from 'react';
import { NewsletterResponse } from '../api/newsletter/newsletter.type';
import { NewsletterApi } from '../api/newsletter/newsletter.service';

export const useNewsletter = (id?: string) => {
  const [newsletters, setNewsletters] = useState<NewsletterResponse[]>([]);
  const [newsletter, setNewsletter] = useState<NewsletterResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all newsletters
  useEffect(() => {
    if (!id) {
      const fetchNewsletters = async () => {
        try {
          setLoading(true);
          const response = await NewsletterApi.getAllNewsletters();
          setNewsletters(response.data?.items || []);
        } catch (err: any) {
          setError(err.message || 'Không thể lấy danh sách bản tin');
        } finally {
          setLoading(false);
        }
      };

      fetchNewsletters();
    }
  }, [id]);

  // Fetch detail if id is provided
  useEffect(() => {
    if (id) {
      const fetchNewsletterDetail = async () => {
        try {
          setLoading(true);
          const response = await NewsletterApi.getNewsletterById(id);
          setNewsletter(response.data || null);
        } catch (err: any) {
          setError(err.message || 'Không thể lấy chi tiết bản tin');
        } finally {
          setLoading(false);
        }
      };

      fetchNewsletterDetail();
    }
  }, [id]);

  return {
    newsletters,
    newsletter,
    loading,
    error,
  };
};
