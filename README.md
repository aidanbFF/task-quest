# Task Quest - Gamified Task Tracker

A production-ready task tracking app with a points-based reward system. Complete tasks to earn points, then spend them on rewards you define!

## Features

- ✅ Add tasks with custom point values
- 🎯 Complete tasks to earn points
- 🏆 Create custom rewards with point costs
- 💾 Auto-saves progress to browser storage
- 📱 Responsive design
- ⚡ Fast and production-ready (Vite + React + Tailwind CSS)

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open http://localhost:5173 in your browser

## Build for Production

```bash
npm run build
```

This creates optimized files in the `dist` folder.

## Deploy to Netlify

### Option 1: Netlify CLI
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### Option 2: Netlify Drop
1. Run `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag and drop the `dist` folder

### Option 3: GitHub + Netlify
1. Push to GitHub
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

## Deploy to Vercel

### Option 1: Vercel CLI
```bash
npm install -g vercel
npm run build
vercel --prod
```

### Option 2: Vercel Dashboard
1. Push to GitHub
2. Import project at https://vercel.com/new
3. Vercel auto-detects settings
4. Deploy!

## Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

3. Add to vite.config.js:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/',
})
```

4. Deploy:
```bash
npm run deploy
```

## Project Structure

```
task-quest/
├── src/
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind CSS imports
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS config
└── postcss.config.js    # PostCSS config
```

## Technologies

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **LocalStorage** - Data persistence

Have fun being productive!
