import { Text } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../navigation/types';
import { milestones } from '../lib/content';
import { Body, Card, ReviewNotice, Screen, Section, Tag, Title } from '../components/UI';
import { useColors } from '../theme/colors';
export function CalendarScreen(_: BottomTabScreenProps<MainTabParamList, '日历'>) {
  const c = useColors();
  return <Screen><Title subtitle="每个宝宝都有自己的节奏，内容仅供参考。">成长地图</Title><ReviewNotice /><Body>以下成长里程碑为占位内容，等待儿童发展专业人员审核。它们不能用于诊断或比较宝宝。</Body>{milestones.map((m) => <Section key={m.domain} title={m.domain}><Card><Tag>24–36 个月 · 待专家审核</Tag><Text style={{ color: c.ink, fontWeight: '800' }}>多数宝宝能做到</Text><Body>{m.typical}</Body><Text style={{ color: c.ink, fontWeight: '800' }}>可以多留意</Text><Body>{m.watch}</Body><Text style={{ color: c.muted }}>什么时候建议咨询医生：待专业人员提供</Text></Card></Section>)}</Screen>;
}
