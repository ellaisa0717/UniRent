import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export default function CustomInput({
  label, placeholder, value, onChangeText,
  secureTextEntry = false, keyboardType,
  containerStyle, inputStyle,
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textSecondary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16, width: '100%' },
  label: {
    fontSize: 14, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 6,
  },
  inputContainer: {
    height: 50, backgroundColor: '#F3F4F6', borderRadius: 12,
    paddingHorizontal: 16, justifyContent: 'center', borderWidth: 1, borderColor: COLORS.border,
  },
  input: { fontSize: 14, color: COLORS.textPrimary, height: '100%' },
});
