import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';

import { fontSizes, spacing } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundedButton';
import { colors } from '../../utils/colors';

const HistoryItem = ({ item }) => {
  return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we've focused on</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={styles.list}
              data={focusHistory}
              renderItem={HistoryItem}
              keyExtractor={focusHistory.key}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title="clear"
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status === 1 ? colors.green : colors.red,
    fontSize: fontSizes.md,
  }),

  container: {
    flex: 0.5,
    alignItems: 'center',
  },

  title: {
    color: colors.white,
    fontSize: fontSizes.lg,
  },

  list: {
    flex: 1,
    alignItems: 'center',
  },

  clearContainer: {
    alignItems: 'center',
    padding: spacing.md,
  },
});
