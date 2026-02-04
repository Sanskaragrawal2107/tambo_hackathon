# Fix-OS - AI-Powered Repair Diagnostic Tool

An intelligent web application that diagnoses and helps fix issues with vehicles and devices using AI analysis and real repair guides.

![License](https://img.shields.io/badge/license-MIT-blue)
![Next.js](https://img.shields.io/badge/next.js-15.5-black)
![React](https://img.shields.io/badge/react-19-blue)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-4-38B2AC)

## Features

- 🎤 **Sound Analysis** - Record and analyze sounds from vehicles/devices to identify issues
- 🔧 **AI Diagnosis** - Instant problem identification using advanced AI
- 📖 **Repair Guides** - Integration with iFixit's database for detailed repair instructions
- 🛠️ **Professional Help** - Real-time repair shop finder using OpenStreetMap
- 💬 **Smart Chatbot** - Conversational AI interface powered by Tambo SDK
- 📱 **Sidebar & Fullscreen** - Floating chat button with sidebar and fullscreen modes
- ✨ **Beautiful UI** - Modern dark theme with animated gradients and smooth transitions

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) - React framework for production
- **UI Library**: React 19 with TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom animations
- **AI/Chat**: [Tambo SDK](https://tambo.ai/) v0.70.0 for conversational AI
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio Analysis**: Google Gemini AI
- **APIs**: iFixit, OpenStreetMap Nominatim, Overpass API

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- A Tambo API key (free from [tambo.co](https://tambo.co/dashboard))
- Google Gemini API key (for audio analysis)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fix-os.git
   cd fix-os
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp example.env.local .env.local
   ```
   
   Add your API keys to `.env.local`:
   ```env
   NEXT_PUBLIC_TAMBO_API_KEY=your_tambo_api_key
   NEXT_PUBLIC_TAMBO_URL=https://api.tambo.ai
   NEXT_PUBLIC_GOOGLE_GENAI_API_KEY=your_google_genai_key
   ```

4. **Initialize Tambo (optional)**
   ```bash
   npx tambo init
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the landing page.

6. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page with floating chat button
│   ├── fix-os/
│   │   ├── page.tsx                # Main chatbot interface
│   │   └── layout.tsx
│   ├── api/
│   │   ├── analyze-audio/          # Gemini audio analysis endpoint
│   │   ├── find-shops/             # OpenStreetMap repair shop finder
│   │   └── repair-guide/           # iFixit guide fetcher
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── tambo/
│   │   ├── message-thread-full.tsx # Chat message display
│   │   ├── tool-component-renderer.tsx # Manual tool component rendering
│   │   └── [other components]
│   └── ui/
│       └── [UI components]
├── lib/
│   ├── tambo.ts                    # Tool & component definitions
│   ├── thread-hooks.ts             # Custom React hooks
│   └── utils.ts
└── services/
    └── population-stats.ts

mcp-server/                          # Model Context Protocol server
├── index.ts
├── package.json
└── test files
```

## Key Features Explained

### Audio Diagnosis
Users can record sounds from their vehicle or device. The AI uses Gemini to analyze the audio and identify potential issues like:
- Grinding noises (brakes, gears)
- Muffled speakers (phones, cars)
- Rattling, squeaking, clicking, buzzing

### Smart Tool Routing
The AI intelligently determines whether the user is asking about a vehicle or device and calls the appropriate tools:
- `identifyVehicleIssue` for cars/motorcycles
- `getPhoneRepairGuide` for smartphones/tablets
- `startAudioDiagnostic` for sound analysis
- `requestProfessionalHelp` with context-aware shop finder

### Real-Time Shop Finder
The `/api/find-shops` endpoint uses OpenStreetMap to find actual repair shops near the user's location, providing ratings and distance information.

## Available Scripts

```bash
# Development
npm run dev          # Start dev server at http://localhost:3000

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
```

## Environment Variables

Create a `.env.local` file with:

```env
# Tambo SDK
NEXT_PUBLIC_TAMBO_API_KEY=<your-api-key>
NEXT_PUBLIC_TAMBO_URL=https://api.tambo.ai

# Google Gemini AI
NEXT_PUBLIC_GOOGLE_GENAI_API_KEY=<your-google-api-key>

# Optional: MCP Server
MCP_SERVER_URL=http://localhost:3000
```

## API Endpoints

### `/api/analyze-audio` (POST)
Analyzes audio using Google Gemini to identify device/vehicle issues.

**Request:**
```json
{
  "base64Audio": "...",
  "mimeType": "audio/wav"
}
```

### `/api/find-shops` (POST)
Finds nearby repair shops using OpenStreetMap.

**Request:**
```json
{
  "city": "San Francisco",
  "issueType": "phone" | "car",
  "maxDistance": 10
}
```

### `/api/repair-guide` (POST)
Fetches repair guides from iFixit.

**Request:**
```json
{
  "deviceType": "iPhone 15",
  "issueType": "Screen Replacement"
}
```

## Customizing

### Add New Tools

Edit `src/lib/tambo.ts`:

```tsx
export const tools: TamboTool[] = [
  {
    name: "myNewTool",
    description: "What this tool does",
    inputSchema: {
      type: "object",
      properties: {
        param1: { type: "string", description: "..." }
      },
      required: ["param1"]
    }
  }
  // ... existing tools
];
```

### Customize Components

Add new components to `src/lib/tambo.ts`:

```tsx
export const components: TamboComponent[] = [
  {
    name: "MyComponent",
    description: "Component description",
    component: MyComponent,
    propsSchema: myComponentSchema
  }
  // ... existing components
];
```

### Modify the Landing Page

The landing page is in `src/app/page.tsx`. It includes:
- Animated background with floating blobs
- Hero section with CTAs
- Features showcase
- How-it-works section
- Testimonials
- Floating chat button

## Performance Optimizations

- ✅ Server-side rendering with Next.js
- ✅ Image optimization with Next.js Image component
- ✅ Code splitting and lazy loading
- ✅ Tailwind CSS with PurgeCSS
- ✅ Framer Motion optimizations with `AnimatePresence`

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support & Issues

- **Documentation**: [Tambo Docs](https://docs.tambo.ai/)
- **Issues**: [GitHub Issues](https://github.com/yourusername/fix-os/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/fix-os/discussions)

## Acknowledgments

- [Tambo AI](https://tambo.ai/) - Conversational AI platform
- [iFixit](https://ifixit.com/) - Repair guides and documentation
- [OpenStreetMap](https://www.openstreetmap.org/) - Geographic data
- Built for the Tambo AI Hackathon 2026

## Roadmap

- [ ] Video tutorials for repairs
- [ ] User accounts and repair history
- [ ] Integration with repair shop booking
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced ML diagnostics

---

**Built with ❤️ using Tambo AI**

The example Graph component demonstrates several key features:

- Different prop types (strings, arrays, enums, nested objects)
- Multiple chart types (bar, line, pie)
- Customizable styling (variants, sizes)
- Optional configurations (title, legend, colors)
- Data visualization capabilities

Update the `components` array with any component(s) you want tambo to be able to use in a response!

You can find more information about the options [here](https://docs.tambo.co/concepts/generative-interfaces/generative-components)

### Add tools for tambo to use

Tools are defined with `inputSchema` and `outputSchema`:

```tsx
export const tools: TamboTool[] = [
  {
    name: "globalPopulation",
    description:
      "A tool to get global population trends with optional year range filtering",
    tool: getGlobalPopulationTrend,
    inputSchema: z.object({
      startYear: z.number().optional(),
      endYear: z.number().optional(),
    }),
    outputSchema: z.array(
      z.object({
        year: z.number(),
        population: z.number(),
        growthRate: z.number(),
      }),
    ),
  },
];
```

Find more information about tools [here.](https://docs.tambo.co/concepts/tools)

### The Magic of Tambo Requires the TamboProvider

Make sure in the TamboProvider wrapped around your app:

```tsx
...
<TamboProvider
  apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
  components={components} // Array of components to control
  tools={tools} // Array of tools it can use
>
  {children}
</TamboProvider>
```

In this example we do this in the `Layout.tsx` file, but you can do it anywhere in your app that is a client component.

### Voice input

The template includes a `DictationButton` component using the `useTamboVoice` hook for speech-to-text input.

### MCP (Model Context Protocol)

The template includes MCP support for connecting to external tools and resources. You can use the MCP hooks from `@tambo-ai/react/mcp`:

- `useTamboMcpPromptList` - List available prompts from MCP servers
- `useTamboMcpPrompt` - Get a specific prompt
- `useTamboMcpResourceList` - List available resources

See `src/components/tambo/mcp-components.tsx` for example usage.

### Change where component responses are shown

The components used by tambo are shown alongside the message response from tambo within the chat thread, but you can have the result components show wherever you like by accessing the latest thread message's `renderedComponent` field:

```tsx
const { thread } = useTambo();
const latestComponent =
  thread?.messages[thread.messages.length - 1]?.renderedComponent;

return (
  <div>
    {latestComponent && (
      <div className="my-custom-wrapper">{latestComponent}</div>
    )}
  </div>
);
```

For more detailed documentation, visit [Tambo's official docs](https://docs.tambo.co).
