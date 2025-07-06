import { ThemedText } from "@/components/ThemedText";
import React from "react";
import {
  DimensionValue,
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { MCIcons } from "../ui/MCIcons";
import { Tooltip } from "../ui/Tooltip";

interface Props {
  message: string;
  label?: string;
  placement?: "top" | "bottom" | "left" | "right";
  width?: DimensionValue;
}

export const TooltipDemo: React.FC<Props> = ({
  message,
  label = "Demonstração de Tooltip",
  placement,
  width,
}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <View style={[styles.container, { width }]}>
      <Tooltip
        message={message}
        placement={placement}
        isDarkMode={isDarkMode}
        // textColorDark="blue"
        // backgroundColorDark="red"
        // textColor="green"
        // backgroundColor="yellow"
      >
        <Pressable style={styles.helpIcon}>
          <ThemedText style={styles.text}>{label}</ThemedText>
          <MCIcons
            name="help-circle-outline"
            size={16}
            color={isDarkMode ? "#fff" : "#000"}
          />
        </Pressable>
      </Tooltip>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    backgroundColor: "yellow",
  },
  helpIcon: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 20,
  },
  text: {
    marginRight: 4,
  },
});
