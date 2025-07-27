import { SwipeModalChildren } from "@/components/demo/SwipeModalChildren";
import { TooltipDemo } from "@/components/demo/TooltipDemo";
import { showModal } from "@/components/GlobalSwipeModal";
import { MaxWidthLayout } from "@/components/layout/MaxWidthLayout";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { CarouselSnap } from "@/components/ui/CarouselSnap";
import { SearchBarHeader } from "@/components/ui/SearchBarHeader";
import { images } from "@/data/images";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useColorScheme, View } from "react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const tintColor = useThemeColor({}, "tint");

  const handleOpenModal = () => {
    showModal({
      bgColor: isDarkMode ? "#1a1a1a" : "#fff",
      showBar: true,
      barColor: isDarkMode ? "#888" : "#ccc",
      maxHeight: 650,
      headerComponent: (
        <ThemedText style={{ padding: 16 }}>Cabeçalho do Modal</ThemedText>
      ),
      footerComponent: (
        <ThemedText style={{ padding: 16 }}>Rodapé do Modal</ThemedText>
      ),
      children: <SwipeModalChildren />,
    });
  };

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
          <Button title="Abrir global swipe modal" onPress={handleOpenModal} />
        </View>
      </ThemedView>
    </MaxWidthLayout>
  );
}
