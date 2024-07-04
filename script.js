const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const d = new Date();
let day = weekday[d.getDay()];
let mname = month[d.getMonth()];
let date = d.getDate();
let year = d.getFullYear();
document.getElementById("date").innerHTML = `<h4>${day}, ${mname} ${date}, ${year}</h4><span>Today's Paper</span>`;

// Fetching the news from the API
const apiKey = 'cc249cca7d454e95a4715dcb38e05a0e';
let country = 'in';
const maxNews = 12;
const loadMoreCount = 6;

const active = document.querySelector('.active').innerHTML.toLowerCase();
const category = active === 'home' ? 'general' : active === 'international' ? 'general' : active;
if (active === 'international') {
    country = 'us';
}


async function fetchNews(query = '') {
    let url;
    if (query) {
        url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}&pageSize=100`;
    } else {
        url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&pageSize=100`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (!data || !data.articles) {
            throw new Error('Invalid API response: Missing articles');
        }

        const filteredArticles = data.articles.filter(article => (
            article.title && article.description && article.urlToImage && article.source && article.url && article.title.trim() !== '' && article.description.trim() !== '' && article.urlToImage.trim() !== '' && article.source.name && article.source.name.trim() !== '' && article.url.trim() !== ''
        ));

        filteredArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

        return filteredArticles;
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}
function displayMainNews(articles) {
    const article = articles[0];
    const title = article.title;
    const description = article.description;
    const image = article.urlToImage;
    const source = article.source.name;
    const link = article.url;
    document.querySelector('.hero-image').src = image || '';
    document.querySelector('.hero-image').alt = title;
    document.getElementById('main-headline').textContent = title;
    document.getElementById('main-description').textContent = description;
    document.getElementById('by-line').innerHTML= `<b>Source: </b>${source}`;
    document.getElementById('main-link').href = link;
}
function displayArticles(articles) {
    const trendingContainer = document.querySelector('.trending .container');

    articles.forEach(article => {
        const card = document.createElement('div');
        card.classList.add('card');

        const title = article.title;
        const description = article.description;
        const image = article.urlToImage;
        const alt = article.title;
        const source = article.source.name;
        const link = article.url;

        card.innerHTML = `<div class="news-image">
            <img src="${image}" alt="${alt}">
        </div>
        <div class="news-content">
            <h1>${title}</h1>
            <p>${description}</p>
            <p><strong>Source:</strong> ${source}</p>
            <div class="read-more">
                <hr>
                <a href="${link}" target="_blank">Read More</a>
            </div>
        </div>`;

        trendingContainer.appendChild(card);
    });
}

let allArticles = [];
let displayedCount = 0;

document.getElementById('load-more').addEventListener('click', function() {
    displayedCount += loadMoreCount;
    const moreArticles = allArticles.slice(displayedCount, displayedCount + loadMoreCount);
    displayArticles(moreArticles);

    if (displayedCount + loadMoreCount >= allArticles.length) {
        this.style.display = 'none';
    }
});

async function init(query = '') {
    allArticles = await fetchNews(query);
    if(!query){
        displayMainNews(allArticles);
        displayArticles(allArticles.slice(1, maxNews+1));
    }else{
        displayArticles(allArticles.slice(0, maxNews));
    }
    displayedCount = maxNews;

    if (displayedCount >= allArticles.length) {
        document.getElementById('load-more').style.display = 'none';
    } else {
        document.getElementById('load-more').style.display = 'block';
    }
}

// Initialize with default articles
document.addEventListener('DOMContentLoaded', function () {
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

// Search functionality
function performSearch() {
    const query = document.getElementById('search-query').value.trim();
    if (query) {
        document.getElementById('search-query').value = '';
        window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
    }
}

document.getElementById('search-button').addEventListener('click', performSearch);

document.getElementById('search-query').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

// for smaller screens
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger input');
    const navUl = document.querySelector('nav ul');

    hamburger.addEventListener('change', function () {
        if (this.checked) {
            navUl.classList.add('show');
            navUl.classList.remove('hide');
        } else {
            navUl.classList.add('hide');
            navUl.classList.remove('show');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.querySelector('.search');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-query');

    searchButton.addEventListener('click', () => {
        searchBar.classList.toggle('search-expanded');
        if (searchBar.classList.contains('search-expanded')) {
            searchInput.focus();
        } else {
            searchInput.blur();
        }
    });

    document.addEventListener('click', (event) => {
        if (!searchBar.contains(event.target) && searchBar.classList.contains('search-expanded')) {
            searchBar.classList.remove('search-expanded');
            searchInput.blur();
        }
    });
});
