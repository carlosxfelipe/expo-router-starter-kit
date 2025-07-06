import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { Pressable, StyleSheet, useColorScheme, View } from "react-native";
import { MCIcons } from "../ui/MCIcons";
import { Tooltip } from "../ui/Tooltip";

interface Props {
  message: string;
  label?: string;
  placement?: "top" | "bottom" | "left" | "right";
}

export const TooltipDemo: React.FC<Props> = ({
  message,
  label = "Demonstração de Tooltip",
  placement,
}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <View style={styles.container}>
      <View style={styles.helpIcon}>
        <ThemedText style={styles.text}>{label}</ThemedText>
        <Tooltip
          message={message}
          placement={placement}
          isDarkMode={isDarkMode}
          margin={14}
        >
          <Pressable>
            <MCIcons
              name="help-circle-outline"
              size={16}
              color={isDarkMode ? "#fff" : "#000"}
            />
          </Pressable>
        </Tooltip>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    // backgroundColor: "yellow",
  },
  helpIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginRight: 4,
  },
});
