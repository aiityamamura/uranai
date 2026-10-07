import type { BaziResult, Element5, TenGodGroup } from "@/lib/bazi";
import { TEN_GOD_GROUP_INFO } from "@/lib/constants";

const EL_ORDER: Element5[] = ["木", "火", "土", "金", "水"];
const GROUP_ORDER: TenGodGroup[] = ["比劫", "食傷", "財星", "官星", "印星"];
const GROUP_LABEL: Record<TenGodGroup, string> = Object.fromEntries(
  TEN_GOD_GROUP_INFO.map((g) => [g.group, g.label])
) as Record<TenGodGroup, string>;

function BarRow({
  label,
  value,
  max,
  colorClass,
  labelWidthClass = "w-10",
}: {
  label: string;
  value: number;
  max: number;
  colorClass: string;
  labelWidthClass?: string;
}) {
  const pct = max === 0 ? 0 : Math.max(6, (value / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className={`${labelWidthClass} shrink-0 whitespace-nowrap font-mincho text-sm text-washi-100`}>
        {label}
      </span>
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-sumi-800">
        <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-4 shrink-0 text-right font-mono text-sm text-washi-200/70">{value}</span>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-sm border border-gold/20 bg-sumi-900/60 p-5">
      <p className="mb-4 font-mincho text-sm tracking-widest text-gold-light">{title}</p>
      {children}
    </div>
  );
}

export default function SummaryPanels({ result }: { result: BaziResult }) {
  const wuxingMax = Math.max(...Object.values(result.wuxingCount), 1);
  const groupMax = Math.max(...Object.values(result.tenGodGroupCount), 1);
  const yinYangTotal = result.yinYangCount.陽 + result.yinYangCount.陰;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Card title="空亡（天中殺）">
        <p className="font-mono text-2xl tracking-widest text-washi-50">{result.xunKong}</p>
        <p className="mt-2 text-xs leading-relaxed text-washi-200/60">
          日柱を基準にした空亡（天中殺）の地支です。この干支が巡る年・月・日は、努力の成果が見えにくい代わりに、力を抜いて過ごすとよい時期とされます。
        </p>
      </Card>

      <Card title="陰陽のバランス">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="font-mincho text-3xl text-washi-50">{result.yinYangCount.陽}</p>
            <p className="mt-1 text-xs text-washi-200/60">陽</p>
          </div>
          <div className="h-8 flex-1 overflow-hidden rounded-full bg-sumi-800 flex">
            <div
              className="h-full bg-gold"
              style={{ width: `${(result.yinYangCount.陽 / yinYangTotal) * 100}%` }}
            />
            <div
              className="h-full bg-sumi-600"
              style={{ width: `${(result.yinYangCount.陰 / yinYangTotal) * 100}%` }}
            />
          </div>
          <div className="text-center">
            <p className="font-mincho text-3xl text-washi-50">{result.yinYangCount.陰}</p>
            <p className="mt-1 text-xs text-washi-200/60">陰</p>
          </div>
        </div>
      </Card>

      <Card title="五行のバランス">
        <div className="space-y-2.5">
          {EL_ORDER.map((el) => (
            <BarRow
              key={el}
              label={el}
              value={result.wuxingCount[el]}
              max={wuxingMax}
              colorClass={`bg-el-${el}`}
            />
          ))}
        </div>
      </Card>

      <Card title="通変星のバランス">
        <div className="space-y-2.5">
          {GROUP_ORDER.map((g) => (
            <BarRow
              key={g}
              label={GROUP_LABEL[g]}
              value={result.tenGodGroupCount[g]}
              max={groupMax}
              colorClass="bg-gold"
              labelWidthClass="w-16"
            />
          ))}
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-washi-200/50">
          自我の星＝比肩・劫財／表現の星＝食神・傷官／財の星＝偏財・正財／実行力の星＝偏官・正官／知性の星＝偏印・印綬
        </p>
      </Card>
    </div>
  );
}
