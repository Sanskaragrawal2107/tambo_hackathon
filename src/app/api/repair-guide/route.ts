
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { device, issue } = await request.json();

    if (!device || !issue) {
      return NextResponse.json(
        { error: "Device and issue are required" },
        { status: 400 }
      );
    }

    // Step 1: Search for relevant guides on iFixit
    const searchQuery = `${device} ${issue}`.trim();
    const searchResponse = await fetch(
      `https://www.ifixit.com/api/2.0/suggest/${encodeURIComponent(searchQuery)}?doctypes=guide&limit=5`,
      {
        headers: {
          "User-Agent": "Fix-OS-Hackathon-Bot/1.0 (student-project)",
          "Accept": "application/json"
        }
      }
    );
    
    if (!searchResponse.ok) {
      throw new Error(`iFixit search failed: ${searchResponse.statusText}`);
    }
    
    const searchData = await searchResponse.json();
    const results = searchData.results || [];
    
    if (results.length === 0) {
      return NextResponse.json({ found: false, message: "No guides found" });
    }
    
    // Get the best guide ID
    // Prioritize exact matches if possible, but taking the first is usually fine for specifics
    let guideId = results[0].guideid;
    if (!guideId && results[0].url) {
      const parts = results[0].url.split('/');
      guideId = parts[parts.length - 1];
    }
    
    if (!guideId) {
      throw new Error("Could not extract guide ID from search results");
    }
    
    // Step 2: Fetch the full guide details
    const guideResponse = await fetch(
      `https://www.ifixit.com/api/2.0/guides/${guideId}`,
      {
        headers: {
          "User-Agent": "Fix-OS-Hackathon-Bot/1.0 (student-project)",
          "Accept": "application/json"
        }
      }
    );
    
    if (!guideResponse.ok) {
      throw new Error(`iFixit guide fetch failed: ${guideResponse.statusText}`);
    }
    
    const guideData = await guideResponse.json();
    
    // Map difficulty levels
    const difficultyMap: Record<string, "Easy" | "Moderate" | "Difficult" | "Very Difficult"> = {
      "Very easy": "Easy",
      "Easy": "Easy", 
      "Moderate": "Moderate",
      "Difficult": "Difficult",
      "Very difficult": "Very Difficult",
    };
    
    // Helper to get image URL
    // iFixit images key: 'image' object with 'standard', 'medium', etc on the step lines sometimes?
    // Actually guideData.steps[].media.data[].standard is correct from previous experience
    
    const formattedData = {
      found: true,
      title: guideData.title || `${device} - ${issue} Repair Guide`,
      difficulty: difficultyMap[guideData.difficulty] || "Moderate",
      estimatedTime: guideData.time_required || "30-45 minutes",
      toolsRequired: (guideData.tools || []).map((t: any) => t.text),
      partsRequired: (guideData.parts || []).map((p: any) => p.text),
      steps: (guideData.steps || []).map((s: any, index: number) => ({
        stepNumber: s.orderby || index + 1,
        instruction: (s.lines || []).map((l: any) => l.text_raw).join(" "),
        imageUrl: s.media?.data?.[0]?.standard || s.media?.data?.[0]?.original || undefined,
        warning: undefined,
      })),
    };

    return NextResponse.json(formattedData);

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { 
        found: false,
        error: "Failed to fetch repair guide from iFixit",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
