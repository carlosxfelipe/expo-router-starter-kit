import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import Spinner from "../Spinner";

type LoadingButtonProps = TouchableOpacityProps & {
  size?: number;
  outline?: boolean;
  style?: ViewStyle;
};

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  size = 20,
  outline = false,
  style,
  ...rest
}) => {
  const tintColor = useThemeColor({}, "tint");
  const backgroundColorTheme = useThemeColor({}, "background");

  const backgroundColor = outline ? "transparent" : tintColor;
  const spinnerColor = outline ? tintColor : backgroundColorTheme;
  const borderColor = outline ? tintColor : "transparent";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          backgroundColor,
          borderColor,
          borderWidth: outline ? 1 : 0,
        },
        style,
      ]}
      {...rest}
    >
      <Spinner size={size} color={spinnerColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
