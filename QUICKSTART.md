# Quick Start Guide

Get Fix-OS up and running in 5 minutes!

## Prerequisites

- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm or yarn** - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **API Keys** (all free):
  - Tambo API - [Get one](https://tambo.co/dashboard)
  - Google Gemini - [Get one](https://aistudio.google.com/app/apikey)

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/fix-os.git
cd fix-os
```

## Step 2: Install Dependencies

```bash
npm install
```

This installs all required packages including:
- Next.js 15
- React 19
- Tailwind CSS
- Tambo SDK
- And more...

## Step 3: Set Up Environment Variables

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your API keys:
   ```env
   NEXT_PUBLIC_TAMBO_API_KEY=your_key_here
   NEXT_PUBLIC_GOOGLE_GENAI_API_KEY=your_key_here
   ```

3. Save the file

## Step 4: Start Development Server

```bash
npm run dev
```

Your app is now running at: **http://localhost:3000**

## Step 5: Explore the App

1. **Landing Page** (`http://localhost:3000`)
   - Beautiful hero section
   - Feature showcase
   - Testimonials
   - Floating chat button

2. **Click the Floating Button**
   - Opens chat sidebar
   - Click maximize icon for fullscreen
   - Start describing your issue!

3. **Try These Commands:**
   - "My car makes a grinding noise"
   - "My iPhone speaker is muffled"
   - "Listen to this sound" (then record audio)

## Available Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Check for linting errors
npm run lint:fix         # Fix linting errors
npm run init             # Initialize Tambo (optional)
```

## Project Structure

```
fix-os/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Landing page
│   │   ├── fix-os/page.tsx          # Chatbot interface
│   │   └── api/                     # API endpoints
│   ├── components/
│   │   └── tambo/                   # Tambo-specific components
│   ├── lib/
│   │   └── tambo.ts                 # Tool & component definitions
│   └── services/
├── package.json
└── README.md
```

## Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```
Then visit `http://localhost:3001`

### Dependencies Installation Fails
```bash
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables Not Working
- Make sure `.env.local` is in the root directory
- Restart the dev server after changes
- Check that API keys are valid

### Audio Recording Not Working
- Use HTTPS or localhost
- Check browser microphone permissions
- Ensure browser is up to date

### Linting Errors
```bash
npm run lint:fix        # Auto-fix issues
```

## Getting API Keys

### Tambo API Key
1. Go to [tambo.co/dashboard](https://tambo.co/dashboard)
2. Sign up (free)
3. Create a new API key
4. Copy and paste into `.env.local`

### Google Gemini API Key
1. Go to [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
2. Sign in with Google
3. Click "Get API Key"
4. Create new key
5. Copy and paste into `.env.local`

## Next Steps

1. **Customize**
   - Edit `src/lib/tambo.ts` to add tools
   - Modify `src/app/page.tsx` for landing page
   - Update colors in `tailwind.config.ts`

2. **Deploy**
   - Use [Vercel](https://vercel.com) (recommended)
   - Or deploy to [Netlify](https://netlify.com)

3. **Learn More**
   - Read [DEVELOPMENT.md](./DEVELOPMENT.md) for deep dive
   - Check [README.md](./README.md) for full documentation
   - Visit [Tambo Docs](https://docs.tambo.ai/)

## Common Tasks

### Add a New Tool
1. Edit `src/lib/tambo.ts`
2. Add tool definition with schema
3. Restart dev server

### Add a New Component
1. Create component in `src/components/tambo/`
2. Register in `src/lib/tambo.ts`
3. Add to components export

### Connect to an API
1. Create endpoint in `src/app/api/my-endpoint/route.ts`
2. Call from your tool
3. Handle errors gracefully

## Need Help?

- 📖 [Documentation](./README.md)
- 🔧 [Development Guide](./DEVELOPMENT.md)
- 🐛 [Report Bug](https://github.com/yourusername/fix-os/issues)
- 💬 [Start Discussion](https://github.com/yourusername/fix-os/discussions)

## Tips for Success

✅ Keep API keys safe - never commit `.env.local`
✅ Test on mobile devices
✅ Use Chrome DevTools for debugging
✅ Read error messages carefully
✅ Check browser console for clues
✅ Restart server after env changes

---

**Happy fixing! 🔧✨**

Built with Tambo AI
