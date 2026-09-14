# MPF — App wireframes

Interactive wireframes for **Machine Plant Fitters Ltd.** — the fitter's phone app
and the workshop's admin backend. No build, no dependencies; each page is a single
self-contained HTML file.

| File | What it is |
| --- | --- |
| `index.html` | Portal landing page — pick a wireframe |
| `full.html` | Full access user — raise a sheet and assign it |
| `fitter.html` | Fitter (general access) — do the work, 5 steps |
| `admin.html` | MPF admin backend (8 sections) |
| `server.js` | Zero-dependency static server for Railway |

Every page links back to the portal, so the whole set click-throughs as one.

---

## 1 · The two frontends

Two separate wireframes, switchable from the pill under the phone or from the
portal. Both share the MPF shell: home with clock in/out, a **Job Card** tile in
Quick Access, and the bottom Home / Profile bar.

### `full.html` — full access (Stuart)

Raising and handing out work. **Assigning a job needs only the job details and
the person** — everything else belongs to the fitter.

- **New job sheet** is a short form: machine (typed in, with an optional fleet
  no.), equipment type, workshop or site (+ site contact), job type, fault, then
  **Assign to**. Machine and fault are required; the fitter can be left blank and
  handed out later. A machine that is not in the catalogue still displays
  correctly everywhere — the icon comes from the equipment type.
- **Scope switcher** on the list — My sheets / Unassigned / Everyone — with
  **Assign** / **Reassign** on any open sheet, and a banner for anything sitting
  unclaimed.
- Opening a sheet gives a **read-only overview**: job details, who has it, and
  the fitter's progress (4-step ribbon, work done, parts, checklist, signature, PO).
  Nothing on it can be edited from a full access account.

### `fitter.html` — general access (Declan Byrne)

Doing the work. **Four steps — Start, Work, Parts, End** — with the service
checklist, parts modal, photos, signature and completion, then the office
sign-off link that requires a PO number.

There is no Details step: the machine, site, contact and job type were set by
whoever raised the sheet, so the fitter never re-enters them. They appear instead
as a read-only brief at the top of **Start** — machine, where, site contact and
the fault — so the fitter can see what they are walking into.

A fitter raising their own sheet gets the same short details form first (without
the Assign to field, since it is theirs), then drops straight into Start.

A general access user can still **create their own job sheet** and work it; they
simply cannot hand sheets to anybody else, so they get no scope switcher, no
assign buttons and no unassigned banner.

Access is data-driven: the `access` field in the `FITTERS` list at the top of each
script decides which of the two experiences a person gets, matching the Employees
table in the backend.

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
4. **Employees** — who is on the clock, open sheets each, what they are on now,
   hours this week, and each person's **access level** (the same field the two
   frontends read). *Full Access* can assign
   job cards to other users; *General Access* can only work the cards assigned to
   them. Stuart is the only full-access user. Tapping the access pill switches a
   person's level.
5. **Timesheets** — week grid of hours per fitter per day from the clock, with
   booked vs unbooked totals and per-fitter approval.
6. **Plant register** — every machine with fleet no, hour meter, last service and
   whether a service is due or overdue.
7. **Customers & sites** — sites, who signs off, sheets raised and POs received.
8. **Settings** — the service checklist template (toggle rows on and off), job
   types, the PO-required rule and chase reminders, the two access levels, and
   office contacts.

Interactive throughout: navigation, search, filters, assigning an unassigned
sheet, chasing a PO, approving a timesheet week, and toggling checklist rows all
work. Buttons that would leave the wireframe (export CSV/PDF, add machine/part/
site) say so when clicked rather than pretending.

## Deploying

Railway serves the folder with `server.js` (`npm start`). `index.html` is the
portal, so the deployed root lands on the wireframe picker.
