# video / performance films

Put three films in this folder:

```
01.mp4   → 70%Soul · Battle of the Bands 2026 (champions, excerpt 2:32–4:11)
02.mp4   → Starry Heart · Live at Wenqi Home
03.mp4   → Jazz at Lincoln Center · Internship
```

- MP4 (H.264), 720p–1080p, ideally under 80MB each. The current 01 is a 480p web cut; the source is kept in `incoming/videos/`.
- Posters reuse the photos in `image/`; change `videos[].poster` in `../js/config.js` for different frames.
- To use YouTube or Bilibili, put the embed URL in `videos[].embed` instead.
- Without a file, the card shows “Video pending” and the modal displays the expected path.
