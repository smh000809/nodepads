# Sass 命令行教程

## [sass中文网](https://www.sass.hk/docs/)

- 描述：`sass`基于`Ruby`语言开发而成，因此安装`sass`前需要[安装Ruby](http://rubyinstaller.org/downloads)。（mac下自带Ruby无需在安装Ruby!）

- 安装

```bash
$ gem install sass
$ gem install compass
```

- 更新

```bash
$ gem update sass # 更新sass
$ sass -v # 查看sass版本
$ sass -h # 查看sass帮助
```

- 命令行编译

```bash
$ sass input.scss output.css # 单文件编译：sass [File path of sass or scss] [output file path]
$ sass --watch input.scss:output.css # 单文件监听编译
$ sass --watch app/sass:public/stylesheets # 监听整个目录
```

- 命令行编译配置选项
  - `--style`表示解析后的`css`是什么排版格式;sass内置有四种编译格式: `nested`, `expanded`,`compact`,`compressed`

    ```bash
    $ sass --watch input.scss:output.css --style nested
    $ sass --watch input.scss:output.css --style expanded
    $ sass --watch input.scss:output.css --style compact
    $ sass --watch input.scss:output.css --style compressed
    ```

  - `--sourcemap`表示是否征程`.css.map`文件

    ```bash
    $ sass --watch input.scss:output.css --style compact --sourcemap # 生成
    $ sass --watch input.scss:output.css --style compact --sourcemap=none # 禁止生成
    ```


- `--no-cache`表示不缓存编译

  ```bash
  $ sass --watch input.scss:output.css --style compact --sourcemap=none --no-cache
  ```


