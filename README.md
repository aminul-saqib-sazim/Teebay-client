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
