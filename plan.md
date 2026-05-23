# Plan: XENO — AI Productivity Ecosystem

Implementation of a professional, dark-themed productivity dashboard featuring tasks, notes, AI assistant, finance tracking, calendar, and analytics.

## Scope Summary
- **UI/UX**: Dark mode, Glassmorphism, Neon blue/purple accents, Smooth animations (Framer Motion).
- **Core Modules**:
    - **Dashboard**: Overview of all modules with "Presentation-ready" analytics.
    - **Tasks**: Kanban or list view with status tracking.
    - **Notes**: Rich text editor or clean markdown-style interface.
    - **AI Assistant**: Chat interface (simulated or client-side logic).
    - **Finance**: Expense/Budget tracker with visual charts.
    - **Calendar**: Event scheduling and view.
    - **Analytics**: Data visualizations for productivity and finances.

## Non-Goals
- Real-time multi-user collaboration (offline/single-user focus).
- Backend database integration (Persistence via `localStorage`).
- Real LLM API integration (unless keys provided; will use sophisticated simulated responses).

## Assumptions & Open Questions
- **Persistence**: Using `localStorage` for all user data (tasks, notes, finance).
- **Tech Stack**: React + Tailwind CSS + Framer Motion + Recharts + Lucide Icons.

## Affected Areas
- **Frontend**: New layout with Sidebar navigation, glassmorphism theme, and responsive sub-pages for each module.
- **State Management**: React Context or local state with persistence hooks.
- **Styling**: Global CSS updates for the "XENO" dark theme.

## Ordered Phases

### Phase 1: Foundation & Theme (frontend_engineer)
- Update `index.css` with XENO color palette (OKLCH or HSL for neons).
- Set up a Layout component with a glassmorphism Sidebar.
- Implement basic Routing for: Dashboard, Tasks, Notes, AI, Finance, Calendar, Analytics.
- Deliverable: App shell with navigation and theme.

### Phase 2: Core Modules - Content & Logic (frontend_engineer)
- **Tasks**: Create a task manager with `localStorage` sync.
- **Notes**: Implement a clean note-taking area.
- **Finance**: Create a form for transactions and a summary view.
- **AI Assistant**: Build the chat UI with "System status" and simulated AI logic.
- Deliverable: Functional standalone pages for primary tools.

### Phase 3: Analytics & Visualization (frontend_engineer)
- Integrate `recharts` for Finance and Productivity analytics.
- Build the "Dashboard" overview which aggregates data from Tasks and Finance.
- Deliverable: Visual charts and a unified "XENO" command center.

### Phase 4: Polish & Animations (quick_fix_engineer)
- Add Framer Motion transitions between routes.
- Refine glassmorphism effects (backdrop-blur, borders).
- Add micro-interactions (hover states, loading spinners).
- Deliverable: High-fidelity "Modern SaaS" feel.

### Phase 5: Final Review & Demo Data (quick_fix_engineer)
- Seed initial demo data for a "Presentation ready" look.
- Final SEO/Metadata updates in `index.html`.
- Deliverable: Fully functional and aesthetically polished ecosystem.
