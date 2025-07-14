# setup opensuse

## dir

```bash
LANG=C xdg-user-dirs-gtk-update
```

## ui


- enable dark mode
- GNOME 設定のアクセシビリティ → Seeing → 「Cursor Size」を大きい奴にする

## font

1. download [plemoljp](https://github.com/yuru7/PlemolJP)
    - move `~/.local/share/fonts`
    - reboot
1. open tweaks > font
1. scale 1.5

- interface
    - ipa ui gothic
- document
    - ipa ex gothic
-  mono
    - PlemolJP Console


## trackpad and mouse

- select normal

## keyboard

### ime

1. open settings
1. select keyboard
1. add input source
1. add english (us)
1. add japanese (mozc:あ)
1. remove english (intl)

### mozc

1. open mozc
1. select kotoeri

### tweaks

1. open tweaks
1. select keyboard
1. click additional layout option
1. enable switching to another layout > capslock

### keyd

1. `gsettings set org.gnome.mutter overlay-key ''`
1. remove shortcut
   - super + a
   - super + c
   - super + v
   - super + space
1. edit shortcut to show activity(super + space)

```bash
sudo zypper in keyd
sudo systemctl enable --now keyd
sudo usermod -aG keyd "$USER"
mkdir -p ~/.local/share/gnome-shell/extensions
#ln -s /usr/share/keyd/gnome-extension-45 ~/.local/share/gnome-shell/extensions/keyd
mkdir -p ~/.local/share/gnome-shell/extensions/keyd
curl https://raw.githubusercontent.com/rvaiya/keyd/refs/heads/master/data/gnome-extension-45/extension.js >~/.local/share/gnome-shell/extensions/keyd/extension.js
curl https://raw.githubusercontent.com/rvaiya/keyd/refs/heads/master/data/gnome-extension-45/metadata.js >~/.local/share/gnome-shell/extensions/keyd/metadata.json
# reboot
gnome-extensions enable keyd
gnome-extensions show keyd
keyd-application-mapper
```

## develop

### init

```bash
curl https://raw.githubusercontent.com/totto2727-dotfiles/dotfiles/refs/heads/main/opensuse-private/init.bash

bash install.bash
```

### 1password

1. enable ssh agent
1. edit agent.toml
  ```toml:~/.config/1Password/ssh/agent.toml
  [[ssh-keys]]
  item = "opensuse-private"
  vault = "Private"
  ```
1. reboot

### tailscale

```bash
sudo systemctl enable --now tailscaled
sudo tailscale up
```

## remove unnecessary app

1. open software
1. open repository setting
1. enable opensuse repository
1. remove apps

