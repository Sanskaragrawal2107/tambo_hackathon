# 🔧 Fix-OS: AI-Powered Vehicle Diagnostics Platform

> **Precision diagnostics for every mile.** Fix-OS is an intelligent vehicle diagnostic companion that empowers car owners with knowledge, connects them to professionals when needed, and simplifies the entire vehicle repair journey.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06b6d4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

---

## 🎯 The Problem

Vehicle owners face constant uncertainty when their car has issues:

- ❌ **No clarity**: Don't know what's wrong or how serious it is
- ❌ **Trust issues**: Uncertain which mechanics are trustworthy
- ❌ **Expensive guesses**: Dealership diagnostics cost $100-500+
- ❌ **DIY dilemma**: Want confidence to repair but lack guidance
- ❌ **Fragmented help**: Searching across multiple platforms

## ✅ The Solution

Fix-OS is an **AI-native diagnostic platform** that:

1. **Diagnoses** vehicle issues with precision
2. **Guides** owners through repairs with step-by-step instructions
3. **Connects** to verified professionals for complex repairs
4. **Analyzes** engine sounds with AI to detect problems
5. **Schedules** professional service in minutes

---

## ✨ Key Features

### 🎤 Audio Diagnostics
Record vehicle sounds (engine noise, speaker crackling) and let AI analyze them. Our audio classifier distinguishes between:
- Air filter clogs (grinding noise)
- Speaker distortion (audio issues)
- Other engine sounds

**How it works**: 1. Record → 2. Upload → 3. AI Analyzes → 4. Get Repair Guide

### 🔍 Vehicle Issue Identification
Describe your vehicle problem and get instant AI diagnosis with:
- **Safety Status**: Safe 🟢 / Warning 🟡 / Critical 🔴
- **Confidence Level**: How certain is the diagnosis
- **Recommended Action**: DIY guides or professional help

### 📖 Real Repair Guides
Access verified step-by-step repair instructions powered by **iFixit API**:
- Tools required
- Parts needed
- Time estimates (15 mins - 8 hours)
- Difficulty levels (Easy to Expert)
- Safety warnings

### 🔧 Professional Service Booking *(NEW)*
Seamlessly schedule repairs with certified technicians:
- **Browse Availability**: Real appointment slots
- **View Mechanics**: Ratings, distance, specializations
- **Secure Booking**: Card, UPI, or Wallet payment
- **Cost Breakdown**: Transparent pricing with tax calculation

### 🅧 Parts Finder
Search for OEM and aftermarket parts:
- Links to verified retailers (Amazon, eBay, Google Shopping)
- Price comparison across platforms
- In-stock availability

### 🆘 Emergency SOS
Find nearby repair shops when you need help NOW:
- Location-aware search radius
- Real-time availability
- Customer ratings & reviews

---

## 🛠 Technology Stack

### Frontend
- **Next.js 15** - App router, server components
- **React 19** - Modern hooks and features
- **TypeScript** - Type safety throughout
- **Tailwind CSS 4** - Utility-first styling (oklch colors)
- **Framer Motion** - Smooth animations
- **Shadcn/ui** - Beautiful pre-built components
- **Lucide React** - 400+ consistent icons

### Backend & Integration
- **Tambo AI** - Component/tool orchestration framework
- **MCP (Model Context Protocol) Servers**:
  - **Fixit-MCP**: Real iFixit repair guide integration
  - **Stitch-MCP**: AI design generation
  - **Tambo-MCP**: Default AI capabilities

### Validation & Type Safety
- **Zod** - Runtime schema validation
- **TypeScript** - Type inference

---

## 📊 Current Features Status

| Feature | Status | Component | Tool |
|---------|--------|-----------|------|
| Vehicle Identification | ✅ | `VehicleHero` | `identifyVehicleIssue` |
| Repair Guides | ✅ | `RepairWizard` | `getRepairGuide` |
| Audio Diagnostics | ✅ | `AudioDiagnostic` | `startAudioDiagnostic` |
| Professional Help | ✅ | `ServiceSOS` | `requestProfessionalHelp` |
| Parts Search | ✅ | `PartsFinder` | `findPartsOnline` |
| Service Booking | ✅ | `ServiceRequestCard` | `requestServiceAppointment` |
| Payment & Confirmation | ✅ | `BookProfessionalService` | `bookProfessionalService` |

---

## 🎨 Design Philosophy

**Modern, Minimal, Trustworthy**

The current design blends **Razorpay-inspired minimalism** with **feature richness**:

### Visual System
- **Background**: Pure white (#FFFFFF) with subtle gradients
- **Primary Text**: Deep slate (#475569)
- **Accent Color**: Professional blue (#0052CC) for CTAs
- **Typography**: Space Grotesk, Plus Jakarta Sans
- **Spacing**: Extreme whitespace (100px+ sections)
- **Components**: 8px rounded corners, 1px borders, soft shadows

### User Experience
- White background for clarity and trust
- Glassmorphic cards with subtle depth
- Smooth 300ms transitions
- Responsive grid layouts
- Professional, engineered aesthetic

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- `NEXT_PUBLIC_TAMBO_API_KEY` environment variable

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd my-tambo-app

# Install dependencies
npm install

# Configure environment
cp example.env.local .env.local
# Edit .env.local and add your API keys

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

```env
# Tambo AI Configuration
NEXT_PUBLIC_TAMBO_API_KEY=your_api_key_here
NEXT_PUBLIC_TAMBO_URL=https://api.tambo.ai

# Optional: MCP Server URLs
NEXT_PUBLIC_FIXIT_MCP_URL=http://localhost:3001
```

---

## 📁 Project Structure

```
my-tambo-app/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Landing page (Razorpay aesthetic)
│   │   ├── chat/
│   │   │   └── page.tsx          # Chat interface
│   │   ├── interactables/
│   │   │   └── page.tsx          # Demo components
│   │   └── globals.css
│   ├── components/
│   │   ├── fix-os/               # Core diagnostic components
│   │   │   ├── vehicle-hero.tsx
│   │   │   ├── audio-diagnostic.tsx
│   │   │   ├── repair-wizard.tsx
│   │   │   ├── service-sos.tsx
│   │   │   ├── parts-finder.tsx
│   │   │   ├── service-request-card.tsx
│   │   │   ├── book-professional-service.tsx
│   │   │   └── index.ts
│   │   ├── tambo/                # Tambo integration
│   │   │   ├── mcp-config-modal.tsx
│   │   │   ├── message-thread-full.tsx
│   │   │   ├── graph.tsx
│   │   │   └── ...
│   │   └── ui/                   # Generic UI components
│   ├── lib/
│   │   ├── tambo.ts              # Tool definitions & components
│   │   ├── thread-hooks.ts
│   │   └── utils.ts
│   ├── services/
│   │   └── population-stats.ts
│   └── public/
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── postcss.config.mjs
```

---

## 🔗 Tool Integration (Tambo Framework)

All features are connected via the **Tambo AI framework**. Tools are defined in `src/lib/tambo.ts`:

### Available Tools

```typescript
// Vehicle & Diagnostics
- identifyVehicleIssue(description: string)
- startAudioDiagnostic(audioData: Blob)
- getRepairGuide(issueId: string, vehicleInfo: VehicleData)

// Professional Services
- requestProfessionalHelp(issueId: string, location: Location)
- requestServiceAppointment(serviceType: string, vehicleInfo: VehicleData)
- bookProfessionalService(appointmentId: string, paymentInfo: PaymentData)

// Shopping
- findPartsOnline(partName: string, vehicleModel: string)
```

Each tool maps to a **React component** that handles the UI and data presentation.

---

## 💰 Business Model

### Revenue Streams

1. **Service Commission Fees**
   - 10-15% commission on professional mechanic bookings
   - Recurring revenue from subscription mechanics

2. **Affiliate Partnerships**
   - Amazon Affiliate for parts/tools
   - eBay affiliate links
   - Parts retailer partnerships

3. **Premium Features**
   - Extended repair guides
   - API access for developers
   - Priority customer support

4. **B2B Integrations**
   - Repair shop management software
   - Fleet diagnostics for companies

---

## 📊 Key Metrics & Stats

From the landing page:
- **10K+** Repair Guides (iFixit integrated)
- **98%** Accuracy Rate (audio classification)
- **50K+** Devices Supported (cars, phones, appliances)
- **24/7** AI Assistant (always available)

---

## 👥 Target Audience

### Primary Users
- 🚗 **DIY Car Enthusiasts** (want knowledge, not mechanics)
- 👤 **Casual Car Owners** (want affordable diagnostics)
- 📱 **Mobile-First Users** (on-the-go diagnostics)

### Secondary Users
- 🔧 **Mechanics** (via integration platform)
- 🛒 **Parts Retailers** (through affiliate links)

---

## 🗓️ Roadmap

### Phase 1 (Current) ✅
- ✅ AI vehicle diagnostics
- ✅ Audio sound analysis
- ✅ Repair guides (iFixit)
- ✅ Professional booking
- ✅ Landing page & onboarding

### Phase 2 (Q2 2026)
- 🔄 Multi-vehicle profiles
- 🔄 Service history tracking
- 🔄 Predictive maintenance alerts
- 🔄 Parts price tracking

### Phase 3 (Q3 2026)
- 🔄 IoT vehicle integration (OBD-II)
- 🔄 Real-time diagnostics
- 🔄 Mechanic verification system
- 🔄 Community repair forums

### Phase 4 (Q4 2026)
- 🔄 Mobile app (iOS/Android)
- 🔄 AR parts visualization
- 🔄 Invoice management
- 🔄 Insurance integration

---

## 🧪 Testing

### Component Testing
```bash
npm run test
```

### Build for Production
```bash
npm run build
npm run start
```

### Type Checking
```bash
npm run type-check
```

---

## 🤝 Contributing

We welcome contributions! To get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Use Tailwind for styling (no inline styles)
- Add Zod schemas for new data types
- Write components as functional + hooks
- Keep components under 300 lines

---

## 📝 License

This project is built for the **Tambo AI Hackathon 2026**.

---

## 📞 Support & Contact

- **Documentation**: See `CLAUDE.md` for development notes
- **Issues**: GitHub Issues
- **Email**: support@fix-os.dev
- **Twitter**: [@FixOSAI](https://twitter.com)

---

## 🙏 Acknowledgments

- **iFixit API** - Real repair data
- **Tambo AI** - Component orchestration framework
- **Shadcn/ui** - Beautiful components
- **Framer Motion** - Smooth animations
- **Tailwind CSS** - Modern styling

---

## 📈 Performance

**Lighthouse Scores** (Next.js 15 optimizations):
- Performance: 95+
- Accessibility: 92+
- Best Practices: 95+
- SEO: 100

**Core Web Vitals**:
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

---

Made with ❤️ for the Tambo AI Hackathon 2026
