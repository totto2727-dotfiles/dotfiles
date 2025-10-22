#!/usr/bin/env -S deno run --allow-env --allow-read --allow-run="/opt/homebrew/bin/brew"

import $ from "jsr:@david/dax";

await $`echo "=== Formulae ==="`;
await $`brew leaves -r`;
await $`echo ""`;
await $`echo "=== Casks ==="`;
await $`brew list --cask -1`;
