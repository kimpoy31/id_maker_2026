# ID Card Maker App Overview

This is an ID card maker application where users can create and fill out ID card templates.

## User Roles
There are 3 user roles in the system:
- **Admin** - Full system access
- **Editor** - Creates and manages reusable ID templates
- **User** - Fills out templates that have been shared with them

## Template Creation
An "editor" builds a reusable ID template using a canvas editor (powered by Fabric.js). The template contains various fillable fields such as:
- "Full Name"
- "Branch Address"
- "Company Logo"
- Employee photo
- Department
- Position

## Template Sharing
A template can be shared with other users in two ways:
1. **Specific sharing** - Shared to named users directly
2. **Global sharing** - Available to all logged-in users

This is controlled by the `visibility` column on the templates table with these values:
- `private` - Only visible to the creator
- `shared` - Shared to specific users
- `global` - Available to everyone logged in

## The Override Problem
When a template is shared to different offices or branches, they may need slightly different values for some fields. For example:
- The same template shared to a Manila branch and a Cebu branch
- Both need the same company logo and ID layout
- But each needs a different "Branch Address" field value

This is where the override system comes in — allowing shared templates to have per-user customizations for specific fields while keeping the master template intact.
