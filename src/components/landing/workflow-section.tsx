"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

export const WorkflowSection = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-20">

                    {/* Left: Interactive Graphic */}
                    <div className="flex-1 w-full order-2 lg:order-1 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-blue-50/50 rounded-full blur-3xl z-0" />

                        {/* Abstract Code/Logic UI */}
                        <div className="relative z-10 bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                                <div className="flex gap-2 items-center">
                                    <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                                    </div>
                                    <span className="font-mono text-sm font-bold text-slate-800">Acoustic Analysis</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-slate-300" />
                            </div>

                            {/* Waveform graphic */}
                            <div className="flex items-end gap-1.5 h-24 mb-6">
                                {[20, 45, 30, 80, 50, 90, 40, 60, 30, 50, 20, 80, 40, 30].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-2 bg-blue-600 rounded-t-sm"
                                        animate={{ height: [h / 2, h, h / 2] }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                                    />
                                ))}
                            </div>

                            {/* Code Logic Snippet */}
                            <div className="bg-slate-900 rounded-lg p-4 font-mono text-[10px] text-blue-300 leading-relaxed overflow-hidden">
                                <div className="flex gap-2"><span className="text-purple-400">if</span> (frequency &gt; 2400Hz) <span className="text-purple-400">{`{`}</span></div>
                                <div className="pl-4">matchPattern(<span className="text-green-400">"TIMING_BELT_WEAR"</span>);</div>
                                <div className="pl-4 text-slate-500">// Confidence: 98.2%</div>
                                <div><span className="text-purple-400">{`}`}</span></div>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -right-8 top-12 bg-white shadow-lg p-4 rounded-xl border border-slate-100 z-20"
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-slate-900">Logic Validated</div>
                                    <div className="text-[10px] text-slate-500">Cross-ref with OEM data</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Text Content */}
                    <div className="flex-1 order-1 lg:order-2">
                        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">Acoustic & Logic Analysis</h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            Dual-modality diagnostics processing sound signatures alongside OBD-II logic streams for higher accuracy. We don't just read codes; we listen to the engine and verify the logic path.
                        </p>

                        <ul className="space-y-4">
                            {[
                                { title: "95% Noise Reduction", desc: "Isolate mechanical sounds from environmental noise." },
                                { title: "OEM Protocol Match", desc: "Validate against 45,000+ distinct manufacturer protocols." }
                            ].map((item, i) => (
                                <li key={i} className="flex gap-4">
                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                                        <p className="text-sm text-slate-500">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
};
