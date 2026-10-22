import { z } from "zod";

export const ABILITIES = ["语言", "大运动", "精细动作", "认知", "社交情绪", "生活自理"] as const;
export const SCENES = ["室内", "户外", "雨天", "睡前"] as const;
export const GUIDE_CATEGORIES = ["情绪与行为", "语言", "生活自理", "入园准备", "屏幕时间", "安全"] as const;

// gray-matter 会把 2026-10-22 解析成 Date，这里统一转成 "YYYY-MM-DD" 字符串
const dateStr = z
  .union([z.string(), z.date()])
  .transform((v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v));

export const activitySchema = z
  .object({
    title: z.string().min(2),
    summary: z.string().min(5),                    // 一句话亮点
    ability: z.enum(ABILITIES),
    minMonth: z.number().int().min(24).max(36),
    maxMonth: z.number().int().min(24).max(36).default(36),
    durationMin: z.number().int().min(3).max(30),
    scenes: z.array(z.enum(SCENES)).min(1),
    materialLevel: z.enum(["无需材料", "家中常见物品", "需购买"]),
    materials: z.array(z.string()).default([]),
    steps: z
      .array(z.object({ text: z.string().min(2), image: z.string().optional(), alt: z.string().optional() }))
      .min(3)
      .max(5),
    skills: z.string(),                            // 在练什么
    troubleshooting: z.string().optional(),        // 宝宝不配合怎么办
    advanced: z.string().optional(),               // 进阶玩法
    safety: z.string().optional(),                 // 安全提醒；有风险就必须填
    reviewer: z.string().default("PENDING"),       // PENDING = 待专家审核
    reviewedAt: dateStr.optional(),
    status: z.enum(["draft", "published"]).default("draft"),
    publishedAt: dateStr.optional(),
  })
  .refine((a) => a.maxMonth >= a.minMonth, { message: "maxMonth 不能小于 minMonth" })
  .refine((a) => a.steps.every((s) => !s.image || !!s.alt), { message: "带图片的步骤必须填写 alt" });

export const guideSchema = z.object({
  title: z.string(),
  summary: z.string(),
  category: z.enum(GUIDE_CATEGORIES),
  sources: z.array(z.object({ title: z.string(), url: z.string().url().optional() })).default([]),
  reviewer: z.string().default("PENDING"),
  reviewedAt: dateStr.optional(),
  relatedActivities: z.array(z.string()).default([]),   // 活动 slug
  status: z.enum(["draft", "published"]).default("draft"),
  updatedAt: dateStr.optional(),
});

// 里程碑用 JSON 存放在 content/milestones/*.json
export const milestoneSchema = z.object({
  domain: z.enum(ABILITIES),
  monthRange: z.tuple([z.number().int(), z.number().int()]),
  typical: z.array(z.string()),          // 多数宝宝能做到
  watchPoints: z.array(z.string()),      // 可以多留意
  seeDoctorHint: z.string().default("PENDING"),
  reviewer: z.string().default("PENDING"),
});

export type Activity = z.infer<typeof activitySchema>;
export type Guide = z.infer<typeof guideSchema>;
export type Milestone = z.infer<typeof milestoneSchema>;
