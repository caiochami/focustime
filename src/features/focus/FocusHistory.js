import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, FlatList } from 'react-native';

import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/color';

const HistoryItem = ({ item }) => {
  return (
    <Text style={historyItemStyles(item.status).item}>{item.subject}</Text>
  );
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  return (
    <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
      {!!focusHistory.length && (
        <>
          <Text style={styles.title}>Things we focused on.</Text>
          <FlatList
            contentContainerStyle={{ flex: 1, alignItems: 'center' }}
            data={focusHistory}
            renderItem={HistoryItem}
          />
          <View style={styles.clearContainer}>
            <RoundedButton size={75} title="Clear" onPress={() => onClear()} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const historyItemStyles = (status) =>
  StyleSheet.create({
    item: {
      color: status > 1 ? colors.red : colors.green,
      fontSize: fontSizes.md,
    },
  });

const styles = StyleSheet.create({
  title: {
    color: colors.white,
    fontSize: fontSizes.lg,
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.md,
  },
});
