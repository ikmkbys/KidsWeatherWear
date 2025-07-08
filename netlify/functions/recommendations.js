// Enhanced clothing recommendations data
const clothingDatabase = {
  // 基本的な服装データベース
  getRecommendationsByWeatherAndAge: (condition, ageGroup) => {
    const baseRecommendations = {
      sunny: {
        toddler: [
          { id: 1, category: 'tops', item: '薄手の半袖Tシャツ', description: '綿100%の通気性の良い素材', reason: '日差しから肌を守りながら涼しく過ごせます' },
          { id: 2, category: 'bottoms', item: '薄手の短パン', description: '動きやすいストレッチ素材', reason: '活発な動きに対応し、暑さを軽減します' },
          { id: 3, category: 'shoes', item: '通気性の良いサンダル', description: 'つま先が守られた設計', reason: '足の蒸れを防ぎ、安全性も確保します' }
        ],
        preschool: [
          { id: 4, category: 'tops', item: '半袖ポロシャツ', description: 'UV加工済みの機能性素材', reason: '紫外線対策と快適性を両立します' },
          { id: 5, category: 'bottoms', item: '七分丈パンツ', description: '膝が隠れる長さで転倒時も安心', reason: '適度な保護と涼しさのバランスが取れています' },
          { id: 6, category: 'shoes', item: '運動靴', description: '通気性とクッション性を兼備', reason: '活発な遊びに適した機能性を持ちます' }
        ],
        school: [
          { id: 7, category: 'tops', item: 'ドライTシャツ', description: '吸汗速乾機能付き', reason: '汗をかいても快適性を維持します' },
          { id: 8, category: 'bottoms', item: 'ハーフパンツ', description: '動きやすいスポーツタイプ', reason: '運動時の快適さを重視した設計です' },
          { id: 9, category: 'shoes', item: 'スポーツシューズ', description: '軽量で通気性抜群', reason: '長時間の活動に適した機能性があります' }
        ]
      },
      cloudy: {
        toddler: [
          { id: 10, category: 'tops', item: '長袖薄手シャツ', description: '温度調節しやすい前開きタイプ', reason: '急な天気変化に対応できます' },
          { id: 11, category: 'bottoms', item: '長ズボン', description: '肌触りの良い綿混素材', reason: '肌の保護と動きやすさを両立します' },
          { id: 12, category: 'shoes', item: '歩きやすいスニーカー', description: 'クッション性の高いソール', reason: '長時間の歩行でも疲れにくいです' }
        ],
        preschool: [
          { id: 13, category: 'tops', item: '薄手のカーディガン', description: '脱ぎ着しやすいボタンタイプ', reason: '温度変化に柔軟に対応できます' },
          { id: 14, category: 'bottoms', item: 'ジーンズ', description: '動きやすいストレッチデニム', reason: '耐久性と快適性を兼ね備えています' },
          { id: 15, category: 'shoes', item: '運動靴', description: '滑りにくいソール設計', reason: '安全性を重視した設計です' }
        ],
        school: [
          { id: 16, category: 'tops', item: 'パーカー', description: 'フードが取り外し可能', reason: '天候に応じて調整できる機能性があります' },
          { id: 17, category: 'bottoms', item: 'チノパン', description: 'きれいめでも動きやすい', reason: '様々な場面に適応できます' },
          { id: 18, category: 'shoes', item: 'カジュアルシューズ', description: '歩きやすさと見た目を両立', reason: 'オールラウンドに活用できます' }
        ]
      },
      rainy: {
        toddler: [
          { id: 19, category: 'tops', item: '長袖シャツ', description: '速乾性のある素材', reason: '濡れても快適性を保ちます' },
          { id: 20, category: 'bottoms', item: '撥水加工パンツ', description: '水をはじく機能性素材', reason: '雨に濡れても乾きやすいです' },
          { id: 21, category: 'shoes', item: '長靴', description: '滑り止め付きの安全設計', reason: '濡れた路面でも安全に歩けます' }
        ],
        preschool: [
          { id: 22, category: 'tops', item: 'レインジャケット', description: '通気性のある防水素材', reason: '雨を防ぎながら蒸れを軽減します' },
          { id: 23, category: 'bottoms', item: '撥水パンツ', description: '動きやすい防水加工', reason: '雨の日でも活動的に過ごせます' },
          { id: 24, category: 'shoes', item: 'レインブーツ', description: '履きやすい設計', reason: '雨の日の外出を快適にします' }
        ],
        school: [
          { id: 25, category: 'tops', item: 'ウインドブレーカー', description: '軽量で防水性能が高い', reason: '雨風から身を守る機能性を持ちます' },
          { id: 26, category: 'bottoms', item: '防水パンツ', description: '透湿性のある高機能素材', reason: '雨の日でも快適に過ごせます' },
          { id: 27, category: 'shoes', item: '防水スニーカー', description: '普段使いもできるデザイン', reason: '雨の日でもスタイリッシュです' }
        ]
      },
      snowy: {
        toddler: [
          { id: 28, category: 'tops', item: '厚手の長袖シャツ', description: '保温性の高い裏起毛', reason: '寒さから体を守る保温効果があります' },
          { id: 29, category: 'bottoms', item: '防寒パンツ', description: '中綿入りの暖かい素材', reason: '下半身をしっかり保温します' },
          { id: 30, category: 'shoes', item: 'スノーブーツ', description: '滑り止めと保温機能付き', reason: '雪道でも安全に歩けます' }
        ],
        preschool: [
          { id: 31, category: 'tops', item: 'ダウンジャケット', description: '軽量で保温性抜群', reason: '動きやすさと暖かさを両立します' },
          { id: 32, category: 'bottoms', item: 'スノーパンツ', description: '防水・防風・保温機能', reason: '雪遊びに最適な機能性を持ちます' },
          { id: 33, category: 'shoes', item: 'ウィンターブーツ', description: '雪に強い防水設計', reason: '雪の日でも足を暖かく保ちます' }
        ],
        school: [
          { id: 34, category: 'tops', item: 'ウインタージャケット', description: '機能性とデザイン性を両立', reason: '寒い日でもスタイリッシュに過ごせます' },
          { id: 35, category: 'bottoms', item: '裏起毛パンツ', description: '暖かく動きやすい', reason: '寒さ対策と活動性を兼ね備えています' },
          { id: 36, category: 'shoes', item: '防寒シューズ', description: '保温性と防水性を両立', reason: '冬の外出を快適にします' }
        ]
      }
    };

    return baseRecommendations[condition]?.[ageGroup] || [];
  },

  // 天気と温度に基づく調整
  applyWeatherAdjustments: (recommendations, weatherInput) => {
    const { temperature, humidity, condition } = weatherInput;
    let adjustedRecommendations = [...recommendations];

    // 温度による調整
    if (temperature < 10) {
      adjustedRecommendations = adjustedRecommendations.map(item => ({
        ...item,
        reason: `${item.reason} 気温が低いため、保温性を重視しました。`
      }));
    } else if (temperature > 30) {
      adjustedRecommendations = adjustedRecommendations.map(item => ({
        ...item,
        reason: `${item.reason} 気温が高いため、涼しさを重視しました。`
      }));
    }

    // 湿度による調整
    if (humidity > 70) {
      adjustedRecommendations = adjustedRecommendations.map(item => ({
        ...item,
        reason: `${item.reason} 湿度が高いため、通気性を重視しました。`
      }));
    }

    return adjustedRecommendations;
  },

  // 追加アクセサリー
  getAdditionalAccessories: (condition, ageGroup, startId) => {
    const accessories = {
      sunny: [
        { id: startId, category: 'accessories', item: '帽子', description: 'UVカット機能付き', reason: '直射日光から頭部を守ります' },
        { id: startId + 1, category: 'accessories', item: '日焼け止め', description: 'SPF30以上推奨', reason: '紫外線から肌を保護します' },
        { id: startId + 2, category: 'accessories', item: '水筒', description: '保冷機能付き', reason: '熱中症予防のため水分補給が大切です' }
      ],
      cloudy: [
        { id: startId, category: 'accessories', item: '薄手の羽織り', description: '気温変化に対応', reason: '天候が変わりやすい時に調整できます' },
        { id: startId + 1, category: 'accessories', item: '小さなリュック', description: '必要な物を携帯', reason: '荷物の持ち運びに便利です' },
        { id: startId + 2, category: 'accessories', item: '絆創膏', description: '外遊び用の応急処置', reason: '怪我の応急処置に備えます' }
      ],
      rainy: [
        { id: startId, category: 'accessories', item: '傘', description: '風に強い子供用', reason: '雨から体を守る必需品です' },
        { id: startId + 1, category: 'accessories', item: 'レインハット', description: '頭部の防水対策', reason: '雨が顔にかからないよう保護します' },
        { id: startId + 2, category: 'accessories', item: 'タオル', description: '速乾性のあるマイクロファイバー', reason: '濡れた体や髪を拭くのに必要です' }
      ],
      snowy: [
        { id: startId, category: 'accessories', item: '手袋', description: '防水・保温機能付き', reason: '手の冷えと雪濡れを防ぎます' },
        { id: startId + 1, category: 'accessories', item: 'ニット帽', description: '耳まで覆える暖かい素材', reason: '頭部の保温は全身の暖かさに影響します' },
        { id: startId + 2, category: 'accessories', item: 'ネックウォーマー', description: '首元をしっかり保温', reason: '首の保温は風邪予防に効果的です' }
      ]
    };

    return accessories[condition] || [];
  }
};

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { weatherInput } = JSON.parse(event.body);
    const { temperature, humidity, condition, ageGroup } = weatherInput;

    // 基本的な服装推奨を取得
    let recommendations = clothingDatabase.getRecommendationsByWeatherAndAge(condition, ageGroup);
    
    // 天気に基づく調整を適用
    recommendations = clothingDatabase.applyWeatherAdjustments(recommendations, weatherInput);
    
    // 追加アクセサリーを取得
    const startId = recommendations.length > 0 ? Math.max(...recommendations.map(r => r.id)) + 1 : 1;
    const accessories = clothingDatabase.getAdditionalAccessories(condition, ageGroup, startId);
    
    // 最終的な推奨リストを作成
    const finalRecommendations = [...recommendations, ...accessories];

    const response = {
      weatherInput,
      recommendations: finalRecommendations,
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