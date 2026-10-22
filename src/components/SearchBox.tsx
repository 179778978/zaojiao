"use client";
import { useState } from "react";
import Link from "next/link";
type PagefindPage = { url: string; meta?: { title?: string }; excerpt?: string };
type PagefindResult = { results: { data: () => Promise<PagefindPage> }[] };
declare global {
  interface Window {
    pagefind?: { search: (query: string) => Promise<PagefindResult> };
  }
}
export function SearchBox() { const [query, setQuery] = useState(""); const [results, setResults] = useState<{ url: string; title: string; excerpt: string }[]>([]); const [loading, setLoading] = useState(false); const [searched, setSearched] = useState(false);
  async function search(value = query) { const term = value.trim(); if (!term) return; setQuery(term); setLoading(true); setSearched(true); try { if (!window.pagefind) { const script = document.createElement("script"); script.src = "/pagefind/pagefind.js"; script.async = true; document.body.appendChild(script); await new Promise<void>((resolve, reject) => { script.onload = () => resolve(); script.onerror = () => reject(new Error("Pagefind 加载失败")); }); } const response = await window.pagefind?.search(term); const data = await Promise.all((response?.results ?? []).slice(0, 12).map((item) => item.data())); setResults(data.map((item) => ({ url: item.url, title: item.meta?.title ?? "小芽早教", excerpt: item.excerpt ?? "" }))); } catch { setResults([]); } finally { setLoading(false); } }
  return <><form className="search-form" onSubmit={(e) => { e.preventDefault(); void search(); }}><input aria-label="搜索活动、文章和绘本" placeholder="试试搜索：情绪、瓶盖、共读…" value={query} onChange={(e) => setQuery(e.target.value)} /><button className="primary-button" type="submit">搜索</button></form><div className="popular-search"><strong>大家在搜</strong>{["情绪", "串珠", "共读", "语言", "室内游戏"].map((term) => <button className="chip" key={term} type="button" onClick={() => void search(term)}>{term}</button>)}</div>{loading && <p aria-live="polite">正在查找…</p>}{searched && !loading && <section aria-live="polite"><h2>搜索结果</h2>{results.length ? results.map((result) => <article className="content-card w2" key={result.url}><h3><Link href={result.url}>{result.title}</Link></h3><p>{result.excerpt.replace(/<[^>]*>/g, "")}</p></article>) : <p>没有找到相关内容，试试其他词语。</p>}</section>}</>;
}
