import { Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { guides } from '../lib/content';
import { Body, Card, ReviewNotice, Screen, Section, Tag, Title } from '../components/UI';
import { useColors } from '../theme/colors';
type Props = NativeStackScreenProps<RootStackParamList, 'GuideDetail'>;
export function GuideDetailScreen({ route }: Props) {
  const c = useColors(); const item = guides.find((g) => g.slug === route.params.slug);
  if (!item) return <Screen><Title>找不到这篇文章</Title></Screen>;
  return <Screen><Title subtitle={item.summary}>{item.title}</Title><Tag>{item.category}</Tag><ReviewNotice /><Card><Body>{item.body}</Body></Card><Section title="相关活动">{item.relatedActivities.map((slug) => <Text key={slug} style={{ color: c.green, fontWeight: '800' }}>{slug === 'animal-home' ? '小动物找家' : '瓶盖对对碰'}</Text>)}</Section><Body>更新时间：2026 年 10 月 22 日</Body></Screen>;
}
