/* Speak21 — 21-day English challenge (10 min read · 10 min write · 10 min speak).
 * No build step, no backend: profile + progress live in localStorage,
 * speaking videos in IndexedDB on the device. See docs/PLAN.md for the
 * roadmap to real cloud accounts. */
(() => {
  "use strict";

  const DAYS = window.CHALLENGE;
  const TOTAL = DAYS.length;
  const TASK_SECONDS = 10 * 60;
  const MAX_RECORD_SECONDS = 180;
  const STORE_KEY = "speak21";
  const TASKS = {
    read: { label: "Read", icon: "📖", cls: "c-read", hint: "Read aloud, learn 5 words" },
    write: { label: "Write", icon: "✍️", cls: "c-write", hint: "Write about today's topic" },
    speak: { label: "Speak", icon: "🎥", cls: "c-speak", hint: "Record, then review 4 ways" },
  };

  const app = document.getElementById("app");

  // ---------- storage ----------
  const load = () => {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || { user: null, days: {} }; }
    catch { return { user: null, days: {} }; }
  };
  let state = load();
  const save = () => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
    catch { toast("Could not save progress on this device"); }
  };
  const dayState = (n) => (state.days[n] ||= { read: false, write: false, speak: false });

  const db = (() => {
    let p;
    const open = () => (p ||= new Promise((res, rej) => {
      const req = indexedDB.open("speak21", 1);
      req.onupgradeneeded = () => req.result.createObjectStore("videos");
      req.onsuccess = () => res(req.result);
      req.onerror = () => rej(req.error);
    }));
    const tx = (mode, fn) => open().then((d) => new Promise((res, rej) => {
      const t = d.transaction("videos", mode);
      const r = fn(t.objectStore("videos"));
      t.oncomplete = () => res(r && r.result);
      t.onerror = () => rej(t.error);
    }));
    return {
      put: (key, blob) => tx("readwrite", (s) => s.put(blob, key)),
      get: (key) => tx("readonly", (s) => s.get(key)),
      clear: () => tx("readwrite", (s) => s.clear()),
    };
  })();

  // ---------- helpers ----------
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const localDate = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  const isDone = (n) => { const d = state.days[n]; return !!(d && d.read && d.write && d.speak); };
  const countWords = (t) => (t.trim().match(/\S+/g) || []).length;
  const go = (hash) => { location.hash = hash; };

  function toast(msg) {
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2600);
  }

  // The challenge is one day per calendar day: day N+1 opens the day after
  // day N is finished. Missing a day never resets progress.
  function currentDay() {
    for (let n = 1; n <= TOTAL; n++) if (!isDone(n)) return n;
    return TOTAL + 1;
  }
  function isUnlocked(n) {
    if (n === 1) return true;
    if (!isDone(n - 1)) return false;
    return state.days[n - 1].completedOn < localDate();
  }
  function streak() {
    const dates = new Set(Object.values(state.days).map((d) => d.completedOn).filter(Boolean));
    const d = new Date();
    if (!dates.has(localDate(d))) d.setDate(d.getDate() - 1);
    let s = 0;
    while (dates.has(localDate(d))) { s++; d.setDate(d.getDate() - 1); }
    return s;
  }
  function completeTask(n, task) {
    const ds = dayState(n);
    ds[task] = true;
    if (ds.read && ds.write && ds.speak && !ds.completedOn) ds.completedOn = localDate();
    save();
  }

  // ---------- timer ----------
  let renderId = 0; // bumps on every navigation so stale async callbacks can bail out
  let activeTimer = null;
  function stopActiveTimer() { if (activeTimer) { clearInterval(activeTimer.id); activeTimer = null; } }

  function mountTimer(root) {
    const timeEl = root.querySelector(".time");
    const btn = root.querySelector("button");
    const bar = root.querySelector(".bar > i");
    let left = TASK_SECONDS;
    const paint = () => {
      timeEl.textContent = fmt(left);
      bar.style.width = `${((TASK_SECONDS - left) / TASK_SECONDS) * 100}%`;
    };
    btn.onclick = () => {
      if (activeTimer) { stopActiveTimer(); btn.textContent = "Resume"; return; }
      if (left <= 0) left = TASK_SECONDS;
      btn.textContent = "Pause";
      activeTimer = {
        id: setInterval(() => {
          left--;
          paint();
          if (left <= 0) {
            stopActiveTimer();
            btn.textContent = "Restart";
            if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
            toast("10 minutes done — great work!");
          }
        }, 1000),
      };
    };
    paint();
  }
  const timerHTML = () => `
    <div class="card timer">
      <div style="flex:1"><div class="time">10:00</div><div class="bar"><i></i></div></div>
      <button type="button">Start</button>
    </div>`;

  // ---------- media cleanup ----------
  let liveStream = null;
  let objectUrls = [];
  function releaseMedia() {
    if (liveStream) { liveStream.getTracks().forEach((t) => t.stop()); liveStream = null; }
    objectUrls.forEach((u) => URL.revokeObjectURL(u));
    objectUrls = [];
  }
  const blobUrl = (b) => { const u = URL.createObjectURL(b); objectUrls.push(u); return u; };

  // ---------- views ----------
  function viewSignup() {
    app.innerHTML = `
      <div class="center" style="padding:24px 0 8px">
        <div class="big-emoji">🗣️</div>
        <h1>Speak21</h1>
        <p class="muted">The free 21-day English challenge.<br>30 minutes a day: <b>10 read · 10 write · 10 speak</b>.</p>
      </div>
      <form class="card stack" id="signup" novalidate>
        <div><label for="name">Your name</label><input id="name" required autocomplete="given-name" placeholder="e.g. Ayesha"></div>
        <div><label for="email">Email <span class="muted">(optional)</span></label><input id="email" type="email" autocomplete="email" placeholder="you@example.com"></div>
        <div><label for="level">Your English level</label>
          <select id="level">
            <option value="beginner">Beginner — I know basic words</option>
            <option value="intermediate" selected>Intermediate — I understand but struggle to speak</option>
            <option value="advanced">Advanced — I want more fluency</option>
          </select></div>
        <div><label for="goal">Why do you want to improve?</label>
          <select id="goal">
            <option>Job / interviews</option><option>Study abroad</option><option>Travel</option>
            <option>Confidence in daily life</option><option>Exams (IELTS / TOEFL)</option>
          </select></div>
        <button type="submit">Start my 21 days — free</button>
        <p class="muted small center" style="margin:0">Your progress and videos stay on this phone.</p>
      </form>
      <div class="card">
        <h3>How it works</h3>
        <p class="small muted">📖 <b>Read</b> a short passage aloud and learn 5 words.<br>
        ✍️ <b>Write</b> about the day's topic for 10 minutes.<br>
        🎥 <b>Speak</b>: record a short video, then review it 4 ways — sound off, sound only, full video, and reflect.<br>
        🏁 On Day 21, watch your first and last videos side by side.</p>
      </div>`;
    app.querySelector("#signup").onsubmit = (e) => {
      e.preventDefault();
      const name = app.querySelector("#name").value.trim();
      if (!name) { app.querySelector("#name").focus(); toast("Please enter your name"); return; }
      state.user = {
        name,
        email: app.querySelector("#email").value.trim(),
        level: app.querySelector("#level").value,
        goal: app.querySelector("#goal").value,
        joinedOn: localDate(),
      };
      save();
      go("#/");
      render();
    };
  }

  function viewHome() {
    const cur = currentDay();
    const doneCount = Object.keys(state.days).filter((n) => isDone(+n)).length;
    const cells = DAYS.map((_, i) => {
      const n = i + 1, ds = state.days[n];
      const cls = isDone(n) ? "done" : ds && (ds.read || ds.write || ds.speak) ? "partial" : "";
      return `<div class="cell ${cls} ${n === cur ? "today" : ""}" aria-label="Day ${n}${isDone(n) ? " complete" : ""}">${n}</div>`;
    }).join("");

    let todayBlock;
    if (cur > TOTAL) {
      todayBlock = `<div class="card center"><div class="big-emoji">🏆</div><h2>You finished all 21 days!</h2>
        <p class="muted">Watch how far you have come.</p><button data-go="#/finish">See Day 1 vs Day 21</button></div>`;
    } else if (!isUnlocked(cur)) {
      todayBlock = `<div class="card center"><div class="big-emoji">🌙</div><h2>Day ${cur - 1} complete!</h2>
        <p class="muted">Day ${cur} opens tomorrow. Rest is part of learning — your brain is saving today's English while you sleep.</p></div>`;
    } else {
      const day = DAYS[cur - 1], ds = dayState(cur);
      todayBlock = `
        <h2 style="margin-top:20px">Day ${cur}: ${esc(day.theme)}</h2>
        <p class="muted small">Do all three to complete the day. About 30 minutes.</p>
        ${Object.entries(TASKS).map(([k, t]) => `
          <button class="task" data-go="#/day/${cur}/${k}">
            <span class="dot ${t.cls}" aria-hidden="true">${t.icon}</span>
            <span class="meta"><b>${t.label} · 10 min</b><span>${t.hint}</span></span>
            <span class="check" aria-label="${ds[k] ? "done" : "not done"}">${ds[k] ? "✓" : "›"}</span>
          </button>`).join("")}`;
    }

    app.innerHTML = `
      <div class="topbar"><span class="logo">Speak21</span><button class="ghost" data-go="#/settings">Settings</button></div>
      <div class="card hero">
        <p class="muted" style="margin:0">Hi ${esc(state.user.name)} 👋</p>
        <h1 style="margin:4px 0 0">${cur > TOTAL ? "Challenge complete" : `Day ${Math.min(cur, TOTAL)} of ${TOTAL}`}</h1>
        <div class="stats">
          <div class="stat"><b>${doneCount}</b><span>days done</span></div>
          <div class="stat"><b>${streak()}🔥</b><span>day streak</span></div>
          <div class="stat"><b>${doneCount * 30}</b><span>minutes</span></div>
        </div>
      </div>
      <div class="card"><div class="grid21">${cells}</div></div>
      ${todayBlock}`;
  }

  function header(n, task) {
    const t = TASKS[task];
    return `<div class="topbar"><button class="ghost" data-go="#/">‹ Back</button>
      <span class="pill">Day ${n} · ${t.icon} ${t.label}</span></div>`;
  }

  function viewRead(n) {
    const day = DAYS[n - 1], ds = dayState(n);
    app.innerHTML = `
      ${header(n, "read")}
      ${timerHTML()}
      <div class="card">
        <h2>${esc(day.read.title)}</h2>
        <p class="muted small">Step 1: read silently. Step 2: read it <b>aloud</b>, slowly and clearly. Step 3: read aloud again, a little faster.</p>
        <p class="passage">${esc(day.read.text)}</p>
      </div>
      <div class="card">
        <h3>5 new words</h3>
        <dl class="vocab">${day.read.vocab.map(([w, d]) => `<dt>${esc(w)}</dt><dd>${esc(d)}</dd>`).join("")}</dl>
        <p class="small muted">Try to use 2 of these words in today's writing and speaking.</p>
      </div>
      <div class="card stack">
        <label for="answer">Check: ${esc(day.read.question)}</label>
        <input id="answer" value="${esc(ds.answer)}" placeholder="Answer in your own words">
        <button id="done">${ds.read ? "Done ✓ — back to today" : "I finished reading"}</button>
      </div>`;
    mountTimer(app.querySelector(".timer"));
    app.querySelector("#done").onclick = () => {
      ds.answer = app.querySelector("#answer").value.trim();
      completeTask(n, "read");
      afterTask(n);
    };
  }

  function viewWrite(n) {
    const day = DAYS[n - 1], ds = dayState(n);
    const MIN_WORDS = state.user.level === "beginner" ? 30 : 60;
    app.innerHTML = `
      ${header(n, "write")}
      ${timerHTML()}
      <div class="card stack">
        <h3>${esc(day.write)}</h3>
        <p class="small muted">Don't stop to check every mistake — keep writing. Fix errors at the end.</p>
        <textarea id="text" placeholder="Start writing…">${esc(ds.writing)}</textarea>
        <div class="row spread small muted"><span id="wc">0 words</span><span>Goal: ${MIN_WORDS}+ words</span></div>
        <button id="done" disabled>Save my writing</button>
      </div>
      <div class="card small muted">💡 Tip: tomorrow, read today's writing aloud before you start — it's free speaking practice.</div>`;
    mountTimer(app.querySelector(".timer"));
    const ta = app.querySelector("#text"), wc = app.querySelector("#wc"), btn = app.querySelector("#done");
    const update = () => {
      const w = countWords(ta.value);
      wc.textContent = `${w} word${w === 1 ? "" : "s"}`;
      btn.disabled = w < MIN_WORDS;
      ds.writing = ta.value;
      save();
    };
    ta.oninput = update;
    update();
    btn.onclick = () => { completeTask(n, "write"); afterTask(n); };
  }

  // Speaking: the "record → watch muted → listen only → watch full → reflect" loop.
  function viewSpeak(n) {
    const day = DAYS[n - 1], ds = dayState(n);
    let blob = null, hasVideo = true, step = 0;
    const review = ds.review || {};

    const STEP_INFO = [
      null,
      { title: "1. Watch with the sound OFF", body: "Look only at your body language.", checks: ["I looked at the camera (eye contact)", "I smiled or looked relaxed", "My posture was straight and open", "I used my hands naturally"] },
      { title: "2. Listen with NO video", body: "Close your eyes. Listen only to your voice.", checks: ["My words were clear", "My speed was comfortable (not too fast)", "I said few fillers (umm, aaa, like)", "I paused at the end of sentences"] },
      { title: "3. Watch with sound ON", body: "Now see and hear everything together, like a stranger would.", checks: ["My message was easy to follow", "I used at least one new word from today", "I sounded more confident than I felt"] },
    ];

    function frame(inner) {
      app.innerHTML = `${header(n, "speak")}${inner}`;
    }

    function intro() {
      releaseMedia();
      frame(`
        ${timerHTML()}
        <div class="card stack">
          <h3>Today's topic</h3>
          <p class="passage" style="margin:0">${esc(day.speak)}</p>
          <p class="small muted">Plan for 1 minute (no writing full sentences!), then record for 1–2 minutes. After that, you'll review your video in 4 steps.</p>
          <button id="cam">Open camera</button>
          <button id="mic" class="secondary">Audio only (no camera)</button>
        </div>
        ${ds.speak ? `<div class="card small muted">✓ You already finished today's speaking. You can record again any time.</div>` : ""}`);
      mountTimer(app.querySelector(".timer"));
      app.querySelector("#cam").onclick = () => startPreview(true);
      app.querySelector("#mic").onclick = () => startPreview(false);
    }

    async function startPreview(wantVideo) {
      if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
        toast("Recording is not supported in this browser"); return;
      }
      try {
        liveStream = await navigator.mediaDevices.getUserMedia(
          wantVideo ? { audio: true, video: { facingMode: "user", width: { ideal: 720 }, height: { ideal: 960 } } } : { audio: true });
        hasVideo = wantVideo;
      } catch {
        toast(wantVideo ? "Camera blocked — allow access, or use audio only" : "Microphone blocked — please allow access");
        return;
      }
      recorder();
    }

    function pickMime() {
      const opts = hasVideo
        ? ["video/mp4", "video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm"]
        : ["audio/mp4", "audio/webm;codecs=opus", "audio/webm"];
      return opts.find((m) => MediaRecorder.isTypeSupported(m)) || "";
    }

    function recorder() {
      stopActiveTimer();
      frame(`
        <div class="video-wrap ${hasVideo ? "" : "audio-only"}" id="vw">
          <video id="live" class="mirror" playsinline muted autoplay></video>
          <div class="cover"><div><div class="big-emoji">🎙️</div><p>Audio recording</p></div></div>
          <span class="rec">● REC <span id="rt">0:00</span></span>
        </div>
        <div class="card small"><b>Topic:</b> ${esc(day.speak)}</div>
        <button id="rec">● Start recording</button>
        <button id="cancel" class="secondary" style="margin-top:8px">Cancel</button>`);
      const live = app.querySelector("#live");
      live.srcObject = liveStream;
      const vw = app.querySelector("#vw"), recBtn = app.querySelector("#rec"), rt = app.querySelector("#rt");
      let mr = null, chunks = [], secs = 0, tick = null;

      app.querySelector("#cancel").onclick = () => { if (mr && mr.state !== "inactive") mr.stop(); clearInterval(tick); intro(); };
      recBtn.onclick = () => {
        if (mr && mr.state === "recording") { mr.stop(); return; }
        const mime = pickMime();
        mr = new MediaRecorder(liveStream, mime ? { mimeType: mime } : undefined);
        chunks = [];
        mr.ondataavailable = (e) => e.data.size && chunks.push(e.data);
        const myRender = renderId;
        mr.onstop = () => {
          clearInterval(tick);
          if (!chunks.length || myRender !== renderId) return;
          blob = new Blob(chunks, { type: mr.mimeType || mime || (hasVideo ? "video/webm" : "audio/webm") });
          releaseMedia();
          db.put(`day-${n}`, blob).catch(() => toast("Could not save video on this device"));
          step = hasVideo ? 1 : 2;
          reviewStep();
        };
        mr.start(1000);
        vw.classList.add("recording");
        recBtn.textContent = "■ Stop recording";
        tick = setInterval(() => {
          secs++;
          rt.textContent = fmt(secs);
          if (secs >= MAX_RECORD_SECONDS) mr.stop();
        }, 1000);
      };
    }

    function stepsBar() {
      return `<div class="steps" aria-label="Review step ${step} of 4">${[1, 2, 3, 4].map((i) => `<i class="${i <= step ? "on" : ""}"></i>`).join("")}</div>`;
    }

    function reviewStep() {
      if (step === 4) return reflect();
      const info = STEP_INFO[step];
      const saved = review[`s${step}`] || [];
      frame(`
        ${stepsBar()}
        <h2>${info.title}</h2>
        <p class="muted">${info.body}</p>
        <div class="video-wrap ${step === 2 ? "audio-only" : ""}">
          <video id="pb" playsinline controls ${step === 1 ? "muted" : ""}></video>
          <div class="cover"><div><div class="big-emoji">🎧</div><p>Listening only.<br>Focus on your voice.</p>
            <button id="playa" class="secondary" style="width:auto;margin-top:8px">▶ Play / Pause</button></div></div>
        </div>
        <div class="card check-list">
          <h3>Tick what went well</h3>
          ${info.checks.map((c, i) => `<label><input type="checkbox" data-i="${i}" ${saved.includes(i) ? "checked" : ""}> ${esc(c)}</label>`).join("")}
        </div>
        <button id="next">Next step ›</button>`);
      const pb = app.querySelector("#pb");
      pb.src = blobUrl(blob);
      if (step === 1) pb.muted = true;
      const pa = app.querySelector("#playa");
      if (pa) pa.onclick = () => (pb.paused ? pb.play() : pb.pause());
      app.querySelector("#next").onclick = () => {
        review[`s${step}`] = [...app.querySelectorAll(".check-list input:checked")].map((el) => +el.dataset.i);
        pb.pause();
        step++;
        reviewStep();
      };
    }

    function reflect() {
      frame(`
        ${stepsBar()}
        <h2>4. Reflect</h2>
        <p class="muted">Be kind to yourself. You're doing something most people are too shy to try.</p>
        <div class="card stack">
          <div><label for="conf">How confident did you feel? <span id="cv">${review.confidence || 3}</span>/5</label>
            <input id="conf" type="range" min="1" max="5" value="${review.confidence || 3}"></div>
          <div><label for="good">One thing I did well</label><input id="good" value="${esc(review.good)}" placeholder="e.g. I kept going after a mistake"></div>
          <div><label for="fix">One thing to improve next time</label><input id="fix" value="${esc(review.fix)}" placeholder="e.g. Slow down, fewer 'umm'"></div>
        </div>
        <button id="again" class="secondary">Record again with this in mind</button>
        <button id="finish" style="margin-top:8px">Finish speaking</button>`);
      const conf = app.querySelector("#conf");
      conf.oninput = () => (app.querySelector("#cv").textContent = conf.value);
      const keep = () => {
        review.confidence = +conf.value;
        review.good = app.querySelector("#good").value.trim();
        review.fix = app.querySelector("#fix").value.trim();
        review.hasVideo = hasVideo;
        ds.review = review;
        save();
      };
      app.querySelector("#again").onclick = () => { keep(); startPreview(hasVideo); };
      app.querySelector("#finish").onclick = () => { keep(); completeTask(n, "speak"); releaseMedia(); afterTask(n); };
    }

    intro();
  }

  function afterTask(n) {
    if (isDone(n)) go(`#/complete/${n}`);
    else { toast("Saved ✓"); go("#/"); }
  }

  function viewComplete(n) {
    const last = n === TOTAL;
    app.innerHTML = `
      <div class="center" style="padding-top:48px">
        <div class="big-emoji">${last ? "🏆" : "🎉"}</div>
        <h1>Day ${n} complete!</h1>
        <p class="muted">${last ? "You did it — 21 days of English, every day." : `${TOTAL - n} days to go. Your streak: ${streak()} 🔥`}</p>
        ${n === 1 ? `<p class="small muted">Your Day 1 video is saved. On Day 21 you'll compare it with your new one.</p>` : ""}
      </div>
      <div class="card stack">
        ${last ? `<button data-go="#/finish">Watch Day 1 vs Day 21</button>` : ""}
        <button id="share" class="secondary">Share my progress</button>
        <button data-go="#/" ${last ? 'class="secondary"' : ""}>Back home</button>
      </div>`;
    app.querySelector("#share").onclick = async () => {
      const text = `I just finished Day ${n} of the Speak21 English challenge! 10 min reading, 10 writing, 10 speaking every day. 🗣️`;
      try {
        if (navigator.share) await navigator.share({ text, url: location.origin + location.pathname });
        else { await navigator.clipboard.writeText(text); toast("Copied — paste it anywhere!"); }
      } catch { /* user cancelled */ }
    };
  }

  async function viewFinish() {
    app.innerHTML = `
      <div class="topbar"><button class="ghost" data-go="#/">‹ Back</button><span class="pill">Your progress</span></div>
      <h1>Day 1 vs Day ${TOTAL}</h1>
      <p class="muted">Play both. Listen for speed, pauses, fillers and confidence.</p>
      <div class="compare">
        <div><p class="small"><b>Day 1</b></p><video id="v1" controls playsinline></video></div>
        <div><p class="small"><b>Day ${TOTAL}</b></p><video id="v21" controls playsinline></video></div>
      </div>
      <div class="card" style="margin-top:12px">
        <h3>Confidence over 21 days</h3>
        <div class="spark">${DAYS.map((_, i) => { const c = state.days[i + 1]?.review?.confidence || 0; return `<i style="height:${c * 20}%" title="Day ${i + 1}: ${c || "–"}/5"></i>`; }).join("")}</div>
        <p class="small muted">Each bar is how confident you felt after speaking that day.</p>
      </div>
      <div class="card"><h3>What's next?</h3><p class="small muted">Habits often take longer than 21 days to become automatic. Start a second round — the prompts stay the same, but your answers won't.</p>
        <button id="again" class="secondary">Start round 2</button></div>`;
    try {
      const [a, b] = await Promise.all([db.get("day-1"), db.get(`day-${TOTAL}`)]);
      if (a) app.querySelector("#v1").src = blobUrl(a);
      if (b) app.querySelector("#v21").src = blobUrl(b);
    } catch { toast("Could not load saved videos"); }
    app.querySelector("#again").onclick = () => {
      if (!confirm("Start a new round? Your Day 1 and Day 21 videos will be replaced as you record new ones.")) return;
      state.rounds = (state.rounds || 1) + 1;
      state.days = {};
      save();
      go("#/");
    };
  }

  function viewSettings() {
    const u = state.user;
    app.innerHTML = `
      <div class="topbar"><button class="ghost" data-go="#/">‹ Back</button><span class="pill">Settings</span></div>
      <div class="card">
        <h3>${esc(u.name)}</h3>
        <p class="small muted" style="margin:0">${esc(u.email || "No email")} · ${esc(u.level)} · ${esc(u.goal)}<br>Joined ${esc(u.joinedOn)}${state.rounds > 1 ? ` · Round ${state.rounds}` : ""}</p>
      </div>
      <div class="card stack">
        <div><label for="theme">Appearance</label>
          <select id="theme"><option value="">System</option><option value="light">Light</option><option value="dark">Dark</option></select></div>
        <button id="export" class="secondary">Download my writing (text file)</button>
        <button id="reset" class="secondary">Delete all my data</button>
      </div>
      <p class="small muted center">Speak21 is free. Your data never leaves this device.</p>`;
    const th = app.querySelector("#theme");
    th.value = state.theme || "";
    th.onchange = () => { state.theme = th.value; save(); applyTheme(); };
    app.querySelector("#export").onclick = () => {
      const txt = DAYS.map((d, i) => {
        const w = state.days[i + 1]?.writing;
        return w ? `Day ${i + 1} — ${d.theme}\n${d.write}\n\n${w}\n` : null;
      }).filter(Boolean).join("\n----------\n\n") || "No writing yet.";
      const a = document.createElement("a");
      a.href = blobUrl(new Blob([txt], { type: "text/plain" }));
      a.download = "speak21-my-writing.txt";
      a.click();
    };
    app.querySelector("#reset").onclick = async () => {
      if (!confirm("Delete your profile, progress and all videos from this device?")) return;
      localStorage.removeItem(STORE_KEY);
      try { await db.clear(); } catch { /* nothing stored */ }
      state = load();
      go("#/");
      render();
    };
  }

  function applyTheme() {
    if (state.theme) document.documentElement.dataset.theme = state.theme;
    else delete document.documentElement.dataset.theme;
  }

  // ---------- router ----------
  function render() {
    renderId++;
    stopActiveTimer();
    releaseMedia();
    window.scrollTo(0, 0);
    if (!state.user) return viewSignup();
    const parts = location.hash.replace(/^#\/?/, "").split("/");
    const n = +parts[1];
    if (parts[0] === "day" && n >= 1 && n <= TOTAL && TASKS[parts[2]]) {
      if (!isUnlocked(n)) { go("#/"); return; }
      return { read: viewRead, write: viewWrite, speak: viewSpeak }[parts[2]](n);
    }
    if (parts[0] === "complete" && n >= 1 && n <= TOTAL) return viewComplete(n);
    if (parts[0] === "finish") return viewFinish();
    if (parts[0] === "settings") return viewSettings();
    return viewHome();
  }

  app.addEventListener("click", (e) => {
    const t = e.target.closest("[data-go]");
    if (t) { e.preventDefault(); go(t.dataset.go); }
  });
  window.addEventListener("hashchange", render);
  applyTheme();
  render();

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
