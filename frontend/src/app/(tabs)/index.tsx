import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import ScreenWrapper from '../../components/layout/ScreenWrapper';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import TrainingPlanCard from '../../components/dashboard/TrainingPlanCard';
import StatsGrid from '../../components/dashboard/StatsGrid';
import StartTrainingButton from '../../components/dashboard/StartTrainingButton';
import SmallLeaderboard from '../../components/dashboard/SmallLeaderBoard';

export default function Dashboard() {
  return (
    <ScreenWrapper>
        <DashboardHeader />
        <SmallLeaderboard />
        <TrainingPlanCard />
        <StatsGrid />
        <StartTrainingButton />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 32,
  },
});
