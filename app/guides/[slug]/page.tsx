import type { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import { getActivities, getGuides } from "@/lib/content/loader";
import { ActivityCard } from "@/components/ActivityCard";
export const dynamicParams = false;
export function generateStaticParams() { return getGuides().map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const item = getGuides().find((guide) => guide.slug === slug); return { title: item?.data.title ?? "家长课堂", description: item?.data.summary }; }
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const guide = getGuides().find((item) => item.slug === slug); if (!guide) notFound(); const related = getActivities().filter((item) => guide.data.relatedActivities.includes(item.slug)); const article = { "@context": "https://schema.org", "@type": "Article", headline: guide.data.title, description: guide.data.summary, dateModified: guide.data.updatedAt };
  return <main className="page-main"><article className="wrap" data-pagefind-body><p className="eyebrow">{guide.data.category}</p><h1>{guide.data.title}</h1><p className="lead">{guide.data.summary}</p>{guide.data.reviewer === "PENDING" && <aside className="callout alert w3">待专家审核：本文为示例内容，正式发布前会由相关专业人员审核。</aside>}<div className="content-card w2 guide-body"><ReactMarkdown>{guide.body}</ReactMarkdown></div><section className="content-card w1"><h2>审核与参考</h2><p>审核人：{guide.data.reviewer === "PENDING" ? "待专家审核" : guide.data.reviewer}</p>{guide.data.updatedAt && <p>更新时间：{guide.data.updatedAt}</p>}{guide.data.sources.length > 0 && <ul>{guide.data.sources.map((source) => <li key={source.title}>{source.url ? <a href={source.url} rel="noreferrer">{source.title}</a> : source.title}</li>)}</ul>}</section>{related.length > 0 && <section><h2>相关活动</h2><div className="related-grid">{related.map((activity, i) => <ActivityCard activity={activity} index={i} key={activity.slug} />)}</div></section>}<p><Link className="text-link" href="/guides/">← 返回家长课堂</Link></p><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article).replace(/</g, "\\u003c") }} /></article></main>;
}
