import React from 'react';
import { View, StyleSheet } from 'react-native';

import { RoundedButton } from '../../components/RoundedButton';

export const Timing = ({ onChangeTime }) => {
  return (
    <>
      <View style={styles.timingButton}>
        <RoundedButton
          size={75}
          title={5}
          onPress={() => onChangeTime(5)}
        />
        <RoundedButton
          size={75}
          title={10}
          onPress={() => onChangeTime(10)}
        />
        <RoundedButton
          size={75}
          title={15}
          onPress={() => onChangeTime(15)}
        />
        <RoundedButton
          size={75}
          title={20}
          onPress={() => onChangeTime(20)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
