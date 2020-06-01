---
title: Web 深色模式
date: 2020-06-01
topic: JavaScript
---

Apple 在 2018 年推出的 macOS Mojave (10.14) 时最早引入了深色模式。在 2019 年的
iOS 13 中也同样带来了深色模式。2019 年 10 月 7 日发布的 macOS Catalina (10.15)
开始支持自动切换深色和浅色模式。

## Web 深色模式需求

1. 根据操作系统的配色，网页应显示对应配色；
2. 在页面打开的情况下，操作系统的配色有变化，网页的配色应跟随操作系统变化；
3. 用户可以在页面中手动控制配色方案，并记住用户的最后一次选择。

## 需求分析

> 1. 根据操作系统的配色，网页应显示对应配色；

该需求依赖浏览器获取配色相关的 API：

```css title="CSS 获取系统配色"
body {
  background: gray;
}

@media(prefers-color-scheme: light) {
  body {
    background: white;
  }
}

@media(prefers-color-scheme: dark) {
  body {
    background: black;
  }
}
```

```js title="JavaScript 获取系统配色"
// 兼容判断
if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
  console.log('Dark mode is supported');
}

const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
console.log(darkModeMediaQuery);

// 深色模式输出：
{
  matches: true
  media: "(prefers-color-scheme: dark)"
  onchange: null
}

// 浅色模式输出：
undefined

```

> 2. 在页面打开的情况下，操作系统的配色有变化，网页的配色应跟随操作系统变化；

监听系统配色变化 API：

```js
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

darkModeMediaQuery.addListener((e) => {
  const isDarkMode = e.matches; // true or false
});
```

> 3. 用户可以在页面中手动控制配色方案，并记住用户的最后一次选择。

用户可以在页面中手动控制配色方案，这打破了操作系统和网页的配色绑定关系。需要在中间
引入新的状态来集中管理。而该状态的管理最好和 Web 框架无关。且该状态还需要被 CSS
访问用于改变 CSS Variables 的值。

自然我们可以想到，把这个状态绑到 HTML 元素上。


## 定义接口

1. 在 `<html>` 上取一个属性做为状态来区别深色和浅色模式：
   - 深色模式：`<html color-scheme="dark">`
   - 浅色模式：`<html color-scheme="light">`

   CSS 通过属性选择器定义变量：

   ```css
   html[color-scheme=light] {
     --background: white;
     --text: black;
   }
   html[color-scheme=dark] {
     --background: black;
     --text: white;
   }
2. 在 `window` 上挂载函数 `window.getColorScheme()` 获得当前配色；
3. 在 `window` 上挂载函数 `window.nextColorScheme()` 来设置配色；
4. 通过 `CustomEvent` 定义配色变化的事件，用于监听：
   ```js
     const colorSchemeEvent = new CustomEvent('color-scheme', {
       detail: {
         theme: 'dark',
       }
     });
     window.dispatchEvent(colorSchemeEvent);
 
     // 监听
     window.addEventListener('color-scheme', (event) => {
       event.detail.theme === 'dark';
     })
   ```
   通过 `CustomEvent` 隐藏配色监听的细节，更方便拓展为多主题配色。

## 完整代码

Demo: <https://purefun.io/demo/dark-mode/>

```html title="dark-mode.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dark Mode</title>
  <style>
    html[color-scheme=light] {
      --bg: white;
      --text: black;
    }
    html[color-scheme=dark] {
      --bg: black;
      --text: white;
    }
    body {
      background: var(--bg);
      color: var(--text);
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0;
    }
  </style>
  <script>
    (function(window) {
      const colorSchemeKey = 'color-scheme';

      function setColorScheme(theme) {
        document.documentElement.setAttribute(colorSchemeKey, theme);
        const colorSchemeEvent = new CustomEvent('color-scheme', {
          detail: { theme },
        });
        window.dispatchEvent(colorSchemeEvent);
        localStorage.setItem(colorSchemeKey, theme);
      }

      function getColorScheme() {
        return document.documentElement.getAttribute(colorSchemeKey);
      }

      function nextColorScheme() {
        const theme = getColorScheme();
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        setColorScheme(nextTheme);
      }

      window.getColorScheme = getColorScheme
      window.nextColorScheme = nextColorScheme

      // 兼容
      if (window.matchMedia('(prefers-color-scheme)').media === 'not all') {
        setColorScheme('light');
        return;
      }

      const darkMode = window.matchMedia('(prefers-color-scheme: dark)');

      let preferredTheme;

      try {
        preferredTheme = localStorage.getItem(colorSchemeKey);
      } catch (err) { }

      const theme = preferredTheme ? preferredTheme : (darkMode.matches ? 'dark' : 'light');
      setColorScheme(theme);

      // 监听变化
      darkMode.addListener((e) => {
        const isDark = e.matches;
        const theme = isDark ? 'dark' : 'light';
        setColorScheme(theme);
      })

    })(window);
  </script>
</head>
<body>
  <button id="button">Theme Switcher</button>
  <script>
    const button = document.getElementById('button');
    const buttonTexts = {
      light: 'Dark Mode',
      dark: 'Light Mode',
    };
    button.innerHTML = buttonTexts[window.getColorScheme()];
    button.addEventListener('click', window.nextColorScheme);

    window.addEventListener('color-scheme', (event) => {
      const { theme } = event.detail;
      button.innerHTML = buttonTexts[window.getColorScheme()];
    })
  </script>
</body>
</html>
```

## 参考连接

- [prefers-color-scheme: Hello darkness, my old friend](https://web.dev/prefers-color-scheme/)
