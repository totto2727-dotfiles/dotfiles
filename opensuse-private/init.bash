#!/bin/bash

sudo zypper up 
sudo zypper in git gh
cd ~/.config
gh auth login
gh repo clone totto2727-dotfiles/dotfiles -- --recursive
cd ~/.config/dotfiles/opensuse-private
