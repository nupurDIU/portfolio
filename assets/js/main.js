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
      tag: 'Aviation SQA • RTM & Defect Engineering',
      title: 'SkyBound Airways: Requirements Traceability, Test Architecture & Defect Engineering',
      meta: 'Author: Nazneen Nahar Nupur • End-to-End SQA Lifecycle & Defect Triage',
      content: `
        <div class="space-y-6 text-sm text-zinc-300 leading-relaxed font-sans">
          
          <!-- TASK 1: Requirements Engineering & RTM Setup -->
          <div class="space-y-3">
            <h4 class="text-xs font-mono uppercase tracking-wider text-sky-400">Task 1 / Requirements Engineering & RTM Setup</h4>
            <p>
              Decomposed formal software specifications for the SkyBound flight reservation system and established a bidirectional <strong>Requirements Traceability Matrix (RTM)</strong> to ensure 100% test coverage:
            </p>
            <div class="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950/70 p-3">
              <table class="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr class="border-b border-zinc-800 text-sky-400">
                    <th class="py-1.5 px-2">Req ID</th>
                    <th class="py-1.5 px-2">Requirement Statement</th>
                    <th class="py-1.5 px-2">Scenario</th>
                    <th class="py-1.5 px-2">Level</th>
                    <th class="py-1.5 px-2">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-zinc-800/60 text-zinc-300">
                  <tr>
                    <td class="py-2 px-2 text-white font-bold">REQ-01</td>
                    <td class="py-2 px-2 font-sans text-xs">Prevent checkout if passport expires within 6 months of flight date or has active security hold.</td>
                    <td class="py-2 px-2 text-sky-400">TS-01</td>
                    <td class="py-2 px-2">System</td>
                    <td class="py-2 px-2 text-amber-400">Not Executed</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-2 text-white font-bold">REQ-02</td>
                    <td class="py-2 px-2 font-sans text-xs">Hold selected seat for 10 minutes during payment and issue CONFIRMED ticket upon successful billing.</td>
                    <td class="py-2 px-2 text-sky-400">TS-02</td>
                    <td class="py-2 px-2">System</td>
                    <td class="py-2 px-2 text-amber-400">Not Executed</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-2 text-white font-bold">REQ-03</td>
                    <td class="py-2 px-2 font-sans text-xs">When economy reaches 200/200, automatically place passengers on Standby List (max 15). 16th receives "Flight & Standby Full".</td>
                    <td class="py-2 px-2 text-sky-400">TS-03</td>
                    <td class="py-2 px-2">System</td>
                    <td class="py-2 px-2 text-amber-400">Not Executed</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-2 text-white font-bold">REQ-04</td>
                    <td class="py-2 px-2 font-sans text-xs">Allow admin manual cancellation / seat override only after secondary confirmation pop-up and mandatory reason.</td>
                    <td class="py-2 px-2 text-sky-400">TS-04</td>
                    <td class="py-2 px-2">System</td>
                    <td class="py-2 px-2 text-amber-400">Not Executed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- TASK 2: Test Scenarios & Detailed Test Cases -->
          <div class="space-y-3">
            <h4 class="text-xs font-mono uppercase tracking-wider text-sky-400">Task 2 / High-Level Test Scenarios & Detailed Test Cases</h4>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div class="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span class="text-sky-400 font-bold">TS-01:</span> Verify checkout blocked on passport expiry (&lt;6 mos) or active security hold.
              </div>
              <div class="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span class="text-sky-400 font-bold">TS-02:</span> Verify selected seat held for 10 mins and marked CONFIRMED upon payment.
              </div>
              <div class="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span class="text-sky-400 font-bold">TS-03:</span> Verify Standby List behavior at 200/200 capacity and 15-passenger limit.
              </div>
              <div class="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800">
                <span class="text-sky-400 font-bold">TS-04:</span> Verify admin emergency cancel/override requires pop-up and mandatory reason.
              </div>
            </div>

            <div class="space-y-2.5 pt-2">
              <h5 class="text-xs font-bold text-white uppercase font-mono tracking-wider">Detailed Test Cases (REQ-02 & REQ-04)</h5>
              
              <!-- TC-01 Positive -->
              <div class="p-3.5 rounded-xl border border-emerald-500/25 bg-emerald-950/10 space-y-1.5 font-mono text-xs">
                <div class="flex items-center justify-between">
                  <span class="text-emerald-400 font-bold">TC-01 (Positive): Successful 10-Minute Seat Hold & Ticket Confirmation</span>
                  <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">REQ-02 / TS-02</span>
                </div>
                <div class="text-[11px] text-zinc-300 font-sans space-y-1">
                  <p><strong>Preconditions:</strong> Passenger logged in; flight has available economy seats; valid payment method.</p>
                  <p><strong>Test Data:</strong> Flight: SB101; Seat: 12A; Payment: Valid Card; Hold Time: 10 minutes.</p>
                  <p><strong>Actions:</strong> 1. Search SB101 → 2. Select seat 12A → 3. Proceed to payment → 4. Complete payment within 10 mins.</p>
                  <p><strong>Expected Outcome:</strong> Seat 12A remains reserved during payment. After successful billing, booking is completed and ticket status becomes CONFIRMED.</p>
                </div>
              </div>

              <!-- TC-02 Negative -->
              <div class="p-3.5 rounded-xl border border-amber-500/25 bg-amber-950/10 space-y-1.5 font-mono text-xs">
                <div class="flex items-center justify-between">
                  <span class="text-amber-400 font-bold">TC-02 (Negative): Seat Hold Expires After 10 Minutes Without Payment</span>
                  <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px]">REQ-02 / TS-02</span>
                </div>
                <div class="text-[11px] text-zinc-300 font-sans space-y-1">
                  <p><strong>Preconditions:</strong> Passenger logged in; flight has available seats.</p>
                  <p><strong>Test Data:</strong> Flight: SB101; Seat: 15B; Payment: Uncompleted; Hold Time: &gt;10 minutes.</p>
                  <p><strong>Actions:</strong> 1. Select seat 15B → 2. Start payment process → 3. Do not complete payment → 4. Wait &gt;10 mins → 5. Attempt checkout.</p>
                  <p><strong>Expected Outcome:</strong> Seat hold expires after 10 mins. Seat 15B becomes available for others, and original passenger cannot receive a CONFIRMED ticket with expired hold.</p>
                </div>
              </div>

              <!-- TC-03 Boundary -->
              <div class="p-3.5 rounded-xl border border-blue-500/25 bg-blue-950/10 space-y-1.5 font-mono text-xs">
                <div class="flex items-center justify-between">
                  <span class="text-sky-400 font-bold">TC-03 (Boundary): Admin Emergency Action Requires Mandatory Reason</span>
                  <span class="px-2 py-0.5 rounded bg-blue-500/20 text-sky-300 text-[10px]">REQ-04 / TS-04</span>
                </div>
                <div class="text-[11px] text-zinc-300 font-sans space-y-1">
                  <p><strong>Preconditions:</strong> Admin logged into operator dashboard with emergency action privileges. Active booking exists.</p>
                  <p><strong>Test Data:</strong> Booking ID: SB-45821; Action: Cancel Booking; Reason: Blank.</p>
                  <p><strong>Actions:</strong> 1. Open dashboard → 2. Select SB-45821 → 3. Click Emergency Cancel/Override → 4. Observe modal → 5. Leave reason blank → 6. Confirm.</p>
                  <p><strong>Expected Outcome:</strong> Secondary confirmation pop-up displayed. System rejects action when reason is blank, shows validation error, and booking remains unchanged.</p>
                </div>
              </div>

            </div>
          </div>

          <!-- TASK 3: Defect Engineering & Severity vs Priority Matrix -->
          <div class="space-y-3">
            <h4 class="text-xs font-mono uppercase tracking-wider text-sky-400">Task 3 / Defect Engineering & Severity vs. Priority Matrix</h4>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              <!-- BUG-001 -->
              <div class="p-4 rounded-xl border border-red-500/30 bg-red-950/15 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-red-400 font-mono">BUG-001</span>
                  <div class="flex gap-1.5">
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 font-bold">Sev: High</span>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-bold">Pri: Low</span>
                  </div>
                </div>
                <h5 class="text-sm font-bold text-white">Reservation system crashes during rare concurrent seat-hold transaction</h5>
                <p class="text-xs text-zinc-400 font-mono">Environment: Chrome 139; Windows 11</p>
                <div class="text-xs text-zinc-300 space-y-1 font-sans">
                  <p><strong>Steps:</strong> Perform seat-hold at midnight UTC rollover with concurrent transactions on same seat under high concurrency.</p>
                  <p><strong>Actual:</strong> Reservation service crashes due to database deadlock.</p>
                  <p class="text-[11px] text-zinc-400 pt-1 border-t border-red-500/20 font-mono"><strong>Business Justification:</strong> Severe technical impact (service crash), but obscure timing requirement makes immediate customer exposure low.</p>
                </div>
              </div>

              <!-- BUG-002 -->
              <div class="p-4 rounded-xl border border-amber-500/30 bg-amber-950/15 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-amber-400 font-mono">BUG-002</span>
                  <div class="flex gap-1.5">
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-bold">Sev: Low</span>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">Pri: High</span>
                  </div>
                </div>
                <h5 class="text-sm font-bold text-white">Emergency Override button label misspelled on admin dashboard</h5>
                <p class="text-xs text-zinc-400 font-mono">Environment: Chrome 139; Windows 11</p>
                <div class="text-xs text-zinc-300 space-y-1 font-sans">
                  <p><strong>Steps:</strong> Log in as airline admin → Open operator dashboard → Navigate to emergency actions → Observe button.</p>
                  <p><strong>Actual:</strong> Button displays typo <em>"Emerency Cnacel/Override"</em> instead of <em>"Emergency Cancel/Override"</em>.</p>
                  <p class="text-[11px] text-zinc-400 pt-1 border-t border-amber-500/20 font-mono"><strong>Business Justification:</strong> Non-destructive cosmetic defect, but critical high priority because it is visible to executives and operators on vital emergency screens.</p>
                </div>
              </div>

            </div>
          </div>

          <!-- TASK 4: Defect Lifecycle & Triage Strategy -->
          <div class="space-y-3">
            <h4 class="text-xs font-mono uppercase tracking-wider text-sky-400">Task 4 / Defect Lifecycle & Triage Strategy</h4>
            
            <div class="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2.5 font-mono text-xs">
              <div class="grid grid-cols-2 gap-2 pb-2 border-b border-zinc-800">
                <div><span class="text-zinc-500">Original Defect:</span> <span class="text-white font-bold">BUG-001</span></div>
                <div><span class="text-zinc-500">Developer Status:</span> <span class="text-emerald-400 font-bold">RESOLVED - FIXED</span></div>
                <div class="col-span-2"><span class="text-zinc-500">Re-test Result:</span> <span class="text-emerald-300 font-sans">Original database deadlock/crash is no longer reproducible.</span></div>
                <div class="col-span-2"><span class="text-amber-400 font-bold">New Finding:</span> <span class="text-zinc-200 font-sans">Booking confirmation email is not dispatched after successful reservation.</span></div>
              </div>

              <div class="space-y-1 pt-1 text-zinc-300">
                <p><strong class="text-sky-400">Triage Decision:</strong> Close BUG-001 and log a NEW Linked Bug (BUG-003).</p>
                <p><strong class="text-sky-400">Original Bug Transition:</strong> <code>RESOLVED - FIXED → RE-TEST → PASS → CLOSED</code></p>
                <p><strong class="text-sky-400">New Bug Transition:</strong> <code>NEW → OPEN → ASSIGNED → IN PROGRESS → RESOLVED → RE-TEST → CLOSED</code></p>
                <p class="font-sans text-xs text-zinc-400 pt-1">
                  <strong>Rationale:</strong> BUG-001 is closed because the primary crash is fully resolved. The email dispatch failure is a separate functional defect and should be tracked independently as BUG-003 rather than reopening the original ticket.
                </p>
              </div>

              <div class="p-3 rounded-lg bg-zinc-950 border border-zinc-800/80 font-sans text-xs space-y-1 text-zinc-300 mt-2">
                <span class="font-mono text-sky-400 font-semibold text-[11px] block">Professional Jira Defect Comment:</span>
                <p class="italic">
                  "Re-tested BUG-001 under the previously failing conditions, and the original database deadlock/crash is no longer reproducible. However, during verification, I identified a new issue where the booking confirmation email is not dispatched after a successful reservation. I recommend closing BUG-001 as fixed and logging the email-dispatch issue as a new linked defect (BUG-003) for separate investigation."
                </p>
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
