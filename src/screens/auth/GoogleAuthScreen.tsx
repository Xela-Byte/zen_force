import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {useGoogleSignupQuery} from '@/hooks/queries/useGoogleSignupQuery';

type Props = {};

const GoogleAuthScreen = (props: Props) => {
  const {data} = useGoogleSignupQuery();

  return (
    <SafeAreaView>
      <View>
        <Text>GoogleAuthScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default GoogleAuthScreen;
