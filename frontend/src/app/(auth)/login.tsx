import { startTransition, useState } from 'react';
import { router } from 'expo-router';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    Alert,
} from 'react-native';

import { useAuth } from '../../lib/AuthContext';
import { login as apiLogin } from '../../lib/api';

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Fehler', 'Bitte Email und Passwort eingeben');
            return;
        }

        setLoading(true);
        try {
            const response = await apiLogin(email, password);

            if (!response.access_token) {
                throw new Error(response.detail || 'Login fehlgeschlagen');
            }

            await login(response.access_token);
        } catch (err: any) {
            Alert.alert('Login fehlgeschlagen', err.message || 'Email oder Passwort falsch');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Passwort"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <Pressable style={styles.forgotPassword} onPress={() => router.push('/forgotPassword')}>
                <Text style={styles.forgotPasswordLink}>Passwort vergessen?</Text>
            </Pressable>

            <Pressable
                style={styles.button}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Lädt...' : 'Einloggen'}
                </Text>
            </Pressable>

            <Pressable onPress={() => router.push('/signup')}>
                <Text style={styles.link}>Noch kein Account? Registrieren</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        color: '#fff',
        fontSize: 28,
        marginBottom: 24,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        backgroundColor: '#333',
        color: '#fff',
        padding: 14,
        borderRadius: 8,
        marginBottom: 12,
    },
    button: {
        width: '100%',
        backgroundColor: '#4f46e5',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    link: {
        color: '#fff',
        marginTop: 20,
        textDecorationLine: 'underline',
    },
    forgotPassword: {
        marginRight: 20,
        alignSelf: 'flex-end',
    },
    forgotPasswordLink: {
        color: '#aaaaaa',
        marginTop: 0,
        marginBottom: 30,
        textDecorationLine: 'underline',
        marginLeft: 0,
    },
});

