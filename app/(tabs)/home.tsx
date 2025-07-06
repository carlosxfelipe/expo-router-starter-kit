import { TooltipDemo } from "@/components/demo/TooltipDemo";
import { MaxWidthLayout } from "@/components/layout/MaxWidthLayout";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { CarouselFade } from "@/components/ui/CarouselFade";
import { CarouselSnap } from "@/components/ui/CarouselSnap";
import { SearchBarHeader } from "@/components/ui/SearchBarHeader";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Platform, useColorScheme, View } from "react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const tintColor = useThemeColor({}, "tint");

  const images = [
    {
      id: "1",
      source: {
        uri: "https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg",
      },
    },
    {
      id: "2",
      source: {
        uri: "https://images.pexels.com/photos/5039779/pexels-photo-5039779.jpeg",
      },
    },
    {
      id: "3",
      source: {
        uri: "https://images.pexels.com/photos/4862593/pexels-photo-4862593.jpeg",
      },
    },
    {
      id: "4",
      source: {
        uri: "https://images.pexels.com/photos/4814732/pexels-photo-4814732.jpeg",
      },
    },
    {
      id: "5",
      source: {
        uri: "https://images.pexels.com/photos/3981699/pexels-photo-3981699.jpeg",
      },
    },
    {
      id: "6",
      source: {
        uri: "https://images.pexels.com/photos/3978233/pexels-photo-3978233.jpeg",
      },
    },
  ];

  const isWeb = Platform.OS === "web";

  return (
    <MaxWidthLayout>
      <SearchBarHeader />
      <ThemedView style={{ flex: 1 }}>
        <View style={{ marginTop: 16 }}>
          {isWeb ? (
            <CarouselFade
              images={images}
              showIndicators
              indicatorColor={tintColor}
              onPressImage={(id) => console.log("clicked", id)}
              isDarkMode={isDarkMode}
            />
          ) : (
            <CarouselSnap
              images={[]}
              showIndicators
              indicatorColor={tintColor}
              isDarkMode={isDarkMode}
            />
          )}
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <ThemedText>Tela de Início</ThemedText>
          <TooltipDemo message="Primeiro tooltip" placement="top" />
          <TooltipDemo message="Segundo tooltip" placement="bottom" />
          <TooltipDemo
            message="Terceiro tooltip"
            placement="right"
            width={"54%"}
          />
        </View>
      </ThemedView>
    </MaxWidthLayout>
  );
}
