"use client";

import { useMcpServers } from "@/components/tambo/mcp-config-modal";
import { components, tools, mcpServers as staticMcpServers } from "@/lib/tambo";
import { TamboProvider } from "@tambo-ai/react";
import { MessageThreadFull } from "@/components/tambo/message-thread-full";
import { Wrench, Car, Smartphone, Volume2, BookOpen } from "lucide-react";

/**
 * Fix-OS Page Component
 * The main diagnostic interface for vehicles and devices.
 * Shows audio diagnostic, repair guides, parts finder, and professional help.
 */
export default function FixOSPage() {
  // Load dynamic MCP server configurations from localStorage
  const dynamicMcpServers = useMcpServers();

  // Merge static MCP servers with dynamic ones
  const allMcpServers = [...staticMcpServers, ...dynamicMcpServers];

  return (
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
              text: `# 🔧 Hey! I'm Fix-OS — Your AI Repair Assistant

I can diagnose issues and find step-by-step repair guides for **vehicles** and **devices**.

### What can I help you with today?

🚗 **Vehicle Issues** — Engine problems, strange noises, brake issues, etc.

📱 **Device Issues** — Phone speaker problems, battery issues, screen repairs, etc.

🔊 **Sound Analysis** — I can listen to strange sounds and diagnose the problem

📖 **Repair Guides** — Get detailed step-by-step instructions from iFixit

---

**Try saying:**
- "My car is making a grinding noise when I brake"
- "My iPhone 13 speaker sounds muffled"  
- "Show me repair guides for MacBook battery replacement"
- "Can you listen to this strange sound from my car?"`,
            },
          ],
        },
      ]}
    >
      <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
        {/* Navigation */}
        <nav className="sticky top-0 z-40 backdrop-blur-xl bg-zinc-950/90 border-b border-zinc-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white tracking-tight">Fix-OS</h1>
                  <p className="text-xs text-zinc-400">AI Repair Assistant</p>
                </div>
              </div>

              {/* Quick action buttons */}
              <div className="hidden md:flex items-center gap-2">
                <QuickActionButton icon={Car} label="Vehicle" />
                <QuickActionButton icon={Smartphone} label="Device" />
                <QuickActionButton icon={Volume2} label="Sound" />
                <QuickActionButton icon={BookOpen} label="Guides" />
              </div>
            </div>
          </div>
        </nav>

        {/* Main Chat Area */}
        <main className="h-[calc(100vh-64px)]">
          <MessageThreadFull />
        </main>
      </div>
    </TamboProvider>
  );
}

function QuickActionButton({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all duration-200 border border-transparent hover:border-zinc-700/50">
      <Icon className="w-4 h-4" />
      <span className="hidden lg:inline">{label}</span>
    </button>
  );
}
