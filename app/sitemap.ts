import type { MetadataRoute } from "next";
import { getActivities, getGuides } from "@/lib/content/loader";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://xiaoya-zaojiao.qiaozai-zaojiao.workers.dev";
  const fixed = ["", "/activities/", "/guides/", "/milestones/", "/library/", "/calendar/", "/search/", "/about/"];
  const pages = [...fixed, ...getActivities().flatMap(({ slug }) => [`/activities/${slug}/`, `/activities/${slug}/play/`]), ...getGuides().map(({ slug }) => `/guides/${slug}/`), ...Array.from({ length: 13 }, (_, i) => `/calendar/${i + 24}/`), ...["language", "movement", "fine-motor", "cognition", "social-emotional", "self-care"].map((domain) => `/milestones/${domain}/`), ...["feelings", "animals", "daily"].map((slug) => `/library/${slug}/`)];
  return pages.map((path) => ({ url: `${base}${path}`, lastModified: new Date("2026-10-22") }));
}
