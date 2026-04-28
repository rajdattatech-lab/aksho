import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { aksho } from '@/constants/aksho';
import { supabase } from '@/lib/supabase';

type Status = 'checking' | 'ok' | 'error';

export default function HomeScreen() {
  const [status, setStatus] = useState<Status>('checking');
  const [detail, setDetail] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { error } = await supabase.auth.getSession();
        if (error) throw error;
        setStatus('ok');
        setDetail('Connected · not signed in');
      } catch (e: any) {
        setStatus('error');
        setDetail(e?.message || String(e));
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.brand}>Aksho</Text>
        <Text style={styles.tagline}>EVERY AKS, ORGANIZED</Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Supabase Connection</Text>
          {status === 'checking' && (
            <View style={styles.row}>
              <ActivityIndicator color={aksho.colors.mint} />
              <Text style={styles.cardValue}>Testing…</Text>
            </View>
          )}
          {status === 'ok' && (
            <Text style={[styles.cardValue, { color: aksho.colors.mint }]}>
              ✓ {detail}
            </Text>
          )}
          {status === 'error' && (
            <Text style={[styles.cardValue, { color: aksho.colors.red }]}>
              ✗ {detail}
            </Text>
          )}
        </View>

        <Text style={styles.foot}>Phase 0 · Connection Test</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: aksho.colors.bg,
  },
  container: {
    flexGrow: 1,
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brand: {
    fontSize: 80,
    fontWeight: '300',
    color: aksho.colors.ink,
    letterSpacing: -3,
  },
  tagline: {
    fontSize: 11,
    color: aksho.colors.inkMute,
    marginTop: 4,
    letterSpacing: 3,
    fontWeight: '700',
  },
  card: {
    marginTop: 56,
    padding: 24,
    backgroundColor: aksho.colors.surface,
    borderRadius: aksho.radius.lg,
    borderWidth: 1,
    borderColor: aksho.colors.line,
    width: '100%',
    maxWidth: 360,
  },
  cardLabel: {
    fontSize: 11,
    color: aksho.colors.inkMute,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 12,
  },
  cardValue: {
    fontSize: 16,
    color: aksho.colors.ink,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  foot: {
    marginTop: 48,
    fontSize: 11,
    color: aksho.colors.inkDim,
    letterSpacing: 2,
    fontWeight: '600',
  },
});
