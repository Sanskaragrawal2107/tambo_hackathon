"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Play } from "lucide-react";
import { LANDING_DATA } from "@/data/landing-data";

export const HeroSection = ({ onConnect }: { onConnect: () => void }) => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-50/50 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Left Content */}
                    <div className="flex-1 max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide mb-8"
                        >
                            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                            {LANDING_DATA.hero.badge}
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight"
                            dangerouslySetInnerHTML={{ __html: LANDING_DATA.hero.title }}
                        />

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-slate-500 mb-10 leading-relaxed max-w-lg"
                        >
                            {LANDING_DATA.hero.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <button
                                onClick={onConnect}
                                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-blue-600/20 flex items-center justify-center gap-2 group"
                            >
                                {LANDING_DATA.hero.ctaPrimary}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-8 py-4 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold rounded-xl transition-all hover:bg-slate-50 flex items-center justify-center gap-2">
                                {LANDING_DATA.hero.ctaSecondary}
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-12 flex items-center gap-6 text-sm text-slate-500"
                        >
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                                ))}
                            </div>
                            <p>Trusted by <span className="font-bold text-slate-900">10,000+</span> DIY Mechanics</p>
                        </motion.div>
                    </div>

                    {/* Right Visual (Interactive Graphic) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex-1 w-full max-w-xl lg:max-w-none"
                    >
                        <div className="relative rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden aspect-[4/3] group">
                            {/* UI Mockup Header */}
                            <div className="h-12 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                    <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-400/80" />
                                </div>
                                <div className="ml-4 w-60 h-6 bg-white rounded-md border border-slate-200/50" />
                            </div>

                            {/* UI Mockup Body */}
                            <div className="p-8 bg-slate-50/30 h-full relative">
                                <div className="absolute inset-x-8 top-20 bottom-8 bg-white rounded-xl shadow-lg border border-slate-100 p-6 flex flex-col">
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <div className="w-32 h-6 bg-slate-100 rounded mb-2" />
                                            <div className="w-48 h-4 bg-slate-50 rounded" />
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                            <Play className="w-5 h-5 fill-current" />
                                        </div>
                                    </div>

                                    {/* Animated Chart */}
                                    <div className="flex-1 flex items-end gap-2 px-4 pb-4 border-b border-slate-100 relative">
                                        {[40, 70, 35, 80, 50, 90, 60].map((h, i) => (
                                            <motion.div
                                                key={i}
                                                className="bg-blue-500 w-full rounded-t-sm opacity-80"
                                                initial={{ height: 0 }}
                                                animate={{ height: `${h}%` }}
                                                transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                            />
                                        ))}

                                        {/* Status Overlay */}
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 1.5 }}
                                            className="absolute bottom-12 left-8 bg-white shadow-xl rounded-lg p-3 border border-slate-100 flex items-center gap-3"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                                <CheckCircle className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-slate-800">System Log</div>
                                                <div className="text-[10px] text-slate-500">All metrics optimal</div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
