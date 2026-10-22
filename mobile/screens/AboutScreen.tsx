import { Text } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';
import { guides } from '../lib/content';
import { Body, Card, ReviewNotice, Screen, Section, Title } from '../components/UI';
import { useColors } from '../theme/colors';
import { useRootNavigation } from '../navigation/RootNavigationContext';
export function AboutScreen(_: BottomTabScreenProps<MainTabParamList, '关于'>) {
  const rootNavigation = useRootNavigation();
  const c = useColors();
  return <Screen><Title subtitle="实用、轻松、有安全提醒的亲子灵感。">关于小芽</Title><Section title="家长课堂">{guides.map((g) => <Card key={g.slug} onPress={() => rootNavigation.navigate('GuideDetail', { slug: g.slug })}><Text style={{ color: c.ink, fontSize: 17, fontWeight: '800' }}>{g.title}</Text><Text style={{ color: c.muted }}>{g.category} · {g.summary}</Text></Card>)}</Section><Section title="内容审核"><Card><ReviewNotice /><Body>活动和文章会标注审核状态。涉及成长与健康的信息，由专业人员审核后再更新。</Body></Card></Section><Section title="免责声明"><Body>成长发育有个体差异。小芽早教内容仅供亲子活动参考，不能替代医生诊断；如有疑问，请咨询专业医护人员。</Body></Section><Section title="隐私说明"><Body>月龄偏好只保存在当前设备，不收集个人信息，不使用第三方追踪。</Body></Section><Text style={{ color: c.muted, textAlign: 'center', fontSize: 12 }}>小芽早教 · 陪宝宝一起慢慢长大</Text></Screen>;
}
