// https://www.prettier.cn/docs/options.html#quote-props
module.exports = {
  printWidth: 400, // 一行的字符数，如果超过会进行换行，默认为80
  tabWidth: 2, // 一个tab代表几个空格数，默认为80
  useTabs: false, // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
  semi: true, // 声明结尾使用分号(;)，默认为true
  singleQuote: false, // 字符串是否使用单引号，默认为false，使用双引号
  quoteProps: "as-needed", // 对象的key仅在必要时用引号
  jsxSingleQuote: false, // jsx中的属性是否使用单引号
  trailingComma: "es5", // 是否使用尾逗号，有三个可选值"<none|es5|all>"
  bracketSpacing: false, // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  arrowParens: "avoid", // 箭头函数，只有一个参数的时候，也需要括号 avoid | always
  requirePragma: false, // 是否要注释来决定是否格式化代码
  proseWrap: "preserve", // 是否要换行 never | always | preserve
  htmlWhitespaceSensitivity: "css", // html空格敏感度, ignore | css | strict
  vueIndentScriptAndStyle: false, // vue文件中的script和style标签是否缩进
  endOfLine: "lf", // 结尾以 (auto:维护现有的行结尾 | lf:仅换行 | crlf:回车 + 换行字符 | cr:仅回车符) 换行
  embeddedLanguageFormatting: "auto", // 格式化嵌入的内容
};
