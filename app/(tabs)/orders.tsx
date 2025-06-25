import { MaxWidthLayout } from "@/components/layout/MaxWidthLayout";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Header } from "@/components/ui/Header";
import { ScrollView, StyleSheet } from "react-native";

export default function OrdersScreen() {
  return (
    <MaxWidthLayout>
      <Header
        title="Pedidos"
        iconName="filter-variant"
        onIconPress={() => {}}
      />
      <ThemedView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>
          <ThemedText>Tela de Pedidos</ThemedText>
        </ScrollView>
      </ThemedView>
    </MaxWidthLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: 16,
  },
});
