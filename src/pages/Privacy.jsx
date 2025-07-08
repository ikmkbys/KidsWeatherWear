import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Badge } from '../components/ui/badge.jsx';
import { 
  Baby, 
  ArrowLeft, 
  Shield,
  MapPin,
  Database,
  Eye,
  Lock,
  Globe,
  Clock
} from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen gradient-mesh relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 glass z-50 shadow-2xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <div className="flex items-center space-x-4 cursor-pointer">
                <div className="p-2 rounded-xl bg-emerald-500/20 backdrop-blur-sm">
                  <Baby className="w-6 h-6 text-emerald-300" />
                </div>
                <span className="font-bold text-xl text-white">おでよみ</span>
              </div>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                ホームに戻る
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white/10 backdrop-blur-sm mb-8">
              <Shield className="w-16 h-16 text-emerald-300" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              プライバシーポリシー
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              おでよみにおける個人情報の取り扱いについて
            </p>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              最終更新：2025年7月8日
            </Badge>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        
        {/* Overview */}
        <section className="mb-16">
          <Card className="p-8">
            <div className="flex items-start space-x-6 mb-6">
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-emerald-500/20 flex-shrink-0">
                <Eye className="w-8 h-8 text-emerald-300" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">基本方針</h2>
                <p className="text-white/80 text-lg leading-relaxed">
                  おでよみ（以下「本サービス」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めています。
                  本サービスは位置情報を一時的に取得しますが、<strong className="text-emerald-300">いかなる個人情報も保存・蓄積いたしません</strong>。
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* 情報の取得について */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">取得する情報</h2>
            <p className="text-white/70 text-lg">本サービスが取得する情報について</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8">
              <div className="flex items-start space-x-4 mb-6">
                <MapPin className="w-8 h-8 text-emerald-300 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">位置情報</h3>
                  <div className="space-y-3 text-white/80">
                    <p><strong>取得目的：</strong>現在地の天気情報取得のため</p>
                    <p><strong>取得方法：</strong>ブラウザのGeolocation API</p>
                    <p><strong>取得タイミング：</strong>「現在地の天気」ボタン押下時のみ</p>
                    <p><strong className="text-emerald-300">保存期間：保存しません（一時的な利用のみ）</strong></p>
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="bg-emerald-500/20 text-emerald-300 border-emerald-300">
                サーバーに送信されません
              </Badge>
            </Card>

            <Card className="p-8">
              <div className="flex items-start space-x-4 mb-6">
                <Globe className="w-8 h-8 text-emerald-300 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">天気データ</h3>
                  <div className="space-y-3 text-white/80">
                    <p><strong>取得目的：</strong>服装・遊び場の提案のため</p>
                    <p><strong>取得方法：</strong>Open-Meteo API（無料天気サービス）</p>
                    <p><strong>取得内容：</strong>気温、湿度、天気状況</p>
                    <p><strong className="text-emerald-300">保存期間：保存しません（リクエスト時のみ利用）</strong></p>
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-300">
                外部APIから取得
              </Badge>
            </Card>
          </div>
        </section>

        {/* データの利用について */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">データの利用</h2>
            <p className="text-white/70 text-lg">取得した情報の利用方法</p>
          </div>

          <Card className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center p-4 rounded-xl bg-emerald-500/20 mb-4">
                  <Clock className="w-8 h-8 text-emerald-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">一時利用のみ</h3>
                <p className="text-white/70">
                  位置情報は天気取得時のみ利用し、処理完了後は即座に破棄されます
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center p-4 rounded-xl bg-emerald-500/20 mb-4">
                  <Database className="w-8 h-8 text-emerald-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">データベース保存なし</h3>
                <p className="text-white/70">
                  いかなる個人情報もデータベースやサーバーに保存いたしません
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center p-4 rounded-xl bg-emerald-500/20 mb-4">
                  <Lock className="w-8 h-8 text-emerald-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">第三者提供なし</h3>
                <p className="text-white/70">
                  取得した情報を第三者に提供・販売することはありません
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Cookie・ローカルストレージ */}
        <section className="mb-16">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Cookie・ローカルストレージについて</h2>
            <div className="space-y-4 text-white/80">
              <p>本サービスでは以下の技術を使用していますが、個人を特定する情報は含まれません：</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">使用する技術</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• セッション管理のためのCookie</li>
                    <li>• アプリケーション動作のためのローカルストレージ</li>
                    <li>• アクセス解析（匿名統計のみ）</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">含まれない情報</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• 位置情報の履歴</li>
                    <li>• 個人を特定できる情報</li>
                    <li>• 検索履歴・利用履歴</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* 外部サービス */}
        <section className="mb-16">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-white mb-6">外部サービスとの連携</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-emerald-500 pl-6">
                <h4 className="font-semibold text-white mb-2">Open-Meteo API（天気情報）</h4>
                <p className="text-white/70 text-sm">
                  天気情報の取得に利用。座標データを送信しますが、個人特定は行われません。
                  詳細は <a href="https://open-meteo.com/en/terms" className="text-emerald-300 hover:underline" target="_blank" rel="noopener noreferrer">Open-Meteoの利用規約</a> をご確認ください。
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-6">
                <h4 className="font-semibold text-white mb-2">Google Maps（遊び場情報）</h4>
                <p className="text-white/70 text-sm">
                  遊び場へのリンク表示に利用。Googleのプライバシーポリシーが適用されます。
                  詳細は <a href="https://policies.google.com/privacy" className="text-blue-300 hover:underline" target="_blank" rel="noopener noreferrer">Googleプライバシーポリシー</a> をご確認ください。
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* ユーザーの権利 */}
        <section className="mb-16">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-white mb-6">ユーザーの権利と選択</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-white mb-3">位置情報の利用について</h4>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>• 位置情報の利用は任意です</li>
                  <li>• ブラウザで位置情報を拒否できます</li>
                  <li>• 手動での天気入力も可能です</li>
                  <li>• いつでも設定を変更できます</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">データの削除について</h4>
                <ul className="space-y-2 text-white/70 text-sm">
                  <li>• 保存されるデータがないため削除不要です</li>
                  <li>• ブラウザのキャッシュ削除で完全消去可能</li>
                  <li>• Cookie設定はブラウザで管理できます</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* セキュリティ */}
        <section className="mb-16">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-white mb-6">セキュリティ対策</h2>
            <div className="space-y-4 text-white/80">
              <p>本サービスでは以下のセキュリティ対策を実施しています：</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-300">技術的対策</Badge>
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li>• HTTPS通信の採用</li>
                    <li>• データの暗号化送信</li>
                    <li>• セキュアなAPI利用</li>
                    <li>• 最新のセキュリティ標準遵守</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">運用対策</Badge>
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li>• データ保存期間の最小化</li>
                    <li>• アクセスログの適切な管理</li>
                    <li>• 定期的なセキュリティ監査</li>
                    <li>• インシデント対応体制の整備</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* お問い合わせ */}
        <section className="mb-16">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-white mb-6">お問い合わせ</h2>
            <div className="space-y-4 text-white/80">
              <p>本プライバシーポリシーに関するご質問やご不明な点がございましたら、以下までお問い合わせください：</p>
              <div className="mt-6 p-6 bg-white/5 rounded-xl">
                <p className="text-white font-semibold mb-2">おでよみ 開発チーム</p>
                <p className="text-white/70 text-sm">
                  本サービスはオープンソースプロジェクトとして開発されており、
                  GitHubリポジトリにて技術的な詳細をご確認いただけます。
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* 改定について */}
        <section className="mb-16">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-white mb-6">プライバシーポリシーの改定</h2>
            <div className="space-y-4 text-white/80">
              <p>
                本プライバシーポリシーは、法令の改正やサービス内容の変更に伴い改定することがあります。
                重要な変更がある場合は、本ページにて事前にお知らせいたします。
              </p>
              <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                <p className="text-emerald-300 font-semibold">
                  最新版の確認をお願いします
                </p>
                <p className="text-white/70 text-sm mt-1">
                  定期的に本ページをご確認いただき、最新のプライバシーポリシーをご確認ください。
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Card className="p-12 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">安心してご利用ください</h2>
            <p className="text-white/70 text-lg mb-8">
              おでよみは個人情報を保存せず、プライバシーを最優先に設計されています
            </p>
            <Link to="/">
              <Button size="lg" className="text-lg px-8 py-4">
                おでよみを使う
              </Button>
            </Link>
          </Card>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Baby className="w-6 h-6 text-emerald-300" />
              <span className="font-bold text-lg text-white">おでよみ</span>
            </div>
            <p className="text-white/60 text-sm">
              プライバシーを重視した子供向け服装・遊び場提案サービス
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}