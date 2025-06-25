import { useThemeColor } from "@/hooks/useThemeColor";
import { Platform, View, ViewProps } from "react-native";

type Props = ViewProps & {
  webMaxWidth?:
    | 320
    | 360
    | 375
    | 414
    | 480
    | 640
    | 768
    | 1024
    | 1280
    | 1440
    | 1600
    | 1920
    | "100%";
};

export function MaxWidthLayout({
  children,
  style,
  webMaxWidth = 768,
  ...rest
}: Props) {
  const background = useThemeColor({}, "background");

  const maxWidth = Platform.OS === "web" ? webMaxWidth : "100%";
  const marginTop = Platform.OS === "web" ? 16 : 0;

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: background,
      }}
    >
      <View
        style={[
          {
            flex: 1,
            width: "100%",
            maxWidth,
            marginTop,
          },
          style,
        ]}
        {...rest}
      >
        {children}
      </View>
    </View>
  );
}
