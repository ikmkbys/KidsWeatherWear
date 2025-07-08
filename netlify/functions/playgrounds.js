// 遊び場データベース - 拡張版
const playgroundDatabase = [
  // 屋外遊び場
  {
    id: "outdoor-park-1",
    name: "昭和記念公園",
    officialName: "国営昭和記念公園",
    category: "outdoor",
    description: "広大な芝生と大型遊具がある国営公園。季節の花々とピクニックエリアが充実。",
    weatherSuitability: { sunny: 10, cloudy: 8, rainy: 2, snowy: 4 },
    ageGroups: ["toddler", "preschool", "school"],
    features: ["大型遊具", "芝生広場", "季節の花", "サイクリング", "バーベキューガーデン", "レストラン"],
    safetyNotes: ["日焼け対策必須", "園内マップ確認", "迷子防止タグ着用推奨"],
    estimatedDuration: "3-6時間",
    cost: "low",
    googleMapsUrl: "https://maps.google.com/maps?q=国営昭和記念公園",
    coordinates: { lat: 35.7056, lng: 139.4084 }
  },
  {
    id: "outdoor-park-2",
    name: "代々木公園",
    officialName: "代々木公園",
    category: "outdoor",
    description: "都心の緑豊かな公園。広い芝生とサイクリングコースが人気。",
    weatherSuitability: { sunny: 9, cloudy: 8, rainy: 2, snowy: 4 },
    ageGroups: ["toddler", "preschool", "school"],
    features: ["サイクリング", "芝生広場", "噴水", "ドッグラン", "売店"],
    safetyNotes: ["自転車注意", "人混み注意", "迷子対策"],
    estimatedDuration: "2-4時間",
    cost: "free",
    googleMapsUrl: "https://maps.google.com/maps?q=代々木公園",
    coordinates: { lat: 35.6720, lng: 139.6943 }
  },
  {
    id: "outdoor-park-3",
    name: "井の頭恩賜公園",
    officialName: "井の頭恩賜公園",
    category: "outdoor",
    description: "池のボート遊びと桜で有名な公園。動物園も併設。",
    weatherSuitability: { sunny: 9, cloudy: 8, rainy: 3, snowy: 4 },
    ageGroups: ["toddler", "preschool", "school"],
    features: ["ボート", "動物園", "遊具", "桜並木", "カフェ"],
    safetyNotes: ["池に注意", "動物園入場料", "混雑時の迷子対策"],
    estimatedDuration: "3-5時間",
    cost: "low",
    googleMapsUrl: "https://maps.google.com/maps?q=井の頭恩賜公園",
    coordinates: { lat: 35.7009, lng: 139.5703 }
  },
  {
    id: "outdoor-park-4",
    name: "砧公園",
    officialName: "砧公園",
    category: "outdoor",
    description: "世田谷区の大型公園。サイクリングと芝生遊びが楽しめる。",
    weatherSuitability: { sunny: 9, cloudy: 8, rainy: 2, snowy: 4 },
    ageGroups: ["toddler", "preschool", "school"],
    features: ["広大芝生", "サイクリング", "アスレチック", "美術館隣接"],
    safetyNotes: ["自転車レンタル確認", "芝生での日焼け対策"],
    estimatedDuration: "2-4時間",
    cost: "free",
    googleMapsUrl: "https://maps.google.com/maps?q=砧公園",
    coordinates: { lat: 35.6283, lng: 139.6267 }
  },
  {
    id: "outdoor-park-5",
    name: "光が丘公園",
    officialName: "光が丘公園",
    category: "outdoor",
    description: "練馬区の大型公園。大型遊具とバーベキュー広場が充実。",
    weatherSuitability: { sunny: 9, cloudy: 8, rainy: 2, snowy: 4 },
    ageGroups: ["toddler", "preschool", "school"],
    features: ["大型複合遊具", "バーベキュー場", "芝生", "テニスコート"],
    safetyNotes: ["遊具の安全確認", "バーベキュー要予約"],
    estimatedDuration: "3-6時間",
    cost: "free",
    googleMapsUrl: "https://maps.google.com/maps?q=光が丘公園",
    coordinates: { lat: 35.7628, lng: 139.6264 }
  },

  // 屋内施設
  {
    id: "indoor-play-1",
    name: "すみだ水族館",
    officialName: "すみだ水族館",
    category: "indoor",
    description: "スカイツリータウンにある都市型水族館。ペンギンとクラゲが人気。",
    weatherSuitability: { sunny: 6, cloudy: 9, rainy: 10, snowy: 10 },
    ageGroups: ["toddler", "preschool", "school"],
    features: ["ペンギン", "クラゲ", "チンアナゴ", "ワークショップ", "カフェ"],
    safetyNotes: ["水槽に手を入れない", "混雑時の迷子注意", "フラッシュ撮影禁止"],
    estimatedDuration: "2-3時間",
    cost: "medium",
    googleMapsUrl: "https://maps.google.com/maps?q=すみだ水族館",
    coordinates: { lat: 35.7101, lng: 139.8107 }
  },
  {
    id: "indoor-play-2",
    name: "アネビートリムパーク",
    officialName: "アネビートリムパークお台場店",
    category: "indoor",
    description: "ヨーロッパの遊具を導入した大型屋内遊戯施設。",
    weatherSuitability: { sunny: 6, cloudy: 9, rainy: 10, snowy: 10 },
    ageGroups: ["toddler", "preschool", "school"],
    features: ["ヨーロッパ遊具", "トランポリン", "クライミング", "カフェ"],
    safetyNotes: ["靴下必須", "大人同伴", "時間制限確認"],
    estimatedDuration: "2-3時間",
    cost: "high",
    googleMapsUrl: "https://maps.google.com/maps?q=アネビートリムパークお台場",
    coordinates: { lat: 35.6256, lng: 139.7756 }
  },
  {
    id: "indoor-play-3",
    name: "キッザニア東京",
    officialName: "キッザニア東京",
    category: "educational",
    description: "子どもの職業体験テーマパーク。90種類以上の仕事体験。",
    weatherSuitability: { sunny: 7, cloudy: 9, rainy: 10, snowy: 10 },
    ageGroups: ["preschool", "school"],
    features: ["職業体験", "キッゾ通貨", "本格施設", "写真撮影"],
    safetyNotes: ["事前予約必須", "時間厳守", "迷子札着用"],
    estimatedDuration: "4-6時間",
    cost: "high",
    googleMapsUrl: "https://maps.google.com/maps?q=キッザニア東京",
    coordinates: { lat: 35.6447, lng: 139.7961 }
  },
  {
    id: "indoor-play-4",
    name: "東京おもちゃ美術館",
    officialName: "東京おもちゃ美術館",
    category: "educational",
    description: "木のおもちゃで遊べる体験型美術館。手作りワークショップも。",
    weatherSuitability: { sunny: 7, cloudy: 9, rainy: 10, snowy: 10 },
    ageGroups: ["toddler", "preschool", "school"],
    features: ["木製玩具", "ワークショップ", "おもちゃ学芸員", "赤ちゃん木育ひろば"],
    safetyNotes: ["靴下持参", "小さなパーツ注意", "混雑時入場制限"],
    estimatedDuration: "2-3時間",
    cost: "low",
    googleMapsUrl: "https://maps.google.com/maps?q=東京おもちゃ美術館",
    coordinates: { lat: 35.6942, lng: 139.7178 }
  },

  // 水遊び施設
  {
    id: "water-park-1",
    name: "お台場海浜公園",
    officialName: "お台場海浜公園",
    category: "water",
    description: "東京湾を望む人工砂浜。砂遊びと水遊びが楽しめるファミリー向けビーチ。",
    weatherSuitability: { sunny: 10, cloudy: 6, rainy: 1, snowy: 0 },
    ageGroups: ["toddler", "preschool", "school"],
    features: ["人工砂浜", "レインボーブリッジビュー", "売店", "トイレ", "駐車場"],
    safetyNotes: ["日焼け止め必須", "水分補給", "潮の満ち引き注意"],
    estimatedDuration: "3-5時間",
    cost: "free",
    googleMapsUrl: "https://maps.google.com/maps?q=お台場海浜公園",
    coordinates: { lat: 35.6267, lng: 139.7731 }
  },
  {
    id: "water-park-2",
    name: "大江戸温泉物語",
    officialName: "大江戸温泉物語お台場",
    category: "water",
    description: "江戸時代をテーマにした温泉テーマパーク。子ども向け縁日も。",
    weatherSuitability: { sunny: 7, cloudy: 8, rainy: 9, snowy: 10 },
    ageGroups: ["toddler", "preschool", "school"],
    features: ["温泉", "縁日", "足湯", "レストラン", "浴衣レンタル"],
    safetyNotes: ["お風呂マナー", "滑りやすい床注意", "水分補給"],
    estimatedDuration: "3-5時間",
    cost: "medium",
    googleMapsUrl: "https://maps.google.com/maps?q=大江戸温泉物語お台場",
    coordinates: { lat: 35.6167, lng: 139.7811 }
  },

  // 博物館・科学館
  {
    id: "educational-1",
    name: "国立科学博物館",
    officialName: "国立科学博物館",
    category: "educational",
    description: "恐竜の骨格標本や科学実験が楽しめる総合博物館。",
    weatherSuitability: { sunny: 7, cloudy: 9, rainy: 10, snowy: 10 },
    ageGroups: ["preschool", "school"],
    features: ["恐竜展示", "科学実験", "プラネタリウム", "シアター"],
    safetyNotes: ["館内走行禁止", "展示物に触れない", "迷子対策"],
    estimatedDuration: "3-5時間",
    cost: "low",
    googleMapsUrl: "https://maps.google.com/maps?q=国立科学博物館",
    coordinates: { lat: 35.7188, lng: 139.7756 }
  },
  {
    id: "educational-2",
    name: "日本科学未来館",
    officialName: "日本科学未来館",
    category: "educational",
    description: "最新テクノロジーと科学を体験できる未来型博物館。",
    weatherSuitability: { sunny: 7, cloudy: 9, rainy: 10, snowy: 10 },
    ageGroups: ["preschool", "school"],
    features: ["ロボット", "宇宙展示", "インタラクティブ", "プラネタリウム"],
    safetyNotes: ["体験コーナー安全確認", "混雑時入場制限", "予約推奨"],
    estimatedDuration: "3-4時間",
    cost: "medium",
    googleMapsUrl: "https://maps.google.com/maps?q=日本科学未来館",
    coordinates: { lat: 35.6197, lng: 139.7756 }
  },

  // 動物園
  {
    id: "educational-zoo-1",
    name: "上野動物園",
    officialName: "恩賜上野動物園",
    category: "educational",
    description: "日本最古の動物園。パンダで有名な都心の動物園。",
    weatherSuitability: { sunny: 8, cloudy: 8, rainy: 4, snowy: 5 },
    ageGroups: ["toddler", "preschool", "school"],
    features: ["パンダ", "モノレール", "子ども動物園", "両生爬虫類館"],
    safetyNotes: ["混雑対策", "パンダ観覧予約", "迷子対策"],
    estimatedDuration: "3-5時間",
    cost: "low",
    googleMapsUrl: "https://maps.google.com/maps?q=上野動物園",
    coordinates: { lat: 35.7158, lng: 139.7714 }
  },
  {
    id: "educational-zoo-2",
    name: "多摩動物公園",
    officialName: "多摩動物公園",
    category: "educational",
    description: "檻のない自然な環境で動物を観察できる動物園。",
    weatherSuitability: { sunny: 9, cloudy: 8, rainy: 4, snowy: 5 },
    ageGroups: ["toddler", "preschool", "school"],
    features: ["ライオンバス", "昆虫館", "コアラ館", "アフリカ園"],
    safetyNotes: ["坂道多数", "歩きやすい靴", "動物に餌をあげない"],
    estimatedDuration: "4-6時間",
    cost: "low",
    googleMapsUrl: "https://maps.google.com/maps?q=多摩動物公園",
    coordinates: { lat: 35.6639, lng: 139.4011 }
  },

  // ショッピングモール・屋根付き施設
  {
    id: "covered-mall-1",
    name: "ラウンドワン",
    officialName: "ラウンドワンお台場店",
    category: "covered",
    description: "ボウリング、カラオケ、ゲームが楽しめる総合アミューズメント。",
    weatherSuitability: { sunny: 6, cloudy: 8, rainy: 9, snowy: 9 },
    ageGroups: ["preschool", "school"],
    features: ["ボウリング", "カラオケ", "アーケードゲーム", "スポッチャ"],
    safetyNotes: ["靴の履き替え", "ゲーム時間管理", "料金確認"],
    estimatedDuration: "2-4時間",
    cost: "medium",
    googleMapsUrl: "https://maps.google.com/maps?q=ラウンドワンお台場",
    coordinates: { lat: 35.6267, lng: 139.7822 }
  },
  {
    id: "covered-mall-2",
    name: "ディバーシティ東京",
    officialName: "ディバーシティ東京プラザ",
    category: "covered",
    description: "ガンダムベース東京とフードコートがあるショッピングモール。",
    weatherSuitability: { sunny: 6, cloudy: 8, rainy: 9, snowy: 9 },
    ageGroups: ["toddler", "preschool", "school"],
    features: ["ガンダム立像", "ガンダムベース", "フードコート", "映画館"],
    safetyNotes: ["混雑時の迷子対策", "エスカレーター注意", "時間制駐車場"],
    estimatedDuration: "2-4時間",
    cost: "medium",
    googleMapsUrl: "https://maps.google.com/maps?q=ディバーシティ東京プラザ",
    coordinates: { lat: 35.6256, lng: 139.7756 }
  },
  {
    id: "covered-mall-3",
    name: "東京ドームシティ",
    officialName: "東京ドームシティアトラクションズ",
    category: "covered",
    description: "都心のアミューズメントパーク。屋内外の多彩なアトラクション。",
    weatherSuitability: { sunny: 8, cloudy: 8, rainy: 7, snowy: 8 },
    ageGroups: ["toddler", "preschool", "school"],
    features: ["観覧車", "ジェットコースター", "屋内遊園地", "スパ"],
    safetyNotes: ["身長制限確認", "アトラクション待ち時間", "チケット種類確認"],
    estimatedDuration: "4-8時間",
    cost: "high",
    googleMapsUrl: "https://maps.google.com/maps?q=東京ドームシティ",
    coordinates: { lat: 35.7056, lng: 139.7519 }
  }
];

// 遊び場推奨ロジック
function getPlaygroundRecommendations(weatherInput, userLocation, radius = 10) {
  const { condition, temperature, ageGroup } = weatherInput;
  
  // 天気スコアを計算
  const weatherScores = calculateWeatherScores(condition);
  
  // 年齢グループでフィルタリング
  let filteredPlaygrounds = playgroundDatabase.filter(playground => 
    playground.ageGroups.includes(ageGroup)
  );
  
  // 温度による特殊フィルタリング（20度以下では水遊び場を除外）
  if (temperature < 20) {
    filteredPlaygrounds = filteredPlaygrounds.filter(playground => 
      playground.category !== 'water' || playground.id === 'water-park-2' // 温泉は除外しない
    );
  }
  
  // 各遊び場に天気スコアを追加
  const playgroundsWithScores = filteredPlaygrounds.map(playground => {
    const weatherScore = playground.weatherSuitability[condition] || 5;
    const distance = calculateDistance(userLocation, playground.coordinates);
    
    return {
      ...playground,
      weatherScore,
      distance
    };
  });
  
  // 天気スコアと距離でソート
  playgroundsWithScores.sort((a, b) => {
    // 天気スコアを優先、次に距離
    if (b.weatherScore !== a.weatherScore) {
      return b.weatherScore - a.weatherScore;
    }
    return a.distance - b.distance;
  });
  
  // 上位結果を返す
  return playgroundsWithScores.slice(0, 10);
}

function calculateWeatherScores(condition) {
  const scores = {
    sunny: { outdoor: 10, indoor: 6, water: 10, educational: 7, adventure: 9, covered: 6 },
    cloudy: { outdoor: 8, indoor: 9, water: 7, educational: 9, adventure: 8, covered: 8 },
    rainy: { outdoor: 2, indoor: 10, water: 3, educational: 10, adventure: 1, covered: 9 },
    snowy: { outdoor: 4, indoor: 10, water: 1, educational: 10, adventure: 3, covered: 9 }
  };
  
  return scores[condition] || scores.sunny;
}

function calculateDistance(point1, point2) {
  const R = 6371; // 地球の半径（km）
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLon = (point2.lng - point1.lng) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { weatherInput, location, radius } = JSON.parse(event.body);
    
    if (!location || !location.lat || !location.lng) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Location data is required' })
      };
    }

    const recommendations = getPlaygroundRecommendations(weatherInput, location, radius);

    const response = {
      playgroundRecommendations: recommendations,
      location: location,
      weatherInput: weatherInput,
      generatedAt: new Date().toISOString()
    };

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      },
      body: JSON.stringify(response)
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};