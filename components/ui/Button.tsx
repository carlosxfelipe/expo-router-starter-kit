import { useThemeColor } from "@/hooks/useThemeColor";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import { MCIcons } from "./MCIcons";

type Props = TouchableOpacityProps & {
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconLeft?: string;
  iconRight?: string;
  outline?: boolean;
};

export function Button({
  title,
  style,
  textStyle,
  iconLeft,
  iconRight,
  outline = false,
  ...rest
}: Props) {
  const tintColor = useThemeColor({}, "tint");
  const backgroundColorTheme = useThemeColor({}, "background");

  const backgroundColor = outline ? "transparent" : tintColor;
  const textColor = outline ? tintColor : backgroundColorTheme;
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
      <View style={styles.content}>
        {iconLeft && (
          <MCIcons
            name={iconLeft}
            size={20}
            color={textColor}
            style={styles.icon}
          />
        )}
        <Text style={[styles.buttonText, { color: textColor }, textStyle]}>
          {title}
        </Text>
        {iconRight && (
          <MCIcons
            name={iconRight}
            size={20}
            color={textColor}
            style={styles.icon}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    marginHorizontal: 6,
  },
});
