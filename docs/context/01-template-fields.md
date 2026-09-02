# Template Fields Table

The `template_fields` table stores the FIELD DEFINITIONS for a template — not the actual values that users fill in.

## Purpose
Each row in `template_fields` represents one fillable spot on the canvas. Examples:
- A "Full Name" text field
- A "Branch Address" text field  
- A "Company Logo" image field
- An employee photo placeholder

## Key Columns

### fabric_object_name (varchar 100)
This is the critical linking column. It must match the `name` property set on the actual Fabric.js canvas object. This allows the application to know which canvas shape corresponds to which field definition.

Example: If a canvas object has `name: "full_name_field"`, the corresponding `template_fields` row must have `fabric_object_name: "full_name_field"`.

### locked (boolean, default false)
The editor decides, per field, whether someone filling out this template later is allowed to change that field's value.

**Examples:**
- `locked = true` for "Company Logo" — nobody can change it, it's fixed for everyone
- `locked = false` for "Branch Address" — each office can set their own address

When a field is locked, no override can ever be created for it. All users see the same value.

### Other Important Columns
- `field_type` (enum: text/image) — Defines whether this field holds text or an image
- `required` (boolean, default true) — Whether the field must be filled out
- `sort_order` (int, default 0) — Controls the display order of fields in the UI
- `label` (varchar 100) — Human-readable label for the field (e.g., "Full Name")

## Important Distinction
`template_fields` does NOT store any actual filled-in values. It only stores:
- The field's definition (type, label, required status)
- The field's rules (locked, sort_order)
- The link to the canvas object (fabric_object_name)

Actual user-filled values are stored in a separate table (`template_field_overrides`).
