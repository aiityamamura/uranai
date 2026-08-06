import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "命式手帖 | 四柱推命 命式表 自動計算",
  description:
    "生年月日・出生時刻から四柱推命の命式（年柱・月柱・日柱・時柱）を自動計算。天干・地支・蔵干・十二運・通変星・大運・年運・月運までまとめて確認できます。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500;700&family=Zen+Kaku+Gothic+New:wght@400;500;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-sumi-950 text-washi-100 font-gothic antialiased">{children}</body>
    </html>
  );
}
