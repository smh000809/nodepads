import nav from "./nav";
import sidebar from "./sidebar";
import PackageJSON from "../../package.json";

export default {
  lang: "zh-CN",
  title: "AHao",
  description: "热爱生活，热爱前端",
  base: "/nodepads/",
  ignoreDeadLinks: true, // 忽略无效链接
  lastUpdated: true, // 最后更新时间
  cleanUrls: "without-subfolders", // 去除链接中的 .html 后缀
  head: [
    ["meta", {name: "theme-color", content: "#000"}],
    ["link", {rel: "icon", href: "/nodepads/favicon.ico"}],
    ["link", {rel: "manifest", href: "/nodepads/manifest.json"}],
  ], // 设置浏览器主题颜色
  markdown: {
    headers: {
      level: [2, 3], // 设置标题层级
    },
    // 代码主题: ~node_modules/shiki/themes
    theme: "dracula-soft", // 设置主题颜色
    toc: {level: [1, 2, 3, 4, 5, 6]}, // 设置目录层级
    lineNumbers: true, // 代码块显示行号
  }, // markdown 配置
  themeConfig: {
    nav,
    sidebar,
    appearance: "dark", // 设置主题颜色
    logo: "/hero.png",
    siteTitle: false, // 隐藏站点标题
    editLink: {
      pattern: "Javascript:void(0);",
      text: "Edit this page on GitHub",
    }, // 编辑链接
    socialLinks: [{icon: "github", link: "https://github.com/smh000809/nodepads"}], // 社交链接
    footer: {
      message: "version " + PackageJSON.version,
      copyright: "Released under the MIT License. © 2023 AHao.",
    }, // 页脚
    // carbonAds: {
    // code: 'CEBDT27Y',
    // placement: 'vuejsorg'
    // },// 广告
    algolia: {
      appId: "G3RQD2O5FU",
      apiKey: "01ff7f41cded2e85e2c4ee3c320c203b",
      indexName: "nodepads",
      container: "### REPLACE ME WITH A CONTAINER (e.g. div) ###",
      debug: false,
    },
  },
};
