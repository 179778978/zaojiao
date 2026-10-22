import Link from "next/link";

const nav = [["首页", "/"], ["活动库", "/activities/"], ["月龄日历", "/calendar/"], ["成长地图", "/milestones/"], ["家长课堂", "/guides/"], ["绘本歌谣", "/library/"], ["关于", "/about/"]];
export function Header() {
  return <header className="site-header"><div className="wrap header-inner"><Link className="logo" href="/" aria-label="小芽早教首页"><span className="sprout" aria-hidden="true">芽</span>小芽早教</Link><nav className="desktop-nav" aria-label="主导航">{nav.slice(1).map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</nav><Link className="search-link" href="/search/" aria-label="搜索">⌕ <span>搜索</span></Link></div></header>;
}
export function Footer() {
  return <><footer className="site-footer"><div className="wrap footer-inner"><p>每个宝宝都有自己的成长节奏。本站内容仅供亲子互动参考，不能替代医生诊断或专业建议。</p><div className="footer-links"><Link href="/about/">关于与隐私</Link><Link href="/guides/">家长课堂</Link><Link href="/activities/">活动库</Link></div><small>© {new Date().getFullYear()} 小芽早教 · 陪你一起慢慢长大</small></div></footer><nav className="mobile-nav" aria-label="底部导航">{nav.slice(0, 1).concat(nav.slice(1, 2), nav.slice(2, 3), nav.slice(6, 7)).map(([label, href], i) => <Link href={href} key={href}><span aria-hidden="true">{["⌂", "✿", "◷", "♡"][i]}</span>{label}</Link>)}</nav></>;
}
export function PageHeading({ kicker, title, description }: { kicker?: string; title: string; description?: string }) {
  return <div className="page-heading">{kicker && <p className="eyebrow">{kicker}</p>}<h1>{title}</h1>{description && <p className="lead">{description}</p>}</div>;
}
