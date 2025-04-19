// api/exam-schedule/exam-schedule.type.ts

export type ExamScheduleRequest = {
    subject: string;
    examDate: string; // ISO string, e.g. '2025-04-19'
    classId: string;
    className: string;
    startTime: string; // e.g. '08:00'
    endTime: string;   // e.g. '10:00'
    examRoom: string;
    teacherId: string;
    teacherName: string;
  }
  
  export type ExamScheduleResponse  = {
    id: string;
    subject: string;
    examDate: string; // ISO string
    startTime: string;
    endTime: string;
    examRoom: string;
    classInfo: {
      name: string;
    };
    teacher: {
      id: string;
      name: string;
    };
  }
  