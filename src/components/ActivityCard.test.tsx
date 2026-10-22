import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ActivityCard } from "./ActivityCard";
import type { Activity } from "@/lib/content/schema";

const activity: Activity = { title: "动物找家", summary: "用玩具练习分类和配对", ability: "认知", minMonth: 24, maxMonth: 36, durationMin: 10, scenes: ["室内"], materialLevel: "家中常见物品", materials: ["玩具"], steps: [{ text: "放好玩具" }, { text: "请宝宝找家" }, { text: "一起收起来" }], skills: "分类", reviewer: "PENDING", status: "published" };

describe("ActivityCard", () => {
  it("displays activity information with a working detail link", () => {
    render(<ActivityCard activity={{ slug: "animal-home", body: "", data: activity }} />);
    expect(screen.getByRole("heading", { name: "动物找家" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /看看怎么玩/ }).getAttribute("href")).toMatch(/^\/activities\/animal-home\/?$/);
    expect(screen.getByText("认知")).toBeInTheDocument();
  });
});
