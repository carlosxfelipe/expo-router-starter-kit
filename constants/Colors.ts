import { MaterialShades } from "./MaterialShades";

const tintColorLight = MaterialShades.blue[700];
const tintColorDark = MaterialShades.blue[300];

export const Colors = {
  light: {
    text: "#11181C",
    background: "#FFFFFF",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    surface: "#E6E8EB",
    status: {
      success: MaterialShades.green[500],
      warning: MaterialShades.amber[600],
      error: MaterialShades.red[600],
    },
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    surface: "#2C2F31",
    status: {
      success: MaterialShades.green[300],
      warning: MaterialShades.amber[400],
      error: MaterialShades.red[300],
    },
  },
};
