#!/bin/bash

sudo zypper in neovim starship gcc ghostty

rm ~/.config/nvim
rm ~/.local/share/nvim
rm ~/.local/state/nvim
rm ~/.cache/nvim
gh repo clone totto2727-dotfiles/nvim ~/.config/nvim

gh repo clone totto2727-dotfiles/ghostty ~/.config/ghostty

bash ~/.config/dotfiles/opensuse-private/update.bash
