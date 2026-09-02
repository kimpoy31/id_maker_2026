# Sprint 4: Template Sharing System

## Objective
Implement template sharing functionality with visibility controls (private/shared/global) and user-specific sharing.

## Tasks

### Backend
- [ ] Verify/update `templates` table visibility column (enum: private/shared/global)
- [ ] Create `template_shares` table migration (if not already exists)
- [ ] Create TemplateShare model with relationships
- [ ] Add Template model relationships for shares
- [ ] Add TemplateController methods for sharing:
  - [ ] Share template with specific users
  - [ ] Make template global
  - [ ] Revoke sharing
  - [ ] Get shared templates for current user
- [ ] Add routes for sharing operations
- [ ] Implement visibility logic in template queries:
  - [ ] Private: only creator
  - [ ] Shared: creator + explicitly shared users
  - [ ] Global: all authenticated users
- [ ] Add validation for sharing operations
- [ ] Implement share revocation

### Frontend - Sharing UI
- [ ] Add visibility selector in template creation/edit form
- [ ] Create template sharing interface
- [ ] Add user search/selection for sharing to specific users
- [ ] Display current sharing status
- [ ] Add "Make Global" option for editors
- [ ] Show list of users template is shared with
- [ ] Add revoke sharing buttons
- [ ] Display visibility badge on template cards

### Template Discovery
- [ ] Create "Shared with Me" template listing page
- [ ] Create "Global Templates" listing page
- [ ] Update main template listing to show all accessible templates
- [ ] Add visibility indicators in template lists
- [ ] Filter templates by visibility
- [ ] Search shared templates

### Permissions & Access Control
- [ ] Implement permission checks for template access
- [ ] Ensure only creators can edit their templates
- [ ] Ensure only creators can change visibility
- [ ] Ensure users can only fill templates shared with them
- [ ] Prevent unauthorized template modifications
- [ ] Add middleware for template access control

## Definition of Done
- Templates can be set to private, shared, or global
- Templates can be shared with specific users
- Templates can be made globally available
- Sharing can be revoked
- Users can see templates shared with them
- Users can access global templates
- Visibility is properly enforced
- Permission checks prevent unauthorized access
- Sharing UI is intuitive and functional
