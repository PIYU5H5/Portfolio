# Piyush Jadhav — Visual Studio Code Developer Portfolio

A production-grade, highly interactive developer portfolio for **Piyush Jadhav** (3rd Year Computer Science and Engineering undergraduate, RMD Sinhgad, SPPU Pune), architected to mirror the complete experience of Visual Studio Code.

Visitors can explore files in the explorer tree, switch between tabs with spring animations, invoke commands via the command palette, toggle among 7 bespoke color themes, run commands in an interactive fake terminal, and chat with an embedded AI Co-Pilot grounded in real engineering projects.

---

## 🛠️ Tech Stack & Architecture

- **Core:** React 19 + TypeScript (Strict Mode) + Vite
- **Styling:** Tailwind CSS + CSS Variables on `:root[data-theme]` (instant 0ms theme transitions)
- **Physics & Motion:** Framer Motion (layout transitions, spring drag tabs, AnimatePresence)
- **State Management:** Zustand (reactive stores with `localStorage` persistence for tabs and themes)
- **Icons:** `lucide-react` + custom SVG vector icons (GitHub, LinkedIn, LeetCode)
- **Testing:** Vitest (unit tests for fuzzy search algorithms and CLI command parser)
- **Typography:** `JetBrains Mono` for editor chrome and code; `Inter` for clean body typography

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js 18+** or **22+** installed.

### 2. Clone & Install
```bash
git clone https://github.com/PIYU5H5/portfolio-website.git
cd portfolio-website
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Run Unit Tests
```bash
npm test
```

### 5. Production Build
```bash
npm run build
```
Generates an optimized, code-split production bundle in `/dist`.

---

## 📂 Content Management (Single Source of Truth)

All portfolio data is decoupled from presentation components and centralized in `src/data/`:

| File | Content Description |
|---|---|
| `src/data/profile.ts` | Bio, education history, SGPA records, social channels, and metrics |
| `src/data/projects.ts` | 9 detailed project case studies (problem, solution, impact, tags, links) |
| `src/data/skills.ts` | Categorized technical competencies, percentages, and context descriptions |
| `src/data/experience.ts` | Professional roles (Indux Technology, Shoption) and result bullets |
| `src/data/achievements.ts` | Hackathons (AMD, SuperNova, Void, SIH), honors, and Olympiads |
| `src/data/files.ts` | File tree metadata, icons, and languages |

---

## 🎨 7 Authentic Themes

Themes switch with zero re-render lag via CSS variables:
1. **Piyush Dark (Default):** Deep midnight void (`#0b0f14`), electric cobalt (`#2f81f7`), and syntax emerald (`#3fb950`).
2. **Cyberpunk:** High-octane neon cyan and magenta on synthwave purple.
3. **Modern Clean Light:** High-contrast crisp canvas passing WCAG AAA accessibility.
4. **Dracula:** Gothic slate with pastel pinks, purples, and emerald greens.
5. **Monokai Pro:** Classic warm code charcoal with bright sunny accents.
6. **Solarized Dark:** Eye-friendly precision cyan and ochre palette.
7. **Matrix:** Pitch-black console with phosphor green terminal glow.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Description |
|---|---|
| `Ctrl/Cmd + P` | Quick Open File / Command Palette |
| `Ctrl/Cmd + K` or `Ctrl/Cmd + Shift + P` | Command Palette with fuzzy search |
| `Ctrl/Cmd + ` ` | Toggle bottom interactive terminal |
| `Ctrl/Cmd + B` | Toggle file explorer sidebar |
| `Ctrl/Cmd + W` | Close focused editor tab |
| `Ctrl + Tab` / `Ctrl + Shift + Tab` | Cycle next / previous open tab |
| `Alt + 1..8` | Jump directly to open tab index |
| `Ctrl/Cmd + ,` | Workspace settings (themes, font size, minimap) |
| `Esc` | Dismiss any modal or overlay |

---

## 🥚 Easter Eggs

- **Terminal Hiring Easter Egg:** Type `sudo hire piyush` in the terminal to trigger confetti and a special offer letter acceptance sequence.
- **Konami Code:** Press `↑ ↑ ↓ ↓ ← → ← → B A` anywhere on the site to trigger the Matrix terminal theme.
- **Dev Log:** Click the "PJ" logo 5 times in the title bar to unlock `dev-log.md`.
- **Secret File:** Open 5 different tabs to reveal `secrets.txt` in the file explorer.
- **Red Traffic Light:** Hovering or clicking the red window button displays a playful IDE toast.
- **60-Second Diagnostic Warning:** If a visitor explores for 60 seconds without contacting Piyush, a warning badge illuminates in the status bar urging them to open `Contact.jsx`.

---

## 🌐 Deployment to Vercel / Netlify

1. Push code to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: VS Code developer portfolio for Piyush Jadhav"
   git push origin main
   ```
2. Import the repository in **Vercel** or **Netlify**.
3. (Optional) Set `LLM_API_KEY` in environment variables if connecting to an external OpenAI / Gemini LLM proxy. The site already features smart local streaming fallback when running client-side.
4. Replace `public/resume.pdf` with your real resume PDF before going live.

---

## 📄 License
MIT © Piyush Jadhav
