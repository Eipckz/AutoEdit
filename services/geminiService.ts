import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { Segment, RawSegmentSuggestion } from '../types';

// Ensure API_KEY is handled as per instructions (from process.env)
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API_KEY environment variable is not set. Gemini API calls will fail.");
  // alert("API_KEY environment variable is not set. Please configure it to use AI features.");
}
const ai = new GoogleGenAI({ apiKey: apiKey || "MISSING_API_KEY" }); // Provide a fallback for type safety if key is missing

export async function analyzeTranscriptForSegments(transcript: string): Promise<Segment[]> {
  if (!apiKey) {
    throw new Error("Gemini API key is not configured.");
  }
  
  const model = "gemini-2.5-flash-preview-04-17";
  const prompt = `
    Analyze the following video transcript and identify up to 5 distinct, engaging segments that would make good short clips (like TikToks or YouTube Shorts). 
    For each segment, provide:
    1. A concise 'title' (3-7 words).
    2. A 'startCue' (a short phrase of 3-5 words from the transcript that clearly marks the beginning of the segment).
    3. An 'endCue' (a short phrase of 3-5 words from the transcript that clearly marks the end of the segment).

    The transcript is:
    ---
    ${transcript}
    ---

    Return the output as a JSON array of objects. Each object should have 'title', 'startCue', and 'endCue' keys.
    For example: 
    [
      {"title": "Exciting Product Introduction", "startCue": "Today, I'm thrilled to", "endCue": "check this out!"},
      {"title": "Key Feature Explained", "startCue": "One of the best things", "endCue": "truly revolutionary."}
    ]
    Ensure the JSON is valid. If no clear segments are found, return an empty array.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.5, // Slightly creative but still factual for cues
      }
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    const parsedData: RawSegmentSuggestion[] = JSON.parse(jsonStr);

    if (!Array.isArray(parsedData)) {
        console.warn("Gemini response was not an array:", parsedData);
        return [];
    }

    return parsedData.map((item, index) => ({
      id: `segment-${Date.now()}-${index}`,
      title: item.title || `Untitled Segment ${index + 1}`,
      startCue: item.startCue || "N/A",
      endCue: item.endCue || "N/A",
    }));

  } catch (error) {
    console.error("Error calling Gemini API or parsing response:", error);
    let errorMessage = "Failed to get segments from AI.";
    if (error instanceof Error) {
        errorMessage += ` Details: ${error.message}`;
    }
    // Check for specific Gemini errors if library provides them, or http status codes
    // For now, a generic message.
    throw new Error(errorMessage);
  }
}