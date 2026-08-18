# HealthEquity Form Builder

A self-contained, browser-based form builder for internal HealthEquity teammates who
support clients. Build a form once, then distribute it either way:

1. **Fillable PDF** — a real AcroForm PDF (text fields, dropdowns, radio buttons,
   checkboxes) generated entirely in the browser, ready for clients to send to members.
2. **Hosted link** — a unique URL that renders the form as a mobile-friendly web page.
   Members fill it out online and download a completed PDF to return.

Every form carries the HealthEquity logo in the top left, with an optional client
logo (or client name) in the top right.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | The builder — for teammates creating forms |
| `form.html#d=…` | The hosted form — the link members open |

When published via GitHub Pages this lives at `/Cards/form-builder/`.

## Field types

Heading, text block, divider, single-line text, multi-line text, email, phone,
number, date, dropdown, radio buttons, checkbox group, single checkbox
(acknowledgement), and signature line. Input fields support labels, help text,
placeholders, required flags, and full/half width layout.

## How it works (no backend)

- The entire form definition (including logos) is compressed with `lz-string` and
  encoded into the URL fragment (`#d=…`). The fragment is never sent to any server,
  so hosting stays static and nothing is stored anywhere but the link itself.
- PDFs are generated client-side with `pdf-lib` (vendored in `vendor/`, no CDN
  dependency). "Completed PDF" fills the member's answers into the same fillable PDF.
- Drafts autosave to the builder's `localStorage`. Forms can also be exported and
  imported as JSON files for versioning or handoff between teammates.

## Privacy notes

- Member answers entered on the hosted form are processed only in the member's
  browser and are **never transmitted** — the completed PDF is downloaded locally
  and returned through whatever channel the client specifies.
- Don't embed member PII/PHI in form definitions (e.g., prefilled SSNs or account
  numbers) — everything in the builder becomes part of a shareable link.
- Anyone with a form link can open it. Treat links to client-specific forms as you
  would any client material.

## Development

Static files only — serve the repo root with any static server
(`python3 -m http.server`) and open `/form-builder/`. No build step.
