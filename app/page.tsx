"use client";

import { useMemo, useState } from "react";
import BirthForm, { BirthFormValues } from "@/components/BirthForm";
import ChartTable from "@/components/ChartTable";
import SummaryPanels from "@/components/SummaryPanels";
import DaYunTable from "@/components/DaYunTable";
import LiuNianTable from "@/components/LiuNianTable";
import LiuYueTable from "@/components/LiuYueTable";
import InfoSection from "@/components/InfoSection";
import { calculateBazi } from "@/lib/bazi";

const CURRENT_YEAR = new Date().getFullYear();

export default function Home() {
  const [birth, setBirth] = useState<BirthFormValues | null>(null);
  const [liuNianStartYear, setLiuNianStartYear] = useState(CURRENT_YEAR - 2);
  const [liuYueYear, setLiuYueYear] = useState(CURRENT_YEAR);

  const result = useMemo(() => {
    if (!birth) return null;
    return calculateBazi({
      year: birth.year,
      month: birth.month,
      day: birth.day,
      hour: birth.hour,
      gender: birth.gender,
      liuNianStartYear,
      liuNianCount: 12,
      liuYueYear,
    });
  }, [birth, liuNianStartYear, liuYueYear]);

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-14 sm:px-6">
      <header className="mb-10 text-center">
        <p className="font-mincho text-xs tracking-[0.3em] text-gold-light">SHICHUU SUIMEI</p>
        <h1 className="mt-3 font-mincho text-3xl tracking-wide text-washi-50 sm:text-4xl">命式手帖</h1>
        <p className="mt-4 text-sm leading-relaxed text-washi-200/70">
          生年月日と出生時刻から、四柱推命の命式を自動で計算します。
          <br className="hidden sm:block" />
          天干・地支・蔵干・十二運・通変星から、大運・年運・月運まで確認できます。
        </p>
      </header>

      <BirthForm
        onSubmit={(values) => {
          setBirth(values);
          setLiuNianStartYear(values.year >= CURRENT_YEAR - 2 ? values.year : CURRENT_YEAR - 2);
          setLiuYueYear(CURRENT_YEAR);
        }}
      />

      {result && (
        <div className="mt-12 space-y-10">
          <section>
            <SectionTitle jp="命式" en="THE CHART" />
            <div className="seal-frame rounded-sm bg-sumi-900/60 p-5 sm:p-7">
              <ChartTable result={result} />
            </div>
          </section>

          <section>
            <SectionTitle jp="命式の傾向" en="BALANCE" />
            <SummaryPanels result={result} />
          </section>

          <section>
            <SectionTitle jp="大運（10年運）" en="10-YEAR CYCLES" />
            <div className="rounded-sm border border-gold/20 bg-sumi-900/60 p-5 sm:p-7">
              <DaYunTable result={result} />
            </div>
          </section>

          <section>
            <SectionTitle jp="年運（歳運）" en="ANNUAL FORTUNE" />
            <div className="rounded-sm border border-gold/20 bg-sumi-900/60 p-5 sm:p-7">
              <LiuNianTable result={result} startYear={liuNianStartYear} onStartYearChange={setLiuNianStartYear} />
            </div>
          </section>

          <section>
            <SectionTitle jp="月運" en="MONTHLY FORTUNE" />
            <div className="rounded-sm border border-gold/20 bg-sumi-900/60 p-5 sm:p-7">
              <LiuYueTable result={result} year={liuYueYear} onYearChange={setLiuYueYear} />
            </div>
          </section>

          <section>
            <SectionTitle jp="命式のみかた" en="HOW TO READ" />
            <InfoSection />
          </section>
        </div>
      )}

      <footer className="mt-20 text-center text-[11px] text-washi-200/35">
        <p>命式手帖 ｜ 四柱推命 命式表 自動計算</p>
      </footer>
    </main>
  );
}

function SectionTitle({ jp, en }: { jp: string; en: string }) {
  return (
    <div className="mb-4 flex items-baseline gap-3">
      <h2 className="font-mincho text-xl tracking-wide text-washi-50">{jp}</h2>
      <span className="font-mono text-[10px] tracking-[0.2em] text-washi-200/35">{en}</span>
      <span className="h-px flex-1 bg-gold/20" />
    </div>
  );
}
