import ScreenWrapper from "@/src/components/layout/ScreenWrapper";
import Exercise from "../../components/exercises/Exercise"
import { View, StyleSheet } from "react-native";
import AddExercise from "../../components/exercises/AddExercise";

export default function Trainingplan() {
  return (
    <ScreenWrapper>
        <View style={styles.wrapper}>
            <Exercise />
            <Exercise />
            <Exercise />
            <AddExercise />
        </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 15
  },
});


