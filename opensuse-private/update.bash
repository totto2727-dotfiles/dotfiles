#!/bin/bash

GITHUB_ORG='https://raw.githubusercontent.com/totto2727-dotfiles'
GITHUB_REF='refs/heads/main'

GITHUB_PATH() {
  echo "$GITHUB_ORG/$1/$GITHUB_REF"
}

sudo zypper up

mise install
mise self-update
mise up

# bash
curl "$(GITHUB_PATH bash)/.alias" >~/.alias
curl "$(GITHUB_PATH bash)/.bashrc" >~/.bashrc
curl "$(GITHUB_PATH bash)/.profile" >~/.profile
curl "$(GITHUB_PATH bash)/.inputrc" >~/.inputrc
curl "$(GITHUB_PATH bash)/starship.toml" >~/.config/starship.toml

# podman
curl "$(GITHUB_PATH bash)/auth.json" >~/.config/containers/auth.json
curl "$(GITHUB_PATH bash)/registries.conf" >~/.config/containers/registries.conf
curl "$(GITHUB_PATH bash)/docker-credential-gh" >~/.local/bin/docker-credential-gh
chmod 500 ~/.local/bin/docker-credential-gh

# git
curl "$(GITHUB_PATH git)/.gitconfig" >~/.gitconfig
mkdir -p ~/.config/git
curl "$(GITHUB_PATH git)/delta.gitconfig" >~/.config/git/delta.gitconfig
curl "$(GITHUB_PATH git)/user.gitconfig" >~/.config/git/user.gitconfig
curl "$(GITHUB_PATH git)/ignore" >~/.config/git/ignore
curl "https://raw.githubusercontent.com/folke/tokyonight.nvim/refs/heads/main/extras/delta/tokyonight_moon.gitconfig" >~/.config/git/tokyonight_moon.gitconfig

# update dotfiles
git -C ~/.config/nvim pull
git -C ~/.config/ghostty pull
git -C ~/.config/lazygit pull
git -C ~/.config/mise pull
git -C ~/.config/keyd pull

#keyd
curl "$(GITHUB_PATH keyd)/default.conf" | sudo /etc/keyd/default.conf
sudo keyd reload
keyd-application-mapper
