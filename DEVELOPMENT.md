# Fix-OS Development Guide

## Project Overview

Fix-OS is an AI-powered repair diagnostic tool that helps users fix vehicles and devices. It combines conversational AI, sound analysis, and real repair guides to provide instant diagnostics and repair instructions.

## Architecture

### Frontend
- **Next.js 15**: React framework with server-side rendering
- **React 19**: UI library with hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Animation library

### Backend
- **Next.js API Routes**: Serverless functions
- **Google Gemini AI**: Audio analysis and text generation
- **External APIs**: 
  - iFixit (repair guides)
  - OpenStreetMap (shop locations)
  - Tambo SDK (conversational AI)

### State Management
- React hooks (`useState`, `useContext`)
- Custom hooks in `src/lib/thread-hooks.ts`
- Tambo SDK context

## File Structure Deep Dive

### `src/app/page.tsx` - Landing Page
The main entry point with:
- Animated background effects
- Hero section with CTAs
- Feature showcase
- Testimonials
- Floating chat button with sidebar/fullscreen logic
- State management for `isChatOpen` and `isFullScreen`

**Key Functions:**
- `FeatureCard()` - Reusable feature display
- `StepCard()` - How-it-works steps
- `StatCard()` - Statistics display
- `TestimonialCard()` - User testimonials

### `src/app/fix-os/page.tsx` - Chatbot Interface
The main AI interface with:
- TamboProvider configuration
- MessageThreadFull component
- Tool and component integration
- Initial AI message

### `src/lib/tambo.ts` - Tool Definitions
Central configuration for:
- **Tools**: AI-callable functions
  - `identifyVehicleIssue` - Diagnoses car problems
  - `getPhoneRepairGuide` - Phone repairs
  - `startAudioDiagnostic` - Audio analysis
  - `requestProfessionalHelp` - Shop finder

- **Components**: UI components Tambo can control
  - AudioDiagnostic
  - RepairGuide
  - Professional Help widget

- **MCP Servers**: Model Context Protocol configurations

### `src/components/tambo/` - Tambo Components
UI components for Tambo integration:
- `message-thread-full.tsx` - Chat interface
- `message.tsx` - Individual message rendering
- `tool-component-renderer.tsx` - Manual tool rendering for client-side tools
- `audio-diagnostic.tsx` - Audio recording interface
- `repair-guide.tsx` - Guide display

### API Routes

#### `/api/analyze-audio`
Analyzes audio files using Google Gemini.

**Flow:**
1. Receives base64 audio
2. Sends to Gemini Vision API
3. Returns analysis with issue type, severity, and recommendations

**Code Location:** `src/app/api/analyze-audio/route.ts`

#### `/api/find-shops`
Finds repair shops using OpenStreetMap Overpass API.

**Flow:**
1. Receives city and issue type (phone/car)
2. Geocodes city to coordinates
3. Queries Overpass API for shops
4. Calculates distances and returns sorted results

**Code Location:** `src/app/api/find-shops/route.ts`

#### `/api/repair-guide`
Fetches repair guides from iFixit.

**Flow:**
1. Receives device type and issue
2. Searches iFixit database
3. Returns guide with steps and images

**Code Location:** `src/app/api/repair-guide/route.ts`

## Key Concepts

### Tool-to-Component Mapping
The `ToolComponentRenderer` in `src/components/tambo/tool-component-renderer.tsx` manually renders components for client-side tools:

```tsx
const TOOL_COMPONENT_MAP: Record<string, any> = {
  startAudioDiagnostic: AudioDiagnostic,
};
```

**Why?** Tambo's `associatedTools` are for context only. Manual tools need explicit component rendering.

### Audio Diagnostic Flow
1. User clicks "Record Audio" in chat
2. Browser captures audio
3. Converted to base64
4. Sent to `/api/analyze-audio`
5. Gemini analyzes and returns issue type
6. AI fetches repair guide automatically

### Context-Aware Shop Finder
The shop finder detects whether user is asking about:
- **Phone**: Looks for "phone repair", "electronics", "mobile"
- **Vehicle**: Looks for "car repair", "auto", "mechanic"

Regex patterns in `src/lib/tambo.ts`:
```tsx
const isPhoneContext = /phone|iphone|android|tablet|ipad|mobile/i.test(text);
```

## Development Workflow

### 1. Adding a New Tool
Edit `src/lib/tambo.ts`:

```tsx
const newTool: TamboTool = {
  name: "myTool",
  description: "What it does",
  inputSchema: {
    type: "object",
    properties: {
      param: { type: "string" }
    },
    required: ["param"]
  }
};

export const tools = [..., newTool];
```

### 2. Adding a Component
Create `src/components/tambo/my-component.tsx`:

```tsx
import { TamboComponentProps } from "@tambo-ai/react";

export function MyComponent({ props }: TamboComponentProps) {
  return <div>{/* UI */}</div>;
}
```

Register in `src/lib/tambo.ts`:

```tsx
import { MyComponent } from "@/components/tambo/my-component";

const myComponent: TamboComponent = {
  name: "MyComponent",
  description: "Description",
  component: MyComponent,
  propsSchema: myComponentSchema
};

export const components = [..., myComponent];
```

### 3. Adding an API Endpoint
Create `src/app/api/my-endpoint/route.ts`:

```tsx
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Process data
    const result = await processData(data);
    
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Error message" },
      { status: 500 }
    );
  }
}
```

## Debugging

### Enable Console Logging
Tambo SDK has debug modes. Check browser console for:
- Tool calls
- Component rendering
- API responses

### Check Network Requests
Use browser DevTools to inspect:
- API calls to `/api/*`
- Gemini requests
- OpenStreetMap queries

### Environment Issues
- Verify all `.env.local` keys are set
- Check API key quotas
- Ensure CORS is configured if needed

## Performance Tips

1. **Code Splitting**: Next.js handles this automatically
2. **Image Optimization**: Use `next/image`
3. **Lazy Loading**: Use `React.lazy()` for heavy components
4. **Animation Performance**: Use `transform` and `opacity` with Framer Motion
5. **API Optimization**: Cache responses where possible

## Testing

### Manual Testing
1. Test on mobile and desktop
2. Test all tool flows
3. Test error states
4. Test audio recording (Chrome, Safari, Firefox)

### Automated Testing
```bash
npm run lint      # ESLint
npm test          # Jest (when available)
```

## Deployment

### Build
```bash
npm run build
```

### Environment Variables for Deployment
Ensure these are set in your deployment platform:
- `NEXT_PUBLIC_TAMBO_API_KEY`
- `NEXT_PUBLIC_TAMBO_URL`
- `NEXT_PUBLIC_GOOGLE_GENAI_API_KEY`

### Platforms
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Self-hosted (Node.js)

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Audio not recording | Check browser permissions, use HTTPS |
| Tools not calling | Verify tool names match in Tambo |
| Shop finder returns no results | Check city name, increase maxDistance |
| Slow audio analysis | Compress audio before sending |
| Components not rendering | Check `ToolComponentRenderer` mapping |

## Resources

- [Tambo Docs](https://docs.tambo.ai/)
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [iFixit API](https://www.ifixit.com/api/docs)
- [OpenStreetMap](https://www.openstreetmap.org/)

## Questions?

Check existing discussions or open a new one on GitHub!
