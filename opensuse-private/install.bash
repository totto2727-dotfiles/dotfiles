#!/bin/bash

# tailscale
sudo rpm --import https://pkgs.tailscale.com/stable/opensuse/tumbleweed/repo.gpg
sudo zypper ar -g -r https://pkgs.tailscale.com/stable/opensuse/tumbleweed/tailscale.repo
# 1password
sudo rpm --import https://downloads.1password.com/linux/keys/1password.asc
sudo zypper addrepo https://downloads.1password.com/linux/rpm/stable/x86_64 1password

sudo zypper up

sudo zypper in \
  gcc podman make \
  neovim lazygit starship zoxide fzf \
  git-delta sd ripgrep fd eza \
  ghostty 1password tailscale keyd

flatpak install flathub io.podman_desktop.PodmanDesktop
flatpak install flathub app.zen_browser.zen
flatpak install flathub com.discordapp.Discord

curl https://mise.run | sh

rm ~/.config/nvim
rm ~/.local/share/nvim
rm ~/.local/state/nvim
rm ~/.cache/nvim
gh repo clone totto2727-dotfiles/nvim ~/.config/nvim

rm ~/.config/ghostty
gh repo clone totto2727-dotfiles/ghostty ~/.config/ghostty

rm ~/.config/lazygit
gh repo clone totto2727-dotfiles/lazygit ~/.config/lazygit

rm ~/.config/keyd
gh repo clone totto2727-dotfiles/keyd

bash ~/.config/dotfiles/opensuse-private/update.bash
