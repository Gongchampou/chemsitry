# Chemistry Education Portal
- 🌐 [LINK here](https://chemsitry.pages.dev)

A comprehensive, static Chemistry educational website covering everything from basic chemistry concepts to advanced university-level topics. Built with HTML5, CSS3, and vanilla JavaScript - no frameworks, no backend, no database required.

## 🌟 Features

- **Complete Chemistry Coverage**: Physical, Organic, Inorganic, Analytical, and Applied Chemistry
- **Interactive Periodic Table**: Searchable, filterable with hover tooltips
- **Chemical Equation Balancer**: Simple tool to balance chemical equations
- **Interactive Quizzes**: Multiple-choice quizzes with instant feedback
- **Flashcards**: Study cards for quick revision
- **Dark/Light Mode**: User preference saved in browser
- **Fully Responsive**: Works on desktop, tablet, and mobile
- **PWA Ready**: Service worker for offline caching
- **SEO Optimized**: Meta tags for better search visibility

## 📁 Project Structure

```
chemistry/
├── index.html                  # Home page
├── about.html                  # About page with history and famous chemists
├── contact.html                # Contact form page
├── faq.html                    # Frequently Asked Questions
├── css/
│   └── style.css              # Main stylesheet with dark/light themes
├── js/
│   ├── main.js                # Main JavaScript (theme toggle, facts, collapsibles)
│   ├── periodic-table.js      # Interactive periodic table
│   ├── equation-balancer.js   # Chemical equation balancer
│   ├── quiz.js                # Quiz system
│   └── service-worker.js      # PWA service worker
└── branches/
    ├── physical-chemistry.html
    ├── organic-chemistry.html
    ├── inorganic-chemistry.html
    ├── analytical-chemistry.html
    └── applied-chemistry.html
```

## 🚀 Deployment Instructions

### Option 1: GitHub Pages (Free & Easy)

1. **Create a GitHub Repository**
   ```bash
   # Initialize git repository
   git init
   git add .
   git commit -m "Initial commit: Chemistry Education Portal"
   ```

2. **Push to GitHub**
   ```bash
   # Create a new repository on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/chemistry-portal.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **main** branch and **/ (root)** folder
   - Click **Save**
   - Your site will be live at: `https://YOUR_USERNAME.github.io/chemistry-portal/`

4. **Update Service Worker Paths** (Important!)
   - After deployment, update `js/service-worker.js`
   - Change paths from `/` to `/chemistry-portal/` (or your repo name)
   - Example: `'/'` → `'/chemistry-portal/'`

### Option 2: Netlify (Recommended for Easy Deployment)

1. **Prepare Your Files**
   - Ensure all files are in a folder (or zip them)

2. **Deploy on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login (free)
   - Click **Add new site** → **Deploy manually**
   - Drag and drop your project folder
   - Your site will be live immediately!

3. **Custom Domain (Optional)**
   - In Netlify settings, go to **Domain management**
   - Add your custom domain
   - Follow DNS configuration instructions

### Option 3: Vercel

1. **Install Vercel CLI** (optional)
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   # In your project directory
   vercel
   ```
   - Follow prompts
   - Your site will be live at a `.vercel.app` URL

3. **Or Use Web Interface**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Automatic deployment on every push

### Option 4: Traditional Web Hosting

1. **Upload Files**
   - Upload all files via FTP/SFTP to your web hosting
   - Place files in `public_html` or `www` directory

2. **Ensure Correct Structure**
   - Maintain folder structure (`css/`, `js/`, `branches/`)
   - All relative paths will work

## 🛠️ Local Development

1. **Clone or Download**
   ```bash
   git clone https://github.com/YOUR_USERNAME/chemistry-portal.git
   cd chemistry-portal
   ```

2. **Open in Browser**
   - Simply open `index.html` in your browser
   - Or use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Node.js (with http-server)
     npx http-server
     
     # PHP
     php -S localhost:8000
     ```

3. **Access**
   - Navigate to `http://localhost:8000` in your browser

## 📝 Adding More Content

### Adding Quiz Questions

Edit `js/quiz.js` and add questions to the appropriate topic array:

```javascript
const quizzes = {
    basic: [
        {
            question: "Your question here?",
            options: ["Option 1", "Option 2", "Option 3", "Option 4"],
            correct: 0  // Index of correct answer
        }
    ]
};
```

### Adding New Topics

1. Edit the relevant branch HTML file in `branches/`
2. Add a new collapsible section:
```html
<div class="collapsible">
    <div class="collapsible-header">
        <span>Your Topic Title</span>
        <span>▼</span>
    </div>
    <div class="collapsible-content">
        <div class="collapsible-body">
            <h3>Content here</h3>
            <p>Your content...</p>
        </div>
    </div>
</div>
```

### Adding Flashcards

In any HTML file, add flashcard divs:

```html
<div class="flashcard">
    <div class="flashcard-inner">
        <div class="flashcard-front">
            <h4>Question or Term</h4>
        </div>
        <div class="flashcard-back">
            <p>Answer or Definition</p>
        </div>
    </div>
</div>
```

### Adding Chemistry Facts

Edit `js/main.js` and add to the `chemistryFacts` array:

```javascript
const chemistryFacts = [
    "Your new fact here!",
    // ... existing facts
];
```

## 🎨 Customization

### Changing Colors

Edit CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #2196F3;    /* Main blue */
    --secondary-color: #4CAF50;   /* Green accent */
    --accent-color: #FF9800;      /* Orange accent */
    /* ... */
}
```

### Adding New Pages

1. Create new HTML file
2. Copy structure from existing pages
3. Update navigation links in `navbar`
4. Link from home page or relevant pages

## 🔧 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is provided for educational purposes. Feel free to use, modify, and distribute for educational use.

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- More quiz questions
- Additional chemistry topics
- Improved explanations
- Bug fixes
- Accessibility improvements
- Performance optimizations

## 📧 Support

For questions or issues:
- Check the [FAQ page](faq.html)
- Visit the [Contact page](contact.html)
- Open an issue on GitHub (if using GitHub)

## 🎯 Future Enhancements

Potential features to add:
- [ ] More interactive molecular visualizations
- [ ] Additional quiz topics
- [ ] Printable study guides
- [ ] Search functionality
- [ ] User progress tracking (localStorage)
- [ ] More chemistry facts
- [ ] Video embeds
- [ ] 3D molecular viewer

---

**Built with ❤️ for chemistry education**

*Last updated: 2025*

