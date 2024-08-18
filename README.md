# VitePress

## 下载依赖

> npm install

## 本地开发

> npm run docs:dev

## 打包

> npm run docs:build

## 预览

> npm run docs:preview

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
├── package-lock.json
└── .gitignore // git忽略文件
├── README.md // 项目说明
```
