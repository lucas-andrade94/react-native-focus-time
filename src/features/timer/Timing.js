import React from 'react';
import { View, StyleSheet } from 'react-native';

import { RoundedButton } from '../../components/RoundedButton';
import { spacing } from '../../utils/sizes';

export const Timing = ({ onChangeTime }) => {
  return (
    <>
      <View style={styles.timingButton}>
        <RoundedButton
          style={styles.button}
          size={75}
          title={10}
          onPress={() => onChangeTime(10)}
        />
        <RoundedButton
          style={styles.button}
          size={75}
          title={15}
          onPress={() => onChangeTime(15)}
        />
        <RoundedButton
          style={styles.button}
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

  button: {
    margin: spacing.sm,
  },
});
