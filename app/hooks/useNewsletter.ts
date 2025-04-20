import { useState, useEffect } from 'react';
import { NewsletterResponse } from '../api/newsletter/newsletter.type';
import { NewsletterApi } from '../api/newsletter/newsletter.service';

export const useNewsletter = (id?: string) => {
  const [newsletters, setNewsletters] = useState<NewsletterResponse[]>([]);
  const [newsletter, setNewsletter] = useState<NewsletterResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchNewsletters = async () => {
    try {
      setLoading(true);
      const response = await NewsletterApi.getAllNewsletters();
      setNewsletters(response.data?.items || []);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Không thể lấy danh sách bản tin');
    } finally {
      setLoading(false);
    }
  };

  const fetchNewsletterDetail = async (newsletterId: string) => {
    try {
      setLoading(true);
      const response = await NewsletterApi.getNewsletterById(newsletterId);
      setNewsletter(response.data || null);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Không thể lấy chi tiết bản tin');
    } finally {
      setLoading(false);
    }
  };

  const refreshNewsletters = async () => {
    try {
      setRefreshing(true);
      const response = await NewsletterApi.getAllNewsletters();
      setNewsletters(response.data?.items || []);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Không thể làm mới danh sách bản tin');
    } finally {
      setRefreshing(false);
    }
  };

  // Fetch all newsletters
  useEffect(() => {
    if (!id) {
      fetchNewsletters();
    }
  }, [id]);

  // Fetch detail if id is provided
  useEffect(() => {
    if (id) {
      fetchNewsletterDetail(id);
    }
  }, [id]);

  return {
    newsletters,
    newsletter,
    loading,
    error,
    refreshing,
    refreshNewsletters,
  };
};