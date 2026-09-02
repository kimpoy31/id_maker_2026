# Template System Development Sprints

This directory breaks down the template system implementation into manageable sprints.

## Sprint Structure

Each sprint file contains:
- **Objective** - Clear goal for the sprint
- **Tasks** - Detailed checklist of work items
- **Definition of Done** - Criteria for sprint completion

## Sprints

### [Sprint 1: Core Template Creation](./sprint-1-core-template-creation.md)
Build the foundational template creation system where editors can create and manage ID card templates using a canvas editor.

**Status:** In Progress

**Key Tasks:**
- Canvas editor with Fabric.js
- Template CRUD operations
- Object manipulation (text, images)
- Layer management

### [Sprint 2: Template Fields System](./sprint-2-template-fields.md)
Implement the `template_fields` table to define fillable fields on templates, linking canvas objects to field definitions.

**Status:** Pending

**Key Tasks:**
- template_fields table and model
- Field definition UI
- Canvas object linking
- Image storage integration

### [Sprint 3: Template Field Overrides](./sprint-3-template-field-overrides.md)
Implement the `template_field_overrides` table to allow per-user customizations of shared templates for unlocked fields.

**Status:** Pending

**Key Tasks:**
- template_field_overrides table and model
- Override editing UI
- Canvas rendering with overrides
- Override validation logic

### [Sprint 4: Template Sharing System](./sprint-4-template-sharing.md)
Implement template sharing functionality with visibility controls (private/shared/global) and user-specific sharing.

**Status:** Pending

**Key Tasks:**
- Visibility controls
- User-specific sharing
- Template discovery
- Permission system

## Sprint Progress

### In Progress
- Sprint 1: Core Template Creation

### Completed
- None yet

### Pending
- Sprint 2: Template Fields System
- Sprint 3: Template Field Overrides
- Sprint 4: Template Sharing System

## Notes
- Sprints should be completed in order as they build on each other
- Move sprint files to `in-progress/` when starting work
- Move sprint files to `completed/` when finished
- Update this README to reflect current status
