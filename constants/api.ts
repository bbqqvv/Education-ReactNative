// export const API_BASE_URL = 'http://10.50.131.248:8080/api';
//   export const API_BASE_URL = 'http://localhost:8080/api';
export const API_BASE_URL = 'http://192.168.88.132:8080/api';


export const API_TIMEOUT = 15000;

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    FORGOT_PASSWORD: "/auth/forgot-password",
    VERIFY_OTP: "/auth/verify-otp",
    RESET_PASSWORD: "/auth/reset-password",
  },
  USER: {
    PROFILE: "/users/profile",
    CHANGE_PASSWORD: "/users/change-password",
    CLASSMATES: "/users/classmates",
    CLASS_TEACHERS: "/users/class/teachers",
    MY_CLASSES: "/users/my-classes",
    CLASS: "/users/class",
    CURRENT: "/users/current-user",
  },
  QUOTE: {
    ADD_OR_UPDATE: "/quotes/add-or-update",
    GET_QUOTE: "/quotes/random",
  },

  CHATROOM: {
    CREATE: "/chat-rooms",
    MY_ROOMS: "/chat-rooms/my",
  },
  CHATAI: {
    ASK: "/chatbot/ask",
  },
  EXAM: {
    CREATE: "/exams",
    UPDATE: (id: string) => `/exams/${id}`,
    DELETE: (id: string) => `/exams/${id}`,
    MY_SCHEDULE: "/exams/my",
    BY_CLASS: (className: string) => `/exams/class/${className}`,
  },
  VIOLATION: {
    ADD: "/violations",
    LIST: "/violations",
    DETAIL: (id: string) => `/violations/${id}`,
    DELETE: (id: string) => `/violations/${id}`,
    UPDATE: (id: string) => `/violations/${id}`,
    MY_VIOLATIONS: "/violations/me",
  },
  NEWSLETTER: {
    ADD_OR_UPDATE: "/newsletters/add-or-update",
    LIST: "/newsletters",
    DETAIL: (id: string) => `/newsletters/${id}`,
    DELETE: (id: string) => `/newsletters/remove/${id}`,
    GET_BY_CATEGORY: (category: string) => `/newsletters/category/${category}`,
    LIKE: (id: string) => `/newsletters/${id}/like`,
  },
  TIMETABLES: {
    GET_BY_CLASS: (className: string) => `/timetables/class/${className}`,
    CREATE: "/timetables",
    DELETE: (id: string) => `/timetables/${id}`,
    UPDATE: (id: string) => `/timetables/${id}`,
    GET_WEEKLY_SCHEDULE: (className: string) =>
      `/timetables/class/${className}/weekly`,
  },
  LEAVE_REQUESTS: {
    GET_ALL: "/leave-requests",
    GET_MY_REQUESTS: "/leave-requests/my", // Thêm endpoint mới
    GET_BY_ID: (id: string) => `/leave-requests/${id}`, // Sửa thành function để truyền id
    CREATE: "/leave-requests",
    UPDATE_STATUS: (id: string) => `/leave-requests/${id}/status`, // Sửa theo endpoint thực tế
    DELETE: (id: string) => `/leave-requests/${id}`, // Sửa thành function
  },
};
