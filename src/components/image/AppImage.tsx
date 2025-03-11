import React from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  StyleProp,
  ImageStyle,
} from 'react-native';

type AppImageProps = ImageProps & {
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
};

const AppImage: React.FC<AppImageProps> = ({source, style, ...rest}) => {
  return (
    <Image
      source={source}
      style={[{width: 100, height: 100}, style]}
      resizeMode="contain"
      {...rest}
    />
  );
};

export default AppImage;
