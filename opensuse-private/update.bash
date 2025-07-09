#!/bin/bash

sudo zypper up

curl https://raw.githubusercontent.com/totto2727-dotfiles/bash/refs/heads/main/.alias >~/.alias
curl https://raw.githubusercontent.com/totto2727-dotfiles/bash/refs/heads/main/.bashrc >~/.bashrc
curl https://raw.githubusercontent.com/totto2727-dotfiles/bash/refs/heads/main/.profile >~/.profile
curl https://raw.githubusercontent.com/totto2727-dotfiles/bash/refs/heads/main/.inputrc >~/.inputrc
curl https://raw.githubusercontent.com/totto2727-dotfiles/bash/refs/heads/main/starship.toml >~/.config/starship.toml
curl https://raw.githubusercontent.com/totto2727-dotfiles/bash/refs/heads/main/docker-credential-gh >~/.local/bin/docker-credential-gh

git -C ~/.config/nvim pull
git -C ~/.config/ghostty pull
git -C ~/.config/lazygit pull
