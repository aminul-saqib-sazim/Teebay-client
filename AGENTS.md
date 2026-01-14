## Project Structure

```
core-platform-web/
├── modules/          # Feature modules (auth, dashboard, forgot-password, invite, reset-password, settings, sign-in, sign-up, users)
├── shared/           # Shared code across modules
│   ├── components/   # Reusable UI components
│   ├── constants/    # Application constants
│   ├── hooks/        # Custom React hooks
│   ├── layouts/      # Layout components
│   ├── lib/          # Library configurations and utilities
│   ├── oauth/        # OAuth related code
│   ├── providers/    # React context providers
│   ├── redux/        # Redux store, slices, and thunks
│   ├── typedefs/     # TypeScript type definitions
│   └── utils/        # Utility functions
├── pages/            # Next.js pages (using .page.tsx convention)
├── lib/              # Core library utilities
├── infra/            # Infrastructure (dockerfiles)
├── styles/           # Global styles (globals.css)
├── scripts/          # Build and utility scripts
└── public/           # Static assets
```

## DO's

- Use self-documenting code - code should explain itself without comments
- Prefix new interfaces with `I`, types with `T` and enums with `E`
- Always use `rem` units as opposed to `px` units
- Prefer aliased imports over multi-layer relative imports
- Extract magic values to constants
- Keep types, form helpers, constants and components in separate files. E.g.
  - `Component.tsx`
  - `Component.types.ts`
  - `Component.helpers.ts`
  - `Component.constants.ts`
  - `index.ts` (barrel file for exporting everything)
- Use aliased imports.
- Use barrel files (index.ts) to export from folders.

## DONT's

- **DON'T** Add useless comments
- **DON'T** Skip tests when modifying components/hooks/reducers
- **DON'T** Use inline styles; use TailwindCSS
- **DON'T** Use absolute paths without configured aliases
- **DON'T** Use `yarn build` to verify changes. Use `npx tsc --noEmit` instead.
- **DON'T** Use relative imports, fix existing issues in files that are being worked on.
- **DON'T** Use `any` type in new functions/files. Use `unknown` if the structure is actually not known.
- **DON'T** Use string literal union types. Use enums instead.
- **DON'T** Use hardcoded color values like `text-[#eeeeee]`. Always extend Tailwind theme and use the color through variable.
- **DON'T** Put constants (e.g., initial values) in types files. Keep them in helpers or a separate constants file.
