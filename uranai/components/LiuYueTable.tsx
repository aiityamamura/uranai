import type { BaziResult } from "@/lib/bazi";
import RelationTags from "@/components/RelationTags";

export default function LiuYueTable({
  result,
  year,
  onYearChange,
}: {
  result: BaziResult;
  year: number;
  onYearChange: (year: number) => void;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs text-washi-200/60">節入り基準の月干支です（暦月とは数日ずれる場合があります）</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onYearChange(year - 1)}
            className="rounded-sm border border-gold/30 px-3 py-1 text-xs text-washi-100 hover:bg-sumi-800"
          >
            ←
          </button>
          <span className="font-mono text-sm text-washi-50">{year}年</span>
          <button
            type="button"
            onClick={() => onYearChange(year + 1)}
            className="rounded-sm border border-gold/30 px-3 py-1 text-xs text-washi-100 hover:bg-sumi-800"
          >
            →
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-center text-sm">
          <thead>
            <tr className="border-b border-gold/30 text-washi-200/60">
              <th className="py-2 font-normal">月</th>
              <th className="py-2 font-normal">干支</th>
              <th className="py-2 font-normal">十二運</th>
              <th className="py-2 font-normal">通変星</th>
              <th className="py-2 font-normal">命式との関係</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/10">
            {result.liuYue.map((r) => (
              <tr key={r.monthLabel}>
                <td className="py-2.5 font-mono">{r.monthLabel}</td>
                <td className="py-2.5 font-mincho text-base text-washi-50">{r.ganZhi}</td>
                <td className="py-2.5">{r.juniUn}</td>
                <td className="py-2.5">{r.shiShen}</td>
                <td className="py-2.5"><RelationTags relations={r.relations} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
