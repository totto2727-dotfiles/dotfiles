import $ from "jsr:@david/dax";
import process from "node:process";

async function main() {
  const cwd = process.cwd();
  await $`claude mcp add serena -- uvx --from git+https://github.com/oraios/serena serena-mcp-server --context ide-assistant --project ${cwd}`;
}

await main();
