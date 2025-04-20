export type ViolationRequest = {
    userCode: string;
    role: UserType;
    description: string;
    level: ViolationLevel;
};
export type ViolationResponse = {
    id: string;
    userCode: string;
    violationCode: string;
    fullName: string;
    role: UserType;
    description: string;
    level: ViolationLevel;
    createdAt: string; // hoặc: Date nếu bạn parse về Date object
    createdBy: string;
};
export enum UserType {
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER',
}

export enum ViolationLevel {
    LIGHT = 'LIGHT',
    MEDIUM = 'MEDIUM',
    SEVERE = 'SEVERE',
}
