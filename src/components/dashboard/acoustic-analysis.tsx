"use client";

import { motion } from "framer-motion";
import { Mic } from "lucide-react";

export const AcousticAnalysis = () => {
    // Random bar heights for initial animation
    const bars = [40, 70, 30, 80, 50, 90, 40, 60, 30, 50, 45, 75];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 md:row-span-1 rounded-3xl border border-white/10 bg-[#1E293B]/40 backdrop-blur-xl p-6 relative overflow-hidden group hover:border-purple-500/30 transition-colors"
        >
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-all duration-700" />

            <div className="flex justify-between items-start mb-4 relative z-10">
                <h3 className="text-sm font-medium text-slate-400 group-hover:text-purple-200 transition-colors">Acoustic AI</h3>
                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                    <Mic className="w-5 h-5" />
                </div>
            </div>

            {/* Waveform Visualization */}
            <div className="flex items-center justify-between gap-1 h-16 mt-2 relative z-10 px-1">
                {bars.map((h, i) => (
                    <motion.div
                        key={i}
                        className="w-1.5 bg-gradient-to-t from-purple-600 to-purple-400 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                        animate={{
                            height: [h + "%", (h * 0.3) + "%", h + "%"],
                            opacity: [0.6, 1, 0.6]
                        }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: i * 0.08,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            <div className="mt-5 flex items-center justify-between relative z-10">
                <div className="px-2.5 py-1 bg-red-500/10 border border-red-500/20 rounded-md inline-flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
                    <span className="text-[10px] uppercase tracking-wide text-red-300 font-bold">Misfire Detected</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">92% CONFIDENCE</span>
            </div>
        </motion.div>
    );
};
