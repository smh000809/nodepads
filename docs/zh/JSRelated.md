# JSRelated

## BOM

1. BOM：**浏览器对象模型 Browser Object Model**，是 Javascript 的重要组成部分。它提供了一系列对象用于与浏览器窗口进行交互，这些对象通常统称为 BOM。
2. 常见的 BOM 对象有哪些?

|   对象    |                                    作用                                     |
| :-------: | :-------------------------------------------------------------------------: |
|  window   |     代表整个浏览器窗口（window 是 BOM 中的一个对象，并且是顶级的对象）      |
| document  |                window 对象的一个属性，可以用来处理页面文档。                |
| Navigator | 代表浏览器当前的信息，通过 Navigator 我们可以获取用户当前使用的是什么浏览器 |
| Location  | 代表浏览器当前的地址信息，通过 Location 我们可以获取或者设置当前的地址信息  |
|  History  |    代表浏览器的历史信息，通过 History 我们可以实现上一步/刷新/下一步操作    |
|  Screen   |                             代表用户的屏幕信息                              |

```javascript
//------1------
//window对象 --- 是JS的最顶层对象，其他的BOM对象都是window对象的属性。
//提供了独立于内容与浏览器窗口进行交互的对象，使用浏览器对象模型可以实现与HTML的交互。
//window.属性名 = "属性值";
window.alert('提示信息');
window.confirm("确认信息");
window.prompt("弹出输入框")
window.open("url地址"，'打开的方式（可以是-self或-black）'，'新窗口的大小')
window.close() //关闭当前的网页。 注：存在兼容性问题
window.moveTo() //移动当前窗口(了解)注：存在兼容性问题
window.resizeTo() //调整当前窗口的尺寸
window.setTimeout(函数，时间) //只执行一次
window.setInterval(函数，时间) //无限执行
window.clearTimeout/window.clearInterval(定时器名称) //清除定时器
//Window尺寸：有三种方法能够确定浏览器窗口的尺寸。
//对于Internet Explorer、Chrome、Firefox、Opera 以及 Safari：
window.innerHeight//浏览器窗口的内部高度(包括滚动条)，浏览器可视区域的高
window.innerWidth//浏览器窗口的内部宽度(包括滚动条)，浏览器可视区域的宽
//对于 Internet Explorer 8、7、6、5：
document.documentElement.clientHeight
document.documentElement.clientWidth
//或者
document.body.clientHeight
document.body.clientWidth

//------2------
//document对象：文档对象。
//它是window对象的一个属性，可以用来处理页面文档。
document.attribute

//------3------
//location对象：浏览器当前URL信息。
//对象用于获得当前页面的地址 (URL)，并把浏览器重定向到新的页面。
window.location 对象在编写时可不使用 window 这个前缀。 一些例子：
location.herf = 'url地址';
location.hostname 返回 web 主机的域名
location.pathname 返回当前页面的路径和文件名
location.port 返回 web 主机的端口 （80 或 443）
location.portocol 返回页面使用的web协议。 http:或https:
// 重要的API：
location.reload();
location.assign();
location.replace();

//------4----
//Navigator对象：浏览器本身信息。
//window.navigator对象包含有关访问者浏览器的信息。在编写时可不使用 window 这个前缀。
navigator.platform//操作系统类型
navigator.userAgent//浏览器设定的User-Agent字符串(重要)。最常用的属性，用来完成浏览器判断
navigator.appCodeName//浏览器代号
navigator.appName//浏览器名称
navigator.appVersion//浏览器版本
navigator.language//浏览器设置的语言
navigator.systemLanguage//浏览器系统语言
navigator.cookieEnabled//浏览器是否启用了cookie

//------5------
//screen对象：客户端屏幕信息。
screen.availWidth//属性返回访问者屏幕的宽度，以像素计，减去界面特性，比如窗口任务栏。
screen.availHeight//属性返回访问者屏幕的高度，以像素计，减去界面特性，比如窗口任务栏。

//------6------
//History对象：浏览器访问历史信息。
//window.history对象包含浏览器的历史。为了保护用户隐私，对 JavaScript 访问该对象的方法做出了限制。
history.length//属性返回浏览器历史列表中的 URL 数量。
history.back()//加载历史列表中的前一个 URL。返回上一页。
history.forward()//加载历史列表中的下一个 URL。返回下一页。
history.go(-1)//负数时返回上一页，正数时返回下一页，
```

## JS DOM 操作

### 获取元素

1. `getElementById`：返回元素节点

   ```javascript
   document.getElementById("idName"); //id名获取，单个id的定义不能重复
   ```

2. `getElementsByClassName`：返回 HTMLCollection 对象（IE9 以下不支持）

   ```javascript
   document.getElementsByClassName("className"); //class名获取一组HTMLDom元素
   ```

3. `getElementsByTagName`：返回 HTMLCollection 对象

   ```javascript
   document.getElementsByTagName("tagName"); //标签名获取一组HTMLDom元素
   ```

4. `getElementsByName`：返回 nodeList 对象,第 0 项为元素节点

   ```javascript
   document.getElementsByName(); //获取一组带有指定name属性的对象
   ```

5. `querySelector`：返回选择器匹配到的第一个元素节点

   ```javascript
   document.querySelector("#box em"); //选择器同css用法一致,支持由外到内的嵌套写法
   ```

6. `querySelectorAll`：返回 nodeList 对象（类似数组对象,每个值为选中元素节点)

   ```javascript
   document.querySelectorAll(); //获取HTMLDom中匹配指定 CSS 选择器的所有元素
   ```

7. `childNodes`：获取子元素集合（IE：只获取元素节点；非 IE：获取元素节点与文本节点；)

   ```javascript
   document.getElementById().childNodes; //获取Id下的所有子元素集合
   //childNodes：获取指定元素的子元素集合(包括HTML节点，所有属性，文本),可以通过nodeType来判断是哪种类型的节点，当nodeType==1时是元素节点，2是属性节点，3是文本节点(IE9/Firefox不支持childNodes(i))
   ```

   `children`：获取指定元素的子元素节点集合（只获取元素节点，浏览器表现相同，Firefox 下不支持()取集合元素）

   ```javascript
   document.getElementById().children;
   ```

8. `lastElementChild`：获取最后一个元素节点（IE<9 不支持）

   ```javascript
   document.getElementById().lastElementChild;
   ```

9. `firstElementChild`：获取第一个元素节点（IE<9 不支持)

   ```javascript
   document.getElementById().firstElementChild;
   ```

10. `nextSibling`：获取后一个兄弟元素节点（IE<9：后一个兄弟元素节点；非 IE6,7,8：后一个兄弟节点，文本节点或者元素节点)

    ```js
    document.getElementById().nextSibling;
    document.getElementById().nextElementSibling;
    ```

    `nextElementSibling`：（IE<9 不支持）

    `nextSibling`属性返回元素节点之后的兄弟节点（包括文本节点、注释节点即回车、换行、空格、文本等等)；

    `nextElementSibling`属性只返回元素节点之后的兄弟元素节点（不包括文本节点、注释节点)；

11. `previousSibling`：获取前一个兄弟元素节点（IE<9 前一个兄弟元素节点；非 IE6,7,8：前一个兄弟节点，文本节点或者元素节点）

    ```js
    document.getElementById().previousSibling;
    document.getElementById().previousElementSibling;
    ```

    `previousElementSibling`：获取指定元素的前一个兄弟元素（相同节点树层中的前一个元素节点,IE<9 不支持)

    `previousSibling`属性返回元素节点之前的兄弟节点（包括文本节点、注释节点）；

    `previousElementSibling`属性只返回元素节点之前的兄弟元素节点（不包括文本节点、注释节点）；

12. `parentNode`：获取父元素节点（parentElement 用法一致,仅 IE 支持）

    ```js
    document.getElementById().parentNode;
    ```

13. `offsetParent`：获取第一个设置定位的上级元素,返回元素节点

    ```javascript
    console.log(document.getElementById().offsetParent);
    ```

---

### 操作内容

- **`innerText`**

- `outerHTML`：对元素自身的快速替换，比如:

  ```javascript
  //<p id="hello">Hello, I am a demo</p>
  $("hello").outerHTML = "<p>Hello, I am a replacement</p>";
  ```

- `documentFragment`：能实现高效率的 DOM 节点插入操作

  ```javascript
  var docFragment = document.createDocumentFragment();
  ```

- **`textContent`**：针对元素中的文本内容的操作，提取元素本身和其子元素中文本内容， 比如：

  ```javascript
  //<div id="test">
  // <p>whatever, blah blah.</p>
  // hello，I am a <em>Demo</em>
  //</div>
  $("test").textContent;
  //whatever, blah blah.hello, I am a Demo
  ```

  ✔ 把文本直接连接起来。IE9+和其他浏览器都很好的支持此方法。

---

### 操作属性

- src 、href

- title、alt 、id

- 表单标签属性：type、value、[checked、selected、disabled (boolean 类型的值)]

- 操作样式：style、className

- attribute：

  1. getAttribute()（返回元素上一个指定的属性值）
  2. setAttribute()（设置指定元素上的某个属性值。如果属性已经存在，则更新该值；否则，使用指定的名称和值添加一个新的属性）
  3. removeAttribute()（获取某个属性当前的值）
  4. attributes()（要删除某个属性）
  5. dataset()（获取自定义属性值的使用（date-\*自定义属性））

### 节点操作

- 查找节点

  - parentNode（父节点）
  - childNodes（子节点）
  - previousSibling（下一个同胞元素）
  - nextSibling（上一个同胞元素）
  - firstChild（第一个元素）
  - lastChild（最后一个元素）
  - 元素节点：
    - parentElement（父元素节点）
    - children
    - previousElementSibling（返回当前节点的前一个兄弟节点，无返回 null）
    - nextElementSibling（返回当前元素在其父元素的子元素节点中的后一个元素节点,如果该元素已经是最后一个元素节点，则返回 null）
    - firstElementChild（返回对象的第一个子元素，如果没有子元素，则为 null）
    - lastElementChild（返回对象的最后一个子元素， 如果没有子元素，则为 null）

- 新增

  - **createElement（）标签节点**
  - createTextNode（）文本节点
  - createAttribute（）设置标签属性
  - **appendChild()**添加节点（末尾）
  - **inserBefore()**在参考节点之前插入一个拥有指定父节点的子节点。
  - append() 如果新增元素是从页面获取的，那么会执行移动 操作，而不是复制
  - cloneNode() 克隆节点

- 删除

  **remove()**删除元素本身及所有子内容

  **removeChild()**保留当前容器，删除所有子内容

- 修改

  **replaceChild()**替换节点

## JS Cookie

| 属性     | 说明                                 | 示例                               |
| :------- | ------------------------------------ | ---------------------------------- |
| name     | cookie 的 key 值                     | 'id=sjjdjdd'                       |
| expires  | 到期时间                             | 'expires=21 Oct 2015 07:28:00 GMT' |
| domin    | cookie 生效的域                      | 'domin=im.baidu.com'               |
| path     | cookie 生效的路径                    | 'path=/'                           |
| secure   | 是否在 https 下生效                  | 'secure'                           |
| httponly | 是否允许 JS 获取                     | 'httponly'                         |
| max-age  | 以秒为单位设置过期时间(IE678 不生效) | '31536000'                         |

1. 创建 cookie :

   ```javascript
   // 创建 cookie
   document.cookie = "username=John Doe";
   // 为 cookie 添加一个过期时间（以 UTC 或 GMT 时间）。默认情况下，cookie 在浏览器关闭时删除
   document.cookie = "username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT";
   // path 参数告诉浏览器 cookie 的路径。默认情况下，cookie 属于当前页面
   document.cookie = "username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/";
   ```

2. 修改 cookie：

   ```javascript
   // cookie 的 name 属性是唯一的，重新创建一样的 name 属性值可做到修改
   document.cookie = "username=John Smith; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/";
   ```

3. 删除 Cookie：

   ```javascript
   // 设置 expires 参数为以前的时间，到期将被删除，name 的属性值可不写
   document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
   ```

4. 一个小方法：toGMTString()

   ```javascript
   // 当前的时间
   var data = new Date();
   console.log(data); // Sat Oct 16 2021 14:44:41 GMT+0800 (中国标准时间)
   console.log(data.toGMTString()); //Sat, 16 Oct 2021 06:44:41 GMT
   ```

   **总结**：toGMTString() 方法可根据格林威治时间 (GMT) 把 Date 对象转换为字符串，并返回结果。

5. 设置 cookie 属性按照表格的顺序写

6. 会话 cookie：如果 cookie 不包含到期日期，则可视为会话 cookie。 会话 cookie 存储在内存中，决不会写入磁盘。 当浏览器关闭时，cookie 将从此永久丢失

   持久性 cookie: 如果 cookie 包含到期日期，则可视为持久性 cookie。 在指定的到期日期，cookie 将从磁盘中删除。

7. cookie 的优点：
   对数据安全性要求不高。
   跨页面共享数据。
   存储空间约 4kb 左右

   cookie 的缺点
   1）cookie 可能被禁用；
   2）cookie 与浏览器相关，不能互相访问；（cookie 跨域可以实现，存储安全性风险）
   3）cookie 可能被用户删除；
   4）cookie 安全性不够高；
   5）cookie 存储空间很小，大约 4kb 左右。

## JS 运算符

- 赋值运算符： = += -= \*= /= %=
- 算数运算符： + - \* / % ++ --
- 比较运算符： > < >= <= == === != !==
- 逻辑运算符： && || !

```javascript
// 多个表达式是 "&&" 连接，这些表达式必须同时成立，才会返回true;否则返回false
// 多个表达式是 "||" 连接，这些表达式中有一个成立，则返回true;如所有表达式都不成立,返回false
```

## JS 事件

- 事件的三要素：

  1. **事件源** 事件被触发的对象 谁被触发
  2. **事件类型** 如何触发 什么事件 比如鼠标点击（onclick），鼠标经过，键盘按下
  3. **事件处理程序** 通过 一个函数赋值的方式 完成

- 常用事件类型：鼠标、键盘、表单、change

- form 的 formData

- 事件对象 event 兼容性写法

  - **`Event 对象`代表事件的状态，比如事件在其中发生的元素、键盘按键的状态、鼠标的位置、鼠标按钮的状态**。事件通常与函数结合使用，函数不会在事件发生前被执行！

    当一个事件发生的时候，和当前这个对象发生的这个事件有关的一些详细信息（包括导致事件的元素、事件的类型、以及其它与特定事件相关的信息等。这个对象是在执行事件时，浏览器通过函数传递过来的。）都会被临时保存到一个指定的地方——event 对象，供我们在需要的时候调用.

- 事件流 阻止冒泡——兼容性写法

  - **防止冒泡和捕获：w3c 的方法是 e.stopPropagation()，IE 则是使用 e.cancelBubble = true**

    stopPropagation 也是事件对象(Event)的一个方法，作用是阻止目标元素的冒泡事件，但是会不阻止默认行为。什么是冒泡事件？如在一个按钮是绑定一个”click”事件，那么”click”事件会依次在它的父级元素中被触发 。stopPropagation 就是阻止目标元素的事件冒泡到父级元素

- 阻止默认行为 兼容性写法：return false

  - JavaScript 的**`return false`**只会阻止默认行为，而是用 jQuery 的话则既阻止默认行为又防止对象冒泡。

  - **取消默认事件：w3c 的方法是 e.preventDefault()，IE 则是使用 e.returnValue = false;**

    preventDefault 它是事件对象(Event)的一个方法，作用是取消一个目标元素的默认行为。什么元素有默认行为呢？如链接\<a>，提交按钮\<input type="submit">等。

- 事件委托：将多个子元素的相同事件，绑定给页面上现存的共同的父元素
  利用事件冒泡触发父元素的事件，利用事件目标找到真正点击的元素

- 鼠标事件：

  - 元素的 onclick 标签属性

  - 页面 js 对象.onclick=function(){}

  - addEventListener() 方法 【官方推荐】removeEventListener 移除

  - ie9 之前 attachEvent() detachEvent()移除

  - 鼠标事件：

    - click
    - dblclick 短时双击同一个元素触发
    - mouseover/out 鼠标移入/移出
    - mouseenter/leave 鼠标移进/离开
    - mousedown/up 鼠标按下/释放
    - mousemove 鼠标移动
    - 右键：contextmenu

- 键盘事件：

  - keydown 按键向下按的时候触发
  - keyup 按键回弹的时候触发
  - keypress 按键触底的时候触发

- 表单事件：

  - 失去焦点 blur
  - 获取焦点 focus
  - submit 提交事件
  - change 数据发生改变会触发的事件

- 拖拽事件

  - ondragstart 开始拖拽
  - ondrag 正在拖拽,仅在窗口内有效
  - ondragend 结束拖拽
  - 以上三个事件绑定的是被拖拽的元素
  - 以下三个事件绑定的是元素拖拽的范围
  - ondragenter 有一个标签被拖入到事件范围内
  - ondragover 有一个标签在事件范围内,持续触发事件
  - ondragleave 有一个标签被拖出了事件范围

总结：

防止冒泡和捕获：w3c 的方法是 e.stopPropagation()，IE 则是使用 e.cancelBubble = true\*\*

阻止默认行为：return false

取消默认事件：w3c 的方法是 e.preventDefault()，IE 则是使用 e.returnValue = false;

## JS 内置对象

- **Math：用于 number 类型。**

  - Math.PI（圆周率，一个圆的周长和直径之比，约等于 `3.14159`）
  - Math.E（欧拉常数，也是自然对数的底数，约等于 `2.718`）
  - Math.random()（返回一个 0 到 1 之间的伪随机数）
  - Math.max()（返回零到多个数值中最大值）
  - Math.min()（返回零到多个数值中最小值）
  - Math.pow(x, y)（返回一个数的 y 次幂）
  - Math.floor(x)（返回小于一个数的最大整数，即一个数向下取整后的值）

- **date：**

  - new Date()（实例化一个`Date`对象）
  - getDate（返回一个 1 到 31 的整数值。）
  - getDay（根据本地时间，返回具体日期中一周的第几天，0 表示星期天。）
  - getMouth（返回表示月份的数字，。一月为 0, 二月为 1, 以此类推。）
  - ...（更多详情`MDN`）

- Array（**`Array`** 对象是用于构造数组的全局对象，数组是类似于列表的高阶对象。）

  - 常用的数组方法：

  ```javascript
  var fruits = ["Apple", "Banana"]; //创建数组
  fruits.isArray(); //确定传递的值是否是一个Array，返回值为true或false。
  console.log(fruits.length); //打印数组长度
  var last = fruits[fruits.length - 1]; //通过索引访问数组元素最后一个元素
  var first = fruits[0]; //通过索引访问数组元素第一个元素
  fruits.forEach(function (item, index, array) {
    console.log(item, index);
  }); //遍历数组
  var newLength = fruits.push("Orange"); //添加元素到数组的末尾
  var last = fruits.pop(); //删除数组末尾的元素
  var first = fruits.shift(); //删除数组头部元素
  var newLength = fruits.unshift("Strawberry"); //添加元素到数组的头部
  var pos = fruits.indexOf("Banana"); //找出某个元素在数组中的索引
  var removedItem = fruits.splice(pos, 1); //通过索引删除某个元素
  var shallowCopy = fruits.slice(); //复制一个数组
  ```

  - 数组的索引是从 0 开始的，第一个元素的索引为 0，最后一个元素的索引等于该数组的 length-1
  - 如果指定的索引是一个无效值，JavaScript 数组并不会报错，而是会返回 undefined
  - 抛出 SyntaxError 异常的原因是使用了非法的属性名
  - 在 JavaScript 中，数组对象名以数字开头的属性不能用点号引用，必须用方括号
  - `includes()`方法判断一个数组是否包含一个指定的值，返回值为 true 或 false
  - `concat()`用于合并两个或多个数组并返回一个新数组
  - `copyWithin()`浅复制数组的一部分到同一数组中的另一个位置，并返回到新数组
  - `every()`测试一个数组内的所有元素是否都能通过某个指定函数的测试,返回一个布尔值
  - `fill()`用一个固定值填充一个数组中从起始索引到终止索引内的全部元素
  - `filter()`通过所提供函数实现的测试的所有元素,返回到一个新数组
  - `find()`返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined
  - `findIndex()`返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回 -1
  - `indexOf()`返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回 -1
  - `flat()`按照一个可指定的深度递归遍历数组，将所有元素与遍历到的子数组中的元素合并为新数组返回
  - `forEach()`对数组的每个元素执行一次给定的函数
  - `join()`将一个数组的所有元素连接成一个字符串并返回这个字符串
  - `lastIndexOf()`返回指定元素在数组中的最后一个的索引，如果不存在则返回 `-1`
  - `map()`数组中的每个元素调用一次提供的函数后，返回到新数组里
  - `pop()`从数组中**`删除最后一个`**元素[返回该元素的值 or 打印数组]
  - `push()`将一个或多个元素**`添加`**到数组**`的末尾`**[返回该数组的新长度 or 打印数组]
  - `reduce()`对数组中的每个元素执行一次 reducer 函数（升序执行），返回一个值
  - `reverse()`**`颠倒数组`**元素的位置，返回该数组。**该方法会改变原数组**
  - `shift()`从数组中删除**`第一个`**元素[返回该元素的值 or 打印数组]
  - `slice()`提取源数组的一部分并返回一个新数组
  - `some()`测试数组中是不是至少有一个元素通过了被提供的函数测试，返回值为 true 或 false
  - `sort()`对数组元素进行原地排序并返回此数组，**`默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的`**
  - `splice()`通过删除或替换现有元素或者原地添加新的元素来修改数组，返回被修改的内容到数组
  - `toString()`将数组内容转化为字符串
  - `toLocaleString()`将数组内容转化为字符串
  - `unshift()`将一个或多个元素添加到数组的头部[返回该数组的新长度 or 打印数组]

- **String**

  - `trim()` 方法返回一个从两头去掉空白字符的字符串，并不影响原字符串本身。

  - `replace()` 方法返回一个由替换值（`replacement`）替换部分或所有的模式（`pattern`）匹配项后的新字符串。

  - `startsWith()` 方法判断当前字符串是否以另外一个给定的子字符串**`开头`**，并根据判断结果返回 `true` 或 `false`。

  - `endsWith()`方法判断当前字符串是否是以另外一个给定的子字符串**`结尾`**的，根据判断结果返回 `true` 或 `false`。

  - `includes()` 方法判断一个字符串是否包含在另一个字符串中，根据情况返回 true 或 false。

  - 转义字符：

    | Code | Output     |
    | ---- | ---------- |
    | `\0` | 空字符     |
    | `\'` | 单引号     |
    | `\"` | 双引号     |
    | `\\` | 反斜杠     |
    | `\n` | 换行       |
    | `\r` | `回车`     |
    | `\v` | 垂直制表符 |
    | `\t` | 水平制表符 |
    | `\b` | 退格       |
    | `\f` | 换页       |

## JS 继承

1. call 继承

   ```javascript
   Father.call(this);
   ```

2. 原型链继承

   ```javascript
   Child.prototype = new Father();
   Child.prototype.constructor = Child;
   ```

3. 组合

   ```javascript
   Father.call(this);
   Child.prototype = new Father();
   Child.prototype.constructor = Child;
   ```

4. 寄生组合继承

   ```javascript
   Father.call(this);
   // 用来寄托父财产
   function Super() {}
   // 将原型指向父实例对象
   Super.prototype = Father.prototype;
   Child.prototype = new Super();
   Child.prototype.constructor = Child;
   ```

5. 新版

   ```javascript
   // 原型继承：只能继承原型上的属性和方法，无法继承父类构造函数中属性和方法。
   // 用父类的原型创建一个“临时对象”，目的：让子类的原型和父类的原型“脱钩”
   Child.prototype = Object.create(Father.prototype);
   // 纠正子类的构造函数属性constructor指向，应该指向它自己。
   Child.prototype.constructor = Child;
   ```

6. 案例：

```javascript
// 父类
function Person(name) {
  this.name = name;
  this.sum = function () {
    alert(this.name);
  };
}
// 给构造函数添加了原型属性
Person.prototype.age = 10;

// 1.原型链继承
function Per() {
  this.name = "ker";
}
Per.prototype = new Person(); // 主要
Per.prototype.constructor = Per; // 主要
var per1 = new Per();
console.log(per1.age); // 10
// instanceof 判断元素是否在另一个元素的原型链上   <!-- instanecof -->
// per1 继承Person的属性。返回true
console.log(per1 instanceof Person);

// 2.借用构造函数继承
function Con() {
  Person.call(this, "jer"); // 重点
  this.age = 12;
}
var con1 = new Con();
console.log(con1.name); // "jer"
console.log(con1.age); // 12
console.log(con1 instanceof Person); // false

// 3.组合继承（组合原型链继承和构造函数继承（call继承）） （常用）
function SubType(name) {
  Person.call(this, name); // 借用构造函数模式
}
SubType.prototype = new Person(); // 原型链继承
var sub = new SubType("gar");
console.log(sub.name); // "gar"继承了构造函数属性
console.log(sub.age); // 10继承了父类原型属性

// 4.原型式继承
function content(obj) {
  function F() {}
  F.prototype = obj; // 继承了传入的参数
  return new F(); // 返回函数对象
}
var sup = new Person(); // 拿到父类的实例
var sup1 = content(sup);
console.log(sup1.age); // 10继承了父类函数的属性

// 5.寄生式继承
function content(obj) {
  function F() {}
  F.prototype = obj; // 继承了传入的参数
  return new F(); // 返回函数对象
}
var sup = new Person(); // 拿到父类的实例
// 以上是原型式继承，给原型式继承再套个壳子传递参数
function subobject(obj) {
  var sub = content(obj);
  sub.name = "gar";
  return sub;
}
var sup2 = subobject(sup);
// 这个函数经过声明后就成了可增添属性的对象
console.log(typeof subobject); // function
console.log(typeof sup2); // object
console.log(sup2.name); // "gar",返回了个sub对象,继承了sub的属性

// 6.寄生组合式继承 （常用）
function content(obj) {
  function F() {}
  F.prototype = obj; // 继承了传入的参数
  return new F(); // 返回函数对象
}
// content就是F实例的另一种表示法
var con = content(Person.prototype);
// con实例（F实例）的原型继承了父类函数的原型
// 上述更像是原型链继承，只不过是继承了原型属性
// 组合
function Sub() {
  Person.call(this); // 这个继承了父类构造函数的属性
} // 解决了组合式两次调用构造函数属性的特点
// 重点
Sub.prototype = con; // 继承了con实例
con.constructor = Sub; // 修复实例
var sub1 = new Sub();
// Sub的实例就继承了构造函数属性，父类实例，con的函数属性
console.log(sub1.age); // 10
```

## JS 中的任务队列

### 为什么 JavaScript 是单线程？

- 防止 DOM 渲染冲突的问题；
- Html5 中的 Web Worker 可以实现多线程

### 什么是任务队列？

> 任务队列”是一个先进先出的数据结构，排在前面的事件，优先被主线程读取。主线程的读取过程基本上是自动的，只要执行栈一清空，”任务队列”上第一位的事件就自动进入主线程。

#### 同步和异步任务

1. 同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；
2. 异步任务指的是，不进入主线程、而进入”任务队列”（task queue）的任务，只有”任务队列”通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

#### 执行流程

1. 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
2. 主线程之外，还存在一个”任务队列”（task queue）。只要异步任务有了运行结果，就在”任务队列”之中放置一个事件。
3. 一旦”执行栈”中的所有同步任务执行完毕，系统就会读取”任务队列”，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
4. 主线程不断重复上面的第三步。

### 什么是事件循环（EventLoop）？

> 主线程从”任务队列”中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为 Event Loop（事件循环）。

Event Loop 线程处理的任务被分为两类即 微任务（micro task）和宏任务（macro task） ，这两个任务分别维护一个队列，都是采用先进先出的策略进行执行。

宏任务：setTimeout、setInterval、I/O。

微任务：Promise.then、 MutationObserver。

当前栈执行完后，Event Loop 线程首先会执行微任务队列中事件，然后执行宏任务队列的事件，如果这时发现了微任务，则执行微任务，然后执行宏任务，反复循环至所有事件执行完毕。**微任务永远在宏任务之前执行。**

1. JavaScript 的所有代码都在主线程执行，形成一个执行栈.
2. 主线程以外，还存在着一个任务队列，只要有了异步代码，就在任务队列放置一个事件.
3. 一旦执行栈所有的同步任务执行完毕以后，系统就会去读取任务队列，对应的异步任务就会结束等待的状态，进入执行栈，开始执行
4. 最先执行的是同步任务，执行完毕后，立即出栈，让出主线程。然后开始执行任务队列中的异步任务
5. 任务队列：存在着两个队列，一个是宏任务队列，一个是微任务队列（ 异步任务分为宏任务和微任务 ）
6. JavaScript 代码的执行顺序： 同步任务 -> 微任务 -> 宏任务
7. Promise 本身是同步任务，它的 then catch finally 是异步任务。
8. 定时器属于宏任务

## 触摸事件

- [点透问题，解决点透问题](点透问题，解决点透问题)

- touchstart ：用户开始触摸时触发

- touchend ：用户不再接触触摸屏时（或者移出屏幕边缘时）触发

- touchmove ：用户移动触摸点时触发，触摸的半径、角度、力度发生变化，也会触发该事件。

- touchcancel ：触摸点取消时触发，比如在触摸区域跳出一个模态窗口（modal window）、触摸

点离开了文档区域（进入浏览器菜单栏）、用户的触摸点太多，超过了支持的上限（自动取消早先

的触摸点）。

触摸事件的 `e.touches` 、 `e.changedTouches` 、 `e.targetTouches` 这几个属性获取 TouchList，表示

一组触摸点的集合

```js
clientX: 65; // 触摸点在浏览器窗口中的横坐标
clientY: 18; // 触摸点在浏览器窗口中的纵坐标
force: 1; // 触摸点压力大小
identifier: 0; // 触摸点唯一标识（ID）
pageX: 65; // 触摸点在页面中的横坐标
pageY: 18; // 触摸点在页面中的纵坐标
radiusX: 11.5; // 触摸点椭圆的水平半径
radiusY: 11.5; // 触摸点椭圆的垂直半径
rotationAngle: 0; // 旋转角度
screenX: 560; // 触摸点在屏幕中的横坐标
screenY: 175; // 触摸点在屏幕中的纵坐标
```

### 点透问题，解决点透问题

移动端 click 事件会有 300ms 的延时，原因是移动端屏幕双击会缩放(double tap to zoom) 页面。

解决方案：

1. 禁用缩放。 浏览器禁用默认的双击缩放行为并且去掉 300ms 的点击延迟。

   ```html
   <meta name="viewport" content="user-scalable=no" />
   ```

2. 利用 touch 事件自己封装这个事件解决 300ms 延迟。

   原理就是：

   1. 当我们手指触摸屏幕，记录当前触摸时间
   2. 当我们手指离开屏幕， 用离开的时间减去触摸的时间
   3. 如果时间小于 150ms，并且没有滑动过屏幕， 那么我们就定义为点击

   代码如下:

   ```js
   //封装tap，解决click 300ms 延时
   function tap(obj, callback) {
     var isMove = false;
     var startTime = 0; // 记录触摸时候的时间变量
     obj.addEventListener("touchstart", function (e) {
       startTime = Date.now(); // 记录触摸时间
     });
     obj.addEventListener("touchmove", function (e) {
       isMove = true; // 看看是否有滑动，有滑动算拖拽，不算点击
     });
     obj.addEventListener("touchend", function (e) {
       // 如果手指触摸和离开 时间小于150ms 算点击
       if (!isMove && Date.now() - startTime < 150) {
         callback && callback(); // 执行回调函数
       }
       isMove = false; // 取反 重置
       startTime = 0;
     });
   } //调用
   tap(div, function () {
     // 执行代码
   });
   ```

3. 使用插件。fastclick 插件解决 300ms 延迟。

   ```js
   <!-- 没有嵌套关系时，使用fastClick.js或者zepto.js -->
   <script src=".https://cdn.bootcdn.net/ajax/libs/fastclick/1.0.6/fastclick.js"></script>
   <script>
       // winodw.onload = function(){}
       window.addEventListener("load", function () {
        FastClick.attach(document.body);
    }, false);
    var b = document.getElementById('b');
    var a = document.getElementById('a');
    b.ontouchstart = function () {
           console.log("关闭b");
           this.style.display = 'none';
       }
    a.onclick = function () {
           console.log("a被点击！");
       }
    /**
    zepto.js
       tap 轻击
       singleTap 单击
       doubleTap 双击
       longTap 长摁
       */
   </script>
   ```

4. **封装 tab**

   ```js
   (function () {
     var TOUCHSTART, TOUCHEND;
     if (typeof window.ontouchstart != "undefined") {
       TOUCHSTART = "touchstart";
       TOUCHEND = "touchend";
       TOUCHMOVE = "touchmove";
       console.log("1");
     } else if (typeof window.onmspointerdown != "undefined") {
       TOUCHSTART = "MSPointerDown";
       TOUCHEND = "MSPointerUp";
       TOUCHMOVE = "MSPointerMove";
       console.log("2");
     } else {
       TOUCHSTART = "mousedown";
       TOUCHEND = "mouseup";
       TOUCHMOVE = "mousemove";
       console.log("3");
     }
     function NodeTouch(node) {
       this._node = node;
     }
     function tap(node, callback, scope) {
       node.addEventListener(TOUCHSTART, function (e) {
         x = e.touches[0].pageX;
         y = e.touches[0].pageY;
       });
       node.addEventListener(TOUCHEND, function (e) {
         e.stopPropagation();
         e.preventDefault();
         var curx = e.changedTouches[0].pageX;
         var cury = e.changedTouches[0].pageY;
         if (Math.abs(curx - x) < 6 && Math.abs(cury - y) < 6) {
           callback.apply(scope, arguments);
         }
       });
     }
     function longTap(node, callback, scope) {
       var x,
         y,
         startTime = 0,
         endTime = 0,
         in_dis = false;
       node.addEventListener(TOUCHSTART, function (e) {
         x = e.touches[0].pageX;
         y = e.touches[0].pageY;
         startTime = new Date().getTime();
       });
       node.addEventListener(TOUCHEND, function (e) {
         e.stopPropagation();
         e.preventDefault();
         var curx = e.changedTouches[0].pageX;
         var cury = e.changedTouches[0].pageY;
         if (Math.abs(curx - x) < 6 && Math.abs(cury - y) < 6) {
           in_dis = true;
         } else {
           in_dis = false;
         }
         endTime = new Date().getTime();
         if (endTime - startTime > 300 && in_dis) {
           callback.apply(scope, arguments);
         }
       });
     }
     NodeTouch.prototype.on = function (evt, callback, scope) {
       var scopeObj;
       var x, y;
       if (!scope) {
         scopeObj = this._node;
       } else {
         scopeObj = scope;
       }
       if (evt === "tap") {
         tap(this._node, callback, scope);
       } else if (evt === "longtap") {
         longTap(this._node, callback, scope);
       } else {
         this._node.addEventListener(evt, function () {
           callback.apply(scope, arguments);
         });
       }
       return this;
     };
     window.$ = function (selector) {
       var node = document.querySelector(selector);
       if (node) {
         return new NodeTouch(node);
       } else {
         return null;
       }
     };
   })();
   ```

## JS 交换两个变量的值

### 通用变量

```javascript
var a = 100;
var b = 999;
```

### 1. 首先把 a 的值存储到临时变量中，然后 b 赋值给 a，最后拿出临时变量中的 a 值赋给 b

```js
var t = a; // t = 0
a = b; // a = b = 1
b = t; // b = t = 0
```

### 2. 先改变另一个变量值， 最后改变原修改的变量值

```js
a += b; // a = 1
b = a - b; // b = 0
a -= b;
// or
a -= b; // a = a - b =-899
b = a + b; // b = -899 + 999 = 100
a = b - a; // a = 100 - -899 = 999
```

### 3. 通过底层位运算来进行交换变量值

```js
a ^= b; // a = 899
b ^= a; // b = 100
a ^= b; // a = 999
// or
a = (b ^= a ^= b) ^ a;
```

### 4. 把 a 先变成了一个对象，这个对象保存着应该交换后的键值对，最后赋值搞定

```js
a = {
  a: b,
  b: a,
};
b = a.b;
a = a.a;
```

### 5. 把 a 先变成了一个数组

```js
a = [a, b];
b = a[0];
a = a[1];
```

### 6

```js
a = [b, (b = a)][0];
// or
b = [a, (a = b)][0];
```

### 7

```js
[a, b] = [b, a];
```

### log h6 1~7

```js
console.log(`a：${a}；b：${b}`);
// 每个值都是 a：999；b：100
```

## JS 数组去重

### 利用 ES6 Set 去重（ES6 中最常用）

```javascript
function unique(arr) {
  return Array.from(new Set(arr));
}
var arr = [1, 1, "true", "true", true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, "NaN", 0, 0, "a", "a", {}, {}];
console.log(unique(arr)); //[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}, {}]
```

不考虑兼容性，此方法代码最少。缺点：无法去掉“{}”空对象

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

### 利用 for 嵌套 for，然后 splice 去重

```javascript
function unique(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] == arr[j]) {
        //第一个等同于第二个，splice方法删除第二个
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr;
}
var arr = [1, 1, "true", "true", true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, "NaN", 0, 0, "a", "a", {}, {}];
console.log(unique(arr));
//[1, "true", 15, false, undefined, NaN, NaN, "NaN", "a", {…}, {…}]
```

外层循环元素，内层循环时比较值。值相同时，则删去这个值。缺点：NaN，{} 无法去重，null 会直接去掉

### 利用 indexOf 去重

```javascript
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log("type error!");
    return;
  }
  var array = [];
  for (var i = 0; i < arr.length; i++) {
    if (array.indexOf(arr[i]) === -1) {
      array.push(arr[i]);
    }
  }
  return array;
}
var arr = [1, 1, "true", "true", true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, "NaN", 0, 0, "a", "a", {}, {}];
console.log(unique(arr));
// [1, "true", true, 15, false, undefined, null, NaN, NaN, "NaN", 0, "a", {…}, {…}]
```

新建一个空的结果数组，for 循环原数组，判断结果数组是否存在当前元素，如果有相同的值则跳过，不相同则 push 进数组。缺点：NaN，{} 无法去重

### 利用 sort()去重

```javascript
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log("type error!");
    return;
  }
  arr = arr.sort();
  var arrry = [arr[0]];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      arrry.push(arr[i]);
    }
  }
  return arrry;
}
var arr = [1, 1, "true", "true", true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, "NaN", 0, 0, "a", "a", {}, {}];
console.log(unique(arr));
// [0, 1, 15, "NaN", NaN, NaN, {…}, {…}, "a", false, null, true, "true", undefined]
```

利用 sort()排序方法，然后根据排序后的结果进行遍历及相邻元素比对。缺点：NaN，{} 无法去重

### 利用 hasOwnProperty[^所有的都去重了]

```javascript
function unique(arr) {
  var obj = {};
  return arr.filter(function (item, index, arr) {
    return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true);
  });
}
var arr = [1, 1, "true", "true", true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, "NaN", 0, 0, "a", "a", {}, {}];
console.log(unique(arr));
//[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}]   //所有的都去重了
```

`asOwnProperty()` 方法用来检测一个属性是否是对象的自有属性，而不是从原型链继承的[^如果该属性是自有属性，那么返回 true，否则返回 false。注：不会检测对象的原型链，只会检测当前对象本身，只有当前对象本身存在该属性时才返回 true]

### 利用 filter

```javascript
function unique(arr) {
  return arr.filter(function (item, index, arr) {
    //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
    return arr.indexOf(item, 0) === index;
  });
}
var arr = [1, 1, "true", "true", true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, "NaN", 0, 0, "a", "a", {}, {}];
console.log(unique(arr));
//[1, "true", true, 15, false, undefined, null, "NaN", 0, "a", {…}, {…}]
```

缺点：NaN 直接去掉，{} 无法去重

### 利用递归去重

```javascript
function unique(arr) {
  var array = arr;
  var len = array.length;

  array.sort(function (a, b) {
    //排序后更加方便去重
    return a - b;
  });

  function loop(index) {
    if (index >= 1) {
      if (array[index] === array[index - 1]) {
        array.splice(index, 1);
      }
      loop(index - 1); //递归loop，然后数组去重
    }
  }
  loop(len - 1);
  return array;
}
var arr = [1, 1, "true", "true", true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, "NaN", 0, 0, "a", "a", {}, {}];
console.log(unique(arr));
//[1, "a", "true", true, 15, false, 1, {…}, null, NaN, NaN, "NaN", 0, "a", {…}, undefined]
```

缺点：NaN，{} 无法去重

### [...new Set(arr)]

```javascript
var arr = [1, 1, "true", "true", true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, "NaN", 0, 0, "a", "a", {}, {}];
console.log([...new Set(arr)]);
```

优点：代码一句话。缺点：{} 无法去重

### 数组对象根据字段去重

```js
const uniqueArrayObject = (arr = [], key = "id") => {
  if (arr.length === 0) return;
  let list = [];
  const map = {};
  arr.forEach(item => {
    if (!map[item[key]]) {
      map[item[key]] = item;
    }
  });
  list = Object.values(map);
  return list;
};
```

## 原生 AJAX 请求教程

`ajax` 即 `Asynchronous Javascript And XML，AJAX` 不是一门的新的语言，而是对现有持术的综合利用。本质是在 HTTP 协议的基础上以异步的方式与服务器进行通信.

**异步**：指某段程序执行时不会阻塞其它程序执行，其表现形式为程序的执行顺序不依赖程序本身的书写顺序，相反则为同步。

### XMLHttpRequest 对象

浏览器内建对象，用于在后台与服务器通信(交换数据) ，由此我们便可实现对网页的部分更新，而不是刷新整个页面。

所有现代浏览器（IE7+、Firefox、Chrome、Safari 以及 Opera）均内建 XMLHttpRequest 对象。

```js
var xhr = new XMLHttpRequest();
```

> 老版本的 Internet Explorer （IE5 和 IE6）使用 ActiveX 对象：
> var xhr=new ActiveXObject("Microsoft.XMLHTTP");

如需将请求发送到服务器，我们使用 `XMLHttpRequest` 对象的 `open()` 和 `send()` 方法：

```js
var xhr = new XMLHttpRequest();
xhr.open("GET", "ajax_info.json", true);
xhr.send();
```

| 方法                   | 描述                                                                                                                                                 |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| open(method,url,async) | 规定请求的类型、URL 以及是否异步处理请求。 **method**：请求的类型；GET 或 POST **url**：文件在服务器上的位置 **async**：true（异步）或 false（同步） |
| send(string)           | 将请求发送到服务器。string：仅用于 POST 请求                                                                                                         |

### get 请求

get 请求参数需要放在 url 地址的参数中。并通过 urlencode 的方式传参，也就是`?`隔开 url 和参数，然后多个参数用`&`连接，参数格式为：`key=val`。

```js
var xhr = new XMLHttpRequest();
xhr.open("GET", "/ajax.php?fname=Henry&lname=Ford", true);
xhr.send();
```

### post 请求

post 请求需要添加一个请求头，让后台知道我们请求的参数的格式，这样后台才能解析我们的数据。另外，传输的数据需要格式化到 send 方法中。

```js
var xhr = new XMLHttpRequest();
xhr.open("POST", "/try/ajax/demo_post2.php", true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.send("fname=Henry&lname=Ford");
```

### 接受数据并处理数据

XMLHttpRequest 对象的相关属性和事件

| 属性               | 说明                                                                                                                                                                                     |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status             | 200: "OK"                                                                                                                                                                                |
| responseText       | 获得字符串形式的响应数据。                                                                                                                                                               |
| responseXML        | 获得 XML 形式的响应数据。                                                                                                                                                                |
| readyState         | 存有 XMLHttpRequest 的状态。请求发送到后台后，状态会从 0 到 4 发生变化。 **0**: 请求未初始化 **1**: 服务器连接已建立 **2**: 请求已接收 **3**: 请求处理中 **4**: 请求已完成，且响应已就绪 |
| onreadystatechange | 每当 readyState 属性改变时，就会调用该函数。                                                                                                                                             |

开发人员，可以通过监听 XMLHttpRequest 对象的 onreadystatechange 事件，在事件的回调函数中判断 readyState 的状态，可以帮助我们进行对象请求结果的判断处理。

### 完整实例

- **完整的 GET 请求例子**：

```js
// get请求
var xhr = new XMLHttpRequest();

xhr.open("GET", "/api/user?id=333", true);
xhr.send();

xhr.onreadystatechange = function (e) {
  if (xhr.readyState == 4 && xhr.status == 200) {
    console.log(xhr.responseText);
  }
};
```

- **完整的 POST 请求例子**：

```js
var xhr = new XMLHttpRequest();

xhr.open("POST", "/api/user", true);
// POST请求需要设置此参数
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.send("name=33&ks=334");

xhr.onreadystatechange = function (e) {
  if (xhr.readyState == 4 && xhr.status == 200) {
    console.log(xhr.responseText);
  }
};
```

### 封装原生 Ajax 请求

封装 get 请求：

```js
/**
 * Ajax的Get请求辅助方法
 * @param {String} url  请求后台的地址
 * @param {Function} callback  请求成之后，返回数据成功，并且调用此方法，这个方法接受一个参数就是后台返回的数据。
 * @return undefined
 */
function ajaxGet(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      callback(xhr.responseText);
    }
  };
}

// 调用
ajaxGet("/user.json", function (data) {
  console.log(data);
});
```

封装 post 请求：

```js
function ajaxPost(url, data, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(data);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      callback(xhr.responseText);
    }
  };
}

// 调用
ajaxPost("/api/user", "id=9&com=aicoder", function (data) {
  // 后台返回的数据就是 字符串类型。要转成json，必须自己手动转换。
  var user = JSON.parse(data);
  console.log(user.id);
  console.log(user.com);
});
```
