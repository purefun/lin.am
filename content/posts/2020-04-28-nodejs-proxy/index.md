---
title: 配置 Node.js HTTP 全局代理的通用方案
topic: Node
tags:
  - proxy
  - fetch
date: 2020-04-28
---

出于不可描述的原因，如何跨越长城已是软件开发工程师的必备技能。这项技能还可以作为
判断工程师获取信息的能力。我在面试候选人的时候都不忘了解一下候选人配置代理的方案
。

实际工程中也会经常碰到项目依赖需要从 S3、Google Cloud Storage 或其他云存储下载，
有些存储服务在国内是龟速或者根本无法访问，这时候就需要配置代理。否则有些项目启动
都成问题。

## 命令行代理设置

  ```shell
  HTTP_PROXY=http://127.0.0.1:6152
  HTTPS_PROXY=http://127.0.0.1:6152
  ALL_PROXY=SOCKS5://127.0.0.1:6153
  NO_PROXY=localhost,127.0.0.1
  ```

  大部分工具都会遵循以上三个环境变量，比如常用的 `curl` 工具。不久前被放弃维护的
  [request] 和 [axios] 都支持上述设置。


## 实际案例

  [Kibana] 开发环境搭建需要 Elasticsearch，`yarn es snapshot` 会从
  [storage.googleapis.com] 下载最新的 Elasticsearch。而 `storage.googleapis.com`
  已无法在大陆访问。查看 Kibana 源码，发现其使用 `node-fetch` 模块作为 HTTP 请求
  客户端。但 `node-fetch` 为了将 API 同浏览器的 `fetch` 保持一致，并没有加入对代
  理的支持。


## 工程中的通用方案

  在 Node.js 中最终都需要通过委托内置模块 `http` 和 `https` 进行 HTTP 相关的请求
  。在使用 `http[s].request(options)` 模块时，`http[s].globalAgent` 将作为
  `options.agent` 的默认值。以 `http.globalAgent` 为例：

  ```js
  // https://github.com/nodejs/node/blob/v13.12.0/lib/http.js#L83-L92

  ObjectDefineProperty(module.exports, 'globalAgent', {
    configurable: true,
    enumerable: true,
    get() {
      return httpAgent.globalAgent;
    },
    set(value) {
      httpAgent.globalAgent = value;
    }
  });
  ```

  我们可以通过设置 `http.globalAgent` ，不改变业务代码的情况下，来达到设置代理的
  目的。这也是这个模块 [global-agent] 所做的事情。`global-agent` 的使用方法：

  ```shell
  node -r global-agent/bootstrap [some.js]
  ```

  `global-agent` 判断环境中和代理相关的变量，创建一个 `http[s].agent` 并覆盖
  `http[s].globalAgent`。

  Note: `global-agent` 支持 Node.js >= v10 版本，低版本应该使用 [global-tunnel]
  。



[Kibana]: https://github.com/elastic/kibana
[storage.googleapis.com]: https://storage.googleapis.com/kibana-ci-es-snapshots-daily/8.0.0/manifest-latest-verified.json
[request]: https://github.com/request/request/
[axios]: https://github.com/axios/axios
[global-agent]: https://github.com/gajus/global-agent/blob/v2.1.8/src/factories/createGlobalProxyAgent.js#L166
[global-tunnel]: https://github.com/np-maintain/global-tunnel
