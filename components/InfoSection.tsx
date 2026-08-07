"use client";

import { useState } from "react";
import {
  TEN_GOD_MEANINGS,
  JUNI_UN_MEANINGS,
  WUXING_MEANINGS,
  PILLAR_MEANINGS,
  ZHI_RELATION_MEANINGS,
} from "@/lib/constants";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gold/15">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="font-mincho text-base tracking-wide text-washi-50">{title}</span>
        <span className="text-gold-light">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="pb-5">{children}</div>}
    </div>
  );
}

export default function InfoSection() {
  return (
    <div className="rounded-sm border border-gold/20 bg-sumi-900/60 px-6">
      <Section title="四柱と命式の見方">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {PILLAR_MEANINGS.map((p) => (
            <div key={p.label} className="rounded-sm bg-sumi-800/50 p-4">
              <p className="font-mincho text-sm text-gold-light">
                {p.label} <span className="text-washi-200/50">（{p.period}）</span>
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-washi-100/85">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="通変星（十神）の意味">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {TEN_GOD_MEANINGS.map((t) => (
            <div key={t.name} className="flex gap-3 rounded-sm bg-sumi-800/50 p-3">
              <span className="w-14 shrink-0 font-mincho text-sm text-gold-light">{t.name}</span>
              <span className="text-sm leading-relaxed text-washi-100/85">{t.desc}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="支合・冲・破・害・刑・空亡の意味">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {ZHI_RELATION_MEANINGS.map((r) => (
            <div key={r.name} className="flex gap-3 rounded-sm bg-sumi-800/50 p-3">
              <span className="w-14 shrink-0 font-mincho text-sm text-gold-light">{r.name}</span>
              <span className="text-sm leading-relaxed text-washi-100/85">{r.desc}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-washi-200/50">
          大運・年運・月運の表にある「命式との関係」は、それぞれの干支の地支が、命式の年支・月支・日支・時支に対してこれらの関係にあるかを示しています。
        </p>
      </Section>

      <Section title="十二運の意味">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {JUNI_UN_MEANINGS.map((j) => (
            <div key={j.name} className="rounded-sm bg-sumi-800/50 p-3">
              <p className="font-mincho text-sm text-gold-light">{j.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-washi-100/80">{j.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="五行の意味">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-5">
          {WUXING_MEANINGS.map((w) => (
            <div key={w.name} className="rounded-sm bg-sumi-800/50 p-3 text-center">
              <p className={`el-${w.name} font-mincho text-2xl`}>{w.name}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-washi-100/80">{w.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <p className="py-5 text-xs leading-relaxed text-washi-200/45">
        本アプリの結果は四柱推命の理論に基づく機械計算であり、統計的な傾向を示す参考情報です。実際の運勢や重要な意思決定については、内容を鵜呑みにせず、専門家の鑑定や現実の状況とあわせてご参考にしてください。
      </p>
    </div>
  );
}
