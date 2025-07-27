import * as MdiIcons from "@mdi/js";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import Svg, { Path } from "react-native-svg";

// Transforma "magnify" em "mdiMagnify", "account-circle-outline" em "mdiAccountCircleOutline"
function normalizeName(name: string): keyof typeof MdiIcons {
  const pascalCase = name
    .split(/[-_]/g)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  return `mdi${pascalCase}` as keyof typeof MdiIcons;
}

type Props = {
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

export function MCIcons({ name, size = 24, color = "black", style }: Props) {
  const iconKey = normalizeName(name);
  // eslint-disable-next-line import/namespace
  const path = MdiIcons[iconKey];

  if (!path) {
    console.warn(
      `[MCIcons] Icon "${name}" resolved to "${iconKey}" not found in @mdi/js`,
    );
    return null;
  }

  return (
    <Svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={style}
      fill={color}
    >
      <Path d={path} />
    </Svg>
  );
}
