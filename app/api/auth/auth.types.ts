export type UserCreationRequest = {
    fullName: string;
    email: string;
    password: string;
    studentCode: string;
    studentClass: string;
    teachingClasses: Set<string>; // hoặc string[] nếu bạn không cần Set
    role: string;
};

export type AuthenticationRequest = {
    email: string;
    password: string;
};

export type OtpRequest = {
    email: string;
};

export type OtpVerificationRequest = {
    email: string;
    otp: string;
};

export type ResetPasswordRequest = {
    email: string;
    newPassword: string;
    confirmPassword: string;
};


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

export type JwtResponse = {
    token: string;
};

export type OtpResponse = {
    message: string;
    email: string;
};

export type OtpVerificationResponse = {
    message: string;
    success: boolean;
};

export type ResetPasswordResponse = {
    message: string;
    success: boolean;
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
