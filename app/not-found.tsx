import Link from "next/link";
export default function NotFound() { return <main className="wrap page-main not-found"><p className="eyebrow">页面没有找到</p><h1>这里暂时没有小芽</h1><p>地址可能写错了，也可能内容已经搬家。</p><div className="cta-row" style={{ justifyContent: "center" }}><Link className="primary-button" href="/">回到首页</Link><Link className="secondary-button" href="/activities/">看看活动</Link></div></main>; }
