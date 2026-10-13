# Collabit Media: SEO implementation and keyword notes

Research date: 13 October 2026. Audience: English-speaking prospects worldwide, as requested. Production origin confirmed from the repository homepage and an HTTP 200 response: https://collabit-media-site.vercel.app.

## Research method and limits

Reviewed public search results and first-party agency service pages to identify vocabulary, commercial intent, and useful page types. Initial India-oriented discovery was superseded by the owner's worldwide targeting instruction. The implementation makes no country-specific office or client claims.

These are researched keyword candidates, not a paid keyword-tool export. Monthly volume, keyword difficulty, CPC, current rank, and traffic forecasts were not available and have not been invented. Priority means relevance to this site's offer and page scope, not proven ease of ranking. Validate terms using Search Console queries after indexing and a keyword planning tool before major content investment.

## Keyword-to-page map

- `/`: primary positioning “web development and digital marketing agency”; supporting “website and app development”, “product development and marketing”; branded “Collabit Media” and “TheTechTree”. Intent: evaluate the agency and choose a service. Avoid making this page compete with every detailed service term.
- `/services`: “digital development and marketing services”, “website and app development services”. Intent: browse service options. Links to each specialist page.
- `/website-development`: priority commercial candidates “website development for small businesses”, “custom business website development”, “small business web design services”, “responsive website development”. Supporting questions: landing page vs business website; what to prepare for a website project. No fabricated prices, delivery times, or local addresses.
- `/product-development`: priority commercial candidates “MVP product development”, “app development for startups”, “MVP development services”, “digital product development”. Supporting questions: what is an MVP, prototype vs web app vs mobile app, what affects MVP development cost. Broad terms are competitive; specific problem/industry pages should wait for real expertise and examples.
- `/digital-marketing`: priority commercial candidates “digital marketing for startups”, “digital marketing for small businesses”, “startup marketing services”, “product launch marketing”. Supporting “brand messaging”, “content planning”, and “SEO vs paid advertising”. Do not claim paid-ad management, certifications, or guaranteed outcomes without confirmation.
- `/products`: branded/navigation candidates “Collabit Media portfolio”, “Fitmaker app”, “Zuppy mini game”, “Sri Sahasra website”, “TheTechTree”. The supplied names/categories are facts; artwork is explicitly illustrative. Do not imply a workout feature set for Fitmaker, a particular Zuppy gameplay mechanic, or client results that were never supplied.
- `/project-planning-guide`: informational candidates “website project brief checklist”, “app development project brief”, “how to plan a website project”. Intent: help a prospective buyer prepare, then link to the relevant service.

## Evidence and interpretation

- WebFX small-business web design: https://www.webfx.com/web-design/services/smb/ and development: https://www.webfx.com/web-development/services/smb/ — observed dedicated commercial pages addressing small-business needs. This supports a focused website-development page; it does not establish volume or ranking difficulty.
- WANDR MVP services: https://www.wandr.studio/services/mvp-development-services — observed MVP and prototype planning language. Our page explains these decisions in original wording without copying capabilities or testimonials.
- Orange Marketing: https://www.orangemarketing.com/b2b-startup-agency-services — observed a startup-focused commercial service page. We use startup intent without borrowing its B2B certifications or results.
- Google SEO starter guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide — useful, accessible content and descriptive organisation.
- Google title guidance: https://developers.google.com/search/docs/appearance/title-link — unique descriptive titles; Google may rewrite displayed titles.
- Google sitemap guidance: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap — sitemap discovery is a hint, not an indexing guarantee.

## Implemented

Seven indexable HTML pages; unique titles/descriptions and self-referencing production canonicals; Open Graph and Twitter text metadata; Organization/WebSite/WebPage structured data; Service and breadcrumb data on relevant new pages; worldwide positioning without fake local pages; descriptive internal links; native HTML FAQ content; one H1 per page; skip navigation; a mobile-compatible shared navigation; `robots.txt`; `sitemap.xml`; Vercel clean URLs and no trailing slashes. Shared base CSS reduces repeated homepage/new-page styling. Animation and reduced-motion controls remain.

No meta-keywords stuffing, fake reviews, invented business address, unsupported Product offers, or FAQ rich-result promises. No hreflang because there are no translated or regional equivalents. The sitemap intentionally omits guessed modification dates and meaningless priority values. Product pages remain a single truthful portfolio until substantive product details are supplied.

## Required owner inputs and next actions

1. Supply an actual business email, WhatsApp number, or approved form destination. The current form downloads a brief only; it does not send enquiries. Traffic without a working lead route will be hard to convert.
2. Confirm service scope, actual screenshots, project descriptions, and permission to publish client work. Add real case studies with evidence and approved testimonials when available.
3. Verify the production property in Google Search Console and Bing Webmaster Tools. Submit `/sitemap.xml`, then inspect the homepage and service URLs. No accounts were accessed and no submission is claimed by this change.
4. Establish baseline clicks, impressions, queries, and relevant enquiries. Review after enough real data accumulates; compare equivalent time windows. No traffic gain or ranking is guaranteed.
5. If using a custom domain later, update every canonical, schema URL, social URL, and sitemap origin together, and redirect the old hostname. Do not leave both domains competing as preferred URLs.
6. Add content based on real questions and proof. Suggested next briefs: “How to scope the first version of an app”, “Landing page or multi-page business website?”, and “What to prepare before a product launch”. Check Search Console query evidence before prioritising them.

## Deployment

Vercel serves static files from this repository. `vercel.json` enables clean URLs. HTML links and sitemap locations use extensionless paths; Vercel redirects `.html` variants. This repository is separate from the earlier private Sites copy; no changes are being deployed to that private copy.
