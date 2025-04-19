export type DayOfWeekEnum = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export type TimeTableRequest = {
    className: string;
    subject: string;
    teacherName: string;
    dayOfWeek: DayOfWeekEnum;
    period: number;
};

export type TimeTableResponse = {
    id: string;
    subject: string;
    teacherName: string;
    dayOfWeek: string;
    period: number;
};

export type DailyScheduleResponse = {
    dayOfWeek: string;
    date: string; 
    lessons: TimeTableResponse[];
};

export type WeeklyScheduleResponse = {
    className: string;
    weekStartDate: string;
    schedule: DailyScheduleResponse[];
};
