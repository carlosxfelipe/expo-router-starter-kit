import React from "react";
import type { DimensionValue } from "react-native";
import { SkeletonView } from "./SkeletonView";

interface CarouselSkeletonProps {
  width: DimensionValue;
  height: DimensionValue;
  isDarkMode?: boolean;
}

export const CarouselSkeleton = ({
  width,
  height,
  isDarkMode = false,
}: CarouselSkeletonProps) => {
  return (
    <SkeletonView
      width={width}
      height={height}
      borderRadius={18}
      isDarkMode={isDarkMode}
    />
  );
};
