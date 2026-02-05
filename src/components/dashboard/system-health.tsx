"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { SystemHealthData } from "@/data/dashboard-data";

export const SystemHealthCard = ({ data }: { data: SystemHealthData }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1 md:row-span-1 rounded-3xl border border-white/10 bg-[#1E293B]/40 backdrop-blur-xl p-6 flex flex-col justify-between hover:border-blue-500/30 transition-colors group"
        >
            <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium text-slate-400 group-hover:text-slate-200 transition-colors">System Health</h3>
                <div className="p-1.5 rounded-lg bg-green-500/10 text-green-400">
                    <Activity className="w-5 h-5" />
                </div>
            </div>

            <div className="flex items-end gap-3 mt-4">
                <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    {data.score}%
                </span>
                <span className="text-green-400 text-sm font-medium mb-1.5 px-1.5 py-0.5 rounded bg-green-500/10">
                    +{data.trend}%
                </span>
            </div>

            <div className="space-y-2 mt-4">
                <div className="flex justify-between text-[10px] text-slate-500 font-mono uppercase">
                    <span>Integrity</span>
                    <span>Optimal</span>
                </div>
                <div className="w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${data.score}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"
                    />
                </div>
            </div>
        </motion.div>
    );
};
