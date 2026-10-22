import type { Metadata } from "next";
import Link from "next/link";
import { getGuides } from "@/lib/content/loader";
import { PageHeading } from "@/components/Site";
export const metadata: Metadata = { title: "家长课堂", description: "陪伴 2–3 岁宝宝的日常方法与家庭互动建议。" };
export default function GuidesPage() { const guides = getGuides(); const categories = ["情绪与行为", "语言", "生活自理", "入园准备", "屏幕时间", "安全"]; return <main className="page-main"><div className="wrap"><PageHeading kicker="一起学习与陪伴" title="家长课堂" description="从生活里的小问题开始，找到适合你们家的相处方式。" />{categories.filter((category) => guides.some((guide) => guide.data.category === category)).map((category) => <section className="block" key={category}><h2>{category}</h2>{guides.filter((guide) => guide.data.category === category).map((guide) => <article className="content-card w2" key={guide.slug}><p className="eyebrow">{guide.data.category}</p><h3><Link href={`/guides/${guide.slug}/`}>{guide.data.title}</Link></h3><p>{guide.data.summary}</p><Link className="text-link" href={`/guides/${guide.slug}/`}>阅读全文 →</Link></article>)}</section>)}{guides.length === 0 && <p>家长课堂内容正在准备中。</p>}</div></main>; }
