# Node A02 — Portfolio Launchpad (Refactor)

Express app refactored from A01 to use a server-side view engine (EJS) with two layouts and required partials.
All /api/* routes remain JSON-only.

## What this app does

- Serves static HTML pages from `/pages` (no templating yet)
- Serves static assets from `/public` (CSS/JS/images)
- Exposes a JSON API for projects at `/api/projects`
- Renders the projects dynamically using `fetch()` + vanilla JS
- Handles the Contact form using client-side `fetch()` (no page reload)

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
/server.js

/routers
  pages.routes.js
  api.routes.js
  
/pages
  index.html
  about.html
  projects.html
  contact.html

/public
  /css
    styles.css
  /js
    projects.js
    contact.js
  /images
    /projects
      /<slug>
        cover.png
        screen.png

/data
  projects.json

ai-interaction-log.txt
README.md
package.json
```

---

## Routes

**Pages**

- `GET /` → Home page
- `GET /about` → About page
- `GET /projects` → Projects page (client-rendered via API)
- `GET /contact` → Contact page

**Contact (AJAX)**

- `POST /contact` expects name, email, message (form-encoded)
- Log the submission to the server console
- Returns JSON

**Success (HTTP 200):**

```json
{ "ok": true, "message": "Thank you, NAME! We have received your message." }
```

**Missing fields (HTTP 400):**

```json
{ "ok": false, "error": "Please provide name, email, and message." }
```
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
