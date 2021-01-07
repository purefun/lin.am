---
title: "Goday-01: Hello World 和 Vim 的配置"
topic: Golang
date: 2021-01-07
---

---

## 学前了解

1. Go 是一门静态强类型编程语言；
2. Go 背后的公司是 Google；
3. Go 的语法是简单的；
4. Go 为并发而生；
5. Go 由三为大神设计：
    1. Robert Griesemer，曾任职与 V8 JavaScript Engine；
    2. Rob Pike，曾就职与贝尔实验室、Unix Team 成员)；
    3. Ken Thompson，图灵奖等获得者；
6. Go 目前还[不支持范型][1]；
7. 使用 Go 知名的项目：Kubernates、Docker、Dapr、TiDB、hugo；


## 安装 Go

从[官方下载页面][3] 下载包含标准库源码的安装包即可。在 macOS 上，安装的位置是
`/usr/loca/go/`。其中提供了两个可执行文件：

```
/usr/local/go/bin/go
/usr/local/go/bin/gofmt
```

使用 `go version` 命令查看是否安装成功：

```
$ go version
go version go1.15.6 darwin/amd64
```


## Hello World

```go
// main.go
package main

import (
	"fmt"
)

func main() {
	fmt.Println("Hello World!")
}
```

```sh
$ go run main.go
```


## Vim 语法提示、跳转、重构等

> 因一直在使用 coc.nvim, Go 的 LSP 设置就由 coc.nvim 完成比较顺手。

根据[官方提供的 LSP 设置][4]教程：

1. 下载 `gopls`: `go get -u golang.org/x/tools/gopls`
2. 如果之前没有将 go bin 目录加到 `PATH` 中：`export PATH="$HOME/go/bin:$PATH"`
3. 安装 coc.nvim, 在 `coc-settings.json` 中加入 `golang` 的配置：

```json
"languageserver": {
  "golang": {
    "command": "gopls",
      "rootPatterns": ["go.mod", ".vim/", ".git/", ".hg/"],
      "filetypes": ["go"],
      "initializationOptions": {
        "usePlaceholders": true
      }
  }
}
```

## Vim Lint, run, debug...

安装官方提供的 `golint`: `go get -u golang.org/x/lint/golint`。

[vim-go][5] 提供了 vim 作为 Go IDE 的大部分功能。但因为和 coc.nvim 在 LSP 共功能
上由冲突，关闭 vim-go 和 LSP 有关的功能：


```vimscript
let g:go_gopls_enabled = 0
let g:go_def_mapping_enabled = 0
```

## 学习资源

1. https://draveness.me/
2. [Learn Go Programming - Golang Tutorial for Beginners][2]


[1]: https://draveness.me/whys-the-design-go-generics/
[2]: https://www.youtube.com/watch?v=YS4e4q9oBaU
[3]: https://golang.org/dl/
[4]: https://github.com/golang/tools/blob/master/gopls/doc/vim.md#cocnvim
[5]: https://github.com/fatih/vim-go
