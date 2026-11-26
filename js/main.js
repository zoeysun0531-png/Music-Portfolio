/* ==========================================================================
   Zoe Sun — Music Portfolio
   Interactions: loader, reveal, hero canvas, audio player, gallery lightbox.
   No dependencies. Works from file:// as well as a server.
   ========================================================================== */
(function () {
  "use strict";

  var CFG = window.PORTFOLIO || {};
  var SITE = CFG.site || {};
  var TRACKS = (Array.isArray(CFG.tracks) ? CFG.tracks : [])
    .filter(function (track) { return !track.hidden; })
    .slice(0, 5);
  var PHOTOS = Array.isArray(CFG.photos) ? CFG.photos.slice(0, 5) : [];
  var EXPERIENCE = Array.isArray(CFG.experience) ? CFG.experience : [];
  var PRINCIPLES = Array.isArray(CFG.principles) ? CFG.principles : [];
  var VIDEOS = Array.isArray(CFG.videos) ? CFG.videos.slice(0, 3) : [];
  var MANAGEMENT = CFG.management || null;
  var ACADEMIC_FACTS = Array.isArray(CFG.academicFacts) ? CFG.academicFacts : [];
  var RECOGNITIONS = Array.isArray(CFG.recognitions) ? CFG.recognitions : [];
  var OUTCOMES = Array.isArray(CFG.outcomes) ? CFG.outcomes : [];
  var AWARDS = Array.isArray(CFG.awards) ? CFG.awards : [];
  var CERTIFICATES = Array.isArray(CFG.certificates) ? CFG.certificates : [];
  var FEATURE = CFG.feature || null;
  var BANDS_INTRO = CFG.bandsIntro || "";
  var BANDS = Array.isArray(CFG.bands) ? CFG.bands : [];
  var CASES = Array.isArray(CFG.caseFiles) ? CFG.caseFiles : [];

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function pad2(n) { return (n < 10 ? "0" : "") + n; }

  function formatTime(sec) {
    if (!isFinite(sec) || sec < 0) return "0:00";
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    return m + ":" + pad2(s);
  }

  function showToast(message) {
    var el = $("#toast");
    if (!el) return;
    el.textContent = message;
    el.classList.add("is-visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () { el.classList.remove("is-visible"); }, 3600);
  }

  function store(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* private mode */ }
  }
  function read(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }

  function initCopyEmail() {
    var btn = $("#copyEmail");
    if (!btn) return;
    var note = $("#copyEmailNote");
    var label = btn.querySelector("span");
    var resetTimer = null;

    function fallbackCopy(text) {
      var area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(area);
      return ok;
    }

    function mark(ok) {
      clearTimeout(resetTimer);
      btn.classList.toggle("is-copied", ok);
      label.textContent = ok ? "Copied" : "Copy email";
      if (note) note.textContent = ok ? "Email copied to clipboard" : "Select the email and press Ctrl/Cmd+C";
      showToast(ok ? "Email copied — " + (SITE.email || "") : "Select the email and press Ctrl/Cmd+C");
      resetTimer = setTimeout(function () {
        btn.classList.remove("is-copied");
        label.textContent = "Copy email";
        if (note) note.textContent = "Click to copy";
      }, 2400);
    }

    btn.addEventListener("click", function () {
      var email = SITE.email || "zoeysun0531@gmail.com";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () { mark(true); }, function () { mark(fallbackCopy(email)); });
      } else {
        mark(fallbackCopy(email));
      }
    });
  }

  /* ----------------------------------------------------------------------
     Content from config
     ---------------------------------------------------------------------- */
  function applySiteText() {
    var eyebrow = $("#heroEyebrow");
    if (eyebrow && SITE.eyebrow) eyebrow.textContent = SITE.eyebrow;
    if (SITE.tagline) $("#heroTagline").textContent = SITE.tagline;

    var artistName = SITE.artistName || "Zoe Sun";
    var emailEl = $("#contactEmail");
    if (emailEl && SITE.email) {
      var emailSpan = emailEl.querySelector("span");
      if (emailSpan) emailSpan.textContent = SITE.emailDisplay || SITE.email;
    }
    var emailLink = $("#contactEmailLink");
    if (emailLink && SITE.email) emailLink.href = "mailto:" + SITE.email;
    if (SITE.location) $("#contactLocation").textContent = SITE.location;
    var heroLegal = $("#heroLegalName");
    if (heroLegal && artistName) heroLegal.textContent = artistName;
    var footerLegal = $("#footerLegalName");
    if (footerLegal && artistName) footerLegal.textContent = artistName;
    var navEmail = $("#navEmail");
    if (navEmail && SITE.email) {
      navEmail.textContent = SITE.emailDisplay || SITE.email;
      navEmail.href = "mailto:" + SITE.email;
    }

    if (document.title && SITE.name) {
      document.title = SITE.name + (SITE.artistName ? " (" + SITE.artistName + ")" : "") + " — Music Portfolio";
    }
  }

  /* ----------------------------------------------------------------------
     Loader
     ---------------------------------------------------------------------- */
  function initLoader() {
    var loader = $("#loader");
    var done = false;
    function finish() {
      if (done) return;
      done = true;
      document.body.classList.add("is-loaded");
      if (!loader) return;
      loader.classList.add("is-done");
      setTimeout(function () {
        if (loader.parentNode) loader.parentNode.removeChild(loader);
      }, 1000);
    }

    var started = Date.now();
    function finishAfterLoader() {
      var elapsed = Date.now() - started;
      var wait = Math.max(0, 1150 - elapsed);
      setTimeout(finish, wait);
    }

    if (document.readyState === "complete") finishAfterLoader();
    else window.addEventListener("load", finishAfterLoader);
    // Safety net: never let the veil trap the page.
    setTimeout(finish, 3000);
  }

  /* ----------------------------------------------------------------------
     Header, menu, scroll progress
     ---------------------------------------------------------------------- */
  function initChrome() {
    var header = $("#siteHeader");
    var progress = $("#scrollProgress");
    var menuToggle = $("#menuToggle");
    var ticking = false;

    var paperSections = $$(".theme-paper");

    function syncHeaderTheme() {
      if (!header) return;
      if (document.body.classList.contains("nav-open")) {
        header.classList.remove("is-inverted");
        return;
      }
      var probe = 40;
      var overPaper = paperSections.some(function (section) {
        var rect = section.getBoundingClientRect();
        return rect.top <= probe && rect.bottom >= probe;
      });
      header.classList.toggle("is-inverted", overPaper);
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        var y = window.scrollY || window.pageYOffset;
        var doc = document.documentElement;
        var max = doc.scrollHeight - window.innerHeight;
        if (header) header.classList.toggle("is-scrolled", y > 24);
        if (progress) progress.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
        syncHeaderTheme();
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncHeaderTheme);
    onScroll();

    if (menuToggle) {
      var closeMenu = function () {
        document.body.classList.remove("nav-open");
        document.body.classList.remove("is-locked");
        menuToggle.setAttribute("aria-expanded", "false");
        syncHeaderTheme();
      };
      menuToggle.addEventListener("click", function () {
        var open = !document.body.classList.contains("nav-open");
        document.body.classList.toggle("nav-open", open);
        document.body.classList.toggle("is-locked", open);
        menuToggle.setAttribute("aria-expanded", String(open));
        syncHeaderTheme();
      });
      $$("#primaryNav a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeMenu();
      });
    }
  }

  /* ----------------------------------------------------------------------
     Active section in the navigation
     ---------------------------------------------------------------------- */
  function initSectionSpy() {
    var links = $$('#primaryNav a[href^="#"]');
    if (!links.length || !("IntersectionObserver" in window)) return;
    var sections = [];
    links.forEach(function (link) {
      var section = document.querySelector(link.getAttribute("href"));
      if (section) sections.push({ section: section, link: link });
    });
    $$("[data-spy]").forEach(function (section) {
      var target = section.getAttribute("data-spy");
      var link = links.filter(function (l) { return l.getAttribute("href") === target; })[0];
      if (link) sections.push({ section: section, link: link });
    });

    function activate(link) {
      links.forEach(function (l) { l.classList.toggle("is-active", l === link); });
    }

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        for (var i = 0; i < sections.length; i++) {
          if (sections[i].section === entry.target) activate(sections[i].link);
        }
      });
    }, { rootMargin: "-42% 0px -52% 0px", threshold: 0 });

    sections.forEach(function (item) { spy.observe(item.section); });

    window.addEventListener("scroll", function () {
      if (window.scrollY < window.innerHeight * 0.55) activate(null);
    }, { passive: true });
  }

  /* ----------------------------------------------------------------------
     Scroll reveal
     ---------------------------------------------------------------------- */
  function initReveal() {
    var items = $$("[data-reveal]");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px 0px 0px" });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ----------------------------------------------------------------------
     Hero: pointer glow + generative waveform
     ---------------------------------------------------------------------- */
  function initHero() {
    var hero = $(".hero");
    var canvas = $("#heroCanvas");
    if (!hero) return;

    var glow = $("#heroGlow");
    var pointer = 0.68;
    var pointerTarget = 0.68;

    if (canHover && glow) {
      hero.addEventListener("pointermove", function (e) {
        var rect = hero.getBoundingClientRect();
        pointerTarget = (e.clientX - rect.left) / rect.width;
        glow.style.setProperty("--mx", ((e.clientX - rect.left) / rect.width) * 100 + "%");
        glow.style.setProperty("--my", ((e.clientY - rect.top) / rect.height) * 100 + "%");
      }, { passive: true });
    }

    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var w = 0, h = 0, dpr = 1;
    var gradient = null;
    var rafId = null;
    var visible = true;

    function resize() {
      var rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gradient = ctx.createLinearGradient(0, h, 0, h * 0.12);
      gradient.addColorStop(0, "rgba(240, 235, 225, 0.4)");
      gradient.addColorStop(0.45, "rgba(240, 235, 225, 0.16)");
      gradient.addColorStop(1, "rgba(240, 235, 225, 0)");
    }

    function draw(time) {
      if (!w || !h || !gradient) return;
      ctx.clearRect(0, 0, w, h);
      var gap = w < 640 ? 6 : 8;
      var count = Math.max(28, Math.floor(w / gap));
      var mouseInfluence = canHover ? pointer : 0.68;
      ctx.fillStyle = gradient;

      for (var i = 0; i < count; i++) {
        var nx = i / count;
        var focus = Math.exp(-Math.pow((nx - mouseInfluence) * 5.2, 2)) * 0.34;
        var a = 0.16 + 0.12 * Math.sin(nx * 6.2 + time * 0.00042);
        var b = 0.34 * Math.pow(Math.sin(nx * Math.PI * 1.7 + time * 0.00062), 2);
        var c = 0.22 * Math.pow(Math.sin(nx * Math.PI * 4.6 - time * 0.00086 + 1.4), 2);
        var amp = Math.max(0.04, Math.min(1, a + b + c + focus));
        var bh = amp * h * 0.62;
        var bw = gap - 3;
        ctx.fillRect(i * gap + 1, h - bh, bw, bh);
      }
    }

    var start = performance.now();
    function frame(now) {
      rafId = null;
      pointer += (pointerTarget - pointer) * 0.06;
      draw(now - start);
      rafId = window.requestAnimationFrame(frame);
    }
    function startLoop() {
      if (rafId !== null || !visible || document.hidden) return;
      start = performance.now();
      rafId = window.requestAnimationFrame(frame);
    }
    function stopLoop() {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      rafId = null;
    }

    resize();
    window.addEventListener("resize", resize);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(resize);

    if (reduceMotion) {
      draw(4200);
      return;
    }
    startLoop();

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) startLoop(); else stopLoop();
      }, { threshold: 0 }).observe(hero);
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stopLoop(); else startLoop();
    });
  }

  /* ----------------------------------------------------------------------
     Audio player
     ---------------------------------------------------------------------- */
  function initMusic() {
    if (!TRACKS.length) return;

    var audio = $("#audio");
    var player = $("#player");
    var trackList = $("#trackList");
    var seek = $("#seekBar");
    var playBtn = $("#playBtn");
    var prevBtn = $("#prevBtn");
    var nextBtn = $("#nextBtn");
    var muteBtn = $("#muteBtn");
    var volume = $("#volume");
    var currentEl = $("#playerCurrent");
    var durationEl = $("#playerDuration");
    var titleEl = $("#playerTitle");
    var subEl = $("#playerSub");
    var artEl = $("#playerArt");
    var notice = $("#audioNotice");
    var noticeText = $("#audioNoticeText");
    var status = $("#playerStatus");
    var lyricsBtn = $("#lyricsBtn");
    var lyricsModal = $("#lyricsModal");
    var lyricsTitle = $("#lyricsTitle");
    var lyricsBody = $("#lyricsBody");
    var lyricsNote = $("#lyricsNote");
    var lyricsTranslation = $("#lyricsTranslation");
    var lyricsOpen = false;
    var lyricsLastFocus = null;
    var lyricsCloseTimer = null;
    var lyricsAutoOpened = -1;

    var state = {
      index: -1,
      playing: false,
      token: 0,
      dragging: false,
      duration: 0
    };

    var rowEls = [];
    var rafId = null;

    /* ---- Build the seek waveform ---- */
    (function buildSeek() {
      if (!seek) return;
      var bars = [];
      var total = 68;
      for (var i = 0; i < total; i++) {
        var t = i / total;
        var v = 26 +
          30 * Math.abs(Math.sin(t * Math.PI * 2.6 + 0.4)) +
          22 * Math.abs(Math.sin(t * Math.PI * 6.7 + 1.1)) +
          12 * Math.abs(Math.sin(t * Math.PI * 13.2));
        bars.push(Math.max(10, Math.min(100, v)));
      }
      var html = bars.map(function (height) {
        return '<i style="height:' + height.toFixed(1) + '%"></i>';
      }).join("");
      var base = seek.querySelector(".seek__layer--base");
      var fill = seek.querySelector(".seek__layer--fill");
      if (base) base.innerHTML = html;
      if (fill) fill.innerHTML = html;
    })();

    /* ---- Track list ---- */
    TRACKS.forEach(function (track, i) {
      var li = document.createElement("li");
      li.className = "track";
      li.setAttribute("data-index", String(i));
      li.setAttribute("data-reveal", "");
      li.style.setProperty("--reveal-delay", i * 60 + "ms");

      var meta = [];
      if (track.note) meta.push('<span class="track__note">' + track.note + "</span>");
      if (track.lyrics) meta.push('<button class="track__lyrics" type="button" aria-label="Read lyrics for ' + (track.title || "this track") + '">Lyrics</button>');
      meta.push('<span class="track__pending">Audio pending</span>');

      li.innerHTML =
        '<span class="track__index">A' + (i + 1) + "</span>" +
        '<div class="track__info">' +
          '<h3 class="track__title">' + (track.title || "Untitled") +
            '<span class="track__eq" aria-hidden="true"><i></i><i></i><i></i></span>' +
          "</h3>" +
          '<p class="track__meta">' + meta.join("") + "</p>" +
        "</div>" +
        '<span class="track__dur">—:—</span>' +
        '<button class="track__btn" type="button" aria-label="Play ' + (track.title || "") + '">' +
          '<svg class="i-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/></svg>' +
          '<svg class="i-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5v14M15 5v14"/></svg>' +
        "</button>";

      var lyricsLink = li.querySelector(".track__lyrics");
      if (lyricsLink) {
        lyricsLink.addEventListener("click", function (e) {
          e.stopPropagation();
          if (state.index !== i) selectTrack(i, true);
          openLyrics(i);
        });
      }

      li.addEventListener("click", function () {
        if (state.index === i) {
          togglePlay();
        } else {
          selectTrack(i, true);
        }
      });

      trackList.appendChild(li);
      rowEls.push(li);
    });

    /* ---- Source resolution with friendly fallbacks ---- */
    function candidateSources(track, i) {
      var n = i + 1;
      var pad = pad2(n);
      var list = [
        track.file,
        "music/" + pad + ".mp3",
        "music/" + n + ".mp3",
        "music/track-" + pad + ".mp3",
        "music/track" + n + ".mp3",
        "music/" + pad + ".m4a",
        "music/" + pad + ".wav"
      ].filter(Boolean);
      return list.filter(function (v, idx) { return list.indexOf(v) === idx; });
    }

    function probe(track, i) {
      if (track.__probe) return track.__probe;
      var sources = candidateSources(track, i);
      track.__probe = new Promise(function (resolve) {
        var settled = false;
        var attempt = 0;
        var probeAudio = new Audio();
        probeAudio.preload = "metadata";

        function done(result) {
          if (settled) return;
          settled = true;
          probeAudio.onloadedmetadata = null;
          probeAudio.onerror = null;
          try { probeAudio.removeAttribute("src"); probeAudio.load(); } catch (e) { /* noop */ }
          // A failed probe is not cached: if files are added later, a click retries.
          if (!result.ok) track.__probe = null;
          resolve(result);
        }

        function next() {
          if (settled) return;
          if (attempt >= sources.length) { done({ ok: false, sources: sources }); return; }
          var src = sources[attempt++];
          probeAudio.onloadedmetadata = function () {
            done({ ok: true, src: src, duration: probeAudio.duration });
          };
          probeAudio.onerror = function () {
            setTimeout(next, 30);
          };
          probeAudio.src = src;
        }

        next();
        setTimeout(function () { done({ ok: false, sources: sources }); }, 7000);
      });
      return track.__probe;
    }

    function durationLabel(value) {
      return isFinite(value) && value > 0 ? formatTime(value) : "—:—";
    }

    function applyProbe(i, result) {
      var row = rowEls[i];
      var track = TRACKS[i];
      if (!row) return;
      var durEl = row.querySelector(".track__dur");
      if (result.ok) {
        track.__src = result.src;
        track.__duration = result.duration;
        track.__missing = false;
        row.classList.remove("is-missing");
        if (durEl) durEl.textContent = durationLabel(result.duration);
        row.querySelector(".track__btn").setAttribute("aria-label", "Play " + track.title);
      } else {
        track.__missing = true;
        track.__src = null;
        row.classList.add("is-missing");
        if (durEl) durEl.textContent = "—:—";
        row.querySelector(".track__btn").setAttribute("aria-label", track.title + " (audio pending)");
      }
    }

    function updateNotice() {
      if (!notice) return;
      var missing = TRACKS.filter(function (t) { return t.__missing; }).length;
      if (missing === 0) {
        notice.hidden = true;
        return;
      }
      notice.hidden = false;
      if (noticeText) {
        noticeText.textContent = missing + (missing === 1 ? " track is" : " tracks are") + " still to be added — drop the files into the music folder and refresh.";
      }
    }

    /* Probe sequentially so the page stays light */
    (function probeAll() {
      var chain = Promise.resolve();
      TRACKS.forEach(function (track, i) {
        chain = chain.then(function () {
          return probe(track, i).then(function (result) {
            applyProbe(i, result);
            updateNotice();
          });
        });
      });
    })();

    /* ---- Player UI ---- */
    function markRows() {
      rowEls.forEach(function (row, i) {
        var active = i === state.index;
        row.classList.toggle("is-active", active);
        row.classList.toggle("is-playing", active && state.playing);
      });
    }

    function showPlayer() {
      player.classList.add("is-visible");
      player.setAttribute("aria-hidden", "false");
      document.body.classList.add("has-player");
    }

    function updatePlayerUI() {
      var track = TRACKS[state.index];
      if (!track) return;
      titleEl.textContent = track.title || "Untitled";
      subEl.textContent = track.note || ((SITE.artistName || SITE.name || "Zoe Sun") + " · Music Portfolio");
      artEl.setAttribute("data-art", String(state.index + 1));
      currentEl.textContent = "0:00";
      durationEl.textContent = durationLabel(track.__duration);
      seek.style.setProperty("--p", "0%");
      seek.setAttribute("aria-valuenow", "0");
      seek.setAttribute("aria-valuetext", "0:00");
      syncLyricsButton();
      if (lyricsOpen) {
        if (track.lyrics) renderLyrics(state.index, track);
        else closeLyrics();
      }
      markRows();

      if ("mediaSession" in navigator && window.MediaMetadata) {
        try {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: track.title || "Untitled",
            artist: SITE.artistName || SITE.name || "Zoe Sun",
            album: "Music Portfolio"
          });
        } catch (e) { /* noop */ }
      }
    }

    function lyricsFor(index) {
      var track = TRACKS[index];
      return track && track.lyrics ? track.lyrics : null;
    }

    function syncLyricsButton() {
      if (!lyricsBtn) return;
      lyricsBtn.hidden = !lyricsFor(state.index);
    }

    function renderLyrics(index, track) {
      var lyrics = track.lyrics;
      if (!lyrics || !lyricsModal) return;
      lyricsTitle.textContent = track.title || "Untitled";
      lyricsBody.innerHTML = (lyrics.sections || []).map(function (section) {
        return '<section class="lyrics-section">' +
          '<h4 class="lyrics-section__label">' + section.label + "</h4>" +
          "<p>" + section.lines.join("<br />") + "</p>" +
          "</section>";
      }).join("");
      lyricsNote.textContent = lyrics.note || "";
      lyricsTranslation.textContent = lyrics.translationNote || "";
    }

    function openLyrics(index) {
      var track = TRACKS[index];
      if (!track || !track.lyrics || !lyricsModal) return;
      lyricsLastFocus = document.activeElement;
      clearTimeout(lyricsCloseTimer);
      renderLyrics(index, track);
      lyricsOpen = true;
      lyricsModal.hidden = false;
      var panel = lyricsModal.querySelector(".lyrics-modal__panel");
      if (panel) panel.scrollTop = 0;
      document.body.classList.add("is-locked");
      window.requestAnimationFrame(function () { lyricsModal.classList.add("is-open"); });
      var closeBtn = lyricsModal.querySelector(".lightbox__close");
      if (closeBtn) closeBtn.focus({ preventScroll: true });
    }

    function closeLyrics() {
      if (!lyricsModal) return;
      lyricsOpen = false;
      lyricsModal.classList.remove("is-open");
      document.body.classList.remove("is-locked");
      clearTimeout(lyricsCloseTimer);
      lyricsCloseTimer = setTimeout(function () {
        if (lyricsOpen) return;
        lyricsModal.hidden = true;
        if (lyricsLastFocus && lyricsLastFocus.focus) lyricsLastFocus.focus({ preventScroll: true });
      }, 400);
    }

    function setPlayingUI(playing) {
      state.playing = playing;
      player.classList.toggle("is-playing", playing);
      playBtn.setAttribute("aria-label", playing ? "Pause" : "Play");
      markRows();
      if (playing) {
        var currentTrack = TRACKS[state.index];
        if (currentTrack && currentTrack.lyrics && !lyricsOpen && lyricsAutoOpened !== state.index) {
          lyricsAutoOpened = state.index;
          openLyrics(state.index);
        }
        startTicker();
        if (status) status.textContent = "Playing " + (TRACKS[state.index] ? TRACKS[state.index].title : "");
      } else {
        stopTicker();
        if (status) status.textContent = "Paused";
      }
    }

    function startTicker() {
      stopTicker();
      var tick = function () {
        updateProgress();
        if (state.playing && !audio.paused) rafId = window.requestAnimationFrame(tick);
      };
      rafId = window.requestAnimationFrame(tick);
    }
    function stopTicker() {
      if (rafId) window.cancelAnimationFrame(rafId);
      rafId = null;
    }

    function updateProgress() {
      var duration = audio.duration;
      if (state.dragging) return;
      if (!isFinite(duration) || duration <= 0) {
        currentEl.textContent = audio.currentTime > 0 ? formatTime(audio.currentTime) : "0:00";
        return;
      }
      var ratio = Math.min(1, audio.currentTime / duration);
      var pct = ratio * 100;
      seek.style.setProperty("--p", pct + "%");
      seek.setAttribute("aria-valuenow", String(Math.round(pct)));
      seek.setAttribute("aria-valuetext", formatTime(audio.currentTime));
      currentEl.textContent = formatTime(audio.currentTime);
    }

    function play() {
      var promise = audio.play();
      if (promise && promise.catch) {
        promise.catch(function (err) {
          setPlayingUI(false);
          if (err && err.name === "NotAllowedError") {
            showToast("Your browser blocked autoplay. Press play once more.");
          } else if (err && err.name === "NotSupportedError") {
            showToast("This format cannot be played here. Try exporting it as MP3.");
          }
        });
      }
    }

    function togglePlay() {
      if (state.index < 0) { selectTrack(0, true); return; }
      var track = TRACKS[state.index];
      if (track && track.__missing) { selectTrack(state.index, true); return; }
      if (audio.paused) play(); else audio.pause();
    }

    function selectTrack(i, autoplay) {
      var track = TRACKS[i];
      if (!track) return;
      var token = ++state.token;
      state.index = i;
      // Stop whatever was playing, so the UI never shows track A while hearing B.
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      state.duration = 0;
      setPlayingUI(false);
      showPlayer();
      updatePlayerUI();

      probe(track, i).then(function (result) {
        if (token !== state.token) return;
        if (!result.ok) {
          applyProbe(i, result);
          updateNotice();
          markRows();
          showToast("This track is not here yet. Add " + (track.file || "the MP3") + " to the music folder.");
          return;
        }
        applyProbe(i, result);
        updateNotice();
        durationEl.textContent = durationLabel(result.duration);
        var activeRow = rowEls[i];
        if (activeRow) {
          var activeDur = activeRow.querySelector(".track__dur");
          if (activeDur) activeDur.textContent = durationLabel(result.duration);
        }
        audio.src = result.src;
        audio.load();
        if (autoplay) play();
      });
    }

    function step(delta) {
      if (state.index < 0) { selectTrack(0, true); return; }
      var nextIndex = (state.index + delta + TRACKS.length) % TRACKS.length;
      selectTrack(nextIndex, true);
    }

    /* ---- Events ---- */
    playBtn.addEventListener("click", function () {
      if (state.index < 0) selectTrack(0, true);
      else togglePlay();
    });
    if (lyricsBtn) {
      lyricsBtn.addEventListener("click", function () {
        if (state.index < 0) return;
        openLyrics(state.index);
      });
    }
    if (lyricsModal) {
      $$("[data-lyrics-close]", lyricsModal).forEach(function (el) {
        el.addEventListener("click", closeLyrics);
      });
      document.addEventListener("keydown", function (e) {
        if (lyricsModal.hidden) return;
        if (e.key === "Escape") closeLyrics();
      });
    }
    prevBtn.addEventListener("click", function () {
      if (state.index >= 0 && audio.currentTime > 3) {
        audio.currentTime = 0;
        updateProgress();
        return;
      }
      step(-1);
    });
    nextBtn.addEventListener("click", function () { step(1); });

    audio.addEventListener("play", function () { setPlayingUI(true); });
    audio.addEventListener("pause", function () { setPlayingUI(false); });
    audio.addEventListener("loadedmetadata", function () {
      state.duration = audio.duration;
      durationEl.textContent = durationLabel(audio.duration);
      var row = rowEls[state.index];
      if (row) {
        var durEl = row.querySelector(".track__dur");
        if (durEl) durEl.textContent = durationLabel(audio.duration);
      }
      updateProgress();
    });
    audio.addEventListener("durationchange", function () {
      if (state.index < 0) return;
      durationEl.textContent = durationLabel(audio.duration);
      var row = rowEls[state.index];
      if (row) {
        var durEl = row.querySelector(".track__dur");
        if (durEl) durEl.textContent = durationLabel(audio.duration);
      }
    });
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", function () { step(1); });
    audio.addEventListener("error", function () {
      if (state.index < 0) return;
      var track = TRACKS[state.index];
      var row = rowEls[state.index];
      if (row) {
        row.classList.add("is-missing");
        var durEl = row.querySelector(".track__dur");
        if (durEl) durEl.textContent = "—:—";
      }
      setPlayingUI(false);
      showToast("Could not play this track. Check " + (track && track.file ? track.file : "the file") + ".");
    });

    /* Seek interaction */
    function ratioFromEvent(e) {
      var rect = seek.getBoundingClientRect();
      var x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      return Math.max(0, Math.min(1, x / rect.width));
    }
    function seekToRatio(ratio) {
      var duration = audio.duration;
      if (!isFinite(duration) || duration <= 0) return;
      audio.currentTime = ratio * duration;
      seek.style.setProperty("--p", ratio * 100 + "%");
      seek.setAttribute("aria-valuenow", String(Math.round(ratio * 100)));
      currentEl.textContent = formatTime(audio.currentTime);
    }

    var dragging = false;
    function onPointerDown(e) {
      if (e.button !== undefined && e.button !== 0) return;
      if (state.index < 0) return;
      dragging = true;
      state.dragging = true;
      seek.classList.add("is-dragging");
      seek.setPointerCapture && seek.setPointerCapture(e.pointerId);
      seekToRatio(ratioFromEvent(e));
    }
    function onPointerMove(e) {
      if (!dragging) return;
      seekToRatio(ratioFromEvent(e));
    }
    function onPointerUp(e) {
      if (!dragging) return;
      dragging = false;
      state.dragging = false;
      seek.classList.remove("is-dragging");
      try { seek.releasePointerCapture && seek.releasePointerCapture(e.pointerId); } catch (err) { /* noop */ }
    }
    if (seek) {
      seek.addEventListener("pointerdown", onPointerDown);
      seek.addEventListener("pointermove", onPointerMove);
      seek.addEventListener("pointerup", onPointerUp);
      seek.addEventListener("pointercancel", onPointerUp);
      seek.addEventListener("mousemove", function (e) {
        if (e.buttons === 0 && !state.dragging) {
          var rect = seek.getBoundingClientRect();
          var ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
          if (isFinite(audio.duration) && audio.duration > 0) {
            seek.title = formatTime(ratio * audio.duration);
          }
        }
      });
      seek.addEventListener("keydown", function (e) {
        var duration = audio.duration;
        if (!isFinite(duration) || duration <= 0) return;
        var handled = true;
        if (e.key === "ArrowRight" || e.key === "ArrowUp") {
          audio.currentTime = Math.min(duration, audio.currentTime + 5);
        } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
          audio.currentTime = Math.max(0, audio.currentTime - 5);
        } else if (e.key === "Home") {
          audio.currentTime = 0;
        } else if (e.key === "End") {
          audio.currentTime = duration;
        } else if (e.key === " " || e.key === "Enter") {
          togglePlay();
        } else {
          handled = false;
        }
        if (handled) {
          e.preventDefault();
          updateProgress();
        }
      });
    }

    /* Volume */
    var savedVolume = parseFloat(read("zoe-volume"));
    var initialVolume = isFinite(savedVolume) ? savedVolume : 0.75;
    audio.volume = initialVolume;
    audio.muted = read("zoe-muted") === "1";

    function paintVolume() {
      var v = audio.muted ? 0 : audio.volume;
      if (volume) volume.value = String(Math.round(v * 100));
      if (volume) volume.style.setProperty("--v", Math.round(v * 100) + "%");
      player.classList.toggle("is-muted", audio.muted || audio.volume === 0);
      muteBtn.setAttribute("aria-label", audio.muted ? "Unmute" : "Mute");
    }
    paintVolume();

    if (volume) {
      volume.addEventListener("input", function () {
        var val = parseFloat(volume.value) / 100;
        audio.volume = val;
        audio.muted = val === 0;
        store("zoe-volume", String(val));
        store("zoe-muted", audio.muted ? "1" : "0");
        paintVolume();
      });
    }
    muteBtn.addEventListener("click", function () {
      audio.muted = !audio.muted;
      if (!audio.muted && audio.volume === 0) {
        audio.volume = 0.6;
        store("zoe-volume", "0.6");
      }
      store("zoe-muted", audio.muted ? "1" : "0");
      paintVolume();
    });

    /* Global space bar */
    document.addEventListener("keydown", function (e) {
      if (e.key !== " " && e.code !== "Space") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      var target = e.target;
      if (target && (target.closest("input, textarea, button, a, [contenteditable]"))) return;
      if (document.body.classList.contains("nav-open")) return;
      if ($("#lightbox") && !$("#lightbox").hidden) return;
      if ($("#videoModal") && !$("#videoModal").hidden) return;
      if (state.index < 0) return;
      e.preventDefault();
      togglePlay();
    });

    if ("mediaSession" in navigator) {
      try {
        navigator.mediaSession.setActionHandler("play", function () { play(); });
        navigator.mediaSession.setActionHandler("pause", function () { audio.pause(); });
        navigator.mediaSession.setActionHandler("nexttrack", function () { step(1); });
        navigator.mediaSession.setActionHandler("previoustrack", function () { step(-1); });
      } catch (e) { /* noop */ }
    }
  }


  /* ----------------------------------------------------------------------
     Experience timeline + working principles
     ---------------------------------------------------------------------- */
  function initExperience() {
    var list = $("#experienceList");
    if (list && EXPERIENCE.length) {
      EXPERIENCE.forEach(function (item, i) {
        var el = document.createElement("article");
        el.className = "xp";
        el.setAttribute("data-reveal", "");
        el.style.setProperty("--reveal-delay", (i % 3) * 60 + "ms");
        var tags = (item.tags || []).map(function (tag) { return "<li>" + tag + "</li>"; }).join("");
        el.innerHTML =
          '<p class="xp__period">' + (item.period || "") + "</p>" +
          '<div class="xp__body">' +
            '<h3 class="xp__role">' + (item.role || "").replace(/ · /g, "&nbsp;· ") +
              (item.roleEn ? "<span>" + item.roleEn + "</span>" : "") +
            "</h3>" +
            '<p class="xp__org">' + [item.org, item.location].filter(Boolean).join(" · ") + "</p>" +
            '<p class="xp__desc">' + (item.description || "") + "</p>" +
            (function () {
              var stats = (item.stats || []).map(function (stat) {
                return "<li><b>" + stat.value + "</b><span>" + stat.label + "</span></li>";
              }).join("");
              return stats ? '<ul class="xp__stats">' + stats + "</ul>" : "";
            })() +
            (tags ? '<ul class="xp__tags">' + tags + "</ul>" : "") +
          "</div>";
        list.appendChild(el);
      });
    }

    var principles = $("#principlesList");
    if (principles) {
      PRINCIPLES.forEach(function (p) {
        var li = document.createElement("li");
        li.className = "principle";
        li.innerHTML =
          '<span class="principle__key">' + p.key + "</span>" +
          "<div>" +
            '<p class="principle__label">' + p.label + "</p>" +
            '<p class="principle__text">' + p.text + "</p>" +
          "</div>";
        principles.appendChild(li);
      });
    }
  }

  /* ----------------------------------------------------------------------
     Music × Management
     ---------------------------------------------------------------------- */
  function initManagement() {
    if (!MANAGEMENT) return;

    var statement = $("#mgmtStatement");
    if (statement) statement.innerHTML = MANAGEMENT.statement || "";

    var sub = $("#mgmtSub");
    if (sub) sub.textContent = MANAGEMENT.statementSub || "";

    var body = $("#mgmtBody");
    if (body) {
      var html = (MANAGEMENT.paragraphs || []).map(function (p) { return "<p>" + p + "</p>"; }).join("");
      var closing = MANAGEMENT.closing || [];
      if (closing.length) {
        html += '<p class="management__closing">' +
          '<span class="management__closing-label">Currently exploring</span>' +
          '<span class="management__closing-items">' + closing.join(" · ") + "</span>" +
          "</p>";
      }
      body.innerHTML = html;
    }

    var pillars = $("#pillarList");
    if (pillars) {
      (MANAGEMENT.pillars || []).forEach(function (p, i) {
        var li = document.createElement("li");
        li.className = "pillar";
        li.innerHTML =
          '<span class="pillar__num">0' + (i + 1) + "</span>" +
          "<div>" +
            '<p class="pillar__title">' + p.title +
              (p.titleEn ? "<span>" + p.titleEn + "</span>" : "") +
            "</p>" +
            "<p>" + p.text + "</p>" +
          "</div>";
        pillars.appendChild(li);
      });
    }
  }

  /* ----------------------------------------------------------------------
     Performance films + video modal
     ---------------------------------------------------------------------- */
  function initVideos() {
    var grid = $("#filmGrid");
    var modal = $("#videoModal");
    if (!grid || !modal) return;

    var player = $("#videoPlayer");
    var frame = $("#videoFrame");
    var fallback = $("#videoFallback");
    var fallbackPath = $("#videoFallbackPath");
    var titleEl = $("#videoTitle");
    var noteEl = $("#videoNote");
    var detailEl = $("#videoDetail");
    var closeBtn = modal.querySelector(".lightbox__close");
    var current = -1;
    var lastFocus = null;

    function markPending(card, pending) {
      card.classList.toggle("is-pending", pending);
    }

    VIDEOS.forEach(function (video, i) {
      var card = document.createElement("figure");
      card.className = "film";
      card.setAttribute("data-reveal", "");
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "Play video: " + (video.title || "Video " + (i + 1)));
      card.style.setProperty("--reveal-delay", (i % 3) * 60 + "ms");
      card.innerHTML =
        '<img src="' + (video.poster || "") + '" alt="" loading="lazy" decoding="async" />' +
        '<span class="film__play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/></svg></span>' +
        '<figcaption class="film__meta">' +
          '<span class="film__title">' + (video.title || "Untitled") + "</span>" +
          '<span class="film__note">' + (video.note || "") + "</span>" +
        "</figcaption>" +
        '<span class="film__pending">Video pending</span>';

      var img = card.querySelector("img");
      img.addEventListener("error", function () { img.style.opacity = "0"; });

      function open() { openVideo(i); }
      card.addEventListener("click", open);
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });

      grid.appendChild(card);

      if (!video.embed) {
        if (!video.src) {
          markPending(card, true);
        } else {
          markPending(card, true);
          var probe = document.createElement("video");
          probe.preload = "metadata";
          probe.addEventListener("loadedmetadata", function () { markPending(card, false); });
          probe.addEventListener("error", function () { markPending(card, true); });
          probe.src = video.src;
          setTimeout(function () {
            if (probe.readyState === 0) markPending(card, true);
          }, 6000);
        }
      }
    });

    function clearFrame() {
      var oldIframe = frame.querySelector("iframe");
      if (oldIframe) oldIframe.remove();
      player.pause();
      player.removeAttribute("src");
      player.removeAttribute("poster");
      try { player.load(); } catch (e) { /* noop */ }
      player.hidden = false;
    }

    function showFallback(video) {
      player.pause();
      player.hidden = true;
      fallback.hidden = false;
      frame.classList.add("is-fallback");
      fallbackPath.textContent = (video && video.src) || "video/0" + (current + 1) + ".mp4";
    }

    function openVideo(i) {
      var video = VIDEOS[i];
      if (!video) return;
      current = i;
      lastFocus = document.activeElement;

      var audio = $("#audio");
      if (audio && !audio.paused) audio.pause();

      titleEl.textContent = video.title || "Performance film";
      noteEl.textContent = video.note || "";
      detailEl.textContent = video.detail || "";
      fallback.hidden = true;
      frame.classList.remove("is-fallback");
      clearFrame();

      if (video.embed) {
        player.hidden = true;
        var iframe = document.createElement("iframe");
        iframe.src = video.embed;
        iframe.title = video.title || "Performance video";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen";
        iframe.setAttribute("allowfullscreen", "");
        frame.appendChild(iframe);
      } else if (video.src) {
        player.src = video.src;
        if (video.poster) player.poster = video.poster;
        player.load();
        var promise = player.play();
        if (promise && promise.catch) promise.catch(function () { /* user can press play */ });
      } else {
        showFallback(video);
      }

      modal.hidden = false;
      document.body.classList.add("is-locked");
      window.requestAnimationFrame(function () { modal.classList.add("is-open"); });
      if (closeBtn) closeBtn.focus({ preventScroll: true });
    }

    function closeVideo() {
      modal.classList.remove("is-open");
      document.body.classList.remove("is-locked");
      setTimeout(function () {
        modal.hidden = true;
        clearFrame();
        fallback.hidden = true;
        frame.classList.remove("is-fallback");
        current = -1;
        if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
      }, 420);
    }

    player.addEventListener("error", function () {
      if (!player.getAttribute("src")) return;
      if (current >= 0 && !modal.hidden) showFallback(VIDEOS[current]);
    });

    $$("[data-video-close]", modal).forEach(function (el) {
      el.addEventListener("click", closeVideo);
    });

    document.addEventListener("keydown", function (e) {
      if (modal.hidden) return;
      if (e.key === "Escape") closeVideo();
    });
  }

  /* ----------------------------------------------------------------------
     Bands
     ---------------------------------------------------------------------- */
  function initBands() {
    var intro = $("#bandsIntro");
    if (intro && BANDS_INTRO) intro.textContent = BANDS_INTRO;

    var grid = $("#bandGrid");
    if (!grid) return;

    BANDS.forEach(function (band, i) {
      var card = document.createElement("article");
      card.className = "band";
      card.setAttribute("data-reveal", "");
      card.style.setProperty("--reveal-delay", (i % 2) * 70 + "ms");
      var tag = [band.tagline, band.period].filter(Boolean).join(" · ");

      card.innerHTML =
        '<div class="band__top">' +
          '<h3 class="band__logo">' +
            '<span class="band__wordmark">' + (band.name || "Band") + "</span>" +
            (band.logo
              ? '<img src="' + band.logo + '" alt="' + (band.name || "Band") + ' logo" loading="lazy" />'
              : "") +
          "</h3>" +
          '<span class="band__tag">' + tag + "</span>" +
        "</div>" +
        '<div class="band__text">' +
          '<p class="band__role">' + (band.role || "") + "</p>" +
          '<p class="band__desc">' + (band.description || "") + "</p>" +
        "</div>" +
        '<figure class="band__photo">' +
          (band.photo
            ? '<img src="' + band.photo + '" alt="' + (band.alt || band.name || "") + '" loading="lazy" />'
            : "") +
          '<span class="band__photo-fallback">Photo pending</span>' +
          (band.caption ? '<figcaption class="band__caption">' + band.caption + "</figcaption>" : "") +
        "</figure>";

      var logo = card.querySelector(".band__logo");
      var logoImg = logo.querySelector("img");
      if (logoImg) {
        logoImg.addEventListener("load", function () { logo.classList.add("has-logo"); });
        logoImg.addEventListener("error", function () {
          logoImg.style.display = "none";
          logo.classList.remove("has-logo");
        });
      }

      var photo = card.querySelector(".band__photo");
      var photoImg = photo.querySelector("img");
      if (photoImg) {
        photoImg.addEventListener("error", function () {
          photoImg.style.display = "none";
          photo.classList.add("is-fallback");
        });
      } else {
        photo.classList.add("is-fallback");
      }

      grid.appendChild(card);
    });
  }

  /* ----------------------------------------------------------------------
     Charity single feature quote
     ---------------------------------------------------------------------- */
  function initFeature() {
    if (!FEATURE) return;
    var label = $("#featureLabel");
    var quote = $("#featureQuote");
    var credit = $("#featureCredit");
    var note = $("#featureNote");
    if (label) label.textContent = FEATURE.label || "";
    if (quote) quote.innerHTML = FEATURE.quote || "";
    if (credit) credit.textContent = FEATURE.credit || "";
    if (note) note.textContent = FEATURE.note || "";
    var link = $("#featureLink");
    if (link && FEATURE.link) {
      link.href = FEATURE.link;
      link.textContent = FEATURE.linkLabel || "Learn more";
      link.hidden = false;
    }
  }

  /* ----------------------------------------------------------------------
     Academics: facts, outcomes, awards, certificates
     ---------------------------------------------------------------------- */
  function initAcademics() {
    var facts = $("#acadFacts");
    if (facts) {
      ACADEMIC_FACTS.forEach(function (fact) {
        var wrap = document.createElement("div");
        wrap.className = "acad-fact";
        var dt = document.createElement("dt");
        dt.textContent = fact.label || "";
        var dd = document.createElement("dd");
        dd.textContent = fact.value || "";
        wrap.appendChild(dt);
        wrap.appendChild(dd);
        facts.appendChild(wrap);
      });
    }

    function renderLedger(container, items) {
      if (!container) return;
      items.forEach(function (item, i) {
        var row = document.createElement("div");
        row.className = "award";
        row.setAttribute("data-reveal", "");
        row.style.setProperty("--reveal-delay", (i % 3) * 50 + "ms");
        row.innerHTML =
          '<span class="award__year">' + (item.year || "") + "</span>" +
          '<div class="award__main">' +
            '<h4 class="award__title">' + (item.title || "") +
              (item.titleEn ? '<span class="award__title-en">' + item.titleEn + "</span>" : "") +
            "</h4>" +
            '<p class="award__issuer">' + (item.issuer || "") + "</p>" +
          "</div>" +
          (item.note ? '<span class="award__note">' + item.note + "</span>" : "");
        container.appendChild(row);
      });
    }

    renderLedger($("#outcomeList"), OUTCOMES);
    renderLedger($("#honorList"), AWARDS);

    var honorsBlock = $("#honorsBlock");
    if (honorsBlock) {
      if (AWARDS.length) honorsBlock.hidden = false;
      else honorsBlock.hidden = true;
    }

    var visibleBlocks = $$("#academics .work-block").filter(function (block) { return !block.hidden; });
    visibleBlocks.forEach(function (block, i) {
      var number = block.querySelector(".subhead__label span");
      if (number) number.textContent = ("0" + (i + 1)).slice(-2);
    });

    var certGrid = $("#certGrid");
    if (certGrid) {
      CERTIFICATES.forEach(function (cert, i) {
        var hasFile = !!cert.file;
        var hasImage = !!cert.image;
        var card = document.createElement(hasFile ? "a" : "div");
        card.className = "cert" + (hasImage ? " cert--scan" : "");
        card.setAttribute("data-reveal", "");
        card.style.setProperty("--reveal-delay", (i % 4) * 50 + "ms");
        if (hasFile) {
          card.href = cert.file;
          card.target = "_blank";
          card.rel = "noopener";
        }

        var seal =
          '<span class="cert__seal" aria-hidden="true">' +
            '<svg viewBox="0 0 24 24"><path d="M12 3l2.2 5.2 5.6.5-4.3 3.7 1.3 5.5L12 14.9 7.2 17.9l1.3-5.5L4.2 8.7l5.6-.5z"/></svg>' +
          "</span>";
        var text =
          '<p class="cert__title">' + (cert.title || "") +
            (cert.titleEn ? "<span>" + cert.titleEn + "</span>" : "") +
          "</p>" +
          '<p class="cert__meta">' + [cert.issuer, cert.year].filter(Boolean).join(" · ") + "</p>";
        var link = hasFile
          ? '<span class="cert__link">' + (hasImage ? "Open full scan" : "View certificate") +
            ' <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg></span>'
          : "";

        if (hasImage) {
          card.innerHTML =
            '<span class="cert__scan"><img src="' + cert.image + '" alt="' + (cert.imageAlt || cert.title || "Certificate") + '" loading="lazy" /></span>' +
            '<div class="cert__body">' + seal + text + link + "</div>";
        } else {
          card.innerHTML = seal + "<div>" + text + "</div>" + link;
        }
        certGrid.appendChild(card);
      });
    }
  }

  /* ----------------------------------------------------------------------
     Gallery + lightbox
     ---------------------------------------------------------------------- */
  function initRecognition() {
    var grid = $("#recognitionGrid");
    if (!grid) return;
    RECOGNITIONS.forEach(function (item, i) {
      var card = document.createElement(item.file ? "a" : "article");
      card.className = "recognition-card";
      if (item.file) {
        card.href = item.file;
        card.target = "_blank";
        card.rel = "noopener";
      }
      card.setAttribute("data-reveal", "");
      card.style.setProperty("--reveal-delay", i * 60 + "ms");
      card.innerHTML =
        '<div class="recognition-card__media">' +
          (item.image ? '<img src="' + item.image + '" alt="' + item.imageAlt + '" loading="lazy" />' : "") +
          '<span class="recognition-card__index">0' + (i + 1) + "</span>" +
        "</div>" +
        '<div class="recognition-card__body">' +
          '<p class="recognition-card__label">' + item.label + "</p>" +
          '<h3 class="recognition-card__title">' + item.title + "</h3>" +
          '<p class="recognition-card__sub">' + item.subtitle + "</p>" +
          '<p class="recognition-card__meta">' + [item.issuer, item.year].filter(Boolean).join(" · ") + "</p>" +
          (item.score ? '<p class="recognition-card__score">' + item.score + "</p>" : "") +
          '<p class="recognition-card__note">' + item.note + "</p>" +
          '<span class="recognition-card__link">Open certificate <span aria-hidden="true">↗</span></span>' +
        "</div>";
      grid.appendChild(card);
    });
  }

  function initCaseFiles() {
    var grid = $("#caseGrid");
    var modal = $("#caseModal");
    if (!grid || !modal || !CASES.length) return;

    var body = $("#caseBody");
    var label = $("#caseLabel");
    var lastFocus = null;
    var closeTimer = null;
    var isOpen = false;

    grid.innerHTML = CASES.map(function (c, i) {
      return '<article class="case-card" data-case-index="' + i + '" tabindex="0" role="button" aria-label="Open case file: ' + c.title + '">' +
        '<div class="case-card__media' + (c.coverFit === "contain" ? " case-card__media--contain" : "") + '">' +
          '<img src="' + c.cover + '" alt="' + c.coverAlt + '" loading="lazy" />' +
          '<span class="case-card__year">' + c.year + '</span>' +
        "</div>" +
        '<div class="case-card__body">' +
          '<p class="case-card__eyebrow">' + c.eyebrow + "</p>" +
          '<h3 class="case-card__title">' + c.title + "</h3>" +
          '<p class="case-card__sub">' + c.subtitle + "</p>" +
          '<p class="case-card__summary">' + c.summary + "</p>" +
          '<span class="case-card__open">Read case study <span aria-hidden="true">↗</span></span>' +
        "</div>" +
      "</article>";
    }).join("");

    function renderCase(c) {
      var head =
        '<header class="case-head">' +
          '<p class="case-head__eyebrow">' + c.eyebrow + "</p>" +
          '<h3 class="case-head__title">' + c.title + "</h3>" +
          '<p class="case-head__subtitle">' + c.subtitle + "</p>" +
          '<p class="case-head__meta"><span>' + c.year + "</span><span>" + c.role + "</span></p>" +
          '<p class="case-head__summary">' + c.summary + "</p>" +
          '<ul class="case-stats">' + (c.stats || []).map(function (s) {
            return "<li><strong>" + s.value + "</strong><span>" + s.label + "</span></li>";
          }).join("") + "</ul>" +
        "</header>";
      var timeline = (c.timeline || []).length
        ? '<ol class="case-timeline">' + c.timeline.map(function (t) {
            return '<li><span class="case-timeline__date">' + t.date + "</span>" +
              "<strong>" + t.label + "</strong><p>" + t.text + "</p></li>";
          }).join("") + "</ol>"
        : "";

      function figure(img) {
        return '<figure class="case-figure"><img src="' + img.src + '" alt="' + img.alt + '" loading="lazy" /><figcaption>' + img.caption + "</figcaption></figure>";
      }

      var flow = '<div class="case-flow">';
      (c.sections || []).forEach(function (s, i) {
        flow += '<section class="case-section"><h4>' + s.label + "</h4><p>" + s.text + "</p></section>";
        var group = (c.images || []).filter(function (img) { return img.after === i; });
        if (group.length) {
          flow += '<div class="case-flow-images' +
            (c.gallery === "single" ? " case-flow-images--single" : "") +
            (group.length === 1 && c.gallery !== "single" ? " case-flow-images--one" : "") +
            '">' + group.map(figure).join("") + "</div>";
        }
      });
      var rest = (c.images || []).filter(function (img) { return typeof img.after !== "number"; });
      if (rest.length) {
        flow += '<div class="case-flow-images' + (c.gallery === "single" ? " case-flow-images--single" : "") + '">' +
          rest.map(figure).join("") + "</div>";
      }
      flow += "</div>";

      var caseLinks = [];
      if (c.link) caseLinks.push('<a class="case-link" href="' + c.link.url + '" target="_blank" rel="noopener">' + c.link.label + ' <span aria-hidden="true">↗</span></a>');
      if (c.deck) caseLinks.push('<a class="case-link" href="' + c.deck.url + '" target="_blank" rel="noopener">' + c.deck.label + ' <span aria-hidden="true">↗</span></a>');
      var links = caseLinks.length ? '<div class="case-links">' + caseLinks.join("") + "</div>" : "";
      body.innerHTML = head + timeline + flow + links;
    }

    function openCase(i) {
      var c = CASES[i];
      if (!c) return;
      lastFocus = document.activeElement;
      clearTimeout(closeTimer);
      renderCase(c);
      if (label) label.textContent = "Case file · " + c.year;
      isOpen = true;
      modal.hidden = false;
      document.body.classList.add("is-locked");
      window.requestAnimationFrame(function () { modal.classList.add("is-open"); });
      var panel = $(".lyrics-modal__panel", modal);
      if (panel) panel.scrollTop = 0;
      var closeBtn = $(".lightbox__close", modal);
      if (closeBtn) closeBtn.focus({ preventScroll: true });
    }

    function closeCase() {
      if (!modal || modal.hidden) return;
      isOpen = false;
      modal.classList.remove("is-open");
      document.body.classList.remove("is-locked");
      clearTimeout(closeTimer);
      closeTimer = setTimeout(function () {
        if (isOpen) return;
        modal.hidden = true;
        if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
      }, 400);
    }

    grid.addEventListener("click", function (e) {
      var card = e.target.closest(".case-card");
      if (card) openCase(Number(card.getAttribute("data-case-index")));
    });
    grid.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var card = e.target.closest(".case-card");
      if (!card) return;
      e.preventDefault();
      openCase(Number(card.getAttribute("data-case-index")));
    });
    $$("[data-case-close]", modal).forEach(function (el) {
      el.addEventListener("click", closeCase);
    });
    document.addEventListener("keydown", function (e) {
      if (modal.hidden) return;
      if (e.key === "Escape") closeCase();
    });
  }

  function initGallery() {
    var grid = $("#galleryGrid");
    var lightbox = $("#lightbox");
    if (!grid || !lightbox) return;

    var EXTENSIONS = ["jpg", "jpeg", "png", "webp", "JPG", "JPEG", "PNG", "WEBP"];
    var items = [];
    var images = [];
    var current = 0;
    var lastFocus = null;

    function buildItem(photo, i) {
      var fig = document.createElement("figure");
      fig.className = "gallery__item";
      fig.setAttribute("data-reveal", "");
      fig.style.setProperty("--reveal-delay", (i % 2) * 90 + "ms");
      fig.setAttribute("tabindex", "0");
      fig.setAttribute("role", "button");
      fig.setAttribute("aria-label", "View photo: " + (photo.caption || "Photo " + (i + 1)));

      var img = document.createElement("img");
      img.alt = photo.alt || photo.caption || "SANYI SUN photo " + (i + 1);
      img.loading = "lazy";
      img.decoding = "async";

      // Try the configured file, then common extensions with the same stem.
      var original = photo.file || "image/photo-" + pad2(i + 1) + ".jpg";
      var stem = original.replace(/\.[^./]+$/, "");
      var sources = [original];
      EXTENSIONS.forEach(function (ext) {
        var candidate = stem + "." + ext;
        if (sources.indexOf(candidate) === -1) sources.push(candidate);
      });
      var attempt = 0;
      img.addEventListener("error", function () {
        attempt += 1;
        if (attempt < sources.length) {
          img.src = sources[attempt];
        } else {
          img.classList.add("is-missing");
          fig.classList.add("is-fallback");
        }
      });
      img.src = sources[0];

      var media = document.createElement("div");
      media.className = "gallery__media";

      var caption = document.createElement("figcaption");
      caption.className = "gallery__caption";
      caption.innerHTML =
        '<span class="gallery__caption-main">' +
          '<span class="gallery__caption-en">' + (photo.caption || "") + "</span>" +
          (photo.meta ? '<span class="gallery__caption-meta">' + photo.meta + "</span>" : "") +
        "</span>" +
        '<span class="gallery__num">' + pad2(i + 1) + "</span>";

      var plus = document.createElement("span");
      plus.className = "gallery__plus";
      plus.setAttribute("aria-hidden", "true");
      plus.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>';

      media.appendChild(img);
      media.appendChild(plus);
      fig.appendChild(media);
      fig.appendChild(caption);

      function open() { openLightbox(i); }
      fig.addEventListener("click", open);
      fig.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });

      grid.appendChild(fig);
      items.push(fig);
      images.push(img);
    }

    PHOTOS.forEach(buildItem);

    /* ---- Lightbox ---- */
    var counter = $("#lightboxCounter");
    var imgEl = $("#lightboxImg");
    var captionEl = $("#lightboxCaption");

    function renderLightbox(index) {
      var photo = PHOTOS[index];
      var source = images[index] && (images[index].currentSrc || images[index].src);
      if (source && !images[index].classList.contains("is-missing")) imgEl.src = source;
      imgEl.alt = photo.alt || photo.caption || "";
      captionEl.textContent = [photo.caption, photo.meta].filter(Boolean).join(" · ");
      counter.textContent = pad2(index + 1) + " / " + pad2(PHOTOS.length);
    }

    function openLightbox(index) {
      if (!PHOTOS.length) return;
      current = (index + PHOTOS.length) % PHOTOS.length;
      lastFocus = document.activeElement;
      renderLightbox(current);
      lightbox.hidden = false;
      document.body.classList.add("is-locked");
      window.requestAnimationFrame(function () { lightbox.classList.add("is-open"); });
      var closeBtn = lightbox.querySelector(".lightbox__close");
      if (closeBtn) closeBtn.focus({ preventScroll: true });
    }

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      document.body.classList.remove("is-locked");
      setTimeout(function () {
        lightbox.hidden = true;
        imgEl.removeAttribute("src");
        if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
      }, 400);
    }

    function navigate(delta) {
      current = (current + delta + PHOTOS.length) % PHOTOS.length;
      renderLightbox(current);
    }

    $$("[data-close]", lightbox).forEach(function (el) {
      el.addEventListener("click", closeLightbox);
    });
    $("#lightboxPrev").addEventListener("click", function () { navigate(-1); });
    $("#lightboxNext").addEventListener("click", function () { navigate(1); });

    document.addEventListener("keydown", function (e) {
      if (lightbox.hidden) return;
      if (e.key === "Escape") { closeLightbox(); }
      else if (e.key === "ArrowLeft") { navigate(-1); }
      else if (e.key === "ArrowRight") { navigate(1); }
    });

    // Swipe support
    var touchStartX = null;
    lightbox.addEventListener("touchstart", function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    lightbox.addEventListener("touchend", function (e) {
      if (touchStartX === null) return;
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1);
      touchStartX = null;
    });
  }

  /* ----------------------------------------------------------------------
     Boot
     ---------------------------------------------------------------------- */
  function init() {
    applySiteText();
    initCopyEmail();
    initLoader();
    initChrome();
    initHero();
    initMusic();
    initExperience();
    initFeature();
    initBands();
    initManagement();
    initVideos();
    initCaseFiles();
    initRecognition();
    initGallery();
    initSectionSpy();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
