"use client";

import { useState } from "react";

export interface BirthFormValues {
  year: number;
  month: number;
  day: number;
  hour: number | null;
  gender: "male" | "female";
}

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1900 + 1 }, (_, i) => CURRENT_YEAR - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

const HOURS = [
  { value: null, label: "生まれ時間不明" },
  { value: 0, label: "午前0時（23:00〜0:59）" },
  { value: 2, label: "午前2時（1:00〜2:59）" },
  { value: 4, label: "午前4時（3:00〜4:59）" },
  { value: 6, label: "午前6時（5:00〜6:59）" },
  { value: 8, label: "午前8時（7:00〜8:59）" },
  { value: 10, label: "午前10時（9:00〜10:59）" },
  { value: 12, label: "正午（11:00〜12:59）" },
  { value: 14, label: "午後2時（13:00〜14:59）" },
  { value: 16, label: "午後4時（15:00〜16:59）" },
  { value: 18, label: "午後6時（17:00〜18:59）" },
  { value: 20, label: "午後8時（19:00〜20:59）" },
  { value: 22, label: "午後10時（21:00〜22:59）" },
];

export default function BirthForm({
  onSubmit,
  submitting,
}: {
  onSubmit: (values: BirthFormValues) => void;
  submitting?: boolean;
}) {
  const [year, setYear] = useState(1990);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState<number | null>(null);
  const [gender, setGender] = useState<"male" | "female">("female");

  const maxDay = daysInMonth(year, month);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ year, month, day: Math.min(day, maxDay), hour, gender });
      }}
      className="seal-frame rounded-sm bg-sumi-900/70 p-6 sm:p-8"
    >
      <p className="mb-6 font-mincho text-sm tracking-widest text-gold-light">生年月日をご入力ください</p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Field label="西暦">
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="select-base"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}年
              </option>
            ))}
          </select>
        </Field>

        <Field label="月">
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="select-base"
          >
            {MONTHS.map((m) => (
              <option key={m} value={m}>
                {m}月
              </option>
            ))}
          </select>
        </Field>

        <Field label="日">
          <select value={day} onChange={(e) => setDay(Number(e.target.value))} className="select-base">
            {Array.from({ length: maxDay }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>
                {d}日
              </option>
            ))}
          </select>
        </Field>

        <Field label="性別">
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as "male" | "female")}
            className="select-base"
          >
            <option value="female">女性</option>
            <option value="male">男性</option>
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field label="生まれた時間">
          <select
            value={hour === null ? "unknown" : String(hour)}
            onChange={(e) => setHour(e.target.value === "unknown" ? null : Number(e.target.value))}
            className="select-base w-full"
          >
            {HOURS.map((h) => (
              <option key={h.label} value={h.value === null ? "unknown" : h.value}>
                {h.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-7 w-full rounded-sm bg-seal py-3 font-mincho text-base tracking-widest text-washi-50 transition hover:bg-seal-light disabled:opacity-60 sm:w-auto sm:px-10"
      >
        鑑定する
      </button>

      <style jsx global>{`
        .select-base {
          width: 100%;
          background-color: rgba(18, 23, 42, 0.6);
          border: 1px solid rgba(200, 161, 90, 0.35);
          color: #f3efe2;
          padding: 0.55rem 0.6rem;
          border-radius: 2px;
          font-size: 0.9rem;
        }
        .select-base:focus {
          outline: 2px solid #c8a15a;
          outline-offset: 1px;
        }
      `}</style>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs text-washi-200/70">{label}</span>
      {children}
    </label>
  );
}
