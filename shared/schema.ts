import { pgTable, text, serial, integer, boolean, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const weatherConditions = pgTable("weather_conditions", {
  id: serial("id").primaryKey(),
  temperature: real("temperature").notNull(),
  humidity: integer("humidity").notNull(),
  condition: text("condition").notNull(), // sunny, cloudy, rainy, snowy
  ageGroup: text("age_group").notNull(), // toddler, preschool, school
});

export const clothingRecommendations = pgTable("clothing_recommendations", {
  id: serial("id").primaryKey(),
  weatherConditionId: integer("weather_condition_id").references(() => weatherConditions.id),
  category: text("category").notNull(), // tops, bottoms, shoes, accessories, protection
  item: text("item").notNull(),
  description: text("description").notNull(),
  reason: text("reason").notNull(),
});

export const insertWeatherConditionSchema = createInsertSchema(weatherConditions).omit({
  id: true,
});

export const insertClothingRecommendationSchema = createInsertSchema(clothingRecommendations).omit({
  id: true,
});

export type WeatherCondition = typeof weatherConditions.$inferSelect;
export type InsertWeatherCondition = z.infer<typeof insertWeatherConditionSchema>;
export type ClothingRecommendation = typeof clothingRecommendations.$inferSelect;
export type InsertClothingRecommendation = z.infer<typeof insertClothingRecommendationSchema>;

// Weather input schema for API
export const weatherInputSchema = z.object({
  temperature: z.number().min(-50).max(50),
  humidity: z.number().min(0).max(100),
  condition: z.enum(["sunny", "cloudy", "rainy", "snowy"]),
  ageGroup: z.enum(["toddler", "preschool", "school"]),
});

export type WeatherInput = z.infer<typeof weatherInputSchema>;

// 遊び場所の推奨情報スキーマ
export const playgroundRecommendationSchema = z.object({
  id: z.string(),
  name: z.string(),
  officialName: z.string(),
  category: z.enum(["indoor", "outdoor", "covered", "water", "educational", "adventure"]),
  description: z.string(),
  weatherSuitability: z.object({
    sunny: z.number().min(0).max(10),
    cloudy: z.number().min(0).max(10),
    rainy: z.number().min(0).max(10),
    snowy: z.number().min(0).max(10)
  }),
  ageGroups: z.array(z.enum(["toddler", "preschool", "school"])),
  features: z.array(z.string()),
  safetyNotes: z.array(z.string()),
  weatherScore: z.number().optional(),
  distance: z.number().optional(),
  estimatedDuration: z.string(),
  cost: z.enum(["free", "low", "medium", "high"]),
  googleMapsUrl: z.string().optional(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number()
  }).optional()
});

export type PlaygroundRecommendation = z.infer<typeof playgroundRecommendationSchema>;

export const playgroundRequestSchema = z.object({
  weatherInput: weatherInputSchema,
  location: z.object({
    lat: z.number(),
    lng: z.number()
  }),
  radius: z.number().min(1).max(50).default(10) // km単位
});

export type PlaygroundRequest = z.infer<typeof playgroundRequestSchema>;
