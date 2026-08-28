# Wayfinder Route Helper Usage

Wayfinder provides type-safe route helpers for Laravel routes in React/TypeScript.

## Pattern

1. Import the route module from `@/routes/[filename]` where filename matches the Laravel routes file (without .php extension)
2. Call the route method as a function to get the URL

## Example

```tsx
import templates from '@/routes/templates';

// Usage with Inertia router
router.post(templates.store(), formData, {
    onSuccess: () => {
        // handle success
    },
});
```

## Route File Mapping

| Laravel Route File     | TypeScript Import                            |
| ---------------------- | -------------------------------------------- |
| `routes/web.php`       | `import web from '@/routes/web'`             |
| `routes/templates.php` | `import templates from '@/routes/templates'` |

## Common Methods

- `routeName()` - returns the URL for the named route
- Example: `templates.store()` returns `/templates`

## Benefits

- Type-safe route references
- Auto-completion in IDE
- Prevents typos in route URLs
