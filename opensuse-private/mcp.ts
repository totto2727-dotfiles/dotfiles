import $ from "jsr:@david/dax";

function addMCPInUserScope(str: string) {
  return $`claude mcp add -s user ${str}`;
}

async function main() {
  await addMCPInUserScope("gemini-cli -- npx mcp-gemini-cli --allow-npx");
  await addMCPInUserScope(
    `--transport http totto-doc-mcp https://mcp.totto2727.workers.dev/api/mcp`,
  );
  await addMCPInUserScope(
    `--transport http context7 https://mcp.context7.com/mcp`,
  );
}

await main();
