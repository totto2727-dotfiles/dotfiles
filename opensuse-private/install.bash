#!/bin/bash

sudo zypper in neovim starship gcc ghostty lazygit podman

flatpak install flathub io.podman_desktop.PodmanDesktop

rm ~/.config/nvim
rm ~/.local/share/nvim
rm ~/.local/state/nvim
rm ~/.cache/nvim
gh repo clone totto2727-dotfiles/nvim ~/.config/nvim

rm ~/.config/ghostty
gh repo clone totto2727-dotfiles/ghostty ~/.config/ghostty

rm ~/.config/lazygit
gh repo clone totto2727-dotfiles/lazygit ~/.config/lazygit

bash ~/.config/dotfiles/opensuse-private/update.bash
