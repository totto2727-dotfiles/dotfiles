// deno run -A update.ts
import $ from "jsr:@david/dax";

await $`brew update`;
await $`brew upgrade`;
await $`mise update`;
