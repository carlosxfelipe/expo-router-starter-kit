import React, { useRef, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  UIManager,
  View,
  findNodeHandle,
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
  const [position, setPosition] = useState({ x: 0, y: 0, width: 0 });
  const childRef = useRef<View>(null);

  const showTooltip = () => {
    const handle = findNodeHandle(childRef.current);
    if (handle) {
      UIManager.measureInWindow(handle, (x, y, width, height) => {
        setPosition({ x, y: y + height, width });
        setVisible(true);
      });
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
            <View
              style={[
                styles.tooltipContainer,
                {
                  position: "absolute",
                  left: position.x + position.width / 2 - 125,
                  top: position.y + 4,
                },
              ]}
            >
              <View style={styles.tooltipBox}>
                <Text style={styles.tooltipText}>{message}</Text>
              </View>
              <View style={styles.tooltipArrow} />
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
    alignItems: "center",
  },
  tooltipArrow: {
    position: "absolute",
    top: -8,
    left: "50%",
    marginLeft: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#333",
  },
});
