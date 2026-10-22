import type { PropsWithChildren, ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useColors } from '../theme/colors';

export function Screen({ children }: PropsWithChildren) {
  const c = useColors();
  return <ScrollView style={{ backgroundColor: c.bg }} contentContainerStyle={s.screen} showsVerticalScrollIndicator={false}>{children}</ScrollView>;
}
export function Title({ children, subtitle }: { children: string; subtitle?: string }) {
  const c = useColors();
  return <View style={s.titleWrap}><Text style={[s.title, { color: c.ink }]}>{children}</Text>{subtitle ? <Text style={[s.subtitle, { color: c.muted }]}>{subtitle}</Text> : null}</View>;
}
export function Card({ children, accent = false, onPress }: PropsWithChildren<{ accent?: boolean; onPress?: () => void }>) {
  const c = useColors();
  const content = <View style={[s.card, { backgroundColor: accent ? c.greenSoft : c.surface, borderColor: c.line }]}>{children}</View>;
  return onPress ? <Pressable onPress={onPress} accessibilityRole="button">{content}</Pressable> : content;
}
export function Button({ title, onPress, secondary = false, icon }: { title: string; onPress: () => void; secondary?: boolean; icon?: ReactNode }) {
  const c = useColors();
  return <Pressable onPress={onPress} accessibilityRole="button" style={({ pressed }) => [s.button, { backgroundColor: secondary ? c.surface : c.green, borderColor: c.line, opacity: pressed ? 0.78 : 1 }]}><Text style={{ color: secondary ? c.ink : '#FFFFFF', fontSize: 16, fontWeight: '800' }}>{icon}{title}</Text></Pressable>;
}
export function Tag({ children }: PropsWithChildren) {
  const c = useColors();
  return <View style={[s.tag, { backgroundColor: c.greenSoft }]}><Text style={{ color: c.green, fontWeight: '700', fontSize: 12 }}>{children}</Text></View>;
}
export function ReviewNotice() {
  const c = useColors();
  return <View style={[s.notice, { backgroundColor: c.yellow }]}><Text style={{ color: '#27352B', fontWeight: '800' }}>待专家审核 · 内容仅供参考</Text></View>;
}
export function Section({ title, children }: PropsWithChildren<{ title: string }>) {
  const c = useColors();
  return <View style={s.section}><Text style={[s.sectionTitle, { color: c.ink }]}>{title}</Text>{children}</View>;
}
export function Body({ children }: PropsWithChildren) {
  const c = useColors();
  return <Text style={[s.body, { color: c.ink }]}>{children}</Text>;
}
export function SafetyNote({ children }: PropsWithChildren) {
  const c = useColors();
  return <View style={[s.safety, { borderColor: c.danger, backgroundColor: c.surface }]}><Text style={{ color: c.danger, fontWeight: '800', marginBottom: 4 }}>安全提醒</Text><Body>{children}</Body></View>;
}
const s = StyleSheet.create({ screen: { padding: 20, paddingTop: 18, paddingBottom: 42, gap: 18 }, titleWrap: { gap: 5 }, title: { fontSize: 27, lineHeight: 34, fontWeight: '900' }, subtitle: { fontSize: 14, lineHeight: 22 }, card: { borderWidth: 2, borderRadius: 22, padding: 16, gap: 11, shadowColor: '#27352B', shadowOffset: { width: 3, height: 3 }, shadowOpacity: 0.12, shadowRadius: 0, elevation: 2 }, button: { minHeight: 52, paddingHorizontal: 18, borderWidth: 2, borderRadius: 18, justifyContent: 'center', alignItems: 'center' }, tag: { alignSelf: 'flex-start', borderRadius: 999, paddingVertical: 5, paddingHorizontal: 10 }, section: { gap: 10 }, sectionTitle: { fontSize: 19, fontWeight: '900' }, body: { fontSize: 15, lineHeight: 24 }, notice: { padding: 11, borderRadius: 12 }, safety: { borderWidth: 2, borderRadius: 18, padding: 14, gap: 5 } });
