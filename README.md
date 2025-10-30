# Helmi Madouri — Cinematic Front‑End Portfolio (Static)

A dark, cinematic, responsive portfolio built with HTML, CSS, JavaScript, and Bootstrap (CDN). No build tools. Open `index.html` to run.

## Run Locally
- Double-click `index.html` (or open it via any static server).

## Structure
- `index.html` — All sections (Hero, About, Projects, Skills, Contact, Footer)
- `src/styles/index.css` — Global theme, gradients, Bootstrap overrides
- `scripts/main.js` — Animations, parallax, smooth scroll, EmailJS form handling

## EmailJS (optional)
Edit `scripts/main.js` and fill:
```
const EMAILJS_SERVICE_ID = ''
const EMAILJS_TEMPLATE_ID = ''
const EMAILJS_PUBLIC_KEY = ''
```
Then the contact form will send via EmailJS CDN.

## Deploy
- Push the files to any static host (GitHub Pages, Netlify, Vercel, etc.).
- For GitHub Pages: create a repo and upload all files; enable Pages and serve from `main` (root) or `gh-pages`.
