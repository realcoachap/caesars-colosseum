# Round 5 — Build Your Own Brutus 🪲

## Objective
Build a QA testing script that scans your own CardVault app, then fix every issue it finds.

## Requirements

### Part 1: Build the QA Bot (`scripts/brutus.ts`)
Create a TypeScript script at `scripts/brutus.ts` that:

1. **TypeScript Check** — Run `npx tsc --noEmit` and capture ALL errors
2. **Page Route Scan** — Verify every page in `src/app/` exports a valid default component
3. **Design Token Audit** — Grep the codebase for:
   - Any hex color that isn't `#f59e0b` (gold), `#0a0f1c` (navy), `#ffffff`, or standard grays
   - Any `border-radius` that isn't `16px`, `12px`, `10px`, `999px`, or `24px`
   - Any hardcoded pixel widths over 500px (breaks mobile)
4. **Import Validation** — Check that every `import` statement resolves to a real file
5. **Empty State Check** — Verify each page has an empty/loading state (search for "loading", "empty", "skeleton", or "no data" patterns)
6. **BottomNav Consistency** — Verify BottomNav component is imported on every page

### Part 2: Run It
Execute your brutus script and save output to `scripts/brutus-report.txt`

### Part 3: Fix Everything
Fix EVERY issue your Brutus found. Zero TypeScript errors. Zero broken imports. Zero design token violations.

### Part 4: Run Again
Re-run Brutus after fixes. The report should be CLEAN.

## Deliverables
1. `scripts/brutus.ts` — the QA bot
2. `scripts/brutus-report.txt` — first run (showing bugs found)
3. `scripts/brutus-clean.txt` — second run (showing clean pass)
4. All fixes committed

## Scoring Rubric (100 points)
| Category | Points | What I'm Looking For |
|---|---|---|
| Brutus Quality | 25 | Does it actually find real bugs? Thorough checks? |
| Bugs Found | 15 | How many genuine issues did it surface? |
| Fix Quality | 30 | Did they actually fix everything? Clean code? |
| Clean Report | 20 | Second run shows 0 issues? |
| Spec Compliance | 10 | All 4 deliverables present? |

## Design Standards (same as always)
- Gold: `#f59e0b` ONLY
- Dark surface: `rgba(255,255,255,0.05)` with `border: 1px solid rgba(255,255,255,0.1)`
- Border radius: 16px cards, 999px pills, 24px sheets
- All interactive elements: `whileTap={{ scale: 0.97 }}`
- BottomNav on every page
- Mobile-first (max-width 480px content area)

## Commit Convention
```
git commit -m "R5: Build Brutus QA bot"
git commit -m "R5: Fix [X] issues found by Brutus"
git commit -m "R5: Clean Brutus report — 0 issues"
```
