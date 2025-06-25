import { MaxWidthLayout } from "@/components/layout/MaxWidthLayout";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Header } from "@/components/ui/Header";
import { MCIcons } from "@/components/ui/MCIcons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const border = useThemeColor({}, "icon");
  const text = useThemeColor({}, "text");

  return (
    <MaxWidthLayout>
      <Header title="Perfil" iconName="cog-outline" onIconPress={() => {}} />
      <ThemedView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>
          <ThemedText>Tela de Perfil</ThemedText>

          <TouchableOpacity onPress={() => {}} style={styles.menuItem}>
            <MCIcons name="shopping-outline" size={22} color={text} />
            <ThemedText style={styles.menuText}>Pedidos</ThemedText>
          </TouchableOpacity>
          <View style={[styles.line, { backgroundColor: border }]} />

          <TouchableOpacity onPress={() => {}} style={styles.menuItem}>
            <MCIcons name="help-circle-outline" size={22} color={text} />
            <ThemedText style={styles.menuText}>Ajuda</ThemedText>
          </TouchableOpacity>
          <View style={[styles.line, { backgroundColor: border }]} />

          <TouchableOpacity
            onPress={() => router.replace("/auth/login")}
            style={styles.menuItem}
          >
            <MCIcons name="logout" size={22} color={text} />
            <ThemedText style={styles.menuText}>Sair do aplicativo</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </ThemedView>
    </MaxWidthLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: 16,
    gap: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
  },
  line: {
    height: StyleSheet.hairlineWidth,
    width: "100%",
  },
});
