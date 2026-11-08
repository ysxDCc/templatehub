# TemplateHub — Next.js 15 Website Template Marketplace

Modern, dark-themed SaaS marketplace for high-performance website templates with in-browser previews, Clerk Authentication, and Dodo Payments integration.

## Tech Stack
- **Framework:** Next.js 15 (App Router, React 19, TypeScript)
- **Styling:** Tailwind CSS v4 + Custom Cyberpunk / Luxury Design Tokens
- **Authentication:** Clerk Auth v7 (Core 3)
- **Payments:** Dodo Payments (Apple Pay, Google Pay, Credit Cards)
- **Deployment:** Vercel

## Getting Started

### 1. Clone or Extract
```bash
git clone https://github.com/ysxDCc/templatehub.git
cd templatehub
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Clerk and Dodo Payments keys.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 5. Build for Production
```bash
npm run build
npm start
```

## Project Structure
- `src/app/` — Next.js App Router pages and API routes
  - `src/app/admin/` — Admin command center and user management
  - `src/app/templates/` — Template gallery and detail views
  - `src/app/builder/` — Visual no-code customizer
  - `src/app/compare/` — Template comparison matrix
  - `src/app/ai-generator/` — AI site generator studio
- `src/components/` — Modular UI components (Navbar, Hero, Modals, Cards)
- `src/data/` — Static data (templates registry, pricing plans, reviews)
- `public/sandboxes/` — Standalone HTML/CSS/JS template engines
