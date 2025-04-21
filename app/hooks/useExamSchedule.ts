import { useState, useEffect } from 'react';
import { ExamScheduleApi } from '../api/exam-schedule/exam-schedule.service';
import { ExamScheduleResponse } from '../api/exam-schedule/exam-schedule.type';

export const useExamSchedule = () => {
    const [examSchedules, setExamSchedules] = useState<ExamScheduleResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchExamSchedules = async () => {
        try {
            setLoading(true);
            const response = await ExamScheduleApi.getMySchedule();
            setExamSchedules(response.data || []);
        } catch (err: any) {
            setError(err.message || 'Không thể tải lịch thi');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExamSchedules();
    }, []);

    return { examSchedules, loading, error, fetchExamSchedules };
};