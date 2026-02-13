import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';
import { colors } from '../../theme/colors';
import { useAuth } from '../../lib/AuthContext';
import { removeToken } from '../../lib/secureStore';
import { useRouter } from 'expo-router';


export default function DashboardHeader() {

  const router = useRouter();
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.menu}>☰</Text>
      </TouchableOpacity>

      <Text style={styles.streak}>Streak (4 Tage)</Text>

      <Pressable onPress={handleLogout}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }}
          style={styles.avatar}
        />
      </Pressable>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  menu: {
    fontSize: 30,
    color: colors.textPrimary,
    marginLeft: 10,
  },
  streak: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
});

