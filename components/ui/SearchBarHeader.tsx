import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MCIcons } from "./MCIcons";

export const SearchBarHeader = () => {
  const insets = useSafeAreaInsets();
  const text = useThemeColor({}, "text");
  const border = useThemeColor({}, "icon");

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <ThemedView style={[styles.inputContainer, { borderColor: border }]}>
        <MCIcons
          name="magnify"
          size={20}
          color={border}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Buscar"
          placeholderTextColor={border}
          style={[styles.input, { color: text }]}
        />
      </ThemedView>
      <TouchableOpacity style={styles.cartButton}>
        <MCIcons name="cart-outline" size={24} color={text} />
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "rgba(0,0,0,0.02)",
    overflow: "hidden",
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0, // normaliza no Android
  },
  searchIcon: {
    marginRight: 8,
  },
  cartButton: {
    padding: 6,
  },
});
