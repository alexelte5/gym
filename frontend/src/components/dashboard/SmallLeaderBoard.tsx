import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

export default function SmallLeaderBoard() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Hier kommt bald etwas tolles!</Text>
      </View>
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
