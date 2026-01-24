// Vercel Serverless Function to proxy newsdata.io API requests
// This keeps the API key secure and prevents exposure in client-side code

export default async function handler(req, res) {
    // CORS Configuration
    // Set to your Vercel deployment URL for production
    res.setHeader('Access-Control-Allow-Origin', 'http://news-website-kohl-chi.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Get API key from environment variables
        const apiKey = process.env.NEWS_API_KEY;
        
        if (!apiKey) {
            console.error('NEWS_API_KEY not configured');
            return res.status(500).json({ error: 'API key not configured' });
        }

        // Extract query parameters from request
        const { country, category, language, qInTitle, page } = req.query;

        // Build newsdata.io API URL
        const baseUrl = 'https://newsdata.io/api/1/latest';
        const params = new URLSearchParams({
            apikey: apiKey,
            language: language || 'en'
        });

        // Add optional parameters
        if (country) params.append('country', country);
        if (category) params.append('category', category);
        if (qInTitle) params.append('qInTitle', qInTitle); // No quotes needed
        if (page) params.append('page', page);

        const apiUrl = `${baseUrl}?${params.toString()}`;

        // Fetch from newsdata.io
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('News API error:', response.status, errorText);
            return res.status(response.status).json({ 
                error: 'Failed to fetch news',
                details: errorText 
            });
        }

        const data = await response.json();
        
        // Return the news data
        return res.status(200).json(data);

    } catch (error) {
        console.error('Error in news proxy:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}
