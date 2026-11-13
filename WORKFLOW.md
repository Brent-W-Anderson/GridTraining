# GridTraining Development Workflow

## Working Style

- Work from the latest user-provided snapshot or explicitly requested GitHub branch; inspect affected files before editing.
- One focused checkpoint at a time. Fix forward; do not redesign unrelated working code.
- Keep responses brief, practical, and code-focused.
- Show the **complete contents of every changed file directly in chat**, without omissions or snippet-only replacements.
- Preserve working tabs, QuickNav, scrollbars, and page behavior unless the checkpoint explicitly changes them.
- Never claim tests or builds passed without actually running them.

## Mission: Visual Field Companion

GridTraining is a mobile-friendly, step-by-step field companion for residential fiber Installation & Repair technicians, including technicians with limited English proficiency.

**Show the work rather than describe it.**

No filler, long introductions, repeated explanations, quizzes, or unnecessary reading.

- **Diagrams first:** Show connections, routing, equipment placement, and expected finished work.
- **Real equipment photos and relevant demonstration videos:** Prioritize close-ups and visible actions over narration.
- **One action per step:** Short labels and direct instructions, with a corresponding visual.
- **Complete job workflows:** Start → installation or diagnosis → verification → documentation.
- **Essential text only:** Keep acronyms, troubleshooting, safety, warnings, and necessary descriptions.
- **Safety and accuracy are never sacrificed for brevity.** Use approved provider and manufacturer procedures for clearances, utility work, live fiber, testing, and activation.

## Main Navigation (Target Structure)

1. **Role & Network** — Finished page; preserve unchanged.
2. **Outside Installation** — Aerial drops, buried drops, routing, attachments, slack boxes, house entry; distinct complete walkthroughs within one tab.
3. **FDH & Distribution** — FDH cabinets, splitters, documented assignments, terminals, Calix equipment, residential and apartment/MDU distribution. FDH is a passive distribution hub; Calix is a manufacturer, not an equivalent term.
4. **Inside Installation** — ONT/SmartNID, gateway, activation, Ethernet, Wi-Fi, and customer-device verification.
5. **Troubleshooting** — Preserve current page initially; later improve visual symptom-driven fault isolation.
6. **Field Cheat Sheet** — Preserve current page; fast diagrams, measurements, and checklists.
7. **Acronyms** — Preserve current reference.
8. **Tools & Inventory** — Preserve current reference.

The old Learning Manual content must be **reorganized, not discarded**, into the appropriate job topics.

Avoid duplicate authoritative explanations.

The seven earlier curriculum priorities remain subject matter to cover, **not seven required manual chapters**.

## Standard Walkthrough

1. **Whole-job diagram** — What connects where and what completion looks like.
2. **Demonstration** — Relevant real-world photos/video when available and verified.
3. **Illustrated steps** — One action per step, minimal wording.
4. **Verification** — Concise tests, visual checks, documentation, and escalation criteria.

Build **Outside Installation → Aerial Drop** as the first model walkthrough after the navigation checkpoint.

## Technical Accuracy

- Distinguish general fiber/PON principles, manufacturer-specific equipment, provider rules, and GridSource practices.
- Verify manufacturer links and technical claims; never invent port numbering, optical thresholds, provisioning procedures, or work permissions.
- Use work orders, facility records, labels, and observed connections as separate evidence.
- Resolve conflicts through approved verification/escalation; never guess or move unverified live jumpers.
- Distinguish MLT from MST until the team's local terminology is confirmed.

## Architecture and Design

- React + TypeScript + Vite + SCSS with Yarn.
- Put substantial lesson text, diagram labels/data, video references, and equipment details in **typed config**.
- TSX owns rendering and interactions; SCSS is colocated with its owner.
- Use responsibility-focused page/component directories.
- Split specialized visuals into dedicated components only when warranted.
- Maintain accessible expandable cards, working QuickNav, responsive layouts, large touch targets, and no horizontal overflow.
- Reuse the finished Role & Network visual language without modifying that page.

## Checkpoints and Validation

1. Restructure main navigation only; preserve existing working pages and scrolling.
2. Build the Aerial Drop visual walkthrough and establish its reusable pattern.
3. Expand other job workflows one focused checkpoint at a time.
4. Run Yarn typecheck/build when available; accurately report what was verified.
5. Update this document only when the goals, structure, or development rules materially change; keep it concise.
