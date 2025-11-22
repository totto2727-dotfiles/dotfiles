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

#### macbook keyboard shortcut

- capslock -> ctrl
- global -> capslock
- crtl -> global
- disable global key(as fn)

#### keyboard shortcut

- remove ctrl + space shortcut
- enable default function key
- change language by capslock
- use slash and backslash
- disable input znnkaku number

```bash
# require reboot
defaults write -g ApplePressAndHoldEnabled -bool false
```

## rename computer name

- rename totto2727
- reboot

## setup brew

https://brew.sh/

## setup nix

https://docs.determinate.systems

```bash
curl -L https://raw.githubusercontent.com/totto2727-dotfiles/nix/refs/heads/main/flake.nix > flake.nix
curl -L https://github.com/totto2727-dotfiles/nix/blob/main/flake.lock > flake.lock
nix run nix-darwin -- switch --flake .
```

## setup gh

```bash
gh auth login
```

## setup chezmoi

```bash
chezmoi init --apply https://github.com/totto2727-dotfiles/chezmoi.git
```

## setup nix-repository

```bash
rm flake.nix flake.lock
gh repo clone totto2727-dotfiles/nix
cd nix
task rebuild
```

## gpg

- <https://christina04.hatenablog.com/entry/create-gpg-master-key-and-subkey>
- <https://text.baldanders.info/remark/2019/10/openpgp-public-keys-in-github/>

## VSCode(Cursor, Antigravity)

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

## Podman

### script

```bash
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
