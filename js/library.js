/* ========================================
   CHEMISTRY LIBRARY SYSTEM
   ========================================
   JavaScript for loading and displaying chemistry
   library resources from JSON data file.
   
   FEATURES:
   - Load library data from JSON file
   - Filter by category, level, format
   - Search by title, author, or tags
   - Display items in responsive grid
   - Category tabs for easy navigation
*/

/* ========================================
   GLOBAL VARIABLES
   ======================================== */

let libraryData = null;           // Store loaded library data
let currentCategory = 'all';      // Currently selected category
let filteredItems = [];            // Items after filtering

/* ========================================
   LOAD LIBRARY DATA
   ========================================
   Fetches library data from JSON file.
*/
async function loadLibraryData() {
    try {
        const response = await fetch('data/library.json');
        if (!response.ok) {
            throw new Error('Failed to load library data');
        }
        libraryData = await response.json();
        initializeLibrary();
    } catch (error) {
        console.error('Error loading library data:', error);
        displayError('Failed to load library data. Please refresh the page.');
    }
}

/* ========================================
   INITIALIZE LIBRARY
   ========================================
   Sets up the library page after data is loaded.
*/
function initializeLibrary() {
    if (!libraryData) return;
    
    // Create category tabs
    createCategoryTabs();
    
    // Display all items initially
    displayAllItems();
    
    // Set up search functionality
    setupSearch();
    
    // Set up filter functionality
    setupFilters();
}

/* ========================================
   CREATE CATEGORY TABS
   ========================================
   Creates navigation tabs for each category.
*/
function createCategoryTabs() {
    const tabsContainer = document.querySelector('.category-tabs');
    if (!tabsContainer) return;
    
    // Add "All" tab
    const allTab = document.createElement('button');
    allTab.className = 'category-tab active';
    allTab.textContent = 'All Resources';
    allTab.dataset.category = 'all';
    allTab.addEventListener('click', () => selectCategory('all'));
    tabsContainer.appendChild(allTab);
    
    // Add category tabs
    libraryData.categories.forEach(category => {
        const tab = document.createElement('button');
        tab.className = 'category-tab';
        tab.textContent = category.name;
        tab.dataset.category = category.id;
        tab.addEventListener('click', () => selectCategory(category.id));
        tabsContainer.appendChild(tab);
    });
}

/* ========================================
   SELECT CATEGORY
   ========================================
   Handles category tab selection and filters items.
   
   Parameters:
   - categoryId: String - ID of selected category
*/
function selectCategory(categoryId) {
    currentCategory = categoryId;
    
    // Update active tab
    document.querySelectorAll('.category-tab').forEach(tab => {
        if (tab.dataset.category === categoryId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Filter and display items
    applyFilters();
}

/* ========================================
   DISPLAY ALL ITEMS
   ========================================
   Collects all items from all categories and displays them.
*/
function displayAllItems() {
    const allItems = [];
    libraryData.categories.forEach(category => {
        category.items.forEach(item => {
            allItems.push({
                ...item,
                categoryName: category.name,
                categoryId: category.id
            });
        });
    });
    
    filteredItems = allItems;
    renderItems(allItems);
}

/* ========================================
   APPLY FILTERS
   ========================================
   Applies all active filters and search query,
   then displays filtered results.
*/
function applyFilters() {
    let items = [];
    
    // Get items from selected category or all categories
    if (currentCategory === 'all') {
        libraryData.categories.forEach(category => {
            category.items.forEach(item => {
                items.push({
                    ...item,
                    categoryName: category.name,
                    categoryId: category.id
                });
            });
        });
    } else {
        const category = libraryData.categories.find(cat => cat.id === currentCategory);
        if (category) {
            category.items.forEach(item => {
                items.push({
                    ...item,
                    categoryName: category.name,
                    categoryId: category.id
                });
            });
        }
    }
    
    // Apply level filter
    const levelFilter = document.getElementById('level-filter')?.value;
    if (levelFilter && levelFilter !== 'all') {
        items = items.filter(item => item.level === levelFilter);
    }
    
    // Apply format filter
    const formatFilter = document.getElementById('format-filter')?.value;
    if (formatFilter && formatFilter !== 'all') {
        items = items.filter(item => item.format === formatFilter);
    }
    
    // Apply free filter
    const freeFilter = document.getElementById('free-filter')?.value;
    if (freeFilter === 'free') {
        items = items.filter(item => item.free === true);
    } else if (freeFilter === 'premium') {
        items = items.filter(item => item.free === false || !item.hasOwnProperty('free'));
    }
    
    // Apply search query
    const searchQuery = document.getElementById('search-input')?.value.toLowerCase().trim();
    if (searchQuery) {
        items = items.filter(item => {
            const titleMatch = item.title?.toLowerCase().includes(searchQuery);
            const authorMatch = item.author?.toLowerCase().includes(searchQuery);
            const descMatch = item.description?.toLowerCase().includes(searchQuery);
            const tagMatch = item.tags?.some(tag => tag.toLowerCase().includes(searchQuery));
            return titleMatch || authorMatch || descMatch || tagMatch;
        });
    }
    
    filteredItems = items;
    renderItems(items);
}

/* ========================================
   RENDER ITEMS
   ========================================
   Displays library items in the grid.
   
   Parameters:
   - items: Array - Array of item objects to display
*/
function renderItems(items) {
    const grid = document.querySelector('.library-grid');
    if (!grid) return;
    
    // Clear existing items
    grid.innerHTML = '';
    
    // Show message if no results
    if (items.length === 0) {
        grid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1;">
                <h3>No Results Found</h3>
                <p>Try adjusting your filters or search query.</p>
            </div>
        `;
        return;
    }
    
    // Render each item
    items.forEach(item => {
        const itemCard = createItemCard(item);
        grid.appendChild(itemCard);
    });
}

/* ========================================
   CREATE ITEM CARD
   ========================================
   Creates HTML card for a library item.
   
   Parameters:
   - item: Object - Item data object
   
   Returns:
   - HTMLElement - Item card element
*/
function createItemCard(item) {
    const card = document.createElement('div');
    card.className = 'library-item';
    
    // Build rating stars
    const ratingStars = generateRatingStars(item.rating || 0);
    
    // Build tags HTML
    const tagsHTML = item.tags ? item.tags.map(tag => 
        `<span class="tag">${tag}</span>`
    ).join('') : '';
    
    // Build meta information
    let metaHTML = '';
    if (item.year) metaHTML += `<span>${item.year}</span>`;
    if (item.publisher) metaHTML += `<span>${item.publisher}</span>`;
    if (item.edition) metaHTML += `<span>${item.edition}</span>`;
    if (item.pages) metaHTML += `<span>${item.pages} pages</span>`;
    if (item.journal) metaHTML += `<span>${item.journal}</span>`;
    
    // Determine link text and badge
    let linkText = 'View Resource';
    let linkClass = 'item-link';
    if (item.free === true) {
        linkText = 'Access Free Resource';
        linkClass += ' free';
    } else if (item.free === false) {
        linkClass += ' premium';
    }
    
    // Build card HTML
    card.innerHTML = `
        <div class="item-header">
            <h3 class="item-title">
                ${item.title}
                ${item.free === true ? '<span class="free-badge">FREE</span>' : ''}
                ${item.free === false ? '<span class="premium-badge">PREMIUM</span>' : ''}
            </h3>
            ${item.author ? `<div class="item-author">${item.author}</div>` : ''}
            ${metaHTML ? `<div class="item-meta">${metaHTML}</div>` : ''}
        </div>
        
        <div class="item-body">
            ${item.rating ? `
                <div class="item-rating">
                    <span class="rating-stars">${ratingStars}</span>
                    <span class="rating-value">${item.rating}/5.0</span>
                </div>
            ` : ''}
            
            <p class="item-description">${item.description || 'No description available.'}</p>
            
            ${item.isbn ? `
                <div class="item-details">
                    <div class="item-detail-row">
                        <span class="item-detail-label">ISBN:</span>
                        <span class="item-detail-value">${item.isbn}</span>
                    </div>
                </div>
            ` : ''}
            
            ${item.category ? `
                <div class="item-details">
                    <div class="item-detail-row">
                        <span class="item-detail-label">Category:</span>
                        <span class="item-detail-value">${item.category}</span>
                    </div>
                </div>
            ` : ''}
            
            ${item.level ? `
                <div class="item-details">
                    <div class="item-detail-row">
                        <span class="item-detail-label">Level:</span>
                        <span class="item-detail-value">${item.level}</span>
                    </div>
                </div>
            ` : ''}
            
            ${item.format ? `
                <div class="item-details">
                    <div class="item-detail-row">
                        <span class="item-detail-label">Format:</span>
                        <span class="item-detail-value">${item.format}</span>
                    </div>
                </div>
            ` : ''}
            
            ${tagsHTML ? `<div class="item-tags">${tagsHTML}</div>` : ''}
        </div>
        
        <div class="item-footer">
            <a href="${item.link || '#'}" 
               class="${linkClass}" 
               target="${item.link && item.link.startsWith('http') ? '_blank' : '_self'}"
               rel="${item.link && item.link.startsWith('http') ? 'noopener noreferrer' : ''}">
                ${linkText}
            </a>
        </div>
    `;
    
    return card;
}

/* ========================================
   GENERATE RATING STARS
   ========================================
   Creates star rating HTML.
   
   Parameters:
   - rating: Number - Rating value (0-5)
   
   Returns:
   - String - HTML for rating stars
*/
function generateRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '★'.repeat(fullStars);
    if (hasHalfStar) starsHTML += '½';
    starsHTML += '☆'.repeat(emptyStars);
    
    return starsHTML;
}

/* ========================================
   SETUP SEARCH
   ========================================
   Sets up search input functionality.
*/
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    // Search on input (debounced)
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            applyFilters();
        }, 300); // Wait 300ms after user stops typing
    });
}

/* ========================================
   SETUP FILTERS
   ========================================
   Sets up filter dropdown functionality.
*/
function setupFilters() {
    const levelFilter = document.getElementById('level-filter');
    const formatFilter = document.getElementById('format-filter');
    const freeFilter = document.getElementById('free-filter');
    const clearBtn = document.querySelector('.clear-filters-btn');
    
    // Add event listeners to filters
    if (levelFilter) {
        levelFilter.addEventListener('change', applyFilters);
    }
    if (formatFilter) {
        formatFilter.addEventListener('change', applyFilters);
    }
    if (freeFilter) {
        freeFilter.addEventListener('change', applyFilters);
    }
    
    // Clear filters button
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            // Reset all filters
            if (levelFilter) levelFilter.value = 'all';
            if (formatFilter) formatFilter.value = 'all';
            if (freeFilter) freeFilter.value = 'all';
            if (document.getElementById('search-input')) {
                document.getElementById('search-input').value = '';
            }
            
            // Reset to "All" category
            selectCategory('all');
        });
    }
}

/* ========================================
   DISPLAY ERROR
   ========================================
   Shows error message to user.
   
   Parameters:
   - message: String - Error message to display
*/
function displayError(message) {
    const grid = document.querySelector('.library-grid');
    if (grid) {
        grid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1;">
                <h3>Error</h3>
                <p>${message}</p>
            </div>
        `;
    }
}

/* ========================================
   AUTO-INITIALIZE
   ========================================
   Loads library data when page loads.
*/
document.addEventListener('DOMContentLoaded', function() {
    loadLibraryData();
});

