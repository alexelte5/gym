import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { router } from 'expo-router';

export default function AddPlan() {
  return (
    <TouchableOpacity style={styles.button} onPress={() => router.push('./plans/NewTrainingPlan')}>
      <Text style={styles.text}>Plan erstellen</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    margin: 15
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
});
