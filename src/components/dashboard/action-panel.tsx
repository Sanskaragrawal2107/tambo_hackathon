"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Zap, Shield, Wrench } from "lucide-react";
import { QuickAction, QUICK_ACTIONS } from "@/data/dashboard-data";

export const ActionPanel = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="md:col-span-1 md:row-span-1 rounded-3xl border border-white/10 bg-[#1E293B]/40 backdrop-blur-xl p-6 flex flex-col justify-center gap-3"
        >
            <h3 className="text-sm font-medium text-slate-400 mb-1 ml-1">Quick Actions</h3>

            {QUICK_ACTIONS.map((action) => (
                <ActionButton key={action.id} action={action} />
            ))}

            <button className="flex items-center gap-3 w-full p-2.5 rounded-xl bg-slate-800/30 hover:bg-slate-700/50 border border-white/5 hover:border-white/10 transition-all group">
                <div className="p-1.5 rounded-lg bg-slate-500/10 group-hover:bg-slate-500/20 text-slate-400">
                    <Wrench className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-slate-400 group-hover:text-slate-300">Diagnostics</span>
            </button>
        </motion.div>
    );
};

function ActionButton({ action }: { action: QuickAction }) {
    const isDanger = action.type === 'danger';
    const isPrimary = action.type === 'primary';

    const Icon = action.icon === 'alert' ? AlertTriangle :
        action.icon === 'zap' ? Zap : Shield;

    return (
        <button className={`flex items-center gap-3 w-full p-2.5 rounded-xl border transition-all group active:scale-95 ${isDanger
                ? 'bg-red-500/10 border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 text-red-200'
                : isPrimary
                    ? 'bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/40 text-blue-200'
                    : 'bg-slate-800/50 border-white/5 hover:border-white/20'
            }`}>
            <div className={`p-1.5 rounded-lg ${isDanger ? 'bg-red-500/20 text-red-400' :
                    isPrimary ? 'bg-blue-500/20 text-blue-400' :
                        'bg-slate-600/20 text-slate-400'
                } group-hover:scale-110 transition-transform`}>
                <Icon className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">{action.label}</span>
        </button>
    );
}
