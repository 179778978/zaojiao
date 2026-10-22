import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/Site";
export const metadata: Metadata = { title: "成长地图", description: "了解 24–36 个月宝宝不同领域的成长里程碑参考。" };
const domains = [{ id: "language", title: "语言", icon: "💬" }, { id: "movement", title: "大运动", icon: "🌱" }, { id: "fine-motor", title: "精细动作", icon: "🧩" }, { id: "cognition", title: "认知", icon: "🔎" }, { id: "social-emotional", title: "社交情绪", icon: "💛" }, { id: "self-care", title: "生活自理", icon: "🥄" }];
export default function MilestonesPage() { return <main className="page-main"><div className="wrap"><aside className="callout w3">发育有个体差异，以下内容仅供参考，不能替代专业诊断。</aside><PageHeading kicker="24–36 个月" title="成长地图" description="按领域看看日常里可能出现的小进步。每个宝宝都有自己的节奏。" /><div className="domain-grid">{domains.map((item, i) => <Link className={`domain-link w${i % 3 + 1}`} href={`/milestones/${item.id}/`} key={item.id}><span aria-hidden="true">{item.icon}</span><h2>{item.title}</h2><p>看看这个领域的参考内容 →</p></Link>)}</div></div></main>; }
