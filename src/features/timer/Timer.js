import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';

import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/color';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { ProgressBar } from 'react-native-paper';
import { Timing } from './Timing';

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);

      setTimeout(() => clearInterval(interval), 3000);
    } else {
      Vibration.vibrate([500, 1000]);
    }
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          isPaused={!isStarted}
          minutes={minutes}
          onProgress={(progress) => setProgress(progress)}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing On:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.progressWrapper}>
        <ProgressBar
          progress={progress}
          color={colors.lightGreen}
          style={{ height: 10 }}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        <RoundedButton
          title={isStarted ? 'pause' : 'start'}
          onPress={() => setIsStarted(!isStarted)}
        />
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressWrapper: {
    paddingTop: spacing.xxl,
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  clearSubject: {
    paddingBottom: spacing.lg,
    paddingLeft: spacing.lg,
  },
});
