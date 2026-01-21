// src/components/progress/StatProgressCard.tsx
import { View, Text, StyleSheet } from 'react-native';
import ProgressRing from './ProgressRing';
import { colors } from '../../theme/colors';

type Props = {
  title: string;
  value: number;
  goal: number;
  unit: string;
};

export default function StatProgressCard({
  title,
  value,
  goal,
  unit,
}: Props) {
  const progress = Math.min(value / goal, 1);

  return (
    <View style={styles.card}>
      <ProgressRing
        progress={progress}
        label={`${Math.round(progress * 100)}%`}
      />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>
        {value} / {goal} {unit}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    width: '48%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  value: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
