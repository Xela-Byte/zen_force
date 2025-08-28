import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import AppText from '@/components/text/AppText';

type Props = {};

const GoogleAuthScreen = (props: Props) => {
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View>
        <AppText>Google Authentication</AppText>
        <AppText>
          This screen is no longer used. Google signup is now handled directly
          from the Register screen.
        </AppText>
      </View>
    </SafeAreaView>
  );
};

export default GoogleAuthScreen;
