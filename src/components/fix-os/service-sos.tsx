"use client";

import { cn } from "@/lib/utils";
import { Phone, MapPin, Clock, DollarSign, Wrench, Truck, Star, Navigation, MessageCircle } from "lucide-react";
import { z } from "zod";
import { motion } from "framer-motion";

/**
 * Schema for ServiceSOS props - used by Tambo for generative UI
 */
export const serviceSOSSchema = z.object({
  location: z.string().optional().describe("Current location or address for service"),
  issueSummary: z.string().describe("Summary of the vehicle issue to pass to the mechanic"),
  vehicleName: z.string().optional().describe("Name of the vehicle needing service"),
  estimatedCost: z.object({
    low: z.number().describe("Low end of cost estimate"),
    high: z.number().describe("High end of cost estimate"),
  }).optional().describe("Estimated cost range for the repair"),
  nearbyShops: z.array(z.object({
    name: z.string().describe("Shop name"),
    distance: z.string().describe("Distance from current location"),
    rating: z.number().describe("Shop rating out of 5"),
    specialty: z.string().optional().describe("Shop specialty (e.g., 'Brakes & Suspension')"),
  })).optional().describe("List of nearby repair shops"),
  urgency: z.enum(["low", "medium", "high"]).default("medium").describe("Urgency level of the repair"),
});

export type ServiceSOSProps = z.infer<typeof serviceSOSSchema>;

/**
 * ServiceSOS Component
 * 
 * Service booking card that appears when user gives up on DIY repair.
 * Shows nearby mechanics, cost estimates, and quick action buttons.
 * Passes context (vehicle + issue) to the service provider.
 */
export function ServiceSOS({
  location = "Detecting location...",
  issueSummary,
  vehicleName,
  estimatedCost,
  nearbyShops = [],
  urgency = "medium",
}: ServiceSOSProps) {
  const urgencyConfig = {
    low: {
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      label: "Can Wait",
    },
    medium: {
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      label: "Soon",
    },
    high: {
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      label: "Urgent",
    },
  };

  const config = urgencyConfig[urgency];

  // Default shops if none provided
  const shops = nearbyShops.length > 0 ? nearbyShops : [
    { name: "AutoCare Express", distance: "0.8 mi", rating: 4.7, specialty: "Brakes & Suspension" },
    { name: "Mike's Auto Repair", distance: "1.2 mi", rating: 4.9, specialty: "All Makes" },
    { name: "Quick Fix Auto", distance: "2.1 mi", rating: 4.5, specialty: "Diagnostics" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 shadow-2xl"
    >
      {/* Header with Emergency Banner */}
      <div className={cn("p-4 border-b", config.border, config.bg)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Truck className={cn("w-5 h-5", config.color)} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Get Professional Help</h2>
              <p className="text-sm text-zinc-400">We'll connect you with local mechanics</p>
            </div>
          </div>
          <span className={cn("text-xs px-3 py-1 rounded-full font-semibold", config.bg, config.color, config.border, "border")}>
            {config.label}
          </span>
        </div>
      </div>

      {/* Issue Context Card */}
      <div className="p-6 border-b border-zinc-700">
        <div className="bg-zinc-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Wrench className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              {vehicleName && (
                <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">Vehicle</p>
              )}
              {vehicleName && (
                <p className="font-semibold text-white mb-2">{vehicleName}</p>
              )}
              <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">Issue</p>
              <p className="text-zinc-300">{issueSummary}</p>
            </div>
          </div>
        </div>

        {/* Location & Cost */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-zinc-800/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <p className="text-xs text-zinc-500 uppercase tracking-wide">Location</p>
            </div>
            <p className="text-sm text-white truncate">{location}</p>
          </div>
          
          {estimatedCost && (
            <div className="bg-zinc-800/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-green-400" />
                <p className="text-xs text-zinc-500 uppercase tracking-wide">Est. Cost</p>
              </div>
              <p className="text-sm text-white">
                ${estimatedCost.low} - ${estimatedCost.high}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Nearby Shops */}
      <div className="p-6 border-b border-zinc-700">
        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">
          Nearby Shops
        </h3>
        <div className="space-y-3">
          {shops.map((shop, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-xl transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {shop.name}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Navigation className="w-3 h-3" />
                      {shop.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400" />
                      {shop.rating}
                    </span>
                    {shop.specialty && (
                      <span className="text-zinc-600">• {shop.specialty}</span>
                    )}
                  </div>
                </div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-2 rounded-lg transition-all">
                Book
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
            <Phone className="w-5 h-5" />
            Call Shop
          </button>
          <button className="bg-zinc-700 hover:bg-zinc-600 text-white py-4 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Message
          </button>
        </div>
        
        {urgency === "high" && (
          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-4 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
            <Truck className="w-5 h-5" />
            Request Tow Truck
          </button>
        )}

        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-zinc-500">
          <Clock className="w-3 h-3" />
          <span>Average wait time: 15-30 minutes</span>
        </div>
      </div>
    </motion.div>
  );
}
