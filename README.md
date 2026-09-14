# MPF — App wireframes

Interactive wireframes for **Machine Plant Fitters Ltd.** — the fitter's phone app
and the workshop's admin backend. No build, no dependencies; each page is a single
self-contained HTML file.

| File | What it is |
| --- | --- |
| `index.html` | Portal landing page — pick a wireframe |
| `mobile.html` | Fitter mobile app (5 step job sheet + clock in/out) |
| `admin.html` | MPF admin backend (8 sections) |
| `server.js` | Zero-dependency static server for Railway |

Every page links back to the portal, so the whole set click-throughs as one.

---

## 1 · Fitter mobile app — `mobile.html`

Built to the **Plant job sheet** wireframes: a five step job sheet
(Start → Details → Work → Parts → End) reached from a job sheets list, plus the
clock in / clock out on the app's home screen. Machines only — every sheet is
against a machine, never a registration.

Branded for **Machine Plant Fitters Ltd.** — the MPF red (`--red: #D3302A`), black
(`--mpf-black: #1C1C1C`) and white, with the logo redrawn as inline SVG (the
`MPF()` helper) so it stays sharp at any size. It appears on the masthead, in the
job sheets header, and as the letterhead on the office sign-off page.

Otherwise styled to match the live driver app (red header and cards, emoji tiles,
bottom tab bar) and presented in the same shell as the other mobile demos: studio
backdrop, phone frame, and a **Restart demo** pill under the phone.

The fitter is **Stuart**.

## The screens

**Home** — the app's dashboard. Clock In / Clock Out beside Switch in the red
hero, and a single **Job Card** tile in Quick Access.

**Plant job sheets** — white header with the back button, title and
"Job cards & service records". Filter chips **All / Active / Draft / Done** with
counts. Each sheet shows `#JC-1148 — Sunward SWE25UF — repair`, a status pill,
`2026-09-07 · Stuart`, `Step n of 5` and a **View PDF** button, with a coloured
left edge (green complete, red active). A floating **+ New Job Sheet** button
starts a fresh one.

**Job sheet** — red header with the job number, a `NEW` / `OPEN` / `DONE` tag,
and the five step tabs. Tabs are tappable directly, or use Next / back.

1. **Start** — fitter's name, date, start and end time. Total hours is derived
   from the two times and is read-only.
2. **Details** — equipment type, make & model, serial no., machine hours, then
   site and contact number, then the job type as radio cards
   (Service / Repair / 12 week inspection & tyres).
3. **Work** — the service checklist as a table with **Checked** and **Failed**
   columns (16 rows), then work performed, job photos, comments and additional
   notes.
4. **Parts** — "No parts added yet." until you use **+ Add part**, which opens
   the Add Part modal (part name, part number, quantity). Picking a catalogue
   part fills the part number in; it stays editable.
5. **End** — a read-back of equipment, site, job type, date, times and total
   hours, then the signature row and **Complete job sheet**.

**Office sign-off link** — a completed sheet can be sent to the office, who open
a read-only copy and must enter a **PO number** before they can sign. Their
signature and PO come back onto the sheet. **View PDF** on any row opens the same
read-only view.

## One role

The prototype is the **fitter's** app. There is no role switcher — the real app
signs you in as one person. Raising and assigning sheets from an admin side is
not in this build.

## Rules built in

- You must be clocked in before starting a job sheet; the list says so and the
  new-sheet button sends you back to Home.
- The checklist treats **Checked** and **Failed** as mutually exclusive, and
  tapping the same box again clears it.
- A sheet cannot be completed without a signature.
- Marking any checklist row moves a sheet from Draft to Active.
- The three chips map onto the underlying statuses: Draft = not started,
  Active = in progress / awaiting PO, Done = signed.

## Notes for the backend

- Equipment types, models, sites, the service checklist and the parts catalogue
  are hard-coded lists at the top of the `<script>`.
- Job numbers increment from `S.seq` in the browser only — real numbering should
  be server-assigned.
- Sheets seeded before the wizard existed are filled in lazily by `norm()`, so
  the step fields always exist without rewriting the seed data.
- `po` must be required server-side too — the sign-off endpoint should reject a
  signature with no PO number.
- Photos are a count only; there is no real camera or upload in the prototype.
- The logo is a redraw, not the supplied artwork — swap `MPF()` for the real
  asset before this goes anywhere real. The red is my read of the logo; it is one
  line at the top of the stylesheet if you have the exact brand hex.
- Machine fleet numbers (`SVPH…`) and the site codes are left as they were, on the
  basis that they belong to the customers whose machines MPF services.
- All bars, sheets, the Add Part modal and the office page are positioned inside
  the phone frame (absolute, not fixed), so nothing escapes the mockup.


---

## 2 · MPF admin backend — `admin.html`

Desktop back office, following the same pattern as the other admin demos: fixed
black sidebar with the MPF mark, sticky topbar, light content area with KPI tiles
and tables. Eight sections:

1. **Dashboard** — unassigned / open / awaiting-PO / on-the-clock / hours KPIs, a
   *Needs attention* table for sheets with no fitter, a *Waiting on the office*
   table, and recent sheets with a progress bar for the 5 steps.
2. **Job sheets** — every sheet, searchable across job no, machine, fleet no,
   fitter and site, filtered All / Draft / In progress / Awaiting PO / Complete.
   Rows open the sheet.
3. **Job sheet detail** — read-only copy of what the fitter filled in: machine,
   fault, work carried out, labour, the marked checklist rows (checked in green,
   failed in red), parts, photos, and the sign-off panel with the PO number.
4. **Fitters** — who is on the clock, open sheets each, what they are on now, and
   hours this week.
5. **Timesheets** — week grid of hours per fitter per day from the clock, with
   booked vs unbooked totals and per-fitter approval.
6. **Plant register** — every machine with fleet no, hour meter, last service and
   whether a service is due or overdue.
7. **Customers & sites** — sites, who signs off, sheets raised and POs received.
8. **Settings** — the service checklist template (toggle rows on and off), job
   types, the PO-required rule and chase reminders, and office contacts.

Interactive throughout: navigation, search, filters, assigning an unassigned
sheet, chasing a PO, approving a timesheet week, and toggling checklist rows all
work. Buttons that would leave the wireframe (export CSV/PDF, add machine/part/
site) say so when clicked rather than pretending.

## Deploying

Railway serves the folder with `server.js` (`npm start`). `index.html` is the
portal, so the deployed root lands on the wireframe picker.
