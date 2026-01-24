# Environment Configuration Guide

This document explains the environment setup for the News Website project.

## Architecture Overview

The News Website uses a **hybrid deployment architecture** to maintain security while providing flexibility:

```
┌─────────────────────────────────────────────────────────┐
│                    User's Browser                        │
└────────────┬────────────────────────────────────────────┘
             │
             │ HTTPS Request
             ▼
┌─────────────────────────────────────────────────────────┐
│         Frontend (GitHub Pages)                          │
│   https://aparagarwal.tech/News-Website/               │
│   - HTML, CSS, JavaScript files                         │
│   - Static assets (images, fonts)                       │
└────────────┬────────────────────────────────────────────┘
             │
             │ API Request (CORS-enabled)
             ▼
┌─────────────────────────────────────────────────────────┐
│        API Proxy (Vercel Serverless Function)           │
│   https://news-website-kohl-chi.vercel.app/api/news    │
│   - Securely stores NEWS_API_KEY                        │
│   - Proxies requests to NewsData.io                     │
└────────────┬────────────────────────────────────────────┘
             │
             │ Authenticated Request
             ▼
┌─────────────────────────────────────────────────────────┐
│              NewsData.io API                             │
│         https://newsdata.io/api/1/latest                │
└─────────────────────────────────────────────────────────┘
```

## Environment Variables

### Production (Vercel)

Environment variables are set in the Vercel dashboard:

#### NEWS_API_KEY
- **Description**: API key for NewsData.io
- **Where to set**: Vercel Dashboard → Project Settings → Environment Variables
- **Value**: Your NewsData.io API key (format: `pub_xxxxxxxxxxxxx`)
- **Environments**: Production, Preview, Development (all selected)
- **Security**: Never commit this to Git! Only stored in Vercel's secure environment

**How to set:**
1. Log in to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → Environment Variables
4. Add variable:
   - Key: `NEWS_API_KEY`
   - Value: `pub_your_actual_api_key_here`
   - Environments: Check all three boxes
5. Click "Save"
6. Redeploy your project for changes to take effect

### Local Development

**No environment variables needed locally!**

The local development setup uses the deployed Vercel API proxy, which securely stores the API key. Your local frontend simply makes requests to:

```
https://news-website-kohl-chi.vercel.app/api/news
```

The CORS configuration in the Vercel function allows requests from:
- `http://localhost:5500` (Live Server default)
- `http://localhost:3000` (Python HTTP server)
- Other whitelisted development ports

## Configuration Files

### `.env.example`
Located at project root, this file serves as documentation only. It shows what environment variables are needed but should **never** contain actual values.

```env
# Environment Variables Template
NEWS_API_KEY=your_newsdata_api_key_here
```

### `.gitignore`
Ensures sensitive files are never committed:

```
.env
.env.local
.env.production
```

## Deployment Environments

### 1. GitHub Pages (Frontend)

**URL**: `https://aparagarwal.tech/News-Website/`

**Configuration**:
- Base href: `/News-Website/` (set in all HTML files)
- No environment variables needed
- Serves static files only

**Settings**:
- Repository: Settings → Pages
- Source: Deploy from branch `main`
- Folder: `/ (root)`
- Custom domain: `aparagarwal.tech` (if configured)

### 2. Vercel (API Proxy)

**URL**: `https://news-website-kohl-chi.vercel.app/api/news`

**Configuration**:
- Environment variable: `NEWS_API_KEY` (required)
- CORS: Configured to allow GitHub Pages and localhost
- Function: `api/news.js`

**Settings** (`vercel.json`):
```json
{
  "functions": {
    "api/news.js": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

### 3. Local Development

**URL**: `http://localhost:5500` (or `http://localhost:3000`)

**Configuration**:
- No environment setup required
- Uses deployed Vercel API proxy
- Live reload with Live Server or Python HTTP server

## CORS Configuration

Cross-Origin Resource Sharing (CORS) is configured in `api/news.js` to allow requests from multiple origins:

```javascript
const allowedOrigins = [
    'https://aparagarwal.tech',           // Production custom domain
    'https://aparagarwal.github.io',       // GitHub Pages
    'http://news-website-kohl-chi.vercel.app',
    'https://news-website-kohl-chi.vercel.app',
    'http://localhost:5500',               // Live Server
    'http://127.0.0.1:5500',
    'http://localhost:3000',               // Python HTTP server
    'http://127.0.0.1:3000'
];

const origin = req.headers.origin;
if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
}
```

**Adding Your Own Domain:**
If deploying with a different domain, add it to the `allowedOrigins` array and redeploy to Vercel.

## Security Best Practices

### ✅ DO:
- Store API keys in Vercel environment variables only
- Use the API proxy for all news fetching
- Keep `.env` files in `.gitignore`
- Rotate API keys periodically
- Use HTTPS for all production URLs

### ❌ DON'T:
- Commit API keys to Git repositories
- Hardcode API keys in JavaScript files
- Share API keys in public forums
- Use someone else's API endpoints
- Disable CORS without understanding implications

## Validation Checklist

Before deploying to production:

- [ ] `NEWS_API_KEY` is set in Vercel environment variables
- [ ] Vercel function is deployed and accessible
- [ ] CORS allows your frontend domain
- [ ] GitHub Pages is configured with correct branch
- [ ] Base href tag is set in all HTML files
- [ ] `VERCEL_FUNCTION_URL` in `js/script.js` points to correct endpoint
- [ ] No API keys exist in any committed code
- [ ] Custom domain DNS is configured (if applicable)
- [ ] HTTPS is enabled

## Troubleshooting

### Issue: "API key not configured" error

**Solution**: Ensure `NEWS_API_KEY` is set in Vercel → Project Settings → Environment Variables for all environments (Production, Preview, Development). Redeploy after adding.

### Issue: CORS errors in browser console

**Solution**: Add your frontend URL to the `allowedOrigins` array in `api/news.js` and redeploy the Vercel function.

### Issue: Local development can't access API

**Solution**: Ensure you're using a whitelisted port (5500 or 3000). If using a different port, update `allowedOrigins` in `api/news.js`.

## Additional Resources

- [Vercel Environment Variables Documentation](https://vercel.com/docs/concepts/projects/environment-variables)
- [NewsData.io API Documentation](https://newsdata.io/documentation)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [CORS Explained](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

**Remember**: Security is paramount. Never expose your API keys in client-side code or public repositories!
