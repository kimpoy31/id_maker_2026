# Template System Context Documentation

This directory contains context documentation for the template system. **Read these files before making any changes to template-related code.**

## Files

- **[00-overview.md](./00-overview.md)** - High-level overview of the ID card maker app, user roles, template creation, and the sharing/override concept.

- **[01-template-fields.md](./01-template-fields.md)** - Explains the `template_fields` table, which stores field definitions (not values). Covers key columns like `fabric_object_name` and `locked`.

- **[02-why-overrides-exist.md](./02-why-overrides-exist.md)** - Explains WHY the `template_field_overrides` table is needed and the rules governing when overrides are allowed.

- **[03-schema-reference.md](./03-schema-reference.md)** - Complete column reference for the three template-related tables: `templates`, `template_fields`, and `template_field_overrides`.

## Quick Start
1. Read `00-overview.md` to understand the system
2. Read `01-template-fields.md` to understand field definitions
3. Read `02-why-overrides-exist.md` to understand the override system
4. Reference `03-schema-reference.md` when working with database schemas
