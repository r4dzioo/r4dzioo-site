/* ─────────────────────────────────────────────────
   r4dzioo portfolio — script.js
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


/* ── VISIT COUNTER — counterapi.dev v1 ────────── */
(function initCounter() {
  const el  = document.getElementById('counter-val');
  // v1: no auth, public, global — everyone hits the same counter
  const API = 'https://api.counterapi.dev/v1/r4dzioo-portfolio/visits/up';

  function fmt(n) {
    return isNaN(n) ? '----' : String(n).padStart(4, '0');
  }

  function animateTo(target) {
    const start = Math.max(0, target - 14);
    let cur = start;
    el.textContent = fmt(cur);
    const iv = setInterval(() => {
      cur = Math.min(cur + 1, target);
      el.textContent = fmt(cur);
      if (cur >= target) clearInterval(iv);
    }, 55);
  }

  fetch(API)
    .then(r => {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then(data => {
      // counterapi.dev v1 returns { count: N }
      const val = typeof data.count === 'number' ? data.count
                : typeof data.value === 'number' ? data.value
                : null;
      if (val !== null) {
        animateTo(val);
      } else {
        el.textContent = '????';
        console.warn('counterapi unexpected response:', data);
      }
    })
    .catch(err => {
      console.warn('counterapi.dev failed:', err);
      // Offline fallback — still shows something
      const lsKey = 'r4dzioo_visits_fallback';
      const v = parseInt(localStorage.getItem(lsKey) || '0', 10) + 1;
      localStorage.setItem(lsKey, v);
      animateTo(v);
    });
})();


/* ── MATRIX RAIN — shared factory ─────────────── */
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
