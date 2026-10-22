import { describe, expect, it } from "vitest";
import { chooseActivity } from "./draw";
import type { Activity } from "./content/schema";
const activity = (slug: string, minMonth = 24, maxMonth = 36): { slug: string; body: string; data: Activity } => ({ slug, body: "", data: { title: slug, summary: "一个适合亲子共玩的小游戏", ability: "认知", minMonth, maxMonth, durationMin: 10, scenes: ["室内"], materialLevel: "无需材料", materials: [], steps: [{ text: "一起开始游戏" }, { text: "轮流来试试看" }, { text: "一起收拾玩具" }], skills: "练习观察", reviewer: "PENDING", status: "published" } });
describe("chooseActivity", () => {
  it("月龄范围边界会包含", () => expect(chooseActivity([activity("a", 28, 32)], 28, "全部", null, () => 0)?.slug).toBe("a"));
  it("没有候选时返回空值", () => expect(chooseActivity([activity("a", 30)], 28, "全部", null)).toBeNull());
  it("只有一个候选时允许重复", () => expect(chooseActivity([activity("a")], 28, "全部", "a", () => 0)?.slug).toBe("a"));
  it("多个候选时排除上一次结果", () => expect(chooseActivity([activity("a"), activity("b")], 28, "全部", "a", () => 0)?.slug).toBe("b"));
});
