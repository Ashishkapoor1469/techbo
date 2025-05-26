"use server";
import { recommendContent, type RecommendContentInput, type RecommendContentOutput } from "@/ai/flows/recommend-content";

export async function getRecommendations(input: RecommendContentInput): Promise<RecommendContentOutput> {
  try {
    // Basic validation
    if (!input.searchQuery || input.searchQuery.trim() === "") {
      // Return empty recommendations if search query is empty, or throw specific error
      return { frameworkRecommendations: [], packageRecommendations: [] };
    }
    const result = await recommendContent(input);
    return result;
  } catch (error) {
    console.error("Error getting recommendations:", error);
    // Propagate a serializable error message
    throw new Error("Failed to get recommendations. Please try again.");
  }
}
