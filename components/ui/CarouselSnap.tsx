import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ImageSourcePropType } from "react-native";
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SkeletonView } from "./SkeletonView";

interface ImageData {
  id: string | number;
  source: ImageSourcePropType;
}

interface Props {
  images: ImageData[];
  height?: number;
  onPressImage?: (id: string | number) => void;
  autoplayInterval?: number;
  showIndicators?: boolean;
  indicatorColor?: string;
  isDarkMode?: boolean;
}

export const CarouselSnap = ({
  height = 180,
  images,
  onPressImage,
  autoplayInterval = 3000,
  showIndicators = false,
  indicatorColor = "blue",
  isDarkMode = false,
}: Props) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const screenWidth = Dimensions.get("window").width;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const hasImages = images.length > 0;
  const placeholders = useMemo(
    () =>
      !hasImages
        ? Array.from({ length: 3 }, (_, i) => ({ id: `skeleton-${i}` }))
        : [],
    [hasImages],
  );

  const [loadedImages, setLoadedImages] = useState<boolean[]>(() =>
    new Array(images.length).fill(false)
  );

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      if (prev[index]) return prev;
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  const imageWidth = screenWidth * 0.7;
  const sideSpacing = (screenWidth - imageWidth) / 2;
  const gap = 16;
  const carouselEdgePadding = sideSpacing - gap / 2;

  const stopAutoplay = useCallback(() => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (!hasImages) return;
    stopAutoplay();
    scrollInterval.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: nextIndex * (imageWidth + gap),
            animated: true,
          });
        }
        return nextIndex;
      });
    }, autoplayInterval);
  }, [
    images.length,
    imageWidth,
    gap,
    stopAutoplay,
    hasImages,
    autoplayInterval,
  ]);

  useEffect(() => {
    if (hasImages) {
      startAutoplay();
    }

    return () => {
      stopAutoplay();
    };
  }, [hasImages, startAutoplay, stopAutoplay]);

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (imageWidth + gap));
    setCurrentIndex(index);
    startAutoplay();
  };

  return (
    <View style={[styles.carouselContainer, { height }]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={imageWidth + gap}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: carouselEdgePadding,
        }}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEnabled={hasImages}
      >
        {(hasImages ? images : placeholders).map((item, index) => {
          const imageItem = item as ImageData;

          return (
            <Pressable
              key={item.id}
              onPress={() => onPressImage?.(item.id)}
              style={[
                styles.imageContainer,
                { width: imageWidth, marginHorizontal: gap / 2 },
              ]}
            >
              {hasImages
                ? (
                  <>
                    {!loadedImages[index] && (
                      <SkeletonView
                        width={imageWidth}
                        height={height}
                        borderRadius={18}
                        isDarkMode={isDarkMode}
                      />
                    )}
                    <Image
                      style={[styles.image, { width: imageWidth, height }]}
                      source={typeof imageItem.source === "string"
                        ? { uri: imageItem.source }
                        : imageItem.source}
                      onLoadEnd={() => handleImageLoad(index)}
                    />
                  </>
                )
                : (
                  <SkeletonView
                    width={imageWidth}
                    height={height}
                    borderRadius={18}
                    isDarkMode={isDarkMode}
                  />
                )}
            </Pressable>
          );
        })}
      </ScrollView>

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
  carouselContainer: {
    marginBottom: 20,
  },
  imageContainer: {
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
    backgroundColor: "#000",
    transform: [{ scale: 1.2 }],
  },
});
