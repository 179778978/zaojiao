import { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';
import { activities } from '../lib/content';
import { Card, Screen, Tag, Title } from '../components/UI';
import { useColors } from '../theme/colors';
import { useRootNavigation } from '../navigation/RootNavigationContext';
const filters = ['全部', '认知', '大运动', '精细动作'];
export function ActivitiesScreen(_: BottomTabScreenProps<MainTabParamList, '活动'>) {
  const rootNavigation = useRootNavigation();
  const c = useColors(); const [filter, setFilter] = useState('全部');
  const shown = useMemo(() => activities.filter((a) => filter === '全部' || a.ability === filter), [filter]);
  return <Screen><Title subtitle="按月龄和兴趣，挑一个轻松开始。">亲子活动</Title><View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>{filters.map((f) => <Pressable key={f} onPress={() => setFilter(f)} accessibilityRole="button" accessibilityState={{ selected: filter === f }} style={{ paddingVertical: 10, paddingHorizontal: 14, borderRadius: 999, backgroundColor: filter === f ? c.greenSoft : c.surface, borderColor: filter === f ? c.green : c.line, borderWidth: 1.5 }}><Text style={{ color: c.ink, fontWeight: '700' }}>{f}</Text></Pressable>)}</View>{shown.map((a) => <Card key={a.slug} onPress={() => rootNavigation.navigate('ActivityDetail', { slug: a.slug })}><Tag>{a.ability} · {a.durationMin} 分钟 · {a.minMonth} 个月起</Tag><Text style={{ color: c.ink, fontSize: 20, fontWeight: '900' }}>{a.title}</Text><Text style={{ color: c.muted, lineHeight: 22 }}>{a.summary}</Text><Text style={{ color: c.muted }}>材料 {a.materials.length} 种 · {a.scenes.join(' / ')}</Text></Card>)}</Screen>;
}
