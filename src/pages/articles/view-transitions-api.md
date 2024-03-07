---
title: View Transition Api
date: 2024-03-17T17:00:00.000+00:00
lang: zh
duration: 10min
---

View Transitions API 是一类较新的 web API, 为 DOM 更新提供了更加便利的过渡机制, 目前, chrome 111 + 已经支持该 API.

传统的过渡动画有什么缺点呢?

最大的缺点就是交叠(overlap).
老旧 DOM 的状态会同时出现在页面, 造成一些列麻烦. 例如过渡的过程中, 出现了滚动条, 页面产生抖动等. 我们往往需要额外写一些 css 来处理交叠 阶段的麻烦. 同时, 交叠还造成了一些无障碍访问的问题.

但 View Transitions API 走了另一条道路. 它利用快照 snapshot 技术, 在 DOM 状态更新的过程中, 不会有交叠状态出现.

其使用形式如下:

```js
document.startViewTransition(() => 触发DOM状态变动的代码);
```

调用 `startViewTransition()`时, 浏览器会先记录一张快照, 然后执行触发DOM状态变动的代码.
执行完毕后, 浏览器再次捕捉一张快照.
有了两个快照, 浏览器会在页面最上层, 构建一个类似下面结构的伪元素树:

```js
    :: view-transition
    └─ :: view-transition-group(root)
       └─ :: view-transition-image-pair(root)
          ├─ :: view-transition-old(root)
          └─ :: view-transition-new(root)
```

只用去控制这个伪元素树,即可实现过渡动画效果.

也可以支持异步

```js
document.startViewTransition(async () => {
  await something;
  await updateTheDOMSomehow();
  await somethingElse;
});
```

所有 `promise fulfill` 之后, 才会开始过渡.
注意: 这里页面将会失去交互能力,所以应当尽量减少延时, 网络 fetch 请求要在调用 startViewTransition 之前完成.

默认过渡类型是: `cross-fade`.
可以用下述方式,取消默认的过渡动画

```css
::view-transition-old(root),
::view-transition-new(root) {
  /* Prevent the default animation,
  so both views remain opacity:1 throughout the transition */
  animation: none;
  /* Use normal blending,
  so the new view sits on top and obscures the old view */
  mix-blend-mode: normal;
}
```

有些动画是跟点击事件关联的, 所以需要引入js代码. 这里可以利用 `transition.ready` 和 Web 动画API 来实现.

当伪元素树构建完成之后, `transition.ready`就能执行回调函数了.
