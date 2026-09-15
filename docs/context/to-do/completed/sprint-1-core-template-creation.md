# Sprint 1: Core Template Creation

## Objective

Build the foundational template creation system where editors can create and manage ID card templates using a canvas editor.

## Tasks

### Backend

- [x] Create `templates` table migration (already exists, verify schema matches docs)
- [x] Update `templates` table schema to match documentation (width_px, height_px, canvas_json, visibility)
- [x] Create/verify Template model with proper fillable fields and casts
- [x] Add TemplateController methods: index, show, store, update, destroy
- [x] Add routes for template CRUD operations
- [x] Implement template visibility logic (private/shared/global)

### Frontend - Canvas Editor

- [x] Set up Fabric.js canvas component with configurable dimensions
- [x] Implement canvas object management (add/remove/select)
- [x] Add text object creation with basic styling (font size, bold, italic)
- [x] Add image upload and placement on canvas
- [x] Implement object selection and manipulation (move, resize, rotate)
- [x] Add layer management UI (visibility, reordering, deletion)
- [x] Implement canvas serialization to JSON for storage
- [x] Add canvas deserialization from JSON for editing existing templates

### Frontend - Template Management

- [x] Create template listing page
- [x] Create template creation form (name, dimensions, unit, DPI)
- [x] Create template editing page with canvas editor
- [x] Add template update functionality
- [x] Implement template deletion

## Definition of Done

- Editors can create new templates with custom dimensions
- Editors can add text and images to templates
- Editors can manipulate canvas objects (move, resize, rotate)
- Editors can manage layers (visibility, reordering, deletion)
- Templates can be saved and loaded with canvas state preserved
- Templates can be edited after creation
- Templates can be deleted
