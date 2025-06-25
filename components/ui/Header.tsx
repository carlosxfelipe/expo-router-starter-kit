import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MCIcons } from "./MCIcons";

export const Header = ({
  title,
  iconName,
  onIconPress,
}: {
  title: string;
  iconName?: string;
  onIconPress?: () => void;
}) => {
  const insets = useSafeAreaInsets();
  const iconColor = useThemeColor({}, "text");

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.side} />
      <ThemedText type="subtitle" style={styles.title}>
        {title}
      </ThemedText>
      {iconName ? (
        <TouchableOpacity onPress={onIconPress} style={styles.side}>
          <MCIcons name={iconName} size={24} color={iconColor} />
        </TouchableOpacity>
      ) : (
        <View style={styles.side} />
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    textAlign: "center",
    flex: 1,
  },
  side: {
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
