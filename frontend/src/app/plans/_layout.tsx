import { Stack } from 'expo-router';
import { colors } from '../../theme/colors';

export default function PlansLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: 'Trainingspläne' }}
      />
      <Stack.Screen
        name="Trainingplan"
        options={{ title: 'Testplan' }}
      />
      <Stack.Screen
        name="NewTrainingPlan"
        options={{ title: 'Neu' }}
      />
    </Stack>
  );
}
