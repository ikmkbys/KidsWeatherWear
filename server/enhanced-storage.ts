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

export class EnhancedDatabaseStorage implements IStorage {
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
    const baseRecommendations = this.getBaseRecommendationsByWeatherAndAge(weatherInput.condition, weatherInput.ageGroup);
    
    // Apply comprehensive temperature and humidity adjustments
    const adjustedRecommendations = this.applyComprehensiveWeatherAdjustments(baseRecommendations, weatherInput);
    
    // Add additional accessories for variety
    const additionalAccessories = this.getAdditionalAccessories(weatherInput.condition, weatherInput.ageGroup, adjustedRecommendations.length + 100);
    adjustedRecommendations.push(...additionalAccessories);

    // Add temperature-specific special items
    const tempSpecificItems = this.getTemperatureSpecificItems(weatherInput, adjustedRecommendations.length + 200);
    adjustedRecommendations.push(...tempSpecificItems);

    return adjustedRecommendations;
  }

  private getBaseRecommendationsByWeatherAndAge(condition: string, ageGroup: string): ClothingRecommendation[] {
    const recommendations: ClothingRecommendation[] = [];
    let id = 1;

    // Age-specific recommendations for each weather condition
    const weatherAgeMap: { [key: string]: { [key: string]: any[] } } = {
      sunny: {
        toddler: [
          { category: "tops", item: "UVカット半袖Tシャツ", description: "汗をかいても快適な薄手の綿素材。UVカット機能付きで肌を守ります。", reason: "幼児の敏感な肌を紫外線から保護" },
          { category: "bottoms", item: "薄手のハーフパンツ", description: "伸縮性があり動きやすく、オムツ替えも簡単。膝が見える長さで涼しく。", reason: "活発な動きとオムツ替えのしやすさ" },
          { category: "shoes", item: "サンダル（マジックテープ式）", description: "マジックテープで脱ぎ着しやすく、通気性抜群。滑り止め付き。", reason: "自分で履けて安全性も確保" },
          { category: "protection", item: "つば広帽子", description: "あご紐付きで風で飛ばされず、首の後ろまでカバー。日焼け止めも忘れずに。", reason: "帽子の紛失防止と広範囲の日焼け対策" }
        ],
        preschool: [
          { category: "tops", item: "半袖ポロシャツ", description: "襟付きで上品に見え、汗をかいても快適。自分で着脱しやすい構造。", reason: "自立心を育てつつ清潔感を保つ" },
          { category: "bottoms", item: "ショートパンツ", description: "動きやすく、ポケット付きでハンカチなどを入れられます。", reason: "活発な遊びと身の回りのものの管理" },
          { category: "shoes", item: "スニーカー（マジックテープ式）", description: "足にフィットして運動しやすく、マジックテープで自分で履ける。", reason: "運動能力の向上と自立を促進" },
          { category: "protection", item: "キャップ", description: "おしゃれなデザインで、サイズ調整可能。日焼け止めクリームと併用。", reason: "ファッション性と実用性の両立" }
        ],
        school: [
          { category: "tops", item: "半袖シャツ", description: "制服に合わせやすく、アイロンいらずの素材。汗取りパッド付きタイプも◎", reason: "学校生活に適し、お手入れが簡単" },
          { category: "bottoms", item: "チノパンツ", description: "きちんと感があり、動きやすい。汚れても洗濯機で簡単にお手入れ可能。", reason: "学校の規則に配慮しつつ実用性重視" },
          { category: "shoes", item: "白いスニーカー", description: "学校の規則に合った色で、運動にも適している。履き心地重視。", reason: "校則遵守と運動時の安全性" },
          { category: "protection", item: "折りたたみ帽子", description: "ランドセルに入るサイズ。体育や外遊びの時に使用。", reason: "持ち運びやすく必要な時だけ使用" }
        ]
      },
      cloudy: {
        toddler: [
          { category: "tops", item: "薄手の長袖Tシャツ", description: "体温調節しやすく、肌を守ります。前開きタイプで着せやすい。", reason: "気温変化への対応と着せやすさ" },
          { category: "bottoms", item: "薄手のレギンス", description: "動きやすく、膝を守ります。オムツ替えもスムーズ。", reason: "活発な動きと怪我の防止" },
          { category: "shoes", item: "軽量スニーカー", description: "柔らかく歩きやすい。マジックテープで自分でも履ける。", reason: "歩行の安定性と自立促進" },
          { category: "protection", item: "軽い帽子", description: "風で飛ばされにくく、頭を保護。可愛いデザインで喜んで被る。", reason: "頭部保護と帽子をかぶる習慣づけ" }
        ],
        preschool: [
          { category: "tops", item: "長袖カットソー", description: "肌触りが良く、自分で着脱できる。重ね着にも最適。", reason: "自立と快適性の両立" },
          { category: "bottoms", item: "ストレッチパンツ", description: "動きやすく、座ったり走ったりしても型崩れしません。", reason: "様々な活動に対応" },
          { category: "shoes", item: "運動靴", description: "クッション性があり、足の発達をサポート。滑り止め付き。", reason: "足の健康な発育と安全性" },
          { category: "protection", item: "リバーシブル帽子", description: "気分や服装に合わせて変えられる。あご紐で安全。", reason: "ファッション性と実用性" }
        ],
        school: [
          { category: "tops", item: "長袖シャツ", description: "制服の下に着用可能。温度調節しやすく、きちんと感もあります。", reason: "学校生活に適した体温調節" },
          { category: "bottoms", item: "制服対応パンツ", description: "学校の規則に合い、動きやすさも確保。お手入れ簡単。", reason: "規則遵守と実用性の確保" },
          { category: "shoes", item: "学校指定靴", description: "学校の規則に従い、運動にも適した機能性を重視。", reason: "校則遵守と運動時の安全性" },
          { category: "protection", item: "紅白帽", description: "学校指定の帽子。体育や外活動で使用。", reason: "学校活動での必要性" }
        ]
      },
      rainy: {
        toddler: [
          { category: "tops", item: "防水スモック", description: "濡れても平気な素材で、着脱が簡単。明るい色で視認性も良好。", reason: "雨の中でも視認性と安全性を確保" },
          { category: "bottoms", item: "防水オーバーパンツ", description: "普通の服の上から着用できる。マジックテープで簡単装着。", reason: "雨からの保護と着脱の簡単さ" },
          { category: "shoes", item: "ショート丈レインブーツ", description: "歩きやすい丈の長さで、滑り止め付き。可愛いデザイン。", reason: "安全性と歩きやすさの両立" },
          { category: "protection", item: "防水お着替えセット", description: "濡れた時の着替えを防水バッグに入れて準備。", reason: "快適性の維持と衛生面" }
        ],
        preschool: [
          { category: "tops", item: "レインコート", description: "自分で着られるよう練習でき、リフレクター付きで安全。", reason: "自立心の育成と安全性" },
          { category: "bottoms", item: "レインパンツ", description: "足首が絞れるタイプで雨の侵入を防ぐ。動きやすい設計。", reason: "完全防水と動きやすさ" },
          { category: "shoes", item: "長靴", description: "滑り止めがしっかりしており、足首まで覆う丈。履きやすい。", reason: "雨の日の安全な歩行" },
          { category: "protection", item: "タオル", description: "濡れた時にすぐ拭けるよう、肌触りの良いタオルを携帯。", reason: "衛生面と快適性" }
        ],
        school: [
          { category: "tops", item: "制服対応レインコート", description: "制服の上から着用でき、学校のルールに適合。コンパクトに収納。", reason: "校則遵守と実用性" },
          { category: "bottoms", item: "制服用レインパンツ", description: "制服を濡らさず、動きやすい。登下校時の必需品。", reason: "制服の保護と安全性" },
          { category: "shoes", item: "通学用長靴", description: "学校の規則に合った色で、滑りにくい靴底。履き替えやすい。", reason: "校則遵守と安全な通学" },
          { category: "protection", item: "防水巾着袋", description: "濡れた物を入れる袋と、体操服などの着替えを分けて収納。", reason: "衛生面と整理整頓" }
        ]
      },
      snowy: {
        toddler: [
          { category: "tops", item: "厚手のトレーナー", description: "保温性が高く、着脱しやすい。重ね着で調節可能。", reason: "保温性と着せやすさ" },
          { category: "bottoms", item: "裏起毛パンツ", description: "暖かく、動きやすい。オムツ替えもスムーズにできます。", reason: "保温性とお世話のしやすさ" },
          { category: "shoes", item: "防水ブーツ", description: "保温性があり、雪や水を弾く。滑り止めで安全。", reason: "足元の保温と安全性" },
          { category: "protection", item: "耳あて付き帽子", description: "耳まで覆える暖かい帽子。あご紐で風で飛ばされません。", reason: "頭部と耳の保温" }
        ],
        preschool: [
          { category: "tops", item: "フリースジャケット", description: "軽量で暖かく、ファスナーで体温調節が簡単。洗濯も楽。", reason: "軽さと保温性の両立" },
          { category: "bottoms", item: "スノーパンツ", description: "雪遊びに最適で、防水・保温機能付き。膝当て補強済み。", reason: "雪遊びでの保護と保温" },
          { category: "shoes", item: "スノーブーツ", description: "滑り止めがしっかりしており、着脱しやすい構造。保温性抜群。", reason: "雪道での安全性と保温" },
          { category: "protection", item: "ネックウォーマー", description: "首元を暖かく保ち、マフラーより安全。伸縮性があり着脱簡単。", reason: "首元の保温と安全性" }
        ],
        school: [
          { category: "tops", item: "制服対応セーター", description: "学校指定または推奨のセーター。ウール混で暖かい。", reason: "校則遵守と保温性" },
          { category: "bottoms", item: "制服用防寒パンツ", description: "制服の下に履ける薄手だが暖かいインナーパンツ。", reason: "見た目を保ちつつ保温" },
          { category: "shoes", item: "通学用防寒靴", description: "学校の規則に合った色で、滑り止めと保温機能付き。", reason: "校則遵守と冬の通学安全" },
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

  private applyComprehensiveWeatherAdjustments(recommendations: ClothingRecommendation[], weatherInput: WeatherInput): ClothingRecommendation[] {
    const adjustedRecommendations: ClothingRecommendation[] = [];
    
    // Temperature-based multiple options
    const multipleOptions = this.getTemperatureBasedOptions(weatherInput);
    
    // Add all temperature-based options
    adjustedRecommendations.push(...multipleOptions);
    
    // Process original recommendations with adjustments
    recommendations.forEach(rec => {
      let adjustedRec = { ...rec };
      
      // Humidity-based adjustments
      if (weatherInput.humidity > 85) {
        if (rec.category === "tops" || rec.category === "bottoms") {
          adjustedRec.description += " 高機能速乾素材（ポリエステル系）を強く推奨。";
          adjustedRec.reason += ` 湿度${weatherInput.humidity}%は非常に高く、汗対策が緊急課題。`;
        }
      } else if (weatherInput.humidity > 70) {
        if (rec.category === "tops" || rec.category === "bottoms") {
          adjustedRec.description += " 吸湿速乾素材がおすすめ。";
          adjustedRec.reason += ` 湿度${weatherInput.humidity}%は高めなので、汗処理が重要。`;
        }
      } else if (weatherInput.humidity < 30) {
        if (rec.category === "protection") {
          adjustedRec.description += " 保湿クリームで肌ケアも併用。";
          adjustedRec.reason += ` 湿度${weatherInput.humidity}%は乾燥のため、肌保護が必要。`;
        }
      }
      
      // Add only if not duplicate category from temperature options
      const hasCategory = multipleOptions.some(opt => opt.category === rec.category);
      if (!hasCategory) {
        adjustedRecommendations.push(adjustedRec);
      }
    });
    
    return adjustedRecommendations;
  }

  private getTemperatureBasedOptions(weatherInput: WeatherInput): ClothingRecommendation[] {
    const options: ClothingRecommendation[] = [];
    let id = 500; // Start with unique ID range

    if (weatherInput.temperature > 32) {
      // 危険な暑さ (32°C以上) - 熱中症警戒
      options.push(
        {
          id: id++, weatherConditionId: null, category: "tops",
          item: "クール素材タンクトップ", 
          description: "接触冷感素材で体温を下げる。UVカット必須。子供の熱中症リスクを最小化。",
          reason: `気温${weatherInput.temperature}°Cは危険レベル。子供の体温調節機能は未熟なため緊急対策が必要`
        },
        {
          id: id++, weatherConditionId: null, category: "bottoms",
          item: "極薄ショートパンツ", 
          description: "最薄手で通気性最優先。日陰での活動推奨。",
          reason: "危険な暑さのため外出を控え、室内活動を推奨"
        },
        {
          id: id++, weatherConditionId: null, category: "protection",
          item: "冷却ベスト", 
          description: "保冷剤を入れるポケット付き。体温を積極的に冷却。",
          reason: "子供の体温調節補助が必要"
        }
      );
    } else if (weatherInput.temperature > 28) {
      // 猛暑 (28-32°C) - 注意が必要
      options.push(
        {
          id: id++, weatherConditionId: null, category: "tops",
          item: "薄手メッシュTシャツ", 
          description: "通気性抜群で汗をすぐ乾かす。子供の汗かき体質に配慮。",
          reason: `気温${weatherInput.temperature}°Cは猛暑。子供は大人より体温が上がりやすいため特別な注意が必要`
        },
        {
          id: id++, weatherConditionId: null, category: "tops",
          item: "UVカット半袖シャツ", 
          description: "紫外線遮断率95%以上。子供の敏感な肌を守る。",
          reason: "強い日差しから子供の肌を保護"
        },
        {
          id: id++, weatherConditionId: null, category: "bottoms",
          item: "クール素材ショートパンツ", 
          description: "接触冷感で涼しく、動きやすい。膝の怪我防止も考慮。",
          reason: "猛暑での下半身快適性確保"
        }
      );
    } else if (weatherInput.temperature > 25) {
      // 夏日 (25-28°C) - 活動しやすい暑さ
      options.push(
        {
          id: id++, weatherConditionId: null, category: "tops",
          item: "半袖Tシャツ", 
          description: "薄手の綿素材で肌に優しく通気性良好。子供の活発な動きに対応。",
          reason: `気温${weatherInput.temperature}°Cは暑いが活動可能。子供の元気な遊びをサポート`
        },
        {
          id: id++, weatherConditionId: null, category: "tops",
          item: "半袖ポロシャツ", 
          description: "襟付きで首元の日焼け防止。速乾素材で汗対策も◎",
          reason: "活動的な子供の汗対策と日焼け防止"
        },
        {
          id: id++, weatherConditionId: null, category: "bottoms",
          item: "薄手ハーフパンツ", 
          description: "膝上で涼しく、転んでも擦り傷のリスクを考慮した丈。",
          reason: "子供の安全性と快適性の両立"
        }
      );
    } else if (weatherInput.temperature > 22) {
      // 快適な暖かさ (22-25°C) - 理想的
      options.push(
        {
          id: id++, weatherConditionId: null, category: "tops",
          item: "薄手長袖シャツ", 
          description: "朝夕の気温差に対応。子供は体温調節が未熟なため長袖で安定化。",
          reason: `気温${weatherInput.temperature}°Cは快適だが子供の体温調節サポートが重要`
        },
        {
          id: id++, weatherConditionId: null, category: "tops",
          item: "半袖＋薄手カーディガン", 
          description: "気温変化に素早く対応。子供でも脱ぎ着しやすい設計。",
          reason: "子供の自立心を育てつつ体温調節をサポート"
        },
        {
          id: id++, weatherConditionId: null, category: "bottoms",
          item: "七分丈パンツ", 
          description: "適度な丈で膝を保護。活発な子供の動きに最適。",
          reason: "遊びでの怪我防止と快適性"
        }
      );
    } else if (weatherInput.temperature > 19) {
      // 過ごしやすい (19-22°C) - 軽い重ね着
      options.push(
        {
          id: id++, weatherConditionId: null, category: "tops",
          item: "長袖Tシャツ", 
          description: "基本の保温。子供の基礎体温を安定させる。",
          reason: `気温${weatherInput.temperature}°Cは過ごしやすいが子供の体温維持に配慮`
        },
        {
          id: id++, weatherConditionId: null, category: "tops",
          item: "薄手セーター", 
          description: "適度な保温性で快適。遊びで汗をかいても調節しやすい。",
          reason: "子供の活動レベルに応じた体温調節"
        },
        {
          id: id++, weatherConditionId: null, category: "protection",
          item: "薄手ジャケット", 
          description: "風除けとして。子供は風の影響を受けやすいため。",
          reason: "子供の風邪予防対策"
        }
      );
    } else if (weatherInput.temperature > 16) {
      // 涼しい (16-19°C) - しっかり重ね着
      options.push(
        {
          id: id++, weatherConditionId: null, category: "tops",
          item: "中厚手セーター", 
          description: "しっかりとした保温性。子供の体温低下を防ぐ。",
          reason: `気温${weatherInput.temperature}°Cは涼しく、子供は大人より寒さを感じやすい`
        },
        {
          id: id++, weatherConditionId: null, category: "tops",
          item: "長袖＋ベスト", 
          description: "重ね着で調節可能。子供でも脱ぎ着しやすい組み合わせ。",
          reason: "子供の体温調節能力に応じた重ね着"
        },
        {
          id: id++, weatherConditionId: null, category: "protection",
          item: "軽めのブルゾン", 
          description: "風を防ぎ体温を保持。子供の風邪予防に重要。",
          reason: "子供の免疫力サポート"
        }
      );
    } else if (weatherInput.temperature > 13) {
      // 肌寒い (13-16°C) - 保温強化
      options.push(
        {
          id: id++, weatherConditionId: null, category: "tops",
          item: "厚手セーター", 
          description: "ウール混で保温性高い。子供の体温をしっかり保持。",
          reason: `気温${weatherInput.temperature}°Cは肌寒く、子供の体温低下リスクあり`
        },
        {
          id: id++, weatherConditionId: null, category: "tops",
          item: "フリース", 
          description: "軽量で暖かく、子供が動きやすい。洗濯も簡単で清潔維持。",
          reason: "子供の活動性と保温の両立"
        },
        {
          id: id++, weatherConditionId: null, category: "tops",
          item: "厚手パーカー", 
          description: "フード付きで頭部も保温。子供の首元冷え対策。",
          reason: "子供の首と頭部保温が重要"
        },
        {
          id: id++, weatherConditionId: null, category: "protection",
          item: "中厚手ジャケット", 
          description: "風と寒さをブロック。子供の体温維持に必須。",
          reason: "子供の風邪・体調不良予防"
        }
      );
    } else if (weatherInput.temperature > 10) {
      // 寒い (10-13°C) - 本格的な防寒
      options.push(
        {
          id: id++, weatherConditionId: null, category: "tops",
          item: "厚手ニット＋カーディガン", 
          description: "二重の保温層で確実に体温維持。子供の寒さ対策を強化。",
          reason: `気温${weatherInput.temperature}°Cは寒く、子供の体温管理が重要`
        },
        {
          id: id++, weatherConditionId: null, category: "tops",
          item: "裏起毛パーカー", 
          description: "内側が起毛で暖かい。子供の快適性を確保。",
          reason: "子供の体感温度向上"
        },
        {
          id: id++, weatherConditionId: null, category: "bottoms",
          item: "厚手長ズボン", 
          description: "裏起毛で下半身をしっかり保温。子供の脚の冷え防止。",
          reason: "子供の下半身冷え対策"
        },
        {
          id: id++, weatherConditionId: null, category: "protection",
          item: "ブルゾン", 
          description: "風を完全シャットアウト。子供の体温低下を防ぐ。",
          reason: "子供の防寒対策強化"
        },
        {
          id: id++, weatherConditionId: null, category: "protection",
          item: "軽量ダウンジャケット", 
          description: "軽いのに保温性抜群。子供の動きを妨げない。",
          reason: "子供の活動性を保ちつつ保温"
        }
      );
    } else if (weatherInput.temperature > 7) {
      // とても寒い (7-10°C) - 重装備必要
      options.push(
        {
          id: id++, weatherConditionId: null, category: "tops",
          item: "ヒートテック＋厚手ニット", 
          description: "発熱インナーで基礎体温上昇。子供の寒さ対策を根本から。",
          reason: `気温${weatherInput.temperature}°Cは非常に寒く、子供の体温維持が困難`
        },
        {
          id: id++, weatherConditionId: null, category: "tops",
          item: "厚手フリース＋ベスト", 
          description: "二重保温で体幹をしっかり温める。子供の内臓冷え防止。",
          reason: "子供の内臓保温が重要"
        },
        {
          id: id++, weatherConditionId: null, category: "bottoms",
          item: "防寒パンツ＋レギンス", 
          description: "二重履きで下半身完全防寒。子供の脚の冷えを徹底防止。",
          reason: "子供の下半身完全保護"
        },
        {
          id: id++, weatherConditionId: null, category: "protection",
          item: "厚手コート", 
          description: "風雪をシャットアウト。子供の体温を外気から完全保護。",
          reason: "子供の体温保持が最優先"
        },
        {
          id: id++, weatherConditionId: null, category: "protection",
          item: "中厚手ダウンジャケット", 
          description: "高い保温性で子供の体温をキープ。動きやすさも確保。",
          reason: "子供の快適性と保温の両立"
        }
      );
    } else if (weatherInput.temperature > 4) {
      // 厳寒 (4-7°C) - 完全防寒体制
      options.push(
        {
          id: id++, weatherConditionId: null, category: "tops",
          item: "ヒートテック＋厚手ニット＋ダウンベスト", 
          description: "三層構造で最強保温。子供の体温を確実に維持。",
          reason: `気温${weatherInput.temperature}°Cは厳寒。子供の低体温症リスクあり`
        },
        {
          id: id++, weatherConditionId: null, category: "tops",
          item: "裏起毛インナー＋厚手セーター", 
          description: "起毛インナーで肌側から暖める。子供の基礎体温向上。",
          reason: "子供の体温を内側から暖める"
        },
        {
          id: id++, weatherConditionId: null, category: "bottoms",
          item: "タイツ＋裏起毛パンツ", 
          description: "下半身二重保温。子供の脚と腰回りを冷えから守る。",
          reason: "子供の下半身低体温症防止"
        },
        {
          id: id++, weatherConditionId: null, category: "protection",
          item: "防寒コート", 
          description: "完全防風防寒。子供の体温を外気から遮断。",
          reason: "子供の体温保護が生命に関わる"
        },
        {
          id: id++, weatherConditionId: null, category: "accessories",
          item: "防寒帽子＋手袋セット", 
          description: "頭部と手先の冷え対策。子供の末端冷え性対策。",
          reason: "子供の末端部位保温が重要"
        }
      );
    } else {
      // 極寒 (4°C以下) - 緊急防寒対策
      options.push(
        {
          id: id++, weatherConditionId: null, category: "tops",
          item: "多層重ね着セット", 
          description: "ヒートテック＋厚手ニット＋ダウンベスト＋セーター。子供の生命保護レベル。",
          reason: `気温${weatherInput.temperature}°Cは極寒。子供の生命に関わる温度`
        },
        {
          id: id++, weatherConditionId: null, category: "bottoms",
          item: "完全防寒パンツセット", 
          description: "タイツ＋裏起毛パンツ＋防寒オーバーパンツ。三重保温。",
          reason: "子供の下半身完全保護が生命維持に必要"
        },
        {
          id: id++, weatherConditionId: null, category: "protection",
          item: "厚手ダウンコート", 
          description: "最高レベル保温性。子供の体温を確実に維持。フード必須。",
          reason: "子供の生命保護最優先"
        },
        {
          id: id++, weatherConditionId: null, category: "protection",
          item: "防寒コート＋ブランケット", 
          description: "コートに加えてブランケットで完全防寒。緊急保温対策。",
          reason: "極寒での子供の安全確保"
        },
        {
          id: id++, weatherConditionId: null, category: "accessories",
          item: "完全防寒セット", 
          description: "防寒帽子、厚手手袋、ネックウォーマー、カイロの完全セット。",
          reason: "子供の凍傷・低体温症防止"
        },
        {
          id: id++, weatherConditionId: null, category: "accessories",
          item: "緊急保温グッズ", 
          description: "使い捨てカイロ、保温ブランケット、温かい飲み物の準備。",
          reason: "緊急時の子供の体温回復手段"
        }
      );
    }

    return options;
  }

  private getAdditionalAccessories(condition: string, ageGroup: string, startId: number): ClothingRecommendation[] {
    const accessories: ClothingRecommendation[] = [];
    let id = startId;

    // 天気別・年齢別の豊富なアクセサリ選択肢
    const weatherAccessories: { [key: string]: { [key: string]: Array<{ item: string; description: string; reason: string }> } } = {
      sunny: {
        toddler: [
          { item: "UVカットサングラス", description: "子供用の安全なサングラス。紫外線から目を保護。落下防止ストラップ付き。", reason: "強い日差しから目を守るため" },
          { item: "冷感タオル", description: "首に巻くと涼しい冷感素材。水で濡らすとひんやり。", reason: "暑い日の体温調節サポート" },
          { item: "虫除けリストバンド", description: "天然成分の虫除け効果。肌に優しく長時間持続。", reason: "外遊び時の虫刺され防止" },
          { item: "水遊び用腕輪", description: "水膨らませるタイプで安全。プールや海で使用。", reason: "水遊び時の安全確保" },
          { item: "日除けパラソル", description: "ベビーカー用の小さなパラソル。UV99%カット。", reason: "移動中の日焼け防止" }
        ],
        preschool: [
          { item: "探検家セット", description: "虫眼鏡、方位磁針、小さなバッグのセット。自然観察に最適。", reason: "屋外活動での学習意欲向上" },
          { item: "水遊び用ゴーグル", description: "プールや海で使える子供用ゴーグル。視界クリア。", reason: "水遊びの楽しさと安全性" },
          { item: "フルーツ柄バンダナ", description: "汗拭きにも首巻きにも使える可愛いデザイン。", reason: "実用性とファッション性の両立" },
          { item: "貝殻収集バッグ", description: "海や川で見つけた宝物を入れる小さなメッシュバッグ。", reason: "自然への興味と収集の楽しさ" },
          { item: "日焼け止めスティック", description: "子供でも塗りやすいスティックタイプ。持ち運び便利。", reason: "こまめな日焼け対策" }
        ],
        school: [
          { item: "スポーツタオル", description: "吸水性抜群で速乾。運動や部活動に最適なサイズ。", reason: "学校での運動時に必要" },
          { item: "冷却スプレー", description: "瞬間冷却で火照った体をクールダウン。安全な成分。", reason: "運動後の体温調節" },
          { item: "UVカットアームカバー", description: "登下校時の腕の日焼け防止。着脱簡単。", reason: "長時間の屋外移動での保護" },
          { item: "保冷バッグ", description: "お弁当やドリンクを冷たく保つ。コンパクトサイズ。", reason: "暑い日の食品安全" },
          { item: "汗拭きシート", description: "外出先でも清潔に。敏感肌にも優しい成分。", reason: "清潔維持と快適性" }
        ]
      },
      cloudy: {
        toddler: [
          { item: "風車ピンホイール", description: "風で回る可愛い風車。散歩が楽しくなる。", reason: "曇りの日の外遊びを楽しく" },
          { item: "レインボーペンダント", description: "光の角度で虹色に光る安全なペンダント。", reason: "曇り空でも気分を明るく" },
          { item: "温度計付きキーホルダー", description: "気温がわかる小さな温度計。体温調節の目安に。", reason: "気温変化への意識向上" },
          { item: "くもり予報ステッカー", description: "今日の雲の形を記録できるシールブック。", reason: "天気への興味と観察力向上" },
          { item: "ふわふわマスコット", description: "雲のようにふわふわした手触りの小さなマスコット。", reason: "曇りの日のテーマに合わせた癒し" }
        ],
        preschool: [
          { item: "天気観察ノート", description: "毎日の天気を記録。雲の種類も学べる。", reason: "科学的思考と継続力の育成" },
          { item: "風向き観測器", description: "風の向きがわかる簡単な観測器具。", reason: "自然現象への理解促進" },
          { item: "カメラ型玩具", description: "雲や空の写真を撮る真似ができる。記録係気分。", reason: "観察力と記録する習慣づけ" },
          { item: "気圧変化ガジェット", description: "気圧の変化を色で教えてくれる小さな装置。", reason: "天気変化の予測能力向上" },
          { item: "雲柄スカーフ", description: "雲の模様が描かれた軽やかなスカーフ。", reason: "天気に合わせたファッション" }
        ],
        school: [
          { item: "気象観測キット", description: "湿度計、風向計等のミニ観測セット。自由研究にも。", reason: "科学への興味と学習サポート" },
          { item: "多機能コンパス", description: "方位磁針、温度計、拡大鏡が一体化。", reason: "アウトドア活動での実用性" },
          { item: "天気予測カード", description: "雲の形から天気を予測する学習カード。", reason: "観察力と予測力の向上" },
          { item: "折りたたみ座布団", description: "屋外で座る時に便利。防水加工済み。", reason: "外での活動時の快適性" },
          { item: "ノート用防湿ケース", description: "湿気から大切なノートや教科書を守る。", reason: "学用品の保護" }
        ]
      },
      rainy: {
        toddler: [
          { item: "レインボー傘チャーム", description: "傘に付ける可愛いチャーム。雨の日が楽しみに。", reason: "雨の日の気分を明るく" },
          { item: "水滴観察ルーペ", description: "雨粒を拡大して見られる子供用ルーペ。", reason: "雨への興味と科学的好奇心" },
          { item: "防水おもちゃポーチ", description: "濡れても大丈夫なおもちゃ入れ。透明で中身が見える。", reason: "雨の日でもおもちゃを安全に持参" },
          { item: "雨音楽器", description: "雨音に合わせて鳴らせる小さな楽器。", reason: "雨の日の音遊び" },
          { item: "反射テープアクセサリー", description: "光る反射材で作ったブレスレット。安全性向上。", reason: "雨の日の視認性確保" }
        ],
        preschool: [
          { item: "雨粒コレクター", description: "雨粒の大きさや形を観察できる透明容器。", reason: "雨に対する科学的興味" },
          { item: "長靴デコレーションシール", description: "長靴を可愛くデコレーションできる防水シール。", reason: "雨具を楽しいアイテムに変える" },
          { item: "雨の日日記", description: "防水カバー付きの雨の日専用日記帳。", reason: "雨の日の思い出作りと文字練習" },
          { item: "水たまりメジャー", description: "水たまりの深さを測れる目盛り付きスティック。", reason: "測定の概念と雨量への理解" },
          { item: "傘立てゲーム", description: "的に傘を入れるゲーム。雨宿り中の遊び。", reason: "雨の待ち時間を楽しく過ごす" }
        ],
        school: [
          { item: "雨量測定器", description: "実際に雨量を測定できる本格的な測定器。", reason: "理科学習の実践と数値化" },
          { item: "防水スマホケース", description: "雨の日でも安心してスマホを使える防水ケース。", reason: "現代生活での実用性" },
          { item: "雨の日学習セット", description: "雨の仕組みを学べる教材とワークブック。", reason: "天候への科学的理解促進" },
          { item: "濡れ物用袋", description: "濡れた服や靴を入れる防水バッグ。消臭効果付き。", reason: "衛生管理と整理整頓" },
          { item: "雨音集音器", description: "雨音を録音・再生できる小型機器。", reason: "音への感性と記録への興味" }
        ]
      },
      snowy: {
        toddler: [
          { item: "雪玉メーカー", description: "きれいな雪玉が簡単に作れる道具。手が冷たくならない。", reason: "雪遊びの楽しさ向上" },
          { item: "雪の結晶観察器", description: "雪の結晶を拡大して見られる簡単な観察器。", reason: "自然の美しさと科学への興味" },
          { item: "防寒ミトン", description: "雪遊び用の防水ミトン。紐付きで紛失防止。", reason: "雪遊び時の手の保護" },
          { item: "雪だるまキット", description: "雪だるま作りに必要な飾り用パーツセット。", reason: "創造性と雪遊びの充実" },
          { item: "足跡スタンプ", description: "雪の上に可愛い足跡を残せるスタンプ。", reason: "雪遊びの思い出作り" }
        ],
        preschool: [
          { item: "雪の科学実験セット", description: "雪の融点や結晶について学べる実験道具。", reason: "雪を通じた科学学習" },
          { item: "ソリ用安全ベルト", description: "ソリ遊び時の安全を確保するベルト。", reason: "雪遊びでの安全性向上" },
          { item: "雪像作成道具", description: "雪で彫刻を作るための安全な道具セット。", reason: "芸術性と創造力の発達" },
          { item: "雪合戦シールド", description: "雪合戦用の軽量な盾。安全で楽しい遊び。", reason: "アクティブな雪遊びの安全確保" },
          { item: "冬の動物観察カード", description: "雪の中で見られる動物の足跡カード。", reason: "自然観察と動物への興味" }
        ],
        school: [
          { item: "雪質測定器", description: "雪の密度や温度を測定できる本格機器。", reason: "科学的観測と学習の深化" },
          { item: "アイスクリート", description: "雪と氷でスケート場を作る道具セット。", reason: "冬季スポーツへの興味促進" },
          { item: "雪洞作成ガイド", description: "安全な雪洞の作り方を学べるガイドブック。", reason: "サバイバル技術と安全知識" },
          { item: "冬の星座観察器", description: "冬の澄んだ空の星座を観察する道具。", reason: "天体への興味と季節感" },
          { item: "雪上歩行器", description: "深い雪の上を歩くためのスノーシュー。", reason: "冬山でのアクティビティ" }
        ]
      }
    };

    // 基本的なアクセサリ（年齢別）
    const basicAccessories: { [key: string]: Array<{ item: string; description: string; reason: string }> } = {
      toddler: [
        { item: "名前入りリストバンド", description: "迷子防止に役立つ名前と連絡先入りのリストバンド。", reason: "安全性と身元確認のため" },
        { item: "お気に入りのぬいぐるみ", description: "小さいサイズで持ち運びやすい。不安な時の心の支えに。", reason: "情緒の安定と安心感のため" },
        { item: "カラフルヘアピン", description: "髪をまとめる可愛いヘアピン。誤飲しないサイズ。", reason: "身だしなみと安全性" },
        { item: "鈴付きシューズクリップ", description: "靴に付ける小さな鈴。迷子時の発見にも役立つ。", reason: "所在確認と楽しさ" },
        { item: "柔らかブレスレット", description: "肌に優しいシリコン製。アレルギー対応。", reason: "肌トラブル防止" }
      ],
      preschool: [
        { item: "腕時計型キッズウォッチ", description: "時間を覚える練習にも。親子で連絡取れる機能付きも。", reason: "時間管理の学習と安全確保" },
        { item: "ポシェット", description: "ハンカチやティッシュを自分で管理。斜めがけで紛失しにくい。", reason: "身の回りの物の管理練習" },
        { item: "集中力アップブレスレット", description: "気持ちを落ち着かせる効果のある色のブレスレット。", reason: "情緒安定と集中力向上" },
        { item: "友達作りバッジ", description: "話しかけやすくなる可愛いバッジ。交友関係促進。", reason: "社交性の発達" },
        { item: "学習ごほうびシール", description: "頑張った時に貼れるキラキラシール。", reason: "モチベーション向上" }
      ],
      school: [
        { item: "ランドセルカバー", description: "雨の日も安心。反射材付きで安全性もアップ。", reason: "ランドセルの保護と視認性向上" },
        { item: "移動ポケット", description: "制服にポケットがない時に便利。ハンカチとティッシュを携帯。", reason: "衛生用品の携帯に必要" },
        { item: "学習管理手帳", description: "宿題や予定を自分で管理。時間管理能力育成。", reason: "自己管理能力向上" },
        { item: "エルゴノミクス筆記具", description: "正しい持ち方をサポートするペンや鉛筆。", reason: "学習効率と姿勢改善" },
        { item: "防犯ブザー", description: "緊急時に大音量で周囲に知らせる。GPS機能付きも。", reason: "登下校時の安全確保" }
      ]
    };

    // 季節・天気に応じたアクセサリを追加
    const seasonalAccessories = weatherAccessories[condition]?.[ageGroup] || [];
    seasonalAccessories.forEach((acc: { item: string; description: string; reason: string }) => {
      accessories.push({
        id: id++,
        weatherConditionId: null,
        category: "accessories",
        item: acc.item,
        description: acc.description,
        reason: acc.reason
      });
    });

    // 基本アクセサリも追加（ランダムに2-3個選択）
    const basicItems = basicAccessories[ageGroup] || [];
    const shuffled = basicItems.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(3, shuffled.length));
    
    selected.forEach((acc: { item: string; description: string; reason: string }) => {
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

  private getTemperatureSpecificItems(weatherInput: WeatherInput, startId: number): ClothingRecommendation[] {
    const items: ClothingRecommendation[] = [];
    let id = startId;

    if (weatherInput.temperature > 30) {
      items.push({
        id: id++,
        weatherConditionId: null,
        category: "protection",
        item: "冷却タオル",
        description: "水で濡らすとひんやり冷たくなるタオル。首に巻いて体温調節。",
        reason: "猛暑での熱中症対策に必須"
      });
      items.push({
        id: id++,
        weatherConditionId: null,
        category: "accessories",
        item: "保冷剤入りポーチ",
        description: "首や脇の下に当てて体温を下げる。熱中症予防に効果的。",
        reason: "緊急時の体温低下対策"
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
      items.push({
        id: id++,
        weatherConditionId: null,
        category: "protection",
        item: "防風マスク",
        description: "顔や鼻を冷たい風から守る。呼吸も暖まります。",
        reason: "顔面の凍傷防止"
      });
    }

    return items;
  }
}