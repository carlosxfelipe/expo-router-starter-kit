import { CircleSkeletonRow } from "@/components/demo/CircleSkeletonRow";
import { FeaturedProducts } from "@/components/demo/FeaturedProductsSkeleton";
import { MaxWidthLayout } from "@/components/layout/MaxWidthLayout";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SearchBarHeader } from "@/components/ui/SearchBarHeader";
import { useColorScheme, View } from "react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <MaxWidthLayout>
      <SearchBarHeader />
      <ThemedView style={{ flex: 1 }}>
        <View style={{ marginTop: 16 }}>{/* <BannerCarousel /> */}</View>
        <View style={{ paddingHorizontal: 16 }}>
          <ThemedText>Tela de Início</ThemedText>
          <FeaturedProducts isDarkMode={isDarkMode} />
          <CircleSkeletonRow count={5} isDarkMode={isDarkMode} />
          {/* <FeaturedProducts /> */}
          {/* <ProductList title="Popular Products" products={popularProducts} /> */}
          {/* <ProductList title="New Arrivals" products={newArrivals} /> */}
        </View>
      </ThemedView>
    </MaxWidthLayout>
  );
}
