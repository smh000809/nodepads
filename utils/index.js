console.clear();
const fs = require("fs");
/* 映射路径 */
const rootPath = path => __dirname.replace(/\/utils$/, "") + path;
/* 项目的名称 */
let notepadToc = [];
fs.readdirSync(rootPath("/docs/zh")).forEach(file => {
  if (["README", "index", "MiaoGuai"].includes(file.replace(/.md$/i, ""))) return;
  if (/.md$/i.test(file)) {
    let text = file.replace(/.md$/i, "");
    notepadToc.push({
      text: text,
      collapsible: true,
      collapsed: true,
      link: "/zh/" + file,
      items: [
        {
          text: text,
          link: "/zh/" + file,
        },
      ],
    });
  }
});

const create = (content, path, name) => {
  content = JSON.parse(JSON.stringify(content));
  console.log(name + "文件生成成功:" + content);
  console.log(name + "文件生成位置:" + rootPath(path));
  fs.writeFile(rootPath(path), content, function (err) {
    if (err) throw err;
    console.log("\x1b[42;30m DONE \x1b[40;32m File is created successfully.");
  });
};

[
  {
    name: "sidebar",
    content: `module.exports={}`,
    path: "/docs/.vitepress/sidebar.js",
  },
  {
    name: "navbar",
    content: `module.exports=[{text: '首页',link: '/',},{text:'笔记📒',items:${JSON.stringify(notepadToc)}}]`,
    path: "/docs/.vitepress/nav.js",
  },
].forEach(item => {
  create(item.content, item.path, item.name);
});
