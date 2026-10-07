import type { BaziResult } from "@/lib/bazi";
import RelationTags from "@/components/RelationTags";

export default function LiuNianTable({
  result,
  startYear,
  onStartYearChange,
}: {
  result: BaziResult;
  startYear: number;
  onStartYearChange: (year: number) => void;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs text-washi-200/60">
          {result.liuNian[0]?.year}年 〜 {result.liuNian[result.liuNian.length - 1]?.year}年
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onStartYearChange(startYear - 10)}
            className="rounded-sm border border-gold/30 px-3 py-1 text-xs text-washi-100 hover:bg-sumi-800"
          >
            ← 10年前
          </button>
          <button
            type="button"
            onClick={() => onStartYearChange(startYear + 10)}
            className="rounded-sm border border-gold/30 px-3 py-1 text-xs text-washi-100 hover:bg-sumi-800"
          >
            10年後 →
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-center text-sm">
          <thead>
            <tr className="border-b border-gold/30 text-washi-200/60">
              <th className="py-2 font-normal">年</th>
              <th className="py-2 font-normal">年齢</th>
              <th className="py-2 font-normal">干支</th>
              <th className="py-2 font-normal">十二運</th>
              <th className="py-2 font-normal">通変星</th>
              <th className="py-2 font-normal">命式との関係</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/10">
            {result.liuNian.map((r) => (
              <tr key={r.year} className={r.age < 0 ? "opacity-30" : ""}>
                <td className="py-2.5 font-mono">{r.year}</td>
                <td className="py-2.5 text-washi-200/70">{r.age >= 0 ? `${r.age}歳` : "―"}</td>
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
