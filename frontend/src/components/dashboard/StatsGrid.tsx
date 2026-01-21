// components/dashboard/StatsGrid.tsx
import { View, StyleSheet } from 'react-native';
import StatProgressCard from '../progress/StatProgressCards';

export default function StatsGrid() {
  return (
    <View style={styles.grid}>
      <StatProgressCard
        title="Wasser"
        value={1.8}
        goal={3}
        unit="L"
      />
      <StatProgressCard
        title="Schlafen"
        value={6.5}
        goal={8}
        unit="h"
      />
      <StatProgressCard
        title="Schritte"
        value={8200}
        goal={10000}
        unit=""
      />
      <StatProgressCard
        title="Kalorien"
        value={2504}
        goal={2800}
        unit="kcal"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
});
