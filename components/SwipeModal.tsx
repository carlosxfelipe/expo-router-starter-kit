import React, { useCallback, useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Keyboard,
  Modal,
  PanResponder,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SWIPE_CLOSE_THRESHOLD = 100;

type SwipeModalProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnBackdropPress?: boolean;
  enableSwipeToClose?: boolean;
};

const SwipeModal: React.FC<SwipeModalProps> = ({
  visible,
  onClose,
  children,
  closeOnBackdropPress = true,
  enableSwipeToClose = true,
}) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const hideModal = useCallback(() => {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 200,
      useNativeDriver: true,
    }).start(onClose);
  }, [translateY, onClose]);

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      translateY.setValue(SCREEN_HEIGHT);
    }
  }, [visible, translateY]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        enableSwipeToClose && gesture.dy > 10,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) {
          translateY.setValue(gesture.dy);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > SWIPE_CLOSE_THRESHOLD) {
          hideModal();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Modal visible={visible} transparent animationType="none">
      <TouchableWithoutFeedback
        onPress={() => closeOnBackdropPress && hideModal()}
      >
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[styles.container, { transform: [{ translateY }] }]}
        {...(enableSwipeToClose ? panResponder.panHandlers : {})}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>{children}</View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "#00000088",
  },
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    maxHeight: "90%",
  },
  content: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    minHeight: 100,
  },
});

export default SwipeModal;
