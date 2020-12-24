---
title: 配置多版本 Neovim，尝鲜 Neovim 0.5
topic: Neovim
date: 2020-11-28
---

Neovim 打算在 2020 的圣诞节发布 0.5([Milestone][1])，一个集成 LSP、Lua 用户配置
和 Treesitter 等的大版本。在发布之前，可以通过合理的配置，体验新功能，且不影响主
力 Neovim 稳定版本的日常使用。

## 安装 Neovim 开发版本 （以 macOS 为例）

```
brew install --HEAD neovim
```

该命令会将当前的 `nvim` 命令链接到 Neovim 开发版本。用 brew switch 把 `nvim` 命
令还原到稳定版本：

```
brew switch neovim 0.4.4
```

brew 把 所有不同版本的  Neovim 安装在 `/usr/local/Cellar/neovim` 目录。通过添加
alias 为 Neovim 开发版本添加命令：


```sh
alias neovim="/usr/local/Cellar/neovim/HEAD-4537ff6/bin/nvim"
```

自此，两个 Neovim 版本的命令分别为：

```
nvim: 0.4.4
neovim: HEAD(0.5.0)
```

现在虽然拥有了两个不同版本的 Neovim，但两者共享配置文件。为了不影响日常的工作，
我希望两者的配置文件可以完全隔离。


## Neovim 默认配置路径

为了隔离两个 Neovim 版本的配置文件，首先需要了解 Neovim 的默认配置路径。Neovim
和Vim 的一个明显区别是 Neovim 改变了 Vim 的默认 vimrc 文件路径和配置文件夹路径：

```
Vim:
  - vimrc: $HOME/.vimrc
  - home directory: $HOME/.vim

Neovim:
  - vimrc: $XDG_CONFIG_HOME/nvim/init.vim
  - home directory: $XDG_CONFIG_HOME/nvim
```

在进一步配置之前，简单了解一下环境变量 `$XDG_CONFIG_HOME`。`XDG` 全称是 X
Desktop Group，是现在 [freedesktop.org][2] 的前生。在 freedesktop 的 [XDG Base
Directory Specification][3] 规范中，对该环境变量做了如下规定：

> $XDG_CONFIG_HOME defines the base directory relative to which user specific
> configuration files should be stored. If $XDG_CONFIG_HOME is either not set or
> empty, a default equal to $HOME/.config should be used.


那么在启动 Neovim 开发版本时，设置 `XDG_CONFIG_HOME` 便可改变 Neovim 配置文件路
径。于是将上述的 alias 修改为：

```sh
alias vim="XDG_CONFIG_HOME=$HOME/.config/neovim-0.5.0 /usr/local/Cellar/neovim/HEAD-4537ff6/bin/nvim"
```

使用 `neovim` 便可启动无配置的 neovim 0.5.0，使用如下配置文件：

```
- vimrc: ~/.config/neovim-0.5.0/nvim/init.vim
- home directory: ~/.config/neovim-0.5.0/nvim
```

现在可以开始安装配置 nvim-treesitter 等新功能了。

以上。

[1]: https://github.com/neovim/neovim/milestone/19
[2]: https://www.freedesktop.org
[3]: https://specifications.freedesktop.org/basedir-spec/basedir-spec-0.6.html
[4]: https://github.com/neovim/neovim/wiki/Installing-Neovim#homebrew-on-macos-or-linux
