import React, { useEffect, useMemo, useState } from "react";
import type { ImageSourcePropType } from "react-native";
import { Animated, Image, Pressable, StyleSheet, View } from "react-native";
import { SkeletonView } from "./SkeletonView";

interface Props {
  images: { id: string | number; source: ImageSourcePropType }[];
  height?: number;
  onPressImage?: (id: string | number) => void;
  autoplayInterval?: number;
  showIndicators?: boolean;
  indicatorColor?: string;
  isDarkMode?: boolean;
}

export const CarouselFade = ({
  images,
  height = 180,
  onPressImage,
  autoplayInterval = 3000,
  showIndicators = false,
  indicatorColor = "blue",
  isDarkMode = false,
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasImages = images.length > 0;

  const displayItems = useMemo(
    () =>
      hasImages
        ? images
        : Array.from({ length: 1 }, (_, i) => ({
            id: `skeleton-${i}`,
          })),
    [images, hasImages]
  );

  const opacityValues = useMemo(
    () => displayItems.map((_, i) => new Animated.Value(i === 0 ? 1 : 0)),
    [displayItems]
  );

  const [loadedImages, setLoadedImages] = useState<boolean[]>(() =>
    new Array(displayItems.length).fill(false)
  );

  useEffect(() => {
    if (!hasImages || images.length <= 1) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;

      // Fade out current
      Animated.timing(opacityValues[currentIndex], {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();

      // Fade in next
      Animated.timing(opacityValues[nextIndex], {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();

      setCurrentIndex(nextIndex);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [autoplayInterval, currentIndex, hasImages, images.length, opacityValues]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      if (prev[index]) return prev;
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.imageWrapper, { height }]}>
        {displayItems.map((item, index) => {
          const isLoaded = loadedImages[index];

          return (
            <Animated.View
              key={item.id}
              style={[
                styles.imageContainer,
                { height, opacity: opacityValues[index] },
              ]}
            >
              <Pressable
                onPress={() => hasImages && onPressImage?.(item.id)}
                style={{ width: "100%", height }}
              >
                {hasImages ? (
                  <>
                    {!isLoaded && (
                      <SkeletonView
                        width="100%"
                        height={height}
                        borderRadius={18}
                        isDarkMode={isDarkMode}
                      />
                    )}
                    <Image
                      source={
                        typeof (item as any).source === "string"
                          ? { uri: (item as any).source }
                          : (item as any).source
                      }
                      style={[
                        styles.image,
                        { width: "100%", height },
                        !isLoaded && { position: "absolute", opacity: 0 },
                      ]}
                      resizeMode="cover"
                      onLoadEnd={() => handleImageLoad(index)}
                    />
                  </>
                ) : (
                  <SkeletonView
                    width="100%"
                    height={height}
                    borderRadius={18}
                    isDarkMode={isDarkMode}
                  />
                )}
              </Pressable>
            </Animated.View>
          );
        })}
      </View>

      {showIndicators && hasImages && (
        <View style={styles.indicatorContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentIndex === index && {
                  ...styles.activeIndicator,
                  backgroundColor: indicatorColor,
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  imageWrapper: {
    width: "100%",
    position: "relative",
  },
  imageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 7,
    elevation: 9,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeIndicator: {
    transform: [{ scale: 1.2 }],
  },
});
