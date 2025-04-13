import axios, { AxiosError, AxiosResponse } from "axios";
import { LoginResponse } from "@/types/type";

const api = axios.create({
  baseURL: "http://192.168.1.3:8080/auth",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const sendRequest = async (
  endpoint: string,
  data: { email: string; password: string; username?: string }
): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await api.post(endpoint, data);
    if (!response.data) throw new Error("No data received from the server.");
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const errorMessage =
      (axiosError.response?.data as { message: string })?.message || "Request failed. Please try again.";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
};

// Hàm đăng nhập bằng email
export const loginUser = (email: string, password: string): Promise<LoginResponse> => {
  return sendRequest("/login", { email, password });
};

// Hàm đăng ký 
export const registerUser = (
  username: string,
  password: string,
  email: string
): Promise<LoginResponse> => {
  return sendRequest("/register", { username, password, email });
};