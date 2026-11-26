/* ==========================================================================
   Zoe Sun — Music Portfolio · Site content
   --------------------------------------------------------------------------
   Every piece of copy on the site lives in this file. Edit, save, refresh.
   Awards are intentionally empty until real ones are provided — add them
   to `awards` and the Awards & Honors block will appear automatically.
   ========================================================================== */

window.PORTFOLIO = {

  /* ---------- Basic information ---------- */
  site: {
    name: "SANYI SUN",
    artistName: "Zoe Sun",
    legalName: "SANYI SUN",
    eyebrow: "KCISEC · Kunshan, CN · Grade 12",     // small line at the top of the hero
    location: "Kunshan · China",
    email: "zoeysun0531@gmail.com",                  // direct recipient for mailto links
    emailDisplay: "zoeysun0531@gmail.com",            // shown as plain, selectable text
    tagline: "A musician learning to build the stage, not just stand on it."
  },

  /* ---------- 01 Experience (the centrepiece) ---------------------------
     period      time range
     role        your title
     roleEn      a short descriptor shown beneath the title
     org         organisation / project
     description 2–4 sentences: what you did, solved, learned
     stats       optional data points, max 4: { value, label }
     tags        keyword tags
     ---------------------------------------------------------------------- */
  experience: [
    {
      period: "2024 — 2026",
      role: "Theater Supervisor Assistant & Online Operations Intern",
      roleEn: "Front of house · Artist liaison · Digital content",
      org: "Jazz at Lincoln Center Shanghai",
      description: "I joined Jazz at Lincoln Center Shanghai in the summer of my sophomore year and stayed through senior year, returning during the venue's busiest seasons. I coordinated musicians and guests, confirmed rehearsal times and interpreted for international artists; wrote and scheduled posts for the venue's WeChat account; and prepared artist briefings and internal decks. On show days I moved between crowd control, sound, rehearsal support and audience management. It was the first time I understood, from backstage, how much invisible work holds a performance together.",
      stats: [],
      tags: ["Artist liaison", "Bilingual communication", "Theater operations", "Content & editorial"]
    },
    {
      period: "2025",
      role: "Director & Overall Designer, KC Voice 2025",
      roleEn: "Concept · Stage design · Production leadership",
      org: "KCISEC Student Council × School Arts Department",
      description: "As director, production lead and overall designer of the school's annual music showcase, I built the concept, the format — auditions through to the final — judging and audience voting, lighting and stage design, and the full crew plan. I led a six-person core team and thirty volunteers through seven weeks of preparation and one intensive rehearsal week, bringing eight performers and more than 800 audience members into the same room. It was the first time I was fully accountable for a live show.",
      stats: [
        { value: "800+", label: "Audience" },
        { value: "30", label: "Volunteers" },
        { value: "6", label: "Core team" },
        { value: "7 wks", label: "Preparation" }
      ],
      tags: ["Directing", "Stage design", "Team leadership", "Live production"]
    },
    {
      period: "2026",
      role: "Head of Sound, Lighting & Visuals, KC Voice 2026",
      roleEn: "Technical direction · Cue design · Live production",
      org: "KCISEC Student Council × School Arts Department",
      description: "After directing KC Voice 2025, I continued with the show in 2026 in a different role — head of sound, lighting and visuals. I translated the creative brief into a technical plan, built the cue sheet, coordinated the crew and ran the show from the tech desk. Handing the director's chair to the next team while owning a different part of the night taught me how an event is carried forward.",
      stats: [],
      tags: ["Technical direction", "Lighting & sound", "Cue design", "Team handover"]
    },
    {
      period: "2024 — 2026",
      role: "Head of Activities & Former Deputy Chair",
      roleEn: "Activities Committee · KCISEC Student Council",
      org: "KCISEC Student Council",
      description: "I joined student council in tenth grade, later leading the activities team and serving as deputy chair of the activities committee. I oversaw planning, staffing and delivery for major school events — turning ideas into rooms people actually walked into, with limited time and budget.",
      stats: [],
      tags: ["Team management", "Event strategy", "Campus operations"]
    },
    {
      period: "2025 — NOW",
      role: "Project Manager & HR Lead, SAD Music Healing Project",
      roleEn: "Light & music healing · Team & operations",
      org: "Kuang Yueh Seasonal Affective Disorder Project",
      description: "A campus project on seasonal affective disorder (SAD) that brings light and music together to open a conversation. As project manager and HR lead, I recruited and coordinated a cross-year team, helped shape the early concept, and moved the project from sketches to a product, a performance, a TEDx booth and a bilingual social campaign. We do not offer clinical treatment; the goal is visibility and belonging. The team is now expanding the project to other schools and off campus.",
      stats: [
        { value: "TEDx", label: "Campus advocacy" },
        { value: "NEXT", label: "Cross-school expansion" }
      ],
      tags: ["Team & hiring", "Project management", "Social impact", "Music & wellbeing"]
    },
    {
      period: "2026",
      role: "Writer & Producer, Starry Heart",
      roleEn: "Words, music and performance",
      org: "Kunshan Charity Federation × Wenqi Home",
      description: "I wrote, produced and performed Starry Heart, a charity fundraising single for autistic young people supported by Wenqi Home, a Kunshan autism support community. I carried it from first lyric to the first live performance there, and we are planning to invite the young people to play African drums with us — moving them from being helped to being part of the stage.",
      stats: [
        { value: "1", label: "Original single" },
        { value: "LIVE", label: "First performance" }
      ],
      tags: ["Songwriting", "Charity", "Music production", "Community collaboration"]
    },
    {
      period: "2025",
      role: "Venture Lead, EcoStudent Thrift Shop",
      roleEn: "Social entrepreneurship · Solo project",
      org: "Startup UCLA Pre-College Institute",
      description: "During a one-week social entrepreneurship institute at UCLA, I built EcoStudent Thrift Shop (originally Re-Cloth) alone — from problem definition and a lean canvas to customer interviews and a final investor pitch. The venture is an on-campus thrift booth and free repair station for students aged 13–18, designed to cut textile waste and make sustainable clothing affordable. It was my first time arguing for something I cared about in the language of business.",
      stats: [
        { value: "1 week", label: "Program" },
        { value: "SOLO", label: "Concept to pitch" }
      ],
      tags: ["Social entrepreneurship", "Business pitch", "Sustainable fashion"]
    }
  ],

  /* Four working principles shown on the left of the timeline. */
  principles: [
    { key: "L", label: "Listen first", text: "Understand the work and the people before moving." },
    { key: "P", label: "Plan the unseen", text: "Run sheets, schedules and sightlines are part of the show." },
    { key: "C", label: "Connect people", text: "Bring performers, teachers, venues and audiences into one room." },
    { key: "T", label: "Tell the story", text: "Make a concert not only heard, but remembered." }
  ],

  /* Large lyric quote at the end of Experience. */
  feature: {
    label: "Starry Heart / 2026",
    quote: "I want to borrow a pair of wings —<br />to carry you gently across the silent sea.",
    credit: "Words & music · Zoe Sun",
    note: "Written for the autistic young people of Wenqi Home, a Kunshan autism support community whose I DO Heart Youth Coffee opened in 2025 to offer vocational training and a real workplace. First performed there in 2026.",
    link: "https://data.ks.gov.cn/kss/bmdt/202604/97036e12ee884fdeaa4f44453a8548a8.shtml",
    linkLabel: "About Wenqi Home"
  },

  /* ---------- Bands -----------------------------------------------------
     Draft copy based on what you told me — update roles, years and genres.
     Logos: logo/infinity.png, logo/70soul.png (transparent PNG or SVG).
     Photos: image/band-infinity.jpg, image/band-70soul.jpg.
     If `logo` is missing, the band name is shown as a typographic fallback.
     ---------------------------------------------------------------------- */
  bandsIntro: "Infinity came first — the band where I learned guitar. 70%Soul came next. Between them, I learned how to listen, how to hold a room, and how to be one voice inside a sound.",

  bands: [
    {
      name: "Infinity",
      tagline: "First band",
      period: "2023 — 2025",
      role: "Guitar",
      description: "My first band, and where I first picked up the guitar. I learned to listen across a group, keep time with other people, and play my first shows with friends.",
      logo: "",
      photo: "image/band-infinity.jpg",
      caption: "Infinity — band logo · 2023–2025",
      alt: "Infinity band logo"
    },
    {
      name: "70%Soul",
      tagline: "Second band",
      period: "2025 — 2026",
      role: "Guitar · Pop & jazz",
      description: "My second band — a new sound, a new set of people, and a further step into playing live. 70%Soul plays pop and jazz; it is where I learned that a performance is a conversation, not a solo. In 2026, 70%Soul won the school's Battle of the Bands.",
      logo: "logo/70soul.png",
      photo: "image/band-70soul.jpg",
      caption: "70%Soul live — SANYI SUN on guitar",
      alt: "Zoe Sun playing guitar with 70%Soul"
    }
  ],

  /* ---------- 02 Works · five recordings --------------------------------
     Put the MP3s in music/ as 01.mp3 … 05.mp3.
     The site also tries 1.mp3, track1.mp3, track-01.mp3 and similar names.
     ---------------------------------------------------------------------- */
  tracks: [
    {
      title: "Goodnight",
      note: "Produced & performed by Zoe Sun",
      file: "music/01.m4a",
      lyrics: {
        translationNote: "A literary English rendering: the images and the pulse of the original are kept, rather than a word-for-word translation.",
        sections: [
          {
            label: "Verse 1",
            lines: [
              "Goodnight — the liking I never said aloud.",
              "Goodnight — every night I spend beside you.",
              "Goodnight — take all my unease away.",
              "Goodnight — let my nights be lonely no more."
            ]
          },
          {
            label: "Verse 2",
            lines: [
              "Goodnight — I hope you'll be there in my dreams.",
              "Goodnight — I worry you won't get up in time.",
              "Goodnight — the stars and the moon keep you company.",
              "Goodnight — in dreams, I love everything."
            ]
          },
          {
            label: "Lullaby",
            lines: [
              "Goodnight, baby, sleep early — I want to spoil you back to the age of two or three.",
              "Goodnight, baby, don't be too tired — take care of yourself, promise me.",
              "Sleep, baby, I'll sleep too — in dreams we are always together.",
              "Sleep, baby, the night is too dark — I'll whisper a secret: I'm still not asleep."
            ]
          }
        ],
        note: "A lullaby disguised as a late-night message. Every 'goodnight' is an unspoken confession; the playful second half lets the tenderness breathe. The repetition is kept because it is the song's heartbeat."
      }
    },
    {
      title: "Kismet",
      note: "Produced & performed by Zoe Sun",
      file: "music/02.mp3",
      lyrics: {
        translationNote: "A literary English rendering: the images and the pulse of the original are kept, rather than a word-for-word translation.",
        sections: [
          {
            label: "Verse 1",
            lines: [
              "The season the leaves begin to fall,",
              "and still I cannot miss you any less.",
              "Tears keep me awake in the dead of night;",
              "how I wish tomorrow we could meet once more."
            ]
          },
          {
            label: "Verse 2",
            lines: [
              "Every time I think of where we first began,",
              "the whole world was a tangle of blossoms.",
              "That smile I wore the day we said goodbye",
              "was only there to make me look less broken."
            ]
          },
          {
            label: "Pre-Chorus",
            lines: [
              "I keep hoping every autumn leaf",
              "will carry your lingering tenderness up from the south."
            ]
          },
          {
            label: "Chorus",
            lines: [
              "Hold my hand a little tighter.",
              "Believe there will be an after.",
              "We will not fall like autumn leaves."
            ]
          },
          {
            label: "Verse 3",
            lines: [
              "We once walked this street hand in hand.",
              "If only we could begin again.",
              "A leaf settles slowly on my left shoulder.",
              "Now I begin to understand — you never left."
            ]
          },
          {
            label: "Bridge",
            lines: [
              "Please don't be too sad.",
              "Don't let the wind blow away the little romance we have left.",
              "If meeting again were simpler,",
              "I am still not brave enough.",
              "Would holding on be too much to bear?"
            ]
          },
          {
            label: "Outro",
            lines: [
              "I wish you had never known those hardships,",
              "so you could learn that love does not have to wait.",
              "From now on, no one will turn and leave",
              "if only you are willing to look back."
            ]
          },
          {
            label: "Coda",
            lines: [
              "If we lose touch,",
              "would you wait for me — a long, long time?",
              "Until the weather turns warm,",
              "wave your hand, forget yesterday, and all of its sorrow."
            ]
          }
        ],
        note: "Kismet means fate. The song is set in the season a relationship begins to come apart, and it answers fate with a request: hold on. Autumn leaves are both the clock and the promise — everything is falling, and still the singer asks to be held."
      }
    },
    { title: "Untitled", note: "Third recording — to be added", file: "music/03.mp3", hidden: true },
    { title: "Untitled", note: "Fourth recording — to be added", file: "music/04.mp3", hidden: true },
    { title: "Untitled", note: "Fifth recording — to be added", file: "music/05.mp3", hidden: true }
  ],

  /* ---------- 02 Works · three performance films ------------------------
     Local files: video/01.mp4 … 03.mp4.
     For YouTube or Bilibili, fill `embed` instead of `src`.
     `poster` reuses the photos by default.
     ---------------------------------------------------------------------- */
  videos: [
    {
      title: "70%Soul — Battle of the Bands",
      note: "Guitar · 2026 champions · Excerpt 2:32–4:11",
      src: "video/01.mp4",
      poster: "image/band-70soul.jpg",
      embed: ""
    },
    {
      title: "Starry Heart — Live",
      note: "Voice & piano · Wenqi Home",
      src: "video/02.mp4",
      poster: "image/photo-05.jpg",
      embed: ""
    },
    {
      title: "Jazz at Lincoln Center — Internship",
      note: "Theater operations · Artist liaison",
      detail: "The opening performance is by the Shanghai Lincoln Jazz Big Band — \"Seasons of Love\".",
      src: "video/03.mp4",
      poster: "image/video-lincoln.jpg",
      embed: ""
    }
  ],

  /* ---------- 02 Works · Music × Management ----------------------------- */
  management: {
    statement: "I don’t just play the night.<br />I <em>build</em> it.",
    statementSub: "Performance, production, and the people behind both.",
    paragraphs: [
      "Two years at Jazz at Lincoln Center Shanghai placed me between artists, audiences and the stage: confirming rehearsals, welcoming international musicians, interpreting, writing for the venue's WeChat, and watching the desk and the sound during shows. Backstage taught me the first rule — a performance is held together by details no one sees.",
      "Later, as director of KC Voice, I led a six-person core team and thirty volunteers through seven weeks to bring eight performers and more than 800 people into one night. I returned for KC Voice 2026 as head of sound, lighting and visuals, handing the director's chair to the next team. Then came the SAD Music Healing Project, the charity single, and a business pitch at Startup UCLA. I am increasingly sure: I want to be the person who makes music happen."
    ],
    closing: ["music management", "arts administration", "concert programming"],
    pillars: [
      {
        title: "Artist liaison",
        titleEn: "People first",
        text: "At Jazz at Lincoln Center Shanghai I welcomed musicians and guests from different countries, confirmed schedules in two languages, and learned what artists actually need."
      },
      {
        title: "Production",
        titleEn: "Make it real",
        text: "From KC Voice's lighting and sound design to thirty volunteers, I break a live show into a list and land it item by item."
      },
      {
        title: "Content & audience",
        titleEn: "Bring people in",
        text: "Writing, social media and campus promotion taught me how to use words and images to invite an audience."
      },
      {
        title: "Social impact",
        titleEn: "Leave room",
        text: "The SAD Music Healing Project and the charity single made me believe music management can leave room for people on the margins."
      }
    ]
  },

  /* ---------- Case files ------------------------------------------------ */
  caseFiles: [
    {
      eyebrow: "Case file 01 · Production",
      title: "KC Voice 2025",
      subtitle: "Directing a night for 800 people",
      year: "2025",
      role: "Director & Overall Designer",
      summary: "A school music showcase rebuilt as a full production — auditions, judging, lighting, staging and a thirty-person volunteer crew — with more than 800 people in the room.",
      cover: "image/photo-02.jpg",
      coverAlt: "The KC Voice 2025 company on stage after the final",
      stats: [
        { value: "800+", label: "Audience" },
        { value: "30", label: "Volunteers" },
        { value: "6", label: "Core team" },
        { value: "7", label: "Weeks of preparation" }
      ],
      timeline: [
        { date: "October", label: "Auditions open", text: "Concept, format and recruitment." },
        { date: "Seven weeks", label: "Build & rehearse", text: "Programming, promotion and thirty volunteers." },
        { date: "Production week", label: "Cue sheet & stage", text: "Lighting, sound, stage plan and run of show." },
        { date: "Show night", label: "800+ in the room", text: "Eight performers, judging and an audience vote." }
      ],
      sections: [
        { label: "The brief", text: "KC Voice is the school's annual music showcase and singing competition. The 2025 edition needed a concept, a format and a stage that could hold eight performers and a large live audience — built by a student team, on a limited budget, on a fixed date." },
        { label: "My role", text: "I was director, production lead and overall designer: the concept and theme, the audition-to-final format, judging and audience voting, lighting and stage design, the crew plan and the run of show. On the night I ran the show from the desk." },
        { label: "How it happened", text: "We opened auditions in October, built a six-person core team and recruited thirty volunteers, then spent seven weeks on programming, promotion and rehearsal before a final production week. I coordinated the cue sheet, stage plan, volunteer assignments and the handovers between performances; the opening slide, poster and visual language came out of the same design system." },
        { label: "What came out of it", text: "More than 800 people filled the room, and the show became a repeatable model the next team could inherit. In 2026 I returned as head of sound, lighting and visuals, handing the director's chair on." },
        { label: "What I learned", text: "A live show is held together by details no one sees, and by people who know exactly what they are responsible for. Clarity is a form of care under pressure." }
      ],
      images: [
        { src: "image/photo-01.jpg", after: 3, caption: "Opening night — the KC Voice 2025 company on stage.", alt: "KC Voice 2025 performers on stage under blue light" },
        { src: "image/case-kcvoice-slide.jpg", after: 2, caption: "The opening slide: 'Now Is Forever', the 2025 theme.", alt: "The opening slide of KC Voice 2025 with the theme Now Is Forever" }
      ]
    },
    {
      eyebrow: "Case file 02 · Social entrepreneurship",
      title: "EcoStudent Thrift Shop",
      subtitle: "A campus thrift booth, taken from problem to pitch in one week",
      year: "2025",
      role: "Venture Lead (solo)",
      summary: "An on-campus thrift booth and free repair station for students aged 13–18, developed from a social problem into a twelve-slide pitch at Startup UCLA.",
      cover: "image/case-eco-cover.jpg",
      coverFit: "contain",
      coverAlt: "EcoStudent Thrift Shop pitch cover — On-Campus Thrift + Free Repair for Teens",
      stats: [
        { value: "17M", label: "Tons of textile waste a year" },
        { value: "11.3M", label: "Tons landfilled last year" },
        { value: "1", label: "Week to build the venture" },
        { value: "Solo", label: "Founder and presenter" }
      ],
      timeline: [
        { date: "Day 01", label: "Problem", text: "Textile waste and the cost of clothing." },
        { date: "Day 02", label: "Research", text: "Customer interviews and the hidden barrier." },
        { date: "Day 03", label: "Model", text: "Lean canvas, economics and MVP." },
        { date: "Day 05", label: "Pitch", text: "Twelve slides, five minutes." }
      ],
      sections: [
        { label: "The brief", text: "Startup UCLA's Social Entrepreneurship Institute asked each student to identify a social problem, test it, build a lean canvas and pitch a venture. I worked alone. The idea began as Re-Cloth and became EcoStudent Thrift Shop." },
        { label: "My role", text: "I was the researcher, designer and presenter: problem definition, customer research, lean canvas, business model, MVP concept, visual deck and the final pitch." },
        { label: "How it happened", text: "I focused on the overlap between textile waste and the cost of sustainable clothing for teenagers. Customer research surfaced a barrier I had not expected: embarrassment about wearing second-hand clothes. That changed the design — the booth had to feel like a normal, judgment-free part of school, not a charity bin. I prototyped a weekly booth with a free repair station, kept the offer narrow, and built the economics around donations and low prices." },
        { label: "What came out of it", text: "A twelve-slide deck, a five-minute pitch and a pilot model a school could actually run. The strongest slide was not the market size — it was the customer insight that named the hidden barrier." },
        { label: "What I learned", text: "Business language can serve a social mission. Constraints — one week, one person — force the idea to become clear." }
      ],
      images: [
        { src: "image/case-eco-problem.jpg", after: 0, caption: "Pitching the problem: 17M tons of textile waste a year, only 14.7% recycled.", alt: "EcoStudent pitch slide titled The Problem" },
        { src: "image/case-eco-why.jpg", after: 3, caption: "Why We Win: on-campus, permanent, judgment-free.", alt: "EcoStudent pitch slide titled Why We Win" }
      ],
      link: { label: "Watch the 90-second pitch", url: "document/eco-student-pitch-90.mp4" },
      deck: { label: "Read the full deck (PDF)", url: "document/eco-student-pitch.pdf" }
    },
    {
      eyebrow: "Case file 03 · Social impact",
      title: "SAD Music Healing Project",
      subtitle: "Light and music for the winter mind",
      year: "2025 — now",
      role: "Project Manager & HR Lead",
      summary: "A student-led response to seasonal affective disorder, combining light and music with a public campaign, a TEDx booth and a product in development.",
      cover: "image/case-sad-logo.jpg",
      coverFit: "contain",
      coverAlt: "The SAD Music Healing Project logo",
      stats: [
        { value: "TEDx", label: "Campus booth" },
        { value: "Cross-year", label: "Team" },
        { value: "Light + music", label: "Core concept" },
        { value: "In progress", label: "Product and installation" }
      ],
      timeline: [
        { date: "2025", label: "Concept", text: "A classmate's light-and-music idea." },
        { date: "2025 — 26", label: "Team", text: "Recruitment, roles and schedule." },
        { date: "2026", label: "Prototype", text: "ESP32, warm light and a speaker." },
        { date: "2026", label: "Public", text: "TEDx booth and bilingual campaign." },
        { date: "Next", label: "Scale", text: "Product, installation and other schools." }
      ],
      sections: [
        { label: "The brief", text: "Seasonal affective disorder is a recurring pattern of depression that often arrives in autumn and winter. A classmate initiated a project to respond with light and music; I joined to build the team and the operating structure." },
        { label: "My role", text: "Project manager and HR lead: recruitment, role design, scheduling, team communication and the operating rhythm. I also contributed to the early concept and helped move the project from sketches to a product, a performance and a public campaign." },
        { label: "How it happened", text: "We mapped the work into design, music, research, communications and production, recruited across year groups, and built a schedule. The first prototype combined an ESP32, a warm-light LED and a small speaker; the team moved from shell sketches to circuit tests, audio code and a working light-and-sound unit. The team also ran a TEDx booth and a bilingual social campaign so more students would recognise the symptoms. We do not offer clinical treatment; the project is about visibility, language and belonging." },
        { label: "The online campaign", text: "The project went online as a bilingual Xiaohongshu carousel: what SAD is, how it can show up, and when a seasonal dip is not a diagnosis. The post carried the project's language beyond campus; the published version reached 103 likes and 3 comments at the time of capture." },
        { label: "What came out of it", text: "A working team, a public conversation, and a product and installation plus a research and process journal in development. The project is expanding to other schools and off campus." },
        { label: "What I learned", text: "When the subject is mental health, the way you speak about it is part of the design. Clear roles and gentle language matter as much as the product." }
      ],
      images: [
        { src: "image/case-sad-lamp.jpg", after: 0, caption: "The shell-shaped lamp concept: warm light, a music module and a form you can hold.", alt: "Lamp concept sketch for the SAD project" },
        { src: "image/case-sad-lamp-v2.jpg", after: 2, caption: "Refined lamp concept — the shell opens into a warm pool of light, with a music player and a control dial.", alt: "Refined lamp concept sketch with usage and design notes" },
        { src: "image/case-sad-cad.jpg", after: 2, caption: "CAD study — the shell, the light chamber and the handle, with dimensions.", alt: "CAD render of the SAD lamp with dimensions" },
        { src: "image/case-sad-circuit.jpg", after: 2, caption: "Prototype session — light, audio and control components on the desk.", alt: "SAD project electronics prototype on a desk" },
        { src: "image/case-sad-audio.jpg", after: 2, caption: "Breadboard test — the audio module and speaker before the final build.", alt: "Breadboard with audio module and speaker" },
        { src: "image/case-sad-code.jpg", after: 2, caption: "Firmware in progress — the ESP32 audio test and serial monitor.", alt: "ESP32 audio test code and serial monitor" },
        { src: "image/case-sad-board.jpg", after: 2, caption: "The ESP32 board running the first light-and-sound test.", alt: "ESP32 board powered on a breadboard" },
        { src: "image/case-sad-logo.jpg", caption: "The project identity: Light & Music Healing Project for SAD.", alt: "The SAD Music Healing Project logo" },
        { src: "image/case-sad-social-post.jpg", caption: "The first online post — a bilingual guide to recognising SAD.", alt: "SAD online campaign post explaining the signs of seasonal affective disorder" },
        { src: "image/case-sad-social-published.jpg", caption: "The post as published on Xiaohongshu — 103 likes and 3 comments at the time of capture.", alt: "Published Xiaohongshu post for the SAD project with likes and comments" }
      ]
    },
    {
      eyebrow: "Case file 04 · Operations",
      title: "Student Council Operations",
      subtitle: "Running the school year, one event at a time",
      year: "2024 — 2026",
      role: "Head of Activities & Former Deputy Chair",
      summary: "Planning, staffing and delivering the school's signature events — including a 2026 Teacher's Day campaign and a school-wide volleyball tournament.",
      gallery: "single",
      cover: "image/case-sc-group.jpg",
      coverAlt: "The 2025–26 KCISEC student council on the school staircase",
      stats: [
        { value: "800", label: "Cards prepared" },
        { value: "2", label: "Dining-hall collection points" },
        { value: "3v3", label: "Tournament format" },
        { value: "G10–G12", label: "Divisions" }
      ],
      timeline: [
        { date: "2024", label: "Deputy chair", text: "Activities committee and event delivery." },
        { date: "2025", label: "Head of activities", text: "Leading the activities group." },
        { date: "April 2026", label: "Volleyball", text: "Two venues, Grades 10–12, 3v3." },
        { date: "September 2026", label: "Teacher's Day", text: "800 cards, collection and delivery." }
      ],
      sections: [
        { label: "The brief", text: "The activities team of the student council is responsible for the school's major student events, from concept and budget to staffing and delivery." },
        { label: "My role", text: "I led the activities group and served as deputy chair of the activities committee: planning, role assignment, volunteer coordination and on-the-day operations." },
        { label: "How it happened", text: "For Teacher's Day 2026 we designed a handwritten-card campaign: 800 cards, collection points at both dining halls, a sorting and delivery system by department and campus building, and a team briefed to deliver every card on the day. For the 2026 class volleyball tournament we built a two-venue schedule across Grades 10–12, with 3v3 teams, volunteer training, court assignments and a finals plan. Both required the same skill: turning a big idea into a staffing chart and a timeline." },
        { label: "What came out of it", text: "Reusable operating documents — schedules, staffing tables, scripts and delivery plans — that the next council could inherit." },
        { label: "What I learned", text: "Logistics is empathy at scale. A good event is one where the people running it know what to do next." }
      ],
      images: [
        { src: "image/case-sc-group.jpg", after: 1, caption: "The 2025–26 student council — activities and leadership team.", alt: "The student council group photograph on the school staircase" },
        { src: "image/case-sc-teachers-flow.jpg", after: 3, caption: "Teacher's Day plan — card collection, sorting by department and delivery.", alt: "Teacher's Day plan page describing card collection and delivery" },
        { src: "image/case-sc-teachers-delivery.jpg", after: 3, caption: "Teacher's Day plan — delivery script, staffing zones and the 10 September deadline.", alt: "Teacher's Day plan page with delivery script and staffing table" },
        { src: "image/case-sc-volleyball-venues.jpg", after: 2, caption: "Volleyball plan — divisions, venues and volunteer training dates.", alt: "Volleyball plan page with dates, venues and divisions" },
        { src: "image/case-sc-volleyball-schedule.jpg", after: 2, caption: "Volleyball plan — the full match schedule across two venues.", alt: "Volleyball match schedule table" }
      ]
    }
  ],

  /* ---------- 03 Academics · overview ----------------------------------- */
  academicFacts: [
    { label: "School", value: "KCISEC — Kang Chiao International School East China" },
    { label: "Grade", value: "Grade 12 · Class of 2027" },
    { label: "Focus", value: "Music & Arts Management" },
    { label: "Languages", value: "Mandarin · English · Korean" }
  ],

  /* ---------- 03 Academics · selected outcomes -------------------------- */
  outcomes: [
    {
      year: "2025",
      title: "KC Voice 2025",
      titleEn: "Director & Overall Designer",
      issuer: "KCISEC Student Council × School Arts Department",
      note: "800+ audience · 30 volunteers"
    },
    {
      year: "2026",
      title: "KC Voice 2026",
      titleEn: "Head of Sound, Lighting & Visuals",
      issuer: "KCISEC Student Council × School Arts Department",
      note: "Technical direction · Live production"
    },
    {
      year: "2024 — 2026",
      title: "Jazz at Lincoln Center Shanghai",
      titleEn: "Theater Operations & Digital Content",
      issuer: "Jazz at Lincoln Center Shanghai",
      note: "Artist liaison · Bilingual"
    },
    {
      year: "2025",
      title: "EcoStudent Thrift Shop",
      titleEn: "Startup UCLA Social Entrepreneurship Institute",
      issuer: "UCLA Pre-College Institute",
      note: "Solo venture · Final pitch"
    },
    {
      year: "2025 — NOW",
      title: "SAD Music Healing Project",
      titleEn: "Project Manager & HR Lead",
      issuer: "TEDx KCISEC",
      note: "Cross-school expansion"
    },
    {
      year: "2026",
      title: "Starry Heart",
      titleEn: "Writer, Producer & Performer",
      issuer: "Kunshan Charity Federation × Wenqi Home",
      note: "Independent release"
    }
  ],

  /* ---------- 03 Academics · awards (waiting for real data) -------------
     Format:
       { year: "2026", title: "Award name", titleEn: "Award name",
         issuer: "Issuing body", note: "Category / note" }
     Once this array is not empty, the Awards & Honors block appears and the
     section numbering re-orders automatically.
     ---------------------------------------------------------------------- */
  awards: [
    {
      year: "2026",
      title: "AP Scholar with Honor Award",
      titleEn: "AP Program",
      issuer: "College Board",
      note: "Average 3.25+ across AP Exams · four or more exams with a score of 3+"
    }
  ],

  /* ---------- 03 Academics · programs & certificates --------------------
     Optional `file`: put a scan in certificate/ and reference it here,
     e.g. file: "certificate/certificate-01.jpg". The card becomes clickable.
     ---------------------------------------------------------------------- */
  certificates: [
    {
      title: "AP Scholar with Honor Award",
      titleEn: "College Board — AP Program",
      issuer: "College Board",
      year: "2026",
      file: "certificate/ap-scholar-honor.png",
      image: "certificate/ap-scholar-honor.png",
      imageAlt: "AP Scholar with Honor Award certificate issued to Sanyi Sun, June 24, 2026"
    },
  ],

  /* ---------- 03 Academics · three recognition cards -------------------- */
  recognitions: [
    {
      label: "Language",
      title: "TOPIK I — Level 2",
      subtitle: "Test of Proficiency in Korean",
      issuer: "National Institute for International Education",
      year: "2024",
      score: "169 / 200",
      note: "Listening 97 · Reading 72 · Valid to 27 November 2026",
      image: "certificate/topik.png",
      file: "certificate/topik.pdf",
      imageAlt: "TOPIK I Level 2 official score report for Sun Sanyi, 169 out of 200"
    },
    {
      label: "Finance",
      title: "SIC Regional Bronze Award",
      subtitle: "Best Stock Analysis Report Team — Season 12",
      issuer: "SIC · ACME / CEE",
      year: "2025",
      score: "",
      note: "Regional Level · Junior / Senior Division",
      image: "certificate/sic-bronze.png",
      file: "certificate/sic-bronze.pdf",
      imageAlt: "SIC Season 12 Regional Best Stock Analysis Report Team Bronze Award certificate for Sanyi Sun"
    },
    {
      label: "Advanced Placement",
      title: "AP Scholar with Honor Award",
      subtitle: "AP Program — College Board",
      issuer: "College Board",
      year: "2026",
      score: "",
      note: "Average 3.25+ across AP Exams · four or more exams with a score of 3+",
      image: "certificate/ap-scholar-honor.png",
      file: "certificate/ap-scholar-honor.png",
      imageAlt: "AP Scholar with Honor Award certificate issued to Sanyi Sun, June 24, 2026"
    }
  ],

  /* ---------- Experience gallery · five photos --------------------------
     Put the photos in image/ as photo-01.jpg … photo-05.jpg.
     ---------------------------------------------------------------------- */
  photos: [
    {
      file: "image/photo-01.jpg",
      caption: "KC Voice 2025 — opening night",
      meta: "Direction · Live production",
      alt: "Zoe Sun and the company on stage during the KC Voice 2025 opening performance"
    },
    {
      file: "image/photo-02.jpg",
      caption: "KC Voice 2025 — the full company",
      meta: "Student Council × Arts Department",
      alt: "The KC Voice 2025 cast and crew group photograph"
    },
    {
      file: "image/photo-03.jpg",
      caption: "KC Voice 2026 — running the tech desk",
      meta: "Sound, light & visuals",
      alt: "The sound and lighting desk at KC Voice 2026, overlooking the stage"
    },
    {
      file: "image/photo-04.jpg",
      caption: "Jazz at Lincoln Center Shanghai — with Joyce",
      meta: "Theater operations · Artist liaison",
      alt: "Zoe Sun with Joyce at Jazz at Lincoln Center Shanghai"
    },
    {
      file: "image/photo-05.jpg",
      caption: "Starry Heart — live at Wenqi Home",
      meta: "Charity single · Voice & piano",
      alt: "Zoe Sun performing Starry Heart at Wenqi Home"
    }
  ]
};
