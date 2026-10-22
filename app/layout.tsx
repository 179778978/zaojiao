import type { Metadata } from "next";
import { Noto_Sans_SC, ZCOOL_KuaiLe } from "next/font/google";
import "@/styles/site.css";
import { Footer, Header } from "@/components/Site";

const bodyFont = Noto_Sans_SC({ subsets: ["latin"], variable: "--font-noto", weight: ["400", "500", "700"], display: "swap" });
const displayFont = ZCOOL_KuaiLe({ subsets: ["latin"], variable: "--font-zcool", weight: "400", display: "swap" });
export const metadata: Metadata = { metadataBase: new URL("https://xiaoya-zaojiao.qiaozai-zaojiao.workers.dev"), title: { default: "小芽早教｜2–3岁亲子游戏", template: "%s｜小芽早教" }, description: "每天十分钟，用家里现有的东西，和 2–3 岁宝宝玩一个轻松的亲子小游戏。" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-CN" className={`${bodyFont.variable} ${displayFont.variable}`}><body><Header />{children}<Footer /></body></html>; }
