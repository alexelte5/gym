import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import WeekSelector from './WeekSelector';
import { colors } from '../../theme/colors';
import { IconSymbol } from '@/app-example/components/ui/icon-symbol.ios';
import Feather from '@expo/vector-icons/Feather';

export default function TrainingPlanCard() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Dein Trainingsplan</Text>
        <TouchableOpacity>
          <Feather name="edit-3" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Push–Pull–Legs</Text>

      <WeekSelector />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 12,
    color: colors.textSecondary,
  },
  edit: {
    fontSize: 18,
  },
});
