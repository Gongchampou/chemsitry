# Code Structure & Documentation Guide

This document explains the file structure and organization of the Chemistry Education Portal website.

## 📁 File Structure

```
chemistry/
├── index.html                      # Home page
├── about.html                      # About page (history, chemists, Nobel Prizes)
├── contact.html                    # Contact form page
├── faq.html                        # Frequently Asked Questions
├── manifest.json                   # PWA manifest file
├── README.md                       # Deployment instructions
├── CODE_STRUCTURE.md               # This file - code documentation
│
├── css/                            # Stylesheets directory
│   ├── style.css                   # Main file (imports all others)
│   ├── base.css                    # Variables, reset, base styles
│   ├── navigation.css              # Navbar styles
│   ├── hero.css                    # Hero/banner sections
│   ├── layout.css                  # Containers, cards, grids
│   ├── components.css              # Buttons, forms, reusable components
│   ├── periodic-table.css          # Periodic table styles
│   ├── interactive.css             # Quizzes, flashcards, collapsibles
│   ├── modal.css                   # Element detail modal
│   ├── footer.css                  # Footer styles
│   └── responsive.css               # Mobile/tablet media queries
│
├── js/                             # JavaScript files
│   ├── main.js                     # Theme toggle, facts, collapsibles
│   ├── periodic-table.js           # Periodic table functionality
│   ├── equation-balancer.js         # Chemical equation balancer
│   ├── quiz.js                     # Quiz system
│   └── service-worker.js           # PWA offline support
│
└── branches/                       # Chemistry branch pages
    ├── physical-chemistry.html
    ├── organic-chemistry.html
    ├── inorganic-chemistry.html
    ├── analytical-chemistry.html
    └── applied-chemistry.html
```

## 🎨 CSS File Organization

### `style.css` (Main File)
- **Purpose**: Imports all other CSS files in correct order
- **Edit**: Use this file or edit individual component files
- **Note**: Uses `@import` to load all stylesheets

### Individual CSS Files

1. **`base.css`**
   - CSS custom properties (variables) for colors
   - Light/dark theme definitions
   - Universal reset styles
   - HTML/body base styles
   - **Edit colors here**: Change `--primary-color`, `--secondary-color`, etc.

2. **`navigation.css`**
   - Navbar styling
   - Navigation links
   - Theme toggle button
   - **Edit navigation**: Change navbar appearance

3. **`hero.css`**
   - Hero/banner sections
   - Molecule animation
   - Large title styles
   - **Edit hero sections**: Change banner appearance

4. **`layout.css`**
   - Main containers
   - Card components
   - Grid layouts
   - Branch cards
   - **Edit layout**: Change page structure, spacing

5. **`components.css`**
   - Buttons (`.btn`)
   - Form inputs
   - Today's Fact section
   - Result boxes
   - **Edit components**: Change button styles, form appearance

6. **`periodic-table.css`**
   - Periodic table grid
   - Element boxes
   - Search and filters
   - Element category colors
   - Tooltips
   - **Edit periodic table**: Change colors, sizes, layout

7. **`interactive.css`**
   - Quiz styles
   - Flashcard animations
   - Collapsible sections
   - Equation balancer container
   - **Edit interactive**: Change quiz/flashcard appearance

8. **`modal.css`**
   - Modal overlay
   - Element detail dialog
   - Close button
   - All modal content styling
   - **Edit modal**: Change dialog appearance, fonts

9. **`footer.css`**
   - Footer container
   - Footer links
   - **Edit footer**: Change footer appearance

10. **`responsive.css`**
    - All mobile/tablet styles
    - Media queries (@media)
    - **Edit responsive**: Change mobile layouts

## 💻 JavaScript File Organization

### `main.js`
**Purpose**: Core website functionality

**Functions**:
- Theme toggle (light/dark mode)
- Today's Chemistry Facts rotation
- Collapsible sections
- Service worker registration
- Smooth scroll

**Edit**: 
- Add more facts: Edit `chemistryFacts` array
- Change fact rotation speed: Modify `5000` (milliseconds) in `setInterval`

### `periodic-table.js`
**Purpose**: Interactive periodic table

**Functions**:
- `initPeriodicTable()`: Creates periodic table grid
- `showElementModal()`: Shows element detail dialog
- Helper functions for element properties

**Edit**:
- Add elements: Add objects to `periodicTableData` array
- Add element properties: Edit helper functions (getMeltingPoint, etc.)
- Change modal content: Edit HTML template in `showElementModal()`

### `equation-balancer.js`
**Purpose**: Chemical equation balancing

**Functions**:
- `parseCompound()`: Parses chemical formulas
- `balanceEquation()`: Balances equations
- `initEquationBalancer()`: Sets up form

**Edit**:
- Add example equations: Add to `examples` array
- Improve balancing: Enhance `balanceEquation()` function

### `quiz.js`
**Purpose**: Quiz system

**Functions**:
- `initQuiz()`: Sets up quiz
- `displayQuestion()`: Shows questions
- `showResults()`: Displays score

**Edit**:
- Add questions: Add objects to `quizzes` object
- Add new topics: Add new properties to `quizzes` (e.g., `quizzes.advanced`)
- Change quiz behavior: Modify navigation or scoring logic

### `service-worker.js`
**Purpose**: PWA offline support

**Edit**:
- Update cache: Change `CACHE_NAME` version
- Add files to cache: Add URLs to `urlsToCache` array
- Update paths: Adjust URLs for your deployment path

## 📝 How to Edit

### Changing Colors
1. Open `css/base.css`
2. Edit CSS variables in `:root` and `[data-theme="dark"]`
3. Colors update across entire site automatically

### Adding New Quiz Questions
1. Open `js/quiz.js`
2. Find `quizzes` object
3. Add question object to appropriate topic array:
```javascript
{
    question: "Your question?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correct: 0  // Index of correct answer (0-3)
}
```

### Adding New Chemistry Facts
1. Open `js/main.js`
2. Find `chemistryFacts` array
3. Add new string to array

### Adding Element Details
1. Open `js/periodic-table.js`
2. Find helper functions (getMeltingPoint, getDensity, etc.)
3. Add data to the objects within those functions

### Adding New Pages
1. Create HTML file (e.g., `new-page.html`)
2. Copy structure from existing page
3. Add link in navigation (update `navigation.css` if needed)
4. Add to service worker cache list

### Modifying Spacing/Layout
1. Open relevant CSS file (`layout.css` for general spacing)
2. Find the component you want to change
3. Adjust padding/margin values
4. Comments explain what each property does

## 🔍 Finding Code Sections

### Navigation Menu
- **CSS**: `css/navigation.css`
- **HTML**: `<nav class="navbar">` in all HTML files

### Periodic Table
- **CSS**: `css/periodic-table.css`
- **JavaScript**: `js/periodic-table.js`
- **HTML**: `<div class="periodic-table-container">`

### Quizzes
- **CSS**: `css/interactive.css` (`.quiz-container`, `.option`)
- **JavaScript**: `js/quiz.js`
- **HTML**: `<div class="quiz-container">`

### Modal Dialog
- **CSS**: `css/modal.css`
- **JavaScript**: `js/periodic-table.js` → `showElementModal()`
- **Created dynamically**: No HTML template

### Theme Toggle
- **CSS**: `css/navigation.css` (`.theme-toggle`)
- **JavaScript**: `js/main.js` → DOMContentLoaded event

## 📚 Code Comments

All files are extensively commented:
- File headers explain purpose
- Function headers explain parameters and returns
- Inline comments explain complex logic
- Section dividers organize code

## 🎯 Quick Reference

| Want to change... | Edit this file |
|------------------|----------------|
| Colors | `css/base.css` (variables) |
| Fonts | `css/base.css` (body styles) |
| Button styles | `css/components.css` |
| Card styles | `css/layout.css` |
| Periodic table colors | `css/periodic-table.css` |
| Modal appearance | `css/modal.css` |
| Quiz questions | `js/quiz.js` |
| Chemistry facts | `js/main.js` |
| Element data | `js/periodic-table.js` |

## 🔄 Update Workflow

1. **Identify what to change** (color, layout, content, etc.)
2. **Find relevant file** using structure above
3. **Read file comments** to understand code
4. **Make changes** following existing patterns
5. **Test in browser**
6. **Update cache version** in `service-worker.js` if needed

## 💡 Tips

- **CSS Variables**: Use variables (`var(--primary-color)`) instead of hardcoded colors
- **Consistent Naming**: Follow existing class naming (`.card`, `.btn`, etc.)
- **Comments**: Add comments when adding complex features
- **Mobile First**: Check responsive.css for mobile styles
- **Test Both Themes**: Always test light and dark mode

## 🐛 Troubleshooting

**Styles not applying?**
- Check if CSS file is imported in `style.css`
- Verify HTML links to `css/style.css`

**JavaScript not working?**
- Check browser console for errors
- Verify script is loaded in HTML
- Check if element exists before accessing

**Modal not showing?**
- Check `js/periodic-table.js` modal creation
- Verify `css/modal.css` is loaded
- Check z-index values

**Theme not saving?**
- Check localStorage permissions
- Verify `js/main.js` theme toggle code

---

**Last Updated**: 2025/Nov.
**Maintained By**: Chemistry Education Portal Team

