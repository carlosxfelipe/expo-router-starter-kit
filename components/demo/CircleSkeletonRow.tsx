import React from "react";
import { View } from "react-native";
import { SkeletonView } from "../ui/SkeletonView";

interface CircleSkeletonProps {
  isDarkMode?: boolean;
}

export const CircleSkeleton = ({ isDarkMode = false }: CircleSkeletonProps) => {
  return (
    <View style={{ alignItems: "center", width: 72, marginRight: 12 }}>
      <SkeletonView
        width={64}
        height={64}
        borderRadius={32}
        isDarkMode={isDarkMode}
        style={{ marginBottom: 4 }}
      />
      <SkeletonView
        width={48}
        height={12}
        borderRadius={6}
        isDarkMode={isDarkMode}
      />
    </View>
  );
};

interface CircleSkeletonRowProps {
  count?: number;
  isDarkMode?: boolean;
}

export const CircleSkeletonRow = ({
  count = 5,
  isDarkMode = false,
}: CircleSkeletonRowProps) => {
  return (
    <View style={{ flexDirection: "row", marginTop: 16 }}>
      {Array.from({ length: count }).map((_, index) => (
        <CircleSkeleton key={index} isDarkMode={isDarkMode} />
      ))}
    </View>
  );
};
