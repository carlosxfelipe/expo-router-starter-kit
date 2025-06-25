import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

type ThemeColorKey = {
  [K in keyof typeof Colors.light]: (typeof Colors.light)[K] extends string
    ? K
    : never;
}[keyof typeof Colors.light];

export function useThemeColor<K extends ThemeColorKey>(
  props: { light?: string; dark?: string },
  colorName: K
): string {
  const theme = useColorScheme() ?? "light";
  return props[theme] ?? Colors[theme][colorName];
}
