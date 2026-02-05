"use client";

import { useState, useEffect } from "react";
import { Wrench } from "lucide-react";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { DiagnosticJourney } from "@/components/landing/diagnostic-journey";
import { TamboProvider } from "@tambo-ai/react";
import { MessageThreadFull } from "@/components/tambo/message-thread-full";
import { components, tools, mcpServers as staticMcpServers } from "@/lib/tambo";
import { useMcpServers } from "@/components/tambo/mcp-config-modal";

/**
 * Fix-OS Landing Page
 * Style: Clean, Minimal, White (Razorpay-inspired)
 */
export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const dynamicMcpServers = useMcpServers();
  const allMcpServers = [...staticMcpServers, ...dynamicMcpServers];

  // Lock body scroll when chat is open
  useEffect(() => {
    if (isChatOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isChatOpen]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">

      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white">
              <Wrench className="w-4 h-4" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Fix-OS</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600 transition-colors">Platform</a>
            <a href="#" className="hover:text-blue-600 transition-colors">MCP Server</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Host</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm font-medium text-slate-600 hover:text-slate-900">Sign In</button>
            <button
              onClick={() => setIsChatOpen(true)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main>
        <HeroSection onConnect={() => setIsChatOpen(true)} />
        <FeaturesGrid />
        <DiagnosticJourney />

        {/* CTA Footer Strip */}
        <section className="bg-[#020420] py-20 relative overflow-hidden">
          {/* Glow Effects */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="inline-block px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-red-300 text-xs font-bold mb-6">
              EMERGENCY SUPPORT
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Professional SOS Infrastructure</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg">
              Immediate access to Level 3 master technicians when automated diagnostics reach their confidence limit.
            </p>
            <button className="px-8 py-4 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition-all shadow-xl">
              Request Priority Access
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="container mx-auto px-6 text-center text-slate-400 text-sm">
          <p>&copy; 2026 Fix-OS Inc. Engineered with Precision.</p>
        </div>
      </footer>

      {/* Floating Chat Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all hover:scale-105"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Chat Modal */}
      {isChatOpen && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm transition-all duration-300 ${isFullScreen ? 'p-0' : 'p-4'}`}>
          <div className={`bg-white shadow-2xl overflow-hidden flex flex-col relative transition-all duration-300 ${isFullScreen ? 'w-full h-full rounded-none' : 'w-full max-w-4xl h-[80vh] rounded-2xl'
            }`}>
            {/* Modal Header Controls */}
            <div className="absolute top-4 right-4 z-20 flex gap-2">
              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-2 bg-slate-100/80 hover:bg-slate-200 text-slate-600 rounded-lg transition backdrop-blur-sm"
                title={isFullScreen ? "Exit Full Screen" : "Full Screen"}
              >
                {isFullScreen ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9L4 4m0 0l5 0M4 4l0 5M15 9l5-5m0 0l-5 0m5 0l0 5M9 15l-5 5m0 0l5 0m-5 0l0-5M15 15l5 5m0 0l-5 0m5 0l0-5" /></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                )}
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-2 bg-slate-100/80 hover:bg-red-100 text-slate-600 hover:text-red-600 rounded-lg transition backdrop-blur-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <TamboProvider
              apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
              components={components}
              tools={tools}
              tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
              mcpServers={allMcpServers}
            >
              <div className="flex-1 bg-slate-50 flex flex-col min-h-0">
                <MessageThreadFull />
              </div>
            </TamboProvider>
          </div>
        </div>
      )}
    </div>
  );
}
