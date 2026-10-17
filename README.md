# Collabit Media

Source code for the **[Collabit Media website](https://collabitmedia.in/)**: a product portfolio and introduction to our website development, product building, and marketing services.

## Explore the products

- **[Fitmaker](https://collabitmedia.in/fitmaker)** — an AI fitness coach app with calorie intake and burn tracking, workout tracking, AI workout recommendations, and posture correction. Its product page links to the official Google Play listing.
- **[myBrain](https://collabitmedia.in/mybrain)** — a second-brain and personal-assistant app for contacts, notes, reminders, and personal details you provide.
- **[Full product collection](https://collabitmedia.in/products)** — includes Zuppy, Lava Rush, and the Sri Sahasra client website alongside our apps. Illustrative showcase visuals are labeled on the site.

TheTechTree is a technology-focused sub-company of Collabit Media.

## Planning a project?

Explore our **[development and marketing services](https://collabitmedia.in/services)**, or use the **[website and app project brief checklist](https://collabitmedia.in/project-planning-guide)** to organise your goals, audience, required features, content, and launch plans.

## About this repository

This is a static HTML, CSS, and JavaScript website deployed with Vercel at `collabitmedia.in`. It contains the marketing site, not the source code for the featured apps.

- `index.html`: homepage
- `products.html`: product collection
- `fitmaker.html` and `mybrain.html`: product introductions
- `sitemap.xml` and `robots.txt`: search discovery files
- `vercel.json`: clean URL configuration

To run the included SEO consistency checks with Node.js:

```sh
node scripts/check-seo.cjs
```

These checks cover metadata uniqueness, internal links, structured-data syntax, and sitemap consistency. They do not measure rankings or traffic.
