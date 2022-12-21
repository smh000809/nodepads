module.exports = {
    /* 项目在本地的路径 */
    rootProject: '/Users/shimenghao/Documents/code/nodepads',
    /* 文档库的位置 */
    rootDocs: '/docs/zh',
    /* 不需要生成侧边栏的文件名 */
    ignoreFile: ['README', 'index', 'MiaoGuai'],
    /* 文件生成的位置(基于根目录) */
    writeFile: '/docs/.vitepress/sidebar.js',
    /* markdown 代码主题位置 */
    markdownTheme: '/node_modules/shiki/themes',
    /* path plus */
    rootPath: (pathArr) => pathArr.join(''),
}