const nav = require('./nav');
const sidebar = require('./sidebar');

export default {
    lang: 'zh-CN',
    title: 'AHao',
    description: '热爱生活，热爱前端',
    base: '/',
    ignoreDeadLinks: true,// 忽略无效链接
    lastUpdated: true,// 最后更新时间
    cleanUrls: 'without-subfolders',// 去除链接中的 .html 后缀
    head: [
        ['meta', { name: 'theme-color', content: '#000' }],
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
    ],// 设置浏览器主题颜色
    markdown: {
        headers: {
            level: [0, 0],// 设置标题层级
        },
    },// markdown 配置
    themeConfig: {
        nav,
        sidebar,
        appearance: 'dark',// 设置主题颜色
        logo: '/hero.png',
        editLink: {
            pattern: 'Javascript:void(0);',
            text: 'Edit this page on GitHub'
        },// 编辑链接
        socialLinks: [
            { icon: 'github', link: 'https://github.com/FTZANKE' }
        ],// 社交链接
        footer: {
            message: 'Released under the MIT License.',
            copyright: ''
        },// 页脚
        // carbonAds: {
            // code: 'CEBDT27Y',
            // placement: 'vuejsorg'
        // },// 广告
    },
}
