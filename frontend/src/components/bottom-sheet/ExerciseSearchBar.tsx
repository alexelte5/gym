import { TextInput, StyleSheet } from 'react-native';
import { colors } from './../../theme/colors'

type Props = {
  value: string;
  onChange: (text: string) => void;
};

export default function SearchInput({ value, onChange }: Props) {
  return (
    <TextInput
      placeholder="Übung suchen…"
      placeholderTextColor={colors.textSecondary}
      style={styles.input}
      value={value}
      onChangeText={onChange}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
});
