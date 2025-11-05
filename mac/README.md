# mac

## setup mac

### accessibility > point controll > trackpad

- up scroll speed
- enable drag by trackpad

### control center

- optimize

### desktop and dock

- enable auto hidden
- disable used apps

### do not disturb

9:00~20:00

### trackpad

- speed level 6
- click level low

### keyboard

- repeat speep max

#### keyboard shortcut

- capslock -> ctrl
- global -> capslock
- crtl -> global
- disable global key(as fn)
- remove ctrl + space shortcut
- enable default function key
- change language by capslock
- use slash and backslash
- disable input znnkaku number

```bash
# require reboot
defaults write -g ApplePressAndHoldEnabled -bool false
```

## install brew

## install hammerspoon

```bash
brew install hammerspoon
gh repo clone totto2727-dotfiles/hammerspoon ~/.hammerspoon
```

1. open hammerspoon
1. enable auto start
1. reload config

## install font

```bash
brew install font-plemol-jp font-plemol-jp-nf
```

## setup git

```bash
brew install git-delta
curl -L https://github.com/totto2727-dotfiles/dotfiles/raw/refs/heads/main/mac/git/.gitconfig > ~/.gitconfig
# 必要であれば
curl -L https://github.com/totto2727-dotfiles/dotfiles/raw/refs/heads/main/mac/git/.gitconfig-work > ~/.gitconfig-work
mkdir -p ~/.config/git
curl -L https://github.com/totto2727-dotfiles/dotfiles/raw/refs/heads/main/mac/git/ignore > ~/.config/git/ignore
```

- rewrite user name and user email

### gpg sign

```bash
brew install gnupg pinentry-mac
mkdir -p ~/.gnupg
echo 'pinentry-program /opt/homebrew/bin/pinentry-mac' > ~/.gnupg/gpg-agent.conf
```

- <https://christina04.hatenablog.com/entry/create-gpg-master-key-and-subkey>
- <https://text.baldanders.info/remark/2019/10/openpgp-public-keys-in-github/>

## setup gh

### install

```bash
brew install gh
```

### login(https)

```bash
gh auth login
```

## setup dotfiles

```bash
cd ~/.config
gh repo clone totto2727-dotfiles/dotfiles
```

## setup starship

```bash
brew install starship
echo 'eval "$(starship init zsh)"' >> ~/.zshrc
curl -L https://github.com/totto2727-dotfiles/bash/raw/refs/heads/main/starship.toml > ~/.config/starship.toml
```

## setup mise

```bash
brew install mise
echo 'eval "$(mise activate zsh)"' >> "~/.zshrc"
```

## setup javascript

```bash
# npmバックエンドのため、aquaではなくasdfのnodeをインストールする
mise use -g node@lts aqua:pnpm/pnpm@latest bun@latest deno@latest
brew install ni
```

## setup cursor

### install cursor

```bash
brew install cursor
```

### install vscode extensions

```bash
# mac/vscode
jq -r '.[]' extentions.json | xargs -I {} cursor --install-extension {}
```

### update extension list

```bash
# mac/vscode
cursor --list-extensions | jq -R -s 'split("\n") | map(select(length > 0))' > extensions.json
```

## setup claude code

```bash
brew install claude-code
gh repo clone totto2727-dotfiles/claude-for-work ~/.claude
```

## setup lazygit

```bash
echo 'export XDG_CONFIG_HOME="$HOME/.config"' >> ~/.zshrc
gh repo clone totto2727-dotfiles/lazygit ~/.config/lazygit
brew install lazygit
```

## setup utility

```bash
brew install sd ripgrep fd eza zoxide go-task yazi lazydocker neovim
echo 'export EDITOR=nvim' >> ~/.zshrc
echo 'eval "$(zoxide init zsh)"' >> ~/.zshrc
```

## alias

```zsh
alias path-list='echo "$PATH" | sd ":" "\n"'

alias G='git'
alias GC='git commit'
alias GCA='git commit --amend'
alias GSW='git switch'
alias GSWC='git switch -c'
alias GPUSHF='git push --force-with-lease --force-if-includes'
alias gh-pr-create='gh pr create -a "@me" --base'

alias LG='lazygit'
alias LD='lazydocker'
alias YZ='yazi'

alias VI='nvim'
alias vi='nvim'
alias vim='nvim'

alias la='eza -a --group-directories-first'
alias ll='la -l'

chpwd() {
  la
}
```

## Podman

### script

```bash
mkdir -p ~/.local/bin/
echo 'export PATH="$PATH:${HOME}/.local/bin"' >> ~/.zshrc
brew tap slp/krunkit
brew install podman podman-desktop krunkit
curl -L https://github.com/totto2727-dotfiles/bash/raw/refs/heads/main/auth.json > ~/.config/containers/auth.json
curl -L https://github.com/totto2727-dotfiles/bash/raw/refs/heads/main/registries.conf > ~/.config/containers/registries.conf
curl -L https://github.com/totto2727-dotfiles/bash/raw/refs/heads/main/docker-credential-gh > ~/.local/bin/docker-credential-gh
chmod 500 ~/.local/bin/docker-credential-gh
# Podman DesktopのSettings > Resourcesからインスタンスを作成する
scp -P $(podman machine inspect | jq '.[0].SSHConfig.Port') -i ~/.local/share/containers/podman/machine/machine ~/.config/containers/registries.conf root@localhost:/etc/containers/registries.conf
podman machine ssh --username root rm /etc/containers/registries.conf.d/000-shortnames.conf
podman machine stop && podman machine start
podman run --rm -it --device /dev/dri --name gpu-info quay.io/slopezpa/fedora-vgpu vulkaninfo | grep "GPU"
```

### gpt-oss-120b

- add podman ai lab extension
- download optimized gpt-oss-120b
  - <https://zenn.dev/tunerarticle/articles/63088ebbee17d8>
  - <https://huggingface.co/bartowski/openai_gpt-oss-120b-GGUF>
