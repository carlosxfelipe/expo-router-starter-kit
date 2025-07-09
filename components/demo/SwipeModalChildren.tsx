import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/ui/Button";
import { closeModal } from "../GlobalSwipeModal";

export const SwipeModalChildren = () => {
  return (
    <>
      <ThemedText style={{ fontSize: 16, marginBottom: 16 }}>
        Olá, este é o conteúdo do Swipe Modal!
      </ThemedText>
      <Button title="Fechar modal" onPress={closeModal} />
    </>
  );
};
