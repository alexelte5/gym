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

import { forgotPassword } from '../../lib/api';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!email) {
            Alert.alert('Fehler', 'Bitte Email eingeben');
            return;
        }

        setLoading(true);
        try {
            await forgotPassword(email);

            Alert.alert(
                'Email gesendet',
                'Falls ein Account existiert, haben wir dir eine Email geschickt.'
            );

            router.back(); // zurück zum Login
        } catch (err) {
            Alert.alert('Fehler', 'Bitte versuche es später erneut');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Passwort vergessen</Text>

            <Text style={styles.subtitle}>
                Gib deine Email ein, um dein Passwort zurückzusetzen.
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            <Pressable
                style={styles.button}
                onPress={handleSubmit}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Senden...' : 'Reset-Link senden'}
                </Text>
            </Pressable>

            <Pressable onPress={() => router.back()}>
                <Text style={styles.link}>Zurück zum Login</Text>
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
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    subtitle: {
        color: '#ccc',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
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
