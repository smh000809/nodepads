import{_ as e,c as o,o as r,Q as t}from"./chunks/framework.560b7abf.js";const h=JSON.parse('{"title":"BrowserRender","description":"","frontmatter":{},"headers":[],"relativePath":"zh/BrowserRender.md","lastUpdated":1680248978000}'),n={name:"zh/BrowserRender.md"},d=t('<h1 id="browserrender" tabindex="-1">BrowserRender <a class="header-anchor" href="#browserrender" aria-label="Permalink to &quot;BrowserRender&quot;">​</a></h1><ul><li><p>浏览器将获取的<code>HTML</code>文档解析成 DOM 树。<strong>【构建 DOM 树(DOM Tree)】</strong></p></li><li><p>处理 CSS 标记，构成层叠样式表模型<code>CSSOM</code>(CSS Object Model)。<strong>【构建 CSSOM 规则树(CSSOM Tree)】</strong></p></li><li><p>将<code>DOM</code>和<code>CSSOM</code>合并为渲染树(<code>rendering tree</code>)，代表一系列将被渲染的对象。<strong><code>【合并DOM和CSSOM为一棵树=渲染树(Render Tree)】</code></strong></p><p>display:none;的元素<strong>不在</strong>Render Tree 中</p><p>visibility:none;的元素<strong>在</strong>Render Tree 中</p></li><li><p>渲染树的每个元素包含的内容都是计算过的，它被称之为布局<code>layout</code>。浏览器使用一种流式处理的方法，只需要一次绘制操作就可以布局所有的元素。<strong><code>【渲染树布局(Layout)】</code></strong></p><p>float 元素，absoulte 元素，fixed 元素会发生位置偏移（脱机文档流）</p></li><li><p>将渲染树的各个节点绘制到屏幕上，这一步被称为绘制<code>painting</code>。<strong><code>【渲染树绘制(painting)】</code></strong></p></li></ul>',2),s=[d];function c(a,i,l,p,_,S){return r(),o("div",null,s)}const u=e(n,[["render",c]]);export{h as __pageData,u as default};
