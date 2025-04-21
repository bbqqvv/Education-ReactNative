
export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface UpdateProfileRequest {
    address?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    gender?: string;
    fatherName?: string;
    motherName?: string;
    fatherPhoneNumber?: string;
    motherPhoneNumber?: string;
}
export type UserResponse = {
    id: string;
    email: string;
    password: string;
    fullName: string;
    userCode: string;
    studentClass: string;
    teachingClasses: Set<string>; // or string[]
    role: string;
    profile?: UserProfileResponse;
    createdAt: string; // ISO format string, e.g., "2025-04-21T14:30:00Z"
    updatedAt: string; // ISO format string
};

export type UserProfileResponse = {
    id: string;
    userId: string;
    address?: string;
    phoneNumber?: string;
    dateOfBirth: string; // ISO formatted string, like "2001-12-31"
    gender?: string;
    nationality?: string;
    socialMediaLinks?: string;
    emergencyContact?: string;
    fatherName?: string;
    motherName?: string;
    fatherPhoneNumber?: string;
    motherPhoneNumber?: string;
};
