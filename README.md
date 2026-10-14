# Talari Lasya's Half Saree Ceremony: Virtual Invitation

React + Vite + Tailwind CSS + Framer Motion.

## Run it in VS Code

```bash
npm install
npm run dev
```

Open the local address Vite prints (usually http://localhost:5173).
Test on your phone too: run `npm run dev -- --host` and open the "Network" address on the same Wi-Fi.

## Things you must add

### 1. Telugu invitation text (required)
Open `src/data/telugu.js` and type or paste the exact text from the printed Telugu card, line by line.
Nothing was translated or invented. Until you add it, the Telugu page shows a placeholder.

### 2. Lasya's photographs
Drop images into `src/assets/photos/` (for example `lasya-1.jpg`, `lasya-2.jpg`, …).
They are picked up automatically in file-name order.
- The **first** photo becomes the full-screen cover photo (use a tall, portrait-style photo for the best result).
- All photos (including the first) appear in the scroll-driven gallery, one photograph per scroll.
Until you add photos, elegant dark-green placeholders are shown.
Tip: resize photos to about 1600 px on the long edge (under 400 KB each) so the page loads fast on WhatsApp.

### 3. Background music (optional)
Drop one audio file (`.mp3`, `.m4a`, `.ogg`, `.wav`) into `src/assets/music/`.
The music button appears automatically. It never autoplays: visitors tap to play, tap again to mute.
Use only music you own or that is royalty-free.

## Extra features
- **Dropdown menu** (gold pill at the top) to jump to any section.
- **Countdown** to 26 Oct 2026, 9:30 AM IST, with **Save the date** (Google Calendar and .ics for Apple/Outlook).
- **RSVP on WhatsApp** (attending / sending blessings, guest count, blessing message).
  Set the receiving number in `src/data/content.js` → `rsvp.whatsapp` (digits with country code, e.g. `919876543210`).
- **Personalised links**: add `?to=Name` to the link and the cover greets that guest
  (example: `https://YOUR-USERNAME.github.io/REPO/?to=Ravi%20Uncle`). The RSVP section also has a
  small tool that builds these links and shares them.
- **Copy address / View location** on the venue section.
- **Scroll-driven photo gallery** and a **curtain-reveal finale** with petal showers and gold sparks (tap anywhere on it).

## Editing wording
All English text, names, date, venue and the Google Maps link are in `src/data/content.js`.

## Deploy to GitHub Pages

1. Create a new repository on GitHub (for example `lasya-invitation`).
2. In the project folder:
   ```bash
   git init
   git add .
   git commit -m "Invitation website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/lasya-invitation.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The included workflow (`.github/workflows/deploy.yml`) builds and publishes on every push to `main`.
   Your link will be `https://YOUR-USERNAME.github.io/lasya-invitation/`.

Alternative without Actions: `npm run deploy` publishes the `dist` folder to a `gh-pages` branch
(then set Pages source to that branch).

## Nice link preview on WhatsApp
Add a 1200×630 image as `public/og.jpg`, then add this line inside `<head>` in `index.html`
(using your real link):
```html
<meta property="og:image" content="https://YOUR-USERNAME.github.io/lasya-invitation/og.jpg" />
```

## Project structure
```
src/
  App.jsx                  page assembly + opening sequence
  data/content.js          all wording
  data/telugu.js           Telugu card text (you fill this)
  components/
    IntroEnvelope  Envelope  Hero  BibleVerse  Invitation  EventDetails
    Venue  Family  TeluguInvitation  Gallery  InvitationCard  FinalMessage  Footer
    Nav  MusicButton  Cursor  GoldDust  Botanical  Cross  Divider  Reveal
```

Reduced-motion preferences are respected (animations shorten, particles and drifting texture stop).
