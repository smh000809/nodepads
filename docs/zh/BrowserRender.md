# BrowserRender

- 浏览器将获取的`HTML`文档解析成 DOM 树。**【构建 DOM 树(DOM Tree)】**

- 处理 CSS 标记，构成层叠样式表模型`CSSOM`(CSS Object Model)。**【构建 CSSOM 规则树(CSSOM Tree)】**

- 将`DOM`和`CSSOM`合并为渲染树(`rendering tree`)，代表一系列将被渲染的对象。**`【合并DOM和CSSOM为一棵树=渲染树(Render Tree)】`**

  display:none;的元素**不在**Render Tree 中

  visibility:none;的元素**在**Render Tree 中

- 渲染树的每个元素包含的内容都是计算过的，它被称之为布局`layout`。浏览器使用一种流式处理的方法，只需要一次绘制操作就可以布局所有的元素。**`【渲染树布局(Layout)】`**

  float 元素，absoulte 元素，fixed 元素会发生位置偏移（脱机文档流）

- 将渲染树的各个节点绘制到屏幕上，这一步被称为绘制`painting`。**`【渲染树绘制(painting)】`**
