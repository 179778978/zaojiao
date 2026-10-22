import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { activitySchema, guideSchema, milestoneSchema } from "../src/lib/content/schema";

const root = path.join(process.cwd(), "content");
let failed = false;
for (const [folder, schema] of [["activities", activitySchema], ["guides", guideSchema]] as const) {
  const dir = path.join(root, folder);
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir).filter((name) => name.endsWith(".md"))) {
    const parsed = schema.safeParse(matter(fs.readFileSync(path.join(dir, file), "utf8")).data);
    if (!parsed.success) { console.error(`content/${folder}/${file}:\n${parsed.error.message}`); failed = true; }
  }
}
const milestones = path.join(root, "milestones");
if (fs.existsSync(milestones)) for (const file of fs.readdirSync(milestones).filter((name) => name.endsWith(".json"))) {
  let json: unknown;
  try { json = JSON.parse(fs.readFileSync(path.join(milestones, file), "utf8")); } catch (error) { console.error(`content/milestones/${file}: ${String(error)}`); failed = true; continue; }
  const parsed = milestoneSchema.safeParse(json);
  if (!parsed.success) { console.error(`content/milestones/${file}:\n${parsed.error.message}`); failed = true; }
}
if (failed) process.exit(1);
console.log("内容校验通过");
