import { Text } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { activities } from '../lib/content';
import { Body, Button, Card, SafetyNote, Screen, Section, Tag, Title } from '../components/UI';
import { useColors } from '../theme/colors';
type Props = NativeStackScreenProps<RootStackParamList, 'ActivityDetail'>;
export function ActivityDetailScreen({ route, navigation }: Props) {
  const c = useColors(); const item = activities.find((a) => a.slug === route.params.slug);
  if (!item) return <Screen><Title>找不到这个活动</Title></Screen>;
  return <Screen><Title subtitle={item.summary}>{item.title}</Title><Tag>{item.ability} · {item.minMonth}–{item.maxMonth} 个月 · {item.durationMin} 分钟</Tag><Section title="准备材料"><Card>{item.materials.map((m) => <Text key={m} style={{ color: c.ink, fontSize: 16 }}>□  {m}</Text>)}</Card></Section><Section title="玩法步骤">{item.steps.map((step, i) => <Card key={step}><Tag>第 {i + 1} 步</Tag><Body>{step}</Body></Card>)}</Section><Section title="在练什么"><Body>{item.skills}</Body></Section>{item.troubleshooting ? <Section title="宝宝不配合怎么办"><Body>{item.troubleshooting}</Body></Section> : null}{item.advanced ? <Section title="进阶玩法"><Body>{item.advanced}</Body></Section> : null}{item.safety ? <SafetyNote>{item.safety}</SafetyNote> : null}<Button title="开始玩" onPress={() => navigation.navigate('ActivityPlay', { slug: item.slug })} /><Section title="相关活动">{activities.filter((a) => a.slug !== item.slug && a.ability === item.ability).slice(0, 3).map((a) => <Card key={a.slug} onPress={() => navigation.replace('ActivityDetail', { slug: a.slug })}><Text style={{ color: c.ink, fontWeight: '800' }}>{a.title}</Text></Card>)}</Section><Body>本活动内容待专家审核。请根据宝宝状态调整，家长全程陪伴。</Body></Screen>;
}
