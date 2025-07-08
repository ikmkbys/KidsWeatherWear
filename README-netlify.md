# おでよみ - Netlifyバージョン

天気に合わせた子供の服装と遊び場を提案するReact/Node.jsアプリのNetlify対応版です。

## 特徴

- 天気情報（気温、湿度、天候）に基づく服装提案
- 年齢別（幼児、幼稚園児、小学生）の適切な服装アドバイス
- 位置情報を使った現在地の天気自動取得
- 30以上の遊び場データベースから最適な場所を提案
- レスポンシブデザインでモバイル対応

## 技術スタック

### フロントエンド
- React 18
- Vite
- Tailwind CSS
- TanStack Query
- Wouter (ルーティング)
- Lucide React (アイコン)

### バックエンド
- Netlify Functions (Node.js)
- Open-Meteo API (天気データ)

## ローカル開発

```bash
# 依存関係をインストール
npm install

# 開発サーバー起動
npm run dev
```

## Netlifyデプロイ

### 自動デプロイ手順
1. GitHubリポジトリにプッシュ
2. Netlifyでリポジトリを接続
3. ビルド設定は自動で適用 (`netlify.toml`で設定済み)
4. デプロイ完了

### 手動テスト
```bash
# ローカルビルドテスト
node build-netlify.js

# Netlify CLI でローカルテスト（任意）
npx netlify dev
```

### 重要ファイル
- `netlify.toml`: ビルド設定とリダイレクト
- `build-netlify.js`: Netlify専用ビルドスクリプト
- `_redirects`: SPA用フォールバック設定

## ディレクトリ構成

```
├── netlify/
│   └── functions/          # Netlify Functions
│       ├── current-weather.js
│       ├── recommendations.js
│       └── playgrounds.js
├── src/
│   ├── components/ui/      # UIコンポーネント
│   ├── hooks/             # カスタムフック
│   ├── lib/               # ユーティリティ
│   ├── pages/             # ページコンポーネント
│   ├── App.js             # メインアプリ
│   └── index.js           # エントリーポイント
├── netlify.toml           # Netlifyビルド設定
└── package.json
```

## API エンドポイント

- `POST /.netlify/functions/current-weather` - 現在地の天気取得
- `POST /.netlify/functions/recommendations` - 服装提案
- `POST /.netlify/functions/playgrounds` - 遊び場提案

## 無料で使える範囲

- Netlify: 月100GB転送量、125,000リクエスト/月まで無料
- Open-Meteo API: 完全無料（商用利用可）
- 遊び場データ: アプリ内蔵（外部API不要）

サーバー費用なしでフル機能が使えます！