import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import Svg, { Circle } from "react-native-svg";

type SpinnerProps = {
  size?: number;
  color?: string;
  reverse?: boolean; // sentido anti-horário
};

const Spinner = ({ size = 24, color = "#000", reverse = false }: SpinnerProps) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: reverse ? ["0deg", "-360deg"] : ["0deg", "360deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <Svg height={size} width={size} viewBox="0 0 24 24">
        <Circle
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth="4"
          strokeDasharray="60"
          strokeDashoffset="20"
          fill="none"
        />
      </Svg>
    </Animated.View>
  );
};

export default Spinner;
