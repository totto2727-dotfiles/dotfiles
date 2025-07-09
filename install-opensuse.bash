#!/bin/bash

sudo zypper in neovim starship

curl https://raw.githubusercontent.com/totto2727-dotfiles/bash/refs/heads/main/.alias > ~/.alias
curl https://raw.githubusercontent.com/totto2727-dotfiles/bash/refs/heads/main/.bashrc > ~/.bashrc
curl https://raw.githubusercontent.com/totto2727-dotfiles/bash/refs/heads/main/.profile > ~/.profile
curl https://raw.githubusercontent.com/totto2727-dotfiles/bash/refs/heads/main/.inputrc > ~/.inputrc
