# GridTraining Development Workflow

## Working Style

- Work from the exact latest project snapshot provided by the user, or current GitHub `main` when that is the requested source. Do not assume an older snapshot is current.
- Inspect relevant source files before making changes.
- Complete one meaningful checkpoint at a time, keeping the seven training priorities below intact.
- Keep explanations concise and code-focused. Fix forward without redesigning unrelated systems.

## Code Delivery

- Show the **complete contents of every changed file directly in chat**, ready to copy and paste. Do not substitute download links or abbreviated snippets.
- Large files may be split into clearly labeled consecutive parts, with no omitted lines.
- Preserve existing working behavior, QuickNav, tabs, and scrollbars unless explicitly changing them.
- Never claim a build, typecheck, or test passed unless it was actually run successfully.

## Training Mission

Create an accurate, practical, beginner-friendly and field-useful residential fiber Installation & Repair reference for GridSource technicians working with AT&T and legacy Quantum Fiber infrastructure. The app must work well on phones. Keep explanations short and clear without omitting details needed to perform the job safely and correctly. Do not add quizzes or tests.

### Seven Curriculum Priorities (Authoritative)

1. **The complete residential fiber network** — OLT → FDH → distribution terminal → drop → ONT → gateway → customer devices.
2. **FDH cabinets and fiber assignments** — cabinet anatomy, splitter ports, cross-connects, labeling, and mispatch troubleshooting. Include detailed instruction for finding assigned ports and tracing a customer's documented path, supported by trustworthy diagrams and relevant training videos.
3. **MLT / MST terminals and customer drops** — terminal identification, port assignments, drop connections, and field faults. Confirm what “MLT” means in the team's terminology; do not assume it is synonymous with MST.
4. **ONTs, gateways, and service activation** — optical status, registration, provisioning, and residential equipment.
5. **Fiber testing and repair** — optical power, dB/dBm, connectors, cleaning, fault isolation, and escalation.
6. **WAN, LAN, and residential Wi-Fi** — router configuration, IP connectivity, Wi-Fi coverage, mesh systems, and pods.
7. **Fast field references** — symptoms, diagnostic sequences, equipment pictures, and common mistakes.

### Where Content Belongs

- **Role & Network (Tab 1):** Short introduction to technician responsibilities, service path, field work, and troubleshooting mindset. Four QuickNav chapters; avoid turning it into the full technical manual.
- **Learning Manual (Tab 2):** Teach the seven priorities in appropriate detail, especially FDH identification and fiber assignments. Use clear diagrams, equipment pictures, and verified video resources where helpful.
- **Troubleshooting:** Practical symptom-driven fault isolation and escalation.
- **Field Cheat Sheet:** Concise, mobile-friendly references and procedures.
- **Acronyms:** Fast definitions of technical terms.
- **Tools & Inventory:** Equipment recognition, purpose, safe use, and maintenance.

These destinations organize the curriculum; they do not replace or renumber its seven priorities. Avoid repeating long explanations across tabs: link or refer to the detailed owner where possible.

## Content Accuracy and Safety

- Distinguish general fiber/PON principles, equipment-specific documentation, provider procedures, and GridSource-specific practices.
- Verify technical details against authoritative manufacturer or industry sources. Never invent port numbering, optical thresholds, provisioning steps, or work permissions.
- Treat work orders, facility records, labels, and observed connections as separate evidence. If they conflict, use approved verification/escalation procedures rather than guessing or moving live jumpers.
- Include relevant training videos where they materially improve understanding, and explain what each actually demonstrates.

## Design and Architecture

- React + TypeScript + Vite + SCSS, using Yarn.
- Keep substantive training content in typed config files; React components own presentation and interaction; SCSS lives with the owning page/component.
- Keep the existing polished chapter-card design: icons, chapter numbers, short descriptions, full-card tap targets, clear open/closed state, and accessible keyboard behavior.
- Prioritize mobile field use: readable text, generous tap targets, restrained colors for tips/warnings/safety, and no page-wide horizontal overflow. Prefer a plain chevron without a decorative circle.
- Preserve the current navigation and layout systems unless a specific change requires modifying them.

## Validation

- Run Yarn typecheck/build when execution is available; report exactly what was and was not verified.
- Review small-screen behavior, expandable sections, QuickNav, tables, images, and links when possible.
- Update this workflow only when project goals, rules, or architecture materially change; keep it concise and curated.
