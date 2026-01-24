export default async function handler(req, res) {
    const allowedOrigins = [
        'https://aparagarwal.tech',
        'https://aparagarwal.github.io',
        'http://news-website-kohl-chi.vercel.app',
        'https://news-website-kohl-chi.vercel.app',
        'http://localhost:5500',
        'http://127.0.0.1:5500',
        'http://localhost:3000',
        'http://127.0.0.1:3000'
    ];

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const apiKey = process.env.NEWS_API_KEY;
        
        if (!apiKey) {
            return res.status(500).json({ error: 'API key not configured' });
        }

        const { country, category, language, qInTitle, page } = req.query;

        const baseUrl = 'https://newsdata.io/api/1/latest';
        const params = new URLSearchParams({
            apikey: apiKey,
            language: language || 'en'
        });

        if (country) params.append('country', country);
        if (category) params.append('category', category);
        if (qInTitle) params.append('qInTitle', qInTitle);
        if (page) params.append('page', page);

        const apiUrl = `${baseUrl}?${params.toString()}`;

        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({ 
                error: 'Failed to fetch news',
                details: errorText 
            });
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
}
