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

## setup git

```bash
brew install git-delta
curl -L https://github.com/totto2727-dotfiles/dotfiles/raw/refs/heads/main/mac/.gitconfig > ~/.gitconfig
# 必要であれば
curl -L https://github.com/totto2727-dotfiles/dotfiles/raw/refs/heads/main/mac/.gitconfig-work > ~/.gitconfig-work
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

## setup claude code

```bash
brew install claude-code
gh repo clone totto2727-dotfiles/claude-for-work ~/.claude
```
