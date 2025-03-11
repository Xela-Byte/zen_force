import {View, Text} from 'react-native';
import React from 'react';
import {useGoogleSignupQuery} from '../../hooks/queries/useGoogleSignupQuery';

type Props = {};

const GoogleAuthScreen = (props: Props) => {
  const {data} = useGoogleSignupQuery();

  return (
    <View>
      <Text>GoogleAuthScreen</Text>
    </View>
  );
};

export default GoogleAuthScreen;
