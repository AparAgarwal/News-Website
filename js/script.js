const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const d = new Date();
let day = weekday[d.getDay()];
let mname = month[d.getMonth()];
let date = d.getDate();
let year = d.getFullYear();
document.getElementById("date").innerHTML = `<h4>${day}, ${mname} ${date}, ${year}</h4><span>Today's Paper</span>`;

// Fetching the news from the API

// ⚠️ CONFIGURATION - Update with your deployment URL
// After deploying to Vercel, update this URL with your actual deployment
// Current: Pre-configured for https://news-website-kohl-chi.vercel.app
const VERCEL_FUNCTION_URL = 'https://news-website-kohl-chi.vercel.app/api/news';

// APPLICATION SETTINGS
let country = 'in';
const maxNews = 12;
const loadMoreCount = 6;
const MAX_ARTICLES = 100; // Prevent memory issues

const activeElement = document.querySelector('.active');
const active = activeElement ? activeElement.textContent.toLowerCase() : 'home';
const category = active === 'home' ? 'top' : active === 'international' ? 'world' : active;

let nextPageToken = '';

let allArticles = [];
let displayedCount = 0;

async function fetchNews(query = '', nextPage = '') {
    let url;

    // Build API request URL using Vercel proxy
    const params = new URLSearchParams({
        language: 'en'
    });

    if (query) {
        params.append('qInTitle', encodeURIComponent(query));
    } else {
        params.append('country', country);
        params.append('category', category);
    }

    if (nextPage) {
        params.append('page', nextPage);
    }

    url = `${VERCEL_FUNCTION_URL}?${params.toString()}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        if (!data || !data.results || data.results.length === 0) {
            return [];
        }

        nextPageToken = data.nextPage;

        const filteredArticles = data.results.filter(article => (
            article.title && article.description && article.image_url && article.source_id && article.link
        ));

        filteredArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

        return filteredArticles;
    } catch (error) {
        console.error('Error fetching news:', error);
        const mainContainer = document.querySelector('main');
        if (mainContainer && allArticles.length === 0) {
            showError('Failed to load news. Please check your internet connection.', mainContainer);
        }
        return [];
    }
}

async function fetchEnoughArticles(query = '', requiredCount = maxNews + 1) {
    while (allArticles.length < requiredCount && nextPageToken !== null) {
        const newArticles = await fetchNews(query, nextPageToken);
        if (newArticles.length === 0) {
            break;
        }
        allArticles = allArticles.concat(newArticles);

        if (allArticles.length > MAX_ARTICLES) {
            break;
        }
    }
    return allArticles;
}


// display the news on the page
function displayMainNews(articles) {
    if (!articles || articles.length === 0) {
        console.error('No articles to display');
        return;
    }

    const article = articles[0];
    const title = article.title;
    const description = article.description;
    const image = article.image_url;
    const source = article.source_id;
    const link = article.link;

    // SECURITY FIX: Safely set image with error handling
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.src = image || getPlaceholderImage();
        heroImage.alt = title || 'News image';
        heroImage.onerror = function () {
            this.src = getPlaceholderImage();
            this.onerror = null;
        };
    }

    // SECURITY FIX: Use textContent instead of innerHTML
    const mainHeadline = safeGetElement('main-headline');
    if (mainHeadline) {
        mainHeadline.textContent = title || 'No title available';
    }

    const mainDescription = safeGetElement('main-description');
    if (mainDescription) {
        mainDescription.textContent = description || 'No description available';
    }

    // SECURITY FIX: Use textContent to prevent XSS
    const byLine = safeGetElement('by-line');
    if (byLine) {
        byLine.textContent = `Source: ${source || 'Unknown'}`;
    }

    // SECURITY FIX: Validate URL before setting href
    const mainLink = safeGetElement('main-link');
    if (mainLink) {
        if (link && isValidURL(link)) {
            mainLink.href = link;
            mainLink.rel = 'noopener noreferrer'; // Security best practice
        } else {
            mainLink.href = '#';
            mainLink.style.pointerEvents = 'none';
            mainLink.style.opacity = '0.5';
        }
    }
}

// SECURITY FIX: Use safe DOM manipulation instead of innerHTML
function displayArticles(articles) {
    const trendingContainer = document.querySelector('.trending .container');
    if (!trendingContainer) {
        console.error('Trending container not found');
        return;
    }

    articles.forEach(article => {
        // Use safe card creation function from utils.js
        const card = createNewsCardSafe(article);
        card.classList.add('card'); // Maintain original class name
        trendingContainer.appendChild(card);
    });
}

// initialize the page
async function init(query = '') {
    // Reset state properly
    allArticles = [];
    displayedCount = 0;
    nextPageToken = '';

    const mainContainer = document.querySelector('main');
    if (mainContainer) {
        showLoading(mainContainer);
    }

    allArticles = await fetchEnoughArticles(query);

    if (mainContainer) {
        hideLoading();
    }

    if (allArticles.length === 0) {
        if (mainContainer) {
            showError('No articles found. Please try again later.', mainContainer);
        }
        return;
    }

    if (!query) {
        displayMainNews(allArticles);
        displayArticles(allArticles.slice(1, maxNews + 1));
    } else {
        displayArticles(allArticles.slice(0, maxNews));
    }
    displayedCount = maxNews + 1;

    const loadMoreBtn = safeGetElement('load-more');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = 'block';
    }
}

// SECURITY FIX: Prevent race condition in load more
let isLoadingMore = false;

// load more articles
const loadMoreBtn = safeGetElement('load-more');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', async function () {
        if (isLoadingMore) {
            return;
        }

        isLoadingMore = true;
        this.disabled = true;
        this.textContent = 'Loading...';

        try {
            while (displayedCount + loadMoreCount > allArticles.length && nextPageToken !== null) {
                const loadMoreArticles = await fetchNews('', nextPageToken);
                allArticles = allArticles.concat(loadMoreArticles);

                // Prevent unbounded growth
                if (allArticles.length > MAX_ARTICLES) {
                    console.warn('Maximum article limit reached');
                    break;
                }
            }

            const articlesToDisplay = allArticles.slice(displayedCount, displayedCount + loadMoreCount);

            console.log(allArticles); // Debugging

            displayArticles(articlesToDisplay);
            displayedCount += articlesToDisplay.length;

            if (!nextPageToken && displayedCount >= allArticles.length) {
                this.style.display = 'none';
            }
        } catch (error) {
            console.error('Error loading more articles:', error);
            alert('Failed to load more articles. Please try again.');
        } finally {
            isLoadingMore = false;
            this.disabled = false;
            this.textContent = 'Load More';
        }
    });
}

// search functionality
document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get('q');
    if (searchQuery) {
        const searchLabel = safeGetElement('search-results-label');
        if (searchLabel) {
            searchLabel.textContent = `Search Results for "${searchQuery}"`;
        }
        const searchQueryInput = safeGetElement('search-query');
        if (searchQueryInput) {
            searchQueryInput.value = '';
        }
        init(searchQuery);
    } else {
        init();
    }
});

const searchButton = safeGetElement('search-button');
if (searchButton) {
    searchButton.addEventListener('click', () => {
        const searchQueryInput = safeGetElement('search-query');
        if (searchQueryInput) {
            const query = searchQueryInput.value.trim();
            if (query) {
                searchQueryInput.value = '';
                window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
            }
        }
    });
}

const searchQueryInput = safeGetElement('search-query');
if (searchQueryInput) {
    searchQueryInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const query = searchQueryInput.value.trim();
            if (query) {
                searchQueryInput.value = '';
                window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
            }
        }
    });
}

const hamburgerInput = document.querySelector('.hamburger input');
if (hamburgerInput) {
    hamburgerInput.addEventListener('change', function () {
        const navUl = document.querySelector('nav ul');
        if (navUl) {
            if (this.checked) {
                navUl.classList.add('show');
                navUl.classList.remove('hide');
            } else {
                navUl.classList.add('hide');
                navUl.classList.remove('show');
            }
        }
    });
}

const searchBar = document.querySelector('.search');
if (searchBar) {
    searchBar.addEventListener('click', () => {
        const searchButton = safeGetElement('search-button');
        const searchInput = safeGetElement('search-query');
        searchBar.classList.toggle('search-expanded');
        if (searchBar.classList.contains('search-expanded')) {
            if (searchInput) searchInput.focus();
        } else {
            if (searchInput) searchInput.blur();
        }
    });
}

document.addEventListener('click', (event) => {
    const searchBar = document.querySelector('.search');
    const searchInput = safeGetElement('search-query');
    if (searchBar && searchInput) {
        if (!searchBar.contains(event.target) && searchBar.classList.contains('search-expanded')) {
            searchBar.classList.remove('search-expanded');
            searchInput.blur();
        }
    }
});
