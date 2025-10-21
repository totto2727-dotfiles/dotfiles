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
