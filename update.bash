#!/bin/bash

git -C ~/.config/nvim pull

curl -L https://github.com/totto2727-dotfiles/zettlr/raw/refs/heads/main/install.bash >bash
# 編集中コンテンツとコンフリクトを避けるために無効化
# git -C ~/zettelkasten pull
