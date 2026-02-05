"use client";

import { Cpu, Server, Database, Mic, BookOpen, ShoppingCart, MapPin } from "lucide-react";
import { LANDING_DATA } from "@/data/landing-data";

const iconMap = {
    Cpu,
    Server,
    Database,
    Mic,
    BookOpen,
    ShoppingCart,
    MapPin,
};

export const FeaturesGrid = () => {
    return (
        <section className="py-24 bg-slate-50 border-y border-slate-200">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">The Diagnostic Stack</h2>
                    <p className="text-lg text-slate-600">
                        A fully integrated vehicle intelligence pipeline. From raw sensor input to verified repair procedures.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {LANDING_DATA.features.map((feature, idx) => {
                        const Icon = iconMap[feature.icon as keyof typeof iconMap];
                        const isActive = feature.active;

                        return (
                            <div
                                key={idx}
                                className={`relative p-8 rounded-2xl transition-all duration-300 ${isActive
                                    ? "bg-white border-2 border-blue-600 shadow-xl shadow-blue-900/5 -translate-y-2 scale-105 z-10"
                                    : "bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1"
                                    }`}
                            >
                                {isActive && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full tracking-wider">
                                        Core
                                    </div>
                                )}

                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${isActive ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600"
                                    }`}>
                                    <Icon className="w-6 h-6" />
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Stats Strip */}
                <div className="mt-20 grid grid-cols-3 gap-8 border-t border-slate-200 pt-12">
                    {LANDING_DATA.stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
                            <div className="text-xs uppercase tracking-wider font-semibold text-slate-500">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
