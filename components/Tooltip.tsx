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
}

export const Tooltip: React.FC<TooltipProps> = ({
  message,
  children,
  placement = "bottom",
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

  const MARGIN = 8;

  const getTooltipStyle = () => {
    const { width: tooltipWidth, height: tooltipHeight } = tooltipSize;

    let top = 0;
    let left = 0;

    switch (placement) {
      case "top":
        top = position.y - tooltipHeight - MARGIN;
        left = position.x + position.width / 2 - tooltipWidth / 2;
        break;
      case "bottom":
        top = position.y + position.height + MARGIN;
        left = position.x + position.width / 2 - tooltipWidth / 2;
        break;
      case "left":
        top = position.y + position.height / 2 - tooltipHeight / 2;
        left = position.x - tooltipWidth - MARGIN;
        break;
      case "right":
        top = position.y + position.height / 2 - tooltipHeight / 2;
        left = position.x + position.width + MARGIN;
        break;
    }

    // Evitar que ultrapasse as bordas da tela
    top = Math.max(
      MARGIN,
      Math.min(screenHeight - tooltipHeight - MARGIN, top)
    );
    left = Math.max(
      MARGIN,
      Math.min(screenWidth - tooltipWidth - MARGIN, left)
    );

    return { top, left };
  };

  const getArrowStyle = () => {
    switch (placement) {
      case "top":
        return styles.arrowBottom;
      case "bottom":
        return styles.arrowTop;
      case "left":
        return styles.arrowRight;
      case "right":
        return styles.arrowLeft;
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
                style={styles.tooltipBox}
                onLayout={(event) => {
                  const { width, height } = event.nativeEvent.layout;
                  setTooltipSize({ width, height });
                }}
              >
                <Text style={styles.tooltipText}>{message}</Text>
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
    backgroundColor: "#333",
    borderRadius: 8,
  },
  tooltipText: {
    color: "#fff",
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
  },
  arrowTop: {
    top: -8,
    left: "50%",
    marginLeft: -8,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#333",
  },
  arrowBottom: {
    bottom: -8,
    left: "50%",
    marginLeft: -8,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#333",
  },
  arrowLeft: {
    left: -8,
    top: "50%",
    marginTop: -8,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderRightWidth: 8,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#333",
  },
  arrowRight: {
    right: -8,
    top: "50%",
    marginTop: -8,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderLeftWidth: 8,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "#333",
  },
});
