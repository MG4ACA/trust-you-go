# SEO Implementation Checklist - TrustYou-Go.com

## Priority-Based Action Items for UK Market Targeting

---

## 🚨 WEEK 1: CRITICAL FIXES (MUST DO FIRST)

### Day 1-2: Fix CSR/Pre-rendering Issue

- [ ] **Install pre-rendering plugin**

  ```bash
  npm install vite-plugin-prerender-routes --save-dev
  ```

- [ ] **Configure Vite for pre-rendering** (see `vite.config.js`)

  - Add prerender plugin
  - Define routes to pre-render
  - Configure build settings

- [ ] **Test pre-rendered output**

  ```bash
  npm run build
  # Check dist folder for pre-rendered HTML files
  ```

- [ ] **Verify search engine can see content**
  - Use: https://search.google.com/test/rich-results
  - Check: View page source shows actual content (not just `<div id="root"></div>`)

### Day 3-4: Fix Sitemap & Google Search Console

- [ ] **Update sitemap.xml**

  - Remove hash-based URLs (#offers, #gallery, #booking)
  - Add proper package routes
  - Add proper location routes
  - Update priorities

- [ ] **Create dynamic sitemap generator** (optional but recommended)

  - Install: `npm install sitemap --save-dev`
  - Create build script to generate sitemap from routes
  - Auto-update on new packages/locations

- [ ] **Google Search Console Setup**
  - Go to: https://search.google.com/search-console
  - Add property: trustyou-go.com
  - Verify ownership (HTML file or DNS)
  - Submit sitemap
  - Request indexing for key pages

### Day 5-7: Create Proper Page Structure

- [ ] **Create dedicated pages** (not just sections)

  - `/packages` - Full packages listing page
  - `/packages/[slug]` - Individual package pages (dynamic)
  - `/destinations` - Locations listing
  - `/destinations/[slug]` - Individual location pages
  - `/about` - Full about page
  - `/contact` - Full contact page
  - `/uk-to-sri-lanka-guide` - Comprehensive travel guide

- [ ] **Update App.jsx routing**
  - Remove `SectionRedirect` component (temporary solution)
  - Add proper routes with dedicated components
  - Ensure all routes are pre-rendered

---

## 📝 WEEK 2: ON-PAGE SEO OPTIMIZATION

### Homepage Optimization

- [ ] **Update meta tags in index.html**

  ```html
  <title>Sri Lanka Tours UK | Custom Holiday Packages | Trust You Go</title>
  <meta
    name="description"
    content="UK's trusted Sri Lanka tour operator. Custom holiday packages, cultural tours & wildlife safaris from £899. Book your dream Sri Lanka trip today!"
  />
  ```

- [ ] **Add UK-specific content**

  - [ ] Prominent UK phone number: +44 7444 879173
  - [ ] Add WhatsApp click-to-chat button
  - [ ] Change all pricing to GBP (£)
  - [ ] Add "Based in London, Serving UK Travelers"
  - [ ] Add UK departure airports info
  - [ ] Add customer testimonials (prioritize UK customers)

- [ ] **Optimize H1 tag**

  ```html
  <h1>Personalized Sri Lanka Tours for UK Travelers</h1>
  ```

- [ ] **Add FAQ section** (with FAQPage schema)
  - Do UK citizens need a visa for Sri Lanka?
  - What's the best time to visit Sri Lanka from UK?
  - What's included in your tour packages?
  - How do I book from the UK?
  - What's your cancellation policy?

### Package Pages (Individual Pages for Each Package)

For EACH package, create dedicated page with:

- [ ] **Unique URL slug**

  - Example: `/packages/5-day-cultural-tour-sri-lanka`
  - Example: `/packages/7-day-wildlife-safari`

- [ ] **Unique meta tags**

  ```html
  <title>5-Day Cultural Tour Sri Lanka from UK | £899 | Trust You Go</title>
  <meta
    name="description"
    content="Explore Sigiriya, Kandy & Nuwara Eliya. 5-day cultural tour with accommodation, guide & transfers. Book from UK. ABTA protected."
  />
  ```

- [ ] **Content requirements** (500+ words per package):

  - Package overview and highlights
  - Day-by-day detailed itinerary
  - What's included/excluded
  - Pricing in GBP
  - UK-specific travel info
  - Image gallery (10+ images)
  - Customer reviews
  - FAQ section (5-10 questions)
  - Multiple CTAs (WhatsApp, Email, Phone, Booking form)

- [ ] **Add TouristTrip schema markup**
  ```json
  {
    "@type": "TouristTrip",
    "name": "5-Day Cultural Sri Lanka Tour",
    "offers": {
      "@type": "Offer",
      "price": "899",
      "priceCurrency": "GBP"
    }
  }
  ```

### Location/Destination Pages

For EACH location (Kandy, Ella, Galle, Sigiriya, etc.):

- [ ] **Create dedicated page**

  - URL: `/destinations/kandy-sri-lanka`
  - URL: `/destinations/ella-sri-lanka`

- [ ] **Content requirements** (800+ words per location):

  - Overview of destination
  - Top attractions (detailed descriptions)
  - Best time to visit
  - How to get there from UK
  - Available packages featuring this location
  - Local experiences and culture
  - Travel tips for UK visitors
  - Image gallery
  - Embedded Google Map

- [ ] **Optimize for location-specific keywords**

  - "Kandy tours from UK"
  - "Ella Sri Lanka packages UK"
  - "Things to do in [Location] for UK tourists"

- [ ] **Add Place + TouristDestination schema**

---

## 🔧 WEEK 3: TECHNICAL SEO

### Site Speed Optimization

- [ ] **Enable AWS Amplify CDN (CloudFront)**

  - In Amplify console: Enable CloudFront
  - Configure caching rules
  - Set up custom domain with CDN

- [ ] **Optimize images**

  - [ ] Convert all images to WebP format
  - [ ] Compress images (use TinyPNG or Squoosh)
  - [ ] Implement lazy loading
  - [ ] Add responsive images (srcset)
  - [ ] Set explicit width/height to prevent CLS

- [ ] **Code optimization**

  - [ ] Enable code splitting (Vite does this by default)
  - [ ] Remove unused dependencies
  - [ ] Minimize CSS/JS
  - [ ] Enable Brotli compression

- [ ] **Test site speed**
  - PageSpeed Insights: https://pagespeed.web.dev/
  - Target: 90+ on mobile, 95+ on desktop
  - Fix any critical issues flagged

### Mobile Optimization

- [ ] **Test mobile usability**

  - Google Mobile-Friendly Test
  - Test on real devices (iPhone, Android)

- [ ] **Implement mobile-specific features**
  - [ ] Clickable phone numbers: `<a href="tel:+447444879173">`
  - [ ] WhatsApp click-to-chat: `https://wa.me/447444879173`
  - [ ] Touch-friendly buttons (min 44x44px)
  - [ ] Hamburger menu works smoothly
  - [ ] Forms are easy to fill on mobile

### Enhanced Schema Markup

- [ ] **Add to each package page:**

  - TouristTrip schema with pricing
  - AggregateRating schema (once you have reviews)
  - FAQPage schema

- [ ] **Add to each location page:**

  - Place schema
  - TouristDestination schema

- [ ] **Add to reviews page:**

  - Review schema for each testimonial

- [ ] **Validate all schemas:**
  - Use: https://validator.schema.org/
  - Use: https://search.google.com/test/rich-results

### URL Structure & Internal Linking

- [ ] **Implement proper URL hierarchy**

  - All URLs lowercase
  - Use hyphens (not underscores)
  - Keep URLs short and descriptive
  - Remove trailing slashes

- [ ] **Create internal linking strategy**

  - Homepage → Packages, Destinations
  - Packages page → Individual packages
  - Each package → Related destinations
  - Each destination → Related packages
  - Add breadcrumbs on all pages

- [ ] **Create 404 page**
  - Custom 404 with helpful links
  - Track 404s in Google Analytics

---

## 🌍 WEEK 4: LOCAL SEO & UK TARGETING

### Google Business Profile

- [ ] **Create/claim profile**

  - Go to: https://business.google.com
  - Business name: Trust You Go
  - Category: Tour Operator
  - Address: No56, Aylesbury Street, Neasden, London NW10, UK
  - Phone: +44 7444 879173
  - Website: https://www.trustyou-go.com

- [ ] **Optimize profile**

  - [ ] Add business description (UK-focused)
  - [ ] Upload logo
  - [ ] Add 10+ high-quality photos
  - [ ] Set business hours
  - [ ] Add services list
  - [ ] Add booking URL
  - [ ] Enable messaging

- [ ] **Post weekly updates**
  - New packages
  - Travel tips
  - Customer photos
  - Special offers

### TripAdvisor Setup

- [ ] **Create business listing**

  - Go to: https://www.tripadvisor.co.uk/Owners
  - Claim/create listing for Trust You Go
  - Complete full profile

- [ ] **Optimize TripAdvisor presence**
  - [ ] Add detailed description
  - [ ] Upload 20+ photos
  - [ ] List all packages
  - [ ] Add pricing
  - [ ] Enable booking widget
  - [ ] Respond to reviews (when you get them)

### UK Business Directories (Submit to all)

- [ ] **General directories:**

  - [ ] Yelp UK (yelp.co.uk)
  - [ ] Yell.com
  - [ ] Thomson Local
  - [ ] Scoot
  - [ ] 192.com
  - [ ] Hotfrog UK
  - [ ] Cylex UK
  - [ ] Brownbook UK

- [ ] **Travel directories:**

  - [ ] Trustpilot UK
  - [ ] Reviews.io
  - [ ] TourRadar
  - [ ] Viator (consider)
  - [ ] GetYourGuide (consider)

- [ ] **Ensure NAP consistency**
  - Name: Trust You Go
  - Address: No56, Aylesbury Street, Neasden, London NW10, UK
  - Phone: +44 7444 879173
  - Must be IDENTICAL across all platforms

---

## 📝 WEEK 5-6: CONTENT CREATION

### Create UK Travel Guide

- [ ] **Write comprehensive guide** (2,000+ words)

  - `/uk-to-sri-lanka-guide`
  - Title: "Complete UK to Sri Lanka Travel Guide 2025"

- [ ] **Include sections:**
  - [ ] Visa requirements for UK citizens
  - [ ] Best flights from UK to Sri Lanka
  - [ ] When to visit (avoiding monsoon)
  - [ ] What to pack
  - [ ] Money & currency exchange
  - [ ] Health & vaccinations
  - [ ] SIM cards & connectivity
  - [ ] Cultural etiquette
  - [ ] Safety tips
  - [ ] Sample itineraries
  - [ ] FAQs

### Content for Each Package Page

- [ ] **Package 1: 5-Day Tour** (write 500+ words)
- [ ] **Package 2: 7-Day Tour** (write 500+ words)
- [ ] **Package 3: 10-Day Tour** (write 500+ words)
- [ ] **Package 4+:** (continue for all packages)

### Content for Each Location Page

- [ ] **Kandy** (write 800+ words)
- [ ] **Ella** (write 800+ words)
- [ ] **Galle** (write 800+ words)
- [ ] **Sigiriya** (write 800+ words)
- [ ] **Nuwara Eliya** (write 800+ words)
- [ ] **Continue for all 12 locations**

### Add Customer Testimonials

- [ ] **Collect testimonials**

  - Email past customers
  - Ask for reviews on Google
  - Request video testimonials

- [ ] **Create testimonials page**
  - `/reviews`
  - Add Review schema markup
  - Include customer photos (with permission)
  - Feature UK customers prominently

---

## 🔗 WEEK 7-8: LINK BUILDING

### Social Profiles (Create/Optimize)

- [ ] **LinkedIn Company Page**

  - Create company profile
  - Post weekly content
  - Connect with travel industry

- [ ] **Pinterest Business Account**

  - Create account
  - Design pins (use Canva)
  - Link to packages/destinations
  - Join group boards

- [ ] **YouTube Channel**

  - Create channel
  - Upload destination videos
  - Create playlists by location
  - Optimize video descriptions with links

- [ ] **TikTok Account** (optional)
  - Create account
  - Post short travel tips
  - Link in bio

### Guest Posting Outreach

- [ ] **Identify 20 target blogs**

  - UK travel blogs
  - Family travel blogs
  - Luxury travel blogs
  - Adventure travel blogs

- [ ] **Create pitch template**

  - Personalize for each blog
  - Offer 3 article ideas
  - Mention exclusive discount for their readers

- [ ] **Send 5 pitches per week**
  - Track responses in spreadsheet
  - Follow up after 1 week
  - Goal: 2-3 guest posts by Month 3

### Partnership Outreach

- [ ] **Contact UK travel bloggers**

  - Offer free/discounted tour for review
  - Commission-based partnership
  - Provide media kit

- [ ] **Reach out to complementary businesses**

  - Skyscanner (flights)
  - Travel insurance companies
  - Visa service providers

- [ ] **Sri Lankan community in UK**
  - Cultural associations
  - University clubs
  - Community centers

---

## 📱 WEEK 9-10: SOCIAL MEDIA OPTIMIZATION

### Facebook Optimization

- [ ] **Complete profile**

  - Update cover photo (UK-focused)
  - Add CTA button (Book Now)
  - Complete About section
  - Add contact info
  - Enable messaging

- [ ] **Create content calendar**

  - 4-5 posts per week
  - 40% Educational
  - 30% Inspirational
  - 20% Promotional
  - 10% Engagement

- [ ] **Set up Facebook Pixel**
  - Track conversions
  - Build retargeting audience

### Instagram Optimization

- [ ] **Optimize profile**

  - Bio with clear value proposition
  - Link in bio (use Linktree)
  - Story highlights
  - Contact button

- [ ] **Content strategy**

  - Feed: High-quality photos (3-4x/week)
  - Reels: Short videos (2-3x/week)
  - Stories: Daily engagement
  - Guides: Destination highlights

- [ ] **Hashtag research**
  - Create 3 hashtag sets (30 each)
  - Mix of high, medium, low competition
  - Include UK-specific tags

---

## 💰 WEEK 11-12: PAID ADVERTISING SETUP

### Google Ads (£15/month)

- [ ] **Create Google Ads account**

  - Link to Google Analytics
  - Set up conversion tracking

- [ ] **Create Search Campaign**

  - Campaign name: "Sri Lanka Tours UK"
  - Budget: £15/month (£0.50/day)
  - Location: United Kingdom
  - Language: English

- [ ] **Ad Group 1: Branded**

  - Keywords: "trust you go", "trustyou-go"
  - Bid: £0.50 CPC

- [ ] **Ad Group 2: Tours**

  - Keywords (exact match):
    - [sri lanka tours from london]
    - [sri lanka holiday packages uk]
    - [customized sri lanka tours]
  - Bid: £1.50 CPC

- [ ] **Create ads**

  - 3 headlines per ad
  - 2 descriptions per ad
  - Use all extensions (callout, sitelink, call)

- [ ] **Set up conversion tracking**
  - Track booking form submissions
  - Track phone calls

### Facebook/Instagram Ads (Alternative)

- [ ] **Create Business Manager account**
- [ ] **Install Facebook Pixel**
- [ ] **Create Lead Generation Campaign**
  - Budget: £10/month
  - Objective: Lead generation
  - Target: UK, 30-65, travel interests
  - Offer: "Free Sri Lanka Travel Guide"

---

## 📊 ONGOING: TRACKING & MONITORING

### Google Analytics 4

- [ ] **Set up custom dashboard**

  - Traffic sources
  - Top pages
  - Conversions
  - User flow

- [ ] **Configure events**

  - Booking form submission
  - Phone click
  - Email click
  - WhatsApp click
  - Package view
  - Video play

- [ ] **Weekly check:**
  - Traffic trends
  - Conversion rate
  - Bounce rate
  - Top landing pages

### Google Search Console

- [ ] **Weekly tasks:**

  - Check impressions/clicks
  - Review search queries
  - Fix coverage issues
  - Monitor mobile usability

- [ ] **Monthly tasks:**
  - Submit new pages for indexing
  - Analyze CTR by query
  - Identify ranking opportunities
  - Fix any errors

### Monthly Reporting

- [ ] **Create report template**

  - Traffic metrics
  - Keyword rankings
  - Conversions
  - Backlinks acquired
  - Technical health

- [ ] **Review and adjust strategy**
  - What's working?
  - What needs improvement?
  - New opportunities?

---

## 🎯 SUCCESS METRICS TRACKING

### Month 1 Goals

- [ ] All technical fixes completed
- [ ] 5+ package pages live
- [ ] 5+ location pages live
- [ ] Google Business Profile active
- [ ] Listed in 10+ directories

### Month 2 Goals

- [ ] 100+ organic visitors
- [ ] 3+ keyword rankings on page 2
- [ ] 5+ backlinks acquired
- [ ] 1-2 guest posts published

### Month 3 Goals

- [ ] 500+ organic visitors
- [ ] 5+ keyword rankings on page 2
- [ ] 10+ backlinks acquired
- [ ] 10+ inquiries

### Month 6 Goals

- [ ] 1,500+ organic visitors
- [ ] 3+ keyword rankings on page 1
- [ ] 25+ backlinks acquired
- [ ] 25+ inquiries per month

---

## 🚀 QUICK WINS (Do These Today!)

- [ ] **Add WhatsApp button to website**

  - Use floating button (bottom-right)
  - Link: https://wa.me/447444879173
  - Pre-filled message

- [ ] **Make phone number prominent and clickable**

  - `<a href="tel:+447444879173" class="text-xl font-bold">+44 7444 879173</a>`
  - Put in header on every page

- [ ] **Add "From £899" pricing**

  - Show starting price on homepage
  - Show package prices in GBP

- [ ] **Add trust badges**

  - "UK Based Team"
  - "500+ Happy Customers" (if true)
  - Payment icons (Visa, Mastercard, PayPal)

- [ ] **Create simple FAQ section**

  - 5 most common questions
  - Add to homepage

- [ ] **Add email signature**
  - Include website link
  - Add social media links
  - Professional branding

---

## 📞 NEED HELP?

If you need assistance with any of these tasks, prioritize:

**Most Critical (DIY or Get Help):**

1. Pre-rendering setup (technical)
2. Individual package pages (content writing)
3. Google Business Profile (easy, do yourself)

**Can Wait:**

1. Advanced schema markup
2. Guest posting outreach
3. Paid advertising (until organic is working)

**Track Your Progress:**

- Use this checklist
- Check off items as completed
- Review weekly
- Adjust priorities as needed

---

## 🎉 CELEBRATE MILESTONES

- ✅ First page indexed in Google
- ✅ First organic visitor
- ✅ First inquiry from SEO
- ✅ First keyword on page 1
- ✅ First booking from organic search

**Remember:** SEO is a marathon, not a sprint. Consistency is key! 🚀

Good luck! 🇱🇰✈️🇬🇧
