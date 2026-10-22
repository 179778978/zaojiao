import type { Metadata } from "next";
import { getActivities } from "@/lib/content/loader";
import { ActivityFilters } from "@/components/ActivityFilters";
import { PageHeading } from "@/components/Site";
export const metadata: Metadata = { title: "亲子活动库", description: "按月龄、能力和场景筛选适合 2–3 岁宝宝的亲子小游戏。" };
export default function ActivitiesPage() { const activities = getActivities(); return <main className="page-main"><div className="wrap"><PageHeading kicker="一起动手玩" title="亲子活动库" description="挑一个今天刚好合适的小活动，跟着宝宝的节奏来就好。" /><ActivityFilters activities={activities} defaultMonth={28} /></div></main>; }
