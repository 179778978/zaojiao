import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/Site";
export const metadata: Metadata = { title: "月龄日历", description: "查看 24–36 个月的主题、重点能力与亲子活动推荐。" };
const themes = ["一起说说话", "动手来探索", "认识新朋友", "情绪小侦探", "我能自己来", "身体动起来", "发现形状", "照顾小动物", "快乐共阅读", "听听声音", "学会轮流", "生活小帮手", "慢慢长大"];
export { themes };
export default function CalendarPage() { return <main className="page-main"><div className="wrap"><PageHeading kicker="24–36 个月" title="月龄日历" description="每个月龄都有一份轻量主题。跟着兴趣走，不需要按表完成。" /><div className="calendar-grid">{themes.map((theme, i) => <Link href={`/calendar/${i + 24}/`} className={`calendar-tile w${i % 3 + 1}`} key={theme}><strong>{i + 24} 个月</strong><span>{theme}</span></Link>)}</div></div></main>; }
