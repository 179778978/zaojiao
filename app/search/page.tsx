import type { Metadata } from "next";
import { PageHeading } from "@/components/Site";
import { SearchBox } from "@/components/SearchBox";
export const metadata: Metadata = { title: "搜索", description: "搜索小芽早教的亲子活动、家长课堂和绘本内容。" };
export default function SearchPage() { return <main className="page-main"><div className="wrap"><PageHeading kicker="找一找灵感" title="搜索小芽" description="找活动、文章和亲子阅读建议。" /><SearchBox /></div></main>; }
