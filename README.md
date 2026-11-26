# Zoe Sun — Music Portfolio

A portfolio for Zoe Sun — music performance, production and arts management.

The visual direction takes cues from independent and modern classical labels: paper-white editorial spreads, a vermilion signal colour, catalogue numbers, mono microtype and a serif display voice. Plain HTML, CSS and JavaScript — no build step, no dependencies.

---

## Structure

| # | Section | Content |
| --- | --- | --- |
| 01 | **Experience** (the centrepiece) | Jazz at Lincoln Center Shanghai · KC Voice 2025 & 2026 · Student Council · SAD Music Healing Project · charity single · Startup UCLA / Re-Cloth · bands Infinity and 70%Soul |
| 02 | **Works** | A custom recordings player (Goodnight and Kismet are live, three slots open), three performance and field films (70%Soul, Starry Heart, Jazz at Lincoln Center), a Music × Management statement, and four English case files |
| 03 | **Achievements** | Three equal recognition cards — TOPIK, SIC, AP — each with the full certificate scan |
| 04 | **Contact** | Email, barcode detail, footer |

---

## Quick start

Double-click `index.html`.

For a local server (recommended for smooth audio/video seeking):

```bash
cd Music-Portfolio
python3 -m http.server 8000
```

Then open http://localhost:8000.

> Fonts load from Google Fonts. Without a connection the page falls back to system fonts and still works.

---

## What is real, what is still a placeholder

- Experience, Music × Management and the case files are **based on the information you provided**. Please check dates, role titles and numbers — especially KC Voice's 800+ audience, 30 volunteers, six-person core team and seven-week preparation.
- **Achievements** now has three equal recognition cards: **TOPIK I — Level 2**, **SIC Regional Bronze Award** and **AP Scholar with Honor Award**. Each card shows the full certificate scan with no redaction and links to the original file.
- Case files now lead with a timeline and interleave the selected images between the narrative sections.
- The Lincoln internship film notes that the opening performance is the Shanghai Lincoln Jazz Big Band playing "Seasons of Love".
- Goodnight, Kismet, the five gallery photos, the two band images, the 70%Soul logo and all three films (70%Soul at Battle of the Bands, Starry Heart, Jazz at Lincoln Center internship) are now connected. Three recordings (A3–A5), a dedicated solo portrait and a Wenqi Home group photo are still to come.
- The four **Case files** (KC Voice 2025, EcoStudent Thrift Shop, SAD Music Healing Project, Student Council Operations) are English narratives built from selected photographs, pitch slides and document pages. Source documents with names, student IDs or sign-up links are not published.
- The contact section displays `zoeysun0531@gmail.com` as plain, selectable text and includes a **Copy email** button that writes the address to the clipboard and confirms it with a toast. The mobile menu footer shows the same address.

---

## 1. Recordings

Two tracks are already connected: **Goodnight** (`01.m4a`) and **Kismet** (`02.mp3`). Three slots remain open. Put the remaining audio in **`music/`**:

```
music/01.mp3
music/02.mp3
music/03.mp3
music/04.mp3
music/05.mp3
```

Refresh the page. Each track row will pick up its duration and the “tracks still to be added” notice will disappear. The site also tries `1.mp3`, `track1.mp3`, `track-01.mp3` and similar names.

If your filenames are different, edit the matching `file` in `js/config.js`. MP3 at 128–320 kbps is recommended.

Tracks are catalogued **A1–A5** (an independent-label touch). Edit `title`, `note` and `file` in `tracks`.

### Lyrics & notes

`Goodnight` and `Kismet` each carry a `lyrics` object with:

- `sections` — labelled stanzas and the literary English translation
- `note` — a short reading of the song
- `translationNote` — a note on the translation approach

The lyric sheet opens automatically when a song with lyrics starts playing. The **Lyrics** button in the player and the **Lyrics** link on each matching track row reopen it after it is closed. It is a paper lyric sheet with the English text and the note.

---

## 2. Photos

Put the five gallery photos and two band photos in **`image/`**:

```
image/photo-01.jpg   → Jazz at Lincoln Center
image/photo-02.jpg   → KC Voice 2025
image/photo-03.jpg   → Student Council
image/photo-04.jpg   → SAD · Music Healing
image/photo-05.jpg   → Portrait
image/band-infinity.jpg   → Infinity, live
image/band-70soul.jpg     → 70%Soul, live
image/studio.jpg          → the studio portrait in the Bands section
```

Overwrite the current placeholder images. `.jpeg`, `.png` and `.webp` also work. A long edge of 1600–2400px is ideal.

Captions, order and alt text live in `photos` in `js/config.js`. The band cards use `bands`, their logos live in `logo/`, and each band photo has its own caption. Infinity’s card uses the logo as an identity panel because no live photograph exists; 70%Soul uses a 2026 live photograph.

---

## 3. Performance & field films

Put the videos in **`video/`**:

```
video/01.mp4   → 70%Soul · Battle of the Bands 2026 (champions)
video/02.mp4   → Starry Heart · Live at Wenqi Home
video/03.mp4   → Jazz at Lincoln Center · Internship
```

- H.264 MP4, 1080p, ideally under 80MB per film.
- Posters reuse the photos in `image/`; change `videos[].poster` if you want different frames.
- To use YouTube or Bilibili instead, put the embed URL in `videos[].embed` and leave `src` ignored.
- Without a file, the card shows “Video pending” and the modal shows the expected path — never a broken player.

---

## 4. Editing copy

Almost everything is in **`js/config.js`**:

| Field | Purpose |
| --- | --- |
| `site` | Name, legal name, eyebrow line, location, email, tagline |
| `experience` | Seven entries: period, role, descriptor, organisation, description, stats, tags |
| `principles` | The four working principles beside the timeline |
| `feature` | The charity-single lyric quote |
| `bands` | Infinity and 70%Soul: name, role, copy, logo and photo paths |
| `caseFiles` | Four case files: cover, stats, sections, images and optional link |
| `tracks` | Five recordings |
| `videos` | Three films |
| `management` | Music × Management statement, paragraphs and four pillars |
| `academicFacts` | Four academic profile facts |
| `outcomes` | Selected outcomes ledger |
| `awards` | Real awards (**currently empty**) |
| `recognitions` | Three equal achievement cards: TOPIK, SIC, AP |
| `photos` | Five gallery images |

`experience[].stats` accepts up to four data points:

```js
stats: [
  { value: "800+", label: "Audience" },
  { value: "30", label: "Volunteers" }
]
```

---

## 5. Adding awards

Fill `awards` in `js/config.js`:

```js
awards: [
  {
    year: "2026",
    title: "Award name",
    titleEn: "Award name",
    issuer: "Issuing body",
    note: "Category / note"
  }
]
```

Achievements is built from `recognitions` in `js/config.js`: each item supplies a label, title, issuer, year, note, image and file. The three cards share one equal-height grid.

Certificate scans go in `certificate/`, then:

```js
image: "certificate/certificate-01.png",
file: "certificate/certificate-01.pdf"
```

The card becomes clickable and opens the scan in a new tab.

---

## 6. Local staging (do not publish)

`incoming/` is a private staging area for new material — photos, videos, audio, certificates and documents. It is not linked from the site. Keep it out of the published build.

For documents, there is a matching structure under `incoming/documents/` (KC Voice, SAD, charity single, Student Council, Re-Cloth, Jazz, other).

## 7. Publishing

A pure static site. Upload the folder to GitHub Pages, Vercel or Netlify — no build command — then point `zoe-sun.me` at it.

Before publishing:

- Replace every placeholder in `music/`, `image/` and `video/`
- Make sure awards, certificates and the email are real
- Compress photos (≤ 400KB) and films (≤ 80MB each)
- Click through playback, films and the photo lightbox on desktop and phone

---

## 8. Files

```
Music-Portfolio/
├── index.html              page structure
├── css/style.css           all styles (dark + paper themes)
├── js/config.js            ← main editing file
├── js/main.js              player, video modal, lightbox, scroll motion
├── favicon.svg
├── music/                  five recordings
├── image/                  five photos, two band photos, film posters
├── logo/                   Infinity and 70%Soul logos
├── video/                  three performance films
├── certificate/            certificate scans (optional)
├── document/               selected public case-file media (90s pitch clip)
├── incoming/               private upload staging — exclude from publishing
├── preview/                preview screenshots (safe to delete)
└── README.md
```

## 9. FAQ

**A track still says “Audio pending”.** Check the filename against `file` in `config.js` (case matters) and confirm it is inside `music/`. Once added, click the track again — the probe retries without a refresh.

**A photo is missing.** Use jpg, jpeg, png or webp. iPhone HEIC files need exporting to JPG first.

**A film still says “Video pending”.** Check that it is in `video/` and is a browser-friendly MP4 (H.264 + AAC). Alternatively use an `embed` URL.

**Want a different accent colour?** Change `--accent`, `--accent-soft` and `--accent-deep` in `:root` in `css/style.css`. The paper sections define their own accent inside `.theme-paper`.
