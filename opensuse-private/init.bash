#!/bin/bash

sudo zypper up
sudo zypper in git gh deno

cd ~/.config

gh auth login

mkdir -p ~/.local/share/gnome-shell/extensions
#ln -s /usr/share/keyd/gnome-extension-45 ~/.local/share/gnome-shell/extensions/keyd
mkdir -p ~/.local/share/gnome-shell/extensions/keyd
curl https://raw.githubusercontent.com/rvaiya/keyd/refs/heads/master/data/gnome-extension-45/extension.js >~/.local/share/gnome-shell/extensions/keyd/extension.js
curl https://raw.githubusercontent.com/rvaiya/keyd/refs/heads/master/data/gnome-extension-45/metadata.js >~/.local/share/gnome-shell/extensions/keyd/metadata.json

echo reboot
