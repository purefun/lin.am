---
title: 如何正确快速地创建一个矩阵
topic: JavaScript
date: 2020-06-14
---

## 错误的方法

先给出我错误的方法：

```ts
const matrix: boolean[][] = new Array(3).fill(new Array(3).fill(false));
```
打印出结果是：

```ts
[
  [false, false, false],
  [false, false, false],
  [false, false, false],
]
```
本意是为动态规划初始化一个状态矩阵。当初始化这个矩阵时：

```ts
// 设置对角线上的元素
for(let i = 0; i < matrix.length; i++) {
  matrix[i][i] = true;
}
```

期待的结果是：

```ts
[
  [true,  false, false],
  [false, true,  false],
  [false, false,  true],
]
```

现实打脸的结果是：

```ts
[
  [true, true, true],
  [true, true, true],
  [true, true, true],
]
```

原因在于调用 `Array.prototype.fill()` 方法时，大意地传入了引用类型的值。所有
`matrix[i]` 都指向同一数组。


## 正确的方法

```ts
const matrix: boolean[][] = Array.from(new Array(3), () => new Array(3).fill(false));
```

可以利用 `Array.from(arrayLike [, mapFn [, thisArg]])` 中的 `mapFn` 为每一个元素
生成一个新的数组。

总而言之，在使用 `Array.prototype.fill()` 方法时，切记要区分值类型与引用类型。
