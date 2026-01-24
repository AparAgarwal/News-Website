
## 📄 Custom Domain Deployment Guide

**Deploying to GitHub Pages with Custom Domain + Vercel API Proxy**

This guide is specifically for the hybrid deployment configuration used by this project.

### Architecture

```
Custom Domain (aparagarwal.tech/News-Website/) [GitHub Pages]
    ↓  
    Requests to → Vercel API Proxy (news-website-kohl-chi.vercel.app/api/news)
        ↓
        Fetches from → NewsData.io API (with secure API key)
```

### Steps

1. **Deploy API to Vercel** (follow main deployment steps 1-5)

2. **Enable GitHub Pages:**
   - Repository Settings → Pages
   - Source: `main` branch
   - Folder: `/ (root)`
   - Custom domain: Your domain (if configured in DNS)

3.**Verify Configuration:**
   
   The project is pre-configured for custom domain deployment:
   
   **Base Href** (all HTML files):
   ```html
   <base href="/News-Website/">
   ```
   
   **CORS Allowed Origins** (`api/news.js`):
   ```javascript
   const allowedOrigins = [
       'https://aparagarwal.tech',
       'https://aparagarwal.github.io',
       'http://localhost:5500',
       // ... more origins
   ];
   ```

4. **Test Deployment:**
   - Visit `https://your-domain.com/News-Website/`
   - Open DevTools (F12) → Network tab
   - Verify API requests succeed
   - Check for CORS errors

### Customization

**For Your Own Domain:**

1. Update `allowedOrigins` in `api/news.js`:
   ```javascript
   const allowedOrigins = [
       'https://your-custom-domain.com',
       // ... keep other origins
   ];
   ```

2. Redeploy to Vercel

3. Configure your custom domain DNS:
   - CNAME record pointing to `username.github.io`

### Troubleshooting

**CORS Errors:**
- Ensure your domain is in `allowedOrigins` array
- Redeploy Vercel after updating CORS settings

**Assets Not Loading:**
- Verify `<base href="/News-Website/">` in all HTML files
- Check GitHub Pages deployment status

**API Not Responding:**
- Verify `NEWS_API_KEY` in Vercel environment variables
- Check Vercel function logs for errors

---
