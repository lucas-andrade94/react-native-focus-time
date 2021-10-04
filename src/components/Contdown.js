import React, { useState, useEffect, useRef } from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';

const minutesToMilliSeconds = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 20, isPaused, onProgress, onEnd }) => {
  const interval = useRef(null);
  const [milliSeconds, setMilliSeconds] = useState(
    minutesToMilliSeconds(minutes)
  );
  const minute = Math.floor(milliSeconds / 1000 / 60) % 60;
  const second = Math.floor(milliSeconds / 1000) % 60;

  const countDown = () => {
    setMilliSeconds((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    setMilliSeconds(minutesToMilliSeconds(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(milliSeconds / minutesToMilliSeconds(minutes));
    if (milliSeconds === 0) {
      onEnd();
    }
  }, [milliSeconds]);

  useEffect(() => {
    if (isPaused) {
      return;
    }
    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused, milliSeconds]);

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(second)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});
