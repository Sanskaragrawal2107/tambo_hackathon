"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Wrench,
  Activity,
  Mic,
  Server,
  Zap,
  Maximize2,
  Minimize2,
  X,
  AlertTriangle,
  Terminal,
  Car
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMcpServers } from "@/components/tambo/mcp-config-modal";
import { components, tools, mcpServers as staticMcpServers } from "@/lib/tambo";
import { TamboProvider } from "@tambo-ai/react";
import { MessageThreadFull } from "@/components/tambo/message-thread-full";

// Theme Configuration
const THEME = {
  colors: {
    background: "bg-[#0F172A]", // Deep Charcoal
    surface: "bg-[#1E293B]/70", // Glassmorphism base
    accent: "text-[#38BDF8]",   // Electric Blue
    accentBg: "bg-[#38BDF8]",
    border: "border-[#38BDF8]/20",
    glow: "shadow-[0_0_20px_rgba(56,189,248,0.15)]",
  }
};

/**
 * Fix-OS Bento AI Diagnostics Dashboard
 * High-end, futuristic vehicle diagnostics interface.
 */
export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [systemHealth, setSystemHealth] = useState(98);

  // Load dynamic MCP server configurations
  const dynamicMcpServers = useMcpServers();
  const allMcpServers = [...staticMcpServers, ...dynamicMcpServers];

  // Close chat when pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullScreen) setIsFullScreen(false);
        else setIsChatOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isFullScreen]);

  return (
    <div className={`min-h-screen ${THEME.colors.background} text-white font-sans selection:bg-blue-500/30 overflow-x-hidden`}>
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 border-b border-white/5 backdrop-blur-md bg-[#0F172A]/80 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center ${THEME.colors.glow}`}>
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Fix-OS <span className="text-blue-400 font-light">Pro</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#dashboard">Dashboard</NavLink>
            <NavLink href="#diagnostics">Diagnostics</NavLink>
            <NavLink href="#history">History</NavLink>
            <NavLink href="#settings">Settings</NavLink>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              System Online
            </div>
            <button
              onClick={() => setIsChatOpen(true)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95"
            >
              Connect Vehicle
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Vehicle <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Neural Interface</span>
            </h1>
            <p className="text-slate-400 max-w-xl text-lg">
              Real-time telemetry, acoustic analysis, and AI-driven diagnostics for your fleet.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600 hover:bg-slate-800 transition">
              <Terminal className="w-5 h-5 text-slate-400" />
            </button>
            <button className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-slate-600 hover:bg-slate-800 transition">
              <Activity className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 h-auto md:h-[800px]">

          {/* Module 1: Live Diagnostic Neural Map (Large Center) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl border border-white/10 bg-[#1E293B]/40 backdrop-blur-xl p-8 flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Car className="w-6 h-6 text-blue-400" />
              </div>
              <span className="font-semibold tracking-wide text-sm uppercase text-blue-200/70">Neural Map</span>
            </div>

            {/* Visual Placeholder for 3D Car */}
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent blur-2xl" />
              {/* Abstract Car Representation */}
              <div className="relative w-64 h-32 md:w-96 md:h-48 border border-blue-500/30 bg-blue-500/5 rounded-full flex items-center justify-center backdrop-blur-sm animate-[pulse_4s_ease-in-out_infinite]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-dashed border-blue-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
                <span className="text-blue-400 font-mono text-xs tracking-[0.2em]">SCANNING CHASSIS...</span>
              </div>
              {/* Hotspots */}
              <motion.div
                className="absolute top-[40%] right-[30%] w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            <div className="absolute bottom-6 w-full px-6 flex justify-between text-xs font-mono text-slate-400">
              <span>ID: V-8842-X</span>
              <span>STATUS: ANALYSIS</span>
            </div>
          </motion.div>

          {/* Module 2: System Health Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1 md:row-span-1 rounded-3xl border border-white/10 bg-[#1E293B]/40 backdrop-blur-xl p-6 flex flex-col justify-between hover:border-blue-500/30 transition-colors"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-medium text-slate-400">System Health</h3>
              <Activity className="w-5 h-5 text-green-400" />
            </div>
            <div className="flex items-end gap-3 mt-4">
              <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">{systemHealth}%</span>
              <span className="text-green-400 text-sm font-medium mb-1.5">+2.4%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-700/50 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 w-[98%]" />
            </div>
          </motion.div>

          {/* Module 3: Acoustic AI Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 md:row-span-1 rounded-3xl border border-white/10 bg-[#1E293B]/40 backdrop-blur-xl p-6 relative overflow-hidden group hover:border-purple-500/30 transition-colors"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl group-hover:bg-purple-500/30 transition-all" />
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-medium text-slate-400">Acoustic AI</h3>
              <Mic className="w-5 h-5 text-purple-400" />
            </div>
            {/* Fake Waveform */}
            <div className="flex items-center justify-between gap-1 h-16 mt-2">
              {[40, 70, 30, 80, 50, 90, 40, 60, 30, 50].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [h + "%", (h * 0.5) + "%", h + "%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                  className="w-1.5 bg-purple-500/50 rounded-full"
                />
              ))}
            </div>
            <div className="mt-4 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg inline-flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs text-red-300 font-mono">Misfire Detected</span>
            </div>
          </motion.div>

          {/* Module 4: Fixit MCP Server Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-1 md:row-span-2 rounded-3xl border border-white/10 bg-[#1E293B]/40 backdrop-blur-xl p-6 flex flex-col hover:border-indigo-500/30 transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-indigo-500/20">
                <Server className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Fixit MCP</h3>
                <p className="text-xs text-slate-500">v2.4.0 • Stable</p>
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <StatusRow label="Latency" value="12ms" good />
              <StatusRow label="Uptime" value="99.9%" good />
              <StatusRow label="Requests" value="842/m" />
              <StatusRow label="Error Rate" value="0.01%" good />
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                <span>Load</span>
                <span>42%</span>
              </div>
              <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 w-[42%]" />
              </div>
            </div>
          </motion.div>

          {/* Module 5: Telemetric Feed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 md:row-span-1 rounded-3xl border border-white/10 bg-[#0F172A]/60 backdrop-blur-xl p-6 relative overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-400 font-mono">LIVE TELEMETRY</h3>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              </div>
            </div>
            <div className="flex-1 overflow-hidden relative font-mono text-xs text-blue-200/60 leading-relaxed space-y-1">
              <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#0F172A] to-transparent z-10" />
              <p>[14:20:01] ENGINE_ECU: Fuel injection timing adjusted +0.02ms</p>
              <p>[14:20:02] AC_MODULE: Compressor clutch engagement verified</p>
              <p className="text-yellow-400/80">[14:20:03] BRAKE_SYS: ABS sensor rear-right signal intermittent</p>
              <p>[14:20:04] TRANS_TCU: Gear 4 shift pressure nominal</p>
              <p>[14:20:05] BATT_MGMT: Charge rate optimal at 14.2V</p>
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#0F172A] to-transparent z-10" />
            </div>
          </motion.div>

          {/* Module 6: Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="md:col-span-1 md:row-span-1 rounded-3xl border border-white/10 bg-[#1E293B]/40 backdrop-blur-xl p-6 flex flex-col justify-center gap-3"
          >
            <h3 className="text-sm font-medium text-slate-400 mb-1">Quick Actions</h3>
            <button className="flex items-center gap-3 w-full p-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-white/5 hover:border-red-500/30 transition-all group">
              <div className="p-1.5 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 text-red-500">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Emergency SOS</span>
            </button>
            <button className="flex items-center gap-3 w-full p-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-white/5 hover:border-blue-500/30 transition-all group">
              <div className="p-1.5 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 text-blue-500">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">Quick Scan</span>
            </button>
          </motion.div>

        </div>
      </main>

      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-8 right-8 z-50 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20" />
              <div className="relative w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl hover:bg-blue-500 transition-all cursor-pointer border border-white/10 backdrop-blur-md">
                <Wrench className="w-7 h-7 text-white" />
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Overlay */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isFullScreen && setIsChatOpen(false)}
              className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm ${isFullScreen ? 'pointer-events-none' : ''}`}
            />

            <motion.div
              initial={{ x: isFullScreen ? 0 : "100%", opacity: isFullScreen ? 0 : 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isFullScreen ? 0 : "100%", opacity: isFullScreen ? 0 : 1 }}
              className={`fixed z-50 bg-[#0F172A] shadow-2xl border-l border-white/10 flex flex-col text-slate-100 ${isFullScreen
                  ? 'inset-0'
                  : 'top-0 right-0 h-full w-full sm:w-[450px]'
                }`}
            >
              {/* Chat Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#1E293B]/50 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg">
                    <Wrench className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Fixit Assistant</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <p className="text-xs text-slate-400">Online • AI Active</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsFullScreen(!isFullScreen)}
                    className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition"
                  >
                    {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => {
                      setIsFullScreen(false);
                      setIsChatOpen(false);
                    }}
                    className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Body */}
              <div className="flex-1 overflow-hidden bg-[#0F172A]">
                <TamboProvider
                  apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
                  components={components}
                  tools={tools}
                  tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
                  mcpServers={allMcpServers}
                  initialMessages={[
                    {
                      role: "assistant",
                      content: [
                        {
                          type: "text",
                          text: `# 🚄 Fix-OS Diagnostic Hub
  
  Ready for elite vehicle diagnostics. Connected to **Fixit MCP**.
  
  **Capabilities:**
  - 🏎️ **Performance Tuning**: Analyze telemetry for optimization.
  - 🔊 **Acoustic Fingerprinting**: Identify engine issues by sound.
  - 🔍 **Deep System Scan**: Check OBD-II codes and sensor data.
  
  *Upload an engine recording or describe the symptoms to begin.*`,
                        },
                      ],
                    },
                  ]}
                >
                  <MessageThreadFull />
                </TamboProvider>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper Components
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">
      {children}
    </a>
  );
}

function StatusRow({ label, value, good }: { label: string; value: string; good?: boolean }) {
  return (
    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
      <span className="text-slate-400">{label}</span>
      <span className={`font-mono font-medium ${good ? 'text-green-400' : 'text-slate-200'}`}>{value}</span>
    </div>
  );
}
