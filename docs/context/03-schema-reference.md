# Database Schema Reference

This document provides the complete column definitions for the three template-related tables.

## templates table

| Column | Type | Notes |
|--------|------|-------|
| id | bigint | Primary key |
| creator_id | bigint | Foreign key to users table |
| name | varchar | Template name |
| width_px | decimal/int | Canvas width in pixels |
| height_px | decimal/int | Canvas height in pixels |
| canvas_json | json | Serialized Fabric.js canvas data |
| visibility | enum | Values: private, shared, global |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

## template_fields table

| Column | Type | Notes |
|--------|------|-------|
| id | bigint | Primary key |
| template_id | bigint | Foreign key to templates table, cascade on delete |
| fabric_object_name | varchar(100) | Must match Fabric.js canvas object name |
| label | varchar(100) | Human-readable field label |
| field_type | enum | Values: text, image |
| required | boolean | Default: true |
| sort_order | int | Default: 0 |
| locked | boolean | Default: false |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

## template_field_overrides table

| Column | Type | Notes |
|--------|------|-------|
| id | bigint | Primary key |
| template_field_id | bigint | Foreign key to template_fields table |
| user_id | bigint | Foreign key to users table |
| value | text (nullable) | Holds text content OR image file path depending on field_type |
| created_at | timestamp | Creation timestamp |
| updated_at | timestamp | Last update timestamp |

**Unique constraint:** (template_field_id, user_id) — ensures one override per user per field
