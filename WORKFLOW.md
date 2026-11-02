# GridTraining Development Workflow

## Working Style

- Work from the exact latest project state pushed to the GitHub `main` branch.
- Inspect the current GitHub source before making changes.
- One meaningful checkpoint at a time.
- Keep explanations concise and code-focused.
- Fix forward when practical instead of rolling back good architectural progress.
- Do not redesign unrelated systems.

## Code Changes

- Show the complete contents of every changed file directly in chat.
- Never call a partial file "full."
- Large files may be split into clearly labeled Part 1 / Part 2 / Part 3 sections.
- Preserve existing working UI and behavior unless the change explicitly targets it.
- Do not remove code merely because it appears duplicated; verify ownership and usage first.

## Architecture

- Prefer clear responsibility-focused ownership.
- Keep styles with the system/component that owns them.
- Avoid large mixed-responsibility files.
- React + TypeScript + SCSS + Vite is the target architecture.
- Migrate existing vanilla systems incrementally rather than rewriting everything at once.
- Reuse existing working behavior as the specification during migration.

## Tooling

- Use Yarn.
- Use GitHub `main` as the authoritative project source after changes are committed and pushed.
- Do not claim typechecks, builds, or tests passed unless they were actually run successfully or Brent reports that they passed.

## Current Migration Principle

Move from:

HTML + vanilla JS + iframe pages

to:

Vite → App.tsx → React/TSX pages + React/TypeScript components

without changing the application's established appearance or behavior during the migration.
