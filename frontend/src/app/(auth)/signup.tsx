import { useState } from 'react';
import { router } from 'expo-router';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    Alert,
} from 'react-native';

import { login, signup } from '../../lib/api';
import { saveToken } from '../../lib/secureStore';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password || !confirmedPassword) {
            Alert.alert('Fehler', 'Bitte Email und Passwort eingeben');
            return;
        }

        if (password != confirmedPassword) {
            Alert.alert('Fehler', 'Die Passwörter stimmen nicht überein');
            return;
        }

        setLoading(true);
        try {
            const response = await signup(email, password);

            if (!response.access_token) {
                throw new Error(response.detail || 'SignUp fehlgeschlagen');
            }

            await saveToken(response.access_token);

            router.replace('/login');
        } catch (err: any) {
            Alert.alert('SignUp fehlgeschlagen', err.message || 'Ein Account mit dieser Email Adresse existiert bereits');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

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
                value={confirmedPassword}
                onChangeText={setConfirmedPassword}
            />
            
            <TextInput
                style={styles.input}
                placeholder="Passwort bestätigen"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <Pressable
                style={styles.button}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Lädt...' : 'Registrieren'}
                </Text>
            </Pressable>

            <Pressable onPress={() => router.push('/login')}>
                <Text style={styles.link}>Bereits einen Account? Anmelden</Text>
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
});

