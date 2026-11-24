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
- `blog.html`: article index
- `fitmaker.html` and `mybrain.html`: product introductions
- `sitemap.xml` and `robots.txt`: search discovery files
- `vercel.json`: clean URL configuration

To run the included SEO consistency checks with Node.js:

```sh
node scripts/check-seo.cjs
```

These checks cover metadata uniqueness, internal links, structured-data syntax, and sitemap consistency. They do not measure rankings or traffic.

## Publish a blog article

1. Copy `templates/blog-article.html.txt` to `blog/your-article-slug.html`. Use lowercase words separated by hyphens for the slug.
2. Replace every placeholder in the article, including the title, summary, author, dates, and canonical and sharing URLs. Use `YYYY-MM-DD` for the machine-readable date. Escape `&`, `<`, and `"` as `&amp;`, `&lt;`, and `&quot;` when entering plain text inside HTML attributes.
3. In `blog.html`, replace the empty-state paragraph with the grid below for the first article. For later articles, insert another card at the top of the grid.

   ```html
   <div class="blog-grid">
     <article class="blog-card">
       <p class="blog-meta"><time datetime="YYYY-MM-DD">Article date</time></p>
       <h3><a href="/blog/your-article-slug">Article title</a></h3>
       <p>A short description of the article.</p>
     </article>
   </div>
   ```

4. Add `<url><loc>https://collabitmedia.in/blog/your-article-slug</loc></url>` to `sitemap.xml`, run `node scripts/check-seo.cjs`, and review the article in the Vercel preview.
