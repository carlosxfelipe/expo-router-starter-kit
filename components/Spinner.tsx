import { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

const Spinner = ({ size = 24, color = "#6200ee" }: Props) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const strokeWidth = size * (4 / 24);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {/* Trilha translúcida */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeOpacity={0.2}
          fill="none"
        />
      </Svg>
      {/* Arco rotativo */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: size,
          height: size,
          transform: [{ rotate: spin }],
        }}
      >
        <Svg width={size} height={size}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference * 0.75}
            strokeDashoffset={circumference * 0.25}
            fill="none"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

export default Spinner;
