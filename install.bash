#!/bin/bash

rm -r ~/.config/nvim
git clone git@github.com:totto2727-dotfiles/nvim.git ~/.config/nvim

curl -L https://github.com/totto2727-dotfiles/zettlr/raw/refs/heads/main/install.bash >bash
git clone git@github.com:totto2727/zettelkasten.git ~/zettelkasten
