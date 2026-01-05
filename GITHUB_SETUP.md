# Push to GitHub - Complete Guide

## Step 1: Create a GitHub Repository

1. Go to https://github.com/new
2. Repository name: `task-quest` (or your preferred name)
3. Description: "Gamified task tracker with points and rewards"
4. Choose Public or Private
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Download Your Project Files

Download all files from the outputs folder to your computer, including:
- `src/` folder
- `package.json`
- `vite.config.js`
- `tailwind.config.js`
- `postcss.config.js`
- `index-production.html` (rename this to `index.html`)
- `.gitignore`
- `README.md`

## Step 3: Set Up Git Locally

Open your terminal in the project folder and run:

```bash
# Configure git with your info
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Initialize repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Task Quest app"

# Rename branch to main (if needed)
git branch -M main
```

## Step 4: Connect to GitHub

Replace `YOUR_USERNAME` and `REPO_NAME` with your actual values:

```bash
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

### If you get authentication errors:

GitHub no longer accepts passwords. You need a Personal Access Token:

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name it "Task Quest Deploy"
4. Select scopes: `repo` (check the box)
5. Click "Generate token"
6. **Copy the token** (you won't see it again!)
7. When git asks for password, paste the token instead

## Step 5: Verify Upload

Go to your GitHub repository URL and you should see all your files!

## Alternative: GitHub Desktop (Easier for Beginners)

1. Download GitHub Desktop: https://desktop.github.com/
2. Click "File" → "Add Local Repository"
3. Select your project folder
4. Click "Publish repository"
5. Done! 🎉

## Next Steps After Pushing to GitHub

### Deploy to Vercel (Recommended - Easiest)
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Import Project"
4. Select your `task-quest` repository
5. Click "Deploy"
6. Done! Your app is live! 🚀

### Deploy to Netlify
1. Go to https://netlify.com
2. Sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your `task-quest` repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Click "Deploy"
8. Done! 🎉

### Deploy to GitHub Pages
1. In your repository on GitHub, go to Settings → Pages
2. Under "Build and deployment":
   - Source: "GitHub Actions"
3. Create `.github/workflows/deploy.yml` with this content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

4. Don't forget to update `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/task-quest/',  // Replace with your repo name
})
```

5. Push the workflow file and your site will be live at:
   `https://YOUR_USERNAME.github.io/task-quest/`

## Troubleshooting

**"Permission denied"**
- Make sure you're using a Personal Access Token, not your password
- Check that the token has `repo` scope

**"Repository not found"**
- Double-check the repository name and your username
- Make sure the repository exists on GitHub

**"Failed to push"**
- Try: `git pull origin main --rebase`
- Then: `git push origin main`

Need help? The files are ready - just follow the steps above! 🚀
