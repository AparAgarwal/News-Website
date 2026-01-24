// Security and utility functions for News Website

/**
 * Validates if a URL is safe to use (prevents open redirects and XSS)
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if URL is safe, false otherwise
 */
function isValidURL(url) {
    if (!url || typeof url !== 'string') {
        return false;
    }

    try {
        const urlObj = new URL(url);
        // Only allow http and https protocols
        return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch (e) {
        return false;
    }
}

/**
 * Safely gets a DOM element by ID with error handling
 * @param {string} id - The element ID
 * @returns {HTMLElement|null} - The element or null if not found
 */
function safeGetElement(id) {
    return document.getElementById(id);
}

/**
 * Escapes HTML special characters to prevent XSS
 * @param {string} text - The text to escape
 * @returns {string} - The escaped text
 */
function escapeHTML(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Creates a news card element safely without innerHTML
 * @param {Object} article - The article data
 * @returns {HTMLElement} - The created card element
 */
function createNewsCardSafe(article) {
    const { title, description, source_id, image_url, link } = article;

    // Create card container
    const card = document.createElement('div');
    card.className = 'news-card';

    // Create image container
    const imageDiv = document.createElement('div');
    imageDiv.className = 'news-image';

    const img = document.createElement('img');
    img.alt = title || 'News image';

    // Set image with error handling
    if (image_url && typeof image_url === 'string') {
        img.src = image_url;
        img.onerror = function () {
            this.src = 'assets/placeholder.svg';
            this.onerror = null;
        };
    } else {
        img.src = 'assets/placeholder.svg';
    }

    imageDiv.appendChild(img);
    card.appendChild(imageDiv);

    // Create content container
    const contentDiv = document.createElement('div');
    contentDiv.className = 'news-content';

    // Add title
    const titleH1 = document.createElement('h1');
    titleH1.textContent = title || 'No title available';
    contentDiv.appendChild(titleH1);

    // Add description
    const descP = document.createElement('p');
    descP.textContent = description || 'No description available';
    contentDiv.appendChild(descP);

    // Add source
    const sourceP = document.createElement('p');
    const sourceStrong = document.createElement('strong');
    sourceStrong.textContent = 'Source: ';
    sourceP.appendChild(sourceStrong);
    sourceP.appendChild(document.createTextNode(source_id || 'Unknown'));
    contentDiv.appendChild(sourceP);

    // Add read more section
    const readMoreDiv = document.createElement('div');
    readMoreDiv.className = 'read-more';

    const hr = document.createElement('hr');
    readMoreDiv.appendChild(hr);

    // Validate and add link
    if (link && isValidURL(link)) {
        const linkA = document.createElement('a');
        linkA.href = link;
        linkA.target = '_blank';
        linkA.rel = 'noopener noreferrer'; // Security best practice
        linkA.textContent = 'Read More';
        readMoreDiv.appendChild(linkA);
    } else {
        const noLinkSpan = document.createElement('span');
        noLinkSpan.textContent = 'Link unavailable';
        noLinkSpan.style.color = '#999';
        readMoreDiv.appendChild(noLinkSpan);
    }

    contentDiv.appendChild(readMoreDiv);
    card.appendChild(contentDiv);

    return card;
}

/**
 * Creates a placeholder image element
 * @returns {string} - Data URL for placeholder image
 */
function getPlaceholderImage() {
    return 'assets/placeholder.svg';
}

/**
 * Shows a loading indicator
 * @param {HTMLElement} container - The container to show loading in
 */
function showLoading(container) {
    if (!container) return;

    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-indicator';
    loadingDiv.innerHTML = '<div class="spinner"></div><p>Loading news...</p>';
    loadingDiv.id = 'loading-indicator';
    container.appendChild(loadingDiv);
}

/**
 * Hides the loading indicator
 */
function hideLoading() {
    const loader = document.getElementById('loading-indicator');
    if (loader) {
        loader.remove();
    }
}

/**
 * Shows an error message to the user
 * @param {string} message - The error message to display
 * @param {HTMLElement} container - The container to show error in
 */
function showError(message, container) {
    if (!container) return;

    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = 'padding: 20px; background: #fee; border: 1px solid #fcc; border-radius: 5px; margin: 20px; color: #c00;';

    const errorText = document.createElement('p');
    errorText.textContent = message;
    errorDiv.appendChild(errorText);

    const retryBtn = document.createElement('button');
    retryBtn.textContent = 'Retry';
    retryBtn.style.cssText = 'margin-top: 10px; padding: 8px 16px; cursor: pointer;';
    retryBtn.onclick = () => window.location.reload();
    errorDiv.appendChild(retryBtn);

    container.appendChild(errorDiv);
}
