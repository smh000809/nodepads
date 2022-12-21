const fs = require('fs');
const config = require('./__config__');
let markdownThemePath = config.rootPath([config['rootProject'], config['markdownTheme']]);
let markdownTheme = [];

fs.readdirSync(markdownThemePath).forEach(file => {
    if (/.json$/.test(file)) {
        let fileName = file.replace(/.json/, '');
        let filePath = markdownThemePath + '/' + file;
        markdownTheme.push({ fileName, filePath });
    }
});

console.log(markdownTheme);