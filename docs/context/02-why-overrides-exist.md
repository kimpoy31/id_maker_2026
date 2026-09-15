# Why Template Field Overrides Exist

## The Problem
The `template_fields` table defines each field once for the entire template. However, when a template is shared to multiple offices or branches, they may need different values for certain fields.

**Example Scenario:**
- A template is shared to 10 different offices
- The template has an unlocked "Branch Address" field
- Each of the 10 offices needs to save THEIR OWN different address value for that same field
- They must do this WITHOUT editing the master template
- Their changes must NOT affect what the other 9 offices see

## Why template_fields Can't Solve This
The `template_fields` table only has one row per field, shared by everyone. It cannot store 10 different values for the same field. It's designed to store field DEFINITIONS, not user-specific VALUES.

## The Solution: template_field_overrides
A new table `template_field_overrides` stores ONE saved value per field per user. This means:
- The same field (e.g., "Branch Address") can have a different saved value for User A than for User B
- Each user's override is independent — changing User A's override doesn't affect User B
- The master template remains unchanged

## Important Rules

### Rule 1: Overrides Only for UNLOCKED Fields
If a field is `locked = true` in `template_fields`, no override is ever created for it. Locked fields always show the master template's value for every user, no exceptions.

**Reasoning:** If a field is locked, the editor has decided it should be the same for everyone. Overrides would defeat that purpose.

### Rule 2: Overrides Only Affect CONTENT
Overrides only change the literal CONTENT of a field:
- For text fields: the text string
- For image fields: the image file path

Overrides NEVER change styling:
- Font size
- Bold/italic
- Position
- Dimensions
- Colors
- Any other canvas properties

All styling always comes from the master template's canvas data, even for fields a user has overridden. Only the text or image itself changes.

## Summary
`template_field_overrides` enables per-user customizations of shared templates while preserving:
- The master template's integrity
- The editor's control over locked fields
- Consistent styling across all users
- Independence between different users' customizations
