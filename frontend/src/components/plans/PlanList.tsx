import Plan from "./Plan"
import { View, StyleSheet } from "react-native";

export default function PlanList() {
  return (
    <View style={styles.wrapper}>
      <Plan />
      <Plan />
      <Plan />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 15
  },
});


