import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleProp,
  View,
  ViewStyle,
  type DimensionValue,
} from "react-native";

interface SkeletonViewProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  isDarkMode?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const SkeletonView = ({
  width = "100%",
  height = 100,
  borderRadius = 8,
  isDarkMode = false,
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
      ])
    ).start();
  }, [fadeAnim]);

  const baseColor = isDarkMode ? "#333" : "#e0e0e0";
  const highlightColor = isDarkMode ? "#555" : "#f5f5f5";

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
