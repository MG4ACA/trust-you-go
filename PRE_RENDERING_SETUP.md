# Pre-rendering Setup Instructions for Trust You Go

## Fixing CSR Issue for SEO

---

## 🚨 THE PROBLEM

Your React app currently uses **Client-Side Rendering (CSR)**. When Google crawls your website, it sees this:

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="root"></div>
    <script src="/src/main.jsx"></script>
  </body>
</html>
```

**Everything else (your beautiful content, packages, destinations) is invisible to search engines!**

---

## ✅ THE SOLUTION: Pre-rendering

Pre-rendering generates static HTML files at build time. Search engines will see your actual content.

### Option 1: vite-plugin-prerender-routes (RECOMMENDED)

**Pros:**

- ✅ Easy to implement (30 minutes)
- ✅ Works with current setup
- ✅ AWS Amplify compatible
- ✅ No code refactor needed

**Cons:**

- ⚠️ Static only (fine for your use case)
- ⚠️ Need to rebuild when content changes

---

## 📝 STEP-BY-STEP IMPLEMENTATION

### Step 1: Install Dependencies

```bash
npm install vite-plugin-prerender-routes --save-dev
```

### Step 2: Update vite.config.js

Replace your `vite.config.js` with:

```javascript
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import prerenderRoutes from 'vite-plugin-prerender-routes';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    // Pre-render routes for SEO
    prerenderRoutes({
      routes: [
        // Main pages
        '/',
        '/about',
        '/contact',
        '/booking',
        '/packages',
        '/destinations',
        '/learn-about-sri-lanka',
        '/reviews',
        '/uk-to-sri-lanka-guide',

        // Add individual package routes here
        // '/packages/5-day-cultural-tour',
        // '/packages/7-day-wildlife-safari',

        // Add individual destination routes here
        // '/destinations/kandy',
        // '/destinations/ella',
      ],
      // Optional: customize rendering
      rendererOptions: {
        renderAfterDocumentEvent: 'render-event',
        maxConcurrentRoutes: 4,
      },
    }),
  ],

  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          ui: ['primereact', 'primeicons', 'primeflex'],
        },
      },
    },
  },

  base: '/',
});
```

### Step 3: Update App.jsx (Add Prerender Event)

Add this to your `main.jsx` or `App.jsx` to signal when rendering is complete:

```javascript
// In main.jsx, after ReactDOM.render
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Signal to prerenderer that app is ready
    document.dispatchEvent(new Event('render-event'));
  }, []);

  return (
    // ... your existing app
  );
}
```

### Step 4: Build and Test

```bash
# Build the project
npm run build

# Check the dist folder - you should see HTML files for each route
cd dist
ls -la

# You should see files like:
# - index.html (with actual content, not just <div id="root"></div>)
# - about/index.html
# - packages/index.html
# etc.

# Test locally
npm run preview
```

### Step 5: Verify Pre-rendering Works

**Test 1: View Source**

1. Open: http://localhost:4173 (preview)
2. Right-click → "View Page Source" (NOT Inspect)
3. You should see your actual content in the HTML

**Test 2: Google Rich Results Test**

1. Build and deploy to AWS Amplify
2. Go to: https://search.google.com/test/rich-results
3. Enter your URL
4. Check if Google can see your content

**Test 3: Disable JavaScript**

1. Open Chrome DevTools
2. Cmd/Ctrl + Shift + P → "Disable JavaScript"
3. Refresh page
4. You should still see content (maybe not interactive, but visible)

---

## 🚀 DEPLOYMENT TO AWS AMPLIFY

### Update amplify.yml (if you have one)

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### Deploy

```bash
# Commit changes
git add .
git commit -m "Add pre-rendering for SEO"
git push

# AWS Amplify will auto-deploy (if connected to GitHub)
```

---

## 🔍 ALTERNATIVE: React Helmet (Temporary Solution)

If pre-rendering is too complex right now, use React Helmet as a temporary fix:

### Step 1: Install

```bash
npm install react-helmet-async
```

### Step 2: Wrap App

```javascript
// In main.jsx
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
```

### Step 3: Use in Components

```javascript
// In Home.jsx (or any page component)
import { Helmet } from 'react-helmet-async';

function Home() {
  return (
    <>
      <Helmet>
        <title>Sri Lanka Tours UK | Custom Holiday Packages | Trust You Go</title>
        <meta
          name="description"
          content="UK's trusted Sri Lanka tour operator. Custom holiday packages from £899."
        />
        <link rel="canonical" href="https://www.trustyou-go.com/" />
      </Helmet>

      {/* Your existing component */}
    </>
  );
}
```

**⚠️ WARNING:** React Helmet alone won't fix the CSR issue completely. It helps with dynamic meta tags but search engines still need to execute JavaScript to see content. Use this only as a temporary solution while implementing pre-rendering.

---

## 📊 VERIFICATION CHECKLIST

After implementing pre-rendering:

- [ ] Build completes without errors
- [ ] dist folder contains HTML files for each route
- [ ] View Source shows actual content (not just empty div)
- [ ] Google Rich Results Test can see content
- [ ] Page loads fast (check PageSpeed Insights)
- [ ] All routes still work correctly
- [ ] Forms still submit
- [ ] Navigation works

---

## 🆘 TROUBLESHOOTING

### Issue: Build fails with "prerenderRoutes is not a function"

**Solution:** Check package.json - you may need a different plugin:

```bash
npm uninstall vite-plugin-prerender-routes
npm install vite-plugin-ssr --save-dev
```

Then follow vite-plugin-ssr docs: https://vite-plugin-ssr.com/

### Issue: Pre-rendered pages show errors

**Solution:** Some code may not work during SSR (window, document not available).

Wrap browser-only code:

```javascript
if (typeof window !== 'undefined') {
  // Browser-only code here
  window.scrollTo(0, 0);
}
```

### Issue: Routes not found after deployment

**Solution:** AWS Amplify needs a redirect rule.

Create `public/_redirects`:

```
/*    /index.html   200
```

Or in Amplify console: Add redirect/rewrite rules for SPA.

---

## 🎯 NEXT STEPS AFTER PRE-RENDERING

1. ✅ Update sitemap.xml with all pre-rendered routes
2. ✅ Submit sitemap to Google Search Console
3. ✅ Request indexing for all pages
4. ✅ Monitor Google Search Console for crawl issues
5. ✅ Create individual package and destination pages
6. ✅ Add unique content to each page (500+ words)
7. ✅ Continue with rest of SEO checklist

---

## 📞 NEED HELP?

If you get stuck:

1. Check Vite docs: https://vitejs.dev/guide/ssr.html
2. Check plugin docs: https://github.com/magne4000/vite-plugin-prerender-routes
3. Test with `npm run build` and check dist folder
4. Use Google's tools to verify indexing

**Remember:** Pre-rendering is the MOST CRITICAL fix. Without it, all other SEO efforts will have minimal impact!

Good luck! 🚀
