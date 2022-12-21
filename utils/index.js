console.clear();
const fs = require('fs');
const config = require('../__config__.js');
/* 项目在本地的路径 */
const rootProject = config['rootProject'];
/* 不需要生成侧边栏的文件名 */
const ignoreFile = config['ignoreFile'];
/* 映射路径 */
const rootPath = (path) => rootProject + path;
/* 文档库的位置 */
const rootDocs = config['rootDocs'];
/* 文件生成的位置(基于根目录) */
const writeFile = config['writeFile'];
/* 项目的名称 */
let sidebar = [];
fs.readdirSync(rootPath(rootDocs)).forEach(file => {
    if (ignoreFile.includes(file.replace(/.md/, ''))) return;
    console.log(file);
    if (/.md$/.test(file)) {
        let text = file.replace(/.md/, '');
        sidebar.push({
            text: text,
            collapsible: true,
            collapsed: true,
            items: [{
                text: text,
                link: '/zh/' + file,
            }]
        });
    }
})
const sidebarContent = JSON.parse(JSON.stringify('module.exports=' + JSON.stringify(sidebar)));
console.log("内容生成为:" + sidebarContent);
console.log("文件生成位置:" + rootPath(writeFile));
fs.writeFile(
    rootPath(writeFile),
    sidebarContent,
    function (err) {
        if (err) throw err;
        console.log('\033[42;30m DONE \033[40;32m File is created successfully.');
    }
);