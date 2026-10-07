"use client";

import { useState } from "react";
import {
  NIKKAN_MEANINGS,
  TEN_GOD_MEANINGS,
  TEN_GOD_GROUP_INFO,
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
      <Section title="十干（日干）の意味">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {NIKKAN_MEANINGS.map((n) => (
            <div key={n.gan} className="flex gap-3 rounded-sm bg-sumi-800/50 p-3">
              <span className="w-20 shrink-0 font-mincho text-sm text-gold-light">
                {n.gan}（{n.reading}）
                <br />
                <span className="text-washi-200/50">＝{n.image}</span>
              </span>
              <span className="text-sm leading-relaxed text-washi-100/85">{n.desc}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] leading-relaxed text-washi-200/45">
          日干は命式の中でもっとも重要な「自分自身」を表す星とされます。解説内容は
          <a
            href="https://sup.andyou.jp/shicyusuimei/meishiki-study/begginer/nikkan/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-light underline underline-offset-2 hover:text-gold"
          >
            優しい四柱推命「【日干編】四柱推命の命式からあなたの日干を調べてみよう」
          </a>
          を参考に作成しています。
        </p>
      </Section>

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
        <div className="space-y-5">
          {TEN_GOD_GROUP_INFO.map((g) => (
            <div key={g.group}>
              <p className="font-mincho text-sm text-gold-light">
                【{g.label}】<span className="ml-2 text-xs text-washi-200/50">{g.tagline}</span>
              </p>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {TEN_GOD_MEANINGS.filter((t) => t.group === g.group).map((t) => (
                  <div key={t.name} className="rounded-sm bg-sumi-800/50 p-3">
                    <p className="font-mincho text-sm text-washi-50">
                      {t.name}（{t.reading}）
                    </p>
                    <p className="mt-1 text-sm font-medium text-gold-light">{t.catchphrase}</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-washi-100/70">{t.desc}</p>
                    <a
                      href={t.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 inline-block text-[11px] text-gold-light underline underline-offset-2 hover:text-gold"
                    >
                      詳しく見る →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11px] leading-relaxed text-washi-200/45">
          グループ名・一言キーワードは
          <a
            href="https://sup.andyou.jp/shicyusuimei/category/tsuhensei/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-light underline underline-offset-2 hover:text-gold"
          >
            優しい四柱推命「通変星」解説ページ
          </a>
          を参考にしています。
        </p>
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
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {JUNI_UN_MEANINGS.map((j) => (
            <div key={j.name} className="rounded-sm bg-sumi-800/50 p-3">
              <p className="font-mincho text-sm text-washi-50">
                {j.name}（{j.reading}）
                <span className="ml-2 text-xs text-washi-200/50">{j.stage}</span>
              </p>
              <p className="mt-1 text-sm font-medium text-gold-light">{j.catchphrase}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-washi-100/70">{j.desc}</p>
              <a
                href={j.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-block text-[11px] text-gold-light underline underline-offset-2 hover:text-gold"
              >
                詳しく見る →
              </a>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11px] leading-relaxed text-washi-200/45">
          人生のステージになぞらえたエネルギー・一言キーワードは
          <a
            href="https://sup.andyou.jp/shicyusuimei/category/juniunsei/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-light underline underline-offset-2 hover:text-gold"
          >
            優しい四柱推命「十二運星」解説ページ
          </a>
          を参考にしています。
        </p>
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
