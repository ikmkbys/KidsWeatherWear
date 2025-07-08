import { PlaygroundRecommendation, PlaygroundRequest, WeatherInput } from "@shared/schema";

export class PlaygroundService {
  // 天気と年齢に適した遊び場のデータベース（実際のアプリでは外部APIやDBから取得）
  private playgrounds: PlaygroundRecommendation[] = [
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
      id: "outdoor-adventure-1",
      name: "フォレストアドベンチャー",
      officialName: "フォレストアドベンチャー・立川",
      category: "adventure",
      description: "自然の中でアスレチックやジップラインが楽しめる冒険施設。",
      weatherSuitability: { sunny: 9, cloudy: 9, rainy: 1, snowy: 3 },
      ageGroups: ["preschool", "school"],
      features: ["ジップライン", "アスレチック", "ハーネス完備", "インストラクター常駐"],
      safetyNotes: ["運動靴必須", "身長制限確認", "安全装備着用"],
      estimatedDuration: "2-4時間",
      cost: "high",
      googleMapsUrl: "https://maps.google.com/maps?q=フォレストアドベンチャー立川",
      coordinates: { lat: 35.7272, lng: 139.4394 }
    },
    {
      id: "outdoor-beach-1",
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

    // 屋内遊び場
    {
      id: "indoor-play-1",
      name: "キドキド",
      officialName: "ボーネルンド キドキド よみうりランド店",
      category: "indoor",
      description: "ボーネルンドが運営する大型室内遊び場。知育玩具と運動遊具が充実。",
      weatherSuitability: { sunny: 5, cloudy: 7, rainy: 10, snowy: 10 },
      ageGroups: ["toddler", "preschool"],
      features: ["ボールプール", "エアトラック", "組み立て遊び", "プレイリーダー常駐", "カフェ"],
      safetyNotes: ["靴下着用必須", "保護者同伴", "年齢別エリア確認"],
      estimatedDuration: "2-4時間",
      cost: "medium",
      googleMapsUrl: "https://maps.google.com/maps?q=ボーネルンドキドキドよみうりランド店",
      coordinates: { lat: 35.6289, lng: 139.5420 }
    },
    {
      id: "indoor-library-1",
      name: "こども本の森 中之島",
      officialName: "こども本の森 中之島",
      category: "educational",
      description: "安藤忠雄氏設計の子ども専用図書館。絵本から科学書まで幅広い蔵書。",
      weatherSuitability: { sunny: 4, cloudy: 6, rainy: 9, snowy: 8 },
      ageGroups: ["preschool", "school"],
      features: ["絵本コーナー", "読み聞かせスペース", "屋上テラス", "企画展示"],
      safetyNotes: ["事前予約必要", "静かに過ごす", "本は大切に扱う"],
      estimatedDuration: "1-3時間",
      cost: "free",
      googleMapsUrl: "https://maps.google.com/maps?q=こども本の森中之島",
      coordinates: { lat: 34.6919, lng: 135.5060 }
    },
    {
      id: "indoor-aquarium-1",
      name: "すみだ水族館",
      officialName: "すみだ水族館",
      category: "educational",
      description: "東京スカイツリータウン内の都市型水族館。ペンギンやクラゲが人気。",
      weatherSuitability: { sunny: 6, cloudy: 8, rainy: 10, snowy: 9 },
      ageGroups: ["toddler", "preschool", "school"],
      features: ["ペンギンカフェ", "クラゲエリア", "チンアナゴ", "ワークショップ", "カフェ"],
      safetyNotes: ["水槽に手を入れない", "走らない", "混雑時は順番待ち"],
      estimatedDuration: "2-4時間",
      cost: "high",
      googleMapsUrl: "https://maps.google.com/maps?q=すみだ水族館",
      coordinates: { lat: 35.7100, lng: 139.8107 }
    },

    // 屋根付き遊び場
    {
      id: "covered-mall-1",
      name: "ららぽーと豊洲",
      officialName: "アーバンドック ららぽーと豊洲",
      category: "covered",
      description: "豊洲にある大型ショッピングモール。キッズエリアと多彩な店舗が充実。",
      weatherSuitability: { sunny: 6, cloudy: 8, rainy: 9, snowy: 9 },
      ageGroups: ["toddler", "preschool", "school"],
      features: ["キッズの森", "フードコート", "映画館", "ゲームセンター", "駐車場"],
      safetyNotes: ["迷子に注意", "エスカレーター注意", "混雑時は手を繋ぐ"],
      estimatedDuration: "3-6時間",
      cost: "low",
      googleMapsUrl: "https://maps.google.com/maps?q=ららぽーと豊洲",
      coordinates: { lat: 35.6551, lng: 139.7967 }
    },
    {
      id: "covered-station-1",
      name: "京葉ストリート",
      officialName: "東京駅一番街 キャラクターストリート",
      category: "covered",
      description: "東京駅地下の キャラクターショップ街。電車も見えて子供に大人気。",
      weatherSuitability: { sunny: 5, cloudy: 7, rainy: 8, snowy: 8 },
      ageGroups: ["toddler", "preschool"],
      features: ["キャラクターショップ", "電車ビュー", "レストラン", "駅直結"],
      safetyNotes: ["人混み注意", "迷子に注意", "手を繋いで歩く"],
      estimatedDuration: "1-3時間",
      cost: "free",
      googleMapsUrl: "https://maps.google.com/maps?q=東京駅一番街キャラクターストリート",
      coordinates: { lat: 35.6814, lng: 139.7671 }
    },

    // 特殊な遊び場
    {
      id: "winter-skiing-1",
      name: "軽井沢プリンスホテルスキー場",
      officialName: "軽井沢プリンスホテルスキー場",
      category: "adventure",
      description: "関東からアクセス良好なファミリー向けスキー場。人工雪で安定した雪質。",
      weatherSuitability: { sunny: 7, cloudy: 8, rainy: 0, snowy: 10 },
      ageGroups: ["preschool", "school"],
      features: ["キッズパーク", "スキーレンタル", "スキー教室", "レストラン", "ホテル"],
      safetyNotes: ["ヘルメット着用推奨", "子供用ハーネス利用", "防寒対策必須"],
      estimatedDuration: "4-8時間",
      cost: "high",
      googleMapsUrl: "https://maps.google.com/maps?q=軽井沢プリンスホテルスキー場",
      coordinates: { lat: 36.3497, lng: 138.5779 }
    },
    {
      id: "rainy-craft-1",
      name: "東京おもちゃ美術館",
      officialName: "東京おもちゃ美術館",
      category: "educational",
      description: "木のおもちゃと手作り体験が楽しめる美術館。雨の日でも一日中楽しめる。",
      weatherSuitability: { sunny: 3, cloudy: 5, rainy: 10, snowy: 7 },
      ageGroups: ["toddler", "preschool", "school"],
      features: ["木のおもちゃ", "手作り体験", "からくり展示", "おもちゃ工房", "ミュージアムショップ"],
      safetyNotes: ["靴下着用必須", "大人同伴", "小さな部品注意"],
      estimatedDuration: "2-4時間",
      cost: "low",
      googleMapsUrl: "https://maps.google.com/maps?q=東京おもちゃ美術館",
      coordinates: { lat: 35.6937, lng: 139.7064 }
    },
    // さらなる屋外遊び場
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

    // 屋内施設の拡充
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

    // 水遊び施設の拡充
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
    {
      id: "water-park-3",
      name: "としまえん",
      officialName: "としまえんプール",
      category: "water",
      description: "多彩なプールと絶叫マシンが楽しめる総合遊園地。",
      weatherSuitability: { sunny: 10, cloudy: 7, rainy: 1, snowy: 0 },
      ageGroups: ["preschool", "school"],
      features: ["波のプール", "流れるプール", "スライダー", "幼児プール"],
      safetyNotes: ["水着必須", "浮き輪レンタル", "日焼け対策"],
      estimatedDuration: "4-8時間",
      cost: "high",
      googleMapsUrl: "https://maps.google.com/maps?q=としまえんプール",
      coordinates: { lat: 35.7389, lng: 139.6539 }
    },

    // 博物館・科学館の拡充
    {
      id: "educational-2",
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
      id: "educational-3",
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

    // ショッピングモール内遊戯施設
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

    // 動物園・水族館の拡充
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
    {
      id: "educational-zoo-3",
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

    // 季節限定・特殊施設
    {
      id: "seasonal-winter-1",
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
    },
    {
      id: "seasonal-winter-2",
      name: "スケートリンク",
      officialName: "アクアリンクちくば",
      category: "covered",
      description: "屋内スケートリンク。初心者レッスンも充実。",
      weatherSuitability: { sunny: 5, cloudy: 7, rainy: 9, snowy: 10 },
      ageGroups: ["preschool", "school"],
      features: ["スケート教室", "レンタルシューズ", "カフェ", "観覧席"],
      safetyNotes: ["防寒対策", "手袋必須", "転倒注意"],
      estimatedDuration: "2-3時間",
      cost: "medium",
      googleMapsUrl: "https://maps.google.com/maps?q=アクアリンクちくば",
      coordinates: { lat: 36.0833, lng: 140.0833 }
    }
  ];

  async getPlaygroundRecommendations(request: PlaygroundRequest): Promise<PlaygroundRecommendation[]> {
    const { weatherInput, location, radius } = request;
    
    // 天気条件に基づいてフィルタリングと評価
    const weatherScores = this.calculateWeatherScores(weatherInput.condition);
    
    // 年齢グループに適した遊び場をフィルタリング
    const ageAppropriate = this.playgrounds.filter(playground => 
      playground.ageGroups.includes(weatherInput.ageGroup)
    );
    
    // 天気適性スコアでソート
    const scored = ageAppropriate.map(playground => ({
      ...playground,
      weatherScore: playground.weatherSuitability[weatherInput.condition],
      distance: this.calculateDistance(location, playground)
    }));
    
    // 天気スコアとアクセスしやすさでソート
    const sorted = scored.sort((a, b) => {
      // 天気適性を最優先、次に距離
      const weatherDiff = b.weatherScore - a.weatherScore;
      if (Math.abs(weatherDiff) > 2) return weatherDiff;
      return (a.distance || 0) - (b.distance || 0);
    });
    
    // 温度に基づく追加フィルタリング
    const temperatureFiltered = this.filterByTemperature(sorted, weatherInput.temperature);
    
    // 上位5-7件を返す
    return temperatureFiltered.slice(0, 7);
  }

  private calculateWeatherScores(condition: string): { [key: string]: number } {
    // 天気条件に基づく基本スコア
    const baseScores = {
      sunny: { outdoor: 10, covered: 5, indoor: 3, water: 10, educational: 6, adventure: 9 },
      cloudy: { outdoor: 8, covered: 8, indoor: 6, water: 6, educational: 8, adventure: 8 },
      rainy: { outdoor: 2, covered: 9, indoor: 10, water: 1, educational: 10, adventure: 3 },
      snowy: { outdoor: 4, covered: 8, indoor: 9, water: 0, educational: 7, adventure: 8 }
    };
    
    return baseScores[condition] || baseScores.cloudy;
  }

  private calculateDistance(userLocation: { lat: number; lng: number }, playground: PlaygroundRecommendation): number {
    // 実際のアプリでは正確な距離計算やマップAPIを使用
    // ここでは簡単な疑似距離を計算
    if (!playground.coordinates) {
      return Math.random() * 10; // 0-10km のランダム距離
    }
    
    // 簡易的な距離計算（実際にはより正確な計算が必要）
    const latDiff = Math.abs(userLocation.lat - playground.coordinates.lat);
    const lngDiff = Math.abs(userLocation.lng - playground.coordinates.lng);
    return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111; // 概算でkm換算
  }

  private filterByTemperature(playgrounds: PlaygroundRecommendation[], temperature: number): PlaygroundRecommendation[] {
    return playgrounds.filter(playground => {
      // 極端な温度条件での安全性フィルタ
      if (temperature > 35) {
        // 猛暑時は屋外活動を制限
        return playground.category !== "outdoor" && playground.category !== "adventure";
      }
      
      if (temperature < 20) {
        // 20度未満では水遊び場（ビーチ、プール等）を除外
        return playground.category !== "water";
      }
      
      if (temperature < 5) {
        // 5度未満では屋外活動を大幅に制限
        return playground.category === "indoor" || playground.category === "covered" || playground.category === "educational";
      }
      
      if (temperature < -5) {
        // 極寒時は屋内施設のみ
        return playground.category === "indoor" || playground.category === "covered";
      }
      
      return true;
    });
  }

  // 位置情報に基づく詳細な遊び場データを取得（将来の拡張用）
  async getDetailedPlaygroundInfo(playgroundId: string, userLocation: { lat: number; lng: number }): Promise<PlaygroundRecommendation | null> {
    const playground = this.playgrounds.find(p => p.id === playgroundId);
    if (!playground) return null;
    
    return {
      ...playground,
      distance: this.calculateDistance(userLocation, playground)
    };
  }
}

export const playgroundService = new PlaygroundService();