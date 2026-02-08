// deno run -A update.ts
import $ from "jsr:@david/dax";
import * as os from "node:os";

export function getHomeDirectory() {
  return os.homedir();
}

export function homePath(filePath: string) {
  return $.path(getHomeDirectory()).join(filePath).toString();
}

await $`brew update`;
await $`brew upgrade`;
await $`mise upgrade`;
await $`fd -g -p '**/npm-*/**/bin/**' ~/.local/share/mise/installs/ | xargs sd '#!/usr/bin/env node' '#!/usr/bin/env bun'`;
