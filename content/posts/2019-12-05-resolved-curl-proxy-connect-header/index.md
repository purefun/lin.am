---
title: 剥除 curl 代理返回的 HTTP Status Line
date: 2019-12-05
topic: CLI
---

## 问题定义

`curl` 通过代理服务器发送 HTTPS 请求时，把和 HTTPS 代理服务器建立链接的 Status
Line 输出到结果中，导致无法解析出正确的 HTTP 状态。

```sh {3}
curl https://google.com/404 -I -x http://localhost:6152

HTTP/1.0 200 Connection established

HTTP/2 404
content-type: text/html; charset=UTF-8
referrer-policy: no-referrer
content-length: 1564
date: Fri, 06 Dec 2019 07:07:09 GMT
```

## 问题发现

在使用 Vim 的日历插件 [calendar.vim][1]
时，插件无法处理 Google Calendar 的 `access_token` 过期返回 401 的情况。
calendar.vim 使用系统自带的 curl 作为 HTTP client。
calendar.vim 根据 [RFC2616][2]
把第一行做为 `Status-Line`：

```plain
Status-Line = HTTP-Version SP Status-Code SP Reason-Phrase CRLF
```

但第一行并不是远程服务器返回的 `Status-Line`，而是代理服务器的。

## 问题解决

curl 提供了一个选项 `--suppress-connect-header`。

```sh {3}
curl https://google.com/404 -I -x http://localhost:6152 --suppress-connect-header

HTTP/2 404
content-type: text/html; charset=UTF-8
referrer-policy: no-referrer
content-length: 1564
date: Fri, 06 Dec 2019 07:07:09 GMT
```

最后给 calendar.vim 提交了一个 [PR][3]，把 `--suppress-connect-header` 加入 到
curl 的默认参数中。

[1]: https://github.com/itchyny/calendar.vim
[2]: https://tools.ietf.org/html/rfc2616#section-6.1
[3]: https://github.com/itchyny/calendar.vim/pull/155
