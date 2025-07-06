import React from "react";
import type { ImageSourcePropType } from "react-native";
import { Image, Platform, StyleSheet, View } from "react-native";

interface Props {
  images: { id: string | number; source: ImageSourcePropType }[];
  height: number;
  currentIndex: number;
}

export const CarouselWeb = ({ images, height, currentIndex }: Props) => {
  const hasImages = images.length > 0;

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <View style={[styles.imageWrapper, { height }]}>
          {hasImages &&
            images.map((img, index) => (
              <View
                key={img.id}
                style={[
                  styles.imageContainer,
                  {
                    height,
                    opacity: currentIndex === index ? 1 : 0,
                    ...(Platform.OS === "web"
                      ? {
                          transitionDuration: "0.6s",
                          transitionProperty: "opacity",
                          transitionTimingFunction: "ease-in-out",
                        }
                      : {}),
                  },
                ]}
              >
                <Image
                  source={
                    typeof img.source === "string"
                      ? { uri: img.source }
                      : img.source
                  }
                  style={[styles.image, { width: "100%", height }]}
                  resizeMode="cover"
                />
              </View>
            ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    alignItems: "center",
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
  },
  image: {
    flex: 1,
    borderRadius: 18,
  },
});
