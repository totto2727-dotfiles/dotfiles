import $ from "jsr:@david/dax";

async function main() {
  await $`git config set user.email kaihatu.totto2727@gmail.com`;
  await $`git config set user.name totto2727`;
}

await main();
