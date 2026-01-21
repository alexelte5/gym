import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import ScreenWrapper from '../layout/ScreenWrapper';
import DashboardHeader from './DashboardHeader';
import TrainingPlanCard from './TrainingPlanCard';
import StatsGrid from './StatsGrid';
import StartTrainingButton from './StartTrainingButton';
import SmallLeaderboard from './SmallLeaderBoard';

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
