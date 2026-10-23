/* ─────────────────────────────────────────────────
   r4dzioo portfolio - script.js
   ───────────────────────────────────────────────── */

/* ── STATUS BAR CLOCK ─────────────────────────── */
(function initClock() {
  const el = document.getElementById('sb-time');
  function tick() {
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const months = ['Jan','Feb','Mar','Apr','May','Jun',
                    'Jul','Aug','Sep','Oct','Nov','Dec'];
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      el.textContent = `[r4dzioo] ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    } else {
      el.textContent =
        `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} ` +
        `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    }
  }
  tick();
  setInterval(tick, 1000);
})();


/* ── ROLE TYPEWRITER ──────────────────────────── */
(function initRoleType() {
  const text   = 'roblox-dev';
  const span   = document.getElementById('role-text');
  const cursor = document.getElementById('role-cursor');
  let i = 0;
  function type() {
    if (i <= text.length) {
      span.textContent = text.slice(0, i);
      i++;
      setTimeout(type, i === 1 ? 600 : 85 + Math.random() * 40);
    } else {
      setTimeout(() => { cursor.style.display = 'none'; }, 800);
    }
  }
  setTimeout(type, 900);
})();


/* ── VISIT COUNTER - Supabase ──────────────────── */
(function initCounter() {
  const SUPABASE_URL = 'https://xhcnietczjdggwakqtip.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoY25pZXRjempkZ2d3YWtxdGlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NzU2OTEsImV4cCI6MjEwODM1MTY5MX0.YeCJs2U0iE9MPII6tL5qdalhzxZAtjFU8DGKoIWIi38';

  const el     = document.getElementById('counter-val');
  if (!el) return;
  const LS_KEY = 'r4dzioo_counted';
  const TTL_MS = 24 * 60 * 60 * 1000;

  function fmt(n) {
    const num = parseInt(n, 10);
    return isNaN(num) ? '----' : String(num).padStart(4, '0');
  }

  function animateTo(target) {
    const t = parseInt(target, 10);
    if (isNaN(t)) { el.textContent = '----'; return; }
    const start = Math.max(0, t - 14);
    let cur = start;
    el.textContent = fmt(cur);
    const iv = setInterval(() => {
      cur = Math.min(cur + 1, t);
      el.textContent = fmt(cur);
      if (cur >= t) clearInterval(iv);
    }, 55);
  }

  function shouldIncrement() {
    const ts = parseInt(localStorage.getItem(LS_KEY) || '0', 10);
    return Date.now() - ts > TTL_MS;
  }

  async function readCount() {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/stats?key=eq.profile-views&select=value`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const rows = await res.json();
    if (!Array.isArray(rows) || rows.length === 0) throw new Error('no rows');
    return rows[0].value ?? 0;
  }

  async function incrementCount() {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/rpc/increment_views`,
      {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ row_key: 'profile-views' }),
      }
    );
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(`HTTP ${res.status}: ${errText}`);
    }
    const raw = await res.json();
    // Supabase RPC zwraca BIGINT jako liczbe lub stringa — normalizujemy
    const val = parseInt(raw, 10);
    if (isNaN(val)) throw new Error('bad rpc response: ' + JSON.stringify(raw));
    localStorage.setItem(LS_KEY, String(Date.now()));
    return val;
  }

  (async () => {
    try {
      let val;
      if (shouldIncrement()) {
        try {
          val = await incrementCount();
        } catch (rpcErr) {
          // RPC nie dziala - fallback do samego odczytu
          console.warn('increment_views error, fallback:', rpcErr.message);
          val = await readCount();
        }
      } else {
        val = await readCount();
      }
      animateTo(val);
    } catch (err) {
      console.warn('Supabase counter error:', err.message);
      el.textContent = '----';
    }
  })();
})();


/* ── MATRIX RAIN - shared factory ─────────────── */
function createMatrixRain(canvas, options) {
  const ctx      = canvas.getContext('2d');
  const opts     = Object.assign({ opacity: 0.04, speed: 0.5, fontSize: 13 }, options);
  const FONT_SIZE = opts.fontSize;

  const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ' +
                'ハヒフヘホマミムメモヤユヨラリルレロワヲン' +
                '0123456789ABCDEF:./\\|><-_=+*';

  let cols, drops;

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    cols  = Math.floor(canvas.width / FONT_SIZE);
    drops = Array.from({ length: cols }, () => Math.random() * -60);
  }
  resize();

  // Watch for size changes (layout shift on mobile, etc.)
  const ro = new ResizeObserver(resize);
  ro.observe(canvas.parentElement || canvas);

  function draw() {
    ctx.fillStyle = `rgba(5, 4, 0, ${opts.opacity})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < cols; i++) {
      const char  = CHARS[Math.floor(Math.random() * CHARS.length)];
      const y     = drops[i] * FONT_SIZE;
      const alpha = drops[i] < 2 ? 1 : (0.3 + Math.random() * 0.4);

      ctx.globalAlpha = alpha;
      ctx.font        = `${FONT_SIZE}px JetBrains Mono, monospace`;
      ctx.fillStyle   = drops[i] < 2 ? '#ffcf6a' : '#cc7a00';
      ctx.fillText(char, i * FONT_SIZE, y);
      ctx.globalAlpha = 1;

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i] += opts.speed;
    }
  }

  return setInterval(draw, 50);
}

/* ── RIGHT COLUMN matrix (denser) ─────────────── */
(function() {
  const c = document.getElementById('matrix-canvas');
  createMatrixRain(c, { opacity: 0.055, speed: 0.55, fontSize: 18 });
})();

/* ── LEFT COLUMN matrix (sparser, slower) ─────── */
(function() {
  const c = document.getElementById('matrix-canvas-left');
  // position it to cover only the left column
  c.style.position = 'fixed';
  c.style.top      = '0';
  c.style.left     = '0';
  c.style.width    = '60%';
  c.style.height   = '100%';
  c.style.opacity  = '0.13';
  c.style.pointerEvents = 'none';
  c.style.zIndex   = '0';

  createMatrixRain(c, { opacity: 0.045, speed: 0.3, fontSize: 18 });
})();


/* ── TERMINAL SEQUENCE ─────────────────────────── */
(function initTerminal() {
  const body = document.getElementById('term-body');

  const SEQUENCE = [
    { type: 'prompt+cmd', cmd: 'whoami',                     delay: 400  },
    { type: 'out',        text: 'r4dzioo_dev',                delay: 220  },
    { type: 'blank',                                           delay: 180  },
    { type: 'prompt+cmd', cmd: 'ls projects/',                delay: 520  },
    { type: 'dir',        text: 'PMS/          Project_CZ/',  delay: 180  },
    { type: 'blank',                                           delay: 180  },
    { type: 'prompt+cmd', cmd: 'cat skills.txt',              delay: 600  },
    { type: 'out',        text: 'Roblox Studio  Terrain', delay: 140 },
    { type: 'out',        text: 'Map Design     Vehicle Imports', delay: 140 },
    { type: 'blank',                                           delay: 180  },
    { type: 'prompt+cmd', cmd: 'cat bio.txt',                 delay: 620  },
    { type: 'out',        text: 'Building worlds in Roblox.',  delay: 130  },
    { type: 'out',        text: 'Maps, vehicles, systems.',   delay: 130  },
    { type: 'blank',                                           delay: 180  },
    { type: 'prompt+cmd', cmd: 'git log --oneline',           delay: 700  },
    { type: 'comment',    text: 'a3f2c1e feat: Czech Republic map',   delay: 120 },
    { type: 'comment',    text: 'b91d3fa feat: PMS v2 release',       delay: 120 },
    { type: 'comment',    text: 'c02beef fix: vehicle import bugs',   delay: 120 },
    { type: 'comment',    text: 'd7a1fee init: project structure',    delay: 120 },
    { type: 'blank',                                           delay: 220  },
    { type: 'prompt+cmd', cmd: 'uptime',                      delay: 500  },
    { type: 'out',        text: 'online since forever',       delay: 150  },
    { type: 'blank',                                           delay: 260  },
    { type: 'cursor-line',                                     delay: 0    },
  ];

  function makeLine(cls, html) {
    const span = document.createElement('span');
    span.className = 't-line ' + cls;
    span.innerHTML = html;
    return span;
  }

  let accumulated = 0;
  SEQUENCE.forEach(item => {
    accumulated += item.delay;
    setTimeout(() => render(item), accumulated);
  });

  function render(item) {
    let el;
    switch (item.type) {
      case 'prompt+cmd':
        el = makeLine('',
          `<span class="t-prompt">$ </span><span class="t-cmd">${esc(item.cmd)}</span>`);
        break;
      case 'out':
        el = makeLine('t-out', esc(item.text)); break;
      case 'dir':
        el = makeLine('t-dir', esc(item.text)); break;
      case 'comment':
        el = makeLine('t-comment', esc(item.text)); break;
      case 'blank':
        el = document.createElement('span');
        el.className = 't-blank'; break;
      case 'cursor-line':
        el = makeLine('',
          `<span class="t-prompt">$ </span><span class="t-cursor">█</span>`);
        break;
    }
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }

  function esc(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
})();
