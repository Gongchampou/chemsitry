/* ========================================
   MAIN JAVASCRIPT FILE
   ========================================
   This file handles:
   - Theme toggle (light/dark mode)
   - Today's Chemistry Facts rotation
   - Collapsible section functionality
   - Service Worker registration (PWA)
   - Smooth scroll for anchor links
   
   All functions initialize when the DOM is fully loaded.
*/

/* ========================================
   DOM CONTENT LOADED EVENT
   ========================================
   Waits for HTML to fully load before running JavaScript.
   This ensures all elements exist before we try to access them.
*/
document.addEventListener('DOMContentLoaded', function() {
    /* ========================================
       ACTIVE NAVIGATION LINK
       ========================================
       Highlights the current page link in navigation.
    */
    
    // Get current page URL
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    const currentHash = window.location.hash;
    const currentFullPath = currentPath + currentHash;
    
    // Check if we're on the home page (index.html or root)
    const isHomePage = currentPage === '' || currentPage === 'index.html' || currentPath.endsWith('/') || currentPath === '/';
    
    // Find all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        // Get link href and clean it up
        let linkHref = link.getAttribute('href');
        if (!linkHref) return;
        
        // Remove active class first (will re-add if matches)
        link.classList.remove('active');
        
        // Handle links that are just anchors (starting with #)
        if (linkHref.startsWith('#')) {
            // Only mark active if we're on home page AND hash matches
            if (isHomePage && currentHash === linkHref) {
                link.classList.add('active');
            }
            return; // Done processing this link
        }
        
        // For links with pages, extract both page and hash
        let linkPage = '';
        let linkHash = '';
        
        // Split href into page and hash parts
        if (linkHref.includes('#')) {
            const parts = linkHref.split('#');
            linkPage = parts[0];
            linkHash = '#' + parts[1];
        } else {
            linkPage = linkHref;
        }
        
        // Normalize link page - extract just the filename
        if (linkPage.includes('/')) {
            linkPage = linkPage.split('/').pop();
        }
        
        // Handle relative paths (../)
        if (linkHref.includes('../')) {
            try {
                // Resolve relative path properly
                const baseUrl = window.location.origin + currentPath.substring(0, currentPath.lastIndexOf('/')) + '/';
                const resolvedUrl = new URL(linkHref, baseUrl);
                linkPage = resolvedUrl.pathname.split('/').pop();
            } catch (e) {
                // Fallback: simple string replacement
                linkPage = linkHref.replace(/\.\.\//g, '').split('/').pop().split('#')[0];
            }
        }
        
        // Normalize page names (empty or index variations = 'index.html')
        if (!linkPage || linkPage === '' || linkPage === 'index.html') {
            linkPage = 'index.html';
        }
        
        // Normalize current page
        const normalizedCurrentPage = (!currentPage || currentPage === '' || currentPage === 'index.html') ? 'index.html' : currentPage;
        
        // Check if this link matches the current page
        if (linkPage === normalizedCurrentPage) {
            // If link has a hash (like index.html#tools)
            if (linkHash) {
                // Mark active only if hash matches
                if (currentHash === linkHash && isHomePage) {
                    link.classList.add('active');
                }
            } else {
                // Link without hash (regular page link)
                if (linkPage === 'index.html') {
                    // Home link: active if on home page AND no hash
                    if (isHomePage && !currentHash) {
                        link.classList.add('active');
                    }
                } else {
                    // Other pages: active if page matches
                    link.classList.add('active');
                }
            }
        }
    });
    
    /* ========================================
       THEME TOGGLE FUNCTIONALITY
       ========================================
       Allows users to switch between light and dark themes.
       Theme preference is saved in browser localStorage.
    */
    
    // Load saved theme from browser storage, default to 'light' if none saved
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme to HTML element (triggers CSS variable changes)
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Find the theme toggle button in the navigation
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Update theme toggle icon based on current theme
    function updateThemeIcon() {
        if (!themeToggle) return;
        
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        // Update icon: moon for light mode (click to go dark), sun for dark mode (click to go light)
        if (currentTheme === 'dark') {
            themeToggle.textContent = '☀️';  // Sun icon for dark mode (switch to light)
            themeToggle.setAttribute('data-tooltip', 'Switch to Light Mode');
        } else {
            themeToggle.textContent = '🌙';  // Moon icon for light mode (switch to dark)
            themeToggle.setAttribute('data-tooltip', 'Switch to Dark Mode');
        }
    }
    
    // Update icon on page load
    updateThemeIcon();
    
    // If toggle button exists, add click event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Get current theme from HTML element
            const currentTheme = document.documentElement.getAttribute('data-theme');
            
            // Toggle to opposite theme
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Apply new theme to HTML element
            document.documentElement.setAttribute('data-theme', newTheme);
            
            // Save preference to browser storage for future visits
            localStorage.setItem('theme', newTheme);
            
            // Update icon after theme change
            updateThemeIcon();
        });
    }
    
    // Initialize Today's Fact rotation
    initTodaysFact();
    
    // Initialize collapsible sections
    initCollapsibles();
});

/* ========================================
   TODAY'S CHEMISTRY FACT
   ========================================
   Array of interesting chemistry facts that rotate automatically.
   Facts change every 5 seconds with a fade animation.
*/
const chemistryFacts = [
    "Water expands when it freezes, which is why ice floats on water!",
    "The human body contains enough carbon to make about 9,000 pencils.",
    "Gold and copper are the only two non-silvery colored metals.",
    "Hydrogen is the most abundant element in the universe, making up about 75% of all matter.",
    "Diamonds and graphite are both made of pure carbon, but arranged differently!",
    "Glass is actually a supercooled liquid, not a solid.",
    "A single cloud can weigh more than a million pounds!",
    "Oxygen was discovered in 1774 by Joseph Priestley.",
    "The average person takes about 20,000 breaths per day, inhaling about 438 cubic feet of oxygen.",
    "DNA has a half-life of 521 years, so dinosaurs' DNA is completely gone."
];

/* ========================================
   INITIALIZE TODAY'S FACT ROTATION
   ========================================
   Function that rotates through chemistry facts automatically.
   - Finds the fact display element
   - Starts with first fact
   - Changes fact every 5 seconds
   - Uses fade animation for smooth transitions
*/
function initTodaysFact() {
    // Find the element where facts are displayed
    const factElement = document.querySelector('.fact-content');
    
    // Only proceed if the element exists (some pages may not have it)
    if (factElement) {
        let currentIndex = 0;  // Start at first fact
        
        // Show the initial fact immediately
        factElement.textContent = chemistryFacts[currentIndex];
        
        // Set up interval to rotate facts every 5 seconds (5000 milliseconds)
        setInterval(() => {
            // Move to next fact, loop back to start when reaching the end
            currentIndex = (currentIndex + 1) % chemistryFacts.length;
            
            // Fade out current fact (opacity becomes 0)
            factElement.style.opacity = '0';
            
            // After 300ms (half of transition), change text and fade in
            setTimeout(() => {
                factElement.textContent = chemistryFacts[currentIndex];
                factElement.style.opacity = '1';
            }, 300);
        }, 5000);  // Repeat every 5 seconds
        
        // Add CSS transition for smooth opacity change
        factElement.style.transition = 'opacity 0.3s';
    }
}

/* ========================================
   COLLAPSIBLE SECTIONS FUNCTIONALITY
   ========================================
   Makes collapsible sections expand/collapse when header is clicked.
   Used in branch pages for organizing content sections.
   - Only one section open at a time (optional behavior)
   - Smooth height transition
*/
function initCollapsibles() {
    // Find all collapsible headers (clickable titles)
    const collapsibles = document.querySelectorAll('.collapsible-header');
    
    // Add click listener to each header
    collapsibles.forEach(header => {
        header.addEventListener('click', function() {
            // Find the content section next to this header
            const content = this.nextElementSibling;
            
            // Check if content is currently open
            const isOpen = content.classList.contains('open');
            
            // Optional: Close all sections in the same container
            // This ensures only one section is open at a time
            // Remove this block if you want multiple sections open simultaneously
            const container = this.closest('.collapsible-container');
            if (container) {
                // Find all content sections in this container
                container.querySelectorAll('.collapsible-content').forEach(item => {
                    // Remove 'open' class to close them
                    item.classList.remove('open');
                });
            }
            
            // If section was closed, open it
            if (!isOpen) {
                content.classList.add('open');
            }
            // If section was open, it gets closed by the code above
        });
    });
}

/* ========================================
   SERVICE WORKER REGISTRATION (PWA)
   ========================================
   Registers service worker for Progressive Web App functionality.
   Enables offline caching and improved performance.
*/
if ('serviceWorker' in navigator) {
    // Wait for page to fully load before registering
    window.addEventListener('load', () => {
        // Register the service worker file
        navigator.serviceWorker.register('/js/service-worker.js')
            .then(reg => console.log('Service Worker registered'))  // Success message
            .catch(err => console.log('Service Worker registration failed'));  // Error message
    });
}

/* ========================================
   SMOOTH SCROLL FUNCTIONALITY
   ========================================
   Makes anchor links (links starting with #) scroll smoothly
   instead of jumping instantly to the target section.
*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Prevent default instant jump behavior
        e.preventDefault();
        
        // Get the target element using the href value (e.g., #tools)
        const target = document.querySelector(this.getAttribute('href'));
        
        // If target exists, scroll to it smoothly
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',  // Smooth scrolling animation
                block: 'start'        // Align to top of viewport
            });
        }
    });
});
