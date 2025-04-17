
export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface UpdateProfileRequest {
    address: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
    fatherName: string;
    motherName: string;
    fatherPhoneNumber: string;
    motherPhoneNumber: string;
}
export type UserResponse = {
    id: string;
    email: string;
    password: string;
    fullName: string;
    studentCode: string;
    studentClass: string;
    teachingClasses: Set<string>; // hoặc string[]
    role: string;
    profile?: UserProfileResponse;
    createdAt: string; // ISO string format
    updatedAt: string;
};

export type UserProfileResponse = {
    id: string;
    userId: string;
    address: string;
    phoneNumber: string;
    dateOfBirth: string; // ISO date string, ví dụ "2001-12-31"
    gender: string;
    nationality: string;
    socialMediaLinks: string;
    emergencyContact: string;
    fatherName: string;
    motherName: string;
    fatherPhoneNumber: string;
    motherPhoneNumber: string;
};
