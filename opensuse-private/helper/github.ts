import $ from "jsr:@david/dax";

const GITHUB_ORG = "https://raw.githubusercontent.com/totto2727-dotfiles";
const GITHUB_REF = "refs/heads/main";

function githubURL(repositoryName: string) {
  return `${GITHUB_ORG}/${repositoryName}/${GITHUB_REF}`;
}

export function rawURL(repositoryName: string, path: string) {
  return $.path(githubURL(repositoryName)).join(path).toString();
}

export function tokyoNightRawURL() {
  return $.path(
    "https://raw.githubusercontent.com/folke/tokyonight.nvim/refs/heads/main/extras/delta/tokyonight_moon.gitconfig",
  ).toString();
}
