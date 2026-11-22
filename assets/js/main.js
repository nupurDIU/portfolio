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
    skybound: {
      tag: 'Aviation SQA • RTM & Defect Engineering (DIU CSE442)',
      title: 'SkyBound Airways v3.0: Requirements Traceability, Test Case Architecture & Defect Lifecycle',
      meta: 'Author: Nazneen Nahar Nupur (Student ID: 0242310005101896) • DIU CSE442 • End-to-End SQA Artifacts',
      content: `
        <div class="space-y-6 text-sm text-zinc-300 leading-relaxed font-sans">
          
          <!-- Screenshot Preview -->
          <div class="space-y-2">
            <h4 class="text-xs font-mono uppercase tracking-wider text-sky-400">01 / Verified Test & Bug Retest Evidence</h4>
            <div class="rounded-xl overflow-hidden border border-zinc-800 bg-black/50 shadow-lg">
              <img src="assets/images/projects/skybound-cover.png" alt="SkyBound Airways SQA Evidence" class="w-full h-auto object-cover">
            </div>
            <p class="text-xs text-zinc-400 font-mono">Figure: Staging execution evidence, defect verification, and bug re-test logs for SkyBound Airways v3.0.</p>
          </div>

          <!-- Section 1: RTM & Requirements Engineering -->
          <div class="space-y-2">
            <h4 class="text-xs font-mono uppercase tracking-wider text-sky-400">02 / Requirements Traceability Matrix (RTM)</h4>
            <p>
              Conducted SRS requirement decomposition for <strong>SkyBound Airways (v3.0)</strong>, mapping high-level business rules to system-level test scenarios with 100% coverage:
            </p>
            <ul class="list-disc list-inside space-y-1.5 text-xs text-zinc-400 font-mono">
              <li><strong>REQ-01 → TS-01, TS-02:</strong> Passport 6-month validity threshold and active security hold prevention before checkout.</li>
              <li><strong>REQ-02 → TS-03:</strong> Exact 10-minute temporary seat-hold lock during payment callback processing.</li>
              <li><strong>REQ-03 → TS-04, TS-05:</strong> Economy cabin 200/200 capacity limit and automated standby queue enrollment.</li>
              <li><strong>REQ-04 → TS-06:</strong> Admin emergency cancellation and seat override requiring secondary confirmation and mandatory reason.</li>
            </ul>
          </div>

          <!-- Section 2: Test Case Architecture -->
          <div class="space-y-2">
            <h4 class="text-xs font-mono uppercase tracking-wider text-sky-400">03 / Test Case Design (Student ID: 1896 Personalization)</h4>
            <p>
              Designed and executed 6 detailed test cases (TC-1896-01 to TC-1896-06) across positive, negative, and boundary conditions:
            </p>
            <div class="space-y-1.5 font-mono text-xs">
              <div class="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span class="text-emerald-400 font-semibold">[Positive] TC-1896-01:</span> Successful 10-minute seat hold (Seat 18A, Flight SB101) and valid payment callback confirmation.
              </div>
              <div class="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span class="text-amber-400 font-semibold">[Negative] TC-1896-02:</span> Seat hold expiration (Seat 18B) when payment is left incomplete; seat successfully returned to public pool.
              </div>
              <div class="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span class="text-sky-400 font-semibold">[Boundary] TC-1896-03:</span> Exact 10:00 boundary cutoff validation preventing post-timeout payment processing.
              </div>
              <div class="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span class="text-purple-400 font-semibold">[Administrative] TC-1896-04 to 06:</span> Emergency cancellation validation requiring secondary modal confirmation and mandatory business reason.
              </div>
            </div>
          </div>

          <!-- Section 3: Defect Bug Reports -->
          <div class="space-y-2">
            <h4 class="text-xs font-mono uppercase tracking-wider text-sky-400">04 / Defect Engineering & Severity vs. Priority Dynamics</h4>
            <p>
              Formulated professional bug reports analyzing real-world trade-offs between technical severity and business priority:
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div class="p-3 rounded-xl border border-red-500/20 bg-red-950/10 space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-red-400 font-mono">BUG-1896-A</span>
                  <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-500/20 text-red-300">High Sev / Low Pri</span>
                </div>
                <h5 class="text-xs font-bold text-white">Rare UTC Midnight Deadlock During Seat-Hold Expiry</h5>
                <p class="text-[11px] text-zinc-400 leading-snug">Severe deadlock crash, but only reproducible under obscure UTC 00:00:00 rollover timing with delayed payment callback.</p>
              </div>
              <div class="p-3 rounded-xl border border-blue-500/20 bg-blue-950/10 space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-sky-400 font-mono">BUG-1896-B</span>
                  <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-sky-300">Low Sev / High Pri</span>
                </div>
                <h5 class="text-xs font-bold text-white">Emergency Override Button Misspelled on Admin Dashboard</h5>
                <p class="text-[11px] text-zinc-400 leading-snug">Non-destructive typo, but high priority due to direct visibility by executive users on critical flight operations screen.</p>
              </div>
            </div>
          </div>

          <!-- Section 4: Retest & Jira Lifecycle -->
          <div class="space-y-2">
            <h4 class="text-xs font-mono uppercase tracking-wider text-sky-400">05 / Retesting & Professional Jira Lifecycle Management</h4>
            <p>
              Retested BUG-1896-A on the latest staging deployment. Confirmed the primary crash was resolved. Identified a linked secondary regression where confirmation emails failed to dispatch after booking.
            </p>
            <div class="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 space-y-1">
              <span class="text-sky-400 font-bold block">Jira Decision & Defect Linkage:</span>
              <p>Decision: Closed the original bug (<code>RESOLVED - FIXED → RE-TEST → PASS → CLOSED</code>) and logged a new linked defect (<code>NEW → OPEN → ASSIGNED</code>) to preserve defect history and prevent reopen churn.</p>
            </div>
          </div>

          <!-- Additional Screenshots -->
          <div class="space-y-3 pt-2">
            <h4 class="text-xs font-mono uppercase tracking-wider text-sky-400">06 / Additional Bug Reports Evidence</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="rounded-xl overflow-hidden border border-zinc-800 bg-black/50">
                <img src="assets/images/projects/skybound-bug-a.png" alt="BUG-1896-A Screenshot" class="w-full h-auto object-cover">
              </div>
              <div class="rounded-xl overflow-hidden border border-zinc-800 bg-black/50">
                <img src="assets/images/projects/skybound-bug-b.png" alt="BUG-1896-B Screenshot" class="w-full h-auto object-cover">
              </div>
            </div>
          </div>

        </div>
      `,
    },
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
