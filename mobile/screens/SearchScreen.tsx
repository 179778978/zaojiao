import { useMemo, useState } from 'react';
import { Text, TextInput } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { activities, guides } from '../lib/content';
import { Card, Screen, Tag, Title } from '../components/UI';
import { useColors } from '../theme/colors';
type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;
export function SearchScreen({ navigation }: Props) {
  const c = useColors(); const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const q = query.trim().toLowerCase(); if (!q) return [];
    return [
      ...activities.filter((x) => `${x.title} ${x.summary} ${x.ability} ${x.skills}`.toLowerCase().includes(q)).map((x) => ({ title: x.title, summary: x.summary, onPress: () => navigation.navigate('ActivityDetail', { slug: x.slug }) })),
      ...guides.filter((x) => `${x.title} ${x.summary} ${x.category} ${x.body}`.toLowerCase().includes(q)).map((x) => ({ title: x.title, summary: x.summary, onPress: () => navigation.navigate('GuideDetail', { slug: x.slug }) })),
    ];
  }, [navigation, query]);
  return <Screen><Title subtitle="搜索活动与家长课堂。">搜索</Title><TextInput accessibilityLabel="搜索内容" placeholder="试试：动物、情绪、串珠" placeholderTextColor={c.muted} value={query} onChangeText={setQuery} autoCapitalize="none" style={{ minHeight: 52, paddingHorizontal: 14, borderWidth: 2, borderColor: c.line, borderRadius: 16, backgroundColor: c.surface, color: c.ink, fontSize: 16 }} /><Text style={{ color: c.muted, fontWeight: '700' }}>热门搜索</Text>{['情绪', '分类游戏', '串珠安全'].map((word) => <Card key={word} onPress={() => setQuery(word)}><Tag>{word}</Tag></Card>)}{results.map((result) => <Card key={result.title} onPress={result.onPress}><Text style={{ color: c.ink, fontSize: 18, fontWeight: '900' }}>{result.title}</Text><Text style={{ color: c.muted }}>{result.summary}</Text></Card>)}{query.trim() && !results.length ? <Text style={{ color: c.muted }}>没有找到相关内容，试试其他关键词。</Text> : null}</Screen>;
}
