# VitePress

## 下载依赖

> yarn

## 本地开发

> yarn run docs:dev

## 打包

> yarn run docs:build

## 预览

> yarn run docs:preview

## 生成导航

> yarn run docs:bar

## 项目结构

```bash
├── docs
│   ├── .vitepress
│   │   ├── cache
│   │   │   └── ..
│   │   ├── theme // 主题
│   │   │   ├── index.js
│   │   │── ├── assets // 静态资源
│   │   │── │── ├── css
│   │   │── │── │   ├── style.css
│   │   │── │── └── img
│   │   │       ├── hero.png
│   │   ├── config.js
│   │   ├── nav.js
│   │   ├── sidebar.js
│   ├── index.md // 首页
│   ├── public // 静态资源
│   │   ├── favicon.ico
│   │   └── hero.png
│   │   └── mainifest.json
│   └── zh // 中文文档
│       ├── ...
│       └── README.md
├── utils
|   ├── index.js // 生成sidebar
├── package.json
├── yarn.lock // 依赖(yarn)
└── .gitignore // git忽略文件
├── README.md // 项目说明
```
