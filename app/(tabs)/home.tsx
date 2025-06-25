import { MaxWidthLayout } from "@/components/layout/MaxWidthLayout";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SearchBarHeader } from "@/components/ui/SearchBarHeader";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <MaxWidthLayout>
      <SearchBarHeader />
      <ThemedView style={{ flex: 1 }}>
        <View style={{ marginTop: 16 }}>{/* <BannerCarousel /> */}</View>
        <View style={{ paddingHorizontal: 16 }}>
          <ThemedText>Tela de Início</ThemedText>
          {/* <FeaturedProducts /> */}
          {/* <ProductList title="Popular Products" products={popularProducts} /> */}
          {/* <ProductList title="New Arrivals" products={newArrivals} /> */}
        </View>
      </ThemedView>
    </MaxWidthLayout>
  );
}
