# 子ども向け天気別服装推奨アプリ

日本の子ども向けに天気条件と年齢グループに基づいて適切な服装を提案し、位置情報に基づいた遊び場推奨機能も提供するWebアプリケーションです。

## 🌟 主な機能

### 服装推奨システム
- **年齢別対応**: 乳幼児(toddler)、幼稚園児(preschool)、学童(school)の3つの年齢グループ
- **天気別推奨**: 晴れ、曇り、雨、雪の4つの天気条件に対応
- **詳細な推奨**: 温度と湿度を考慮した包括的な服装アドバイス
- **カテゴリ別表示**: トップス、ボトムス、靴、アクセサリー、防護具に分類

### 遊び場推奨システム
- **天気適応型**: 現在の天気条件に最適な遊び場を提案
- **位置情報ベース**: ユーザーの現在地から近い施設を距離順で表示
- **多様なカテゴリ**: 屋内、屋外、屋根付き、水遊び、教育、アドベンチャーなど10種類
- **実在施設データ**: 昭和記念公園、すみだ水族館、キドキドなど実際の東京近郊施設
- **Googleマップ連携**: ワンクリックで施設の地図を表示

### リアルタイム天気取得
- **現在地の天気**: GPSを使用した自動天気取得
- **Open-Meteo API**: 正確で最新の気象データを使用
- **自動フォーム入力**: 取得した天気データでフォームを自動更新

## 🚀 技術スタック

### フロントエンド
- **React 18** + **TypeScript** - モダンなUI開発
- **Tailwind CSS** - ユーティリティファーストのスタイリング
- **Radix UI** - アクセシブルなUIコンポーネント
- **React Query** - サーバーステート管理
- **Wouter** - 軽量ルーティング
- **React Hook Form** + **Zod** - 型安全なフォーム処理

### バックエンド
- **Node.js** + **Express** - サーバーサイド
- **PostgreSQL** + **Drizzle ORM** - データベース
- **Neon Database** - サーバーレスPostgreSQL
- **TypeScript** - 全体的な型安全性

### 開発・デプロイ
- **Vite** - 高速ビルドツール
- **Replit** - 開発・デプロイ環境

## 📦 インストールと起動

### 必要な環境
- Node.js 18+
- PostgreSQL データベース

### セットアップ手順

1. **リポジトリのクローン**
```bash
git clone https://github.com/[your-username]/weather-clothing-app.git
cd weather-clothing-app
```

2. **依存関係のインストール**
```bash
npm install
```

3. **環境変数の設定**
```bash
# .env ファイルを作成
DATABASE_URL=your_postgresql_connection_string
```

4. **データベースセットアップ**
```bash
npm run db:push
```

5. **開発サーバーの起動**
```bash
npm run dev
```

アプリケーションは http://localhost:5000 で利用できます。

## 🗄️ データベーススキーマ

### weather_conditions テーブル
- 天気条件（温度、湿度、天気、年齢グループ）を保存

### clothing_recommendations テーブル
- 服装推奨データをカテゴリ別に管理

## 🎯 使用方法

1. **年齢グループを選択** (乳幼児/幼稚園児/学童)
2. **天気条件を入力** または **「現在地の天気」ボタンで自動取得**
3. **服装推奨を取得** - 適切な服装アイテムが表示
4. **遊び場推奨を確認** - 天気に適した近くの施設が表示
5. **Googleマップリンク** で施設の詳細位置を確認

## 🔧 開発者向け情報

### プロジェクト構造
```
├── client/          # Reactフロントエンド
│   ├── src/
│   │   ├── components/  # UIコンポーネント
│   │   ├── pages/       # ページコンポーネント
│   │   └── lib/         # ユーティリティ
├── server/          # Express バックエンド
│   ├── routes.ts    # API ルート
│   ├── storage.ts   # データアクセス層
│   └── playground-service.ts  # 遊び場推奨サービス
├── netlify/         # Netlify関数
│   └── functions/   # サーバーレス関数
├── shared/          # 共有型定義
│   └── schema.ts    # Drizzle スキーマ
├── netlify.toml     # Netlify設定ファイル
```

### 主要なAPIエンドポイント
- `POST /api/recommendations` - 服装推奨の取得
- `POST /api/current-weather` - 現在の天気データ取得
- `POST /api/playgrounds` - 遊び場推奨の取得
- `GET /api/playgrounds/:id` - 特定遊び場の詳細情報

### データベース操作
```bash
# スキーマの更新をデータベースにプッシュ
npm run db:push

# データベースの確認
npm run db:studio
```

## 🌐 デプロイ

### Vercel でのデプロイ（推奨）

1. **GitHubリポジトリの準備**
   - コードをGitHubにプッシュ

2. **Vercelでの設定**
   - [Vercel](https://vercel.com) にログイン
   - "New Project" をクリック
   - GitHubリポジトリを選択
   - Framework Preset: "Other" を選択

3. **環境変数の設定**
   ```
   DATABASE_URL=your_neon_database_url
   ```

4. **デプロイ完了**
   - 自動的にビルド・デプロイが開始
   - 数分でライブサイトが利用可能

### Netlify でのデプロイ（フロントエンドのみ）

⚠️ **注意**: NetlifyではAPI機能は動作しません（フロントエンドのみ）

1. [Netlify](https://netlify.com) にログイン
2. GitHubリポジトリを選択
3. ビルド設定は自動検出（netlify.tomlを使用）
4. デプロイ - UIのみ動作、API機能は利用不可

### Replit Deployments

1. Replit で プロジェクトを開く
2. "Deploy" ボタンをクリック
3. 環境変数（DATABASE_URL）を設定
4. デプロイ完了

## 📄 ライセンス

MIT License

## 🤝 コントリビューション

プルリクエストやイシューの報告を歓迎します。開発に参加する場合は、以下のガイドラインに従ってください：

1. フォークしてフィーチャーブランチを作成
2. 変更をコミット
3. プルリクエストを作成

## 📞 サポート

質問や問題がある場合は、GitHubのIssuesでお知らせください。

---

**開発者**: Replit AI Assistant  
**最終更新**: 2025年7月7日