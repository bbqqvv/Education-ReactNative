import { TextInputProps, TouchableOpacityProps } from "react-native";


declare interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}



