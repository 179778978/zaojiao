import type { Activity } from "./content/schema";

export type DrawItem = { slug: string; body: string; data: Activity };
export function chooseActivity(activities: DrawItem[], month: number, ability: string, lastSlug: string | null, random: () => number = Math.random): DrawItem | null {
  const pool = activities.filter(({ data: item }) => item.status === "published" && item.minMonth <= month && item.maxMonth >= month && (ability === "全部" || item.ability === ability));
  if (!pool.length) return null;
  const candidates = pool.length > 1 ? pool.filter((item) => item.slug !== lastSlug) : pool;
  return candidates[Math.floor(random() * candidates.length)] ?? candidates[0] ?? null;
}

export function filterActivities(activities: DrawItem[], params: URLSearchParams) {
  const abilities = params.getAll("ability");
  const month = Number(params.get("month") || 0);
  const duration = params.get("duration");
  const scene = params.get("scene");
  const material = params.get("material");
  const result = activities.filter(({ data }) => {
    const a = data;
    return (!abilities.length || abilities.includes(a.ability)) && (!month || (a.minMonth <= month && a.maxMonth >= month)) &&
      (!duration || (duration === "5" ? a.durationMin <= 5 : duration === "10" ? a.durationMin > 5 && a.durationMin <= 10 : a.durationMin >= 15)) &&
      (!scene || a.scenes.includes(scene as never)) && (!material || a.materialLevel === material);
  });
  if (params.get("sort") === "duration") result.sort((a, b) => a.data.durationMin - b.data.durationMin);
  else result.sort((a, b) => (b.data.publishedAt || "").localeCompare(a.data.publishedAt || ""));
  return result;
}
