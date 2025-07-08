import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Badge } from '../components/ui/badge.jsx';
import { 
  Baby, 
  ArrowLeft, 
  Sun, 
  Cloud, 
  CloudRain, 
  Snowflake,
  Shirt,
  MapPin,
  Clock,
  Star,
  Users,
  Thermometer,
  Droplets
} from 'lucide-react';

export default function Help() {
  const weatherConditions = [
    { icon: <Sun className="w-6 h-6" />, name: '晴れ', description: '直射日光があり、紫外線対策が重要' },
    { icon: <Cloud className="w-6 h-6" />, name: '曇り', description: '日差しは弱いが、湿度に注意' },
    { icon: <CloudRain className="w-6 h-6" />, name: '雨', description: '濡れない服装と滑りにくい靴が必要' },
    { icon: <Snowflake className="w-6 h-6" />, name: '雪', description: '防寒対策と防水性が最重要' }
  ];

  const ageGroups = [
    { 
      icon: '👶', 
      name: '幼児 (1-3歳)', 
      description: '体温調節が未熟で、安全性を最優先',
      features: ['肌に優しい素材', '動きやすさ重視', '汚れても大丈夫な服']
    },
    { 
      icon: '🧒', 
      name: '幼稚園児 (4-6歳)', 
      description: '活発に動くため、機能性と快適さが重要',
      features: ['遊びに適した服装', '着脱しやすい設計', '汚れ対策']
    },
    { 
      icon: '👦', 
      name: '小学生 (7-12歳)', 
      description: '自分で服装を選ぶ年齢、実用性と見た目のバランス',
      features: ['学校活動に適応', '季節感のある服装', '個性を表現']
    }
  ];

  const clothingCategories = [
    { icon: '👕', name: 'トップス', description: '上半身の服装。温度調節の基本となる重要な部分' },
    { icon: '👖', name: 'ボトムス', description: '下半身の服装。動きやすさと保温性を考慮' },
    { icon: '👟', name: '靴', description: '足元の安全と快適性を確保する重要なアイテム' },
    { icon: '🧥', name: '防寒具', description: '寒い時期の追加レイヤー。調節しやすいものを選択' },
    { icon: '🎒', name: '小物・アクセサリー', description: '帽子、手袋、マフラーなど、天気に応じた補助アイテム' }
  ];

  const playgroundTypes = [
    { icon: '🏞️', name: '屋外公園', description: '天気の良い日に最適。自然の中で遊べる' },
    { icon: '🏢', name: '屋内施設', description: '雨や雪の日でも安心して遊べる施設' },
    { icon: '🏛️', name: '教育施設', description: '博物館や科学館など、学びながら遊べる場所' },
    { icon: '🏊', name: 'ウォーターパーク', description: '暑い日に最適な水遊びができる施設' },
    { icon: '🛍️', name: 'ショッピングモール', description: '屋根があり、様々な施設が集まった複合施設' },
    { icon: '🎢', name: 'アドベンチャー', description: 'アスレチックや冒険要素のある遊び場' }
  ];

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
              <Baby className="w-16 h-16 text-emerald-300" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              使い方ガイド
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              おでよみの機能と使い方を詳しく説明します
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        
        {/* How it works */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">おでよみの仕組み</h2>
            <p className="text-white/70 text-lg">3つのステップで最適な提案をお届けします</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-emerald-500/20 mb-6">
                <Thermometer className="w-8 h-8 text-emerald-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">1. 天気情報入力</h3>
              <p className="text-white/70">現在の気温、湿度、天気、お子様の年齢を入力していただきます</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-emerald-500/20 mb-6">
                <Shirt className="w-8 h-8 text-emerald-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">2. AI分析</h3>
              <p className="text-white/70">AIが天気条件と年齢を分析し、最適な服装と遊び場を選定します</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-emerald-500/20 mb-6">
                <MapPin className="w-8 h-8 text-emerald-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">3. 個別提案</h3>
              <p className="text-white/70">具体的な服装アイテムと近くの遊び場を理由付きで提案します</p>
            </Card>
          </div>
        </section>

        {/* Weather Conditions */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">天気別対応</h2>
            <p className="text-white/70 text-lg">各天気条件に応じた服装のポイント</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {weatherConditions.map((condition, index) => (
              <Card key={index} className="p-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center p-3 rounded-xl bg-emerald-500/20 mb-4">
                    {condition.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{condition.name}</h3>
                  <p className="text-white/70 text-sm">{condition.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Age Groups */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">年齢別配慮</h2>
            <p className="text-white/70 text-lg">年齢に応じた服装選びのポイント</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ageGroups.map((group, index) => (
              <Card key={index} className="p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{group.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{group.name}</h3>
                  <p className="text-white/70">{group.description}</p>
                </div>
                <div className="space-y-2">
                  {group.features.map((feature, featureIndex) => (
                    <Badge key={featureIndex} variant="secondary" className="w-full justify-start">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Clothing Categories */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">服装カテゴリー</h2>
            <p className="text-white/70 text-lg">提案される服装アイテムの種類</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clothingCategories.map((category, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{category.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-white/70 text-sm">{category.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Playground Types */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">遊び場の種類</h2>
            <p className="text-white/70 text-lg">天気と年齢に合わせて提案される遊び場</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playgroundTypes.map((type, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{type.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{type.name}</h3>
                    <p className="text-white/70 text-sm">{type.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">活用のコツ</h2>
            <p className="text-white/70 text-lg">より良い提案を受けるためのヒント</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8">
              <div className="flex items-start space-x-4">
                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-emerald-500/20 flex-shrink-0">
                  <Clock className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">最新の天気情報を使用</h3>
                  <p className="text-white/70">「現在地の天気」ボタンを使用して、最も正確な天気データを取得しましょう。手動入力の場合は、外出予定時刻の天気予報を参考にしてください。</p>
                </div>
              </div>
            </Card>
            <Card className="p-8">
              <div className="flex items-start space-x-4">
                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-emerald-500/20 flex-shrink-0">
                  <Users className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">活動内容を考慮</h3>
                  <p className="text-white/70">公園で活発に遊ぶ予定なら動きやすい服装、屋内施設なら温度調節しやすい服装など、予定に合わせて提案を参考にしてください。</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <Card className="p-12 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">さっそく使ってみましょう</h2>
            <p className="text-white/70 text-lg mb-8">
              お子様にぴったりの服装と遊び場を見つけて、素敵な1日をお過ごしください
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
              天気に合わせた子供の服装と遊び場を提案するAIアシスタント
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}