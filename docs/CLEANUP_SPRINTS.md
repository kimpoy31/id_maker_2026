# ID Maker — Cleanup & Hardening Sprints

> Companion to CONTEXT.md / PROJECT.md / SCHEMA.md / STACK.md.
> Goal: eliminate the "AI slop" accumulated from parallel, unreconciled
> generations — merge conflicts left in source, duplicate components,
> schema/type mismatches, dead pages, and unenforced policies — before
> any new feature work continues.

## How to use this file
1. Read a sprint's **Findings** to understand *why* it exists (real bugs found in the repo, with file paths).
2. When ready to execute, say "generate the prompt for Sprint N" and a copy-pasteable, tool-specific prompt will be produced for that sprint (written for a free/lighter coding model like Windsurf's — explicit about file paths, naming conventions, and scope, since weaker models tend to guess wrong on both).
3. Do sprints **in order**. Later sprints assume earlier ones are done (e.g. Sprint 1 fixes the schema that Sprint 2's canvas depends on).
4. After each sprint, update `SCHEMA.md`/`CONTEXT.md` per the existing project rules and re-paste them next session.

---

## Sprint 0 — Stop the Bleeding (De-conflict & De-duplicate)
**Why:** The repo currently cannot build cleanly and has three unreconciled
implementations of the same feature.

### Findings
- `resources/js/pages/editor/components/EditorCanvas.tsx` contains **unresolved Git merge-conflict markers** (`<<<<<<< HEAD` / `=======` / `>>>>>>> feat/template-creation`) committed directly into source.
- Three separate "canvas editor" implementations exist and none of them agree on props or units:
  - `resources/js/components/editor/CanvasEditor.tsx` (imperative-handle API, used by `pages/editor/templates/edit.tsx` — a page **no route renders**)
  - `resources/js/pages/editor/components/EditorCanvas.tsx` (broken by merge conflict, used by `pages/editor/EditorPage.tsx` — a page **no route renders**)
  - `resources/js/pages/editor/show.tsx` — the page that **is** actually routed (`routes/editor.php` → `EditorController::show` → `Inertia::render('editor/show', ...)`) renders **no canvas at all**; the body is commented out and replaced with an empty `<h1></h1>`.
- Two competing "Create Template" flows: `components/CreateTemplateModal.tsx` and `pages/templates/components/TemplateForm.tsx`, with different field names and both live in the tree.
- `resources/js/pages/templates/show.tsx` references a `Template` shape (`width`, `height`, `unit: string`, `dpi`) that doesn't match `types/template.ts`'s stricter `TemplateVisibility`/`unit: 'inches' | 'pixels'` union, and isn't imported from the shared type at all — it declares its own local `Template` interface.

### Tasks
- [ ] Resolve the merge conflict in `EditorCanvas.tsx`; decide canonical version or delete the file (see Sprint 1 — it's being replaced anyway).
- [ ] Delete `pages/editor/EditorPage.tsx`, `pages/editor/components/EditorCanvas.tsx`, and `pages/editor/templates/`, `components/editor/`(temporary) once Sprint 1 lands the single canonical component — **do not delete yet**, just confirm which one is canonical before Sprint 1 starts.
- [ ] Delete `components/CreateTemplateModal.tsx` OR `pages/templates/components/TemplateForm.tsx` — keep exactly one create-template flow. Recommendation: keep `TemplateForm.tsx` (uses `useForm`, matches STACK.md's "Forms use Inertia `useForm`" rule); delete the modal.
- [ ] Make `pages/templates/show.tsx` import `Template` from `@/types/template` instead of declaring a local interface.
- [ ] Run `npm run types:check` and `npm run lint:check` and fix everything that surfaces once dead files are removed (imports will break).

### Definition of Done
- Zero merge-conflict markers anywhere in `resources/js` or `app` (grep for `<<<<<<<`).
- Exactly one canvas-editor component, one create-template flow, no unrouted page components left in the tree.
- `npm run types:check` passes.

---

## Sprint 1 — Fix the Schema/Type/Column Mismatches
**Why:** Templates are currently created with `width = 0, height = 0` because
the controller writes to columns that don't exist and are silently dropped
by Eloquent's `$fillable` guard, and unit strings don't match between DB,
types, and the canvas component's conversion logic.

### Findings
- `TemplateController::store()` builds:
  ```php
  Template::create([
      'width_px'   => $widthPx,
      'height_px'  => $heightPx,
      'input_unit' => $validated['unit'] === 'in' ? 'inches' : 'pixels',
      ...
  ]);
  ```
  but `Template::$fillable` (and the actual migration `2026_08_26_030109_create_templates_table.php`, and `SCHEMA.md`) only defines **`width`, `height`, `unit`**. `width_px`/`height_px`/`input_unit` are not fillable, so Eloquent drops them — every new template saves with `width`/`height` unset.
- `types/template.ts` defines `unit: 'inches' | 'pixels'`, but `components/editor/CanvasEditor.tsx`'s `CanvasEditorProps.unit` expects `'px' | 'mm' | 'in'`, and `pages/editor/templates/edit.tsx` force-casts across the mismatch with `as 'px' | 'mm' | 'in'`. Neither `'inches'` nor `'pixels'` ever matches inside `CanvasEditor`'s `if (unit !== 'px') { if (unit === 'in') ... else if (unit === 'mm') ... }` branch, so the DPI conversion silently never runs.
- `SCHEMA.md`'s documented `templates` table (`width_px`, `height_px`, no `unit`/`dpi` columns, `user_id` as the FK name) does not match the real migration (`width`, `height`, `unit`, `dpi`, `creator_id`). The doc is stale and actively misleading — this is likely *why* the controller bug above happened.
- `docs/context/03-schema-reference.md` also documents `creator_id` correctly but a different `templates` shape (`width_px`/`height_px` again) than the live migration — a second stale doc disagreeing with the first stale doc.
- `users` table has **no `email` column** (see `0001_01_01_000000_create_users_table.php` — only `role`, `name`, `username`, `password`), but `database/factories/UserFactory.php` sets `'email' => fake()->unique()->safeEmail()`, which will throw on `User::factory()->create()` in any seeder/test that uses it.

### Tasks
- [ ] Fix `TemplateController::store()` to use `width`, `height`, `unit` (matching `$fillable`), and fix the update path (`EditTemplateModal.tsx` posts `width`/`height`/`unit`/`dpi` correctly already — leave it, just make the controller consistent).
- [ ] Pick **one** unit vocabulary and use it everywhere: DB enum, `types/template.ts`, canvas props, and every form. Recommendation: standardize on `'in' | 'px'` (matches the actual create-form `<select>` values in `TemplateForm.tsx` and `docs/to-do-prompt.md`'s original spec) and migrate the DB enum from `('inches','pixels')` to `('in','px')` with a new migration + data backfill.
- [ ] Rewrite `SCHEMA.md`'s `templates` table section to match the real migration exactly (`creator_id`, `width`, `height`, `dpi`, `unit`, `canvas_json`, `visibility`) — SCHEMA.md is supposed to be the source of truth per its own header; right now it isn't truthful.
- [ ] Reconcile `docs/context/03-schema-reference.md` with `SCHEMA.md` — there must be exactly one schema reference doc, not two disagreeing ones. Recommend deleting the `docs/context/` version and pointing its README at root `SCHEMA.md`.
- [ ] Remove the `email` field from `UserFactory::definition()` (it isn't a real column) or add an `email` migration if the project actually wants it — pick one; right now the factory will crash the moment anyone calls it.
- [ ] Add a regression test: create a template via `TemplateController::store`, assert `width`/`height`/`unit` are persisted non-null/non-zero.

### Definition of Done
- Creating a template via the UI results in a DB row with correct non-zero `width`/`height` and a `unit` value the canvas component actually recognizes.
- `SCHEMA.md` and `docs/context/03-schema-reference.md` agree with the live migrations and with each other (or the duplicate is deleted).
- `UserFactory` can run without error.

---

## Sprint 2 — One Canonical Canvas Editor, Correctly Routed
**Why:** Depends on Sprint 0 (duplicates removed) and Sprint 1 (correct
width/height/unit). This sprint makes the canvas actually appear on screen
and actually be the right size.

### Findings
- The only routed editor page, `pages/editor/show.tsx`, renders no canvas (see Sprint 0).
- Neither surviving canvas candidate has an `imageUploadUrl` wired to the existing `ImageUploadController` (`app/Http/Controllers/ImageUploadController.php`) — images are read as base64 blobs client-side (`EditTemplateModal`'s sibling `edit.tsx` FileReader logic) and never hit the storage endpoint that already exists.
- No canvas component persists `canvas_json` back to the server — Sprint 4/5 of `CONTEXT.md`'s original plan ("Save canvas: `canvas.toJSON(['name'])`") was never implemented in the routed page.
- `routes/templates.php` has no `edit`/`show`/`update`/`destroy` routes — only `index` and `store`. `EditTemplateModal.tsx` already calls `templates.update(template.name)` via Wayfinder against a route that doesn't exist in `routes/templates.php` at all (and passes `template.name`, a string, as if it were an ID).

### Tasks
- [ ] Build one canonical `CanvasEditor` component (merge the best parts of the two candidates: imperative ref API for adding objects + toolbar/zoom UI), place it at `resources/js/components/Editor/CanvasEditor.tsx` per `STACK.md`'s documented folder convention (`Components/Editor/`), not scattered across `pages/editor/components` and `components/editor`.
- [ ] Wire `pages/editor/show.tsx` to actually render it, passing the template's real `width`/`height`/`unit`/`dpi`/`canvas_json`.
- [ ] Add `GET /templates/{template}/edit`, `PUT /templates/{template}`, `DELETE /templates/{template}` to `routes/templates.php`, backed by policy checks (`TemplatePolicy@update`/`@delete`), using route-model binding (`Template $template`) instead of manual `findOrFail` lookups scattered through `TemplateController`/`TemplateFieldController`.
- [ ] Add a "Save" action on the canvas page that POSTs `canvas.toJSON(['name'])` to the new `PUT` route.
- [ ] Wire image objects added to the canvas through `ImageUploadController`'s existing `/upload` endpoint instead of embedding base64 in `canvas_json`.
- [ ] Fix `EditTemplateModal.tsx` to pass `template.id` (not `template.name`) to `templates.update()`.

### Definition of Done
- Visiting `/template/{id}/editor` shows a canvas sized correctly to the template's stored dimensions.
- Editing a template, adding objects, and reloading the page preserves the canvas state.
- Uploaded images are stored via the storage disk, not embedded as base64 in the JSON column.

---

## Sprint 3 — Template Fields: Wire the Backend to a UI
**Why:** `TemplateFieldController` (full CRUD) and the `template_fields`
table exist and are correct, but there is **no frontend that calls them at
all** — the "field marking" feature described in `CONTEXT.md` Sprint 4 and
`docs/context/01-template-fields.md` has zero UI.

### Findings
- No component reads or writes `fabric_object_name` in the format `field:snake_label` that `STACK.md` mandates — the convention is documented but never enforced or even referenced in code.
- No `FieldList` component exists anywhere in `resources/js/Components` despite being named explicitly in `STACK.md`'s folder convention and `CONTEXT.md` Sprint 4 checklist.
- `TemplateFieldController` methods don't run through `TemplatePolicy` — they do their own inline `where('creator_id', Auth::id())` ownership check, which means an `admin` (who should "do everything an editor can" per `PROJECT.md`) is silently locked out of managing another editor's fields, contradicting the documented role rules.

### Tasks
- [ ] Build a "mark as field" interaction in the canonical `CanvasEditor`: selecting an object → a small modal to set label/type/required/locked → sets the Fabric object's `name` to `field:{snake_label}` and calls `POST /templates/{id}/fields`.
- [ ] Build `Components/Editor/FieldList.tsx`: lists fields for the current template, sourced from `GET /templates/{id}/fields`, with required/locked toggles (`PATCH`) and delete (`DELETE`), matching the existing controller contract exactly (no new endpoints needed — the backend is already done).
- [ ] Replace `TemplateFieldController`'s manual `where('creator_id', Auth::id())` checks with `$this->authorize('update', $template)` so admins are correctly included.
- [ ] Add a small helper (e.g. `app/Support/FabricFieldName.php` or a TS util) that generates/validates the `field:snake_label` format in one place, instead of leaving the convention as a comment in `STACK.md` that nothing enforces.

### Definition of Done
- An editor can mark a canvas object as a field, see it in a field list, toggle required/locked, and delete it — all persisted.
- An admin can do the same on a template they didn't create.

---

## Sprint 4 — Sharing: Wire the Backend to a UI (Same Pattern as Sprint 3)
**Why:** `TemplateShare` model + migration + `TemplateShareWithRelations` TS
type all exist. There is no `TemplateShareController`, no user-search
endpoint, and no UI — despite being core to `PROJECT.md`'s stated MVP scope
("editor sets visibility ... shares to specific users").

### Findings
- `STACK.md` explicitly names `TemplatShareController` (note: typo preserved from the doc) as a planned controller under `Editor/` — it does not exist in `app/Http/Controllers`.
- `resources/js/Components/Shared/UserSearchCombobox.tsx` and `VisibilitySelector.tsx`, named in `STACK.md`'s folder plan, don't exist.
- No `GET /users/search?q=` endpoint exists (also named explicitly in `CONTEXT.md` Sprint 3 tasks), so there's no way to build the sharing UI even if the component existed.
- `TemplatePolicy@view` already correctly handles `shared` visibility via `$template->shares()->where(...)`, so the read-side authorization is ready and waiting for data to actually exist in that table.

### Tasks
- [ ] Create `App\Http\Controllers\Editor\TemplateShareController` with a `sync(Request $request, Template $template)` action that replaces the template's `template_shares` rows from a submitted array of user IDs, gated by `TemplatePolicy@update`.
- [ ] Add `GET /users/search?q=` (simple `name`/`username` `LIKE` query, paginated/limited to ~10, excluding the current user) for the typeahead.
- [ ] Build `VisibilitySelector.tsx` (private/shared/global radio group) and `UserSearchCombobox.tsx`, both under `resources/js/Components/Shared/` per the documented convention.
- [ ] Wire both into the template edit page: switching to `shared` reveals the combobox; saving calls the sync endpoint.
- [ ] Enforce server-side (per `STACK.md`'s own rule) that `shared_user_ids` is only processed when `visibility === 'shared'` — currently nothing enforces this because the endpoint doesn't exist yet.

### Definition of Done
- An editor can set a template to shared/global/private and pick specific users, and those users see it in their `User/Templates/Index` list (build that list page too if still missing — check `pages/User/` before starting; it may not exist yet either).

---

## Sprint 5 — Authorization & Route Consistency Pass
**Why:** Policy checks are inconsistently applied — some controllers call
`$this->authorize()`, some hand-roll `Auth::user()->role !== 'admin'`
checks, and the middleware alias doesn't match what `STACK.md` documents.

### Findings
- `STACK.md` says the role middleware is `EnsureRole` (`EnsureRole:admin`, `EnsureRole:editor,admin`). The actual middleware class is `App\Http\Middleware\CheckRole`, registered under the alias `'CheckRole'` in `bootstrap/app.php`, and it isn't parameterized (it hardcodes `['admin', 'editor']` inside the class rather than accepting roles as middleware arguments like `STACK.md`'s example implies).
- `UserController` (admin CRUD) does inline `Auth::user()->role !== 'admin'` checks (`authorizeAdmin()` private method) instead of a `UserPolicy`, unlike `TemplateController`/`EditorController` which correctly use `$this->authorize()`.
- `routes/users.php` doesn't route to `UserController` at all — it's a closure that renders `users/index` with **no `users` prop**, while `UserController::index()` (which does supply the prop) is never reached by any route. `CreateUserModal`/`EditUserModal` therefore post to `/users` routes that also don't exist in `routes/users.php` (only `GET /users` exists).
- No route groups by role prefix (`admin.*`, `editor.*`, `user.*`) exist as `STACK.md` and `CONTEXT.md` both specify — routes are flat and rely entirely on in-controller checks, which is what caused the `users.php` disconnect above to go unnoticed.

### Tasks
- [ ] Rename `CheckRole` → `EnsureRole` (or update `STACK.md` to match reality — pick one direction and make the docs and code agree) and make it accept roles as middleware parameters: `EnsureRole:admin` / `EnsureRole:editor,admin`, replacing the hardcoded array.
- [ ] Rewrite `routes/users.php` to actually route `index`/`store`/`update`/`destroy` to `UserController`, under `EnsureRole:admin`, grouped with a `admin.` name prefix.
- [ ] Convert `UserController`'s inline admin checks to a real `UserPolicy` for consistency with `TemplatePolicy`.
- [ ] Introduce the `admin.*` / `editor.*` / `user.*` named route groups across `routes/web.php`, `templates.php`, `editor.php`, `users.php` as originally planned, so route names communicate the access tier instead of relying purely on middleware.

### Definition of Done
- Every controller action is protected by exactly one consistent mechanism (policy or route middleware, not both duplicated, not neither).
- `routes/*.php` and `STACK.md` describe the same middleware names and route groups.
- Admin user management actually works end-to-end (currently broken — the modals post to non-existent routes).

---

## Sprint 6 — Test Coverage for Everything Above
**Why:** `tests/Feature` and `tests/Unit` currently contain only the
Laravel starter-kit example tests. None of the real behavior — roles,
policies, template CRUD, sharing, fields — has any coverage, which is how
Sprints 0–1's bugs shipped silently in the first place.

### Tasks
- [ ] Feature tests for `TemplatePolicy` (private/shared/global visibility × admin/editor/user role matrix).
- [ ] Feature test asserting `TemplateController::store` persists correct `width`/`height`/`unit` (locks in Sprint 1's fix).
- [ ] Feature tests for `TemplateFieldController` CRUD, including the admin-can-manage-others'-fields case from Sprint 3.
- [ ] Feature tests for the new `TemplateShareController` sync endpoint from Sprint 4.
- [ ] Feature test for `UserController` role-change guardrails (last-admin protections already coded — just untested).
- [ ] Add these to CI (`composer.json`'s `ci:check` already runs `@php artisan test` — no CI config change needed, just write the tests).

### Definition of Done
- `composer test` covers role/policy/visibility matrices, not just the framework smoke test.
- CI (`.github/workflows/tests.yml`) is green.

---

## Suggested order & rough sizing
| Sprint | Depends on | Size |
|---|---|---|
| 0 — De-conflict & de-duplicate | — | S |
| 1 — Schema/type/column fixes | 0 | M |
| 2 — Canonical canvas editor | 0, 1 | L |
| 3 — Template fields UI | 2 | M |
| 4 — Sharing UI | 2 (not strictly 3) | M |
| 5 — Authz/route consistency | — (can run parallel to 2-4) | M |
| 6 — Tests | all above | M |
