import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors } from '../../theme/colors';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';


export default function Plan() {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.button}>
        <View style={styles.box}>
            <Feather name="image" size={80} color="black" />
            <View style={styles.top}>
                <Text style={styles.title}>Brustpresse</Text>
            </View> 
        </View>
        
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box:{
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 15,
  },
  more:{
    marginRight: 8,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:'100%'
  },
  button: {
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'flex-start',
    marginVertical: 5
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginLeft: 15,
    marginBottom: 5,
  },
  exercises: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 15,
  },
});
