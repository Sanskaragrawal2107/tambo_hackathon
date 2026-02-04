"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Wrench, 
  Car, 
  Smartphone, 
  Volume2, 
  BookOpen, 
  MessageCircle,
  ChevronRight,
  Zap,
  Shield,
  Clock,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  Sparkles,
  X,
  Maximize2,
  Minimize2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMcpServers } from "@/components/tambo/mcp-config-modal";
import { components, tools, mcpServers as staticMcpServers } from "@/lib/tambo";
import { TamboProvider } from "@tambo-ai/react";
import { MessageThreadFull } from "@/components/tambo/message-thread-full";

/**
 * Landing page for Fix-OS
 * Beautiful hero section with floating chat sidebar
 */
export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Load dynamic MCP server configurations
  const dynamicMcpServers = useMcpServers();
  const allMcpServers = [...staticMcpServers, ...dynamicMcpServers];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Close chat when pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullScreen) {
          setIsFullScreen(false);
        } else {
          setIsChatOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isFullScreen]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-zinc-950 to-purple-950/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-zinc-800/50 backdrop-blur-xl bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                Fix-OS
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm text-zinc-400 hover:text-white transition-colors">How it Works</a>
              <a href="#testimonials" className="text-sm text-zinc-400 hover:text-white transition-colors">Reviews</a>
            </div>

            <button 
              onClick={() => setIsChatOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-sm font-medium hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              Launch App
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Diagnostics</span>
              <ChevronRight className="w-4 h-4" />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Fix Anything with{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                AI Assistance
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto"
            >
              From car troubles to phone repairs — describe your problem, let AI diagnose it, 
              and get step-by-step repair guides instantly.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={() => setIsChatOpen(true)}
                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-lg font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
              >
                Start Diagnosing
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center gap-2 px-8 py-4 rounded-xl text-lg font-medium text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-600 transition-all hover:bg-zinc-800/50">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </motion.div>
          </div>

          {/* Hero Visual - Device Icons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-20 flex justify-center items-center gap-8"
          >
            <div className="flex items-center gap-6 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <Car className="w-8 h-8 text-white" />
              </div>
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <Volume2 className="w-8 h-8 text-white" />
              </div>
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 px-4 border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Fix It Yourself
              </span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Powered by advanced AI and real repair data from iFixit
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={Volume2}
              title="Sound Analysis"
              description="Record strange noises from your car or device. AI analyzes and identifies the problem."
              gradient="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              icon={BookOpen}
              title="Repair Guides"
              description="Get detailed step-by-step instructions with images from iFixit's database."
              gradient="from-purple-500 to-pink-500"
            />
            <FeatureCard
              icon={Zap}
              title="Instant Diagnosis"
              description="Describe your issue in plain language. AI understands and diagnoses instantly."
              gradient="from-orange-500 to-red-500"
            />
            <FeatureCard
              icon={Shield}
              title="Find Professionals"
              description="Can't DIY? Find nearby certified repair shops with ratings and reviews."
              gradient="from-green-500 to-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 py-24 px-4 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-zinc-400">Three simple steps to fix anything</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Describe the Problem"
              description="Tell us what's wrong — 'My car makes a grinding noise' or 'My iPhone speaker is muffled'"
            />
            <StepCard
              number="2"
              title="AI Diagnoses"
              description="Our AI analyzes your description, listens to sounds, and identifies the likely issue"
            />
            <StepCard
              number="3"
              title="Get Your Guide"
              description="Receive a detailed repair guide with tools needed, parts required, and step-by-step instructions"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 px-4 border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard value="10K+" label="Repair Guides" />
            <StatCard value="95%" label="Diagnosis Accuracy" />
            <StatCard value="50K+" label="Devices Supported" />
            <StatCard value="24/7" label="AI Available" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by DIYers</h2>
            <p className="text-zinc-400">See what our users are saying</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              quote="Fixed my car's brake squeal myself! The sound analysis feature is incredible."
              author="Mike R."
              role="Car Enthusiast"
            />
            <TestimonialCard
              quote="Saved $200 on iPhone screen repair. The guide was so detailed and easy to follow."
              author="Sarah L."
              role="iPhone User"
            />
            <TestimonialCard
              quote="Finally diagnosed that weird engine noise. Turned out to be a loose heat shield!"
              author="James K."
              role="DIY Mechanic"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Fix Something?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
              Start your first diagnosis for free. No sign-up required.
            </p>
            <button
              onClick={() => setIsChatOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-zinc-900 rounded-xl text-lg font-semibold hover:bg-zinc-100 transition-all shadow-2xl hover:scale-105"
            >
              Launch Fix-OS
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-blue-500" />
            <span className="font-semibold">Fix-OS</span>
          </div>
          <p className="text-sm text-zinc-500">
            Built with ❤️ for the Tambo AI Hackathon 2026
          </p>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 z-50 group"
          >
            <div className="relative">
              {/* Pulse animation */}
              <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-25" />
              
              {/* Button */}
              <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 hover:scale-110 transition-all cursor-pointer">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="px-4 py-2 bg-zinc-800 rounded-lg text-sm whitespace-nowrap shadow-xl">
                  Start Diagnosis
                  <div className="absolute top-full right-6 border-8 border-transparent border-t-zinc-800" />
                </div>
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Sidebar / Fullscreen */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isFullScreen && setIsChatOpen(false)}
              className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm ${isFullScreen ? 'pointer-events-none' : ''}`}
            />

            {/* Chat Panel */}
            <motion.div
              initial={{ x: isFullScreen ? 0 : "100%", opacity: isFullScreen ? 0 : 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isFullScreen ? 0 : "100%", opacity: isFullScreen ? 0 : 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`fixed z-50 bg-zinc-950 shadow-2xl flex flex-col ${
                isFullScreen 
                  ? 'inset-0' 
                  : 'top-0 right-0 h-full w-full sm:w-[450px] md:w-[500px] border-l border-zinc-800'
              }`}
            >
              {/* Chat Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Fix-OS</h3>
                    <p className="text-xs text-zinc-400">AI Repair Assistant</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Fullscreen Toggle */}
                  <button
                    onClick={() => setIsFullScreen(!isFullScreen)}
                    className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    title={isFullScreen ? "Exit fullscreen" : "Fullscreen"}
                  >
                    {isFullScreen ? (
                      <Minimize2 className="w-5 h-5" />
                    ) : (
                      <Maximize2 className="w-5 h-5" />
                    )}
                  </button>

                  {/* Close Button */}
                  <button
                    onClick={() => {
                      setIsFullScreen(false);
                      setIsChatOpen(false);
                    }}
                    className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Content */}
              <div className="flex-1 overflow-hidden">
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
                          text: `# 🔧 Hey! I'm Fix-OS

I can diagnose issues and find repair guides for **vehicles** and **devices**.

**Try saying:**
- "My car makes a grinding noise"
- "My iPhone speaker is muffled"
- "Listen to this sound from my car"`,
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

// Component: Feature Card
function FeatureCard({ icon: Icon, title, description, gradient }: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
  gradient: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700/50 transition-all hover:bg-zinc-900/80 group">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-zinc-400">{description}</p>
    </div>
  );
}

// Component: Step Card
function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="text-center p-8">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </div>
  );
}

// Component: Stat Card
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
        {value}
      </div>
      <div className="text-sm text-zinc-400">{label}</div>
    </div>
  );
}

// Component: Testimonial Card
function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        ))}
      </div>
      <p className="text-zinc-300 mb-4">"{quote}"</p>
      <div>
        <div className="font-semibold">{author}</div>
        <div className="text-sm text-zinc-500">{role}</div>
      </div>
    </div>
  );
}
