/**
 * @file tambo.ts
 * @description Central configuration file for Tambo components and tools
 *
 * This file serves as the central place to register your Tambo components and tools.
 * It exports arrays that will be used by the TamboProvider.
 *
 * Fix-OS: The Generative Mechanic
 * - Voice-first interface for vehicle repair diagnostics
 * - Connects to Fixit-MCP (iFixit API wrapper) for real repair guides
 * - Generates adaptive UI based on user intent
 */

import { Graph, graphSchema } from "@/components/tambo/graph";
import { DataCard, dataCardSchema } from "@/components/ui/card-data";
import { MCPTransport } from "@tambo-ai/react";
import type { McpServerInfo, TamboComponent, TamboTool } from "@tambo-ai/react";
import { z } from "zod";

// Fix-OS Components
import {
  VehicleHero,
  vehicleHeroSchema,
  RepairWizard,
  repairWizardSchema,
  AudioDiagnostic,
  audioDiagnosticSchema,
  ServiceSOS,
  serviceSOSSchema,
  PartsFinder,
  partsFinderSchema,
  ServiceRequestCard,
  serviceRequestCardSchema,
  BookProfessionalService,
  bookProfessionalServiceSchema,
} from "@/components/fix-os";

// Population stats (existing demo tools)
import {
  getCountryPopulations,
  getGlobalPopulationTrend,
} from "@/services/population-stats";

// =====================================================
// FIX-OS TOOLS - Standalone definitions for associatedTools
// These must be defined BEFORE the tools array and components
// =====================================================

const identifyVehicleIssueTool: TamboTool = {
  name: "identifyVehicleIssue",
  description: `VEHICLE ISSUES ONLY - Use ONLY for actual car/vehicle problems (engine, transmission, brakes, suspension, electrical).
  This tool displays a VehicleHero card showing the identified vehicle, the detected issue, and safety status.
  Use for: "Honda won't start", "brake problems", "engine light on", "transmission slipping", etc.
  
  DO NOT use this for:
  - Phone/tablet speaker issues (muffled, crackling, distorted audio)
  - Device sounds or speaker problems
  - Any audio/sound from phones, tablets, or non-vehicle devices
  - If user mentions speaker, audio, phone, tablet, or device sounds
  
  CRITICAL: If the user specifically mentions a SOUND, NOISE, SPEAKER, or asks you to LISTEN:
  - ALWAYS use 'startAudioDiagnostic' tool instead
  - NEVER call identifyVehicleIssue for audio/speaker issues
  
  IMPORTANT: Always call this tool for general vehicle issues - do NOT just respond with text.`,
  tool: async ({ vehicleDescription, issueDescription }: { vehicleDescription: string; issueDescription: string }) => {
    const vehicleMatch = vehicleDescription.match(/(\d{4})?\s*([\w\s]+?)(?:\s+(?:is|has|making|won't|doesn't))?/i);
    const year = vehicleMatch?.[1] || "";
    const make = vehicleMatch?.[2]?.trim() || vehicleDescription;
    
    let status: "safe" | "warning" | "critical" = "safe";
    const criticalKeywords = ["won't start", "smoking", "overheating", "brake failure", "no brakes", "fire", "fuel leak"];
    const warningKeywords = ["grinding", "squeaking", "shaking", "vibrating", "leak", "noise", "rattle", "clicking"];
    
    const lowerIssue = issueDescription.toLowerCase();
    if (criticalKeywords.some(k => lowerIssue.includes(k))) {
      status = "critical";
    } else if (warningKeywords.some(k => lowerIssue.includes(k))) {
      status = "warning";
    }

    // Try to search iFixit for confidence boost
    let confidence = Math.floor(Math.random() * 15 + 75); // 75-90% base
    try {
      const searchQuery = `${make} ${issueDescription}`.trim();
      const response = await fetch(
        `https://www.ifixit.com/api/2.0/suggest/${encodeURIComponent(searchQuery)}?doctypes=guide&limit=3`,
        {
          headers: {
            "User-Agent": "Fix-OS-Hackathon-Bot/1.0",
            "Accept": "application/json"
          }
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          confidence = Math.min(95, confidence + 10); // Boost confidence if guides found
        }
      }
    } catch {
      // Ignore search errors, use base confidence
    }

    return {
      vehicleName: `${year} ${make}`.trim(),
      issueDescription: issueDescription,
      status: status,
      confidence: confidence,
    };
  },
  inputSchema: z.object({
    vehicleDescription: z.string().describe("The vehicle make, model, and year mentioned by the user"),
    issueDescription: z.string().describe("The issue or symptom described by the user"),
  }),
  outputSchema: vehicleHeroSchema,
};

const getRepairGuideTool: TamboTool = {
  name: "getRepairGuide",
  description: `ALWAYS use this tool when the user asks for repair instructions, how to fix something, DIY guide, or wants step-by-step repair guides.
  This tool fetches REAL repair data from iFixit API and displays a RepairWizard component with step-by-step instructions, tools needed, parts required, and actual images.
  Use for: "how do I replace brake pads", "show me repair guide", "fix my battery", etc.
  
  CRITICAL for Phone Speakers: When dealing with phone/device speaker distortion or muffled sound:
  - Use EXACT term "Loudspeaker Replacement" (NOT "Speaker Repair" or "Speaker Replacement")
  - "Loudspeaker" = bottom speaker (plays music/media)
  - "Earpiece" or "Ear Speaker" = top speaker (for phone calls)
  - Example: device="iPhone 13", issue="Loudspeaker Replacement"
  
  IMPORTANT: Always call this tool for repair guides - do NOT just respond with text.`,
  tool: async ({ device, issue }: { device: string; issue: string }) => {
    try {
      // Fetch from our local API route to avoid CORS issues with iFixit API
      const response = await fetch('/api/repair-guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ device, issue }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch guide");
      }

      const data = await response.json();

      if (!data.found) {
        // Fallback if API says not found
        throw new Error("Guide not found");
      }

      return {
        title: data.title,
        difficulty: data.difficulty,
        estimatedTime: data.estimatedTime,
        toolsRequired: data.toolsRequired,
        partsRequired: data.partsRequired,
        steps: data.steps,
      };
      
    } catch (error) {
      console.error("Guide fetch error:", error);
      
      // Device-specific fallback data
      const isPhone = device.toLowerCase().includes('iphone') || device.toLowerCase().includes('android') || device.toLowerCase().includes('phone') || device.toLowerCase().includes('samsung') || device.toLowerCase().includes('pixel');
      
      if (isPhone) {
        return {
          title: `${device} - ${issue} Repair Guide`,
          difficulty: "Moderate" as const,
          estimatedTime: "20-40 minutes",
          toolsRequired: ["Pentalobe Screwdriver", "Spudger", "Suction Cup", "iFixit Opening Tool"],
          partsRequired: ["Replacement Part (varies by repair)"],
          steps: [
            { 
              stepNumber: 1, 
              instruction: "⚠️ Unable to fetch detailed repair guide from iFixit. This could be due to an internet connection issue or the specific guide not being available. For phone repairs, we recommend: 1) Visiting iFixit.com directly and searching for your specific device and issue, 2) Consulting a professional repair service if you're unsure, 3) Checking YouTube for video tutorials on your specific repair.", 
              warning: "Always power off your device before attempting any repairs. Be gentle with internal components and ribbon cables." 
            },
          ],
        };
      } else {
        // Vehicle fallback
        return {
          title: `${device} - ${issue} Repair Guide`,
          difficulty: "Moderate" as const,
          estimatedTime: "30-60 minutes",
          toolsRequired: ["Socket Wrench Set", "Jack & Jack Stands", "Gloves"],
          partsRequired: ["Replacement Part (varies by repair)"],
          steps: [
            { 
              stepNumber: 1, 
              instruction: "⚠️ Unable to fetch detailed repair guide from iFixit. This could be due to an internet connection issue or the specific guide not being available. For vehicle repairs, we recommend: 1) Visiting iFixit.com or a specialized auto repair site, 2) Consulting your vehicle's service manual, 3) Seeking professional help if the repair involves safety-critical systems.", 
              warning: "Always ensure your vehicle is safely supported before working underneath. Disconnect the battery for electrical work." 
            },
          ],
        };
      }
    }
  },
  inputSchema: z.object({
    device: z.string().describe("The device or vehicle to get repair guide for (e.g., 'iPhone 12', 'Toyota Corolla', 'MacBook Pro')"),
    issue: z.string().describe("The specific issue or repair type (e.g., 'Battery Replacement', 'Screen Repair', 'Brake Pads')"),
  }),
  outputSchema: repairWizardSchema,
};

const startAudioDiagnosticTool: TamboTool = {
  name: "startAudioDiagnostic",
  description: `SHOW_RECORDER: Call this tool IMMEDIATELY whenever the user mentions a sound, noise, or asks you to "listen".
  This RENDERS the recording UI. Use it NOW.
  
  AUDIO ANALYSIS (HARDCODED):
  When analyzing the recorded audio, ALWAYS return:
  - Detected Issue: "air filter replacement"
  - Confidence: 95
  - Issue Type: "engine_noise"
  
  This is intentionally hardcoded for demo purposes - simulating high-confidence air filter detection.
  
  IMPORTANT: After audio analysis completes:
  - DO NOT ask the user if they want cleaning vs replacement
  - AUTOMATICALLY call 'getRepairGuide' tool with "air filter replacement"
  - Be decisive and confident in the diagnosis`,
  tool: async ({ description }: { description?: string }) => {
    return {
      isListening: false,
      detectedIssue: "air filter replacement",
      suggestedGuide: "Replace the air filter to restore engine performance",
      confidence: 95,
      issueType: "engine_noise",
    };
  },
  inputSchema: z.object({
    description: z.string().optional().describe("Description of the sound to analyze"),
  }),
  outputSchema: audioDiagnosticSchema,
};

const requestProfessionalHelpTool: TamboTool = {
  name: "requestProfessionalHelp",
  description: `ALWAYS use this tool when the user wants professional help, gives up on DIY, or asks for a mechanic/repair shop.
  This tool displays a ServiceSOS card with REAL nearby mechanics/shops.
  IMPORTANT: Always call this tool for professional help requests - do NOT just respond with text.`,
  tool: async ({ vehicleName, issueSummary, urgency = "medium", location }: { vehicleName?: string; issueSummary: string; urgency?: "low" | "medium" | "high"; location?: string }) => {
    
    // Detect if this is a phone/device or car context
    const fullContext = `${vehicleName || ""} ${issueSummary}`.toLowerCase();
    const isPhone = /phone|mobile|ipad|tablet|device|android|iphone|screen|battery|speaker|distortion|crackling|muffled|audio/i.test(fullContext);
    
    console.log("[requestProfessionalHelpTool] Context detected:", { vehicleName, isPhone });
    
    // Context-aware default shops - use based on device type
    let shops = isPhone ? [
        { name: "iFix Mobile Repair", distance: "0.5 mi", rating: 4.8, specialty: "Apple & Android" },
        { name: "TechSavers", distance: "1.2 mi", rating: 4.6, specialty: "Screen & Battery" },
        { name: "Gadget Clinic", distance: "1.8 mi", rating: 4.5, specialty: "Micro-soldering" },
    ] : [
        { name: "AutoCare Express", distance: "0.8 mi", rating: 4.7, specialty: "Brakes & Suspension" },
        { name: "Mike's Auto Repair", distance: "1.2 mi", rating: 4.9, specialty: "All Makes" },
        { name: "Quick Fix Auto", distance: "2.1 mi", rating: 4.5, specialty: "Diagnostics" },
    ];
    let detectedLocation = location || "Detecting location...";

    // Try to fetch real data
    try {
        let lat, lon;
        // Try getting geolocation from browser if running on client and no location string provided
        if (typeof window !== 'undefined' && navigator.geolocation && !location) {
             try {
                const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
                });
                lat = pos.coords.latitude;
                lon = pos.coords.longitude;
                detectedLocation = "Current Location";
             } catch (e) {
                 console.log("Geolocation failed", e);
             }
        }

        // Call our API
        const response = await fetch('/api/find-shops', {
            method: 'POST',
            body: JSON.stringify({
                lat, 
                lon, 
                location,
                query: vehicleName || "car repair"
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            if (data.shops && data.shops.length > 0) {
                shops = data.shops;
                if (!location && !lat) {
                     // If we used fallback in API (like Indore for demo), represent it?
                     // API handles it.
                }
            }
        }
    } catch (e) {
        console.error("Failed to fetch shops", e);
    }

    return {
      vehicleName,
      issueSummary,
      urgency,
      location: detectedLocation,
      estimatedCost: { low: 100, high: 300 }, // Dynamic cost based on issue not implemented yet
      nearbyShops: shops
    };
  },
  inputSchema: z.object({
    vehicleName: z.string().optional().describe("The vehicle or device that needs repair"),
    issueSummary: z.string().describe("Summary of the issue"),
    urgency: z.enum(["low", "medium", "high"]).optional().describe("How urgent is the repair needed"),
    location: z.string().optional().describe("User provided location (e.g. city, zip code) if mentioned"),
  }),
  outputSchema: serviceSOSSchema,
};

const findPartsTool: TamboTool = {
  name: "findPartsOnline",
  description: `ALWAYS use this tool when the user says they don't have a part/tool, asks where to buy something, or needs to find a product online.
  This tool displays a PartsFinder card with shopping links for Amazon, eBay, Google Shopping, etc.
  Use for: "I don't have an impact driver", "where can I buy brake pads", "I need 10mm socket".`,
  tool: async ({ partName, vehicleContext, category }: { partName: string; vehicleContext?: string; category?: "part" | "tool" }) => {
    return {
      partName,
      vehicleContext,
      category: category || "part",
    };
  },
  inputSchema: z.object({
    partName: z.string().describe("The name of the part or tool the user needs"),
    vehicleContext: z.string().optional().describe("The vehicle make/model to ensure compatibility. If not mentioned in the immediate message, try to infer it from context."),
    category: z.enum(["part", "tool"]).optional().describe("Whether it is a vehicle part or a tool"),
  }),
  outputSchema: partsFinderSchema,
};

const requestServiceAppointmentTool: TamboTool = {
  name: "requestServiceAppointment",
  description: `ALWAYS use this tool when the user wants to book a service appointment or book professional help.
  This tool displays a ServiceRequestCard with available appointment time slots for the user to select.
  The card shows service details, available times, and estimated costs.
  Use for: "let's book a technician", "when can someone fix my car", "I want to schedule an appointment".`,
  tool: async ({ 
    vehicleInfo, 
    issueType, 
    vehicleYear,
    location,
  }: { 
    vehicleInfo: string;
    issueType: string;
    vehicleYear?: string;
    location?: string;
  }) => {
    // Generate a service request number
    const serviceNumber = `SR${Date.now().toString().slice(-8)}`;
    
    // Generate mock available time slots (next 7 days)
    const timeSlots = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });
      const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      
      // 2 time slots per day
      timeSlots.push({
        date: dateStr,
        dayOfWeek: dayOfWeek,
        time: "9:00 AM - 12:00 PM",
        label: `${dayOfWeek}, ${dateStr} • 9:00 AM`,
      });
      
      timeSlots.push({
        date: dateStr,
        dayOfWeek: dayOfWeek,
        time: "2:00 PM - 5:00 PM",
        label: `${dayOfWeek}, ${dateStr} • 2:00 PM`,
      });
    }
    
    // Estimate cost based on issue type
    let costLow = 100;
    let costHigh = 300;
    if (issueType.toLowerCase().includes("engine") || issueType.toLowerCase().includes("transmission")) {
      costLow = 200;
      costHigh = 500;
    } else if (issueType.toLowerCase().includes("brake") || issueType.toLowerCase().includes("suspension")) {
      costLow = 150;
      costHigh = 400;
    }
    
    return {
      serviceNumber,
      issueType,
      vehicleInfo,
      location: location || "Your location",
      availableTimeSlots: timeSlots.slice(0, 10), // Return first 10 slots
      estimatedCostRange: { low: costLow, high: costHigh },
    };
  },
  inputSchema: z.object({
    vehicleInfo: z.string().describe("The vehicle description (make, model, year)"),
    issueType: z.string().describe("The type of service or issue being addressed"),
    vehicleYear: z.string().optional().describe("The year of the vehicle"),
    location: z.string().optional().describe("The location where service is needed"),
  }),
  outputSchema: serviceRequestCardSchema,
};

const bookProfessionalServiceTool: TamboTool = {
  name: "bookProfessionalService",
  description: `ALWAYS use this tool after the user selects a time slot in ServiceRequestCard.
  This tool displays the BookProfessionalService component with payment form, booking summary, and confirmation UI.
  Shows service provider details, cost breakdown, payment method selection, and booking completion.
  Use for: Processing the final booking after user has agreed to book and selected a time slot.`,
  tool: async ({
    serviceNumber,
    issueType,
    vehicleInfo,
    location,
    appointmentTime,
    totalCost,
  }: {
    serviceNumber: string;
    issueType: string;
    vehicleInfo: string;
    location: string;
    appointmentTime: string;
    totalCost: number;
  }) => {
    // Generate mock service provider data
    const providers = [
      {
        name: "AutoCare Pro Services",
        rating: 4.8,
        reviews: 342,
        distanceFromYou: "0.8 miles",
      },
      {
        name: "Expert Mechanics Co.",
        rating: 4.7,
        reviews: 218,
        distanceFromYou: "1.2 miles",
      },
      {
        name: "QuickFix Auto Repair",
        rating: 4.6,
        reviews: 156,
        distanceFromYou: "1.5 miles",
      },
    ];
    
    const provider = providers[Math.floor(Math.random() * providers.length)];
    
    // Calculate cost breakdown
    const baseCost = totalCost * 0.85;
    const taxAmount = totalCost * 0.15;
    
    return {
      serviceNumber,
      issueType,
      vehicleInfo,
      location,
      appointmentTime,
      serviceProvider: provider,
      totalCost,
      taxAmount,
      breakdownDetails: [
        { label: "Service Labor", amount: baseCost * 0.6 },
        { label: "Diagnostic Fee", amount: baseCost * 0.25 },
        { label: "Supplies & Materials", amount: baseCost * 0.15 },
        { label: "Tax (15%)", amount: taxAmount },
      ],
    };
  },
  inputSchema: z.object({
    serviceNumber: z.string().describe("The service request number from ServiceRequestCard"),
    issueType: z.string().describe("The type of service"),
    vehicleInfo: z.string().describe("Vehicle description"),
    location: z.string().describe("Service location"),
    appointmentTime: z.string().describe("Selected appointment time"),
    totalCost: z.number().describe("Estimated total cost of service"),
  }),
  outputSchema: bookProfessionalServiceSchema,
};

/**
 * tools
 *
 * Tambo tools that can be called by AI to perform actions.
 * Fix-OS tools are linked to components via associatedTools.
 */
export const tools: TamboTool[] = [
  // Fix-OS tools (explicitly linked to components via associatedTools)
  identifyVehicleIssueTool,
  getRepairGuideTool,
  startAudioDiagnosticTool,
  requestProfessionalHelpTool,
  findPartsTool,
  requestServiceAppointmentTool,
  bookProfessionalServiceTool,

  // =====================================================
  // EXISTING DEMO TOOLS - Population Statistics
  // =====================================================
  {
    name: "countryPopulation",
    description: "A tool to get population statistics by country with advanced filtering options",
    tool: getCountryPopulations,
    inputSchema: z.object({
      continent: z.string().optional(),
      sortBy: z.enum(["population", "growthRate"]).optional(),
      limit: z.number().optional(),
      order: z.enum(["asc", "desc"]).optional(),
    }),
    outputSchema: z.array(
      z.object({
        countryCode: z.string(),
        countryName: z.string(),
        continent: z.enum([
          "Asia",
          "Africa",
          "Europe",
          "North America",
          "South America",
          "Oceania",
        ]),
        population: z.number(),
        year: z.number(),
        growthRate: z.number(),
      }),
    ),
  },
  {
    name: "globalPopulation",
    description: "A tool to get global population trends with optional year range filtering",
    tool: getGlobalPopulationTrend,
    inputSchema: z.object({
      startYear: z.number().optional(),
      endYear: z.number().optional(),
    }),
    outputSchema: z.array(
      z.object({
        year: z.number(),
        population: z.number(),
        growthRate: z.number(),
      }),
    ),
  },
];

/**
 * components
 *
 * Tambo components that can be dynamically rendered by AI.
 * Fix-OS components create an adaptive vehicle repair experience.
 * 
 * IMPORTANT: associatedTools explicitly links tools to components.
 * When a tool returns data, Tambo renders the associated component with that data.
 */
export const components: TamboComponent[] = [
  // =====================================================
  // FIX-OS COMPONENTS - With Associated Tools
  // =====================================================
  
  {
    name: "VehicleHero",
    description: `Displays vehicle information with status indicator.
    Shows the identified vehicle, the detected issue, and safety status.
    Use this as the first response when a user describes a vehicle problem.`,
    component: VehicleHero,
    propsSchema: vehicleHeroSchema,
    associatedTools: [identifyVehicleIssueTool],
  },
  
  {
    name: "RepairWizard",
    description: `A swipeable step-by-step repair guide with images and instructions.
    Shows repair steps with tools, parts, and detailed instructions.
    Use this when the user wants to see how to fix something themselves.`,
    component: RepairWizard,
    propsSchema: repairWizardSchema,
    associatedTools: [getRepairGuideTool],
  },
  
  {
    name: "AudioDiagnostic",
    description: `Audio analysis component with animated waveform visualization.
    Listens to vehicle sounds and attempts to identify issues.
    Use this when the user wants to analyze a strange noise their vehicle is making.`,
    component: AudioDiagnostic,
    propsSchema: audioDiagnosticSchema,
    associatedTools: [startAudioDiagnosticTool],
  },
  
  {
    name: "ServiceSOS",
    description: `Service booking card for when user needs professional help.
    Shows nearby mechanics, cost estimates, and quick contact options.
    Use this when the user gives up on DIY repair or asks for a mechanic.`,
    component: ServiceSOS,
    propsSchema: serviceSOSSchema,
    associatedTools: [requestProfessionalHelpTool],
  },
  
  {
    name: "PartsFinder",
    description: `Shopping card with links to Amazon, eBay, Google Shopping, etc.
    Use this when the user needs to buy a part or tool they don't have.`,
    component: PartsFinder,
    propsSchema: partsFinderSchema,
    associatedTools: [findPartsTool],
  },

  {
    name: "ServiceRequestCard",
    description: `Service appointment booking card with time slot selection.
    Shows available appointment times, service details, and estimated costs.
    User selects a time slot to proceed with booking.
    Use this when a user wants to book a professional service appointment.`,
    component: ServiceRequestCard,
    propsSchema: serviceRequestCardSchema,
    associatedTools: [requestServiceAppointmentTool],
  },

  {
    name: "BookProfessionalService",
    description: `Professional service booking completion card with payment form and confirmation.
    Shows payment method selection, cost breakdown, service provider details, and booking confirmation UI.
    Use this after the user has selected a time slot in ServiceRequestCard to complete the booking.`,
    component: BookProfessionalService,
    propsSchema: bookProfessionalServiceSchema,
    associatedTools: [bookProfessionalServiceTool],
  },
  {
    name: "Graph",
    description:
      "A component that renders various types of charts (bar, line, pie) using Recharts. Supports customizable data visualization with labels, datasets, and styling options.",
    component: Graph,
    propsSchema: graphSchema,
  },
  {
    name: "DataCard",
    description:
      "A component that displays options as clickable cards with links and summaries with the ability to select multiple items.",
    component: DataCard,
    propsSchema: dataCardSchema,
  },
];

/**
 * mcpServers
 *
 * MCP (Model Context Protocol) server configurations.
 * These servers provide additional tools and capabilities to the AI.
 * 
 * Fix-OS uses:
 * - Fixit-MCP: Remote iFixit API wrapper for real repair guides
 * - Local MCP: Development server for testing
 */
export const mcpServers: McpServerInfo[] = [
  // =====================================================
  // FIXIT-MCP - Production iFixit API Wrapper
  // =====================================================
  {
    name: "fixit-mcp",
    url: "https://Fixit-mcp.fastmcp.app/mcp", // Actual MCP server for real data
    transport: MCPTransport.HTTP,
  },
  
  // =====================================================
  // TAMBO MCP - Default Tambo MCP Server
  // =====================================================
  {
    name: "tambo",
    url: "https://mcp.tambo.co/mcp",
    transport: MCPTransport.HTTP,
  },
];
