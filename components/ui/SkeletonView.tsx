import React, { useEffect, useRef } from "react";
import {
  Animated,
  type DimensionValue,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";

interface SkeletonViewProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  isDarkMode?: boolean;
  lightBaseColor?: string;
  lightHighlightColor?: string;
  darkBaseColor?: string;
  darkHighlightColor?: string;
  style?: StyleProp<ViewStyle>;
}

export const SkeletonView = ({
  width = "100%",
  height = 100,
  borderRadius = 8,
  isDarkMode = false,
  lightBaseColor = "#e0e0e0",
  lightHighlightColor = "#f5f5f5",
  darkBaseColor = "#333",
  darkHighlightColor = "#555",
  style,
}: SkeletonViewProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [fadeAnim]);

  const baseColor = isDarkMode ? darkBaseColor : lightBaseColor;
  const highlightColor = isDarkMode ? darkHighlightColor : lightHighlightColor;

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: baseColor,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: highlightColor,
          opacity: fadeAnim,
          borderRadius,
        }}
      />
    </View>
  );
};
