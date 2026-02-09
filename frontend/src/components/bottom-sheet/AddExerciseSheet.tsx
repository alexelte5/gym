import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import BottomSheet, {
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import { useMemo, useState, forwardRef } from 'react';
import { colors } from './../../theme/colors';
import { EXERCISES } from './../../constants/exercises';
import { Exercise } from './../../types/exercise';
import SearchInput from './ExerciseSearchBar';
import ExerciseListItem from './ExerciseListItem';


type Props = {
  onSelectExercise: (exercise: Exercise) => void;
};

const AddExerciseSheet = forwardRef<BottomSheet, Props>(
  ({ onSelectExercise }, ref) => {
    const snapPoints = useMemo(() => ['100%'], []);
    const [query, setQuery] = useState('');

    const filteredExercises = EXERCISES.filter(ex =>
      ex.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={styles.sheet}
        handleIndicatorStyle={styles.indicator}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Übung hinzufügen</Text>

          <SearchInput value={query} onChange={setQuery} />

          <BottomSheetFlatList<Exercise>
            data={filteredExercises}
            keyExtractor={(item: { id: any; }) => item.id}
            renderItem={({ item }: { item: Exercise }) => (
              <ExerciseListItem
                exercise={item}
                onPress={() => onSelectExercise(item)}
              />
            )}
          />
        </View>
      </BottomSheet>
    );
  }
);

export default AddExerciseSheet;

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: colors.background,
  },
  indicator: {
    backgroundColor: colors.gray,
    width: 48,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: 'white',
  },
});
