import { TooltipDemo } from "@/components/demo/TooltipDemo";
import { MaxWidthLayout } from "@/components/layout/MaxWidthLayout";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { CarouselSnap } from "@/components/ui/CarouselSnap";
import { SearchBarHeader } from "@/components/ui/SearchBarHeader";
import { images } from "@/data/images";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useColorScheme, View } from "react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const tintColor = useThemeColor({}, "tint");

  return (
    <MaxWidthLayout>
      <SearchBarHeader />
      <ThemedView style={{ flex: 1 }}>
        <View style={{ marginTop: 16 }}>
          <CarouselSnap
            images={images}
            showIndicators
            indicatorColor={tintColor}
            onPressImage={(id) => console.log("clicked", id)}
            isDarkMode={isDarkMode}
          />
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <ThemedText>Tela de Início</ThemedText>
          <TooltipDemo
            message="Aute nulla est ut consequat magna ut minim aliquip minim proident excepteur."
            placement="top"
          />
        </View>
      </ThemedView>
    </MaxWidthLayout>
  );
}
