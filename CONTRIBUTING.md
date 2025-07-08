# 🤝 おでよみ - 貢献ガイド

## 📋 プロジェクト概要

「おでよみ」は天気に基づいた子供の服装提案と遊び場検索ができるReact/Node.jsアプリです。Netlifyで完全無料デプロイが可能です。

## 🛠️ 開発環境セットアップ

```bash
# リポジトリクローン
git clone <repo-url>
cd odeyomi-netlify

# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev
```

## 📁 プロジェクト構造

```
├── src/
│   ├── components/ui/      # UIコンポーネント (.jsx)
│   ├── pages/             # ページコンポーネント (.jsx)  
│   ├── hooks/             # カスタムフック (.js)
│   ├── lib/               # ユーティリティ (.js)
│   └── index.css          # グローバルスタイル
├── netlify/
│   └── functions/         # サーバーレス関数 (.js)
├── dist/                  # ビルド出力 (自動生成)
├── netlify.toml          # デプロイ設定
└── build-netlify.js      # Netlifyビルドスクリプト
```

## 🎯 主要機能

1. **天気情報取得** - Open-Meteo API使用
2. **服装提案** - 天気・年齢・温度に基づくアルゴリズム
3. **遊び場提案** - 30+の東京エリア施設データベース
4. **位置情報連携** - 現在地の天気自動取得
5. **レスポンシブUI** - モバイル・デスクトップ対応

## 🔧 開発ルール

### コードスタイル
- **JavaScript**: ESモジュール (import/export)
- **React**: 関数コンポーネント + Hooks
- **JSX**: ファイル拡張子 `.jsx` 必須
- **Styling**: Tailwind CSS

### コンポーネント設計
- UIコンポーネント: `src/components/ui/`
- ページコンポーネント: `src/pages/`
- 再利用可能ロジック: `src/hooks/`

### API関数
- Netlify Functions: `netlify/functions/`
- CORS対応ヘッダー必須
- エラーハンドリング実装

## 🧪 テスト・ビルド

```bash
# プロダクションビルド
node build-netlify.js

# ローカルPreview
npm run preview

# Netlify CLIテスト (任意)
npx netlify dev
```

## 📦 デプロイフロー

1. **開発** → `npm run dev`
2. **テスト** → `node build-netlify.js`
3. **Push** → `git push origin main`
4. **自動デプロイ** → Netlifyが自動実行

## 🤔 貢献方法

### バグ報告
- Issue作成時に環境情報を含める
- 再現手順を詳細に記載
- スクリーンショット添付推奨

### 機能追加
- 事前にIssueで議論
-小さな単位でPull Request
- テスト・ドキュメント更新

### 遊び場データ追加
`netlify/functions/playgrounds.js`内の`playgroundDatabase`配列に以下形式で追加：

```javascript
{
  id: "unique-id",
  name: "施設名",
  category: "outdoor|indoor|water|educational|covered",
  description: "説明文",
  weatherSuitability: { sunny: 10, cloudy: 8, rainy: 2, snowy: 4 },
  ageGroups: ["toddler", "preschool", "school"],
  features: ["特徴1", "特徴2"],
  safetyNotes: ["安全注意1"],
  estimatedDuration: "滞在時間",
  cost: "free|low|medium|high",
  googleMapsUrl: "https://maps.google.com/maps?q=施設名",
  coordinates: { lat: 緯度, lng: 経度 }
}
```

## 📞 サポート

- **Issues**: バグ報告・機能要望
- **Discussions**: 質問・アイデア議論
- **Wiki**: 詳細ドキュメント

---

**ご協力をお待ちしています！** 🙏