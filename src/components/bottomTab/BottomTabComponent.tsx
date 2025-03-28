import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import NavigationIcon from './NavigationIcon';
import {
  appColors,
  fontSize,
  screenWidth,
  sizeBlock,
  universalStyle,
} from '@/styles/universalStyle';
import AppText from '../text/AppText';

const BottomTabComponent = ({
  descriptors,
  navigation,
  state,
}: BottomTabBarProps) => {
  const whiteListScreens: string[] = [
    ...state.routeNames.map(route => route + 'Screen'),
  ];

  const [activeRouteName, setActiveRouteName] = useState<string | undefined>(
    '',
  );

  useEffect(() => {
    setActiveRouteName(getRouteName(state.routes[state.index]));
  }, [state]);

  const shouldDisplayTabBar =
    activeRouteName === undefined
      ? true
      : activeRouteName && whiteListScreens.includes(activeRouteName);

  const [animate, setAnimate] = useState(false);

  const handlePress = (onPress: () => void) => {
    setAnimate(true);

    // Reset the animation after a short delay
    setTimeout(() => {
      setAnimate(false);
    }, 300); // Adjust the delay as needed

    // Trigger the onPress function
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
    <View
      style={[
        styles.container,
        {
          display: shouldDisplayTabBar ? 'flex' : 'none',
          backgroundColor: appColors.background,
          shadowColor: appColors.text,
        },
      ]}>
      {state?.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const activeRoute = getRouteName(route);

        const onPress = () => {
          setActiveRouteName(activeRoute);

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            onPress={() => {
              handlePress(onPress);
            }}
            key={index}>
            <Animatable.View
              duration={300}
              animation={isFocused && animate ? bounce : ''}
              style={styles.linkContainer}>
              {/* <View style={styles.linkContainer}> */}
              <NavigationIcon route={label} isFocused={isFocused} />
              <AppText
                fontType="medium"
                fontSize={fontSize.small - 1}
                color={isFocused ? appColors.green : appColors.textGrey}>
                {label}
              </AppText>
            </Animatable.View>
            {/* </View> */}
          </Pressable>
        );
      })}
    </View>
  );
};

const getRouteName = (route: any) => {
  return getFocusedRouteNameFromRoute(route);
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: screenWidth,
    height: sizeBlock.getHeightSize(80),
    bottom: 0,
    elevation: 20,
    zIndex: 100,
    ...universalStyle.flexBetween,
  },
  linkContainer: {
    width: screenWidth / 4,
    height: sizeBlock.getHeightSize(70),
    ...universalStyle.centering,
    flexDirection: 'column',
    position: 'relative',
    marginTop: sizeBlock.getHeightSize(5),
    rowGap: sizeBlock.getHeightSize(5),
  },
});

export default BottomTabComponent;
