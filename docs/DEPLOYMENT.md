# 🚀 Deployment Guide

Complete guide for deploying your own instance of the News Website with secure API key management.

> ⚠️ **IMPORTANT:** You must deploy your own instance to use this application. You cannot use someone else's API endpoints or URLs. This guide will help you set up your own deployment.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Your API Key](#getting-your-api-key)
3. [Vercel Deployment](#vercel-deployment)
4. [Configuration](#configuration)
5. [GitHub Pages Alternative](#github-pages-alternative)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- ✅ GitHub account
- ✅ Vercel account ([Sign up free](https://vercel.com/signup))
- ✅ Git installed locally

---

## Getting Your API Key

### Step 1: Sign Up for NewsData.io

1. Go to [https://newsdata.io/](https://newsdata.io/)
2. Click **"Sign Up"** (free tier available)
3. Fill in your details and create an account
4. Verify your email address

### Step 2: Get Your API Key

1. Log in to your NewsData.io dashboard
2. Navigate to **"API Keys"** section
3. Copy your API key (format: `pub_xxxxxxxxxxxxx`)
4. **Save it securely** - you'll need it for deployment

> **Note:** Free tier includes 200 requests per day, which is sufficient for testing and personal use.

---

## 🎯 Vercel Deployment

Vercel provides free hosting with built-in serverless functions for secure API key storage.

### Step 1: Fork the Repository

1. Go to [https://github.com/AparAgarwal/News-Website](https://github.com/AparAgarwal/News-Website)
2. Click the **"Fork"** button at the top right
3. Wait for GitHub to create your fork
4. Your fork will be at: `https://github.com/YOUR_USERNAME/News-Website`

### Step 2: Create Vercel Account

1. Go to [vercel.com/signup](https://vercel.com/signup)
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your repositories
4. Complete the account setup

### Step 3: Import Your Project

1. From your Vercel dashboard, click **"Add New..."** → **"Project"**
2. Find and select your forked `News-Website` repository
3. Vercel will auto-detect the configuration
4. **Project Name:** You can customize or keep the default
5. **Framework Preset:** None (leave as is)
6. **DO NOT** click Deploy yet - we need to add environment variables first

### Step 4: Configure Environment Variables

Before deploying:

1. Scroll down to **"Environment Variables"** section
2. Add your environment variable:
   - **Name:** `NEWS_API_KEY`
   - **Value:** Paste your NewsData.io API key (from step 2)
   - **Environment:** Select **all three** (Production, Preview, Development)
3. Click **"Add"**
4. Verify the variable is added successfully

> **Security Note:** Your API key is now stored securely in Vercel's environment variables and will never be exposed in your code or browser.

### Step 5: Deploy

1. Click the **"Deploy"** button
2. Wait 1-2 minutes for the deployment to complete
3. You'll see a success screen with your deployment URL
4. **Copy your URL** - it will look like: `https://news-website-abc123.vercel.app`

### Step 6: Update Your Configuration

Now you need to update the code to use YOUR Vercel URL:

1. **Clone your forked repository locally:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/News-Website.git
   cd News-Website
   ```

2. **Edit `js/script.js`** (around line 22):
   ```javascript
   // Find this line:
   const VERCEL_FUNCTION_URL = 'YOUR_VERCEL_DEPLOYMENT_URL/api/news';
   
   // Replace with your actual Vercel URL:
   const VERCEL_FUNCTION_URL = 'https://news-website-abc123.vercel.app/api/news';
   ```

3. **(Optional but Recommended) Edit `api/news.js`** (line 10):
   ```javascript
   // Find this line:
   res.setHeader('Access-Control-Allow-Origin', '*');
   
   // Replace with your Vercel URL for better security:
   res.setHeader('Access-Control-Allow-Origin', 'https://news-website-abc123.vercel.app');
   ```

4. **Commit and push changes:**
   ```bash
   git add .
   git commit -m "config: add my Vercel deployment URL"
   git push origin main
   ```

5. **Vercel auto-deploys:** Go back to your Vercel dashboard and wait for the automatic redeployment (30-60 seconds)

### Step 7: Test Your Deployment

1. Visit your Vercel URL: `https://your-deployment.vercel.app`
2. Open browser DevTools (F12) → Network tab
3. Navigate to any category or search for news
4. Look at the network requests
5. **Verify:** 
   - Requests go to YOUR Vercel URL `/api/news`
   - Your API key is NOT visible anywhere
   - News articles load correctly
6. ✅ Success! Your site is secure and live!

> **Reference:** See the [original demo](http://news-website-kohl-chi.vercel.app/) to compare functionality (but use your own deployment!)

---

## 🔧 Configuration

### Your Deployment Checklist

After following the steps above, you should have:

- ✅ Your own forked repository
- ✅ Your own NewsData.io API key
- ✅ Your own Vercel deployment URL
- ✅ Configuration updated with YOUR URLs
- ✅ Site tested and working

### Important Notes

- **DO NOT** use someone else's Vercel URL or API key
- Your API key is secure in Vercel environment variables
- Each fork should have its own deployment
- Free tier limits: 200 API requests/day (NewsData.io) + Vercel free tier

---

## 📄 GitHub Pages Deployment

If you want to keep the site on GitHub Pages but use Vercel only for the API proxy:

### Setup

1. **Deploy API proxy to Vercel** (follow Steps 1-4 above)
2. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/ (root)`
   - Save

3. **Update CORS in API function:**
   
   Edit `api/news.js`:
   ```javascript
   // Change line 6:
   res.setHeader('Access-Control-Allow-Origin', 'https://aparagarwal.github.io');
   ```

4. **Update configuration in `js/script.js`:**
   ```javascript
   const VERCEL_FUNCTION_URL = 'https://your-vercel-url.vercel.app/api/news';
   ```

5. **Push changes:**
   ```bash
   git add .
   git commit -m "config: setup GitHub Pages with Vercel proxy"
   git push origin main
   ```

### Result

- **Main site:** `https://aparagarwal.github.io/News-Website/`
- **API proxy:** `https://your-vercel-url.vercel.app/api/news`
- API key remains secure in Vercel environment variables

---

## 🔐 Environment Variables

### Required Variables

| Variable | Description | Where to Get It | Required |
|----------|-------------|-----------------|----------|
| `NEWS_API_KEY` | NewsData.io API key | [newsdata.io](https://newsdata.io/) | ✅ Yes |

### Setting Up Environment Variables

**In Vercel:**
1. Go to your project in Vercel dashboard
2. Click **Settings** → **Environment Variables**
3. Add variable:
   - **Key:** `NEWS_API_KEY`
   - **Value:** Your API key from NewsData.io
   - **Environment:** Select ALL (Production, Preview, Development)
4. Click **Save**
5. Redeploy your project for changes to take effect

**Security Best Practices:**
- ✅ Never commit API keys to your repository
- ✅ Always use environment variables for secrets
- ✅ Each developer/fork should have their own API key
- ✅ Rotate API keys periodically
- ❌ Don't share API keys in public forums or chat

---

## 🔧 Configuration Options

### Production Configuration

The repository is pre-configured for production deployment:

```javascript
// js/script.js
const USE_VERCEL_PROXY = true; // Always use Vercel proxy
const VERCEL_FUNCTION_URL = 'https://news-website-kohl-chi.vercel.app/api/news';
```

### Deploying Your Own Instance

If deploying to your own Vercel account:

1. Fork the repository
2. Deploy to Vercel with your API key
3. Update `VERCEL_FUNCTION_URL` with your deployment URL
4. Push changes to GitHub

### Customizing Deployment

**Memory Limits:**
Edit `vercel.json`:
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

**CORS Settings:**
Edit `api/news.js`:
```javascript
// Allow specific domain
res.setHeader('Access-Control-Allow-Origin', 'https://yourdomain.com');

// Allow all domains (less secure)
res.setHeader('Access-Control-Allow-Origin', '*');
```

---

## 🐛 Troubleshooting

### Issue: "YOUR_VERCEL_DEPLOYMENT_URL" Error

**Symptom:** Site doesn't load news, console shows error about "YOUR_VERCEL_DEPLOYMENT_URL"

**Cause:** You haven't updated the configuration with your actual Vercel URL

**Solution:**
1. Get your Vercel URL from the Vercel dashboard
2. Edit `js/script.js` and replace `YOUR_VERCEL_DEPLOYMENT_URL` with your actual URL
3. Commit and push changes
4. Wait for Vercel to redeploy

### Issue: 502 Bad Gateway Error

**Symptom:** Page loads but news doesn't appear, 502 error in console

**Cause:** Environment variable not set in Vercel or incorrect API key

**Solution:**
1. Go to Vercel dashboard → Your Project → Settings → Environment Variables
2. Verify `NEWS_API_KEY` exists and is set for all environments
3. Check that the API key is valid at [newsdata.io](https://newsdata.io/)
4. Go to Deployments tab → Click "..." → Redeploy

### Issue: No News Articles Displayed

**Symptom:** Page loads but shows "No articles found" or empty

**Possible Causes & Solutions:**

1. **Invalid API Key:**
   - Check your API key is active at newsdata.io
   - Verify you haven't exceeded free tier limits (200 requests/day)
   - Try regenerating API key in newsdata.io dashboard

2. **Wrong Vercel URL:**
   - Verify `VERCEL_FUNCTION_URL` in `js/script.js` matches your actual Vercel URL
   - Make sure it ends with `/api/news`

3. **Rate Limit Exceeded:**
   - Free tier: 200 requests/day
   - Wait 24 hours or upgrade plan

### Issue: Using Someone Else's URLs

**Symptom:** Trying to use the original demo URLs or someone else's deployment

**Why This Won't Work:**
- The original deployment's API key is secured and not accessible
- Each fork must have its own Vercel deployment
- CORS settings may block unauthorized domains

**Solution:**
- Follow this deployment guide completely
- Get YOUR own API key
- Deploy YOUR own Vercel instance
- Update configuration with YOUR URLs

### Issue: No News Displayed

**Cause:** Multiple possibilities

**Solution:**
1. Open browser console for errors
2. Check Network tab for failed requests
3. Verify API key is valid at [newsdata.io](https://newsdata.io/)
4. Check API rate limits haven't been exceeded

### Issue: Cold Start Delays

**Cause:** Vercel serverless functions have cold starts

**Solution:**
- This is normal for free tier
- First request after inactivity takes 2-3 seconds
- Subsequent requests are fast
- Upgrade to paid plan for guaranteed warm instances

---

## 📊 Deployment Checklist

Before deploying to production:

- [ ] Fork repository from [AparAgarwal/News-Website](https://github.com/AparAgarwal/News-Website)
- [ ] Get NewsData.io API key from [newsdata.io](https://newsdata.io/)
- [ ] Create Vercel account at [vercel.com](https://vercel.com)
- [ ] Import project to Vercel
- [ ] Set `NEWS_API_KEY` environment variable in Vercel
- [ ] Deploy and get your Vercel URL
- [ ] (Optional) Update `VERCEL_FUNCTION_URL` if using custom deployment
- [ ] Test deployment with DevTools Network tab
- [ ] Verify API key is NOT visible in requests
- [ ] Test all pages and features work
- [ ] Update CORS if using GitHub Pages
- [ ] Check mobile responsiveness
- [ ] Review error handling

---

## 🚀 Performance Tips

1. **Enable Caching:**
   - Vercel automatically caches static assets
   - Consider adding cache headers for API responses

2. **Optimize Images:**
   - Compress images in `assets/` folder
   - Use WebP format where possible

3. **Monitor API Usage:**
   - Check NewsData.io dashboard for quota usage
   - Set up alerts for approaching limits

4. **Use Analytics:**
   - Add Vercel Analytics for performance monitoring
   - Track user engagement and errors

---

## 🆘 Need Help?

- **Vercel Documentation:** [vercel.com/docs](https://vercel.com/docs)
- **NewsData.io Support:** [newsdata.io/documentation](https://newsdata.io/documentation)
- **GitHub Issues:** [Report a bug](https://github.com/AparAgarwal/News-Website/issues)

---

## 📝 Additional Resources

- [Vercel Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)
- [Serverless Functions Documentation](https://vercel.com/docs/concepts/functions/serverless-functions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

---

**Happy Deploying! 🎉**
