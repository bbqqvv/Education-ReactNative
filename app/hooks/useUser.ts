// hooks/useUser.ts

import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { ChangePasswordRequest, UpdateProfileRequest, UserResponse } from "../api/user/user.type";
import { UserApi } from "../api/user/user.service";

export const useUser = () => {
    const [currentUser, setCurrentUser] = useState<UserResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Lấy thông tin người dùng hiện tại
    const fetchCurrentUser = useCallback(async () => {
        try {
            setLoading(true);
            const res = await UserApi.getCurrentUser();
            setCurrentUser(res.data || null);
            setError(null);
        } catch (err) {
            setError("Không thể tải thông tin người dùng");
            Alert.alert("Lỗi", "Không thể tải thông tin người dùng");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCurrentUser();
    }, [fetchCurrentUser]);

    // Cập nhật hồ sơ
    const updateProfile = async (data: UpdateProfileRequest) => {
        try {
            const res = await UserApi.updateProfile(data);
            setCurrentUser(res.data || null);
            Alert.alert("Thành công", "Cập nhật hồ sơ thành công!");
        } catch (err) {
            Alert.alert("Lỗi", "Không thể cập nhật hồ sơ");
        }
    };

    // Đổi mật khẩu
    const changePassword = async (data: ChangePasswordRequest) => {
        try {
            const res = await UserApi.changePassword(data);
            Alert.alert("Thành công", res.data || "Đổi mật khẩu thành công");
        } catch (err) {
            Alert.alert("Lỗi", "Không thể đổi mật khẩu");
        }
    };

    // Lấy danh sách bạn cùng lớp
    const getClassmates = async (): Promise<UserResponse[]> => {
        try {
            const res = await UserApi.getClassmates();
            return res.data || [];
        } catch (err) {
            Alert.alert("Lỗi", "Không thể lấy danh sách bạn cùng lớp");
            return [];
        }
    };

    // Lấy danh sách giáo viên lớp của mình
    const getTeachersForMyClass = async (): Promise<UserResponse[]> => {
        try {
            const res = await UserApi.getTeachersForMyClass();
            return res.data || [];
        } catch (err) {
            Alert.alert("Lỗi", "Không thể lấy danh sách giáo viên");
            return [];
        }
    };

    // Lấy danh sách lớp đang dạy
    const getMyClasses = async () => {
        try {
            const res = await UserApi.getMyClasses();
            return Array.from(res.data || []);
        } catch (err) {
            Alert.alert("Lỗi", "Không thể lấy danh sách lớp đang dạy");
            return [];
        }
    };

    // Lấy danh sách học sinh của lớp
    const getStudentsInClass = async (className: string): Promise<UserResponse[]> => {
        try {
            const res = await UserApi.getStudentsInClass(className);
            return res.data || [];
        } catch (err) {
            Alert.alert("Lỗi", "Không thể lấy danh sách học sinh");
            return [];
        }
    };

    return {
        currentUser,
        loading,
        error,
        refresh: fetchCurrentUser,
        updateProfile,
        changePassword,
        getClassmates,
        getTeachersForMyClass,
        getMyClasses,
        getStudentsInClass,
    };
};
