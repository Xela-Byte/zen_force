import {screenHeight, screenWidth} from '@/styles/universalStyle';
import {View} from 'react-native';
import {Modal, StatusBar, StyleSheet} from 'react-native';

interface OverlayProps {
  children: any;
}

const AbsoluteOverlay = ({children}: OverlayProps) => {
  return (
    <Modal visible={true} transparent animationType="fade">
      <StatusBar backgroundColor={'transparent'} barStyle={'light-content'} />
      <View style={styles.absoluteView}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  absoluteView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: screenWidth,
    height: screenHeight,
  },
});

export default AbsoluteOverlay;
