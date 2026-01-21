import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

const days = [
  { label: 'Mo, 16.', value: 'Push' },
  { label: 'Di, 17.', value: 'Pull' },
  { label: 'Mi, 18.', value: '' },
  { label: 'Do, 19.', value: '' },
  { label: 'Fr, 20.', value: '' },
  { label: 'Sa, 21.', value: '' },
];

export default function WeekSelector() {
  return (
    <View style={styles.container}>
      {days.map((day, index) => (
        <View
          key={index}
          style={[
            styles.day,
            index === 5 && styles.selected,
          ]}
        >
          <Text style={styles.dayText}>{day.label}</Text>
          {!!day.value && (
            <Text style={styles.value}>{day.value}</Text>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  day: {
    backgroundColor: colors.gray,
    borderRadius: 12,
    padding: 8,
    width: 56,
  },
  selected: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  dayText: {
    fontSize: 12,
  },
  value: {
    fontSize: 12,
    fontWeight: '600',
  },
});
