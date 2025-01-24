import { TextInputProps, TouchableOpacityProps } from "react-native";


declare interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    role: string;
    email: string;
  };
}



declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}
