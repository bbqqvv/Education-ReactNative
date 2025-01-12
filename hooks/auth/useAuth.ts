import { useState, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "@/context/AuthContext";
import { LoginResponse } from "@/types/type";

const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const {
    user,
    token,
    login,
    register,
    logout,
    setUser,
    setToken,
    loading: contextLoading,
  } = authContext;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get token from SecureStore
  const getToken = async (): Promise<string | null> => {
    try {
      return await SecureStore.getItemAsync("authToken");
    } catch (err) {
      console.error("Failed to get token:", err);
      return null;
    }
  };

  const handleLogin = async (username: string, password: string): Promise<LoginResponse | void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await login(username, password);
      if (!response?.token) throw new Error("Invalid response");
      return response;
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (
    username: string,
    password: string,
    email: string
  ): Promise<LoginResponse | void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await register(username, password, email);
      return response;
    } catch (err) {
      console.error("Registration error:", err);
      setError("Registration failed. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const sendApiRequest = async (url: string, method: string) => {
    const token = await getToken();

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, { method, headers });
    if (response.status === 401) {
      console.error("Token expired or invalid. Please login again.");
    }
    return response.json();
  };

  return {
    user,
    token,
    loading: loading || contextLoading,
    error,
    handleLogin,
    handleRegister,
    logout,
    setUser,
    setToken,
  };
};

export default useAuth;
