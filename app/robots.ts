import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/" }, sitemap: "https://xiaoya-zaojiao.qiaozai-zaojiao.workers.dev/sitemap.xml" }; }
