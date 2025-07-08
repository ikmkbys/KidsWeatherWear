# 📦 おでよみ - Netlifyデプロイメントガイド

## 🌟 概要

NetlifyでのReact/Node.js版「おでよみ」デプロイメント手順書

## ✅ 完了済み

### フロントエンド
- ✅ React 18 (JSX)
- ✅ Vite + Tailwind CSS
- ✅ TanStack Query
- ✅ レスポンシブUI
- ✅ 天気・服装・遊び場機能

### バックエンド
- ✅ Netlify Functions
  - `current-weather.js` - 天気取得API
  - `recommendations.js` - 服装提案API  
  - `playgrounds.js` - 遊び場提案API

### 設定ファイル
- ✅ `netlify.toml` - ビルド設定とリダイレクト
- ✅ `build-netlify.js` - カスタムビルドスクリプト
- ✅ `_redirects` - SPA用フォールバック
- ✅ `vite.config.js` - JSX対応済み

## 🚀 Netlifyデプロイ手順

### 1. GitHubリポジトリ準備
```bash
git init
git add .
git commit -m "Initial commit: React/Node.js version"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Netlifyデプロイ設定
1. [Netlify](https://netlify.com) にログイン
2. "New site from Git" をクリック
3. GitHubリポジトリを選択
4. ビルド設定は **自動検出** されます：
   - Build command: `node build-netlify.js`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`

### 3. 環境変数設定
Netlifyサイト設定で追加（不要 - 全てパブリックAPI）：
- Open-Meteo API: 認証不要・無料
- 遊び場データ: アプリ内蔵

## 💰 コスト構造

### Netlifyレベル - 無料
- ✅ 月100GB転送量
- ✅ 月125,000 Function実行
- ✅ 300分/月ビルド時間
- ✅ カスタムドメイン対応

### 外部API - 無料
- ✅ Open-Meteo: 完全無料
- ✅ 遊び場データ: 内蔵

**→ 月額費用: ¥0**

## 🔧 ローカル開発・テスト

```bash
# 開発サーバー
npm run dev

# プロダクションビルドテスト
node build-netlify.js

# Netlify CLIローカルテスト（任意）
npx netlify dev
```

## 📂 プロジェクト構成

```
おでよみ-netlify/
├── netlify/
│   └── functions/          # サーバーレス関数
├── src/
│   ├── components/ui/      # UIコンポーネント (.jsx)
│   ├── pages/             # ページ (.jsx)
│   ├── hooks/             # カスタムフック
│   └── lib/               # ユーティリティ
├── dist/                  # ビルド出力 (自動生成)
├── netlify.toml          # デプロイ設定
├── build-netlify.js      # ビルドスクリプト
├── _redirects           # SPAルーティング
└── README-netlify.md    # 詳細ドキュメント
```

## 🎯 機能確認

デプロイ後の動作確認項目：

### フロントエンド
- [ ] ホームページ表示
- [ ] レスポンシブデザイン
- [ ] ナビゲーション動作

### 天気機能
- [ ] 「現在地の天気」ボタン
- [ ] 位置情報許可・取得
- [ ] 天気データ自動入力

### 服装提案
- [ ] 天気入力フォーム
- [ ] 年齢選択
- [ ] 服装提案表示
- [ ] アクセサリー提案

### 遊び場提案
- [ ] 位置情報に基づく提案
- [ ] 天気適合スコア表示
- [ ] Google Maps連携

## 🐛 トラブルシューティング

### ビルドエラー
```bash
# JSX構文エラー → ファイル拡張子確認
# .js → .jsx for JSX components

# 依存関係エラー → 再インストール
npm install
```

### Functions エラー
- CORS設定確認 (Headers in functions)
- console.logでデバッグ (Netlify Functions ログ)

### パフォーマンス
- 静的アセット最適化 (自動)
- CDN配信 (Netlify標準)
- 画像最適化 (WebP対応済み)

## 📈 アップデート手順

```bash
# 変更をcommit & push
git add .
git commit -m "Update: feature description"
git push origin main

# → Netlifyが自動ビルド・デプロイ
```

---

**🎉 完全無料で本格的なWebアプリがデプロイできます！**