"use client";

import { motion } from "framer-motion";
import { Car } from "lucide-react";

export const NeuralMap = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#1E293B]/40 backdrop-blur-xl p-8 flex flex-col items-center justify-center shadow-lg hover:shadow-blue-900/10 transition-shadow"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Header Label */}
            <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                    <Car className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold tracking-wide text-sm uppercase text-blue-200/90">Neural Map</span>
                    <span className="text-[10px] text-blue-400/60 font-mono tracking-wider">LIVE CHASSIS SCAN</span>
                </div>
            </div>

            {/* 3D Visualizer Placeholder */}
            <div className="relative w-full h-full flex items-center justify-center my-4">
                {/* Radar Effect Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent blur-2xl" />

                {/* Rotating Mesh Ring */}
                <div className="absolute w-[80%] h-[80%] border border-dashed border-blue-500/10 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute w-[60%] h-[60%] border border-dotted border-blue-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                {/* Abstract Car Representation */}
                <div className="relative w-64 h-32 md:w-96 md:h-48 border border-blue-500/30 bg-blue-500/5 rounded-full flex items-center justify-center backdrop-blur-sm animate-[pulse_4s_ease-in-out_infinite]">
                    {/* Scanning Beam */}
                    <div className="absolute top-0 bottom-0 w-1 bg-blue-400/50 shadow-[0_0_15px_rgba(56,189,248,0.8)] animate-[scan_3s_ease-in-out_infinite]" style={{ left: '0%' }} />

                    <span className="text-blue-400 font-mono text-xs tracking-[0.2em] z-10 drop-shadow-[0_0_5px_rgba(56,189,248,0.5)]">
                        ANALYZING GEOMETRY...
                    </span>
                </div>

                {/* Active Hotspot Warning */}
                <motion.div
                    className="absolute top-[40%] right-[30%] w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)] z-20 cursor-pointer"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    whileHover={{ scale: 2 }}
                >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-500/90 text-white text-[10px] px-2 py-0.5 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                        Sensor Error (Code: E-401)
                    </div>
                </motion.div>
            </div>

            {/* Footer Metrics */}
            <div className="absolute bottom-6 w-full px-8 flex justify-between text-xs font-mono text-slate-400/80 border-t border-white/5 pt-4">
                <div className="flex gap-4">
                    <span>ID: <span className="text-slate-200">V-8842-X</span></span>
                    <span>LATENCY: <span className="text-green-400">12ms</span></span>
                </div>
                <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    CONNECTED
                </span>
            </div>
        </motion.div>
    );
};
