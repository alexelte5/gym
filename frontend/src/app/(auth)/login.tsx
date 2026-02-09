import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { login } from '../../lib/api';
import { saveToken } from '../../lib/secureStore';

export default function Login() {
    const handleLogin = async () => {
        const res = await login(email, password);
        if (res.access_token) {
            await saveToken(res.access_token);
            router.replace("/(tabs)/about");
        }
    };

    return (
        <View style={styles.container}>
            <Text>Login</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
    },
    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff',
    },
});
