# 命式手帖（四柱推命 命式表 自動計算アプリ）

生年月日・出生時刻から四柱推命の命式を自動計算する Web アプリです。Next.js 製で、Vercel にそのままデプロイできます。

## 主な機能

- 生年月日・出生時刻（不明も選択可）・性別を入力して命式を自動計算
- 命式表：年柱・月柱・日柱・時柱それぞれの天干・地支・蔵干・十二運・天干通変星・蔵干通変星
- 空亡（天中殺）、陰陽バランス、五行バランス、通変星バランス
- 大運（10年運）表
- 年運（歳運）表（10年ずつ前後にページ送り可能）
- 月運表（年を切り替え可能）
- 通変星・十二運・五行・四柱の意味の解説パネル

## 計算ロジックについて

干支・節入り・十二運・通変星などの計算には [`lunar-javascript`](https://www.npmjs.com/package/lunar-javascript) を利用しています。立春を基準とした年柱の切り替わりなど、四柱推命として一般的なルールに沿って計算しています。

用語はライブラリ内部の中国式表記（七殺・傷官など）を日本の四柱推命で一般的な表記（偏官・傷官など）に変換して表示しています（`lib/bazi.ts` 内の変換表を参照）。

## ローカルでの動作確認

```bash
npm install
npm run dev
```

`http://localhost:3000` で確認できます。

## Vercel へのデプロイ手順

### 方法A：Vercel CLI を使う（このフォルダから直接デプロイ）

```bash
npm install -g vercel
cd shichusuimei-app
vercel
```

指示に従ってログイン・プロジェクト名を設定すれば、数十秒でデプロイURLが発行されます。本番反映は次のコマンドです。

```bash
vercel --prod
```

### 方法B：GitHub 経由（推奨・以後の更新が楽）

1. このフォルダの中身を GitHub の新しいリポジトリにプッシュする
   ```bash
   cd shichusuimei-app
   git init
   git add .
   git commit -m "first commit"
   git branch -M main
   git remote add origin https://github.com/<あなたのアカウント>/<リポジトリ名>.git
   git push -u origin main
   ```
2. [vercel.com](https://vercel.com) にログインし、「Add New... → Project」からそのリポジトリを選択
3. フレームワークは自動的に「Next.js」と検出されるので、設定を変えずに「Deploy」をクリック
4. 数分でデプロイが完了し、`https://（プロジェクト名）.vercel.app` のURLが発行されます

以後は `main` ブランチに push するたびに自動で再デプロイされます。

## ディレクトリ構成

```
app/                 Next.js App Router（ページ・レイアウト・グローバルCSS）
components/          フォーム・命式表・各種テーブルなどのUI部品
lib/bazi.ts          命式計算エンジン本体（lunar-javascript のラッパー）
lib/constants.ts      解説パネル用のテキスト
types/                lunar-javascript 用の型宣言
```

## 注意事項

- 本アプリの結果は四柱推命の理論に基づく機械計算であり、統計的な傾向を示す参考情報です。
- 出生時刻は「地方標準時（日本時間）」の時計時刻をそのまま使用しており、真太陽時による補正は行っていません。
- 生まれた時間が不明な場合、時柱（時干・時支）は表示されません。年柱・月柱・日柱および大運・年運・月運には影響しません。
