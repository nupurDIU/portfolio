/**
 * ============================================================================
 * PORTFOLIO CLIENT ENGINE — NAZNEEN NAHAR NUPUR
 * Features:
 * - Floating Capsule Nav ScrollSpy (Auto-active pill highlighting)
 * - Dynamic Mouse Spotlight Lighting
 * - Web Audio Haptic Synthesizer
 * - SQA Case Study Sliding Drawer
 * - Clipboard Engine with Toast Notifications
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* --------------------------------------------------------------------------
     1. DYNAMIC SPOTLIGHT HOVER EFFECT
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
     2. SYNTHETIC HAPTIC AUDIO (Web Audio API)
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
      soundToggleBtn.classList.add('bg-blue-600', 'text-white');
      soundToggleBtn.classList.remove('text-zinc-400');
      showToast('Tactile audio feedback: ON');
      playHapticClick(1400);
    } else {
      soundToggleBtn.classList.remove('bg-blue-600', 'text-white');
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
     3. TOAST NOTIFICATION ENGINE
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
     4. CLIPBOARD HANDLER (Email copy)
     -------------------------------------------------------------------------- */
  const EMAIL = 'nupur23105101072@diu.edu.bd';

  function copyEmail() {
    navigator.clipboard.writeText(EMAIL).then(() => {
      showToast(`Copied ${EMAIL} to clipboard`);
      playHapticClick(1200);
    });
  }

  const copyFooterEmailBtn = document.getElementById('copy-footer-email-btn');
  if (copyFooterEmailBtn) {
    copyFooterEmailBtn.addEventListener('click', copyEmail);
  }

  /* --------------------------------------------------------------------------
     5. FLOATING CAPSULE SCROLLSPY (Auto updates active pill as user scrolls)
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  function updateActiveNav() {
    const scrollY = window.pageYOffset;
    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navItems.forEach((item) => {
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav);

  /* --------------------------------------------------------------------------
     6. SQA CASE STUDY DRAWER SYSTEM
     -------------------------------------------------------------------------- */
  const caseStudyData = {
    omnitest: {
      tag: 'E2E Web Automation • Playwright & TypeScript',
      title: 'OmniTest: Headless E2E Regression Architecture & CI Matrix',
      meta: 'Author: Nazneen Nahar Nupur • 850+ Scenarios • <0.2% Flakiness',
      content: `
        <div class="space-y-6 text-sm text-zinc-300 leading-relaxed font-sans">
          <div class="space-y-2">
            <h4 class="text-xs font-mono uppercase tracking-wider text-sky-400">01 / The Quality Challenge</h4>
            <p>
              The development team had accumulated an unwieldy legacy Cypress test suite that took over 42 minutes to run per Pull Request. Developers frequently bypassed tests due to frequent false-positive timeouts caused by asynchronous micro-frontend hydration.
            </p>
          </div>
          <div class="space-y-2">
            <h4 class="text-xs font-mono uppercase tracking-wider text-sky-400">02 / Automation Strategy & Architecture</h4>
            <p>
              Engineered a unified Playwright framework with TypeScript leveraging parallel worker processes inside ephemeral Docker containers. Replaced hard-coded sleeps with web-first assertions and request interception to inject pre-authenticated auth cookies.
            </p>
          </div>
          <div class="space-y-2">
            <h4 class="text-xs font-mono uppercase tracking-wider text-sky-400">03 / Quantifiable Production Impact</h4>
            <ul class="list-disc list-inside space-y-1.5 text-zinc-400 font-mono text-xs">
              <li>PR regression pipeline runtime reduced from <span class="text-white font-semibold">42 minutes to 7 minutes</span>.</li>
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
              Ahead of a high-volume promotional campaign, the engineering team required certainty that checkout and payment APIs could withstand 12,000 requests per second without database deadlocks.
            </p>
          </div>
          <div class="space-y-2">
            <h4 class="text-xs font-mono uppercase tracking-wider text-sky-400">02 / Bottlenecks Uncovered</h4>
            <ul class="list-disc list-inside space-y-1.5 text-zinc-400 font-mono text-xs">
              <li>Identified missing database indexes causing table locks under 6,500 RPS.</li>
              <li>Discovered memory leaks in token verification caches under concurrent revocation bursts.</li>
              <li>Enabled backend engineers to optimize connection pooling, slashing p99 latency by 72%.</li>
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
            <h4 class="text-xs font-mono uppercase tracking-wider text-purple-400">01 / The Testing Challenge</h4>
            <p>
              Financial transactions require exact mathematical precision with zero room for rounding errors or currency conversion discrepancies. Manual verification was slow and prone to missed boundary conditions.
            </p>
          </div>
          <div class="space-y-2">
            <h4 class="text-xs font-mono uppercase tracking-wider text-purple-400">02 / Results & Verification</h4>
            <ul class="list-disc list-inside space-y-1.5 text-zinc-400 font-mono text-xs">
              <li>Uncovered 42 subtle rounding errors in foreign exchange calculation microservices before release.</li>
              <li>Achieved 100% automated regression coverage for core ledger logic.</li>
              <li>Saved 40+ engineering hours per settlement sprint.</li>
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
          <div class="font-mono text-xs text-zinc-400">${data.meta}</div>
          <h2 class="text-2xl font-bold text-white">${data.title}</h2>
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
    btn.addEventListener('click', () => {
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
