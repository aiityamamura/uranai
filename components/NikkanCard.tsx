import { NIKKAN_MEANINGS } from "@/lib/constants";
import { GAN_WUXING } from "@/lib/bazi";

export default function NikkanCard({ dayGan }: { dayGan: string }) {
  const meaning = NIKKAN_MEANINGS.find((m) => m.gan === dayGan);
  if (!meaning) return null;
  const element = GAN_WUXING[dayGan];

  return (
    <div className="seal-frame rounded-sm bg-sumi-900/60 p-6 sm:p-7">
      <p className="mb-3 font-mincho text-sm tracking-widest text-gold-light">あなたの日干</p>
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-el-${element} font-mincho text-4xl font-bold text-sumi-950`}>
          {dayGan}
        </div>
        <div>
          <p className="font-mincho text-lg text-washi-50">
            {dayGan}（{meaning.reading}） <span className="text-washi-200/60 text-sm">＝ {meaning.image}</span>
          </p>
          <p className="mt-2 text-sm leading-relaxed text-washi-100/85">{meaning.desc}</p>
        </div>
      </div>
    </div>
  );
}
