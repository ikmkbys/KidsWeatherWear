import { 
  weatherConditions, 
  clothingRecommendations,
  type WeatherCondition, 
  type InsertWeatherCondition,
  type ClothingRecommendation,
  type InsertClothingRecommendation,
  type WeatherInput
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getWeatherCondition(id: number): Promise<WeatherCondition | undefined>;
  createWeatherCondition(condition: InsertWeatherCondition): Promise<WeatherCondition>;
  getClothingRecommendations(weatherConditionId: number): Promise<ClothingRecommendation[]>;
  createClothingRecommendation(recommendation: InsertClothingRecommendation): Promise<ClothingRecommendation>;
  getRecommendationsByWeather(weatherInput: WeatherInput): Promise<ClothingRecommendation[]>;
}

export class MemStorage implements IStorage {
  private weatherConditions: Map<number, WeatherCondition>;
  private clothingRecommendations: Map<number, ClothingRecommendation>;
  private currentWeatherId: number;
  private currentRecommendationId: number;

  constructor() {
    this.weatherConditions = new Map();
    this.clothingRecommendations = new Map();
    this.currentWeatherId = 1;
    this.currentRecommendationId = 1;
    this.initializeMockData();
  }

  private initializeMockData() {
    // Initialize with comprehensive clothing recommendations for different weather conditions
    const recommendations = this.generateClothingRecommendations();
    recommendations.forEach(rec => {
      this.clothingRecommendations.set(this.currentRecommendationId++, rec);
    });
  }

  private generateClothingRecommendations(): ClothingRecommendation[] {
    const recommendations: ClothingRecommendation[] = [];
    let id = 1;

    // Sunny weather recommendations
    const sunnyRecommendations = [
      { category: "tops", item: "半袖Tシャツ", description: "薄手の綿素材がおすすめ。汗をかいても快適に過ごせます。", reason: "気温が高く、通気性が重要" },
      { category: "bottoms", item: "薄手のズボン", description: "動きやすい伸縮性のある素材。膝が隠れる長さで日焼け対策も。", reason: "動きやすさと日焼け防止" },
      { category: "shoes", item: "通気性の良いスニーカー", description: "薄手の靴下と合わせて。足が蒸れにくい素材を選びましょう。", reason: "足の快適性を保つため" },
      { category: "protection", item: "帽子・日焼け止め", description: "つばの広い帽子と日焼け止めクリームで紫外線対策をしっかりと。", reason: "紫外線から肌を守るため" },
      { category: "accessories", item: "水筒", description: "こまめな水分補給を心がけましょう。", reason: "熱中症予防のため" }
    ];

    // Cloudy weather recommendations
    const cloudyRecommendations = [
      { category: "tops", item: "長袖シャツ", description: "薄手の長袖で肌の保護を。脱ぎ着しやすいカーディガンも併用。", reason: "肌の保護と温度調節" },
      { category: "bottoms", item: "長ズボン", description: "綿素材の動きやすいズボン。", reason: "適度な保温と動きやすさ" },
      { category: "shoes", item: "運動靴", description: "歩きやすく、滑りにくい靴を選びましょう。", reason: "安全性と快適性" },
      { category: "accessories", item: "薄手のジャケット", description: "気温変化に備えて持参。", reason: "急な気温変化への対応" }
    ];

    // Rainy weather recommendations
    const rainyRecommendations = [
      { category: "tops", item: "防水ジャケット", description: "雨に濡れても大丈夫な素材。フードつきがおすすめ。", reason: "雨からの保護" },
      { category: "bottoms", item: "防水ズボン", description: "雨に濡れても快適に過ごせる素材。", reason: "雨からの保護" },
      { category: "shoes", item: "レインブーツ", description: "滑りにくい靴底で安全性を確保。", reason: "雨の日の安全性" },
      { category: "accessories", item: "傘", description: "子供用の軽量で持ちやすい傘。", reason: "雨からの保護" },
      { category: "protection", item: "着替え", description: "濡れた場合に備えて着替えを準備。", reason: "快適性の維持" }
    ];

    // Snowy weather recommendations
    const snowyRecommendations = [
      { category: "tops", item: "厚手のセーター", description: "保温性の高いウール素材。重ね着で調節。", reason: "寒さからの保護" },
      { category: "bottoms", item: "厚手のズボン", description: "裏起毛素材で暖かく。", reason: "下半身の保温" },
      { category: "shoes", item: "防水ブーツ", description: "滑り止めつきで安全性を確保。", reason: "雪道での安全性" },
      { category: "accessories", item: "手袋・マフラー", description: "末端の冷え対策に必須。", reason: "体温の保持" },
      { category: "protection", item: "帽子", description: "耳まで覆える暖かい帽子。", reason: "頭部の保温" }
    ];

    // Add recommendations for each weather condition and age group
    const weatherTypes = [
      { condition: "sunny", recs: sunnyRecommendations },
      { condition: "cloudy", recs: cloudyRecommendations },
      { condition: "rainy", recs: rainyRecommendations },
      { condition: "snowy", recs: snowyRecommendations }
    ];

    const ageGroups = ["toddler", "preschool", "school"];

    weatherTypes.forEach(({ condition, recs }) => {
      ageGroups.forEach(ageGroup => {
        recs.forEach(rec => {
          recommendations.push({
            id: id++,
            weatherConditionId: null,
            category: rec.category,
            item: rec.item,
            description: rec.description,
            reason: rec.reason
          });
        });
      });
    });

    return recommendations;
  }

  async getWeatherCondition(id: number): Promise<WeatherCondition | undefined> {
    return this.weatherConditions.get(id);
  }

  async createWeatherCondition(condition: InsertWeatherCondition): Promise<WeatherCondition> {
    const id = this.currentWeatherId++;
    const weatherCondition: WeatherCondition = { ...condition, id };
    this.weatherConditions.set(id, weatherCondition);
    return weatherCondition;
  }

  async getClothingRecommendations(weatherConditionId: number): Promise<ClothingRecommendation[]> {
    return Array.from(this.clothingRecommendations.values()).filter(
      rec => rec.weatherConditionId === weatherConditionId
    );
  }

  async createClothingRecommendation(recommendation: InsertClothingRecommendation): Promise<ClothingRecommendation> {
    const id = this.currentRecommendationId++;
    const clothingRecommendation: ClothingRecommendation = { 
      id,
      weatherConditionId: recommendation.weatherConditionId || null,
      category: recommendation.category,
      item: recommendation.item,
      description: recommendation.description,
      reason: recommendation.reason
    };
    this.clothingRecommendations.set(id, clothingRecommendation);
    return clothingRecommendation;
  }

  async getRecommendationsByWeather(weatherInput: WeatherInput): Promise<ClothingRecommendation[]> {
    // Get age-specific recommendations for weather condition
    const recommendations = this.getRecommendationsByWeatherAndAge(weatherInput.condition, weatherInput.ageGroup);
    
    // Apply temperature and humidity adjustments
    const finalRecommendations = this.applyWeatherAdjustments(recommendations, weatherInput);
    
    return finalRecommendations;
  }

  private getRecommendationsByWeatherAndAge(condition: string, ageGroup: string): ClothingRecommendation[] {
    const recommendations: ClothingRecommendation[] = [];
    let id = 1;

    // Age-specific recommendations for each weather condition
    const weatherAgeMap: { [key: string]: { [key: string]: any[] } } = {
      sunny: {
        toddler: [
          { category: "tops", item: "UVカット半袖Tシャツ", description: "汗をかいても快適な薄手の綿素材。UVカット機能付きで肌を守ります。", reason: "幼児の敏感な肌を紫外線から保護" },
          { category: "bottoms", item: "薄手のハーフパンツ", description: "伸縮性があり動きやすく、オムツ替えも簡単。膝が見える長さで涼しく。", reason: "活発な動きとオムツ替えのしやすさ" },
          { category: "shoes", item: "サンダル（マジックテープ式）", description: "マジックテープで脱ぎ着しやすく、通気性抜群。滑り止め付き。", reason: "自分で履けて安全性も確保" },
          { category: "protection", item: "つば広帽子", description: "あご紐付きで風で飛ばされず、首の後ろまでカバー。日焼け止めも忘れずに。", reason: "帽子の紛失防止と広範囲の日焼け対策" },
          { category: "accessories", item: "ストロー付き水筒", description: "こぼしにくいストロー付きで水分補給を簡単に。", reason: "小さい手でも使いやすい" }
        ],
        preschool: [
          { category: "tops", item: "半袖ポロシャツ", description: "襟付きで上品に見え、汗をかいても快適。自分で着脱しやすい構造。", reason: "自立心を育てつつ清潔感を保つ" },
          { category: "bottoms", item: "ショートパンツ", description: "動きやすく、ポケット付きでハンカチなどを入れられます。", reason: "活発な遊びと身の回りのものの管理" },
          { category: "shoes", item: "スニーカー（マジックテープ式）", description: "足にフィットして運動しやすく、マジックテープで自分で履ける。", reason: "運動能力の向上と自立を促進" },
          { category: "protection", item: "キャップ", description: "おしゃれなデザインで、サイズ調整可能。日焼け止めクリームと併用。", reason: "ファッション性と実用性の両立" },
          { category: "accessories", item: "首にかける水筒", description: "軽量で首にかけられるタイプ。紛失しにくく便利。", reason: "活発な遊びでも水分補給を忘れずに" }
        ],
        school: [
          { category: "tops", item: "半袖シャツ", description: "制服に合わせやすく、アイロンいらずの素材。汗取りパッド付きタイプも◎", reason: "学校生活に適し、お手入れが簡単" },
          { category: "bottoms", item: "チノパンツ", description: "きちんと感があり、動きやすい。汚れても洗濯機で簡単にお手入れ可能。", reason: "学校の規則に配慮しつつ実用性重視" },
          { category: "shoes", item: "白いスニーカー", description: "学校の規則に合った色で、運動にも適している。履き心地重視。", reason: "校則遵守と運動時の安全性" },
          { category: "protection", item: "折りたたみ帽子", description: "ランドセルに入るサイズ。体育や外遊びの時に使用。", reason: "持ち運びやすく必要な時だけ使用" },
          { category: "accessories", item: "タオル付き水筒", description: "肩ひも付きで持ち運びやすく、タオルで汗も拭ける。", reason: "学校生活での利便性と衛生面" }
        ]
      },
      cloudy: {
        toddler: [
          { category: "tops", item: "薄手の長袖Tシャツ", description: "体温調節しやすく、肌を守ります。前開きタイプで着せやすい。", reason: "気温変化への対応と着せやすさ" },
          { category: "bottoms", item: "薄手のレギンス", description: "動きやすく、膝を守ります。オムツ替えもスムーズ。", reason: "活発な動きと怪我の防止" },
          { category: "shoes", item: "軽量スニーカー", description: "柔らかく歩きやすい。マジックテープで自分でも履ける。", reason: "歩行の安定性と自立促進" },
          { category: "accessories", item: "薄手のカーディガン", description: "気温に応じて脱ぎ着できる。ボタンが大きく扱いやすい。", reason: "体温調節の学習" },
          { category: "protection", item: "軽い帽子", description: "風で飛ばされにくく、頭を保護。可愛いデザインで喜んで被る。", reason: "頭部保護と帽子をかぶる習慣づけ" }
        ],
        preschool: [
          { category: "tops", item: "長袖カットソー", description: "肌触りが良く、自分で着脱できる。重ね着にも最適。", reason: "自立と快適性の両立" },
          { category: "bottoms", item: "ストレッチパンツ", description: "動きやすく、座ったり走ったりしても型崩れしません。", reason: "様々な活動に対応" },
          { category: "shoes", item: "運動靴", description: "クッション性があり、足の発達をサポート。滑り止め付き。", reason: "足の健康な発育と安全性" },
          { category: "accessories", item: "ジップアップパーカー", description: "ファスナーで体温調節が簡単。フード付きで首元も暖かい。", reason: "自分で温度調節できる技術の習得" },
          { category: "protection", item: "リバーシブル帽子", description: "気分や服装に合わせて変えられる。あご紐で安全。", reason: "ファッション性と実用性" }
        ],
        school: [
          { category: "tops", item: "長袖シャツ", description: "制服の下に着用可能。温度調節しやすく、きちんと感もあります。", reason: "学校生活に適した体温調節" },
          { category: "bottoms", item: "制服対応パンツ", description: "学校の規則に合い、動きやすさも確保。お手入れ簡単。", reason: "規則遵守と実用性の確保" },
          { category: "shoes", item: "学校指定靴", description: "学校の規則に従い、運動にも適した機能性を重視。", reason: "校則遵守と運動時の安全性" },
          { category: "accessories", item: "学校カーディガン", description: "制服の一部として認められた体温調節アイテム。", reason: "校則内での体温調節" },
          { category: "protection", item: "紅白帽", description: "学校指定の帽子。体育や外活動で使用。", reason: "学校活動での必要性" }
        ]
      },
      rainy: {
        toddler: [
          { category: "tops", item: "防水スモック", description: "濡れても平気な素材で、着脱が簡単。明るい色で視認性も良好。", reason: "雨の中でも視認性と安全性を確保" },
          { category: "bottoms", item: "防水オーバーパンツ", description: "普通の服の上から着用できる。マジックテープで簡単装着。", reason: "雨からの保護と着脱の簡単さ" },
          { category: "shoes", item: "ショート丈レインブーツ", description: "歩きやすい丈の長さで、滑り止め付き。可愛いデザイン。", reason: "安全性と歩きやすさの両立" },
          { category: "accessories", item: "子供用傘", description: "軽量で持ちやすく、安全な樹脂製の先端。明るい色で目立つ。", reason: "安全性と視認性を重視" },
          { category: "protection", item: "防水お着替えセット", description: "濡れた時の着替えを防水バッグに入れて準備。", reason: "快適性の維持と衛生面" }
        ],
        preschool: [
          { category: "tops", item: "レインコート", description: "自分で着られるよう練習でき、リフレクター付きで安全。", reason: "自立心の育成と安全性" },
          { category: "bottoms", item: "レインパンツ", description: "足首が絞れるタイプで雨の侵入を防ぐ。動きやすい設計。", reason: "完全防水と動きやすさ" },
          { category: "shoes", item: "長靴", description: "滑り止めがしっかりしており、足首まで覆う丈。履きやすい。", reason: "雨の日の安全な歩行" },
          { category: "accessories", item: "子供用雨傘", description: "開閉が簡単で、風に強い構造。名前を書くスペース付き。", reason: "使いやすさと紛失防止" },
          { category: "protection", item: "タオル", description: "濡れた時にすぐ拭けるよう、肌触りの良いタオルを携帯。", reason: "衛生面と快適性" }
        ],
        school: [
          { category: "tops", item: "制服対応レインコート", description: "制服の上から着用でき、学校のルールに適合。コンパクトに収納。", reason: "校則遵守と実用性" },
          { category: "bottoms", item: "制服用レインパンツ", description: "制服を濡らさず、動きやすい。登下校時の必需品。", reason: "制服の保護と安全性" },
          { category: "shoes", item: "通学用長靴", description: "学校の規則に合った色で、滑りにくい靴底。履き替えやすい。", reason: "校則遵守と安全な通学" },
          { category: "accessories", item: "折りたたみ傘", description: "ランドセルに入るサイズで、丈夫で長持ち。反射材付き。", reason: "携帯性と安全性の確保" },
          { category: "protection", item: "防水巾着袋", description: "濡れた物を入れる袋と、体操服などの着替えを分けて収納。", reason: "衛生面と整理整頓" }
        ]
      },
      snowy: {
        toddler: [
          { category: "tops", item: "厚手のトレーナー", description: "保温性が高く、着脱しやすい。重ね着で調節可能。", reason: "保温性と着せやすさ" },
          { category: "bottoms", item: "裏起毛パンツ", description: "暖かく、動きやすい。オムツ替えもスムーズにできます。", reason: "保温性とお世話のしやすさ" },
          { category: "shoes", item: "防水ブーツ", description: "保温性があり、雪や水を弾く。滑り止めで安全。", reason: "足元の保温と安全性" },
          { category: "accessories", item: "ミトン手袋", description: "指が分かれていないので暖かく、紐で繋がっているので紛失しにくい。", reason: "保温性と紛失防止" },
          { category: "protection", item: "耳あて付き帽子", description: "耳まで覆える暖かい帽子。あご紐で風で飛ばされません。", reason: "頭部と耳の保温" }
        ],
        preschool: [
          { category: "tops", item: "フリースジャケット", description: "軽量で暖かく、ファスナーで体温調節が簡単。洗濯も楽。", reason: "軽さと保温性の両立" },
          { category: "bottoms", item: "スノーパンツ", description: "雪遊びに最適で、防水・保温機能付き。膝当て補強済み。", reason: "雪遊びでの保護と保温" },
          { category: "shoes", item: "スノーブーツ", description: "滑り止めがしっかりしており、着脱しやすい構造。保温性抜群。", reason: "雪道での安全性と保温" },
          { category: "accessories", item: "5本指手袋", description: "指の動かしやすさと保温性を両立。手首まで覆う丈。", reason: "手先の器用さと保温性" },
          { category: "protection", item: "ネックウォーマー", description: "首元を暖かく保ち、マフラーより安全。伸縮性があり着脱簡単。", reason: "首元の保温と安全性" }
        ],
        school: [
          { category: "tops", item: "制服対応セーター", description: "学校指定または推奨のセーター。ウール混で暖かい。", reason: "校則遵守と保温性" },
          { category: "bottoms", item: "制服用防寒パンツ", description: "制服の下に履ける薄手だが暖かいインナーパンツ。", reason: "見た目を保ちつつ保温" },
          { category: "shoes", item: "通学用防寒靴", description: "学校の規則に合った色で、滑り止めと保温機能付き。", reason: "校則遵守と冬の通学安全" },
          { category: "accessories", item: "制服用手袋", description: "学校で許可された色・デザインの手袋。実用性重視。", reason: "校則内での防寒対策" },
          { category: "protection", item: "マフラー", description: "学校指定色または無地で、首元をしっかり保温。", reason: "校則遵守と防寒効果" }
        ]
      }
    };

    const weatherRecs = weatherAgeMap[condition]?.[ageGroup] || [];
    weatherRecs.forEach(rec => {
      recommendations.push({
        id: id++,
        weatherConditionId: null,
        category: rec.category,
        item: rec.item,
        description: rec.description,
        reason: rec.reason
      });
    });

    return recommendations;
  }



  private applyWeatherAdjustments(recommendations: ClothingRecommendation[], weatherInput: WeatherInput): ClothingRecommendation[] {
    return recommendations.map(rec => {
      let adjustedRec = { ...rec };
      
      // Temperature adjustments
      if (weatherInput.temperature > 25) {
        if (rec.category === "tops") {
          adjustedRec.reason += ` 気温${weatherInput.temperature}°Cは暑いため、通気性を重視。`;
        }
      } else if (weatherInput.temperature < 15) {
        if (rec.category === "tops") {
          adjustedRec.reason += ` 気温${weatherInput.temperature}°Cは寒いため、保温性を重視。`;
        }
      }
      
      // Humidity adjustments
      if (weatherInput.humidity > 70) {
        if (rec.category === "tops" || rec.category === "bottoms") {
          adjustedRec.reason += ` 湿度${weatherInput.humidity}%は高めなので、速乾性素材がおすすめ。`;
        }
      }
      
      return adjustedRec;
    });
  }
}

export class DatabaseStorage implements IStorage {
  async getWeatherCondition(id: number): Promise<WeatherCondition | undefined> {
    const [weather] = await db.select().from(weatherConditions).where(eq(weatherConditions.id, id));
    return weather || undefined;
  }

  async createWeatherCondition(condition: InsertWeatherCondition): Promise<WeatherCondition> {
    const [weather] = await db
      .insert(weatherConditions)
      .values(condition)
      .returning();
    return weather;
  }

  async getClothingRecommendations(weatherConditionId: number): Promise<ClothingRecommendation[]> {
    return await db.select().from(clothingRecommendations).where(eq(clothingRecommendations.weatherConditionId, weatherConditionId));
  }

  async createClothingRecommendation(recommendation: InsertClothingRecommendation): Promise<ClothingRecommendation> {
    const [clothing] = await db
      .insert(clothingRecommendations)
      .values(recommendation)
      .returning();
    return clothing;
  }

  async getRecommendationsByWeather(weatherInput: WeatherInput): Promise<ClothingRecommendation[]> {
    // Get age-specific recommendations for weather condition
    const recommendations = this.getRecommendationsByWeatherAndAge(weatherInput.condition, weatherInput.ageGroup);
    
    // Apply temperature and humidity adjustments
    const finalRecommendations = this.applyWeatherAdjustments(recommendations, weatherInput);
    
    return finalRecommendations;
  }

  private getRecommendationsByWeatherAndAge(condition: string, ageGroup: string): ClothingRecommendation[] {
    const recommendations: ClothingRecommendation[] = [];
    let id = 1;

    // Age-specific recommendations for each weather condition
    const weatherAgeMap: { [key: string]: { [key: string]: any[] } } = {
      sunny: {
        toddler: [
          { category: "tops", item: "UVカット半袖Tシャツ", description: "汗をかいても快適な薄手の綿素材。UVカット機能付きで肌を守ります。", reason: "幼児の敏感な肌を紫外線から保護" },
          { category: "bottoms", item: "薄手のハーフパンツ", description: "伸縮性があり動きやすく、オムツ替えも簡単。膝が見える長さで涼しく。", reason: "活発な動きとオムツ替えのしやすさ" },
          { category: "shoes", item: "サンダル（マジックテープ式）", description: "マジックテープで脱ぎ着しやすく、通気性抜群。滑り止め付き。", reason: "自分で履けて安全性も確保" },
          { category: "protection", item: "つば広帽子", description: "あご紐付きで風で飛ばされず、首の後ろまでカバー。日焼け止めも忘れずに。", reason: "帽子の紛失防止と広範囲の日焼け対策" },
          { category: "accessories", item: "ストロー付き水筒", description: "こぼしにくいストロー付きで水分補給を簡単に。", reason: "小さい手でも使いやすい" }
        ],
        preschool: [
          { category: "tops", item: "半袖ポロシャツ", description: "襟付きで上品に見え、汗をかいても快適。自分で着脱しやすい構造。", reason: "自立心を育てつつ清潔感を保つ" },
          { category: "bottoms", item: "ショートパンツ", description: "動きやすく、ポケット付きでハンカチなどを入れられます。", reason: "活発な遊びと身の回りのものの管理" },
          { category: "shoes", item: "スニーカー（マジックテープ式）", description: "足にフィットして運動しやすく、マジックテープで自分で履ける。", reason: "運動能力の向上と自立を促進" },
          { category: "protection", item: "キャップ", description: "おしゃれなデザインで、サイズ調整可能。日焼け止めクリームと併用。", reason: "ファッション性と実用性の両立" },
          { category: "accessories", item: "首にかける水筒", description: "軽量で首にかけられるタイプ。紛失しにくく便利。", reason: "活発な遊びでも水分補給を忘れずに" }
        ],
        school: [
          { category: "tops", item: "半袖シャツ", description: "制服に合わせやすく、アイロンいらずの素材。汗取りパッド付きタイプも◎", reason: "学校生活に適し、お手入れが簡単" },
          { category: "bottoms", item: "チノパンツ", description: "きちんと感があり、動きやすい。汚れても洗濯機で簡単にお手入れ可能。", reason: "学校の規則に配慮しつつ実用性重視" },
          { category: "shoes", item: "白いスニーカー", description: "学校の規則に合った色で、運動にも適している。履き心地重視。", reason: "校則遵守と運動時の安全性" },
          { category: "protection", item: "折りたたみ帽子", description: "ランドセルに入るサイズ。体育や外遊びの時に使用。", reason: "持ち運びやすく必要な時だけ使用" },
          { category: "accessories", item: "タオル付き水筒", description: "肩ひも付きで持ち運びやすく、タオルで汗も拭ける。", reason: "学校生活での利便性と衛生面" }
        ]
      },
      cloudy: {
        toddler: [
          { category: "tops", item: "薄手の長袖Tシャツ", description: "体温調節しやすく、肌を守ります。前開きタイプで着せやすい。", reason: "気温変化への対応と着せやすさ" },
          { category: "bottoms", item: "薄手のレギンス", description: "動きやすく、膝を守ります。オムツ替えもスムーズ。", reason: "活発な動きと怪我の防止" },
          { category: "shoes", item: "軽量スニーカー", description: "柔らかく歩きやすい。マジックテープで自分でも履ける。", reason: "歩行の安定性と自立促進" },
          { category: "accessories", item: "薄手のカーディガン", description: "気温に応じて脱ぎ着できる。ボタンが大きく扱いやすい。", reason: "体温調節の学習" },
          { category: "protection", item: "軽い帽子", description: "風で飛ばされにくく、頭を保護。可愛いデザインで喜んで被る。", reason: "頭部保護と帽子をかぶる習慣づけ" }
        ],
        preschool: [
          { category: "tops", item: "長袖カットソー", description: "肌触りが良く、自分で着脱できる。重ね着にも最適。", reason: "自立と快適性の両立" },
          { category: "bottoms", item: "ストレッチパンツ", description: "動きやすく、座ったり走ったりしても型崩れしません。", reason: "様々な活動に対応" },
          { category: "shoes", item: "運動靴", description: "クッション性があり、足の発達をサポート。滑り止め付き。", reason: "足の健康な発育と安全性" },
          { category: "accessories", item: "ジップアップパーカー", description: "ファスナーで体温調節が簡単。フード付きで首元も暖かい。", reason: "自分で温度調節できる技術の習得" },
          { category: "protection", item: "リバーシブル帽子", description: "気分や服装に合わせて変えられる。あご紐で安全。", reason: "ファッション性と実用性" }
        ],
        school: [
          { category: "tops", item: "長袖シャツ", description: "制服の下に着用可能。温度調節しやすく、きちんと感もあります。", reason: "学校生活に適した体温調節" },
          { category: "bottoms", item: "制服対応パンツ", description: "学校の規則に合い、動きやすさも確保。お手入れ簡単。", reason: "規則遵守と実用性の確保" },
          { category: "shoes", item: "学校指定靴", description: "学校の規則に従い、運動にも適した機能性を重視。", reason: "校則遵守と運動時の安全性" },
          { category: "accessories", item: "学校カーディガン", description: "制服の一部として認められた体温調節アイテム。", reason: "校則内での体温調節" },
          { category: "protection", item: "紅白帽", description: "学校指定の帽子。体育や外活動で使用。", reason: "学校活動での必要性" }
        ]
      },
      rainy: {
        toddler: [
          { category: "tops", item: "防水スモック", description: "濡れても平気な素材で、着脱が簡単。明るい色で視認性も良好。", reason: "雨の中でも視認性と安全性を確保" },
          { category: "bottoms", item: "防水オーバーパンツ", description: "普通の服の上から着用できる。マジックテープで簡単装着。", reason: "雨からの保護と着脱の簡単さ" },
          { category: "shoes", item: "ショート丈レインブーツ", description: "歩きやすい丈の長さで、滑り止め付き。可愛いデザイン。", reason: "安全性と歩きやすさの両立" },
          { category: "accessories", item: "子供用傘", description: "軽量で持ちやすく、安全な樹脂製の先端。明るい色で目立つ。", reason: "安全性と視認性を重視" },
          { category: "protection", item: "防水お着替えセット", description: "濡れた時の着替えを防水バッグに入れて準備。", reason: "快適性の維持と衛生面" }
        ],
        preschool: [
          { category: "tops", item: "レインコート", description: "自分で着られるよう練習でき、リフレクター付きで安全。", reason: "自立心の育成と安全性" },
          { category: "bottoms", item: "レインパンツ", description: "足首が絞れるタイプで雨の侵入を防ぐ。動きやすい設計。", reason: "完全防水と動きやすさ" },
          { category: "shoes", item: "長靴", description: "滑り止めがしっかりしており、足首まで覆う丈。履きやすい。", reason: "雨の日の安全な歩行" },
          { category: "accessories", item: "子供用雨傘", description: "開閉が簡単で、風に強い構造。名前を書くスペース付き。", reason: "使いやすさと紛失防止" },
          { category: "protection", item: "タオル", description: "濡れた時にすぐ拭けるよう、肌触りの良いタオルを携帯。", reason: "衛生面と快適性" }
        ],
        school: [
          { category: "tops", item: "制服対応レインコート", description: "制服の上から着用でき、学校のルールに適合。コンパクトに収納。", reason: "校則遵守と実用性" },
          { category: "bottoms", item: "制服用レインパンツ", description: "制服を濡らさず、動きやすい。登下校時の必需品。", reason: "制服の保護と安全性" },
          { category: "shoes", item: "通学用長靴", description: "学校の規則に合った色で、滑りにくい靴底。履き替えやすい。", reason: "校則遵守と安全な通学" },
          { category: "accessories", item: "折りたたみ傘", description: "ランドセルに入るサイズで、丈夫で長持ち。反射材付き。", reason: "携帯性と安全性の確保" },
          { category: "protection", item: "防水巾着袋", description: "濡れた物を入れる袋と、体操服などの着替えを分けて収納。", reason: "衛生面と整理整頓" }
        ]
      },
      snowy: {
        toddler: [
          { category: "tops", item: "厚手のトレーナー", description: "保温性が高く、着脱しやすい。重ね着で調節可能。", reason: "保温性と着せやすさ" },
          { category: "bottoms", item: "裏起毛パンツ", description: "暖かく、動きやすい。オムツ替えもスムーズにできます。", reason: "保温性とお世話のしやすさ" },
          { category: "shoes", item: "防水ブーツ", description: "保温性があり、雪や水を弾く。滑り止めで安全。", reason: "足元の保温と安全性" },
          { category: "accessories", item: "ミトン手袋", description: "指が分かれていないので暖かく、紐で繋がっているので紛失しにくい。", reason: "保温性と紛失防止" },
          { category: "protection", item: "耳あて付き帽子", description: "耳まで覆える暖かい帽子。あご紐で風で飛ばされません。", reason: "頭部と耳の保温" }
        ],
        preschool: [
          { category: "tops", item: "フリースジャケット", description: "軽量で暖かく、ファスナーで体温調節が簡単。洗濯も楽。", reason: "軽さと保温性の両立" },
          { category: "bottoms", item: "スノーパンツ", description: "雪遊びに最適で、防水・保温機能付き。膝当て補強済み。", reason: "雪遊びでの保護と保温" },
          { category: "shoes", item: "スノーブーツ", description: "滑り止めがしっかりしており、着脱しやすい構造。保温性抜群。", reason: "雪道での安全性と保温" },
          { category: "accessories", item: "5本指手袋", description: "指の動かしやすさと保温性を両立。手首まで覆う丈。", reason: "手先の器用さと保温性" },
          { category: "protection", item: "ネックウォーマー", description: "首元を暖かく保ち、マフラーより安全。伸縮性があり着脱簡単。", reason: "首元の保温と安全性" }
        ],
        school: [
          { category: "tops", item: "制服対応セーター", description: "学校指定または推奨のセーター。ウール混で暖かい。", reason: "校則遵守と保温性" },
          { category: "bottoms", item: "制服用防寒パンツ", description: "制服の下に履ける薄手だが暖かいインナーパンツ。", reason: "見た目を保ちつつ保温" },
          { category: "shoes", item: "通学用防寒靴", description: "学校の規則に合った色で、滑り止めと保温機能付き。", reason: "校則遵守と冬の通学安全" },
          { category: "accessories", item: "制服用手袋", description: "学校で許可された色・デザインの手袋。実用性重視。", reason: "校則内での防寒対策" },
          { category: "protection", item: "マフラー", description: "学校指定色または無地で、首元をしっかり保温。", reason: "校則遵守と防寒効果" }
        ]
      }
    };

    const weatherRecs = weatherAgeMap[condition]?.[ageGroup] || [];
    weatherRecs.forEach(rec => {
      recommendations.push({
        id: id++,
        weatherConditionId: null,
        category: rec.category,
        item: rec.item,
        description: rec.description,
        reason: rec.reason
      });
    });

    // Add additional accessories for variety (3+ accessories total)
    const additionalAccessories = this.getAdditionalAccessories(condition, ageGroup, id);
    recommendations.push(...additionalAccessories);

    return recommendations;
  }

  private applyWeatherAdjustments(recommendations: ClothingRecommendation[], weatherInput: WeatherInput): ClothingRecommendation[] {
    return recommendations.map(rec => {
      let adjustedRec = { ...rec };
      
      // Temperature adjustments
      if (weatherInput.temperature > 25) {
        if (rec.category === "tops") {
          adjustedRec.reason += ` 気温${weatherInput.temperature}°Cは暑いため、通気性を重視。`;
        }
      } else if (weatherInput.temperature < 15) {
        if (rec.category === "tops") {
          adjustedRec.reason += ` 気温${weatherInput.temperature}°Cは寒いため、保温性を重視。`;
        }
      }
      
      // Humidity adjustments
      if (weatherInput.humidity > 70) {
        if (rec.category === "tops" || rec.category === "bottoms") {
          adjustedRec.reason += ` 湿度${weatherInput.humidity}%は高めなので、速乾性素材がおすすめ。`;
        }
      }
      
      return adjustedRec;
    });
  }

  private getAdditionalAccessories(condition: string, ageGroup: string, startId: number): ClothingRecommendation[] {
    const accessories: ClothingRecommendation[] = [];
    let id = startId;

    // Common accessories for all weather conditions
    const commonAccessories: { [key: string]: Array<{ item: string; description: string; reason: string }> } = {
      toddler: [
        { item: "名前入りリストバンド", description: "迷子防止に役立つ名前と連絡先入りのリストバンド。", reason: "安全性と身元確認のため" },
        { item: "お気に入りのぬいぐるみ", description: "小さいサイズで持ち運びやすい。不安な時の心の支えに。", reason: "情緒の安定と安心感のため" }
      ],
      preschool: [
        { item: "腕時計型キッズウォッチ", description: "時間を覚える練習にも。親子で連絡取れる機能付きも。", reason: "時間管理の学習と安全確保" },
        { item: "ポシェット", description: "ハンカチやティッシュを自分で管理。斜めがけで紛失しにくい。", reason: "身の回りの物の管理練習" }
      ],
      school: [
        { item: "ランドセルカバー", description: "雨の日も安心。反射材付きで安全性もアップ。", reason: "ランドセルの保護と視認性向上" },
        { item: "移動ポケット", description: "制服にポケットがない時に便利。ハンカチとティッシュを携帯。", reason: "衛生用品の携帯に必要" }
      ]
    };

    // Weather-specific accessories
    const weatherAccessories: { [key: string]: { [key: string]: Array<{ item: string; description: string; reason: string }> } } = {
      sunny: {
        toddler: [
          { item: "UVカット腕カバー", description: "日焼けしやすい腕をしっかり保護。着脱簡単。", reason: "追加の紫外線対策" }
        ],
        preschool: [
          { item: "保冷バッグ", description: "お弁当や飲み物を冷たく保つ。熱中症対策にも。", reason: "食品の安全性と熱中症予防" }
        ],
        school: [
          { item: "冷却タオル", description: "水で濡らすとひんやり。体育の後のクールダウンに。", reason: "体温調節と熱中症予防" }
        ]
      },
      rainy: {
        toddler: [
          { item: "レインブーツ用インソール", description: "滑り止めと履き心地向上。取り外して洗える。", reason: "安全性と衛生面の向上" }
        ],
        preschool: [
          { item: "防水ポーチ", description: "大切な物を雨から守る。透明で中身が見やすい。", reason: "持ち物の保護" }
        ],
        school: [
          { item: "吸水タオル", description: "マイクロファイバーで水分をしっかり吸収。コンパクト。", reason: "濡れた時の対処" }
        ]
      },
      snowy: {
        toddler: [
          { item: "ネックウォーマー", description: "首元の保温に最適。マフラーより安全で着脱簡単。", reason: "首元の防寒と安全性" }
        ],
        preschool: [
          { item: "カイロケース", description: "カイロを安全に持ち運べるケース。やけど防止。", reason: "安全な防寒対策" }
        ],
        school: [
          { item: "防寒インソール", description: "靴の中の保温効果をアップ。つま先の冷え対策。", reason: "足元の防寒強化" }
        ]
      }
    };

    // Add common accessories
    const common = commonAccessories[ageGroup] || [];
    common.forEach((acc: { item: string; description: string; reason: string }) => {
      accessories.push({
        id: id++,
        weatherConditionId: null,
        category: "accessories",
        item: acc.item,
        description: acc.description,
        reason: acc.reason
      });
    });

    // Add weather-specific accessories
    const weatherSpecific = weatherAccessories[condition]?.[ageGroup] || [];
    weatherSpecific.forEach((acc: { item: string; description: string; reason: string }) => {
      accessories.push({
        id: id++,
        weatherConditionId: null,
        category: "accessories",
        item: acc.item,
        description: acc.description,
        reason: acc.reason
      });
    });

    return accessories;
  }

  private getTemperatureSpecificItems(weatherInput: WeatherInput): ClothingRecommendation[] {
    const items: ClothingRecommendation[] = [];
    let id = 1000; // Start with high ID to avoid conflicts

    if (weatherInput.temperature > 30) {
      items.push({
        id: id++,
        weatherConditionId: null,
        category: "protection",
        item: "冷却タオル",
        description: "水で濡らすとひんやり冷たくなるタオル。首に巻いて体温調節。",
        reason: "猛暑での熱中症対策に必須"
      });
    } else if (weatherInput.temperature < 5) {
      items.push({
        id: id++,
        weatherConditionId: null,
        category: "accessories",
        item: "使い捨てカイロ",
        description: "貼らないタイプをポケットに。緊急時の防寒対策。",
        reason: "極寒での体温維持のため"
      });
    }

    return items;
  }
}

// Use enhanced storage with comprehensive temperature adjustments
import { EnhancedDatabaseStorage } from "./enhanced-storage";
export const storage = new EnhancedDatabaseStorage();
