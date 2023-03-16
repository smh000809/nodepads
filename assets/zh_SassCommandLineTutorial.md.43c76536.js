import{_ as s,c as a,o as n,Q as l}from"./chunks/framework.6c813e44.js";const u=JSON.parse('{"title":"Sass 命令行教程","description":"","frontmatter":{},"headers":[{"level":2,"title":"sass中文网","slug":"sass中文网","link":"#sass中文网","children":[]}],"relativePath":"zh/SassCommandLineTutorial.md","lastUpdated":1678941224000}'),p={name:"zh/SassCommandLineTutorial.md"},o=l(`<h1 id="sass-命令行教程" tabindex="-1">Sass 命令行教程 <a class="header-anchor" href="#sass-命令行教程" aria-label="Permalink to &quot;Sass 命令行教程&quot;">​</a></h1><h2 id="sass中文网" tabindex="-1"><a href="https://www.sass.hk/docs/" target="_blank" rel="noreferrer">sass中文网</a> <a class="header-anchor" href="#sass中文网" aria-label="Permalink to &quot;[sass中文网](https://www.sass.hk/docs/)&quot;">​</a></h2><ul><li><p>描述：<code>sass</code>基于<code>Ruby</code>语言开发而成，因此安装<code>sass</code>前需要<a href="http://rubyinstaller.org/downloads" target="_blank" rel="noreferrer">安装Ruby</a>。（mac下自带Ruby无需在安装Ruby!）</p></li><li><p>安装</p></li></ul><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki dracula-soft"><code><span class="line"><span style="color:#F6F6F4;">$ </span><span style="color:#E7EE98;">gem</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">install</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">sass</span></span>
<span class="line"><span style="color:#F6F6F4;">$ </span><span style="color:#E7EE98;">gem</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">install</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">compass</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul><li>更新</li></ul><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki dracula-soft"><code><span class="line"><span style="color:#F6F6F4;">$ </span><span style="color:#E7EE98;">gem</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">update</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">sass</span><span style="color:#F6F6F4;"> </span><span style="color:#7B7F8B;"># 更新sass</span></span>
<span class="line"><span style="color:#F6F6F4;">$ </span><span style="color:#E7EE98;">sass</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">-v</span><span style="color:#F6F6F4;"> </span><span style="color:#7B7F8B;"># 查看sass版本</span></span>
<span class="line"><span style="color:#F6F6F4;">$ </span><span style="color:#E7EE98;">sass</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">-h</span><span style="color:#F6F6F4;"> </span><span style="color:#7B7F8B;"># 查看sass帮助</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul><li>命令行编译</li></ul><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki dracula-soft"><code><span class="line"><span style="color:#F6F6F4;">$ </span><span style="color:#E7EE98;">sass</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">input.scss</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">output.css</span><span style="color:#F6F6F4;"> </span><span style="color:#7B7F8B;"># 单文件编译：sass [File path of sass or scss] [output file path]</span></span>
<span class="line"><span style="color:#F6F6F4;">$ </span><span style="color:#E7EE98;">sass</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">--watch</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">input.scss:output.css</span><span style="color:#F6F6F4;"> </span><span style="color:#7B7F8B;"># 单文件监听编译</span></span>
<span class="line"><span style="color:#F6F6F4;">$ </span><span style="color:#E7EE98;">sass</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">--watch</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">app/sass:public/stylesheets</span><span style="color:#F6F6F4;"> </span><span style="color:#7B7F8B;"># 监听整个目录</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><ul><li>命令行编译配置选项 <ul><li><p><code>--style</code>表示解析后的<code>css</code>是什么排版格式;sass内置有四种编译格式: <code>nested</code>, <code>expanded</code>,<code>compact</code>,<code>compressed</code></p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki dracula-soft"><code><span class="line"><span style="color:#F6F6F4;">$ </span><span style="color:#E7EE98;">sass</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">--watch</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">input.scss:output.css</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">--style</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">nested</span></span>
<span class="line"><span style="color:#F6F6F4;">$ </span><span style="color:#E7EE98;">sass</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">--watch</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">input.scss:output.css</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">--style</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">expanded</span></span>
<span class="line"><span style="color:#F6F6F4;">$ </span><span style="color:#E7EE98;">sass</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">--watch</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">input.scss:output.css</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">--style</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">compact</span></span>
<span class="line"><span style="color:#F6F6F4;">$ </span><span style="color:#E7EE98;">sass</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">--watch</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">input.scss:output.css</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">--style</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">compressed</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li><li><p><code>--sourcemap</code>表示是否征程<code>.css.map</code>文件</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki dracula-soft"><code><span class="line"><span style="color:#F6F6F4;">$ </span><span style="color:#E7EE98;">sass</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">--watch</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">input.scss:output.css</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">--style</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">compact</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">--sourcemap</span><span style="color:#F6F6F4;"> </span><span style="color:#7B7F8B;"># 生成</span></span>
<span class="line"><span style="color:#F6F6F4;">$ </span><span style="color:#E7EE98;">sass</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">--watch</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">input.scss:output.css</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">--style</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">compact</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">--sourcemap=none</span><span style="color:#F6F6F4;"> </span><span style="color:#7B7F8B;"># 禁止生成</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li><li><p><code>--no-cache</code>表示不缓存编译</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki dracula-soft"><code><span class="line"><span style="color:#F6F6F4;">$ </span><span style="color:#E7EE98;">sass</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">--watch</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">input.scss:output.css</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">--style</span><span style="color:#F6F6F4;"> </span><span style="color:#E7EE98;">compact</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">--sourcemap=none</span><span style="color:#F6F6F4;"> </span><span style="color:#BF9EEE;">--no-cache</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li></ul></li></ul>`,9),e=[o];function c(t,r,F,E,y,i){return n(),a("div",null,e)}const b=s(p,[["render",c]]);export{u as __pageData,b as default};
