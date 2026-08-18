# dsh-liquid-glass-fluid-background

English | [中文](README.zh.md)

Installable DeepSeek Harness **bundle** for the web GUI: optional iOS-style liquid glass, plus an Isolation-style fluid backdrop that can run with glass off.

This directory is a ready-to-upload plugin checkout. `lib/` is already built. Do not treat `src/` as the install entry.

## Install

Requires a working `dsh` CLI and the **web** profile.

From this directory:

```sh
dsh plugin --profile web add .
```

Or install the packed tarball in this folder:

```sh
dsh plugin --profile web add ./dsh-liquid-glass-fluid-background-0.1.0.tgz
```

After you push this folder to GitHub (include `lib/`):

```sh
dsh plugin --profile web add github:<you>/dsh-liquid-glass-fluid-background
```

Then start the web surface:

```sh
dsh --profile web
```

Open **Settings → General**. Turn on **Liquid Glass** and/or **Fluid background**. Fluid does not require glass. When both are on, fluid is the wallpaper.

## Upload to GitHub

```sh
cd D:\Code\TypeScript\dsh-liquid-glass-fluid-background
git init
git add .
git commit -m "feat: liquid-glass overlay and Isolation fluid backdrop"
git remote add origin https://github.com/<you>/dsh-liquid-glass-fluid-background.git
git push -u origin HEAD
```

Commit `lib/`. A git install that only has `src/` will not load.

## Remove

```sh
dsh plugin --profile web remove dsh-liquid-glass-fluid-background
```

## What it ships

- Host half: settings namespace `ui-theme-liquid-glass` (glass tunables + fluid flags) and a tapIndex bootstrap that stamps `data-dsh-liquid-glass` before the client tree paints.
- Browser half: token overlay, frost stylesheet, SVG lens, and the Isolation WebGL (or CSS-gradient) canvas.

Peer packages come from the dsh web profile. This bundle does not republish `@deepseek-ai/dsh-*`.
