import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import { ProgressBar } from 'react-native-paper';

import { colors } from '../../utils/colors';
import { Countdown } from '../../components/Contdown';
import { RoundedButton } from '../../components/RoundedButton';
import { spacing } from '../../utils/sizes';
import { Timing } from './Timing';

const DEFAULT_TIME = 5;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState();

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      Vibration.vibrate(2000);
    }
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <ProgressBar
        progress={progress}
        color={colors.lightBlue}
        style={styles.progressBar}
      />
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title={'pause'} onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title={'start'} onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton
          title={'back'}
          size={50}
          onPress={() => clearSubject()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: colors.white,
    textAlign: 'center',
  },

  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  progressBar: {
    height: 10,
    marginTop: spacing.sm,
  },

  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },

  clearSubject: {
    paddingBottom: spacing.lg,
    paddingTop: spacing.lg,
    paddingLeft: spacing.lg,
  },
});
