const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const d = new Date();
let day = weekday[d.getDay()];
let mname = month[d.getMonth()];
let date = d.getDate();
let year = d.getFullYear();
document.getElementById("date").innerHTML = `<h4>${day}, ${mname} ${date}, ${year}</h4><span>Today's Paper</span>`;

// Fetching the news from the API

const apiKey = 'pub_479521869e790a727903df673ac804ca5f7dc';
let country = 'in';
const maxNews = 12;
const loadMoreCount = 6;

const active = document.querySelector('.active').innerHTML.toLowerCase();
const category = active === 'home' ? 'top' : active === 'international' ? 'world' : active;

let nextPageToken = '';

let allArticles = [];
let displayedCount = 0;

async function fetchNews(query = '', nextPage = '') {
    let url;
    if (nextPage) {
        if (query) {
            url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&q=${encodeURIComponent(query)}&language=en&page=${nextPage}`;
        } else {
            url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=${country}&category=${category}&language=en&page=${nextPage}`;
        }
    } else {
        if (query) {
            url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&q=${encodeURIComponent(query)}&language=en`;
        } else {
            url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&country=${country}&category=${category}&language=en`;
        }
    }

    console.log("Fetching news from URL:", url); // Debugging

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        if (!data || !data.results || data.results.length === 0) {
            throw new Error('Invalid API response: Missing articles');
        }

        nextPageToken = data.nextPage; // Update nextPageToken for pagination
        console.log("Next Page Token:", nextPageToken); // Debugging

        const filteredArticles = data.results.filter(article => (
            article.title && article.description && article.image_url && article.source_id && article.link
        ));

        filteredArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

        return filteredArticles;
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

async function fetchEnoughArticles(query = '', requiredCount = maxNews+1) {
    while (allArticles.length < requiredCount && nextPageToken !== null) {
        const newArticles = await fetchNews(query, nextPageToken);
        if (newArticles.length === 0) {
            break;
        }
        allArticles = allArticles.concat(newArticles);
    }
    console.log(allArticles); // Debugging
    return allArticles;
}


// display the news on the page
function displayMainNews(articles) {
    const article = articles[0];
    const title = article.title;
    const description = article.description;
    const image = article.image_url;
    const source = article.source_id;
    const link = article.link;
    document.querySelector('.hero-image').src = image || '';
    document.querySelector('.hero-image').alt = title;
    document.getElementById('main-headline').textContent = title;
    document.getElementById('main-description').textContent = description;
    document.getElementById('by-line').innerHTML = `<b>Source: </b>${source}`;
    document.getElementById('main-link').href = link;
}

function displayArticles(articles) {
    const trendingContainer = document.querySelector('.trending .container');
    articles.forEach(article => {
        const card = document.createElement('div');
        card.classList.add('card');
        const { title, description, image_url, source_id, link } = article;
        card.innerHTML = `<div class="news-image">
            <img src="${image_url}" alt="${title}">
        </div>
        <div class="news-content">
            <h1>${title}</h1>
            <p>${description}</p>
            <p><strong>Source:</strong> ${source_id}</p>
            <div class="read-more">
                <hr>
                <a href="${link}" target="_blank">Read More</a>
            </div>
        </div>`;
        trendingContainer.appendChild(card);
    });
}

// initialize the page
async function init(query = '') {
    allArticles = await fetchEnoughArticles(query);
    if (!query) {
        displayMainNews(allArticles);
        displayArticles(allArticles.slice(1, maxNews + 1));
    } else {
        displayArticles(allArticles.slice(0, maxNews));
    }
    displayedCount = maxNews+1;
    
    document.getElementById('load-more').style.display = 'block';
}

// load more articles
document.getElementById('load-more').addEventListener('click', async function() {
    while (displayedCount + loadMoreCount > allArticles.length && nextPageToken !== null) {
        const loadMoreArticles = await fetchNews('', nextPageToken);
        allArticles = allArticles.concat(loadMoreArticles);
    }
    const articlesToDisplay = allArticles.slice(displayedCount, displayedCount + loadMoreCount);
    
    console.log(allArticles); // Debugging

    displayArticles(articlesToDisplay);
    displayedCount += articlesToDisplay.length;
    if (!nextPageToken && displayedCount >= allArticles.length) {
        this.style.display = 'none';
    }
});

// search functionality
document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get('q');
    if (searchQuery) {
        document.getElementById('search-results-label').textContent = `Search Results for "${searchQuery}"`;
        document.getElementById('search-query').value = '';
        init(searchQuery);
    } else {
        init();
    }
});

document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-query').value.trim();
    if (query) {
        document.getElementById('search-query').value = '';
        window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
    }
});

document.getElementById('search-query').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const query = document.getElementById('search-query').value.trim();
        if (query) {
            document.getElementById('search-query').value = '';
            window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
        }
    }
});

document.querySelector('.hamburger input').addEventListener('change', function() {
    const navUl = document.querySelector('nav ul');
    if (this.checked) {
        navUl.classList.add('show');
        navUl.classList.remove('hide');
    } else {
        navUl.classList.add('hide');
        navUl.classList.remove('show');
    }
});

document.querySelector('.search').addEventListener('click', () => {
    const searchBar = document.querySelector('.search');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-query');
    searchBar.classList.toggle('search-expanded');
    if (searchBar.classList.contains('search-expanded')) {
        searchInput.focus();
    } else {
        searchInput.blur();
    }
});

document.addEventListener('click', (event) => {
    const searchBar = document.querySelector('.search');
    const searchInput = document.getElementById('search-query');
    if (!searchBar.contains(event.target) && searchBar.classList.contains('search-expanded')) {
        searchBar.classList.remove('search-expanded');
        searchInput.blur();
    }
});
