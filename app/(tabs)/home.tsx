import { SwipeModalDemo } from "@/components/demo/SwipeModalDemo";
import { TooltipDemo } from "@/components/demo/TooltipDemo";
import { MaxWidthLayout } from "@/components/layout/MaxWidthLayout";
import SwipeModal from "@/components/SwipeModal";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { CarouselSnap } from "@/components/ui/CarouselSnap";
import { SearchBarHeader } from "@/components/ui/SearchBarHeader";
import { images } from "@/data/images";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { useColorScheme, View } from "react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const tintColor = useThemeColor({}, "tint");

  const [modalVisible, setModalVisible] = useState(false);

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
          <Button
            title="Abrir swipe modal"
            onPress={() => setModalVisible(true)}
          />
        </View>
      </ThemedView>

      {/* Modal */}
      <SwipeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        bgColor={isDarkMode ? "#1a1a1a" : "#fff"}
        showBar={true}
        barColor={isDarkMode ? "#888" : "#ccc"}
        headerComponent={
          <ThemedText style={{ padding: 16 }}>Cabeçalho do Modal</ThemedText>
        }
        footerComponent={
          <ThemedText style={{ padding: 16 }}>Rodapé do Modal</ThemedText>
        }
      >
        <SwipeModalDemo onClose={() => setModalVisible(false)} />
      </SwipeModal>
    </MaxWidthLayout>
  );
}
