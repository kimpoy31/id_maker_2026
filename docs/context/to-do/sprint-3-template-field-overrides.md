# Sprint 3: Template Field Overrides

## Objective
Implement the `template_field_overrides` table to allow per-user customizations of shared templates for unlocked fields.

## Tasks

### Backend
- [ ] Create `template_field_overrides` table migration with schema from documentation
- [ ] Add unique constraint on (template_field_id, user_id)
- [ ] Create TemplateFieldOverride model with relationships
- [ ] Add TemplateField relationship to TemplateFieldOverride (hasMany)
- [ ] Add User relationship to TemplateFieldOverride (hasMany)
- [ ] Create TemplateFieldOverrideController for CRUD operations
- [ ] Add routes for override management
- [ ] Implement validation: overrides only allowed for unlocked fields
- [ ] Add API endpoint to get user's overrides for a template
- [ ] Add API endpoint to create/update/delete overrides
- [ ] Implement logic to merge master template data with user overrides

### Frontend - Override UI
- [ ] Add override editing interface for users filling templates
- [ ] Show field values from master template by default
- [ ] Allow editing only for unlocked fields
- [ ] Display override indicators for fields with user customizations
- [ ] Add text input for text field overrides
- [ ] Add image upload for image field overrides
- [ ] Implement save/reset override functionality
- [ ] Show "locked" status for fields that cannot be overridden

### Canvas Rendering with Overrides
- [ ] Modify canvas loading logic to apply user overrides
- [ ] For text fields: replace text with override value if exists
- [ ] For image fields: replace image path with override value if exists
- [ ] Keep all styling from master template (position, size, font, etc.)
- [ ] Ensure locked fields always show master template values
- [ ] Handle missing overrides (fall back to master template)

### Template Sharing Integration
- [ ] Update template visibility logic to work with overrides
- [ ] Ensure global/shared templates load with user's overrides
- [ ] Test override isolation between different users
- [ ] Verify that one user's override doesn't affect another user

## Definition of Done
- Users can create overrides for unlocked fields
- Overrides are isolated per user (unique constraint enforced)
- Locked fields cannot have overrides
- Canvas renders with user overrides applied correctly
- Styling always comes from master template
- Text and image overrides work correctly
- Reset override functionality works
- Template sharing works with override system
