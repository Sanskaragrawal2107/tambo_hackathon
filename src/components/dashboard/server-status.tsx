"use client";

import { motion } from "framer-motion";
import { Server } from "lucide-react";

export const ServerStatusCard = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-1 md:row-span-2 rounded-3xl border border-white/10 bg-[#1E293B]/40 backdrop-blur-xl p-6 flex flex-col hover:border-indigo-500/30 transition-colors group"
        >
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                    <Server className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-indigo-100">Fixit MCP</h3>
                    <p className="text-[10px] text-indigo-300/60 uppercase tracking-wider font-bold">v2.4.0 • STABLE</p>
                </div>
            </div>

            <div className="space-y-4 flex-1">
                <StatusRow label="Latency" value="12ms" good />
                <StatusRow label="Uptime" value="99.9%" good />
                <StatusRow label="Requests" value="842/m" />
                <StatusRow label="Error Rate" value="0.01%" good />
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
                <div className="flex justify-between items-center text-xs text-slate-400 mb-2 font-mono">
                    <span>SERVER LOAD</span>
                    <span>42%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "42%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-indigo-500 w-[42%] shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                    />
                </div>
            </div>
        </motion.div>
    );
};

function StatusRow({ label, value, good }: { label: string; value: string; good?: boolean }) {
    return (
        <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2 group/row hover:border-white/10 transition-colors">
            <span className="text-slate-400 group-hover/row:text-slate-200 transition-colors">{label}</span>
            <span className={`font-mono font-medium ${good ? 'text-green-400' : 'text-slate-200'}`}>{value}</span>
        </div>
    );
}
