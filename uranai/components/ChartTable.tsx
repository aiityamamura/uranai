import { GAN_WUXING, ZHI_WUXING } from "@/lib/bazi";
import type { BaziResult, PillarInfo, Element5 } from "@/lib/bazi";

function Chip({ char, element }: { char: string; element: Element5 }) {
  return (
    <span
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-el-${element} font-mincho text-lg font-bold text-sumi-950 sm:h-12 sm:w-12 sm:text-xl`}
    >
      {char}
    </span>
  );
}

export default function ChartTable({ result }: { result: BaziResult }) {
  // 命式表は伝統的に「時 / 日 / 月 / 年」の順で右から年柱が来るよう並べる
  const order: PillarInfo[] = [
    result.pillars[3],
    result.pillars[2],
    result.pillars[1],
    result.pillars[0],
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-center">
        <thead>
          <tr className="border-b border-gold/30">
            <th className="w-20 py-2 text-left text-xs font-normal text-washi-200/60"> </th>
            {order.map((p) => (
              <th key={p.label} className="py-2 font-mincho text-sm tracking-widest text-gold-light sm:text-base">
                {p.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gold/10">
          <Row label="天干">
            {order.map((p) => (
              <td key={p.label} className="py-3">
                {p.gan ? <Chip char={p.gan} element={GAN_WUXING[p.gan]} /> : <Dash />}
              </td>
            ))}
          </Row>
          <Row label="地支">
            {order.map((p) => (
              <td key={p.label} className="py-3">
                {p.zhi ? <Chip char={p.zhi} element={ZHI_WUXING[p.zhi]} /> : <Dash />}
              </td>
            ))}
          </Row>
          <Row label="蔵干">
            {order.map((p) => (
              <td key={p.label} className="py-3">
                {p.hideGan.length ? (
                  <div className="flex flex-wrap items-center justify-center gap-1">
                    {p.hideGan.map((g, i) => (
                      <span
                        key={i}
                        className={`el-${GAN_WUXING[g]} font-mono text-sm sm:text-base`}
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                ) : (
                  <Dash />
                )}
              </td>
            ))}
          </Row>
          <Row label="十二運">
            {order.map((p) => (
              <td key={p.label} className="py-3 font-mincho text-sm text-washi-100 sm:text-base">
                {p.juniUn ?? <Dash />}
              </td>
            ))}
          </Row>
          <Row label="天干通変星">
            {order.map((p) => (
              <td
                key={p.label}
                className={`py-3 text-sm sm:text-base ${p.ganShiShen === "日主" ? "font-mincho text-seal-light" : "text-washi-100"}`}
              >
                {p.ganShiShen}
              </td>
            ))}
          </Row>
          <Row label="蔵干通変星">
            {order.map((p) => (
              <td key={p.label} className="py-3">
                {p.zhiShiShen.length ? (
                  <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-xs text-washi-200/85 sm:text-sm">
                    {p.zhiShiShen.map((s, i) => (
                      <span key={i}>{s}</span>
                    ))}
                  </div>
                ) : (
                  <Dash />
                )}
              </td>
            ))}
          </Row>
        </tbody>
      </table>
      {result.hourUnknown && (
        <p className="mt-3 text-xs text-washi-200/50">
          ※ 生まれた時間が不明のため、時柱は算出していません。
        </p>
      )}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <tr>
      <th scope="row" className="py-3 text-left text-xs font-normal text-washi-200/60 sm:text-sm">
        {label}
      </th>
      {children}
    </tr>
  );
}

function Dash() {
  return <span className="text-washi-200/30">―</span>;
}
