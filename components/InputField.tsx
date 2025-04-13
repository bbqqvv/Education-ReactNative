import React from 'react';
import { TextInput, View, Text } from 'react-native';

interface InputFieldProps {
  placeholder?: string;
  value?: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  label?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  autoCapitalize,
  label,
}) => {
  return (
    <View className="mb-4">
      {label && <Text className="text-sm text-gray-700 mb-2">{label}</Text>}
      <TextInput
        className="h-12 border border-gray-300 rounded-lg px-4 bg-white"
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize || 'none'}
      />
    </View>
  );
};

export default InputField;