import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { colors } from '../utils/color';
import { fontSizes, spacing } from '../utils/sizes';

const minutesToMillis = (min) => min * 1000 * 60;

const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 20, isPaused, onProgress, onEnd }) => {
  const [millis, setMillis] = useState(null);

  const minute = Math.floor(millis / 1000 / 60) % 60;

  const seconds = Math.floor(millis / 1000) % 60;

  const interval = React.useRef(null);

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);

        return time;
      }

      return time - 1000;
    });
  };

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
    
    if (millis === 0) {
      onEnd();
    }
  }, [millis]);

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  });

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});
