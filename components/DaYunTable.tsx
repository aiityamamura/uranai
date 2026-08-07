import type { BaziResult } from "@/lib/bazi";
import RelationTags from "@/components/RelationTags";

export default function DaYunTable({ result }: { result: BaziResult }) {
  return (
    <div>
      <p className="mb-3 text-xs text-washi-200/60">{result.qiYunNote}</p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-center text-sm">
          <thead>
            <tr className="border-b border-gold/30 text-washi-200/60">
              <th className="py-2 font-normal">年齢</th>
              <th className="py-2 font-normal">期間</th>
              <th className="py-2 font-normal">干支</th>
              <th className="py-2 font-normal">十二運</th>
              <th className="py-2 font-normal">通変星</th>
              <th className="py-2 font-normal">命式との関係</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/10">
            {result.daYun.map((d) => (
              <tr key={d.startAge}>
                <td className="py-2.5 font-mono">{d.startAge}〜{d.endAge}歳</td>
                <td className="py-2.5 text-washi-200/70">
                  {d.startYear}〜{d.endYear}
                </td>
                <td className="py-2.5 font-mincho text-base text-washi-50">{d.ganZhi}</td>
                <td className="py-2.5">{d.juniUn}</td>
                <td className="py-2.5">{d.shiShen}</td>
                <td className="py-2.5"><RelationTags relations={d.relations} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
