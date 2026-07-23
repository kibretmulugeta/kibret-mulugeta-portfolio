# PROJECT ANALYSIS: Kibret Mulugeta Flagship Personal Identity & Research Website

## Executive Summary
This document provides the system analysis, technical requirements, content boundaries, and routing architecture for building the flagship personal website for **Kibret Mulugeta**. The website functions as both a high-end AI Research Lab showcase and an advanced Computer/Software Engineering portfolio.

---

## 1. Core Profile & Positioning
- **Name:** Kibret Mulugeta
- **Primary Roles:** AI Engineer • Computer Engineer • AI/ML Researcher
- **Education:**
  - **MSc in Computer Engineering** (Specialization: *Artificial Intelligence & Data Engineering*), Bahir Dar University, Ethiopia
  - **BSc in Electrical & Computer Engineering** (*Computer Engineering Stream*), Debre Berhan University, Ethiopia
- **Narrative Trajectory:**
  $$\text{Computer Engineering} \longrightarrow \text{AI \& Data Engineering} \longrightarrow \text{Deep Learning Research} \longrightarrow \text{Medical Vision \& Software Engineering}$$
- **Aesthetic Direction:** Minimalist, technical, dark-mode research lab & modern engineering studio with high precision, subtle ambient glows, tactical grids, and clear visual hierarchy.

---

## 2. Technical Stack Blueprint
- **Framework:** Next.js (App Router, JavaScript/JSX)
- **Language:** Pure JavaScript (ES6+ / JSX) — *Zero TypeScript*
- **Styling:** Tailwind CSS (Custom Tokens, Glassmorphism, CSS Variables)
- **Animation:** Framer Motion (Scroll reveal, layout transitions, reduced-motion compliant)
- **Icons:** Lucide React
- **Data Architecture:** Data-driven local decoupling (`src/data/projects.js`, `src/data/research.js`, `src/data/skills.js`, `src/data/profile.js`)
- **Deployment & Verification:** Next.js static build (`npm run build`) with zero lint or build errors.

---

## 3. Site Map & Route Architecture

| Route | Page Title | Primary Purpose & Contents |
|---|---|---|
| `/` | Home | Hero, Core Positioning, Selected Work Matrix, Interactive Neuro-Plasticity Pipeline Visualizer, Capabilities Matrix |
| `/work` | Portfolio | Complete directory of engineering & research projects with filtering by domain |
| `/work/[slug]` | Case Study Deep-Dive | Technical report-style case studies: Executive Summary, System Architecture, Preprocessing Pipeline, Engineering Trade-offs, Results & Limitations |
| `/research` | Research Lab | Dedicated AI/ML research portal: Brain MRI Segmentation, Neuro-Inspired Neural Plasticity, Trustworthy AI, Manuscript Status Tracker |
| `/about` | About & Narrative | Journey, Philosophy, Educational Background, Technical Evolution |
| `/resume` | Interactive Resume | Timeline of Education & Projects, Categorized Skills, Direct PDF Download CTA (`/assets/Kibret_Mulugeta_Resume.pdf`) |
| `/contact` | Contact Portal | Direct Email Wrapper (`mailto:kibretmail@gmail.com`), Social CTAs (GitHub, LinkedIn), Message Form UI |

---

## 4. Content Boundaries & Truth Integrity
- Strictly no invented metrics, job titles, or fake publications.
- Precise qualitative status tracking (e.g., *"Manuscript in preparation for submission to Scientific Reports"*).
- Honest representation of dataset contexts (e.g., ATLAS dataset for Brain MRI stroke lesion segmentation).
