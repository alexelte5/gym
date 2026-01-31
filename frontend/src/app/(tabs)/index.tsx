import {
  ScrollView,
  StyleSheet,
  View, 
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
        <View style={styles.wrapper}>
          <SmallLeaderboard />
          <TrainingPlanCard />
          <StatsGrid />
          <StartTrainingButton />
        </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 15
  },
  content: {
    paddingBottom: 32,
  },
});
