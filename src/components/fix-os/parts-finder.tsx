
"use client";

import { z } from "zod";
import { ShoppingCart, ExternalLink, Search, Package } from "lucide-react";
import { motion } from "framer-motion";

export const partsFinderSchema = z.object({
  partName: z.string().describe("The name of the part or tool the user needs (e.g., '10mm Socket', 'Brake Pads')"),
  vehicleContext: z.string().optional().describe("The vehicle make/model to ensure compatibility (e.g., '2015 Honda Civic')"),
  category: z.enum(["part", "tool"]).optional().describe("Whether it is a vehicle part or a tool"),
});

export type PartsFinderProps = z.infer<typeof partsFinderSchema>;

export function PartsFinder({ partName, vehicleContext = "", category = "part" }: PartsFinderProps) {
  const searchTerm = `${vehicleContext} ${partName}`.trim();
  
  const marketplaces = [
    {
      name: "Amazon",
      url: `https://www.amazon.com/s?k=${encodeURIComponent(searchTerm)}`,
      color: "bg-amber-500",
      description: "Fast delivery & reviews"
    },
    {
      name: "eBay Motors",
      url: `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(searchTerm)}`,
      color: "bg-blue-600",
      description: "New & used parts"
    },
    {
      name: "Google Shopping",
      url: `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(searchTerm)}`,
      color: "bg-red-500",
      description: "Compare prices online"
    },
    {
      name: "RockAuto",
      url: `https://www.rockauto.com/en/partsearch/?parttype=${encodeURIComponent(partName)}&keywords=${encodeURIComponent(vehicleContext)}`,
      color: "bg-red-700",
      description: "Low prices on auto parts"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            {category === 'tool' ? (
              <WrenchIcon className="w-5 h-5 text-blue-600" />
            ) : (
              <Package className="w-5 h-5 text-blue-600" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Need {partName}?
            </h3>
            <p className="text-sm text-gray-500">
              Find compatible options for {vehicleContext || "your vehicle"}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {marketplaces.map((market) => (
            <a
              key={market.name}
              href={market.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${market.color}`} />
                <div>
                  <span className="font-semibold text-gray-900 block group-hover:text-blue-600">
                    {market.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {market.description}
                  </span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
            </a>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Search className="w-3 h-3" />
          <span>Searching: <strong>{searchTerm}</strong></span>
        </div>
      </div>
    </motion.div>
  );
}

function WrenchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}
