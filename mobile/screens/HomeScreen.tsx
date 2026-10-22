import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';
import { activities, pickActivity, type Activity } from '../lib/content';
import { Body, Button, Card, Screen, Section, Tag, Title } from '../components/UI';
import { useColors } from '../theme/colors';
import { useRootNavigation } from '../navigation/RootNavigationContext';

const MONTH_KEY = 'xiaoya.mobile.month.v1';
const abilities = ['全部', '认知', '大运动', '精细动作', '语言', '社交情绪'];
export function HomeScreen(_: BottomTabScreenProps<MainTabParamList, '首页'>) {
  const rootNavigation = useRootNavigation();
  const c = useColors();
  const [month, setMonth] = useState(28);
  const [ability, setAbility] = useState('全部');
  const [picked, setPicked] = useState<Activity | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  useEffect(() => { void AsyncStorage.getItem(MONTH_KEY).then((v) => { const n = Number(v); if (n >= 24 && n <= 36) setMonth(n); }).catch(() => undefined); }, []);
  const updateMonth = (next: number) => { const value = Math.max(24, Math.min(36, next)); setMonth(value); void AsyncStorage.setItem(MONTH_KEY, String(value)).catch(() => undefined); };
  const draw = () => { const item = pickActivity(month, ability, previous); if (item) { setPicked(item); setPrevious(item.slug); } else setPicked(null); };
  return <Screen>
    <View style={s.brand}><Text style={[s.sprout, { color: c.green }]}>✿</Text><Text style={[s.brandTitle, { color: c.ink }]}>小芽早教</Text><Text style={[s.brandSub, { color: c.muted }]}>陪宝宝一起慢慢长大</Text></View>
    <Card accent><Text style={{ color: c.ink, fontSize: 16, fontWeight: '800' }}>宝宝现在 {month} 个月</Text><View style={s.monthRow}><Pressable accessibilityLabel="减少月龄" onPress={() => updateMonth(month - 1)} style={[s.stepper, { borderColor: c.line }]}><Text style={{ color: c.ink, fontSize: 22 }}>−</Text></Pressable><Text style={{ color: c.ink, fontSize: 32, fontWeight: '900' }}>{month}<Text style={{ fontSize: 14 }}> 个月</Text></Text><Pressable accessibilityLabel="增加月龄" onPress={() => updateMonth(month + 1)} style={[s.stepper, { borderColor: c.line }]}><Text style={{ color: c.ink, fontSize: 22 }}>＋</Text></Pressable></View><Text style={{ color: c.muted }}>每个宝宝都有自己的成长节奏</Text></Card>
    <Section title="今天想玩什么？"><View style={s.chips}>{abilities.map((label) => <Pressable key={label} onPress={() => setAbility(label)} accessibilityRole="button" accessibilityState={{ selected: ability === label }} style={[s.chip, { borderColor: ability === label ? c.green : c.line, backgroundColor: ability === label ? c.greenSoft : c.surface }]}><Text style={{ color: c.ink, fontWeight: '700' }}>{label}</Text></Pressable>)}</View><Button title="抽一个游戏" onPress={draw} /></Section>
    {picked ? <Card accent><Tag>{picked.ability} · {picked.durationMin} 分钟</Tag><Text style={{ color: c.ink, fontSize: 22, fontWeight: '900' }}>{picked.title}</Text><Body>{picked.summary}</Body><Body>材料：{picked.materials.join('、')}</Body><Body>玩法：{picked.steps.join(' ')}</Body><Body>在练：{picked.skills}</Body>{picked.safety ? <Body>安全提醒：{picked.safety}</Body> : null}<Button title="查看完整玩法" onPress={() => rootNavigation.navigate('ActivityDetail', { slug: picked.slug })} /></Card> : <Text style={[s.empty, { color: c.muted }]}>选一个能力，抽取今天的亲子小游戏。</Text>}
    <Section title="本月主题"><Card><Tag>28–30 个月</Tag><Body>一起发现身边的小事物。跟着宝宝的兴趣玩一会儿就好。</Body></Card></Section>
    <Section title="家长常问">{activities.map((item) => <Card key={item.slug} onPress={() => rootNavigation.navigate('ActivityDetail', { slug: item.slug })}><Text style={{ color: c.ink, fontWeight: '800', fontSize: 16 }}>{item.title}</Text><Text style={{ color: c.muted }}>{item.summary}</Text></Card>)}</Section>
    <Text style={[s.disclaimer, { color: c.muted }]}>每个宝宝的发育节奏不同。本内容仅供亲子活动参考，不能替代医生诊断。</Text>
  </Screen>;
}
const s = StyleSheet.create({ brand: { alignItems: 'center', paddingVertical: 10, gap: 2 }, sprout: { fontSize: 30 }, brandTitle: { fontSize: 30, fontWeight: '900' }, brandSub: { fontSize: 13 }, monthRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 4 }, stepper: { width: 44, height: 44, borderWidth: 2, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }, chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, chip: { minHeight: 40, borderWidth: 1.5, borderRadius: 999, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 13 }, empty: { textAlign: 'center', padding: 16 }, disclaimer: { fontSize: 12, lineHeight: 18, textAlign: 'center', paddingHorizontal: 10 } });
