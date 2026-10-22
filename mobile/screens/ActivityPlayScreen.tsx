import { useEffect, useState } from 'react';
import { BackHandler, Keyboard, Platform, Pressable, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { activities } from '../lib/content';
import { Button, Screen, Title } from '../components/UI';
import { useColors } from '../theme/colors';
type Props = NativeStackScreenProps<RootStackParamList, 'ActivityPlay'>;
export function ActivityPlayScreen({ route, navigation }: Props) {
  const c = useColors(); const item = activities.find((a) => a.slug === route.params.slug); const [index, setIndex] = useState(0);
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => { navigation.goBack(); return true; });
    return () => sub.remove();
  }, [navigation]);
  if (!item) return <Screen><Title>找不到这个活动</Title></Screen>;
  const done = index === item.steps.length - 1;
  const move = (delta: number) => { Keyboard.dismiss(); if (done && delta > 0) navigation.goBack(); else setIndex((n) => Math.max(0, Math.min(item.steps.length - 1, n + delta))); };
  return <Screen><Pressable onPress={() => navigation.goBack()} accessibilityRole="button"><Text style={{ color: c.green, fontWeight: '800', fontSize: 16 }}>‹ 关闭</Text></Pressable><Title>{item.title}</Title><Text style={{ color: c.muted, fontWeight: '700' }}>第 {index + 1} 步 / {item.steps.length}</Text><View style={{ height: 8, borderRadius: 99, backgroundColor: c.greenSoft, overflow: 'hidden' }}><View style={{ width: `${((index + 1) / item.steps.length) * 100}%`, height: 8, backgroundColor: c.green }} /></View><View style={{ flex: 1, minHeight: 250, justifyContent: 'center', padding: 10 }}><Text accessibilityLiveRegion="polite" style={{ color: c.ink, fontSize: 26, lineHeight: 38, fontWeight: '800', textAlign: 'center' }}>{item.steps[index]}</Text></View><View style={{ gap: 10 }}><Button title={done ? '完成' : '下一步'} onPress={() => move(1)} /><Button title="上一步" secondary onPress={() => move(-1)} /></View><Text style={{ color: c.muted, fontSize: 12, textAlign: 'center' }}>{Platform.OS === 'ios' ? '陪着宝宝慢慢来' : '家长请全程陪伴'}</Text></Screen>;
}
