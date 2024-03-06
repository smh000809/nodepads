# CSSRelated

## CSS 几种常用的清除浮动方法

❤️❤️❤️ 父级 div 定义伪类：after 和 zoom;

```css
/* 这个class名指的是需要清除浮动的父级 */
.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
  line-height: 0;
}
.clearfloat {
  zoom: 1;
}
```

解释：IE8 以上和非 IE 浏览器才支持:after，zoom(IE 转有属性)可解决 ie6,ie7 浮动问题.

❤️❤️❤️ 在结尾处添加空 div 标签 clear:both;

```css
/* 这个class名指的是结尾添加的空标签，或者在尾部标签加这个名字 */
.clearfloat {
  clear: both;
}
```

解释：如果页面浮动布局多，就要增加很多空 div.

❤️❤️ 父级 div 定义 height;

```css
/* 这个class名指的是需要清除浮动的父级 */
.div {
  height: 200px; /* 子集多少这里给多少 */
}
```

解释：只适合高度固定的布局，要给出精确的高度，如果高度和父级 div 不一样时，会产生问题.

❤️❤️❤️ 父级 div 定义 overflow:hidden;

```css
/* 这个class名指的是需要清除浮动的父级 */
.div {
  overflow: hidden;
}
```

解释：**不能和 position 配合使用**，因为超出的尺寸的会被隐藏，新手专用，**必须定义 width 或 zoom:1，同时不能定义 height**，使用 overflow:hidden 时，浏览器会自动检查浮动区域的高度.

❤️ 父级 div 定义 overflow:auto;

```css
/* 这个class名指的是需要清除浮动的父级 */
.div {
  overflow: auto;
}
```

解释：内部宽高超过父级 div 时，会出现滚动条.

❤️ 父级 div 定义 display:table;

```css
/* 这个class名指的是需要清除浮动的父级 */
.div {
  display: table;
}
```

解释：将 div 属性变成表格，没有优点.

❤️ 父级 div 定义 zoom:1 来解决 IE 浮动问题，结尾处加 br 标签 clear:both;

## CSS 命名规则

### 一主体

头部：header

内容：content/container

尾部：footer

导航：nav

侧栏：sidebar

栏目：column

整体布局：wrapper

左右中：left / right / center

登录条：loginbar

标志：logo

广告：banner

页面主体：main

热点：hot

新闻：news

下载：download

子导航：subnav

菜单：menu

子菜单：submenu

搜索：search

友情链接：friendlink

页脚：footer

版权：copyright

滚动：scroll

标签页：tab

文章列表：list

提示信息：msg

小技巧：tips

栏目标题：title

加入：join

指南：guild

服务：service

注册：regsiter

状态：status

投票：vote

合作伙伴：partner

### css 注释的写法

如内容区，Html 注释的写法 ：<!--header 头部-- >

### id 的命名规范

#### (1)页面结构

容器: container

页头：header

内容：content/container

页面主体：main

页尾：footer

导航：nav

侧栏：sidebar

栏目：column

页面外围控制整体布局宽度：wrapper

左右中：left right center

#### (2)导航

导航：nav

主导航：mainnav

子导航：subnav

顶导航：topnav

边导航：sidebar

左导航：leftsidebar

右导航：rightsidebar

菜单：menu

子菜单：submenu

标题: title

摘要: summary

#### (3)功能

标志：logo

广告：banner

登陆：login

登录条：loginbar

注册：regsiter

搜索：search

功能区：shop

标题：title

加入：joinus

状态：status

按钮：btn

滚动：scroll

标签页：tab

文章列表：list

提示信息：msg

当前的: current

小技巧：tips

图标: icon

注释：note

指南：guild

服务：service

热点：hot

新闻：news

下载：download

投票：vote

合作伙伴：partner

友情链接：link

版权：copyright

#### (四)class 的命名

##### (1)颜色：使用颜色的名称或者 16 进制代码，如

```css
.red {
  color: red;
}
.f60 {
  color: #f60;
}
.ff8600 {
  color: #ff8600;
}
```

##### (2)字体大小，直接使用“font+字体大小”作为名称，如

```css
.font12px {
  font-size: 12px;
}
.font9pt {
  font-size: 9pt;
}
```

##### (3)对齐样式，使用对齐目标的英文名称，如

```css
.left {
  float: left;
}
.bottom {
  float: bottom;
}
```

##### (4)标题栏样式，使用“类别+功能”的方式命名，如

```css
.barnews {
}
.barproduct {
}
```

## CSS 模块绝对居中

```css
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -当前盒子宽度的1/2;
  margin-top: -当前盒子高度的1/2;
}
```

```css
.center {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
```

```css
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```
