# Full Bloom AI — Website

> **Grow smarter. Bloom bolder.** Applied AI for small businesses in Northern Virginia.

The marketing website for Full Bloom AI: workflow automation, custom AI tool
integration, AI strategy consulting, and done-for-you implementation for small
businesses.

Built with React + Vite. The layout follows the same structure as the
[Alabaster Watch & Clock](https://github.com/ilruizai05-lgtm/alabaster-watch-clock)
site, in Full Bloom AI's blue → violet → pink brand colors with the flower logo.

## Page sections

Header · Hero · Trust strip · Industries · Services · Who We Are · Recent Work ·
How It Works · FAQ · Contact form · Get in touch · Footer — plus a sticky
call/book bar on phones and a back-to-top button.

## Editing content

Almost all text lives in one file: **`src/data/site.js`**

| To change… | Edit in `src/data/site.js` |
| --- | --- |
| Email, phone, service area | `contact` |
| Numbers in the trust strip | `stats` |
| Industries list | `industries` |
| Services | `services` |
| How It Works steps | `steps` |
| Recent Work projects | `work` (screenshots live in `src/assets/work/`) |
| FAQ | `faqs` |

Colors and fonts are set at the top of `src/index.css`.

The contact form sends messages through Formspree (endpoint in
`src/components/ContactForm.jsx`).

## Run it

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Project structure

```
index.html            # page title, search/social previews, fonts
public/
  favicon.svg         # flower logo browser icon
  og-image.jpg        # social-sharing preview image
src/
  App.jsx             # page layout (section order)
  index.css           # all styles + brand colors
  data/site.js        # all editable content
  components/         # Header, Hero, Sections, ContactForm, Footer, LogoFlower…
  hooks/useReveal.js  # fade-in on scroll
  assets/work/        # Recent Work screenshots
```
