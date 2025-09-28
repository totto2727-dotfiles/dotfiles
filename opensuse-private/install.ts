import $ from "jsr:@david/dax";
import * as os from "node:os";
import {
  configPath,
  homePath,
  localSharePath,
  localStatePath,
} from "./helper/path.ts";
import { rawURL } from "./helper/github.ts";
import { exist } from "./helper/which.ts";

async function main() {
  // tailscale
  await $`sudo rpm --import https://pkgs.tailscale.com/stable/opensuse/tumbleweed/repo.gpg`;
  await $`sudo zypper ar -g -r https://pkgs.tailscale.com/stable/opensuse/tumbleweed/tailscale.repo`;

  //1password
  await $`sudo rpm --import https://downloads.1password.com/linux/keys/1password.asc`;
  await $`sudo zypper addrepo https://downloads.1password.com/linux/rpm/stable/x86_64 1password`;

  await $`sudo zypper dup`;
  await $`sudo zypper in ${[
    "gcc",
    "podman",
    "make",
    "neovim",
    "lazygit",
    "starship",
    "zoxide",
    "fzf",
    "yazi",
    "git-delta",
    "sd",
    "ripgrep",
    "fd",
    "eza",
    "ghostty",
    "1password",
    "tailscale",
    "keyd",
    "pavucontrol",
  ]}`;

  await Promise.all([
    "io.podman_desktop.PodmanDesktop",
    "app.zen_browser.zen",
    "com.discordapp.Discord",
  ].map((v) => $`flatpak install ${v}`));

  await exist("mise") || await $`curl https://mise.run | sh`;

  const nvimConfigPath = configPath("nvim");
  await $`rm ${nvimConfigPath}`;
  await $`rm ${localSharePath("nvim")}`;
  await $`rm ${localStatePath("nvim")}`;
  await $`rm ${homePath(".cache/nvim")}`;
  await $`gh repo clone totto2727-dotfiles/nvim ${nvimConfigPath}`;

  const ghosttyConfigPath = configPath("ghostty");
  await $`rm ${ghosttyConfigPath}`;
  await $`gh repo clone totto2727-dotfiles/ghostty ${ghosttyConfigPath}`;

  const lazygitConfigPath = configPath("lazygit");
  await $`rm ${lazygitConfigPath}`;
  await $`gh repo clone totto2727-dotfiles/lazygit ${lazygitConfigPath}`;

  const keydConfigPath = configPath("keyd");
  await $`rm ${keydConfigPath}`;
  await $`gh repo clone totto2727-dotfiles/keyd ${keydConfigPath}`;
  await $`sudo usermod -aG keyd ${os.userInfo().username}`;
  await $`sudo systemctl enable --now keyd`;
  await $`gnome-extensions enable keyd`;

  const claudeConfigPath = homePath(".claude");
  await $`gh repo clone totto2727-dotfiles/claude ${claudeConfigPath}`;

  await $`deno run -A ${rawURL("dotfiles", "opensuse-private/update.ts")}`;

  await $`sudo zypper rm deno`;
}

await main();
