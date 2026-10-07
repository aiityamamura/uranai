export const NIKKAN_MEANINGS: { gan: string; reading: string; image: string; desc: string }[] = [
  {
    gan: "甲",
    reading: "きのえ",
    image: "大樹",
    desc: "木の陽。まっすぐ天に伸びる大樹のイメージ。志を曲げない芯の強さと、周囲を率いていくリーダー気質を持つ。成長意欲が強く人の上に立つことで力を発揮しやすい一方、柔軟さを意識するとより良い関係が長続きする。",
  },
  {
    gan: "乙",
    reading: "きのと",
    image: "草花",
    desc: "木の陰。風にしなる草花のイメージ。一見やわらかく見えて、踏まれても立ち上がる粘り強さを秘めている。協調性が高く、周囲に合わせながら着実に根を張っていくタイプ。",
  },
  {
    gan: "丙",
    reading: "ひのえ",
    image: "太陽",
    desc: "火の陽。すべてを照らす太陽のイメージ。明るく裏表のない性格で、いるだけで場を華やかにするカリスマ性を持つ。行動力にあふれる反面、周りを巻き込みすぎないバランス感覚が鍵。",
  },
  {
    gan: "丁",
    reading: "ひのと",
    image: "灯火",
    desc: "火の陰。夜道を照らすともし火のイメージ。穏やかで控えめだが、内側に熱い情熱を秘めている。相手の気持ちを汲み取る繊細さがあり、信頼できる人間関係を少しずつ築いていく。",
  },
  {
    gan: "戊",
    reading: "つちのえ",
    image: "山",
    desc: "土の陽。どっしりとそびえる山のイメージ。動じない安定感と包容力を持ち、周囲から頼られる存在になりやすい。現実的で地に足のついた判断ができる一方、変化への対応はやや苦手な面も。",
  },
  {
    gan: "己",
    reading: "つちのと",
    image: "田畑",
    desc: "土の陰。作物を育む田畑のイメージ。温厚でおっとりとしており、人を育てることや支えることに長けている。知識や経験をコツコツ蓄え、必要なときにそれを周囲へ還元できる懐の深さがある。",
  },
  {
    gan: "庚",
    reading: "かのえ",
    image: "刀剣",
    desc: "金の陽。鍛え抜かれた刀のイメージ。決断力と行動力に優れ、物事に白黒をはっきりつけたいタイプ。新しい環境にも柔軟に対応できるが、言葉が率直すぎて誤解を招かないよう配慮したい。",
  },
  {
    gan: "辛",
    reading: "かのと",
    image: "宝石",
    desc: "金の陰。磨かれて輝く宝石のイメージ。繊細な美意識とプライドの高さを持ち、周囲から大切にされやすい存在。自分を磨き続けることで、本来の輝きをより一層引き出していける。",
  },
  {
    gan: "壬",
    reading: "みずのえ",
    image: "海",
    desc: "水の陽。すべてを飲み込む大海のイメージ。包容力とスケールの大きさを持ち、チャレンジ精神にあふれている。細部にこだわりすぎず、おおらかに構えることで持ち前の力を発揮しやすい。",
  },
  {
    gan: "癸",
    reading: "みずのと",
    image: "雨",
    desc: "水の陰。静かに大地を潤す雨のイメージ。知的好奇心が強く、学びを通じて周囲に気づきや癒しを与える存在。物静かな面と内に秘めた情熱、ふたつの顔を併せ持つ。",
  },
];

// 通変星のグループ名（技術名と、意味をイメージしやすい呼び名）
export const TEN_GOD_GROUP_INFO: {
  group: string;
  label: string;
  tagline: string;
  members: string[];
}[] = [
  { group: "比劫", label: "自我の星", tagline: "自分の夢を叶える", members: ["比肩", "劫財"] },
  { group: "食傷", label: "表現の星", tagline: "伝達・表現する", members: ["食神", "傷官"] },
  { group: "財星", label: "財の星", tagline: "人脈を元に拡大させていく", members: ["正財", "偏財"] },
  { group: "官星", label: "実行力の星", tagline: "とにかく動く・形にする", members: ["正官", "偏官"] },
  { group: "印星", label: "知性の星", tagline: "知識を習得し活かす", members: ["印綬", "偏印"] },
];

export const TEN_GOD_MEANINGS: {
  name: string;
  reading: string;
  group: string;
  catchphrase: string;
  desc: string;
  url: string;
}[] = [
  {
    name: "比肩",
    reading: "ひけん",
    group: "比劫",
    catchphrase: "自分の夢を自分の力でコツコツ実現する",
    desc: "周囲に頼りすぎず、自分のペースで地道に目標へ向かって進むタイプ。自立心が強く、対等な関係を大切にする。",
    url: "https://sup.andyou.jp/shicyusuimei/tsuhensei/hiken/",
  },
  {
    name: "劫財",
    reading: "ごうざい",
    group: "比劫",
    catchphrase: "自分の夢を皆と一緒に実現する",
    desc: "一人で抱え込むより、周囲を巻き込みながら目標を達成していくタイプ。競争心と協調性をあわせ持ち、粘り強さが武器になる。",
    url: "https://sup.andyou.jp/shicyusuimei/tsuhensei/gouzai/",
  },
  {
    name: "食神",
    reading: "しょくじん",
    group: "食傷",
    catchphrase: "素直にストレートに表現する",
    desc: "裏表のない伸びやかな表現力を持ち、周囲を和ませるタイプ。衣食住や創作ごとに恵まれやすく、楽天的な一面もある。",
    url: "https://sup.andyou.jp/shicyusuimei/tsuhensei/syokujin/",
  },
  {
    name: "傷官",
    reading: "しょうかん",
    group: "食傷",
    catchphrase: "繊細な感性で表現する",
    desc: "鋭い観察眼と発想力を持ち、人とは違う角度から物事を捉えるタイプ。個性が際立つぶん、好みが分かれることもある。",
    url: "https://sup.andyou.jp/shicyusuimei/tsuhensei/syoukan/",
  },
  {
    name: "正財",
    reading: "せいざい",
    group: "財星",
    catchphrase: "几帳面に管理する、心遣い",
    desc: "計画性があり、堅実に資産や信頼を積み上げていくタイプ。細やかな気遣いができ、安定した人間関係を好む。",
    url: "https://sup.andyou.jp/shicyusuimei/tsuhensei/seizai/",
  },
  {
    name: "偏財",
    reading: "へんざい",
    group: "財星",
    catchphrase: "優れたコミュニケーション能力、気遣い",
    desc: "社交性とコミュニケーション能力に優れ、人脈を通じて機会やお金を動かすタイプ。気配り上手で、周囲から頼られやすい。",
    url: "https://sup.andyou.jp/shicyusuimei/tsuhensei/henzai/",
  },
  {
    name: "正官",
    reading: "せいかん",
    group: "官星",
    catchphrase: "ステップをきちんと踏みながら社会の役に立つ",
    desc: "責任感と秩序を重んじ、ルールや信頼を積み重ねながら物事を進めるタイプ。組織の中でその力を発揮しやすい。",
    url: "https://sup.andyou.jp/shicyusuimei/tsuhensei/seikan/",
  },
  {
    name: "偏官",
    reading: "へんかん",
    group: "官星",
    catchphrase: "自分のやり方で道を切り開く",
    desc: "強い行動力と瞬発力を持ち、プレッシャーのかかる場面ほど力を発揮するタイプ。既存のやり方にとらわれない開拓精神がある。",
    url: "https://sup.andyou.jp/shicyusuimei/tsuhensei/henkan/",
  },
  {
    name: "印綬",
    reading: "いんじゅ",
    group: "印星",
    catchphrase: "知識を継承、人に伝える",
    desc: "伝統や学びを大切にし、蓄えた知識や経験を周囲へ還元するタイプ。落ち着きがあり、頼られる存在になりやすい。",
    url: "https://sup.andyou.jp/shicyusuimei/tsuhensei/inju/",
  },
  {
    name: "偏印",
    reading: "へんいん",
    group: "印星",
    catchphrase: "新しいものや概念を作り出す",
    desc: "独自の視点と探究心を持ち、既存の枠にとらわれない発想ができるタイプ。直感的な学びや専門性の高い分野を好む。",
    url: "https://sup.andyou.jp/shicyusuimei/tsuhensei/henin/",
  },
];

export const JUNI_UN_MEANINGS: { name: string; desc: string }[] = [
  { name: "長生", desc: "物事の始まり。新しい芽が育っていく段階。" },
  { name: "沐浴", desc: "産まれたばかりで揺らぎやすい時期。変化や不安定さを含む。" },
  { name: "冠帯", desc: "成長し、形が整っていく時期。" },
  { name: "建禄", desc: "自立し、力を発揮し始める充実期。" },
  { name: "帝旺", desc: "もっとも勢いのある絶頂期。" },
  { name: "衰", desc: "勢いが落ち着き、円熟に向かう時期。" },
  { name: "病", desc: "内省が深まる時期。無理をしすぎない配慮が必要。" },
  { name: "死", desc: "一つの区切り。物事が形を変える転換点。" },
  { name: "墓", desc: "力を蓄え、次に備える時期。" },
  { name: "絶", desc: "一度すべてがリセットされる時期。" },
  { name: "胎", desc: "新しい可能性が宿る、始まりの兆し。" },
  { name: "養", desc: "次の成長に向けて力を養う時期。" },
];

export const WUXING_MEANINGS: { name: string; color: string; desc: string }[] = [
  { name: "木", color: "wood", desc: "成長・発展・柔軟性。伸びていく力を象徴する。" },
  { name: "火", color: "fire", desc: "情熱・表現力・スピード。物事を照らし、活性化させる力。" },
  { name: "土", color: "earth", desc: "安定・信頼・受容力。物事をまとめ、育む力。" },
  { name: "金", color: "metal", desc: "意志・決断力・美意識。物事を研ぎ澄ませる力。" },
  { name: "水", color: "water", desc: "知性・柔軟性・流動性。物事を巡らせ、深める力。" },
];

export const ZHI_RELATION_MEANINGS: { name: string; desc: string }[] = [
  { name: "支合", desc: "地支同士が結びつき、穏やかに調和する組み合わせ。協力関係やご縁の強まりを表す。" },
  { name: "冲", desc: "正反対の地支同士がぶつかり合う、もっとも作用の強い組み合わせ。変化・移動・衝突を表す。" },
  { name: "刑", desc: "地支同士が牽制し合う組み合わせ。トラブルやストレス、行き過ぎ・無理を表すとされる。" },
  { name: "害", desc: "地支同士がわずかに邪魔をし合う組み合わせ。冲や刑より作用は穏やかとされる。" },
  { name: "破", desc: "地支同士の結びつきを壊す組み合わせ。作用は軽微とされ、重視しない流派も多い。" },
  { name: "空亡", desc: "日柱を基準とした「天中殺」にあたる地支が巡る時期。頑張りが結果に出づらい代わりに、力を抜いてよい時期ともされる。" },
];

export const PILLAR_MEANINGS: { label: string; period: string; desc: string }[] = [
  { label: "年柱", period: "〜20歳ごろ", desc: "家系や生まれ育った環境、若年期の運勢を映す柱。" },
  { label: "月柱", period: "20〜40歳ごろ", desc: "社会性や仕事運を映す柱。生まれ持った性格の核ともされる。" },
  { label: "日柱", period: "40〜60歳ごろ", desc: "自分自身の本質、配偶者との関係を映す柱。命式の中心。" },
  { label: "時柱", period: "60歳ごろ〜", desc: "晩年の運勢、子どもとの関係、内に秘めた才能を映す柱。" },
];
