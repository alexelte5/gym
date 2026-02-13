import ScreenWrapper from "@/src/components/layout/ScreenWrapper";
import Exercise from "../../components/exercises/Exercise"
import { View, StyleSheet, TouchableOpacity, Button, Pressable, Text } from "react-native";
import AddExerciseSheet from "@/src/components/bottom-sheet/AddExerciseSheet";
import { useRef } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { colors } from "@/src/theme/colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Trainingplan() {
  const exercises = [
  { id: '1', name: 'Bankdrücken', muscle: 'Brust' },
  { id: '2', name: 'Kniebeugen', muscle: 'Beine' },
  { id: '3', name: 'Klimmzüge', muscle: 'Rücken' },
];

const sheetRef = useRef<BottomSheet>(null);

  function handleAdd(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <GestureHandlerRootView>
      <ScreenWrapper>
          <View style={styles.wrapper}>
              <Exercise />
              <Exercise />
              <Exercise />
              
              <TouchableOpacity style={styles.button} onPress={() => sheetRef.current?.expand()}>
                <Text style={styles.text}>Übung hinzufügen</Text>
              </TouchableOpacity>
              
          </View>
          <AddExerciseSheet
                ref={sheetRef}
                onSelectExercise={(exercise) => {
                  console.log('Selected:', exercise);
                  sheetRef.current?.close();
                }}
              />
      </ScreenWrapper>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 15
  },
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



