import { MaxWidthLayout } from "@/components/layout/MaxWidthLayout";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { MCIcons } from "@/components/ui/MCIcons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const text = useThemeColor({}, "text");
  const border = useThemeColor({}, "icon");
  const versionTextColor = useThemeColor({}, "icon");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true),
    );
    const hideSub = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false),
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  function handleLogin() {
    if (email === "user" && password === "123") {
      router.replace("/home");
    } else {
      Alert.alert("Erro", "Usuário ou senha inválidos.");
    }
  }

  return (
    <MaxWidthLayout webMaxWidth={480}>
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <View style={styles.inner}>
            <ThemedText type="title" style={styles.title}>
              Login
            </ThemedText>

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
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <MCIcons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color={border}
                />
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 12 }} />
            <Button title="Entrar" iconLeft="login" onPress={handleLogin} />
            <Button
              title="Fazer Cadastro"
              iconLeft="account-plus"
              outline
              onPress={() => router.replace("/auth/register")}
            />
          </View>

          {!isKeyboardVisible && (
            <View style={styles.footer}>
              <TouchableOpacity onPress={() => {}}>
                <ThemedText type="link">
                  Precisa de ajuda? Clique aqui
                </ThemedText>
              </TouchableOpacity>
              <ThemedText
                style={[styles.footerVersion, { color: versionTextColor }]}
              >
                Versão: 1.0.0
              </ThemedText>
            </View>
          )}
        </KeyboardAvoidingView>
      </ThemedView>
    </MaxWidthLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  inner: {
    flexGrow: 1,
    gap: 16,
    justifyContent: "center",
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
  },
  footer: {
    alignItems: "center",
    paddingVertical: 16,
  },
  footerVersion: {
    marginTop: 8,
  },
});
