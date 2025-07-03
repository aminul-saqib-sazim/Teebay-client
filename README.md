## Installation
Make sure you have `nvm` installed. Then, run the following commands:

```bash
$ nvm use
```

We use Node v20 by default.

```bash
$ yarn install
```

## Environment Variables
For local development and testing, please create the following files at the root of the project directory:

- `env.development.local`
- `env.test.local`

You can follow `env.example` to specify which env variables are needed for the project as a guideline, and the above two files can be created based off of this file.

## Defining New Environment Variables

Traditionally, Next.js deployments using Docker need to be managed per environment (development, staging, production) because they only allow you to define the environment variables at build time. In order to get around that, we use [`next-runtime-env`](https://github.com/expatfile/next-runtime-env/tree/1.x) package which allows us to dynamically inject environment variables at runtime to the Docker image. 

If you add any new environment variables, please do the following:
1. Update `.env.example`
2. Update `shared/constants/env.constants.ts` and export the environment variable from the file. Note that we use the `env()` helper function from `next-runtime-env`.
3. After that, you can use your environment variables in application code using the variables you exported in (2).

## Conventions

Please refer to [this document](https://docs.google.com/document/d/1BVaXGcIUM_FET4XZWtSHLVjaZv1z6fp2HZ3eW1uBKlA/edit) for conventions for this repository.

Please pay special attention to [RTK-Query and Shared types folder structure](https://docs.google.com/document/d/1BVaXGcIUM_FET4XZWtSHLVjaZv1z6fp2HZ3eW1uBKlA/edit##heading=h.1jtw5xnt6dsd)

## Localization (i18n)

### Overview
The project uses `next-i18next` for internationalization with a page-based translation structure to optimize bundle size.

### Translation Structure
Translations are organized by page and common shared translations:

```sh
./public/locales
├── ar-SA
│   ├── common.json 
│   └── sign-in.json 
└── en-US
    ├── common.json // used in all pages
    └── sign-in.json // page specific translations
... other locales
```

You can have nested structures in the translation files to support translations in various use-cases (e.g. to support different verbiage based on user role in a page).

### Configuration
The i18n configuration is defined in `next-i18next.config.mjs`:
- Default locale: `en-US`
- Supported locales: `en-US`, `ar-SA`
- Locale detection is enabled
- Development mode includes hot-reload for translations

### Implementation Details

#### 1. Page-Specific Translations
To optimize bundle size, translations are loaded per page using `getStaticProps`. Each page specifically declares which namespaces it needs:

```typescript
export async function getStaticProps({ locale }: { locale?: string }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale ?? "en-US",
        ["common", "sign-in"], // Only load required namespaces
        i18nConfig
      )),
    },
  };
}
```

#### 2. Language Switching
The `LanguageSelector` component handles language switching:

- Updates the URL with the new locale
- Changes the i18n instance language
- Persists language preference in localStorage
- Maintains the current page and query parameters when switching languages

#### 3. Pluralization

This [doc](https://www.i18next.com/translation-function/plurals#languages-with-multiple-plurals) is very useful for learning about pluralization key structure for various languages.

#### 4. `useTranslation` hook

When you need to use translation, simply use the `useTranslation` hook or the `Trans` component from `next-i18next` **(important distinction: the import should NOT be from `react-i18next`)**, depending on your use-case. 

#### 5. Extending language support

To add support for a new language (e.g. Spanish), follow these steps:

1. Add the locale to `next-i18next.config.mjs`.

```
locales: ["en-US", "ar-SA", "fr-FR", "es-ES"],
```

2. Add the locale enum and selector option in `shared/components/LanguageSelector/LanguageSelector.constants.ts`:

```ts
export enum ELocale {
  // ...existing locales...
  SPANISH = "es-ES"
}

export const LANGUAGE_SELECTOR_OPTIONS = [
  // ...existing options...
  { value: ELocale.SPANISH, label: "Español" },
];
```

3. Create translation files under `public/locales/`:
```
public/locales/
└── es-ES/
    ├── common.json
    └── [other-page].json
```

4. Add translations in the newly created files following the same structure as other locales.

**Note: Make sure to follow the correct plural forms for the new language as specified in the i18next pluralization documentation.**

## Code Generation

In the Nest.js backend repo, we use Swagger to generate API schema definitions. In order to synchronize the BE and FE type definitions, we use a code generation tool ([`swagger-typescript-api`](https://www.npmjs.com/package/swagger-typescript-api/v/8.0.1)) that introspects the BE schema and generates the types in the FE. To do this:

1. Run the BE server locally
2. Update the `swagger-codegen.ts` file's `swaggerUrl` variable to point to the correct BE port in your local setup.
3. Run `yarn run swagger-codegen`

However, if you wish to manually define types, you can do that as well in the respective module(s) under `shared/redux/rtk-apis` folder and use it in the application code from there. But, this is generally discouraged because BE and FE typing gets out of sync in this way, and you end up with a lot of transformer functions to transform data between either form.

## Tests
- If you create any helper functions, please write unit tests for them.

```bash
# unit tests
$ yarn run test
```

## Run
### RUN dev server
```bash
yarn start:dev
```

### BUILD compiled
```bash
yarn build
```

### START on production server
```bash
yarn start
```

## Commit Convention
``subject(ticket-code): message``

Valid subjects:
``build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test``

## Build Actions (Local)
### Running Build Actions with the Script
- We have included a script (build-test-lint.sh) in the root directory to streamline the process of building, linting, and testing the project.
- To use the script, follow these steps:

  1. Ensure the script is executable. If not, make it executable by running:
     ```bash
     chmod +x ./build-test-lint.sh
     ```
  2. If you don't use tmux, skip to the next step.
     - If you do use tmux, make sure you run this script outside any other tmux sessions
  3. Run the script:
     ```bash
     ./build-test-lint.sh
     ```
     This will:
       - Start a new tmux session named `build-test-lint`.
       - Open three panes:
         - Pane 1: Builds the project.
         - Pane 2: Runs lint checks.
         - Pane 3: Executes tests.
  4. Once the actions are complete, you can:
     - Manually check the output in each pane for any errors or failures.
     - If necessary, take screenshot of the screen and attach the screenshot to your pull request (PR).

## Community Shadcn/UI Components

For an extensive collection of shadcn/ui-compatible components and community-driven resources, please refer to the following repository:

- [awesome-shadcn-ui: A curated list of resources related to shadcn/ui](https://github.com/birobirobiro/awesome-shadcn-ui)

This repository offers a curated selection of ready-to-use components, templates, and additional materials contributed by the broader community.

## Query Params Management with Nuqs

We use [`nuqs`](https://github.com/47ng/nuqs) for query params management throughout the project. This library provides a simple and type-safe way to read and write query parameters in Next.js apps.

### Example Usage

Below is an example of how we use Nuqs to manage query parameters for a counter, text input, and coordinates:

```tsx
import { useQueryState, parseAsInteger, useQueryStates, parseAsFloat } from "nuqs";

export default function NuqsDemoComponent() {
  const [count, setCount] = useQueryState("count", parseAsInteger.withDefault(0));
  const [text, setText] = useQueryState("text", { defaultValue: "" });
  const [coordinates, setCoordinates] = useQueryStates(
    {
      latitude: parseAsFloat.withDefault(45.18),
      longitude: parseAsFloat.withDefault(5.72),
    },
    {
      urlKeys: {
        latitude: "lat",
        longitude: "lng",
      },
    },
  );

  // ...component logic and UI...
}
```

- Changing the values will update the URL automatically.
- You can also manually change the `count`, `text`, `lat`, or `lng` parameters in the URL and see the component update.

**Note:** If you need to manage query params in a new feature, always use Nuqs for consistency and type safety.
