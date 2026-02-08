---
name: use-ni-commands
description: Enforces using @antfu/ni commands instead of npm/yarn/pnpm/bun/deno. MUST ALWAYS be applied when executing any package manager command. Direct use of npm, yarn, pnpm, bun, or deno commands is strictly prohibited. Do not run node_modules/.bin directly; use nlx instead.
---

# Use @antfu/ni Commands

## Rule (CRITICAL)

**NEVER** use npm, yarn, pnpm, bun, or deno commands directly. **ALWAYS** use @antfu/ni commands instead.

Do **not** execute binaries in `node_modules/.bin` directly (e.g. `./node_modules/.bin/eslint`, `node_modules/.bin/mocha`). Use **nlx** to run packages: `nlx eslint`, `nlx mocha`.

## Command Mapping

| ni Command    | Replaces                              | Description          |
| ------------- | ------------------------------------- | -------------------- |
| `ni`          | `npm i`, `yarn`, `pnpm i`, `bun i`    | Install dependencies |
| `ni <pkg>`    | `npm i <pkg>`, `pnpm add <pkg>`       | Add package          |
| `ni -D <pkg>` | `npm i -D <pkg>`, `pnpm add -D <pkg>` | Add dev dependency   |
| `nun <pkg>`   | `npm uninstall`, `pnpm remove`        | Remove package       |
| `nr <script>` | `npm run`, `pnpm run`, `yarn run`     | Run script           |
| `nlx <pkg>`   | `npx`, `pnpm dlx`, `bunx`             | Execute package      |
| `nup`         | `npm update`, `pnpm upgrade`          | Upgrade packages     |
| `nci`         | `npm ci`, `pnpm i --frozen-lockfile`  | Clean install (CI)   |
| `nd`          | `pnpm dedupe`                         | Dedupe dependencies  |
| `na <cmd>`    | `pnpm <cmd>`, `npm <cmd>`             | Run any subcommand   |

## Examples

```bash
# Install all dependencies
ni

# Add a package
ni lodash

# Add a dev dependency
ni -D typescript

# Remove a package
nun lodash

# Run a script
nr build
nr test
nr dev

# Execute a package
nlx create-react-app my-app
nlx tsc --init

# Upgrade packages
nup

# Clean install for CI
nci

# Run arbitrary subcommand
na outdated
na audit
```

## Prohibited Commands

The following commands are **strictly prohibited**:

- `npm install`, `npm i`, `npm run`, `npm exec`, `npx`
- `yarn`, `yarn add`, `yarn run`
- `pnpm install`, `pnpm i`, `pnpm add`, `pnpm run`, `pnpm dlx`
- `bun install`, `bun add`, `bun run`, `bunx`
- `deno install`, `deno run`, `deno task`
- Direct execution of `node_modules/.bin` (e.g. `./node_modules/.bin/eslint`). Use `nlx <pkg>` instead.
