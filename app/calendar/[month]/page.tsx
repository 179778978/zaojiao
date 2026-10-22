import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getActivities, getGuides } from "@/lib/content/loader";
import { ActivityCard } from "@/components/ActivityCard";
import { themes } from "../page";
export const dynamicParams = false;
export function generateStaticParams() { return Array.from({ length: 13 }, (_, i) => ({ month: String(i + 24) })); }
export async function generateMetadata({ params }: { params: Promise<{ month: string }> }): Promise<Metadata> { const { month } = await params; return { title: `${month} 个月日历` }; }
export default async function MonthPage({ params }: { params: Promise<{ month: string }> }) { const { month: raw } = await params; const month = Number(raw); if (month < 24 || month > 36) notFound(); const activities = getActivities().filter((item) => item.data.minMonth <= month && item.data.maxMonth >= month).slice(0, 4); const guides = getGuides().slice(0, 2); return <main className="page-main"><div className="wrap"><p className="eyebrow">月龄日历</p><h1>{month} 个月：{themes[month - 24]}</h1><p className="lead">每个宝宝的兴趣和节奏都不同，可以从下面的灵感里挑一个试试。</p><section className="calendar-detail w2"><h2>本月重点能力</h2><p>社交情绪与语言表达（主题占位，供内容团队审核补充）。</p></section><section className="block"><h2>推荐活动</h2><div className="activity-grid">{activities.map((activity, i) => <ActivityCard activity={activity} index={i} key={activity.slug} />)}</div>{activities.length === 0 && <p>这个月龄的活动还在准备中。</p>}</section><section className="content-card w1"><h2>家长课堂</h2>{guides.map((guide) => <p key={guide.slug}><Link href={`/guides/${guide.slug}/`}>{guide.data.title}</Link></p>)}</section><Link className="text-link" href="/calendar/">← 返回月龄日历</Link></div></main>; }
