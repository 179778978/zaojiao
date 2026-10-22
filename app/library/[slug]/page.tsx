import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
const books = [{ slug: "feelings", title: "认识情绪的小绘本", age: "24–36 个月", tip: "读到角色表情时停一停，邀请宝宝指一指、说一说。", emoji: "😊" }, { slug: "animals", title: "动物朋友在哪里", age: "24–36 个月", tip: "模仿动物叫声，也可以把书里的动物和玩具配对。", emoji: "🐻" }, { slug: "daily", title: "忙碌的一天", age: "24–36 个月", tip: "把书中熟悉的生活步骤和宝宝当天的经历连起来。", emoji: "☀️" }];
export const dynamicParams = false;
export function generateStaticParams() { return books.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; return { title: books.find((book) => book.slug === slug)?.title ?? "亲子共读" }; }
export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const book = books.find((item) => item.slug === slug); if (!book) notFound(); return <main className="page-main"><article className="wrap" data-pagefind-body><div className="book-cover w2" role="img" aria-label={`${book.title}封面占位图`}>{book.emoji}</div><p className="eyebrow">亲子阅读 · {book.age}</p><h1>{book.title}</h1><section className="content-card w1"><h2>共读小提示</h2><p>{book.tip}</p></section><aside className="callout w3">封面图为占位内容，取得授权后再替换。这里分享阅读互动方法，不复制绘本正文。</aside><Link className="text-link" href="/library/">← 返回绘本与歌谣</Link></article></main>; }
