# Wayfinder Route Helper Usage

Wayfinder provides type-safe route helpers for Laravel routes in React/TypeScript.

## Pattern

1. Import the route module from `@/routes/[filename]` where filename matches the Laravel routes file (without .php extension)
2. Import main routes from `@/routes` for web routes
3. Call the route method as a function to get the URL object
4. Use `.url` to get the URL string for href attributes

## Examples

### With Inertia Router

```tsx
import templates from '@/routes/templates';

router.post(templates.store(), formData, {
    onSuccess: () => {
        // handle success
    },
});
```

### With Link Component

```tsx
import { dashboard } from '@/routes';
import { Link } from '@inertiajs/react';

<Link href={dashboard()} className="btn">
    Back to Dashboard
</Link>;
```

### With Anchor Tags

```tsx
import templatesRoute from '@/routes/templates';

<a href={templatesRoute.show(template.name).url}>View Template</a>;
```

### With Route Parameters

```tsx
// Route: /templates/{name}
templatesRoute.show(template.name).url;
// Returns: /templates/my-template-name
```

## Route File Mapping

| Laravel Route File     | TypeScript Import                                 |
| ---------------------- | ------------------------------------------------- |
| `routes/web.php`       | `import { dashboard } from '@/routes'`            |
| `routes/templates.php` | `import templatesRoute from '@/routes/templates'` |

## Common Methods

- `routeName()` - returns the URL object for the named route
- `routeName(params).url` - returns the URL string for href attributes
- Example: `templates.store()` returns URL object
- Example: `templatesRoute.show(template.name).url` returns `/templates/my-template-name`

## Benefits

- Type-safe route references
- Auto-completion in IDE
- Prevents typos in route URLs
- Parameter validation
