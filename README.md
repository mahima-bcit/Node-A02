# Node A02 — Portfolio Launchpad (Refactor)

Express app refactored from A01 to use a server-side view engine (EJS) with two layouts and required partials.
All /api/* routes remain JSON-only.

## What this app does

- Renders pages server-side using EJS templates with two layouts (full and sidebar)
- Serves static assets from `/public` (CSS/JS/images)
- Exposes a JSON API for projects at `/api/projects`
- Handles the Contact form with a standard POST (server-side redirect to success page)

---

## Setup

```bash
npm install
npm run dev
```

Open:

- `http://localhost:3000/`

---

## NPM Scripts

- `npm run dev` — runs the server in watch mode
- `npm start` — starts the server normally (no watch)

---

## Project Structure

```
/data
  projects.json

/public
  /css/styles.css
  /images
  /images/projects/<slug>/cover.png
  /images/projects/<slug>/screenshot.png
  /js/main.js

/src
  /routes
    pages.routes.js
    api.routes.js
  /lib
    projects.repository.js

/views
  /layouts
    layout-full.ejs
    layout-sidebar.ejs
  /partials
    nav.ejs
    footer.ejs
    project-card.ejs
    other-projects-list.ejs
  index.ejs
  about.ejs
  projects.ejs
  project-details.ejs
  contact.ejs
  contact-success.ejs
  404.ejs
  500.ejs

README.md
ai-interaction-log.txt
package.json
server.js
```

---

## Routes

**Pages**

- `GET /` → Home page
- `GET /about` → About page
- `GET /projects` → Projects list page (supports `?q=` search query)
- `GET /projects/:slug` → Project detail page (sidebar layout)
- `GET /contact` → Contact form page
- `GET /contact-success` → Contact success page

**Contact (form POST)**

- `POST /contact` expects name, email, message (form-encoded)
- Log the submission to the server console
- On success: redirects to `/contact-success` and renders submitted data
- On missing fields (HTTP 400): renders and error

**API**

- `GET /api/projects` → returns all projects as JSON
- `GET /api/projects/:slug` → returns a single project as JSON


---

## Data Contract

Projects are stored in `/data/projects.json

Top-level format:

```json
{ "projects": [] }
```

Each project includes:

```json
{
  "id": "p-2001",
  "slug": "vanilla-js-game",
  "title": "Neon Dodger",
  "tagline": "One short sentence",
  "description": "A short paragraph",
  "status": true,
  "stack": ["node", "express", "mongodb"],
  "tags": ["crud", "api", "routing"],
  "images": [
    {
      "path": "/images/projects/vanilla-js-game/cover.png",
      "alt": "Cover image description",
      "type": "cover"
    },
    {
      "path": "/images/projects/vanilla-js-game/screen.png",
      "alt": "Screenshot description",
      "type": "screenshot"
    }
  ],
  "dates": { "created": "2026-01-08", "updated": "2026-02-01" }
}
```

Rules:

- `id` unique + stable
- `slug` unique + kebab-case
- `status` boolean
- `stack`, `tags` arrays of strings
- `images` contains **exactly 2** objects
  - `type` is `"cover"` or `"screenshot"`
  - `path` begins with `/images/`
  - `alt` is meaningful
- dates are `YYYY-MM-DD`

---

## AI Usage Requirement

This repository includes **`ai-interaction-log.txt`** describing which AI tools were used, what they were used for, example prompts, and what was changed afterward.

---

## License & Attribution

This project contains student modifications build on the provided Node2Know starter materials by **Joshua Solomon**, under **Node2Know-LEARN-1.0**.
