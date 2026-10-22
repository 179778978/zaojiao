import { notFound } from "next/navigation";
import { getActivities } from "@/lib/content/loader";
import { PlayMode } from "@/components/PlayMode";
export const dynamicParams = false;
export function generateStaticParams() { return getActivities().map(({ slug }) => ({ slug })); }
export default async function PlayPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const item = getActivities().find((activity) => activity.slug === slug); if (!item) notFound(); return <PlayMode slug={slug} title={item.data.title} steps={item.data.steps} />; }
