import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { playgroundService } from "./playground-service";
import { weatherInputSchema, type WeatherInput, playgroundRequestSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get clothing recommendations based on weather input
  app.post("/api/recommendations", async (req, res) => {
    try {
      const weatherInput = weatherInputSchema.parse(req.body);
      const recommendations = await storage.getRecommendationsByWeather(weatherInput);
      
      res.json({
        weatherInput,
        recommendations,
        generatedAt: new Date().toISOString()
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Invalid weather input",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          message: "Internal server error"
        });
      }
    }
  });

  // Get current weather data based on geolocation
  app.post("/api/current-weather", async (req, res) => {
    try {
      const { latitude, longitude } = req.body;
      
      if (!latitude || !longitude) {
        return res.status(400).json({
          message: "緯度と経度が必要です"
        });
      }

      // Use Open-Meteo API (free, no API key required)
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`;
      
      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();
      
      if (!weatherResponse.ok) {
        throw new Error("天気データの取得に失敗しました");
      }

      // Map weather codes to our conditions
      const mapWeatherCode = (code: number): string => {
        if (code <= 1) return "sunny";      // Clear sky, mainly clear
        if (code <= 3) return "cloudy";     // Partly cloudy, overcast
        if (code <= 67) return "rainy";     // Various rain conditions
        if (code <= 86) return "snowy";     // Various snow conditions
        return "cloudy";                    // Default
      };

      const currentWeather = {
        temperature: Math.round(weatherData.current.temperature_2m),
        humidity: weatherData.current.relative_humidity_2m,
        condition: mapWeatherCode(weatherData.current.weather_code),
        location: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`
      };

      res.json(currentWeather);
    } catch (error) {
      console.error("Weather API error:", error);
      res.status(500).json({
        message: "天気情報の取得に失敗しました"
      });
    }
  });

  // Get playground recommendations based on weather and location
  app.post("/api/playgrounds", async (req, res) => {
    try {
      const validatedRequest = playgroundRequestSchema.parse(req.body);
      const recommendations = await playgroundService.getPlaygroundRecommendations(validatedRequest);
      
      res.json({
        playgroundRecommendations: recommendations,
        location: validatedRequest.location,
        weatherInput: validatedRequest.weatherInput,
        generatedAt: new Date().toISOString()
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          error: "Invalid request data",
          details: error.errors 
        });
      } else {
        console.error("Error getting playground recommendations:", error);
        res.status(500).json({ 
          error: "Failed to get playground recommendations" 
        });
      }
    }
  });

  // Get detailed playground information
  app.get("/api/playgrounds/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { lat, lng } = req.query;
      
      if (!lat || !lng) {
        return res.status(400).json({ error: "Location coordinates (lat, lng) are required" });
      }
      
      const userLocation = { 
        lat: parseFloat(lat as string), 
        lng: parseFloat(lng as string) 
      };
      
      const playground = await playgroundService.getDetailedPlaygroundInfo(id, userLocation);
      
      if (!playground) {
        return res.status(404).json({ error: "Playground not found" });
      }
      
      res.json(playground);
    } catch (error) {
      console.error("Error getting playground details:", error);
      res.status(500).json({ 
        error: "Failed to get playground details" 
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
