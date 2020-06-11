---
title: 从创建 Observables 开始 RxJS
topic: RxJS
date: 2020-06-10
---

想象一下，你现在是一名中国最早的高速公路「沪嘉高速公路 S5」的一名收费员。你每天
的工作就是在其中的一个出口，对每一俩驶出高速的汽车进行收费，然后放行。来一辆，收
费一次。没有车辆，你就只能发呆。

在 RxJS 的世界里，高速公路就是一个 Observable。而你是一个 Observer。

在这个世界里，一辆车从你这个出口离开了高速。但在另外一个平行宇宙，这辆车并没有离
开，而是继续向前行驶。Observable 是这条高速在所有平行宇宙的集合。这相当于每辆车
从每个出口离开了高速。

## 创建一个 Observable

Observable 是 RxJS 最核心最重要的概念。所有其他的操作都是在 Observable 基础之上
。其他的操作包括 a) 如何更方便的创建一个 Observable；b) 如何衔接变换 Observable
等。

```js {3}
import { Observable } from 'rxjs';

const observable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});

observable.subscribe(
  x => console.log(x),
  error => console.error(error),
  () => console.log('done'),
);
// 输出：
// 1
// 2
// 3
// done
```

以下是其他常见创建 Observables 的帮助函数。这些函数不包含 Operator 的角色，也就
是说不依赖于其他 Observable。

## of & from

上述创建 Observable 的例子，可以使用 `of` 简化为：

```js {3}
import { of } from 'rxjs';

const observable = of(1, 2, 3)

observable.subscribe(
  x =>  console.log(x),
  error => console.log(error),
  () => console.log('done'),
);
```

同 `of` 类似，`from` 接受一个数组，数组的每个元素依次推送给 observer。

```js {3}
import { from } from 'rxjs';

const observable = from([1, 2, 3])
```


## FromEvent & fromEventPattern

将事件监听转化为一个 Observable。

```ts {3}
import { fromEvent } from 'rxjs';

const click$ = fromEvent<MouseEvent>(document, 'click');

click$.subscribe((event) => {
  console.log(event.clientX, event.clientY);
});
```

`fromEvent` 还支持监听一组对象：

```js
const click$ = fromEvent<MouseEvent>([document, button], 'click');
```

监听对象需有如下其中一对方法即可：

1. `addEventListener` 和 `removeEventListener`
2. `addListener` 和 `removeListener`

假如监听对象无上述 API，可以使用 `fromEventPattern` 手动添加监听处理函数：

```ts {3}
import { fromEventPattern } from 'rxjs';

const click$ = fromEventPattern<MouseEvent>(
  handler => document.addEventListener('click', handler),
  handler => document.removeEventListener('click', handler),
);

click$.subscribe((event) => {
  console.log(event.clientX, event.clientY);
});
```

## bindCallback & bindNodeCallback

`bindCallback` 将封装一个 callback style 的 API，把 callback 的参数作为
Observable 的输出：

```ts {9}
import { bindCallback } from 'rxjs';

const login = (user: object, cb: (result: boolean) => void) => {
  // login logic here
  console.log('user:', user)
  cb(true);
};

const createLoginObservable = bindCallback(login);

createLoginObservable({ id: 123 })
  .subscribe(x => console.log('result:', x));

// output
// user: {id: 123}
// result: true
```

`bindNodeCallback` 是针对 Node.js API 的 error-first 风格 callback 参数：

```ts {6}
import * as fs from 'fs';
import { bindNodeCallback } from 'rxjs';

// fs.readFile('foo.txt', function(err, data) {});

const readFile = bindNodeCallback<string, Buffer>(fs.readFile)

readFile
  .call(fs, 'foo.txt')
  .subscribe(
    (x: Buffer) => console.log(x),
    (error: Error) => console.error(error),
  );
```

## interval & timer

`interval(period: number)` 将创建一个 Observable。该 Observable 从 n = 0 开始，
每隔 period 毫秒输出 n + 1。

```ts {3}
import { interval } from 'rxjs';

const interval$ = interval(1000);
interval$.subscribe(x => console.log(x));

// 0
// 1
// 2
// ...
```

而 `timer(delay: number, period: number)` 在 `interval` 基础上延迟输出。

```ts {3}
import { timer } from 'rxjs';

const timer$ = timer(3000, 1000);
interval$.subscribe(x => console.log(x));

// wait 3s
// 1
// 2
// 3
// ...

```

## generate

```ts {7}
import { generate } from 'rxjs'

`generate` 和 `function*` 有点类似，condition 相当于 next()：

type state = { count: number };

const gen$ = generate<state>({
  initialState: { count: 0 },
  condition: state => state.count < 5,
  iterate: state => ({ count: state.count + 1 }),
});

gen$.subscribe(
  x => console.log(x),
  error => console.error(error),
  () => console.log('done'),
);

// {count: 0}
// {count: 1}
// {count: 2}
// {count: 3}
// {count: 4}
// done
```


## range

`range(start: number = 0, count: number)` 等同于:

```js
import { of } from 'rxjs';
of(start, start + 1, start + 2, ..., start + count - 1);
```

```ts {3,11}
import { range } from 'rxjs';

const range1$ = range(3);
range1$.subscribe(x => console.log(x))

// 0
// 1
// 2

const range2$ = range(5, 3);
range2$.subscribe(x => console.log(x))

// 5
// 6
// 7
```

## throwError

`throwError` 创建一个直接抛出错误的 Observable，其他什么都不做。

```ts {3}
import { throwError } from 'rxjs';

const error$ = throwError('a fatal error');

error$.subscribe({
  next: x => console.log(x),
  error: error => console.error(error),
  complete: () => console.log('done'),
});

// a fatal error

```


1]: https://rxjs.dev/
