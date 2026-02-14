import { TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import { colors } from '../../theme/colors';
import React from 'react';

export default function ExerciseNameInput() {
  const [text, onChangeText] = React.useState('Traningplan Title');


  return (
    <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomColor: colors.gray,
    borderTopColor: colors.background,
    borderRightColor: colors.background,
    borderLeftColor: colors.background,
    color: colors.gray,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
