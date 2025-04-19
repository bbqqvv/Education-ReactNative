export type ApiResponse<T> = {
    code?: number;
    success: boolean;
    message: string;
    data?: T;
};
// PaginatedResponse cho các response có phân trang
export interface PaginatedResponse<T> {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalElements: number;
    items: T[];
}
