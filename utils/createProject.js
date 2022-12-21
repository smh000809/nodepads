// Project Manager: vscode 项目生成器
const fs = require('fs');
const config = {
  path: '/Users/shimenghao/Documents/code', //文件夹路径
  filter: ['node_modules', '.git', '.DS_Store', '.idea', '.vscode', 'dist', 'build'], //过滤文件夹
  writeFileName: 'projects.json', //生成的文件名
  writeFilePath: '/Users/shimenghao/Library/Application Support/Code/User/globalStorage/alefragnani.project-manager/', //生成的文件路径
};
fs.readdir(config.path, 'utf8', (err, data) => {
  if (err) {
    throw err;
  } else {
    const filterDate_ = data.filter(v => !config.filter.includes(v));
    const projects = [];
    filterDate_.forEach(v => {
      projects.push({
        name: v,
        rootPath: config.path + '/' + v,
        paths: [],
        tags: [],
        enabled: true,
      });
    });
    // console.log(JSON.stringify(projects));
    // 写入文件
    fs.writeFile(config.writeFilePath + config.writeFileName, JSON.stringify(projects), 'utf8', err => {
      if (err) throw err;
      console.log('写入成功=>' + config.writeFilePath + config.writeFileName);
    });
  }
});
