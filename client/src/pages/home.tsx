import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Snowflake, 
  Baby,
  Users,
  GraduationCap,
  Shirt,
  Footprints,
  Shield,
  Package,
  Lightbulb,
  Bookmark,
  Share2,
  RotateCcw,
  Droplets,
  Thermometer,
  MapPin,
  Loader2,
  ChevronDown,
  ArrowUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

type WeatherCondition = "sunny" | "cloudy" | "rainy" | "snowy";
type AgeGroup = "toddler" | "preschool" | "school";

interface WeatherInput {
  temperature: number;
  humidity: number;
  condition: WeatherCondition;
  ageGroup: AgeGroup;
}

interface ClothingRecommendation {
  id: number;
  category: string;
  item: string;
  description: string;
  reason: string;
}

interface RecommendationResponse {
  weatherInput: WeatherInput;
  recommendations: ClothingRecommendation[];
  generatedAt: string;
}

interface PlaygroundRecommendation {
  id: string;
  name: string;
  category: "indoor" | "outdoor" | "covered" | "water" | "educational" | "adventure";
  description: string;
  weatherSuitability: {
    sunny: number;
    cloudy: number;
    rainy: number;
    snowy: number;
  };
  ageGroups: AgeGroup[];
  features: string[];
  safetyNotes: string[];
  distance?: number;
  estimatedDuration: string;
  cost: "free" | "low" | "medium" | "high";
  weatherScore?: number;
}

interface PlaygroundResponse {
  playgroundRecommendations: PlaygroundRecommendation[];
  location: { lat: number; lng: number };
  weatherInput: WeatherInput;
  generatedAt: string;
}

export default function Home() {
  const [weatherInput, setWeatherInput] = useState<WeatherInput>({
    temperature: 22,
    humidity: 65,
    condition: "sunny",
    ageGroup: "toddler"
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [showPlaygrounds, setShowPlaygrounds] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { toast } = useToast();

  // スクロール監視
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // スムーススクロール関数
  const scrollToSection = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mutation for getting current weather
  const getCurrentWeatherMutation = useMutation({
    mutationFn: async (coords: { latitude: number; longitude: number }) => {
      const response = await apiRequest("POST", "/api/current-weather", coords);
      return response.json();
    },
    onSuccess: (data) => {
      setWeatherInput(prev => ({
        ...prev,
        temperature: data.temperature,
        humidity: data.humidity,
        condition: data.condition
      }));
      toast({
        title: "現在の天気情報を取得しました",
        description: `気温: ${data.temperature}°C, 湿度: ${data.humidity}%`,
      });
    },
    onError: (error) => {
      toast({
        title: "天気情報の取得に失敗しました",
        description: "手動で天気情報を入力してください。",
        variant: "destructive"
      });
    },
    onSettled: () => {
      setIsLoadingLocation(false);
    }
  });

  // Mutation for getting playground recommendations
  const getPlaygroundsMutation = useMutation({
    mutationFn: async (request: { weatherInput: WeatherInput; location: { lat: number; lng: number }; radius?: number }) => {
      const response = await apiRequest("POST", "/api/playgrounds", request);
      return response.json() as Promise<PlaygroundResponse>;
    },
    onSuccess: (data) => {
      toast({
        title: "遊び場を見つけました",
        description: `${data.playgroundRecommendations.length}個の遊び場を提案しています`
      });
    },
    onError: (error) => {
      console.error("遊び場データの取得に失敗:", error);
      toast({
        title: "エラー",
        description: "遊び場情報の取得に失敗しました",
        variant: "destructive"
      });
    }
  });

  const { data: recommendations, isLoading, error } = useQuery<RecommendationResponse>({
    queryKey: ["/api/recommendations", weatherInput],
    queryFn: async () => {
      const response = await apiRequest("POST", "/api/recommendations", weatherInput);
      return response.json();
    },
    enabled: hasSubmitted,
  });

  const handleSubmit = () => {
    setHasSubmitted(true);
    
    // 位置情報がある場合は遊び場も一緒に取得
    if (userLocation) {
      getPlaygroundRecommendations();
    }
  };

  const handleReset = () => {
    setWeatherInput({
      temperature: 22,
      humidity: 65,
      condition: "sunny",
      ageGroup: "toddler"
    });
    setHasSubmitted(false);
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "位置情報がサポートされていません",
        description: "ブラウザが位置情報をサポートしていません。",
        variant: "destructive"
      });
      return;
    }

    setIsLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLoadingLocation(false);
        setUserLocation({ 
          lat: position.coords.latitude, 
          lng: position.coords.longitude 
        });
        getCurrentWeatherMutation.mutate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        setIsLoadingLocation(false);
        let message = "位置情報の取得に失敗しました。";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "位置情報へのアクセスが拒否されました。ブラウザの設定を確認してください。";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "位置情報が利用できません。";
            break;
          case error.TIMEOUT:
            message = "位置情報の取得がタイムアウトしました。";
            break;
        }
        
        toast({
          title: "位置情報エラー",
          description: message,
          variant: "destructive"
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const getPlaygroundRecommendations = () => {
    if (!userLocation) {
      toast({
        title: "位置情報が必要です",
        description: "まず現在地の天気を取得してから遊び場を検索してください。",
        variant: "destructive"
      });
      return;
    }

    getPlaygroundsMutation.mutate({
      weatherInput,
      location: userLocation,
      radius: 10
    });
    setShowPlaygrounds(true);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "indoor": return "🏠";
      case "outdoor": return "🌳";
      case "covered": return "🏪";
      case "water": return "🏊";
      case "educational": return "📚";
      case "adventure": return "🧗";
      default: return "🎮";
    }
  };

  const getCostIcon = (cost: string) => {
    switch (cost) {
      case "free": return "🆓";
      case "low": return "💰";
      case "medium": return "💰💰";
      case "high": return "💰💰💰";
      default: return "💰";
    }
  };

  const handleSave = () => {
    toast({
      title: "お気に入りに保存しました",
      description: "推奨服装が保存されました。",
    });
  };

  const handleShare = () => {
    toast({
      title: "シェア機能",
      description: "推奨服装をシェアしました。",
    });
  };

  const getWeatherIcon = (condition: WeatherCondition) => {
    switch (condition) {
      case "sunny": return <Sun className="w-6 h-6 text-yellow-500" />;
      case "cloudy": return <Cloud className="w-6 h-6 text-gray-500" />;
      case "rainy": return <CloudRain className="w-6 h-6 text-blue-500" />;
      case "snowy": return <Snowflake className="w-6 h-6 text-blue-300" />;
    }
  };

  const getAgeIcon = (ageGroup: AgeGroup) => {
    switch (ageGroup) {
      case "toddler": return <Baby className="w-5 h-5" />;
      case "preschool": return <Users className="w-5 h-5" />;
      case "school": return <GraduationCap className="w-5 h-5" />;
    }
  };

  const getClothingCategoryIcon = (category: string) => {
    switch (category) {
      case "tops": return <Shirt className="w-5 h-5" />;
      case "bottoms": return <Shirt className="w-5 h-5 rotate-180" />;
      case "shoes": return <Footprints className="w-5 h-5" />;
      case "protection": return <Shield className="w-5 h-5" />;
      case "accessories": return <Package className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const getItemIcon = (item: string) => {
    // Simple icon mapping based on item name keywords
    if (item.includes("Tシャツ") || item.includes("シャツ") || item.includes("ポロシャツ")) return "👕";
    if (item.includes("パンツ") || item.includes("ズボン") || item.includes("レギンス")) return "👖";
    if (item.includes("スニーカー") || item.includes("靴") || item.includes("サンダル")) return "👟";
    if (item.includes("ブーツ") || item.includes("長靴")) return "🥾";
    if (item.includes("帽子") || item.includes("キャップ") || item.includes("ハット")) return "🧢";
    if (item.includes("手袋") || item.includes("ミトン")) return "🧤";
    if (item.includes("マフラー") || item.includes("ネックウォーマー")) return "🧣";
    if (item.includes("傘")) return "☂️";
    if (item.includes("水筒")) return "🍼";
    if (item.includes("タオル")) return "🤍";
    if (item.includes("バッグ") || item.includes("ポシェット")) return "🎒";
    if (item.includes("カーディガン") || item.includes("ジャケット") || item.includes("パーカー")) return "🧥";
    if (item.includes("セーター") || item.includes("トレーナー") || item.includes("フリース")) return "🧶";
    if (item.includes("レインコート") || item.includes("防水")) return "🧥";
    if (item.includes("日焼け止め")) return "🧴";
    if (item.includes("リストバンド") || item.includes("ウォッチ") || item.includes("時計")) return "⌚";
    if (item.includes("ぬいぐるみ")) return "🧸";
    if (item.includes("クリップ")) return "📎";
    return "👶"; // Default for children's items
  };

  const getWeatherLabel = (condition: WeatherCondition) => {
    switch (condition) {
      case "sunny": return "晴れ";
      case "cloudy": return "曇り";
      case "rainy": return "雨";
      case "snowy": return "雪";
    }
  };

  const getAgeLabel = (ageGroup: AgeGroup) => {
    switch (ageGroup) {
      case "toddler": return "幼児 (2-4歳)";
      case "preschool": return "未就学児 (4-6歳)";
      case "school": return "学童 (6-12歳)";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                天気入力
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection('recommendations')}
                className="text-xs"
                disabled={!hasSubmitted}
              >
                服装提案
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection('playgrounds')}
                className="text-xs"
                disabled={!userLocation}
              >
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

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Weather Input */}
        <Card id="weather-input" className="mb-6 scroll-mt-20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-xl">
              <div className="flex items-center">
                <Sun className="w-5 h-5 mr-2 text-primary" />
                天気情報入力
              </div>
              <Button
                onClick={getCurrentLocation}
                disabled={isLoadingLocation || getCurrentWeatherMutation.isPending}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                {isLoadingLocation || getCurrentWeatherMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <MapPin className="w-4 h-4" />
                )}
                {isLoadingLocation || getCurrentWeatherMutation.isPending 
                  ? "取得中..." 
                  : "現在地の天気"
                }
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="temperature">気温 (°C)</Label>
                <div className="relative">
                  <Input
                    id="temperature"
                    type="number"
                    value={weatherInput.temperature}
                    onChange={(e) => setWeatherInput(prev => ({ ...prev, temperature: Number(e.target.value) }))}
                    className="pr-8"
                    placeholder="例: 22"
                  />
                  <Thermometer className="absolute right-3 top-3 w-4 h-4 text-gray-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="humidity">湿度 (%)</Label>
                <div className="relative">
                  <Input
                    id="humidity"
                    type="number"
                    value={weatherInput.humidity}
                    onChange={(e) => setWeatherInput(prev => ({ ...prev, humidity: Number(e.target.value) }))}
                    className="pr-8"
                    placeholder="例: 65"
                  />
                  <Droplets className="absolute right-3 top-3 w-4 h-4 text-gray-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="condition">天気</Label>
                <Select 
                  value={weatherInput.condition} 
                  onValueChange={(value: WeatherCondition) => setWeatherInput(prev => ({ ...prev, condition: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="天気を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sunny">晴れ</SelectItem>
                    <SelectItem value="cloudy">曇り</SelectItem>
                    <SelectItem value="rainy">雨</SelectItem>
                    <SelectItem value="snowy">雪</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Age Selector */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Users className="w-5 h-5 mr-2 text-secondary" />
              年齢グループ選択
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {(["toddler", "preschool", "school"] as AgeGroup[]).map((age) => (
                <Button
                  key={age}
                  variant={weatherInput.ageGroup === age ? "default" : "outline"}
                  onClick={() => setWeatherInput(prev => ({ ...prev, ageGroup: age }))}
                  className="flex items-center gap-2"
                >
                  {getAgeIcon(age)}
                  {getAgeLabel(age)}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mb-6 text-center space-y-4">
          <div className="flex justify-center space-x-4">
            <Button
              onClick={getCurrentLocation}
              disabled={isLoadingLocation}
              variant="outline"
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              {isLoadingLocation ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              ) : (
                <MapPin className="w-4 h-4 mr-2" />
              )}
              現在地の天気
            </Button>
            <Button 
              onClick={handleSubmit} 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
              disabled={isLoading || getPlaygroundsMutation.isPending}
            >
              {isLoading || getPlaygroundsMutation.isPending ? "推奨中..." : userLocation ? "服装・遊び場を提案する" : "服装を提案する"}
            </Button>
          </div>

        </div>

        {/* Recommendations */}
        <div id="recommendations" className="scroll-mt-20">
        {hasSubmitted && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Shirt className="w-5 h-5 mr-2 text-secondary" />
                おすすめ服装
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-2 text-gray-600">推奨を作成中...</p>
                </div>
              )}

              {error && (
                <div className="text-center py-8 text-red-600">
                  <p>エラーが発生しました。もう一度お試しください。</p>
                </div>
              )}

              {recommendations && (
                <>
                  {/* Weather Summary */}
                  <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-primary">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getWeatherIcon(recommendations.weatherInput.condition)}
                        <div className="ml-3">
                          <h3 className="font-medium text-gray-800">
                            今日の天気: {getWeatherLabel(recommendations.weatherInput.condition)}
                          </h3>
                          <p className="text-sm text-gray-600">
                            気温 {recommendations.weatherInput.temperature}°C / 湿度 {recommendations.weatherInput.humidity}%
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500">対象:</span>
                        <Badge variant="secondary" className="ml-2">
                          {getAgeLabel(recommendations.weatherInput.ageGroup)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Clothing Recommendations */}
                  {recommendations.recommendations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      {recommendations.recommendations.map((rec) => (
                        <Card key={rec.id} className="border hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-center mb-3">
                              {getClothingCategoryIcon(rec.category)}
                              <h4 className="font-medium text-gray-800 ml-3 capitalize">
                                {rec.category === "tops" ? "トップス" :
                                 rec.category === "bottoms" ? "ボトムス" :
                                 rec.category === "shoes" ? "靴・靴下" :
                                 rec.category === "protection" ? "保護用品" :
                                 rec.category === "accessories" ? "アクセサリー" : rec.category}
                              </h4>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                {rec.category !== "accessories" && (
                                  <span className="text-2xl">{getItemIcon(rec.item)}</span>
                                )}
                                <p className="text-gray-700 font-medium flex-1">{rec.item}</p>
                              </div>
                              <p className="text-sm text-gray-600">{rec.description}</p>
                              <div className="flex items-start text-xs text-gray-500">
                                <Lightbulb className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" />
                                <span>{rec.reason}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-600">
                      <p>この条件では推奨服装が見つかりませんでした。</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button onClick={handleSave} className="flex-1 bg-primary hover:bg-primary/90">
                      <Bookmark className="w-4 h-4 mr-2" />
                      お気に入りに保存
                    </Button>
                    <Button onClick={handleShare} className="flex-1 bg-secondary hover:bg-secondary/90">
                      <Share2 className="w-4 h-4 mr-2" />
                      シェアする
                    </Button>
                    <Button onClick={handleReset} variant="outline" className="flex-1">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      新しく提案
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}
        </div>

        {/* Playground Recommendations */}
        <div id="playgrounds" className="scroll-mt-20">
        {showPlaygrounds && getPlaygroundsMutation.data && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <MapPin className="w-5 h-5 mr-2 text-secondary" />
                天気に合うおすすめの遊び場
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getPlaygroundsMutation.data.playgroundRecommendations.map((playground) => (
                  <Card key={playground.id} className="border hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{getCategoryIcon(playground.category)}</span>
                          <div>
                            <h4 className="font-medium text-gray-800">{playground.name}</h4>
                            <p className="text-xs text-gray-500">{playground.officialName}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{getCostIcon(playground.cost)}</span>
                          {playground.distance && (
                            <span className="text-xs text-gray-500">{playground.distance.toFixed(1)}km</span>
                          )}
                          {playground.googleMapsUrl && (
                            <a 
                              href={playground.googleMapsUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-xs"
                            >
                              📍 地図
                            </a>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{playground.description}</p>
                      
                      <div className="mb-3">
                        <h5 className="text-xs font-medium text-gray-700 mb-1">特徴:</h5>
                        <div className="flex flex-wrap gap-1">
                          {playground.features.slice(0, 3).map((feature, idx) => (
                            <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <h5 className="text-xs font-medium text-gray-700 mb-1">安全注意:</h5>
                        <p className="text-xs text-gray-600">{playground.safetyNotes[0]}</p>
                      </div>
                      
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>滞在時間: {playground.estimatedDuration}</span>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                          天気適性: {playground.weatherScore}/10
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-4">
                <Button 
                  onClick={() => setShowPlaygrounds(false)}
                  variant="outline"
                  size="sm"
                >
                  遊び場を閉じる
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        </div>

        {/* Quick Tips */}
        <Card className="mt-6 bg-gradient-to-r from-orange-50 to-yellow-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-secondary" />
              季節のワンポイントアドバイス
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <Sun className="w-5 h-5 text-yellow-500 mr-3 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-800">春・夏の注意点</h4>
                  <p className="text-sm text-gray-600">紫外線対策と熱中症予防を忘れずに。薄着でも肌の露出は控えめに。</p>
                </div>
              </div>
              <div className="flex items-start">
                <Snowflake className="w-5 h-5 text-blue-500 mr-3 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-800">秋・冬の注意点</h4>
                  <p className="text-sm text-gray-600">重ね着で温度調節を。手洗い後の手荒れ対策も大切です。</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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

      {/* トップに戻るボタン */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary/90 text-white rounded-full p-3 shadow-lg"
          size="sm"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}
    </div>
  );
}
