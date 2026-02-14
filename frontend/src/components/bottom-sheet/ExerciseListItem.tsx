import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Exercise } from './../../types/exercise'
import { colors } from './../../theme/colors';

type Props = {
  exercise: Exercise;
  onPress: () => void;
};

export default function ExerciseListItem({
  exercise,
  onPress,
}: Props) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.name}>{exercise.name}</Text>
      <Text style={styles.group}>{exercise.muscleGroup}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  group: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
