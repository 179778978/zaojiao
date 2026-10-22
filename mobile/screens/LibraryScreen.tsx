import { Text } from 'react-native';
import { Card, Screen, Tag, Title, Body } from '../components/UI';
import { useColors } from '../theme/colors';
const books = [
  { title: '猜猜我有多爱你', age: '适合 24–36 个月', tip: '一起猜一猜：你有多爱我？可以用动作表达。' },
  { title: '好饿的毛毛虫', age: '适合 24–36 个月', tip: '边翻页边数数，留意故事里每天发生的变化。' },
  { title: '抱抱', age: '适合 24–36 个月', tip: '看看每个动物怎么表达亲近，也听听宝宝的想法。' },
];
export function LibraryScreen() {
  const c = useColors();
  return <Screen><Title subtitle="不提供受版权保护的歌词全文。">绘本与歌谣</Title>{books.map((book) => <Card key={book.title} accent><Text accessibilityLabel={`${book.title} 封面插画占位`} style={{ fontSize: 42 }}>📚</Text><Tag>{book.age} · 封面占位</Tag><Text style={{ color: c.ink, fontSize: 19, fontWeight: '900' }}>{book.title}</Text><Body>{book.tip}</Body></Card>)}</Screen>;
}
