FIBER INSTALLATION & REPAIR TECHNICIAN TRAINING - FIELD GUIDE

SETUP:
Run: yarn install

This runs scripts/download-images.ps1 automatically and makes sure all training images are available.
After setup, run: yarn run

This opens src\index.html in your default browser.

TABS:
1. Role & Network
2. Learning Manual
3. Field Cheat Sheet
4. Troubleshooting

CURRENT BUILD INCLUDES:
- Accordion/dropdown organization across the training pages
- Clickable completion checkboxes
- Acronym/full-name glossary shown before page content
- Start-to-finish job workflow in the Learning Manual
- Connecteam time-clock / jobs / GPS behavior grounded in Connecteam public documentation
- QMate workflow framework with unverified company-specific buttons/statuses clearly marked instead of invented
- Google Maps latitude/longitude instructions for Android, iPhone/iPad and computer
- Field-sketch checklist and buried-route/dig-request documentation workflow
- OLT / ODN / ONT / OSP / MST fundamentals
- Real OSP, MST/terminal, handhole, pedestal and closure photos
- ASW vs BSW workflow
- Q1000K SmartNID and W1700K/W1701K training
- Fiber connector cleanliness and laser-safety reminders
- OPM / VFL / OTDR tool selection
- Layer-by-layer troubleshooting and equipment light states
- Install / repair verification, customer handoff and closeout guidance
- 16 of 16 training images included in this snapshot

IMPORTANT:
Current GridSource / Quantum SOP always wins for optical thresholds, burial depth,
clearances, attachment hardware, provisioning, QMate status codes, sketch symbols,
safety, required photos and closeout rules.

RESEARCH LIMITATION:
No authoritative public GridSource/Quantum QMate technician manual was found during the
2026-10-30 research pass. QMate-specific tap-by-tap instructions must be filled from
GridSource training, screenshots or verified live workflow rather than guessed.

PROJECT STRUCTURE:
src/index.html
src/index.scss
src/pages/pages.js
src/pages/role/index.html
src/pages/manual/index.html
src/pages/cheat/index.html
src/pages/troubleshooting/index.html
src/assets/images/
src/assets/references/sources.txt
scripts/download-images.ps1
scripts/run.ps1
package.json
yarn.lock
.yarnrc.yml

ORGANIZATION
------------
src/ contains the application itself.
src/pages/ contains page content and shared page behavior.
src/index.scss is the current shared page stylesheet beside src/index.html; it can be split by ownership in later cleanup steps.
src/assets/references/ contains the research/source ledger supporting the training content.
scripts/ contains project utilities such as the training-image downloader and browser launcher.
Yarn is configured to use the normal node_modules linker instead of Plug'n'Play.