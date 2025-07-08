import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '../components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Input } from '../components/ui/input.jsx';
import { Label } from '../components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select.jsx';
import { Badge } from '../components/ui/badge.jsx';
import { Separator } from '../components/ui/separator.jsx';
import { useToast } from '../hooks/use-toast.js';
import { 
  Baby, 
  Sun, 
  Cloud, 
  CloudRain, 
  Snowflake, 
  MapPin,
  ChevronUp,
  Navigation,
  Shirt,
  MapPinned
} from 'lucide-react';

const Home = () => {
  const [weatherInput, setWeatherInput] = useState({
    temperature: 25,
    humidity: 60,
    condition: 'sunny',
    ageGroup: 'preschool'
  });
  
  const [location, setLocation] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [playgroundRecommendations, setPlaygroundRecommendations] = useState([]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { toast } = useToast();

  // スクロール監視
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 現在地の天気取得
  const getCurrentWeatherMutation = useMutation({
    mutationFn: async () => {
      if (!navigator.geolocation) {
        throw new Error('位置情報がサポートされていません');
      }

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      setLocation({ lat: latitude, lng: longitude });

      const response = await fetch('/.netlify/functions/current-weather', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude, longitude })
      });

      if (!response.ok) {
        throw new Error('天気情報の取得に失敗しました');
      }

      return response.json();
    },
    onSuccess: (data) => {
      setWeatherInput({
        temperature: data.temperature,
        humidity: data.humidity,
        condition: data.condition,
        ageGroup: weatherInput.ageGroup
      });
      toast({
        title: '現在地の天気を取得しました',
        description: `気温: ${data.temperature}°C, 湿度: ${data.humidity}%`,
      });
    },
    onError: (error) => {
      toast({
        title: 'エラー',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // 服装・遊び場提案
  const getRecommendationsMutation = useMutation({
    mutationFn: async (request) => {
      const [clothingResponse, playgroundResponse] = await Promise.all([
        fetch('/.netlify/functions/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(request)
        }),
        location ? fetch('/.netlify/functions/playgrounds', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            weatherInput: request.weatherInput,
            location: location,
            radius: 10
          })
        }) : Promise.resolve(null)
      ]);

      if (!clothingResponse.ok) {
        throw new Error('服装提案の取得に失敗しました');
      }

      const clothingData = await clothingResponse.json();
      const playgroundData = playgroundResponse ? await playgroundResponse.json() : null;

      return { clothingData, playgroundData };
    },
    onSuccess: ({ clothingData, playgroundData }) => {
      setRecommendations(clothingData);
      setPlaygroundRecommendations(playgroundData?.playgroundRecommendations || []);
      toast({
        title: '提案を取得しました',
        description: `服装${clothingData.recommendations.length}件${playgroundData ? `、遊び場${playgroundData.playgroundRecommendations.length}件` : ''}の提案があります`,
      });
    },
    onError: (error) => {
      toast({
        title: 'エラー',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    getRecommendationsMutation.mutate({ weatherInput });
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-4 h-4" />;
      case 'cloudy': return <Cloud className="w-4 h-4" />;
      case 'rainy': return <CloudRain className="w-4 h-4" />;
      case 'snowy': return <Snowflake className="w-4 h-4" />;
      default: return <Sun className="w-4 h-4" />;
    }
  };

  const getWeatherLabel = (condition) => {
    switch (condition) {
      case 'sunny': return '晴れ';
      case 'cloudy': return '曇り';
      case 'rainy': return '雨';
      case 'snowy': return '雪';
      default: return '晴れ';
    }
  };

  const getAgeLabel = (ageGroup) => {
    switch (ageGroup) {
      case 'toddler': return '幼児 (1-3歳)';
      case 'preschool': return '幼稚園児 (4-6歳)';
      case 'school': return '小学生 (7-12歳)';
      default: return '幼稚園児 (4-6歳)';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 固定ナビゲーション */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-200 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Baby className="w-5 h-5 text-primary" />
              <span className="font-medium text-sm">おでよみ</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection('weather-input')}
                className="text-xs"
              >
                <Navigation className="w-3 h-3 mr-1" />
                天気入力
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection('recommendations')}
                className="text-xs"
              >
                <Shirt className="w-3 h-3 mr-1" />
                服装提案
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection('playgrounds')}
                className="text-xs"
              >
                <MapPinned className="w-3 h-3 mr-1" />
                遊び場
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-primary text-white shadow-lg mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <Baby className="w-8 h-8 mr-3" />
            <h1 className="text-2xl font-medium">おでよみ</h1>
          </div>
          <p className="text-center mt-2 text-blue-100">天気に合わせた子供の服装と遊び場を提案します</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* 天気入力セクション */}
        <section id="weather-input" className="scroll-mt-16 mb-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sun className="w-5 h-5" />
                <span>天気情報入力</span>
              </CardTitle>
              <CardDescription>
                現在の天気情報を入力してください
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="temperature">気温 (°C)</Label>
                    <Input
                      id="temperature"
                      type="number"
                      value={weatherInput.temperature}
                      onChange={(e) => setWeatherInput(prev => ({ ...prev, temperature: parseInt(e.target.value) }))}
                      min="-20"
                      max="50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="humidity">湿度 (%)</Label>
                    <Input
                      id="humidity"
                      type="number"
                      value={weatherInput.humidity}
                      onChange={(e) => setWeatherInput(prev => ({ ...prev, humidity: parseInt(e.target.value) }))}
                      min="0"
                      max="100"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="condition">天気</Label>
                    <Select 
                      value={weatherInput.condition} 
                      onValueChange={(value) => setWeatherInput(prev => ({ ...prev, condition: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sunny">☀️ 晴れ</SelectItem>
                        <SelectItem value="cloudy">☁️ 曇り</SelectItem>
                        <SelectItem value="rainy">🌧️ 雨</SelectItem>
                        <SelectItem value="snowy">❄️ 雪</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ageGroup">年齢層</Label>
                    <Select 
                      value={weatherInput.ageGroup} 
                      onValueChange={(value) => setWeatherInput(prev => ({ ...prev, ageGroup: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="toddler">👶 幼児 (1-3歳)</SelectItem>
                        <SelectItem value="preschool">🧒 幼稚園児 (4-6歳)</SelectItem>
                        <SelectItem value="school">👦 小学生 (7-12歳)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => getCurrentWeatherMutation.mutate()}
                    disabled={getCurrentWeatherMutation.isPending}
                    className="flex-1"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    {getCurrentWeatherMutation.isPending ? '取得中...' : '現在地の天気'}
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={getRecommendationsMutation.isPending}
                    className="flex-1"
                  >
                    {getRecommendationsMutation.isPending ? '提案中...' : '服装・遊び場を提案する'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* 服装提案セクション */}
        {recommendations && (
          <section id="recommendations" className="scroll-mt-16 mb-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">服装提案</h2>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    {getWeatherIcon(recommendations.weatherInput.condition)}
                    <span>{getWeatherLabel(recommendations.weatherInput.condition)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>{recommendations.weatherInput.temperature}°C</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>{recommendations.weatherInput.humidity}%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Baby className="w-4 h-4" />
                    <span>{getAgeLabel(recommendations.weatherInput.ageGroup)}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.recommendations.map((item) => (
                  <Card key={item.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">{item.category === 'tops' ? '👕' : item.category === 'bottoms' ? '👖' : item.category === 'shoes' ? '👟' : item.category === 'accessories' ? '🎒' : '🧥'}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {item.category === 'tops' ? 'トップス' : item.category === 'bottoms' ? 'ボトムス' : item.category === 'shoes' ? '靴' : item.category === 'accessories' ? '小物' : '防寒具'}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-sm mb-1">{item.item}</h3>
                          <p className="text-xs text-gray-600 mb-2">{item.description}</p>
                          <p className="text-xs text-blue-600 font-medium">{item.reason}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 遊び場提案セクション */}
        {playgroundRecommendations.length > 0 && (
          <section id="playgrounds" className="scroll-mt-16 mb-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">おすすめ遊び場</h2>
                <p className="text-gray-600">天気と年齢に適した遊び場を提案します</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {playgroundRecommendations.slice(0, 6).map((playground) => (
                  <Card key={playground.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl">
                          {playground.category === 'outdoor' ? '🏞️' : 
                           playground.category === 'indoor' ? '🏠' : 
                           playground.category === 'water' ? '🏊' : 
                           playground.category === 'educational' ? '🎓' : 
                           playground.category === 'adventure' ? '🏃' : '🏢'}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {playground.category === 'outdoor' ? '屋外' : 
                               playground.category === 'indoor' ? '屋内' : 
                               playground.category === 'water' ? '水遊び' : 
                               playground.category === 'educational' ? '教育' : 
                               playground.category === 'adventure' ? '冒険' : '屋根付'}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {playground.cost === 'free' ? '無料' : 
                               playground.cost === 'low' ? '低価格' : 
                               playground.cost === 'medium' ? '中価格' : '高価格'}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-sm mb-1">{playground.name}</h3>
                          <p className="text-xs text-gray-600 mb-2">{playground.description}</p>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-xs text-blue-600">⏱️ {playground.estimatedDuration}</span>
                            {playground.weatherScore && (
                              <span className="text-xs text-green-600">
                                ⭐ {playground.weatherScore}/10
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {playground.features.slice(0, 3).map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          {playground.googleMapsUrl && (
                            <a 
                              href={playground.googleMapsUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                            >
                              <MapPin className="w-3 h-3" />
                              <span>Google Mapsで見る</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Baby className="w-6 h-6 mr-2" />
              <span className="text-lg font-medium">おでよみ</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">天気に合わせた子供の服装と遊び場を提案するアプリ</p>
            <div className="flex justify-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a>
              <a href="#" className="hover:text-white transition-colors">利用規約</a>
              <a href="#" className="hover:text-white transition-colors">お問い合わせ</a>
            </div>
            <p className="text-xs text-gray-500 mt-4">© 2024 おでよみ. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 transition-colors z-50"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Home;