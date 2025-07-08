exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { latitude, longitude } = JSON.parse(event.body);
    
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,precipitation,weathercode&timezone=Asia/Tokyo`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error('天気APIからのデータ取得に失敗しました');
    }
    
    const current = data.current_weather;
    const hourly = data.hourly;
    
    // 現在時刻のインデックスを取得
    const currentTimeIndex = hourly.time.findIndex(time => 
      new Date(time).getHours() === new Date().getHours()
    );
    
    const humidity = currentTimeIndex >= 0 ? hourly.relativehumidity_2m[currentTimeIndex] : 60;
    const precipitation = currentTimeIndex >= 0 ? hourly.precipitation[currentTimeIndex] : 0;
    
    // 天気コードを条件に変換
    let condition = 'sunny';
    if (precipitation > 0) {
      condition = 'rainy';
    } else if (current.weathercode >= 71 && current.weathercode <= 77) {
      condition = 'snowy';
    } else if (current.weathercode >= 1 && current.weathercode <= 3) {
      condition = 'cloudy';
    }
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      },
      body: JSON.stringify({
        temperature: Math.round(current.temperature),
        humidity: Math.round(humidity),
        condition: condition
      })
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};