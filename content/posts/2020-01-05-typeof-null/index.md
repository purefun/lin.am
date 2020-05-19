---
title: typeof null === 'object' 的由来
topic: JavaScript
date: 2020-01-05
---

在分析 `typeof` 操作符的 C 代码实现之前，需要了解一个背景知识点。在 1995 年 CPU
还是 32bit，变量的类型和值共享这 32bit。Brendan Eich 使用 32bit 中的最低 1bit 
来标记是否为整数，1 为整数，0 为其他：

```js
xxxx_xxxx_xxxx_xxxx_xxxx_xxxx_xxxx_xxx1 // 整数
xxxx_xxxx_xxxx_xxxx_xxxx_xxxx_xxxx_xxx0 // 其他类型
```

在最低位为 0 时，再使用低位 2-3bit 来区分对象、双精度、字符串和布尔类型：

```js
xxxx_xxxx_xxxx_xxxx_xxxx_xxxx_xxxx_x000 // 对象
xxxx_xxxx_xxxx_xxxx_xxxx_xxxx_xxxx_x010 // 双精度
xxxx_xxxx_xxxx_xxxx_xxxx_xxxx_xxxx_x100 // 字符串
xxxx_xxxx_xxxx_xxxx_xxxx_xxxx_xxxx_x110 // 布尔
```

而 `null` 的值定义为：

```js
0000_0000_0000_0000_0000_0000_0000_0000 // null
```

在此基础上，我们可以分析 `typeof` 的实现：

```c {12,14,22}
JS_PUBLIC_API(JSType)
JS_TypeOfValue(JSContext *cx, jsval v)
{
    JSType type = JSTYPE_VOID;
    JSObject *obj;
    JSObjectOps *ops;
    JSClass *clasp;

    CHECK_REQUEST(cx);
    if (JSVAL_IS_VOID(v)) {
        type = JSTYPE_VOID;
    } else if (JSVAL_IS_OBJECT(v)) { // #1
        obj = JSVAL_TO_OBJECT(v);
        if (obj &&                   // #2
            (ops = obj->map->ops,
             ops == &js_ObjectOps
             ? (clasp = OBJ_GET_CLASS(cx, obj),
                clasp->call || clasp == &js_FunctionClass)
             : ops->call != 0)) {
            type = JSTYPE_FUNCTION;
        } else {
            type = JSTYPE_OBJECT;    // #3
        }
    } else if (JSVAL_IS_NUMBER(v)) {
        type = JSTYPE_NUMBER;
    } else if (JSVAL_IS_STRING(v)) {
        type = JSTYPE_STRING;
    } else if (JSVAL_IS_BOOLEAN(v)) {
        type = JSTYPE_BOOLEAN;
    }
    return type;
}
```

`null` 为全 0，所以 #1 分支为真，因为低位 3bit 为 000 被定义为对象类型。在 #2
分支中，只做了是否为函数的判断，**忽略了 32bit 全为 0 情况**，代码自然执行到了 #3 
这个分支，这就是 `typeof null === 'object'` 的由来。


# References

  1. [The history of “typeof null”]
     (https://2ality.com/2013/10/typeof-null.html)
  2. [One JavaScript: avoiding versioning in ECMAScript 6]
     (https://2ality.com/2014/12/one-javascript.html)
