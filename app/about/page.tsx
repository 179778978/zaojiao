import type { Metadata } from "next";
import { PageHeading } from "@/components/Site";
export const metadata: Metadata = { title: "关于小芽", description: "了解小芽早教的内容审核机制、免责声明和隐私说明。" };
export default function AboutPage() { return <main className="page-main"><div className="wrap"><PageHeading kicker="关于我们" title="陪你一起慢慢长大" description="小芽早教为 2–3 岁家庭整理亲子互动灵感。" /><section className="content-card w2"><h2>内容审核机制</h2><p>活动会标注年龄范围与安全提醒。发育、健康相关内容由具备儿童发展或儿童保健相关背景的专业人员审核后发布。专家团队介绍将在确认后补充。</p><p>尚未完成审核的内容会明确显示“待专家审核”。</p></section><section className="content-card w1"><h2>免责声明</h2><p>每个宝宝的成长节奏不同。本站内容仅供家庭互动与信息参考，不能替代医生诊断、评估或治疗建议。如有担忧，请咨询儿科医生或儿童保健专业人员。</p></section><section className="content-card w3"><h2>隐私说明</h2><p>本站不收集个人信息，不设置账号，也不使用第三方追踪脚本。月龄选择仅保存在你当前设备的浏览器本地存储中。</p></section></div></main>; }
