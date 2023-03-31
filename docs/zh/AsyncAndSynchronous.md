# AsyncAndSynchronous

关键词：异步加载（async loading），延迟加载（lazy loading），延迟执行（lazy execution），async 属性， defer 属性

## 一、同步加载与异步加载的形式

## 1. 同步加载

我们平时最常使用的就是这种同步加载形式：

```js
<script src="http://yourdomain.com/script.js"></script>
```

同步模式，又称阻塞模式，会阻止浏览器的后续处理，停止了后续的解析，因此停止了后续的文件加载（如图像）、渲染、代码执行。

js 之所以要同步执行，是因为 js 中可能有输出 document 内容、修改 dom、重定向等行为，所以默认同步执行才是安全的。

以前的一般建议是把`<script>`放在页面末尾`</body>`之前，这样尽可能减少这种阻塞行为，而先让页面展示出来。

简单说：加载的网络 timeline 是瀑布模型，而异步加载的 timeline 是并发模型。

## 2. 常见异步加载（Script DOM Element）

```js
(function () {
  var s = document.createElement("script");
  s.type = "text/javascript";
  s.async = true;
  s.src = "";
  var x = document.getElementsByTagName("script")[0];
  x.parentNode.insertBefore(s, x);
})();
```

异步加载又叫非阻塞，浏览器在下载执行 js 同时，还会继续进行后续页面的处理。

这种方法是在页面中`<script>`标签内，用 js 创建一个 script 元素并插入到 document 中。这样就做到了非阻塞的下载 js 代码。

async 属性是 HTML5 中新增的异步支持，见后文解释，加上好（不加也不影响）。

此方法被称为 Script DOM Element 法，不要求 js 同源。

将 js 代码包裹在匿名函数中并立即执行的方式是为了保护变量名泄露到外部可见，这是很常见的方式，尤其是在 js 库中被普遍使用。

例如 Google Analytics 和 Google+ Badge 都使用了这种异步加载代码：

```js
(function () {
  var ga = document.createElement("script");
  ga.type = "text/javascript";
  ga.async = true;
  ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(ga, s);
})();
```

```js
(function () {
  var po = document.createElement("script");
  po.type = "text/javascript";
  po.async = true;
  po.src = "https://apis.google.com/js/plusone.js";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(po, s);
})();
```

但是，**这种加载方式在加载执行完之前会阻止 onload 事件的触发**，而现在很多页面的代码都在 onload 时还要执行额外的渲染工作等，所以还是会阻塞部分页面的初始化处理。

## 3. onload 时的异步加载

```js
(function () {
  function async_load() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = "http://yourdomain.com/script.js";
    var x = document.getElementsByTagName("script")[0];
    x.parentNode.insertBefore(s, x);
  }
  if (window.attachEvent) window.attachEvent("onload", async_load);
  else window.addEventListener("load", async_load, false);
})();
```

它不是立即开始异步加载 js ，而是在 onload 时才开始异步加载。这样就解决了阻塞 onload 事件触发的问题。

补充：**DOMContentLoaded 与 OnLoad 事件**

DOMContentLoaded : 页面(document)已经解析完成，页面中的 dom 元素已经可用。但是页面中引用的图片、subframe 可能还没有加载完。

OnLoad：页面的所有资源都加载完毕（包括图片）。浏览器的载入进度在这时才停止。

这两个时间点将页面加载的 timeline 分成了三个阶段。

## 4. 异步加载的其它方法

由于 Javascript 的**动态特性**，还有很多异步加载方法：

- XHR Eval
- XHR Injection
- Script in Iframe
- Script Defer
- document.write Script Tag
- 还有一种方法是用 setTimeout 延迟 0 秒 与 其它方法组合。

**XHR Eval** ：通过 ajax 获取 js 的内容，然后 eval 执行。

```js
var xhrObj = getXHRObject();
xhrObj.onreadystatechange = function () {
  if (xhrObj.readyState != 4) return;
  eval(xhrObj.responseText);
};
xhrObj.open("GET", "A.js", true);
xhrObj.send("");
```

**Script in Ifram**e：创建并插入一个 iframe 元素，让其异步执行 js 。

```js
var iframe = document.createElement("iframe");
document.body.appendChild(iframe);
var doc = iframe.contentWindow.document;
doc.open().write('<body onload="insertJS()">');
doc.close();
```

**GMail Mobile**：页内 js 的内容被注释，所以不会执行，然后在需要的时候，获取 script 元素中 text 内容，去掉注释后 eval 执行。

```html
<script type="text/javascript">
  /*
    var ...
    */
</script>
```

详见参考资料中 2010 年的 Velocity 大会 Steve Souders 和淘宝的那两个讲义。

## 二、async 和 defer 属性

## 1. defer 属性

```js
<script src="file.js" defer>
  {" "}
</script>
```

defer 属性声明这个脚本中将不会有 document.write 或 dom 修改。所有有 defer 的属性都会按照顺序执行。

浏览器将会并行下载 file.js 和其它有 defer 属性的 script，而不会阻塞页面后续处理。

## 2. async 属性

```js
<script src="file.js" async>
  {" "}
</script>
```

async 属性是 HTML5 新增的。作用和 defer 类似，但是它将在下载后尽快执行，**不能保证脚本会按顺序执行**。它们将在 onload 事件之前完成。

**说明：**

1. 没有 async 属性，script 将立即获取（下载）并执行，然后才继续后面的处理，这期间阻塞了浏览器的后续处理。
2. 如果有 async 属性，那么 script 将被异步下载并执行，同时浏览器继续后续的处理。
3. HTML4 中就有了 defer 属性，它提示浏览器这个 script 不会产生任何文档元素（没有 document.write），因此浏览器会继续后续处理和渲染。
4. 如果没有 async 属性 但是有 defer 属性，那么 script 将在页面 parse 之后执行。
5. 如果同时设置了二者，那么 defer 属性主要是为了让不支持 async 属性的老浏览器按照原来的 defer 方式处理，而不是同步方式。

## 三、延迟加载（lazy loading）

前面解决了异步加载（async loading）问题，再谈谈什么是延迟加载。

延迟加载：有些 js 代码并不是页面初始化的时候就立刻需要的，而稍后的某些情况才需要的。延迟加载就是一开始并不加载这些暂时不用的 js，而是在需要的时候或稍后再通过 js 的控制来异步加载。

也就是将 js 切分成许多模块，页面初始化时只加载需要立即执行的 js ，然后其它 js 的加载延迟到第一次需要用到的时候再加载。

特别是页面有大量不同的模块组成，很多可能暂时不用或根本就没用到。

就像图片的延迟加载，在图片出现在可视区域内时（在滚动条下拉）才加载显示图片。

## 四、script 的两阶段加载 与 延迟执行（lazy execution）

JS 的加载其实是由两阶段组成：下载内容（download bytes）和执行（parse and execute）。

浏览器在下载完 js 的内容后就会立即对其解析和执行，不管是同步加载还是异步加载。

前面说的异步加载，解决的只是下载阶段的问题，但代码在下载后会立即执行。
而浏览器在解析执行 JS 阶段是阻塞任何操作的，这时的浏览器处于无响应状态。
我 们都知道通过网络下载 script 需要明显的时间，但容易忽略了第二阶段，解析和执行也是需要时间的。script 的解析和执行所花的时间比我们想象的要多，尤其是 script 很多很大的时候。有些是需要立刻执行，而有些则不需要（比如只是在展示某个界面或执行某个操作时才需要）。
这些 script 可以延迟执行，先异步下载缓存起来，但不立即执行，而是在第一次需要的时候执行一次。

## 五、JS 模块化管理

异步加载，需要将所有 js 内容按模块化的方式来切分组织，其中就存在依赖关系，而异步加载不保证执行顺序。

## 六、JS 最佳实践

- 最小化 js 文件，利用压缩工具将其最小化，同时开启 http gzip 压缩。工具：

- 尽量不要放在`<head>` 中，尽量放在页面底部，最好是`</body>`之前的位置

- 避免使用 document.write 方法

- 异步加载 js ，使用非阻塞方式，就是此文内容。

- 尽量不直接在页面元素上使用 Inline Javascript，如 onClick 。有利于统一维护和缓存处理。
