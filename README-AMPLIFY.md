# Amplify domain & Google Search Console steps

This short guide uses the production domain: https://www.trustyou-go.com

1) Verify domain in AWS Amplify
- In the Amplify Console, open your app > Domain management > Add domain.
- Add `trustyou-go.com` and follow the DNS record instructions from Amplify. Use your DNS provider to create the CNAME/ALIAS records Amplify shows.

2) Ensure sitemap & robots
- `https://www.trustyou-go.com/sitemap.xml` should be accessible after deploy.
- `robots.txt` at `https://www.trustyou-go.com/robots.txt` points to the sitemap and currently allows all crawlers.

3) Submit site to Google Search Console
- In Search Console, add `https://www.trustyou-go.com` as a property.
- Verify via DNS (recommended) or HTML file upload.
- In 'Sitemaps', submit `https://www.trustyou-go.com/sitemap.xml`.

4) Test social preview
- After deploy, verify Open Graph using the Twitter Card Validator and the Facebook Sharing Debugger with `https://www.trustyou-go.com/`.

5) Quick QA checklist
- Visit the homepage and view source to confirm canonical, og:url, and og:image point to `https://www.trustyou-go.com`.
- Confirm meta description appears and pages have unique titles.

6) Next steps (optional)
- Create a production-quality `social-preview.png` (1200x630) and place it at the site root or a CDN path used in the OG tags.
- Run a repo-wide i18n scan to capture remaining hard-coded copy and add missing translation keys.
- Configure CloudFront/edge caching and set appropriate cache-control headers for `sitemap.xml` and `robots.txt`.

