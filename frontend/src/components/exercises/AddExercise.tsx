import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export default function AddExercise() {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>Übung hinzufügen</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
});
