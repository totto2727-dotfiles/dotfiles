#!/bin/bash

sudo zypper up

curl https://raw.githubusercontent.com/totto2727-dotfiles/bash/refs/heads/main/.alias >~/.alias
curl https://raw.githubusercontent.com/totto2727-dotfiles/bash/refs/heads/main/.bashrc >~/.bashrc
curl https://raw.githubusercontent.com/totto2727-dotfiles/bash/refs/heads/main/.profile >~/.profile
curl https://raw.githubusercontent.com/totto2727-dotfiles/bash/refs/heads/main/.inputrc >~/.inputrc
curl https://raw.githubusercontent.com/totto2727-dotfiles/bash/refs/heads/main/starship.toml >~/.config/starship.toml

curl https://raw.githubusercontent.com/totto2727-dotfiles/bash/refs/heads/main/docker-credential-gh >~/.local/bin/docker-credential-gh
chmod 500 ~/.local/bin/docker-credential-gh
curl https://raw.githubusercontent.com/totto2727-dotfiles/bash/refs/heads/main/auth.json >~/.config/containers/auth.json
curl https://raw.githubusercontent.com/totto2727-dotfiles/bash/refs/heads/main/registries.conf >~/.config/containers/registries.conf

git -C ~/.config/nvim pull
git -C ~/.config/ghostty pull
git -C ~/.config/lazygit pull
