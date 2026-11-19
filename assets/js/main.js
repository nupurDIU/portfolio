/**
 * ============================================================================
 * PORTFOLIO CLIENT ENGINE — NAZNEEN NAHAR NUPUR (Senior SQA Engineer)
 * Features:
 * - Analog Canvas Film Grain (Zero-dependency, battery efficient)
 * - Dynamic Mouse Spotlight Lighting for Project Cards
 * - Web Audio Haptic Synthesizer (Zero external audio files)
 * - Live UTC+6 Dhaka Wall Clock
 * - Full Command Palette (Ctrl+K / ⌘K) with Keyboard Navigation
 * - Deep SQA Case Study Sliding Drawer
 * - Clipboard Engine with Toast Notifications
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* --------------------------------------------------------------------------
     1. SUBTLE ANALOG FILM GRAIN (Generated to Canvas)
     -------------------------------------------------------------------------- */
  const canvas = document.getElementById('grain-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    function generateNoise() {
      const imgData = ctx.createImageData(width, height);
      const buffer = new Uint32Array(imgData.data.buffer);
      const len = buffer.length;
      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.12) {
          buffer[i] = 0x15ffffff; // Low-alpha white speck
        }
      }
      ctx.putImageData(imgData, 0, 0);
    }

    generateNoise();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      generateNoise();
    });
  }

  /* --------------------------------------------------------------------------
     2. DYNAMIC SPOTLIGHT HOVER EFFECT
     -------------------------------------------------------------------------- */
  const cards = document.querySelectorAll('.spotlight-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* --------------------------------------------------------------------------
     3. SYNTHETIC HAPTIC AUDIO (Web Audio API)
     -------------------------------------------------------------------------- */
  let audioEnabled = false;
  let audioCtx = null;

  const soundToggleBtn = document.getElementById('sound-toggle');

  function playHapticClick(freq = 1100) {
    if (!audioEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) {
      console.warn('Audio feedback failed', e);
    }
  }

  function toggleAudio() {
    audioEnabled = !audioEnabled;
    if (audioEnabled) {
      soundToggleBtn.classList.add('border-emerald-500/60', 'text-emerald-400');
      soundToggleBtn.classList.remove('text-zinc-400');
      showToast('Tactile audio feedback: ON');
      playHapticClick(1400);
    } else {
      soundToggleBtn.classList.remove('border-emerald-500/60', 'text-emerald-400');
      soundToggleBtn.classList.add('text-zinc-400');
      showToast('Tactile audio feedback: OFF');
    }
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', toggleAudio);
  }

  // Attach tactile audio to interactive buttons
  document.querySelectorAll('button, a').forEach((el) => {
    el.addEventListener('mouseenter', () => playHapticClick(1600));
    el.addEventListener('click', () => playHapticClick(900));
  });

  /* --------------------------------------------------------------------------
     4. LIVE DHAKA WALL CLOCK (UTC+6)
     -------------------------------------------------------------------------- */
  const liveTimeEl = document.getElementById('live-time');
  function updateDhakaTime() {
    if (!liveTimeEl) return;
    const now = new Date();
    const options = {
      timeZone: 'Asia/Dhaka',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
    liveTimeEl.textContent = `Dhaka UTC+6 • ${timeString}`;
  }
  updateDhakaTime();
  setInterval(updateDhakaTime, 1000);

  /* --------------------------------------------------------------------------
     5. TOAST NOTIFICATION ENGINE
     -------------------------------------------------------------------------- */
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = message;
    toast.classList.remove('translate-y-16', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-16', 'opacity-0');
    }, 2800);
  }

  /* --------------------------------------------------------------------------
     6. CLIPBOARD HANDLER (Email copy)
     -------------------------------------------------------------------------- */
  const EMAIL = 'nazneen.sqa@gmail.com';

  function copyEmail() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      showToast(`Copied ${EMAIL} to clipboard`);
      playHapticClick(1200);
    });
  }

  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', copyEmail);
  }

  const copyFooterEmailBtn = document.getElementById('copy-footer-email-btn');
  if (copyFooterEmailBtn) {
    copyFooterEmailBtn.addEventListener('click', copyEmail);
  }

  /* --------------------------------------------------------------------------
     7. COMMAND PALETTE (Ctrl + K / ⌘K)
     -------------------------------------------------------------------------- */
  const cmdModal = document.getElementById('cmd-modal');
  const cmdTrigger = document.getElementById('cmd-k-trigger');
  const cmdInput = document.getElementById('cmd-input');
  const cmdList = document.getElementById('cmd-list');

  function openCmdModal() {
    if (!cmdModal) return;
    cmdModal.classList.remove('hidden');
    cmdModal.classList.add('flex');
    if (cmdInput) {
      cmdInput.value = '';
      cmdInput.focus();
    }
    filterCmdItems('');
  }

  function closeCmdModal() {
    if (!cmdModal) return;
    cmdModal.classList.remove('flex');
    cmdModal.classList.add('hidden');
  }

  if (cmdTrigger) {
    cmdTrigger.addEventListener('click', openCmdModal);
  }

  // Keyboard shortcut: Ctrl+K or Cmd+K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdModal && cmdModal.classList.contains('flex')) {
        closeCmdModal();
      } else {
        openCmdModal();
      }
    } else if (e.key === 'Escape') {
      closeCmdModal();
      closeCaseStudyDrawer();
    }
  });

  // Close when clicking outside dialog
  if (cmdModal) {
    cmdModal.addEventListener('click', (e) => {
      if (e.target === cmdModal) closeCmdModal();
    });
  }

  // Filter commands
  function filterCmdItems(query) {
    const items = cmdList ? cmdList.querySelectorAll('.cmd-item') : [];
    items.forEach((item) => {
      const text = item.textContent.toLowerCase();
      if (!query || text.includes(query.toLowerCase())) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  if (cmdInput) {
    cmdInput.addEventListener('input', (e) => {
      filterCmdItems(e.target.value);
    });
  }

  // Action dispatcher
  if (cmdList) {
    cmdList.addEventListener('click', (e) => {
      const button = e.target.closest('.cmd-item');
      if (!button) return;
      const action = button.dataset.action;
      const target = button.dataset.target;

      closeCmdModal();

      if (action === 'goto' && target) {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'copy-email') {
        copyEmail();
      } else if (action === 'toggle-sound') {
        toggleAudio();
      }
    });
  }

  /* --------------------------------------------------------------------------
     8. DETAILED SQA CASE STUDY DRAWER SYSTEM
     -------------------------------------------------------------------------- */
  const caseStudyData = {
    omnitest: {
      tag: 'E2E Web Automation • Playwright & TypeScript',
      title: 'OmniTest: Headless E2E Regression Architecture & CI Matrix',
      meta: 'Author: Nazneen Nahar Nupur • 850+ Scenarios • 0.2% Flakiness',
      content: `
        <div class="space-y-6 text-sm text-zinc-300 leading-relaxed font-sans">
          
          <div class="space-y-2">
            <h4 class="text-xs font-mono uppercase tracking-wider text-emerald-400">01 / The Quality Challenge</h4>
            <p>
              The development team had accumulated an unwieldy legacy Cypress test suite that took over 42 minutes to run per Pull Request. Developers frequently bypassed tests due to frequent false-positive timeouts caused by asynchronous micro-frontend hydration.
            </p>
          </div>

          <div class="space-y-2">
            <h4 class="text-xs font-mono uppercase tracking-wider text-emerald-400">02 / Automation Strategy & Architecture</h4>
            <p>
              Engineered a unified Playwright framework with TypeScript leveraging parallel worker processes inside ephemeral Docker containers. Replaced hard-coded sleeps with web-first assertions and request interception to inject pre-authenticated auth cookies.
            </p>
            <div class="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-400 space-y-1">
              <div class="text-zinc-500">// Pipeline Execution Graph</div>
              <div class="text-emerald-400">[GitHub PR Event] ➔ Spin up 4x Sharded Docker Workers</div>
              <div class="text-sky-400">      ↓</div>
              <div class="text-zinc-200">Session Injection (Bypasses UI login steps) ➔ Execute 850 Tests</div>
              <div class="text-sky-400">      ↓</div>
              <div class="text-emerald-400">Artifact Generation: Traces, Screenshots, Allure Dashboard</div>
            </div>
          </div>

          <div class="space-y-2">
            <h4 class="text-xs font-mono uppercase tracking-wider text-emerald-400">03 / The Hardest Flakiness Bug Solved</h4>
            <p>
              Intermittent WebSocket token expiration during 200+ step checkout flows caused random test halts. Solved by injecting a global Playwright fixture that intercepts token refresh HTTP calls and dynamically updates the browser context storage state without halting test execution.
            </p>
          </div>

          <div class="space-y-2">
            <h4 class="text-xs font-mono uppercase tracking-wider text-emerald-400">04 / Quantifiable Production Impact</h4>
            <ul class="list-disc list-inside space-y-1.5 text-zinc-400 font-mono text-xs">
              <li>PR regression pipeline runtime reduced from <span class="text-zinc-200 font-semibold">42 minutes to 7 minutes</span>.</li>
              <li>Test flakiness dropped from 14.8% down to <span class="text-emerald-400 font-semibold">&lt; 0.2%</span>.</li>
              <li>Zero critical regression escapes logged to production across 18 consecutive releases.</li>
            </ul>
          </div>

        </div>
      `,
    },
    loadforge: {
      tag: 'Performance Engineering • JMeter & Newman',
      title: 'LoadForge: Distributed API Stress Testing & Concurrency Benchmarking',
      meta: 'Author: Nazneen Nahar Nupur • 15,000 Virtual Users Simulation',
      content: `
        <div class="space-y-6 text-sm text-zinc-300 leading-relaxed font-sans">
          
          <div class="space-y-2">
            <h4 class="text-xs font-mono uppercase tracking-wider text-sky-400">01 / The Problem Context</h4>
            <p>
              Ahead of an annual major promotional campaign, the engineering org required certainty that the checkout and coupon redemption APIs could withstand 12,000 requests per second without cascading database lockouts or elevated 5xx error spikes.
            </p>
          </div>

          <div class="space-y-2">
            <h4 class="text-xs font-mono uppercase tracking-wider text-sky-400">02 / Test Design & Load Distribution</h4>
            <p>
              Constructed a parameterized Apache JMeter distributed test cluster with ramp-up, steady-state, and spike phases simulating 15,000 virtual users across global edge gateways. Automated pre-flight smoke checks using Newman in CI to ensure contract validity before load trigger.
            </p>
          </div>

          <div class="space-y-2">
            <h4 class="text-xs font-mono uppercase tracking-wider text-sky-400">03 / Bottlenecks Uncovered</h4>
            <ul class="list-disc list-inside space-y-1.5 text-zinc-400 font-mono text-xs">
              <li>Identified a missing index on the <code>transactions.user_id</code> column causing table locks at 6,500 RPS.</li>
              <li>Discovered a memory leak in the JWT verification cache under intense concurrent token revocation.</li>
              <li>Enabled database engineers to optimize connection pooling, slashing p99 latency by 72%.</li>
            </ul>
          </div>

        </div>
      `,
    },
    ledgerguard: {
      tag: 'Financial Data Integrity • Python & PyTest',
      title: 'LedgerGuard: Automated Transaction & Database Reconciliation Suite',
      meta: 'Author: Nazneen Nahar Nupur • 14 Currencies • 42 Edge Bugs Found',
      content: `
        <div class="space-y-6 text-sm text-zinc-300 leading-relaxed font-sans">
          
          <div class="space-y-2">
            <h4 class="text-xs font-mono uppercase tracking-wider text-amber-400">01 / The Testing Challenge</h4>
            <p>
              Financial transactions require exact mathematical precision with zero room for rounding errors or currency conversion discrepancies. Manual verification of settlement ledgers was slow, error-prone, and failed to test boundary condition edge cases.
            </p>
          </div>

          <div class="space-y-2">
            <h4 class="text-xs font-mono uppercase tracking-wider text-amber-400">02 / Automated Reconciliation Architecture</h4>
            <p>
              Built a custom Python/PyTest validation suite connected directly to staging databases. Formulated property-based test cases simulating boundary transactions (floating point arithmetic, leap-second timestamps, negative balance handling, and simultaneous multi-currency conversions).
            </p>
          </div>

          <div class="space-y-2">
            <h4 class="text-xs font-mono uppercase tracking-wider text-amber-400">03 / Results & Verification</h4>
            <ul class="list-disc list-inside space-y-1.5 text-zinc-400 font-mono text-xs">
              <li>Uncovered 42 subtle rounding errors in foreign exchange calculation microservices before release.</li>
              <li>100% automated regression coverage for core ledger logic.</li>
              <li>Saved an estimated 40+ engineering hours per bi-weekly financial settlement cycle.</li>
            </ul>
          </div>

        </div>
      `,
    },
  };

  const caseModal = document.getElementById('case-study-modal');
  const drawerTag = document.getElementById('drawer-tag');
  const drawerContent = document.getElementById('drawer-content');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');

  function openCaseStudy(caseKey) {
    const data = caseStudyData[caseKey];
    if (!data || !caseModal) return;

    if (drawerTag) drawerTag.textContent = data.tag;
    if (drawerContent) {
      drawerContent.innerHTML = `
        <div class="space-y-2 pb-4 border-b border-zinc-800">
          <div class="font-mono text-xs text-zinc-500">${data.meta}</div>
          <h2 class="text-2xl font-bold text-zinc-100">${data.title}</h2>
        </div>
        ${data.content}
      `;
    }

    caseModal.classList.remove('hidden');
    caseModal.classList.add('flex');
    if (window.lucide) window.lucide.createIcons();
    playHapticClick(1300);
  }

  function closeCaseStudyDrawer() {
    if (!caseModal) return;
    caseModal.classList.remove('flex');
    caseModal.classList.add('hidden');
  }

  document.querySelectorAll('.open-case-study-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const caseKey = btn.dataset.case;
      if (caseKey) openCaseStudy(caseKey);
    });
  });

  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', closeCaseStudyDrawer);
  }

  if (caseModal) {
    caseModal.addEventListener('click', (e) => {
      if (e.target === caseModal) closeCaseStudyDrawer();
    });
  }
});
