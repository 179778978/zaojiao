export type Activity = {
  slug: string;
  title: string;
  summary: string;
  ability: string;
  minMonth: number;
  maxMonth: number;
  durationMin: number;
  scenes: string[];
  materialLevel: string;
  materials: string[];
  steps: string[];
  skills: string;
  troubleshooting?: string;
  advanced?: string;
  safety?: string;
  reviewer: string;
};

export const activities: Activity[] = [
  {
    slug: 'animal-home', title: '小动物找家', summary: '用毛绒玩具和纸盒玩一个分类小游戏', ability: '认知', minMonth: 24, maxMonth: 36, durationMin: 10,
    scenes: ['室内', '雨天'], materialLevel: '家中常见物品', materials: ['毛绒玩具 2–3 个', '纸盒或篮子'],
    steps: ['把纸盒当“家”，说“小熊要回家啦”。', '让宝宝把玩具一个个放进盒子里。', '说出动物的名字和叫声，再换个位置重来。'],
    skills: '分类、配对，以及动物名称的词汇。', troubleshooting: '宝宝只想抱着玩具时，先陪他抱一会儿，再邀请“小熊累了，我们送它回家睡觉”。', reviewer: 'PENDING',
  },
  {
    slug: 'towel-boat', title: '毛巾小船', summary: '坐在毛巾上被拉着“划船”，练平衡', ability: '大运动', minMonth: 24, maxMonth: 36, durationMin: 10,
    scenes: ['室内'], materialLevel: '家中常见物品', materials: ['大毛巾', '平整的地垫'],
    steps: ['宝宝坐在毛巾上，抓紧两边。', '大人慢慢拉着毛巾在地垫上“划船”。', '边拉边唱歌，换宝宝来拉玩具小船。'],
    skills: '平衡感和核心力量。', troubleshooting: '宝宝不愿坐上去时，先让玩具坐船，宝宝看够了再邀请。', safety: '只在平整的地垫上玩，拉得慢一点，全程扶好宝宝。', reviewer: 'PENDING',
  },
  {
    slug: 'bottle-caps', title: '瓶盖对对碰', summary: '给瓶子找到对应的盖子，练手腕转动', ability: '精细动作', minMonth: 26, maxMonth: 36, durationMin: 10,
    scenes: ['室内'], materialLevel: '家中常见物品', materials: ['3 个不同大小的塑料瓶', '配套的大号瓶盖'],
    steps: ['把瓶子和瓶盖分开摆好。', '示范拧上一个，再请宝宝试。', '找对了就一起说“对啦”。'],
    skills: '手腕转动和手眼协调。', troubleshooting: '宝宝拧不动时，大人先把盖子拧松一点，再让他完成最后一圈。', safety: '瓶盖要比宝宝的拳头大，全程看护，防止误吞。', reviewer: 'PENDING',
  },
];

export type Guide = { slug: string; title: string; summary: string; category: string; body: string; reviewer: string; relatedActivities: string[] };
export const guides: Guide[] = [
  { slug: 'saying-no', title: '宝宝总说“不要”，正常吗？', summary: '关于宝宝表达拒绝的占位示例，正式发布前需专业人员审核。', category: '情绪与行为', reviewer: 'PENDING', relatedActivities: ['animal-home'], body: '两岁左右，宝宝开始发现自己可以有想法，也可以拒绝。“不要”常常只是在练习做决定。\n\n可以试着给两个都能接受的选择，例如：“穿蓝袜子还是黄袜子？”也可以先说出宝宝的感受，并提前告诉他接下来会发生什么。' },
  { slug: 'beads-safety', title: '串珠和穿线游戏：先了解材料安全', summary: '关于串珠和穿线材料的安全信息还在整理中。', category: '安全', reviewer: 'PENDING', relatedActivities: ['bottle-caps'], body: '串珠和穿线活动涉及小物件，具体材料选择与适龄建议待儿童安全专业人员审核。本文暂不提供玩法指导。' },
];

export const domains = ['语言', '大运动', '精细动作', '认知', '社交情绪', '生活自理'];
export const milestones = domains.map((domain) => ({ domain, typical: '占位内容：由儿童发展专业人员审核后补充。', watch: '占位内容：由儿童发展专业人员审核后补充。' }));

export function pickActivity(month: number, ability: string, previousSlug: string | null, random: () => number = Math.random): Activity | undefined {
  const eligible = activities.filter((a) => month >= a.minMonth && month <= a.maxMonth && (ability === '全部' || ability === a.ability));
  const choices = eligible.length > 1 ? eligible.filter((a) => a.slug !== previousSlug) : eligible;
  if (!choices.length) return undefined;
  return choices[Math.min(Math.floor(random() * choices.length), choices.length - 1)];
}
