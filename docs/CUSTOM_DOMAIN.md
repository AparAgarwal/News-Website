
## 📄 Custom Domain Deployment Guide

**Deploying to Vercel with Custom Subdomain**

This guide shows how to deploy the News Website to a custom subdomain using Vercel.

### Architecture

```
Custom Subdomain (news.aparagarwal.tech) [Vercel]
    ├── Frontend (HTML/CSS/JS)
    └── API Proxy (/api/news)
        ↓
        Fetches from → NewsData.io API (with secure API key)
```

### Prerequisites

- A domain name you own (e.g., `aparagarwal.tech`)
- Access to your domain's DNS settings
- Vercel account (free tier works)
- NewsData.io API key

### Steps

**1. Deploy to Vercel**

Follow the main [DEPLOYMENT.md](DEPLOYMENT.md) guide to:
- Fork the repository
- Deploy to Vercel with your `NEWS_API_KEY` environment variable
- Get your Vercel deployment URL (e.g., `news-website-abc123.vercel.app`)

**2. Add Custom Domain in Vercel**

1. Go to your Vercel project dashboard
2. Click **Settings** → **Domains**
3. Add your custom subdomain: `news.aparagarwal.tech`
4. Vercel will show DNS configuration instructions

**3. Configure DNS**

In your domain registrar/DNS provider (where `aparagarwal.tech` is hosted):

Add a CNAME record:
```
Type:  CNAME
Name:  news
Value: cname.vercel-dns.com
TTL:   Auto or 3600
```

**4. Update CORS Configuration**

Edit `api/news.js` and add your custom domain to allowed origins:

```javascript
const allowedOrigins = [
    'https://news.aparagarwal.tech', // Your custom subdomain
    'https://aparagarwal.tech',
    'https://aparagarwal.github.io',
    // ... other origins
];
```

Commit and push changes:
```bash
git add api/news.js
git commit -m "Add custom domain to CORS origins"
git push
```

Vercel will automatically redeploy.

**5. Verify Deployment**

1. Wait for DNS propagation (can take 5 minutes to 48 hours, usually ~10 minutes)
2. Visit your custom domain: `https://news.aparagarwal.tech`
3. Open DevTools (F12) → Network tab
4. Verify:
   - Page loads correctly
   - News articles display
   - No CORS errors
   - API calls go to your custom domain

### Multiple Deployments

You can maintain both:
- **Primary**: `https://news.aparagarwal.tech` (Vercel custom domain)
- **Backup**: `https://aparagarwal.tech/News-Website/` (GitHub Pages)

Both will work if you keep both domains in the CORS `allowedOrigins` array.

### Troubleshooting

**DNS not propagating:**
- Check DNS configuration with: `nslookup news.aparagarwal.tech`
- Wait up to 48 hours (usually much faster)
- Clear browser DNS cache

**CORS Errors:**
- Ensure your custom domain is in `allowedOrigins` array in `api/news.js`
- Redeploy on Vercel after updating CORS settings
- Check browser console for specific error message

**SSL Certificate Issues:**
- Vercel automatically provisions SSL certificates
- Wait a few minutes after adding the domain
- Check Vercel dashboard for certificate status

**API Not Responding:**
- Verify `NEWS_API_KEY` environment variable is set in Vercel
- Check Vercel function logs: Project → Logs
- Test API directly: `https://news.aparagarwal.tech/api/news?country=us`

---
