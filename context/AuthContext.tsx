import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import * as SecureStore from "expo-secure-store";
import { Text } from "react-native";
import { loginUser, registerUser } from "@/services/authServices";
import { LoginResponse } from "@/types/type";

interface AuthContextType {
  user: LoginResponse["user"] | null;
  token: string | null;
  login: (username: string, password: string) => Promise<LoginResponse>;
  register: (username: string, password: string, email: string) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<LoginResponse["user"] | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<LoginResponse["user"] | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const restoreToken = async () => {
      try {
        const storedToken = await SecureStore.getItemAsync("authToken");
        if (storedToken) {
          setToken(storedToken);
        }
      } catch (err) {
        console.error("Failed to restore token:", err);
      } finally {
        setLoading(false);
      }
    };

    restoreToken();
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true);
    try {
      const data = await loginUser(username, password);
      if (!data?.token) throw new Error("Token not found in response");

      setToken(data.token);
      setUser(data.user);
      await SecureStore.setItemAsync("authToken", data.token);
      return data;
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (username: string, password: string, email: string) => {
    setLoading(true);
    try {
      const data = await registerUser(username, password, email);
      if (!data?.token) throw new Error("Token not found in response");

      setToken(data.token);
      setUser(data.user);
      await SecureStore.setItemAsync("authToken", data.token);
      return data;
    } catch (err) {
      console.error("Registration failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      setToken(null);
      setUser(null);
      await SecureStore.deleteItemAsync("authToken");
    } catch (err) {
      console.error("Logout failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading,
    setUser,
    setToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Text>Loading...</Text> : children}
    </AuthContext.Provider>
  );
};
