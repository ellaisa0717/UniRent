import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS } from '../constants/colors';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.content}>
          <View style={{ alignItems: 'center', marginBottom: 36 }}>
            <Text style={{ fontSize: 48, fontWeight: '900', color: COLORS.secondary }}>
              Uni<Text style={{ color: COLORS.primary }}>Rent</Text>
            </Text>
          </View>

          <View style={{ width: '100%' }}>
            <CustomInput
              label="Email or Student ID"
              placeholder="Email or Student ID"
              value={email}
              onChangeText={setEmail}
            />
            <CustomInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 8 }}>
              <Text style={{ color: COLORS.textSecondary, fontSize: 13 }}>Forgot Password?</Text>
            </TouchableOpacity>

            <CustomButton title="Log in" onPress={() => navigation.replace('HomeTabs')} style={{ marginTop: 16 }} />

            <View style={styles.footer}>
              <Text style={{ color: COLORS.textPrimary }}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={{ color: COLORS.primary, fontWeight: '700' }}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 24 },
  content: { flex: 1, justifyContent: 'center' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 22 },
});
