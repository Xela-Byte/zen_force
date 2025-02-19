import {View, Text} from 'react-native';
import React from 'react';

type Props = {};

const HomeScreen = (props: Props) => {
  console.log('here');

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
