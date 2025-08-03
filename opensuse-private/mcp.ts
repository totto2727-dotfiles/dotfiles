import $ from "jsr:@david/dax";

async function main() {
  await $`claude mcp add -s user gemini-cli -- npx mcp-gemini-cli --allow-npx`;
  await $`claude mcp add -s user --transport http totto-doc-mcp https://mcp.totto2727.workers.dev/api/mcp`;
}

await main();
