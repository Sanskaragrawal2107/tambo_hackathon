import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

/**
 * Audio Analysis API Route
 * Uses Gemini's multimodal capabilities to analyze sounds from phones and vehicles
 */

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// Phone and vehicle sound analysis prompt
const ANALYSIS_PROMPT = `You are an expert diagnostic AI specializing in identifying problems from audio recordings of phones and vehicles.

Analyze this audio recording and identify any issues. The audio could be from:
- Vehicles (cars, motorcycles, trucks)
- Mobile devices (phones, tablets - Android, iPhone)

First, determine WHAT is making the sound (phone or vehicle), then diagnose the problem.

Respond in this exact JSON format (no markdown, just raw JSON):
{
  "detected": true or false,
  "sourceType": "vehicle" | "phone" | "unknown",
  "sourceDetails": "Specific device identified (e.g., 'Android phone speaker', 'Car engine', 'iPhone earpiece')",
  "issueType": "grinding" | "squeaking" | "rattling" | "clicking" | "humming" | "muffled" | "distortion" | "buzzing" | "crackling" | "none",
  "issue": "Brief description of the detected issue",
  "confidence": number between 0-100,
  "severity": "low" | "medium" | "high",
  "suggestedGuide": "Name of the suggested repair guide",
  "details": "Detailed explanation of what you heard and why it indicates this issue",
  "urgency": "Brief statement about how urgently this should be addressed"
}

Common sounds and their sources:

VEHICLE SOUNDS:
- Grinding: Brake pads worn to metal, CV joint issues, transmission problems
- Squeaking: Belt issues, worn brake pads, suspension bushings
- Rattling: Loose heat shields, exhaust components, suspension
- Clicking: CV joint problems, worn bearings, valve train issues
- Humming: Wheel bearing issues, tire problems, differential

PHONE/TABLET SPEAKER ISSUES:
- Muffled: Speaker cone damage, debris blocking speaker, water damage
- Distortion: Blown speaker, loose connections, software issues
- Crackling: Damaged speaker membrane, dust/debris, loose wiring
- Buzzing: Electromagnetic interference, loose components, vibrating back panel

If no concerning sounds are detected, set "detected" to false and "issueType" to "none".

Be accurate and conservative - only report issues you can genuinely detect from the audio.`;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get("audio") as File | null;
    
    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    // Check if Gemini API key is configured
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY not configured");
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    // Convert audio file to base64
    const audioBuffer = await audioFile.arrayBuffer();
    const base64Audio = Buffer.from(audioBuffer).toString("base64");
    
    // Determine MIME type
    const mimeType = audioFile.type || "audio/webm";

    // Call Gemini API with audio
    const model = genAI.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Audio,
              },
            },
            {
              text: ANALYSIS_PROMPT,
            },
          ],
        },
      ],
    });

    const response = await model;
    const textResponse = response.text || "";
    
    // Parse the JSON response
    let analysisResult;
    try {
      // Clean up the response - remove markdown code blocks if present
      const cleanedResponse = textResponse
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      analysisResult = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", textResponse);
      // Return a fallback response
      analysisResult = {
        detected: false,
        issueType: "none",
        issue: "Could not analyze audio clearly",
        confidence: 0,
        severity: "low",
        suggestedGuide: "",
        details: "The audio analysis was inconclusive. Please try recording again with clearer audio.",
        urgency: "Try recording in a quieter environment",
      };
    }

    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error("Audio analysis error:", error);
    return NextResponse.json(
      { 
        error: "Failed to analyze audio",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
