"use client";

import { motion } from "framer-motion";
import { Mic, Play, ShoppingBag, MapPin, Calendar, Check, Wrench, AlertCircle, ShoppingCart, User } from "lucide-react";
import { LANDING_DATA } from "@/data/landing-data";

export const DiagnosticJourney = () => {
    return (
        <section className="py-32 bg-slate-50 relative overflow-hidden">
            {/* Connecting Line */}
            <div className="absolute left-1/2 top-40 bottom-40 w-px bg-slate-200 hidden lg:block -translate-x-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-24">
                    <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">From Noise to Fix</h2>
                    <p className="text-xl text-slate-500">
                        See how Fix-OS turns a worrying sound into a solved problem in minutes.
                    </p>
                </div>

                <div className="space-y-32">
                    {LANDING_DATA.timeline.map((step, index) => (
                        <TimelineItem key={step.id} step={step} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const TimelineItem = ({ step, index }: { step: any, index: number }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
        >
            {/* Timeline Dot */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-600 border-4 border-slate-50 hidden lg:block z-20 shadow-lg" />

            {/* Text Content */}
            <div className={`flex-1 text-center ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4 ${step.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                        step.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                            step.color === 'indigo' ? 'bg-indigo-100 text-indigo-700' :
                                step.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                                    'bg-slate-200 text-slate-700'
                    }`}>
                    {step.badge}
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">{step.title}</h3>
                <p className="text-lg text-slate-600 leading-relaxed max-w-md mx-auto lg:mx-0 inline-block">
                    {step.description}
                </p>
            </div>

            {/* Visual Mockup */}
            <div className="flex-1 w-full max-w-xl">
                {index === 0 && <AudioMockup />}
                {index === 1 && <DiagnosisMockup />}
                {index === 2 && <RepairGuideMockup />}
                {index === 3 && <PartsMockup />}
                {index === 4 && <BookingMockup />}
            </div>
        </motion.div>
    );
};

// --- Mockup Components ---

const AudioMockup = () => (
    <div className="rounded-2xl bg-[#0F172A] p-6 shadow-2xl border border-slate-800 font-sans relative overflow-hidden aspect-[16/10] flex flex-col justify-center">
        <div className="absolute top-4 left-4 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center animate-pulse">
                <div className="w-1.5 h-1.5 rounded-full bg-current" />
            </div>
            <span className="text-[10px] uppercase text-red-400 font-bold tracking-wider">Listening</span>
        </div>

        <div className="flex items-center justify-center gap-1 h-24">
            {[40, 70, 30, 80, 50, 90, 40, 60, 30, 50, 45, 75, 50, 30, 60, 80, 40, 20].map((h, i) => (
                <motion.div
                    key={i}
                    className="w-2 bg-blue-500 rounded-full"
                    animate={{ height: [h / 3, h, h / 3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.05 }}
                />
            ))}
        </div>
        <div className="text-center mt-6">
            <div className="text-slate-400 text-sm mb-2">Analyzing frequency signature...</div>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors">
                Stop & Analyze
            </button>
        </div>
    </div>
);

const DiagnosisMockup = () => (
    <div className="rounded-2xl bg-[#0F172A] p-6 shadow-2xl border border-slate-800 font-sans aspect-[16/10] flex flex-col">
        <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <Wrench className="w-6 h-6" />
            </div>
            <div>
                <div className="text-xs text-slate-400 uppercase tracking-wide font-bold mb-1">Diagnosis Complete</div>
                <h4 className="text-xl font-bold text-white">Worn Cabin Air Filter</h4>
                <div className="flex gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/20">LOW SEVERITY</span>
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-bold border border-blue-500/20">CONFIDENCE 98%</span>
                </div>
            </div>
        </div>

        <div className="flex-1 bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 space-y-3">
            <div className="flex justify-between items-center text-sm border-b border-slate-700/50 pb-2">
                <span className="text-slate-400">Est. Repair Time</span>
                <span className="text-white font-medium">15 - 20 mins</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-slate-700/50 pb-2">
                <span className="text-slate-400">Difficulty</span>
                <span className="text-emerald-400 font-medium">Easy (DIY)</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Est. Cost</span>
                <span className="text-white font-medium">$15 - $25</span>
            </div>
        </div>
    </div>
);

const RepairGuideMockup = () => (
    <div className="rounded-2xl bg-[#0F172A] overflow-hidden shadow-2xl border border-slate-800 font-sans aspect-[16/10] flex flex-col relative group">
        {/* Progress Bar */}
        <div className="h-1 bg-slate-800 w-full flex">
            <div className="h-full bg-blue-500 w-1/6" />
        </div>

        <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">1</div>
                <span className="text-sm font-medium text-slate-200">Open Glove Box</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">1/6</span>
        </div>

        <div className="flex-1 relative bg-slate-800/30 flex items-center justify-center">
            <div className="absolute inset-x-8 top-8 bottom-8 border-2 border-dashed border-slate-700 rounded-lg flex items-center justify-center">
                <div className="text-slate-500 text-xs">Image / Diagram Placeholder</div>
            </div>

            {/* Hover Hint */}
            <div className="absolute bottom-4 right-4 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2">
                Next Step <Play className="w-3 h-3 fill-current" />
            </div>
        </div>
    </div>
);

const PartsMockup = () => (
    <div className="rounded-2xl bg-[#0F172A] p-6 shadow-2xl border border-slate-800 font-sans aspect-[16/10] flex flex-col">
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
                <ShoppingCart className="w-5 h-5" />
            </div>
            <div className="text-white font-medium">Recommended Parts</div>
        </div>

        <div className="space-y-3">
            {[
                { name: "Bosch HEPA Cabin Filter", price: "$18.50", site: "Amazon", prime: true },
                { name: "K&N Premium Air Filter", price: "$24.99", site: "eBay Motors", prime: false },
                { name: "Spearhead Breathe Easy", price: "$14.95", site: "RockAuto", prime: false }
            ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-[10px] font-bold text-slate-900">
                            {item.site[0]}
                        </div>
                        <div>
                            <div className="text-sm text-slate-200 font-medium group-hover:text-blue-400 transition-colors">{item.name}</div>
                            <div className="text-[10px] text-slate-500 flex items-center gap-1">
                                {item.site} {item.prime && <span className="text-blue-400 font-bold">• FAST</span>}
                            </div>
                        </div>
                    </div>
                    <div className="text-sm font-bold text-white">{item.price}</div>
                </div>
            ))}
        </div>
    </div>
);

const BookingMockup = () => (
    <div className="rounded-2xl bg-white p-1 shadow-2xl border border-slate-200 font-sans aspect-[16/10] flex flex-col overflow-hidden relative">
        {/* Map BG */}
        <div className="absolute inset-0 bg-slate-100">
            <div className="w-full h-full opacity-10 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-lg border border-slate-100 p-4">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <div className="text-xs text-slate-400 font-bold uppercase">Best Match</div>
                    <div className="font-bold text-slate-900">AutoCare Express</div>
                </div>
                <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded text-green-700 text-xs font-bold">
                    ★ 4.9
                </div>
            </div>

            <div className="flex gap-2">
                <button className="flex-1 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition">
                    Book Appointment
                </button>
                <button className="px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                    <MapPin className="w-4 h-4 text-slate-600" />
                </button>
            </div>
        </div>

        {/* Pins */}
        <div className="absolute top-1/3 left-1/3 p-2 bg-slate-900 text-white rounded-lg shadow-xl text-xs font-bold transform -translate-x-1/2 -translate-y-1/2">
            $120
            <div className="absolute top-full left-1/2 -translate-x-1/2 -ml-1 border-4 border-transparent border-t-slate-900" />
        </div>
        <div className="absolute top-1/2 right-1/3 p-2 bg-white text-slate-900 border border-slate-200 rounded-lg shadow-md text-xs font-bold transform -translate-x-1/2 -translate-y-1/2 opacity-75 scale-90">
            $145
        </div>
    </div>
);
