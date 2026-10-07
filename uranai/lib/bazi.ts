import { Solar, LunarUtil } from "lunar-javascript";

// ---------------------------------------------------------------------------
// 用語の変換テーブル（ライブラリは中国式の命名のため、日本の四柱推命用語に変換する）
// ---------------------------------------------------------------------------

const SHI_SHEN_JA: Record<string, string> = {
  比肩: "比肩",
  劫财: "劫財",
  食神: "食神",
  伤官: "傷官",
  偏财: "偏財",
  正财: "正財",
  七杀: "偏官",
  正官: "正官",
  偏印: "偏印",
  正印: "印綬",
};

const JUNI_UN_JA: Record<string, string> = {
  长生: "長生",
  沐浴: "沐浴",
  冠带: "冠帯",
  临官: "建禄",
  帝旺: "帝旺",
  衰: "衰",
  病: "病",
  死: "死",
  墓: "墓",
  绝: "絶",
  胎: "胎",
  养: "養",
};

export const GAN_WUXING: Record<string, Element5> = {
  甲: "木",
  乙: "木",
  丙: "火",
  丁: "火",
  戊: "土",
  己: "土",
  庚: "金",
  辛: "金",
  壬: "水",
  癸: "水",
};
export const ZHI_WUXING: Record<string, Element5> = {
  子: "水",
  丑: "土",
  寅: "木",
  卯: "木",
  辰: "土",
  巳: "火",
  午: "火",
  未: "土",
  申: "金",
  酉: "金",
  戌: "土",
  亥: "水",
};

const GAN_YINYANG: Record<string, "陽" | "陰"> = {
  甲: "陽",
  乙: "陰",
  丙: "陽",
  丁: "陰",
  戊: "陽",
  己: "陰",
  庚: "陽",
  辛: "陰",
  壬: "陽",
  癸: "陰",
};
const ZHI_YINYANG: Record<string, "陽" | "陰"> = {
  子: "陽",
  丑: "陰",
  寅: "陽",
  卯: "陰",
  辰: "陽",
  巳: "陰",
  午: "陽",
  未: "陰",
  申: "陽",
  酉: "陰",
  戌: "陽",
  亥: "陰",
};

export type Element5 = "木" | "火" | "土" | "金" | "水";
export type TenGodGroup = "比劫" | "食傷" | "財星" | "官星" | "印星";

const TEN_GOD_GROUP: Record<string, TenGodGroup> = {
  比肩: "比劫",
  劫財: "比劫",
  食神: "食傷",
  傷官: "食傷",
  偏財: "財星",
  正財: "財星",
  偏官: "官星",
  正官: "官星",
  偏印: "印星",
  印綬: "印星",
};

function jaShiShen(cn: string): string {
  return SHI_SHEN_JA[cn] ?? cn;
}
function jaJuniUn(cn: string): string {
  return JUNI_UN_JA[cn] ?? cn;
}

/** 任意の日干・地支の組み合わせから十二運を求める（大運・年運・月運用）。
 *  ライブラリ内部（EightChar._getDiShi）と同一のロジック。 */
function diShiFor(dayGan: string, zhi: string): string {
  const offset = LunarUtil.CHANG_SHENG_OFFSET[dayGan];
  const zhiIndex = LunarUtil.ZHI.indexOf(zhi) - 1; // ZHI配列は先頭が空文字なので-1して0始まりに
  const ganIndex0 = LunarUtil.GAN.indexOf(dayGan) - 1;
  if (offset === undefined || zhiIndex < 0 || ganIndex0 < 0) return "";
  let index = offset + (ganIndex0 % 2 === 0 ? zhiIndex : -zhiIndex);
  index = ((index % 12) + 12) % 12;
  return jaJuniUn(LunarUtil.CHANG_SHENG[index]);
}

/** 任意の干から日干との十神関係を求める（ライブラリ内蔵の対応表をそのまま利用） */
function shiShenFor(dayGan: string, otherGan: string): string {
  const cn = LunarUtil.SHI_SHEN[dayGan + otherGan];
  return jaShiShen(cn ?? "");
}

// ---------------------------------------------------------------------------
// 地支の関係（支合・冲・破・害・刑・空亡）
// ---------------------------------------------------------------------------

const LIUHE: Record<string, string> = {
  子: "丑", 丑: "子", 寅: "亥", 亥: "寅", 卯: "戌", 戌: "卯",
  辰: "酉", 酉: "辰", 巳: "申", 申: "巳", 午: "未", 未: "午",
};
const CHONG: Record<string, string> = {
  子: "午", 午: "子", 丑: "未", 未: "丑", 寅: "申", 申: "寅",
  卯: "酉", 酉: "卯", 辰: "戌", 戌: "辰", 巳: "亥", 亥: "巳",
};
const HAI: Record<string, string> = {
  子: "未", 未: "子", 丑: "午", 午: "丑", 寅: "巳", 巳: "寅",
  卯: "辰", 辰: "卯", 申: "亥", 亥: "申", 酉: "戌", 戌: "酉",
};
const PO: Record<string, string> = {
  子: "酉", 酉: "子", 丑: "辰", 辰: "丑", 寅: "亥", 亥: "寅",
  卯: "午", 午: "卯", 巳: "申", 申: "巳", 未: "戌", 戌: "未",
};
// 三刑グループ（同グループ内の異なる2支が揃うと成立。丑戌未＝恃勢の刑、寅巳申＝無恩の刑）
const SANXING_GROUPS: string[][] = [
  ["寅", "巳", "申"],
  ["丑", "戌", "未"],
];
// 子卯の刑（無礼の刑、2支のペア）
const ZIMAO_PAIR: [string, string] = ["子", "卯"];
// 自刑（同じ地支同士で成立）
const JIXING_SELF = ["辰", "午", "酉", "亥"];

export interface NatalZhiRef {
  label: string; // 例: "年柱"
  zhi: string;
}

/** 大運・年運・月運の地支が、命式の四支（および空亡）とどんな関係にあるかをまとめて返す。
 *  同じ関係タイプは対象の柱をまとめて1件で表示する（例: 「支合(月・時)」）。 */
function getZhiRelations(flowingZhi: string, natalZhis: NatalZhiRef[], xunKongChars: string[]): string[] {
  const byType: Record<string, string[]> = {};
  const add = (type: string, shortLabel: string) => {
    (byType[type] ??= []).push(shortLabel);
  };

  for (const n of natalZhis) {
    const shortLabel = n.label.charAt(0); // "年柱" -> "年"
    if (LIUHE[flowingZhi] === n.zhi) add("支合", shortLabel);
    if (CHONG[flowingZhi] === n.zhi) add("冲", shortLabel);
    if (HAI[flowingZhi] === n.zhi) add("害", shortLabel);
    if (PO[flowingZhi] === n.zhi) add("破", shortLabel);

    if (flowingZhi === n.zhi && JIXING_SELF.includes(flowingZhi)) {
      add("自刑", shortLabel);
    } else {
      for (const grp of SANXING_GROUPS) {
        if (flowingZhi !== n.zhi && grp.includes(flowingZhi) && grp.includes(n.zhi)) {
          add("刑", shortLabel);
        }
      }
      if (
        (flowingZhi === ZIMAO_PAIR[0] && n.zhi === ZIMAO_PAIR[1]) ||
        (flowingZhi === ZIMAO_PAIR[1] && n.zhi === ZIMAO_PAIR[0])
      ) {
        add("刑", shortLabel);
      }
    }
  }

  const order = ["支合", "冲", "刑", "自刑", "害", "破"];
  const result: string[] = [];
  for (const type of order) {
    const targets = byType[type];
    if (targets && targets.length) {
      result.push(`${type}(${Array.from(new Set(targets)).join("・")})`);
    }
  }
  if (xunKongChars.includes(flowingZhi)) result.push("空亡");
  return result;
}

// ---------------------------------------------------------------------------
// 型定義
// ---------------------------------------------------------------------------

export interface PillarInfo {
  label: "年柱" | "月柱" | "日柱" | "時柱";
  gan: string | null;
  zhi: string | null;
  hideGan: string[];
  juniUn: string | null;
  ganShiShen: string; // 天干通変星（日柱は「日主」）
  zhiShiShen: string[]; // 蔵干通変星
}

export interface DaYunRow {
  startAge: number;
  endAge: number;
  startYear: number;
  endYear: number;
  ganZhi: string;
  juniUn: string;
  shiShen: string;
  relations: string[];
}

export interface LiuNianRow {
  year: number;
  age: number;
  ganZhi: string;
  juniUn: string;
  shiShen: string;
  relations: string[];
}

export interface LiuYueRow {
  monthLabel: string;
  ganZhi: string;
  juniUn: string;
  shiShen: string;
  relations: string[];
}

export interface BaziResult {
  dayGan: string;
  pillars: PillarInfo[];
  xunKong: string; // 空亡（日柱基準）
  yinYangCount: { 陽: number; 陰: number };
  wuxingCount: Record<Element5, number>;
  tenGodGroupCount: Record<TenGodGroup, number>;
  daYun: DaYunRow[];
  qiYunNote: string;
  liuNian: LiuNianRow[];
  liuYue: LiuYueRow[];
  hourUnknown: boolean;
}

export interface BaziInput {
  year: number;
  month: number;
  day: number;
  hour: number | null; // null = 不明
  minute?: number;
  gender: "male" | "female";
  liuNianStartYear: number;
  liuNianCount: number;
  liuYueYear: number;
}

// ---------------------------------------------------------------------------
// メイン計算
// ---------------------------------------------------------------------------

export function calculateBazi(input: BaziInput): BaziResult {
  const hourUnknown = input.hour === null;
  const hourForCalc = input.hour ?? 12; // 不明な場合は正午で代用（日柱の境界を避ける）
  const minute = input.minute ?? 0;

  const solar = Solar.fromYmdHms(input.year, input.month, input.day, hourForCalc, minute, 0);
  const lunar = solar.getLunar();
  const ec = lunar.getEightChar();

  const dayGan: string = ec.getDayGan();

  const pillars: PillarInfo[] = [
    {
      label: "年柱",
      gan: ec.getYearGan(),
      zhi: ec.getYearZhi(),
      hideGan: ec.getYearHideGan(),
      juniUn: jaJuniUn(ec.getYearDiShi()),
      ganShiShen: jaShiShen(ec.getYearShiShenGan()),
      zhiShiShen: (ec.getYearShiShenZhi() as string[]).map(jaShiShen),
    },
    {
      label: "月柱",
      gan: ec.getMonthGan(),
      zhi: ec.getMonthZhi(),
      hideGan: ec.getMonthHideGan(),
      juniUn: jaJuniUn(ec.getMonthDiShi()),
      ganShiShen: jaShiShen(ec.getMonthShiShenGan()),
      zhiShiShen: (ec.getMonthShiShenZhi() as string[]).map(jaShiShen),
    },
    {
      label: "日柱",
      gan: ec.getDayGan(),
      zhi: ec.getDayZhi(),
      hideGan: ec.getDayHideGan(),
      juniUn: jaJuniUn(ec.getDayDiShi()),
      ganShiShen: "日主",
      zhiShiShen: (ec.getDayShiShenZhi() as string[]).map(jaShiShen),
    },
    {
      label: "時柱",
      gan: hourUnknown ? null : ec.getTimeGan(),
      zhi: hourUnknown ? null : ec.getTimeZhi(),
      hideGan: hourUnknown ? [] : ec.getTimeHideGan(),
      juniUn: hourUnknown ? null : jaJuniUn(ec.getTimeDiShi()),
      ganShiShen: hourUnknown ? "不明" : jaShiShen(ec.getTimeShiShenGan()),
      zhiShiShen: hourUnknown ? [] : (ec.getTimeShiShenZhi() as string[]).map(jaShiShen),
    },
  ];

  // 空亡（日柱の旬空を採用）
  const xunKong: string = ec.getDayXunKong();
  const xunKongChars = xunKong.split("");

  // 命式の四支（大運・年運・月運との関係判定に使用。時柱が不明な場合は含めない）
  const natalZhis: NatalZhiRef[] = pillars
    .filter((p) => p.zhi)
    .map((p) => ({ label: p.label, zhi: p.zhi as string }));

  // 陰陽バランス
  const yinYangCount = { 陽: 0, 陰: 0 };
  for (const p of pillars) {
    if (!p.gan || !p.zhi) continue;
    yinYangCount[GAN_YINYANG[p.gan]]++;
    yinYangCount[ZHI_YINYANG[p.zhi]]++;
  }

  // 五行バランス（天干・地支をそれぞれ1カウントで単純集計）
  const wuxingCount: Record<Element5, number> = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
  for (const p of pillars) {
    if (!p.gan || !p.zhi) continue;
    wuxingCount[GAN_WUXING[p.gan]]++;
    wuxingCount[ZHI_WUXING[p.zhi]]++;
  }

  // 通変星バランス（天干[年月時、日主は除く] + 蔵干すべて）
  const tenGodGroupCount: Record<TenGodGroup, number> = {
    比劫: 0,
    食傷: 0,
    財星: 0,
    官星: 0,
    印星: 0,
  };
  for (const p of pillars) {
    if (p.label !== "日柱" && p.ganShiShen !== "不明" && TEN_GOD_GROUP[p.ganShiShen]) {
      tenGodGroupCount[TEN_GOD_GROUP[p.ganShiShen]]++;
    }
    for (const zs of p.zhiShiShen) {
      if (TEN_GOD_GROUP[zs]) tenGodGroupCount[TEN_GOD_GROUP[zs]]++;
    }
  }

  // 大運（10年運）
  const genderNum = input.gender === "male" ? 1 : 0;
  const yun = ec.getYun(genderNum);
  const rawDaYun = yun.getDaYun();
  const daYun: DaYunRow[] = rawDaYun
    .filter((d: any) => d.getIndex() > 0)
    .map((d: any) => {
      const gz: string = d.getGanZhi();
      const zhi = gz ? gz.charAt(1) : "";
      const startYear: number = d.getStartYear();
      const endYear: number = d.getEndYear();
      return {
        startAge: startYear - input.year, // 満年齢（その年に誕生日を迎えて到達する年齢）
        endAge: endYear - input.year,
        startYear,
        endYear,
        ganZhi: gz,
        juniUn: gz ? diShiFor(dayGan, zhi) : "",
        shiShen: gz ? shiShenFor(dayGan, gz.charAt(0)) : "",
        relations: gz ? getZhiRelations(zhi, natalZhis, xunKongChars) : [],
      };
    });

  const startSolar = yun.getStartSolar();
  const qiYunNote = `起運：${startSolar.toYmd()}ごろ（${yun.getStartYear()}歳${yun.getStartMonth()}か月${yun.getStartDay()}日）`;

  // 年運（歳運）：指定範囲。立春基準の年干支を安全に取得するため、その年の3/1を基準日にする
  const liuNian: LiuNianRow[] = [];
  for (let i = 0; i < input.liuNianCount; i++) {
    const y = input.liuNianStartYear + i;
    const refLunar = Solar.fromYmd(y, 3, 1).getLunar();
    const g = refLunar.getYearGanExact();
    const z = refLunar.getYearZhiExact();
    liuNian.push({
      year: y,
      age: y - input.year, // 満年齢（その年に誕生日を迎えて到達する年齢）
      ganZhi: g + z,
      juniUn: diShiFor(dayGan, z),
      shiShen: shiShenFor(dayGan, g),
      relations: getZhiRelations(z, natalZhis, xunKongChars),
    });
  }

  // 月運（指定年の12か月、節入り基準の代表日=15日で取得）
  const liuYue: LiuYueRow[] = [];
  for (let m = 1; m <= 12; m++) {
    const refLunar = Solar.fromYmd(input.liuYueYear, m, 15).getLunar();
    const g = refLunar.getMonthGanExact();
    const z = refLunar.getMonthZhiExact();
    liuYue.push({
      monthLabel: `${m}月`,
      ganZhi: g + z,
      juniUn: diShiFor(dayGan, z),
      shiShen: shiShenFor(dayGan, g),
      relations: getZhiRelations(z, natalZhis, xunKongChars),
    });
  }

  return {
    dayGan,
    pillars,
    xunKong,
    yinYangCount,
    wuxingCount,
    tenGodGroupCount,
    daYun,
    qiYunNote,
    liuNian,
    liuYue,
    hourUnknown,
  };
}
