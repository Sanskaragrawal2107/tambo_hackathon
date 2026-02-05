"use client";

import { motion } from "framer-motion";
import { TelemetricLog } from "@/data/dashboard-data";

export const TelemetryFeed = ({ logs }: { logs: TelemetricLog[] }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 md:row-span-1 rounded-3xl border border-white/10 bg-[#0F172A]/80 backdrop-blur-xl p-6 relative overflow-hidden flex flex-col group hover:border-blue-500/20 transition-colors"
        >
            <div className="flex items-center justify-between mb-4 z-10">
                <h3 className="text-sm font-medium text-slate-400 font-mono tracking-wider flex items-center gap-2">
                    <span className="text-blue-500">❯</span> LIVE TELEMETRY
                </h3>
                <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-[ping_2s_linear_infinite]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                </div>
            </div>

            <div className="flex-1 overflow-hidden relative font-mono text-[11px] text-blue-200/70 leading-relaxed selection:bg-blue-500/30">
                {/* Fade Gradients */}
                <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[#0F172A] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-[#0F172A] to-transparent z-10 pointer-events-none" />

                {/* Scroller */}
                <div className="absolute inset-0 overflow-y-auto pr-2 space-y-1.5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {logs.map((log) => (
                        <div key={log.id} className="flex gap-3 hover:bg-white/5 px-2 py-0.5 rounded transition-colors cursor-default">
                            <span className="text-slate-500/60 select-none">[{log.timestamp}]</span>
                            <span className={`font-bold ${log.status === 'warning' ? 'text-yellow-500' :
                                    log.status === 'critical' ? 'text-red-500' : 'text-blue-400'
                                }`}>
                                {log.system}:
                            </span>
                            <span className={log.status === 'warning' ? 'text-yellow-200/80' : ''}>
                                {log.message}
                            </span>
                        </div>
                    ))}
                    {/* Infinite Scroll Illusion Duplicates */}
                    {logs.map((log) => (
                        <div key={`${log.id}-dup`} className="flex gap-3 px-2 py-0.5 opacity-50">
                            <span className="text-slate-500/60">[{log.timestamp}]</span>
                            <span className="text-blue-400/50">{log.system}:</span>
                            <span>{log.message}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};
