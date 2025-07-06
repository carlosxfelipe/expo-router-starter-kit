import React, { useRef, useState } from "react";
import {
  Dimensions,
  LayoutRectangle,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface TooltipProps {
  message: string;
  children: React.ReactElement<any>;
  placement?: "top" | "bottom" | "left" | "right";
  margin?: number;
  isDarkMode?: boolean;
  textColor?: string;
  textColorDark?: string;
  backgroundColor?: string;
  backgroundColorDark?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  message,
  children,
  placement = "bottom",
  margin = 8,
  isDarkMode = false,
  textColor = "#fff",
  textColorDark = "#333",
  backgroundColor = "#333",
  backgroundColorDark = "#fff",
}) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [tooltipSize, setTooltipSize] = useState({ width: 0, height: 0 });

  const childRef = useRef<View>(null);
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  const showTooltip = () => {
    childRef.current?.measureInWindow((x, y, width, height) => {
      setPosition({ x, y, width, height });
      setVisible(true);
    });
  };

  const getTooltipStyle = () => {
    const { width: tooltipWidth, height: tooltipHeight } = tooltipSize;

    let top = 0;
    let left = 0;

    switch (placement) {
      case "top":
        top = position.y - tooltipHeight - margin;
        left = position.x + position.width / 2 - tooltipWidth / 2;
        break;
      case "bottom":
        top = position.y + position.height + margin;
        left = position.x + position.width / 2 - tooltipWidth / 2;
        break;
      case "left":
        top = position.y + position.height / 2 - tooltipHeight / 2;
        left = position.x - tooltipWidth - margin;
        break;
      case "right":
        top = position.y + position.height / 2 - tooltipHeight / 2;
        left = position.x + position.width + margin;
        break;
    }

    // Evitar que ultrapasse as bordas da tela
    top = Math.max(
      margin,
      Math.min(screenHeight - tooltipHeight - margin, top)
    );
    left = Math.max(
      margin,
      Math.min(screenWidth - tooltipWidth - margin, left)
    );

    return { top, left };
  };

  const getArrowStyle = () => {
    const color = isDarkMode ? backgroundColorDark : backgroundColor;

    switch (placement) {
      case "top":
        return {
          ...styles.arrowPointingUp,
          borderTopColor: color,
          borderTopWidth: 8,
        };
      case "bottom":
        return {
          ...styles.arrowPointingDown,
          borderBottomColor: color,
          borderBottomWidth: 8,
        };
      case "left":
        return {
          ...styles.arrowPointingLeft,
          borderLeftColor: color,
          borderLeftWidth: 8,
        };
      case "right":
        return {
          ...styles.arrowPointingRight,
          borderRightColor: color,
          borderRightWidth: 8,
        };
      default:
        return {};
    }
  };

  return (
    <>
      <View ref={childRef}>
        {React.cloneElement(children, {
          onPress: showTooltip,
        })}
      </View>

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={[StyleSheet.absoluteFill, styles.backdrop]}>
            <View style={[styles.tooltipContainer, getTooltipStyle()]}>
              <View
                style={[
                  styles.tooltipBox,
                  {
                    backgroundColor: isDarkMode
                      ? backgroundColorDark
                      : backgroundColor,
                  },
                ]}
                onLayout={(event) => {
                  const { width, height } = event.nativeEvent.layout;
                  setTooltipSize({ width, height });
                }}
              >
                <Text
                  style={[
                    styles.tooltipText,
                    {
                      color: isDarkMode ? textColorDark : textColor,
                    },
                  ]}
                >
                  {message}
                </Text>
              </View>
              <View style={[styles.tooltipArrowBase, getArrowStyle()]} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  tooltipBox: {
    maxWidth: 250,
    padding: 10,
    borderRadius: 8,
  },
  tooltipText: {
    fontSize: 14,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  tooltipContainer: {
    position: "absolute",
  },
  tooltipArrowBase: {
    position: "absolute",
    width: 0,
    height: 0,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  arrowPointingDown: {
    top: -8,
    left: "50%",
    marginLeft: -8,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  arrowPointingUp: {
    bottom: -8,
    left: "50%",
    marginLeft: -8,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
  },
  arrowPointingRight: {
    left: -8,
    top: "50%",
    marginTop: -8,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderRightWidth: 8,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
  },
  arrowPointingLeft: {
    right: -8,
    top: "50%",
    marginTop: -8,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderLeftWidth: 8,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
  },
});
