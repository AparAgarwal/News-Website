# 📰 News Website

A clean, modern, and secure news aggregation website built with HTML, CSS, and JavaScript. Features real-time news updates from [NewsData.io API](https://newsdata.io/) with comprehensive security measures and responsive design.

> ## ⚠️ SETUP REQUIRED
> 
> **This application requires your own configuration to run:**
> 1. **Get your own FREE API key** from [NewsData.io](https://newsdata.io/)
> 2. **Deploy your own instance** to Vercel (free)
> 3. **Update configuration** with your URLs
> 
> **You cannot use the demo URLs directly.** See [Installation & Setup](#-installation--setup) below for complete instructions.

![News Website Preview](https://github.com/user-attachments/assets/0f507c21-eb3f-45df-afb1-b14716d88524)

![Mobile View](https://github.com/user-attachments/assets/017c2d58-312b-47ae-b0a9-1abb32dafc0d)

## 🌟 Features

- **Real-time News Updates** - Fetches latest news from NewsData.io API
- **Multiple Categories** - Home, International, Business, Sports, Entertainment, Technology
- **Search Functionality** - Search news by keywords
- **Responsive Design** - Mobile-friendly interface that works on all devices
- **Load More** - Pagination support for browsing more articles
- **Security Hardened** - Protected against XSS, open redirects, and other vulnerabilities
- **Error Handling** - Graceful error messages with retry functionality
- **Image Fallbacks** - Placeholder images for broken URLs
- **Loading States** - Visual feedback during data fetching

## 🚀 Live Demo

> **Note:** This is the original creator's deployment. To use this application, you must fork the repository and deploy your own instance with your own API key and Vercel URL. See setup instructions below.

**Original Demo:** [http://news-website-kohl-chi.vercel.app/](http://news-website-kohl-chi.vercel.app/)

**GitHub Pages:** [https://aparagarwal.github.io/News-Website/](https://aparagarwal.github.io/News-Website/)

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **API:** [NewsData.io](https://newsdata.io/)
- **Deployment:** GitHub Pages / Vercel
- **Serverless Functions:** Vercel Functions (for API proxy)

## 📁 Project Structure

```
News-Website/
├── index.html              # Home page
├── business.html           # Business news page
├── entertainment.html      # Entertainment news page
├── international.html      # International news page
├── sports.html            # Sports news page
├── technology.html        # Technology news page
├── search-results.html    # Search results page
├── README.md              # Project documentation
├── .gitignore            # Git ignore rules
├── .env.example          # Environment variables template
├── vercel.json           # Vercel configuration
│
├── api/                  # Serverless functions
│   └── news.js          # API proxy for secure requests
│
├── js/                   # JavaScript files
│   ├── script.js        # Main application logic
│   └── utils.js         # Utility and security functions
│
├── css/                  # Stylesheets
│   └── style.css        # Main stylesheet
│
├── assets/              # Static assets
│   ├── favicon_io/      # Favicon files
│   ├── icon.png        # Site icon
│   └── logo.png        # Site logo
│
└── docs/                # Documentation
    └── DEPLOYMENT.md    # Deployment guide
```

## 🔧 Installation & Setup

> ⚠️ **IMPORTANT:** This application requires your own API key and Vercel deployment. You cannot use the demo URLs directly. Follow the setup instructions below.

### Prerequisites

Before you begin, you'll need:
- A free NewsData.io API key ([Sign up here](https://newsdata.io/))
- A GitHub account
- A Vercel account ([Sign up free](https://vercel.com/signup))

### Option 1: Fork and Deploy (Recommended)

**Step 1: Fork the Repository**

1. Click the "Fork" button at the top right of this repository
2. Clone your forked repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/News-Website.git
   cd News-Website
   ```

**Step 2: Get Your API Key**

1. Go to [https://newsdata.io/](https://newsdata.io/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Save it for the next step

**Step 3: Deploy to Vercel**

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New..." → "Project"
3. Import your forked `News-Website` repository
4. In **Environment Variables**, add:
   - **Name:** `NEWS_API_KEY`
   - **Value:** Your NewsData.io API key
5. Click **Deploy** and wait for deployment to complete

**Step 4: Update Configuration**

After Vercel deployment, you'll get a URL like: `https://your-news-app.vercel.app`

Update these files in your repository:

1. **Edit `js/script.js`** (line 22):
   ```javascript
   // Replace this:
   const VERCEL_FUNCTION_URL = 'YOUR_VERCEL_DEPLOYMENT_URL/api/news';
   
   // With your actual URL:
   const VERCEL_FUNCTION_URL = 'https://your-news-app.vercel.app/api/news';
   ```

2. **Edit `api/news.js`** (line 10) - Optional but recommended for production:
   ```javascript
   // Replace this:
   res.setHeader('Access-Control-Allow-Origin', '*');
   
   // With your actual URL:
   res.setHeader('Access-Control-Allow-Origin', 'https://your-news-app.vercel.app');
   ```

3. **Commit and Push:**
   ```bash
   git add .
   git commit -m "config: add my Vercel deployment URL"
   git push origin main
   ```

Vercel will automatically redeploy with your changes!

**Step 5: Access Your Site**

Visit your Vercel URL: `https://your-news-app.vercel.app` 🎉

### Option 2: Local Development Only

For quick local testing (without Vercel):

1. Clone the repository
2. Get your NewsData.io API key
3. You'll need to either:
   - Set up Vercel deployment (recommended), OR
   - Temporarily use direct API calls (not recommended for production)

> **Note:** The application is designed to work with Vercel's serverless functions for secure API key storage. Local-only testing requires additional configuration.

For detailed deployment instructions, see: **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**

## 🔐 Security Features

This project implements multiple security best practices:

- ✅ **XSS Protection** - All user-generated content is safely rendered using DOM manipulation
- ✅ **URL Validation** - Prevents open redirect attacks by validating all external links
- ✅ **API Key Security** - API keys stored in secure environment variables (Vercel deployment)
- ✅ **CORS Configuration** - Proper CORS headers for API requests
- ✅ **Secure External Links** - All external links use `rel="noopener noreferrer"`
- ✅ **Input Sanitization** - All user inputs are properly encoded
- ✅ **Error Boundaries** - Comprehensive error handling prevents data leaks

## 🎨 Customization

### Changing API Provider
Edit `api/news.js` to use a different news API:
```javascript
const apiUrl = 'https://your-api-provider.com/endpoint';
```

### Styling
Modify `css/style.css` to customize the appearance:
- Colors: Update color variables
- Fonts: Change font imports at the top
- Layout: Adjust responsive breakpoints

### Categories
Add new categories by:
1. Creating a new HTML page (e.g., `category.html`)
2. Adding navigation link in all HTML files
3. Updating `js/script.js` category mapping

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Known Issues

- Initial cold start may take 2-3 seconds with Vercel Functions (free tier)
- Some news sources may have rate limits
- API provides limited results per request (pagination required for more articles)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Apar Agarwal**

- GitHub: [@AparAgarwal](https://github.com/AparAgarwal)
- LinkedIn: [@aparagarwal](https://www.linkedin.com/in/aparagarwal/)

## 🙏 Acknowledgments

- News data provided by [NewsData.io](https://newsdata.io/)
- Icons from [Boxicons](https://boxicons.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)

## 📚 Documentation

- [Deployment Guide](docs/DEPLOYMENT.md) - Detailed Vercel deployment instructions
- [API Documentation](https://newsdata.io/documentation) - NewsData.io API docs

## 🔄 Changelog

### Version 2.0.0 (2024)
- ✨ Implemented comprehensive security fixes
- ✨ Added Vercel serverless function for API proxy
- ✨ Improved error handling and loading states
- ✨ Added image fallback placeholders
- ✨ Refactored code structure for better maintainability
- ✨ Added proper documentation

### Version 1.0.0 (2024)
- 🎉 Initial release
- Basic news aggregation functionality
- Responsive design implementation

---

**Made with ❤️ by Apar Agarwal**
