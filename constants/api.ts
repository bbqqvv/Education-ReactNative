export const API_BASE_URL = 'http://192.168.1.4:8080/api';
export const API_TIMEOUT = 15000;

export const API_ENDPOINTS = {
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        FORGOT_PASSWORD: '/auth/forgot-password',
        VERIFY_OTP: '/auth/verify-otp',
        RESET_PASSWORD: '/auth/reset-password',
    },
    USER: {
        PROFILE: '/users/profile',
        CHANGE_PASSWORD: '/users/change-password',
        CLASSMATES: '/users/classmates',
        CLASS_TEACHERS: '/users/class/teachers',
        MY_CLASSES: '/users/my-classes',
        CLASS: '/users/class',
        CURRENT: '/users/current-user',
    },
};