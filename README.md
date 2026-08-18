# dsh-liquid-glass-fluid-background

English | [中文](README.zh.md)

Installable DeepSeek Harness **bundle** for the web GUI: optional iOS-style liquid glass, plus an Isolation-style fluid backdrop that can run with glass off.

This directory is a ready-to-upload plugin checkout. `lib/` is already built. Do not treat `src/` as the install entry.

![Blank home with liquid glass and a fluid wallpaper](images/主页.png)

## Preview

Conversation page (dark, glass on, fluid wallpaper):

![Conversation with glass chrome over a purple fluid field](images/对话页.png)

Light mode keeps the same overlay on the built-in light palette:

![Conversation in light mode](images/浅色模式.png)

A static `http(s)` image as the canvas (fluid off):

![Conversation over a custom background image](images/自定义背景图.png)

Menu chrome picks up the backdrop through the glass rim:

![Workspace-permission menu showing rim refraction](images/按钮折射效果.png)

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

Then start the web surface:

```sh
dsh --profile web
```

Open **Settings → General**. Turn on **Liquid Glass** and/or **Fluid background**. Fluid does not require glass. When both are on, fluid is the wallpaper.

![General settings: glass tuners and the fluid switch](images/插件设置页.png)

Fluid presets (`silk`, `hsv`, `wave`, `aurora`, `plasma`, `smoke`):

![Fluid preset menu](images/背景特效选择.png)

Four custom colors rewrite the Isolation field:

![Conversation after custom fluid colors](images/背景特效自定义颜色.png)

## Remove

```sh
dsh plugin --profile web remove dsh-liquid-glass-fluid-background
```

## What it ships

- Host half: settings namespace `ui-theme-liquid-glass` (glass tunables + fluid flags) and a tapIndex bootstrap that stamps `data-dsh-liquid-glass` before the client tree paints.
- Browser half: token overlay, frost stylesheet, SVG lens, and the Isolation WebGL (or CSS-gradient) canvas.

Peer packages come from the dsh web profile. This bundle does not republish `@deepseek-ai/dsh-*`.
