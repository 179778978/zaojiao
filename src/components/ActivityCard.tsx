import Link from "next/link";
import type { Activity } from "@/lib/content/schema";
export type LoadedActivity = { slug: string; body: string; data: Activity };
export function ActivityCard({ activity, index = 0 }: { activity: LoadedActivity; index?: number }) {
  const a = activity.data;
  return <article className={`activity-card w${index % 3 + 1}`}><div className="card-tags"><span className="tag" data-ability={a.ability}>{a.ability}</span><span className="quiet-tag">{a.durationMin} 分钟</span></div><h3><Link href={`/activities/${activity.slug}/`}>{a.title}</Link></h3><p>{a.summary}</p><div className="card-meta"><span>{a.minMonth} 个月起</span><span>{a.materials.length ? `${a.materials.length} 种材料` : "无需材料"}</span></div><Link className="text-link" href={`/activities/${activity.slug}/`}>看看怎么玩 <span aria-hidden="true">→</span></Link></article>;
}
