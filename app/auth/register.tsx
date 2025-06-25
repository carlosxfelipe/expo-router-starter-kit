import { MaxWidthLayout } from "@/components/layout/MaxWidthLayout";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { MCIcons } from "@/components/ui/MCIcons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router, Stack } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterScreen() {
  // const background = useThemeColor({}, "background");
  const text = useThemeColor({}, "text");
  const border = useThemeColor({}, "icon");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <MaxWidthLayout webMaxWidth={480}>
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.inner}
        >
          <ThemedText type="title" style={styles.title}>
            Criar conta
          </ThemedText>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Nome"
            placeholderTextColor={border}
            style={[styles.input, { borderColor: border, color: text }]}
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor={border}
            autoCapitalize="none"
            style={[styles.input, { borderColor: border, color: text }]}
          />

          <View
            style={[
              styles.input,
              styles.passwordContainer,
              { borderColor: border },
            ]}
          >
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Senha"
              placeholderTextColor={border}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              style={[styles.passwordInput, { color: text }]}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MCIcons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color={border}
              />
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.input,
              styles.passwordContainer,
              { borderColor: border },
            ]}
          >
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirmar senha"
              placeholderTextColor={border}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              style={[styles.passwordInput, { color: text }]}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MCIcons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color={border}
              />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 12 }} />
          <Button
            title="Registrar"
            iconLeft="account-arrow-right"
            onPress={() => {
              if (password !== confirmPassword) {
                alert("As senhas não coincidem!");
                return;
              }
              // TODO: lógica de registro aqui
            }}
          />
          <Button
            title="Voltar"
            iconLeft="arrow-left"
            outline
            onPress={() => router.replace("/auth/login")}
          />
        </KeyboardAvoidingView>
      </ThemedView>
    </MaxWidthLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  inner: {
    gap: 16,
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    overflow: "hidden",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0, // normaliza no Android
    marginRight: 8,
  },
});
