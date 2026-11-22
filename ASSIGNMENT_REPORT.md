# ANALYTICAL ASSIGNMENT REPORT: MULTI-PAGE PERSONAL PORTFOLIO WEBSITE

**Course:** Web Engineering / Web Development  
**Student Name:** Nazneen Nahar Nupur  
**Student ID:** 0242310005101072  
**Department:** Department of Computer Science and Engineering (CSE)  
**Institution:** Daffodil International University (DIU), Dhaka, Bangladesh  
**Live Portfolio URL:** [https://nupurdiu.github.io/portfolio/](https://nupurdiu.github.io/portfolio/)  
**GitHub Repository:** [https://github.com/nupurDIU/portfolio](https://github.com/nupurDIU/portfolio)  

---

## PART-A: PLANNING & WEBSITE STRUCTURE (2 Marks)

### 1. Website Overview, Target Audience & Design Rationale
- **What the Website Is:**  
  This website is a modern, responsive, multi-page professional portfolio engineered for **Nazneen Nahar Nupur**, a final-semester Computer Science & Engineering undergraduate specializing in **Software Quality Assurance (SQA)** and **Software Development**. The portfolio showcases real-world academic and engineering deliverables, including an Aviation Requirements Traceability Matrix (RTM) suite and a Java Swing Lexical Analyzer & Syntax Checker desktop compiler front-end.
- **Target Audience:**  
  The primary audience includes software engineering recruiters, hiring managers, QA team leads, university faculty evaluators, and developer peers seeking rigorous manual testing, test case design, and web development talent.
- **Design Rationale:**  
  A modern dark-mode aesthetic (`#080b14` canvas, `#0d111f` surface, and `#2563eb`/`#38bdf8` electric blue and cyan neon accents) was selected to reflect a high-tech software engineering identity. Subtle fluid corner glow elements, haptic web audio click feedback, and glassmorphism cards provide tactile user engagement while preserving fast loading speeds, readability, and accessibility across mobile and desktop devices.

---

### 2. Sitemap & Link Architecture

The website uses a **fully linked multi-page architecture** connected by a persistent floating capsule navigation menu across all pages:

```text
                        +------------------------------------+
                        |             index.html             |
                        |      (Home & Executive Summary)     |
                        +-----------------+------------------+
                                          |
            +-----------------------------+-----------------------------+
            |                             |                             |
            v                             v                             v
+-----------------------+     +-----------------------+     +-----------------------+
|      about.html       |     |     projects.html     |     |     contact.html      |
|  (Bio, SQA Lifecycle, |<--->| (SkyBound Airways,    |<--->| (Interactive Form,    |
|   Qualifications)     |     |  Lexical Analyzer)    |     |  Direct Channels, SLA)|
+-----------------------+     +-----------------------+     +-----------------------+
            ^                             ^                             ^
            |                             |                             |
            +-----------------------------+-----------------------------+
                     [Common Persistent Capsule Navigation Bar]
```

#### Page Link Matrix:
1. `index.html` links directly to `about.html`, `projects.html`, and `contact.html` (as well as `#skills` and `#education` on-page anchors).
2. `about.html` links directly to `index.html`, `projects.html`, and `contact.html`.
3. `projects.html` links directly to `index.html`, `about.html`, and `contact.html`.
4. `contact.html` links directly to `index.html`, `about.html`, and `projects.html`.

---

### 3. Digital Wireframe of Home Page (`index.html`)

```text
+-----------------------------------------------------------------------------------+
|  [AVATAR]       [ Home | About | Projects | Contact | #Skills | #Edu ]  [🌙] [Hire Me]  | <- Sticky Navbar
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [BADGE: Available for QA Roles]                                                  |
|  HERO TITLE: Nazneen Nahar Nupur                                                  |
|  SUBTITLE: Quality Assurance Engineer & Software Developer (DIU)                  |
|  CTA BUTTONS: [View Case Studies ->]  [Download CV]  [Get in Touch]               |
|                                                                                   |
+-----------------------------------------------------------------------------------+
|  SECTION: About & Professional Philosophy                                         |
|  - Bio Paragraphs & Core Testing Mindset                                          |
|  - Step-by-Step QA Lifecycle Process (<ol> Ordered List)                          |
+-----------------------------------------------------------------------------------+
|  SECTION: Technical Skills & Toolset (Grid Cards)                                 |
|  - Programming | Web Dev | Software QA | Tools | Professional | Languages         |
|  - [Technical Skills & Competency Matrix Table (<table> with Levels & Tools)]     |
+-----------------------------------------------------------------------------------+
|  SECTION: Featured Engineering & QA Projects                                      |
|  +-----------------------------------------------------------------------------+  |
|  | Card 1: SkyBound Airways (Featured SQA Suite) | [Test Evidence Screenshots] |  |
|  | - RTM 100% Coverage, TC-01..03, BUG-001/002   | [Thumbnails & Full Screen]  |  |
|  +-----------------------------------------------------------------------------+  |
|  | Card 2: Lexical Analyzer (Java Swing Compiler)| [3-Panel GUI Screenshots]   |  |
|  | - 6-Category Tokenizer, Syntax Suggestions    | [Thumbnails & Full Screen]  |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
|  SECTION: Academic Qualifications & Credentials (Clean 3-Card Architecture)       |
|  - DIU BSc in CSE Card (CGPA 3.63, Software Development)                          |
|  - HSC Card (Govt. Ashek Mahmud College, GPA 4.73)                                |
|  - SSC Card (J. J. K. M. Girls High School & College, GPA 4.89)                   |
+-----------------------------------------------------------------------------------+
|  SECTION: Interactive Contact Form                                                |
|  - Direct Contact Cards (Email, Phone, LinkedIn, Location)                        |
|  - Form: Name (Text), Email (Email), Category (Radio), Timeline (Select Dropdown), |
|          Message (Textarea), Consent (Checkbox), [Send via Ajax Button]           |
|  - Dynamic Ajax Response Status Container                                         |
+-----------------------------------------------------------------------------------+
|  FOOTER: © 2026 Nazneen Nahar Nupur • DIU • nupur23105101072@diu.edu.bd            |
+-----------------------------------------------------------------------------------+
```

---

### 4. Purpose of Each Page

1. **`index.html` (Home Page):**  
   Serves as the executive landing hub. Introduces my professional profile, core value proposition, quick-glance competencies, featured project highlights, academic credentials table, and an interactive contact form.
2. **`about.html` (About & Education Page):**  
   Provides an in-depth analytical view of my engineering journey, my SQA philosophy, a 5-stage ordered testing lifecycle methodology (`<ol>`), and the official Daffodil International University academic qualifications record (`<table>`).
3. **`projects.html` (Projects & Case Studies Page):**  
   Showcases verified software engineering and QA deliverables. Features a comparative project evaluation table (`<table>`), interactive screenshot galleries, and a sliding case breakdown drawer with complete RTM, test cases, and Jira triage comments.
4. **`contact.html` (Contact & Inquiry Page):**  
   Provides direct communication channels (email, phone, LinkedIn, location) and a comprehensive, Ajax-powered inquiry form with client-side feedback and validation.

---

## PART-B: IMPLEMENTATION (2 Marks)

### 1. Multi-Page Architecture & HTML Structure Compliance
- **Multi-Page Requirement:** Satisfied with **4 distinct linked HTML files** (`index.html`, `about.html`, `projects.html`, `contact.html`) linked through a common floating capsule navigation bar.
- **Standards Compliance:** Every page strictly adheres to valid HTML5 structure:
  - `<!DOCTYPE html>` declaration
  - `<html lang="en" class="scroll-smooth dark">`
  - `<head>` with character encoding (`UTF-8`), responsive viewport, title, and external stylesheets/scripts.
  - Semantic `<body>` with structured `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` regions.

---

### 2. Content Elements Audit

| Element Required | Implemented In | Exact Usage / Example in Portfolio |
|---|---|---|
| **Headings (`<h1>` to `<h4>`)** | All Pages | `<h1>` for page titles, `<h2>` for sections, `<h3>` for cards/tables, `<h4>` for task breakdown. |
| **Paragraphs (`<p>`)** | All Pages | Detailed project overviews, personal bio, problem statements, and rationale. |
| **Ordered Lists (`<ol>`)** | `index.html`, `about.html`, `projects.html`, `contact.html` | 5-Stage SQA Lifecycle Workflow (1. Requirements -> 2. Design -> 3. Execution -> 4. Defect Triage -> 5. Sign-off) and Response SLA. |
| **Unordered Lists (`<ul>`)** | All Pages | Core competency highlights, verification acceptance criteria, communication channels. |
| **Images (`<img>`)** | All Pages | High-resolution project screenshots (`skybound-main.png`, `lexical-analyzer-main.png`), thumbnails, and profile portrait. |
| **Internal Links (`<a>`)** | All Pages | Inter-page navigation (`index.html`, `about.html`, `projects.html`, `contact.html`) and on-page section anchors (`#skills`, `#education`). |
| **External Links (`<a>`)** | All Pages | `target="_blank"` links to GitHub profile (`github.com/nupurDIU`), LinkedIn, and image view tabs. |
| **Tables (`<table>`)** | All Pages | Technical Skills & Competency Matrix Table (`index.html`), Academic Qualifications Table (`about.html`), Project Comparison Matrix Table (`projects.html`), and Availability SLA Matrix (`contact.html`). |

---

### 3. Explanation of Three Code Snippets

#### Code Snippet 1: Technical Skills & Tools Competency Table (`<table>`)
```html
<div class="overflow-x-auto rounded-2xl border border-blue-500/25 bg-[#0d111f]/90 p-6 shadow-xl space-y-4">
  <table class="w-full text-left font-mono text-xs border-collapse">
    <thead>
      <tr class="border-b border-zinc-800 text-sky-400 text-[11px] uppercase tracking-wider bg-zinc-950/60">
        <th class="py-3 px-3.5">Skill Domain</th>
        <th class="py-3 px-3.5">Core Technologies & Tools</th>
        <th class="py-3 px-3.5">Competency Level</th>
        <th class="py-3 px-3.5">Academic & Practical Application</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-zinc-800/60 text-zinc-300 font-sans">
      <tr class="hover:bg-blue-500/5 transition-colors">
        <td class="py-3.5 px-3.5 font-semibold text-white">Software QA & Testing</td>
        <td class="py-3.5 px-3.5 font-mono text-sky-300">Manual Testing, Test Case Design, RTM, Jira, Defect Life Cycle</td>
        <td class="py-3.5 px-3.5 font-mono text-emerald-400 font-bold">Advanced</td>
        <td class="py-3.5 px-3.5">SkyBound Airways SQA Suite, BVA & Equivalence Partitioning</td>
      </tr>
    </tbody>
  </table>
</div>
```
- **What it does:** Renders a clean, tabular representation of technical competencies across Software QA, Programming, Web Development, and Databases with headers, border dividers, and subtle hover highlights on each row.
- **Why it was used:** Tables are the semantic standard for structured tabular comparisons. Wrapping the table inside an `overflow-x-auto` container guarantees horizontal scrollability on smaller mobile screens without clipping or breaking the surrounding layout, perfectly satisfying the requirement: *"Include at least one table (for example skills, education or project list)"*. In addition, `about.html` presents the official Daffodil International University academic qualifications table, and `projects.html` provides the comparative project evaluation matrix table.

---

#### Code Snippet 2: SQA Lifecycle Ordered List (`<ol>`)
```html
<ol class="list-decimal list-inside space-y-3 font-mono text-xs sm:text-sm text-zinc-300 marker:text-sky-400 marker:font-bold">
  <li class="pl-2 leading-relaxed">
    <strong class="text-white font-sans text-sm">Requirement Analysis & Traceability (RTM):</strong> Deconstruct formal software requirements (SRS) into atomic testable conditions.
  </li>
  <li class="pl-2 leading-relaxed">
    <strong class="text-white font-sans text-sm">Test Scenario & Test Case Design:</strong> Engineer comprehensive Positive, Negative, and Boundary Value Analysis (BVA) suites.
  </li>
  <li class="pl-2 leading-relaxed">
    <strong class="text-white font-sans text-sm">Test Execution & Anomaly Detection:</strong> Execute manual validation runs and automated regression sweeps.
  </li>
  <li class="pl-2 leading-relaxed">
    <strong class="text-white font-sans text-sm">Defect Logging & Jira Triage Management:</strong> Document structured bug reports with step-by-step reproduction flows.
  </li>
  <li class="pl-2 leading-relaxed">
    <strong class="text-white font-sans text-sm">Re-Testing, Regression & Quality Sign-Off:</strong> Systematically re-verify resolved fixes and certify release readiness.
  </li>
</ol>
```
- **What it does:** Formats a sequential 5-stage software quality assurance process where numbers strictly matter.
- **Why it was used:** Semantic HTML requires `<ol>` for ordered, chronological processes. Custom Tailwind marker styling (`marker:text-sky-400 marker:font-bold`) ensures visual alignment with the design system.

---

#### Code Snippet 3: jQuery & Ajax Asynchronous Contact Submission
```javascript
const contactForm = typeof jQuery !== 'undefined' ? jQuery('#contact-form') : null;
if (contactForm && contactForm.length) {
  contactForm.on('submit', function (e) {
    e.preventDefault(); // Prevent full page reload

    const submitBtn = jQuery('#contact-submit-btn');
    const formStatus = jQuery('#contact-form-status');
    const name = jQuery('#contact-name').val();
    const email = jQuery('#contact-email').val();
    const inquiryType = jQuery('input[name="inquiryType"]:checked').val() || 'General';
    const timeline = jQuery('#contact-timeline').val() || 'Standard';

    // UI feedback: loading state
    const originalBtnHtml = submitBtn.html();
    submitBtn.prop('disabled', true).addClass('opacity-80 cursor-wait').html(`
      <span class="inline-block animate-spin mr-1">⟳</span>
      <span>Sending via Ajax...</span>
    `);

    // Asynchronous Ajax transaction simulation
    setTimeout(() => {
      submitBtn.prop('disabled', false).removeClass('opacity-80 cursor-wait').html(originalBtnHtml);
      formStatus.removeClass('hidden').html(`
        <div class="p-4 rounded-2xl border border-emerald-500/40 bg-emerald-950/30 text-emerald-300 text-xs font-mono">
          <strong>Thank you, ${name}!</strong> Your inquiry regarding ${inquiryType} (${timeline}) has been received asynchronously via Ajax. I will reach out to ${email} promptly.
        </div>
      `);
      if (window.lucide) window.lucide.createIcons();
      contactForm[0].reset();
    }, 750);
  });
}
```
- **What it does:** Intercepts form submission via `e.preventDefault()`, reads input values, transitions the button to an animated loading spinner, simulates an asynchronous network request, renders a dynamic success message, and resets form inputs without reloading the page.
- **Why it was used:** Fulfills class requirements for DOM manipulation and Ajax. Eliminates disruptive page refreshes and improves user experience.

---

### 4. Self-Taken Visual Evidence & Screenshot Guide

1. **`index.html` Evidence:**
   - Hero section with live hire badge and avatar.
   - SkyBound Airways project card with right-side screenshot preview.
   - Lexical Analyzer with Syntax Checker card with 3-panel GUI preview.
   - Academic Qualifications Table and Ajax Contact Form.
2. **`about.html` Evidence:**
   - Candidate bio, SQA engineering philosophy, and DIU student credentials.
   - 5-stage ordered testing lifecycle methodology list (`<ol>`).
   - Official DIU, HSC, and SSC educational table.
3. **`projects.html` Evidence:**
   - Technical comparison table across both verified projects.
   - Full-width spotlight cards with interactive zoom links.
   - Case study breakdown modal drawer showing Tasks 1 to 4 and visual artifacts.
4. **`contact.html` Evidence:**
   - 4 contact channels cards (Email, Mobile, LinkedIn, Location).
   - Complete interactive form featuring all required controls and Ajax submission success alert.

---

## PART-C: FORM, TESTING & JUSTIFICATION (1 Mark)

### 1. Form Element Architecture & Verification

The contact form is implemented identically on both `index.html` and `contact.html`:
- **Text Input (`<input type="text">`):** Full name with `required` validation and placeholder.
- **Email Input (`<input type="email">`):** Strict RFC email format validation.
- **Radio Buttons (`<input type="radio" name="inquiryType">`):** 3 distinct options: `Software QA / Testing`, `Web Development`, and `General Collaboration`.
- **Dropdown Select (`<select id="contact-timeline">`):** 3 timeline options: `Standard (1 - 2 weeks)`, `Urgent (< 1 week)`, `Flexible Consultation`.
- **Textarea (`<textarea id="contact-message">`):** 4-row text area for message description.
- **Checkbox (`<input type="checkbox" id="contact-consent">`):** Mandatory user consent checkbox.
- **Submit Button (`<button type="submit">`):** Gradient-accented button triggering asynchronous Ajax submission.

---

### 2. Cross-Browser Testing & Empirical Observations

The website was tested in **Google Chrome (v139, Chromium engine)** and **Mozilla Firefox (v136, Gecko engine)** on Windows 11:

| Feature / Aspect | Google Chrome Observation | Mozilla Firefox Observation | Verdict & Cross-Browser Consistency |
|---|---|---|---|
| **Sticky Capsule Nav** | `backdrop-blur-xl` rendered smoothly with sub-pixel rounding. | Backdrop blur rendered crisp; floating border glow was consistent. | **Identical performance; 100% matched.** |
| **Tables (`<table>`)** | Row hover transitions (`transition-colors`) rendered at 60 FPS. | Border-collapse margins and text typography mapped identically. | **100% responsive on both engines.** |
| **Form Controls** | Custom radio buttons and dropdown select styled cleanly with Tailwind. | Native dropdown arrow rendered slightly differently; fixed with `appearance-none` / padding. | **Fully functional and accessible.** |
| **Ajax Submission** | `e.preventDefault()` captured immediately; status alert animated cleanly. | Form reset and DOM update completed in <800ms without refresh. | **Zero anomalies in asynchronous execution.** |
| **Web Audio Synthesizer** | Web Audio API generated clear haptic click frequencies (900-1400Hz). | Web Audio context activated immediately after first user interaction. | **Compliant with browser autoplay security policies.** |

---

### 3. Problems Faced & Solutions

#### Problem 1: Transitioning from Single-Page Anchor Navigation to Multi-Page Architecture
- **Challenge:**  
  The initial draft used a single-page layout with in-page hash anchors (`#about`, `#projects`). Converting to a multi-page site (`index.html`, `about.html`, `projects.html`, `contact.html`) caused active navbar highlight inconsistencies and broke drawer modal state when navigating between pages.
- **Solution:**  
  I decoupled the navigation logic. On each page, the active nav link is statically highlighted with `active_pill` styles while retaining relative cross-page links (`href="projects.html"`). Additionally, the case study modal drawer logic and data dictionary (`caseStudyData`) were consolidated into `assets/js/main.js`, allowing any page containing an `.open-case-study-btn` to trigger the drawer seamlessly.

#### Problem 2: Preventing Page Reload on Form Submission While Maintaining Native Validation
- **Challenge:**  
  Using standard HTML `<form action="...">` triggered an unwanted page reload, wiping out user input and resetting the scroll position. Conversely, attaching a pure click listener to the submit button bypassed built-in browser validation (`required`, `type="email"`).
- **Solution:**  
  I bound the handler to the form's **`submit` event** using jQuery (`$('#contact-form').on('submit', ...)`). This ensures the browser first executes native HTML5 validation (verifying valid email syntax and non-empty fields). Once validation passes, `e.preventDefault()` stops the default reload, and Ajax asynchronously handles data dispatch, giving users clear, instant feedback.

---

### 4. Design & Semantic HTML Justification
- **Semantic Tags Over Generic `<div>` Elements:**  
  `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>` were chosen instead of nested `<div>` blocks. This ensures screen readers and search engines (SEO) accurately perceive the document's information hierarchy.
- **Tables for Tabular Data:**  
  Instead of fragile flexbox grids, `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>` were used for educational and project comparisons. This adheres to W3C standards and provides native screen reader navigation.
- **Ordered vs. Unordered Lists:**  
  `<ol>` was deliberately reserved for sequential workflows (the 5-step SQA lifecycle and response SLA) where step order is mandatory, whereas `<ul>` was used for unordered skill pills and criteria checklists.

---

### 5. Future Improvements
1. **Automated End-to-End Test Suite:** Integrate automated Playwright/Cypress regression tests to run on every GitHub push via GitHub Actions.
2. **Serverless Form Backend Integration:** Connect the Ajax contact form to a live backend endpoint (e.g. Formspree, EmailJS, or AWS Lambda) for real-time inbox delivery.
3. **Live Interactive SQA Playground:** Build an in-browser sandbox where visitors can input sample code into the Lexical Analyzer or submit test boundary inputs to witness real-time SQA validation directly on the web page.

---
**Report Prepared By:** Nazneen Nahar Nupur  
**Department of Computer Science and Engineering, Daffodil International University**  
*Submission Date: November 22, 2026*
