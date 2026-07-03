# Spool — URL Shortener

## Run it

1. `npm install`
2. Make sure MongoDB is running locally on `mongodb://localhost:27017`
   (or edit the connection string in `index.js`).
3. `npm start`
4. Open http://localhost:8001

## What's inside

- `index.js` — Express server, view engine setup, redirect route
- `connect.js` — Mongo connection helper
- `models/url.js` — Mongoose schema for short urls
- `controllers/url.js` — create / list / stats / delete logic
- `routes/url.js` — `/url` API (POST, GET, GET/:id, DELETE/:id)
- `routes/staticRouter.js` — renders the homepage with existing links
- `views/home.ejs` — the frontend (single file, no build step)

## API

- `POST /url` `{ "url": "https://..." }` → `{ "id": "abc123" }`
- `GET /url` → list of all short urls
- `GET /url/:shortId` → click stats for one short url
- `DELETE /url/:shortId` → remove a short url
- `GET /:shortId` → redirects to the original url and logs a visit
