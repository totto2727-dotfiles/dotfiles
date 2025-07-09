# setup opensuse

## dir

```bash
LANG=C xdg-user-dirs-gtk-update
```

## ui

- enable dark mode
- select scale 200%

## font

1. download [plemoljp](https://github.com/yuru7/PlemolJP)
    - move `~/.local/share/fonts`
    - reboot
1. open tweaks > font

- interface
    - ipa ui gothic
- document
    - ipa ex gothic
-  mono
    - `PlemolJP Console

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
1. enable alt and win behavior > reverse alt and win
1. enable ctrl position > make caps lock atc as an additional ctrl modifier, but keep identifying as caps lock
1. enable switching to another layout > left ctrl

## develop

```bash
curl https://raw.githubusercontent.com/totto2727-dotfiles/dotfiles/refs/heads/main/opensuse-private/init.bash

bash install.bash
```

