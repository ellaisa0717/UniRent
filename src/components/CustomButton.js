import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export default function CustomButton({ title, onPress, type = 'primary', style, textStyle }) {
  const isPrimary = type === 'primary';
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.button,
        isPrimary ? styles.primaryButton : styles.secondaryButton,
        style,
      ]}
    >
      <Text style={[styles.text, isPrimary ? styles.primaryText : styles.secondaryText, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 8,
  },
  primaryButton: { backgroundColor: COLORS.secondary },
  secondaryButton: { backgroundColor: COLORS.primary },
  text: { fontSize: 16, fontWeight: '700' },
  primaryText: { color: COLORS.white },
  secondaryText: { color: COLORS.white },
});
