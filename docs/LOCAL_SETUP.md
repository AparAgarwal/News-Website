# 🛠️ Local Development Setup Guide

Complete guide for running the News Website locally for development and testing.

## 📋 Prerequisites

Before setting up the project locally, ensure you have:

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A code editor (VS Code, Sublime Text, etc.)
- A local development server (optional but recommended)
- Internet connection for API requests

## 🚀 Quick Start

### Option 1: Using Live Server (Recommended)

**For VS Code Users:**

1. **Clone or Download the Repository**
   ```bash
   git clone https://github.com/AparAgarwal/News-Website.git
   cd News-Website
   ```

2. **Install Live Server Extension**
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
   - Search for "Live Server" by Ritwick Dey
   - Click Install

3. **Start Local Server**
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Your browser will open at `http://localhost:5500` (or similar)

4. **Test the Site**
   - Navigate through different categories (each uses URL parameters like `/?category=business`)
   - Search for news articles (redirects to `/?q=query`)
   - Verify all features work correctly with the SPA routing

> **Note:** The site will automatically use the Vercel-deployed API proxy for fetching news. The API key is securely stored in Vercel environment variables.

### Option 2: Using Python HTTP Server

1. **Navigate to Project Directory**
   ```bash
   cd News-Website
   ```

2. **Start HTTP Server**
   
   **Python 3:**
   ```bash
   python -m http.server 3000
   ```
   
   **Python 2:**
   ```bash
   python -m SimpleHTTPServer 3000
   ```

3. **Access the Site**
   - Open browser to `http://localhost:3000`

### Option 3: Direct File Access

> ⚠️ **Not Recommended:** Some features may not work due to browser security restrictions (CORS policies).

1. Simply double-click `index.html` in your file explorer
2. The site will open in your default browser
3. Note that API requests may fail due to CORS restrictions

## 🔧 Configuration

### Local vs Production

The project is configured to work differently in local and production environments:

**Local Development:**
- Frontend runs on `localhost:5500` (or your chosen port)
- API requests go to deployed Vercel function
- CORS is configured to allow localhost origins

**Production (GitHub Pages):**
- Frontend deployed at `https://aparagarwal.tech/News-Website/`
- API requests still go to Vercel function
- CORS allows custom domain origin

### API Configuration

The API endpoint is configured in `js/script.js`:

```javascript
const VERCEL_FUNCTION_URL = 'https://news-website-kohl-chi.vercel.app/api/news';
```

**For Your Own Deployment:**
1. Deploy your own Vercel instance (see [DEPLOYMENT.md](DEPLOYMENT.md))
2. Update `VERCEL_FUNCTION_URL` with your Vercel URL
3. Ensure your API key is set in Vercel environment variables

### CORS Settings

The Vercel API function (`api/news.js`) is configured to allow requests from:

- `https://aparagarwal.tech` (custom domain)
- `https://aparagarwal.github.io` (GitHub Pages)
- `http://localhost:5500` (Live Server default)
- `http://127.0.0.1:5500`
- `http://localhost:3000` (Python HTTP Server)
- `http://127.0.0.1:3000`

If you use a different local port, update the `allowedOrigins` array in `api/news.js`.

## 🧪 Testing Features

### Homepage
- ✅ Main news article displays
- ✅ Trending news cards load
- ✅ Navigation works
- ✅ Date displays correctly

### Category Navigation (URL Parameters)
- ✅ Home (`/` or `/?category=home`) loads top news
- ✅ Business (`/?category=business`) loads business news
- ✅ International (`/?category=international`) loads world news
- ✅ Sports (`/?category=sports`) loads sports news
- ✅ Entertainment (`/?category=entertainment`) loads entertainment news
- ✅ Technology (`/?category=technology`) loads technology news
- ✅ Navigation active state updates based on URL
- ✅ Page title updates based on category

### Search Functionality  
- ✅ Search bar accepts input
- ✅ Search button triggers search
- ✅ Enter key triggers search
- ✅ URL changes to `/?q=query`
- ✅ Search results display correctly
- ✅ Hero section hides on search results
- ✅ Page title shows search query

### Load More Feature
- ✅ Load More button appears
- ✅ Additional articles load on click
- ✅ Button hides when no more articles

## 🐛 Troubleshooting

### Problem: News articles not loading

**Possible Causes:**
1. Internet connection issue
2. API rate limit exceeded
3. Invalid API configuration

**Solutions:**
1. Check your internet connection
2. Wait 24 hours if rate limit exceeded (free tier: 200/day)
3. Verify `VERCEL_FUNCTION_URL` is correct
4. Check browser console for errors (F12)

### Problem: CORS errors in console

**Cause:** Your local server is running on a port not whitelisted in the API function.

**Solution:**
1. Use one of the whitelisted ports: 5500 or 3000
2. OR update `api/news.js` to include your port in `allowedOrigins`
3. Redeploy to Vercel after changes

### Problem: Images not displaying

**Cause:** Some news sources may have broken image URLs.

**Expected Behavior:** Placeholder images should display automatically.

**Fix:** Check `js/utils.js` - the `getPlaceholderImage()` function provides fallback images.

### Problem: Search results not showing

**Possible Causes:**
1. No articles match the search query
2. API issue
3. JavaScript error

**Solutions:**
1. Try different search terms
2. Check browser console for errors
3. Verify API is responding (Network tab in DevTools)

## 📂 Project Structure

```
News-Website/
├── index.html              # Single-page application (all categories)
│
├── js/
│   ├── script.js          # Main logic + URL routing
│   └── utils.js           # Utility functions
│
├── css/
│   └── style.css          # Styles
│
├── api/
│   └── news.js            # Vercel serverless function (API proxy)
│
├── assets/                # Images and icons
│
└── docs/
    ├── DEPLOYMENT.md      # Deployment guide
    ├── LOCAL_SETUP.md     # This file
    ├── ENVIRONMENT.md     # Environment setup
    └── CUSTOM_DOMAIN.md   # Custom domain setup
```

### Architecture Note

The app uses **URL parameter routing** for navigation:
- Home: `/` or `/?category=home`
- Categories: `/?category=business`, `/?category=sports`, etc.
- Search: `/?q=earthquake`

JavaScript dynamically loads content based on URL parameters, eliminating the need for multiple HTML files.

## 🔒 Security Notes

- **Never commit API keys** to the repository
- API key is securely stored in Vercel environment variables
- All user inputs are sanitized to prevent XSS attacks
- External links use `rel="noopener noreferrer"`
- URL validation prevents open redirect attacks

## 📊 Development Workflow

1. **Make Changes**
   - Edit HTML, CSS, or JavaScript files
   - Save your changes

2. **Test Locally**
   - Live Server auto-refreshes on save
   - Test all affected features
   - Check browser console for errors

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

4. **Push to GitHub**
   ```bash
   git push origin main
   ```

5. **Verify Production**
   - GitHub Pages auto-deploys
   - Visit `https://aparagarwal.tech/News-Website/`
   - Test production site

## 🔄 Common Development Tasks

### Adding a New Category

1. Edit `index.html` - Add navigation link:
   ```html
   <li><a href="/?category=yourcategory" data-category="yourcategory">Your Category</a></li>
   ```

2. Edit `js/script.js` - Add to `updatePageTitle()` function:
   ```javascript
   const categoryTitles = {
       'home': 'Breaking News',
       // ... existing categories ...
       'yourcategory': 'Your Category News'
   };
   ```

3. Add API mapping if needed (e.g., map to specific API category)

4. Test locally: Visit `/?category=yourcategory`

### Changing Colors/Styles

1. Edit `css/style.css`
2. Update CSS variables or specific selectors
3. Test on all pages
4. Verify responsive design (mobile/tablet/desktop)

### Modifying API Behavior

1. Edit `/api/news.js` for backend changes
2. Edit `js/script.js` for frontend API calls
3. Test locally
4. Push changes to GitHub
5. Vercel auto-deploys API function

## 📱 Browser Testing

Test the site on multiple browsers and devices:

- **Desktop:** Chrome, Firefox, Safari, Edge
- **Mobile:** iOS Safari, Chrome Mobile, Firefox Mobile
- **Tablet:** iPad, Android tablets

Use browser DevTools device emulation for quick testing.

## 🆘 Getting Help

- **Documentation:** [README.md](../README.md)
- **Deployment:** [DEPLOYMENT.md](DEPLOYMENT.md)
- **Issues:** [GitHub Issues](https://github.com/AparAgarwal/News-Website/issues)
- **API Docs:** [NewsData.io Documentation](https://newsdata.io/documentation)

---

**Happy Coding! 🎉**
