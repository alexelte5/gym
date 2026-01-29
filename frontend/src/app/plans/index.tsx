import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import ScreenWrapper from '../../components/layout/ScreenWrapper';
import PlanList from '../../components/plans/PlanList';
import AddPlan from '../../components/plans/AddPlan';

export default function TrainingPlans() {
  return (
    <ScreenWrapper>
        <PlanList />
        <AddPlan />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 32,
  },
});
