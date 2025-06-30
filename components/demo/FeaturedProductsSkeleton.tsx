import { View } from "react-native";
import { SkeletonView } from "../ui/SkeletonView";

export const FeaturedProducts = ({
  isDarkMode = false,
}: {
  isDarkMode?: boolean;
}) => {
  return (
    <View style={{ width: 160, marginRight: 16, marginTop: 16 }}>
      <SkeletonView
        width="100%"
        height={160}
        borderRadius={12}
        isDarkMode={isDarkMode}
      />
      <View style={{ marginTop: 8 }}>
        <SkeletonView
          width="80%"
          height={14}
          borderRadius={6}
          isDarkMode={isDarkMode}
        />
        <SkeletonView
          width="60%"
          height={14}
          borderRadius={6}
          isDarkMode={isDarkMode}
          style={{ marginTop: 4 }}
        />
      </View>
    </View>
  );
};
