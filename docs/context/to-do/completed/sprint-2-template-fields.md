# Sprint 2: Template Fields System

## Objective

Implement the `template_fields` table to define fillable fields on templates, linking canvas objects to field definitions.

## Tasks

### Backend

- [x] Create `template_fields` table migration with schema from documentation
- [x] Create TemplateField model with relationship to Template
- [x] Add Template model relationship to TemplateField (hasMany)
- [x] Create TemplateFieldController for CRUD operations
- [x] Add routes for template field management
- [x] Implement validation for template field creation/updates
- [x] Add API endpoint to get all fields for a template
- [x] Add API endpoint to create/update/delete template fields

### Frontend - Field Definition UI

- [x] Add field creation UI in template editor
- [x] Implement field type selection (text/image)
- [x] Add field label input
- [x] Add required/locked toggles
- [x] Implement fabric_object_name assignment (auto-generate or manual)
- [ ] Add sort_order management (drag and drop reordering)
- [x] Display field list in template editor sidebar

### Canvas Integration

- [x] Link canvas objects to template fields via fabric_object_name
- [x] Auto-assign fabric_object_name when creating canvas objects
- [ ] Sync canvas object properties with template field definitions
- [ ] Highlight canvas objects that are linked to fields
- [x] Prevent deletion of canvas objects that are linked to required fields

### Image Storage

- [x] Set up Laravel storage for uploaded images (public disk)
- [x] Create image upload endpoint
- [x] Store images and return storage paths
- [x] Update image upload handlers to use API instead of base64
- [ ] Save image paths to template_fields (default_image_path)

## Definition of Done

- Template fields can be created, updated, and deleted
- Fields are linked to canvas objects via fabric_object_name
- Field properties (label, type, required, locked, sort_order) are configurable
- Images uploaded to canvas are stored in Laravel storage
- Image paths are saved to template_fields
- Field list displays in template editor with all properties
- Canvas objects are properly linked to their field definitions
