import { useState, useEffect } from 'react';
import { ViolationResponse } from '../api/violation/violation.type';
import { ViolationApi } from '../api/violation/violation.service';

export const useViolations = () => {
    const [violations, setViolations] = useState<ViolationResponse[]>([]);
    const [selectedViolation, setSelectedViolation] = useState<ViolationResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchViolations = async () => {
        try {
            setLoading(true);
            const response = await ViolationApi.getAllViolations();
            setViolations(response.data?.items || []);
        } catch (err: any) {
            setError(err.message || 'Không thể tải danh sách vi phạm');
        } finally {
            setLoading(false);
        }
    };

    const fetchViolationById = async (id: string) => {
        try {
            setLoading(true);
            const response = await ViolationApi.getViolationById(id);
            setSelectedViolation(response.data || null);
        } catch (err: any) {
            setError(err.message || 'Không thể tải chi tiết vi phạm');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchViolations();
    }, []);

    return {
        violations,
        selectedViolation,
        loading,
        error,
        fetchViolations,
        fetchViolationById,
    };
};
