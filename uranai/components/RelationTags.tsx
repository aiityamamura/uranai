function colorFor(tag: string): string {
  if (tag.includes("支合")) return "border-wood/50 text-wood bg-wood/10";
  if (tag.includes("冲")) return "border-seal/60 text-seal-light bg-seal/10";
  if (tag.includes("刑") || tag.includes("自刑")) return "border-fire/50 text-fire bg-fire/10";
  if (tag.includes("害")) return "border-metal/50 text-metal bg-metal/10";
  if (tag.includes("破")) return "border-washi-200/30 text-washi-200/70 bg-washi-200/5";
  if (tag === "空亡") return "border-gold/50 text-gold-light bg-gold/10";
  return "border-washi-200/30 text-washi-200/70 bg-washi-200/5";
}

export default function RelationTags({ relations }: { relations: string[] }) {
  if (!relations.length) return <span className="text-washi-200/25">―</span>;
  return (
    <div className="flex flex-wrap items-center justify-center gap-1">
      {relations.map((r, i) => (
        <span
          key={i}
          className={`whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] leading-tight ${colorFor(r)}`}
        >
          {r}
        </span>
      ))}
    </div>
  );
}
