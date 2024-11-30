import Colors from '@constants/colors';
import CommonStyles from '@constants/styles';
import * as React from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  ModalProps,
  Dimensions,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';

interface CustomModalProps extends ModalProps {
  onClose: () => void;
  children?: JSX.Element;
}

export default function CustomModal(props: CustomModalProps): JSX.Element {
  const { visible, onClose, animationType, children } = props;

  const modalContainerStyle = React.useMemo<ViewStyle>(() => {
    if (animationType === 'fade') {
      return styles.container;
    }
    return styles.slideContainer;
  }, [animationType]);

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType={'fade'}
      onRequestClose={() => {
        handleClose();
      }}>
      <View style={modalContainerStyle}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.overlay}
          onPress={handleClose}
        />
        {children}
      </View>
    </Modal>
  );
}

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheetContainer: {
    ...CommonStyles.flexCol.alignCenter,
    backgroundColor: Colors.white,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
  },
  thumbButton: {
    ...CommonStyles.flexCol.center,
    width: '100%',
  },
  thumb: {
    width: 40,
    height: 3,
    backgroundColor: Colors.border,
    borderRadius: 2,
    marginTop: 10,
    marginBottom: 8,
  },
  confirmButtonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingTop: 8,
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
  },
});
