// 仅在构建期（服务端组件、generateStaticParams）使用，不要在客户端组件中 import。
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { z } from "zod";
import { activitySchema, guideSchema, milestoneSchema } from "./schema";

const ROOT = path.join(process.cwd(), "content");

function loadCollection<S extends z.ZodTypeAny>(dir: string, schema: S) {
  const folder = path.join(ROOT, dir);
  return fs
    .readdirSync(folder)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(folder, file), "utf8"));
      const parsed = schema.safeParse(data);
      if (!parsed.success) {
        // schema 不通过就让构建失败，不要静默跳过
        throw new Error(`内容校验失败：content/${dir}/${file}\n${parsed.error.message}`);
      }
      return { slug: file.replace(/\.md$/, ""), body: content, data: parsed.data as z.infer<S> };
    });
}

export const getActivities = () =>
  loadCollection("activities", activitySchema).filter((a) => a.data.status === "published");

export const getGuides = () =>
  loadCollection("guides", guideSchema).filter((g) => g.data.status === "published");

export const getMilestones = () => {
  const folder = path.join(ROOT, "milestones");
  if (!fs.existsSync(folder)) return [];
  return fs.readdirSync(folder).filter((file) => file.endsWith(".json")).map((file) => {
    const raw: unknown = JSON.parse(fs.readFileSync(path.join(folder, file), "utf8"));
    const parsed = milestoneSchema.safeParse(raw);
    if (!parsed.success) throw new Error(`內容校验失败：content/milestones/${file}\n${parsed.error.message}`);
    return parsed.data;
  });
};
