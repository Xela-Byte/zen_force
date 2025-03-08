import {useState} from 'react';
import {Pressable, StyleSheet, ViewStyle} from 'react-native';
import * as Animatable from 'react-native-animatable';

type Props = {
  onPress: () => void;
  children?: React.ReactNode;
  customViewStyle?: ViewStyle;
  disabled?: boolean;
};

const AppPressable = ({
  customViewStyle,
  onPress,
  children,
  disabled = false,
}: Props) => {
  const [animate, setAnimate] = useState(false);

  const handlePress = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 300);
    onPress();
  };

  const bounce = {
    0: {
      opacity: 1,
      scale: 1,
    },
    0.5: {
      opacity: 1,
      scale: 0.8,
    },
    1: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.container,
        customViewStyle,
        {
          opacity: disabled ? 0.5 : 1,
        },
      ]}>
      <Animatable.View duration={300} animation={animate ? bounce : ''}>
        {children}
      </Animatable.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AppPressable;
