// attendance.types.ts

// Kiểu cho trạng thái điểm danh
export type RecordStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';

export interface AttendanceRequest {
    userCode: string;       // Mã người dùng
    status: RecordStatus;   // Trạng thái điểm danh
    date: string;           // Ngày điểm danh (ISO string format)
}

export interface AttendanceResponse {
    id: string;             // ID bản ghi điểm danh
    className: string;      // Tên lớp học
    studentId: string;     // ID học sinh
    studentName: string;    // Tên học sinh
    status: string;         // Trạng thái điểm danh (có thể dùng RecordStatus nếu backend trả về đúng enum)
    date: string;           // Ngày điểm danh (ISO string format)
    createdDate: string;    // Ngày tạo bản ghi (ISO string format)
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}