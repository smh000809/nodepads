# MacOS

## [Homebrew 中文官网](https://brew.sh/zh-cn/)

- 安装

```bash
/usr/bin/ruby -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

- 卸载

```bash
sudo /usr/bin/ruby -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"
```

- 换源

简介
Homebrew 是一款自由及开放源代码的软件包管理系统，用以简化 macOS 和 linux 系统上的软件安装过程。它拥有安装、卸载、更新、查看、搜索等很多实用的功能，通过简单的一条指令，就可以实现包管理，十分方便快捷。

Homebrew 主要有四个部分组成: brew、homebrew-core 、homebrew-bottles、homebrew-cask。

|       名称       |              说明               |
| :--------------: | :-----------------------------: |
|       brew       |       Homebrew 源代码仓库       |
|  homebrew-core   |      Homebrew 核心软件仓库      |
| homebrew-bottles |   Homebrew 预编译二进制软件包   |
|  homebrew-cask   | 提供 macOS 应用和大型二进制文件 |

- 替换为阿里源

```bash
# 查看 brew.git 当前源
$ cd "$(brew --repo)" && git remote -v
origin    https://github.com/Homebrew/brew.git (fetch)
origin    https://github.com/Homebrew/brew.git (push)

# 查看 homebrew-core.git 当前源
$ cd "$(brew --repo homebrew/core)" && git remote -v
origin    https://github.com/Homebrew/homebrew-core.git (fetch)
origin    https://github.com/Homebrew/homebrew-core.git (push)

# 修改 brew.git 为阿里源
$ git -C "$(brew --repo)" remote set-url origin https://mirrors.aliyun.com/homebrew/brew.git

# 修改 homebrew-core.git 为阿里源
$ git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.aliyun.com/homebrew/homebrew-core.git

# zsh 替换 brew bintray 镜像
$ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.zshrc
$ source ~/.zshrc

# bash 替换 brew bintray 镜像
$ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.aliyun.com/homebrew/homebrew-bottles' >> ~/.bash_profile
$ source ~/.bash_profile

# 刷新源
$ brew update
```

- 替换为清华源

```bash
# 替换各个源
$ git -C "$(brew --repo)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git
$ git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git
$ git -C "$(brew --repo homebrew/cask)" remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-cask.git

# zsh 替换 brew bintray 镜像
$ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles' >> ~/.zshrc
$ source ~/.zshrc

# bash 替换 brew bintray 镜像
$ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles' >> ~/.bash_profile
$ source ~/.bash_profile

# 刷新源
$ brew update
```

- 替换为中科大源

```bash
# 替换各个源
$ git -C "$(brew --repo)" remote set-url origin https://mirrors.ustc.edu.cn/brew.git
$ git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
$ git -C "$(brew --repo homebrew/cask)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-cask.git

# zsh 替换 brew bintray 镜像
$ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.zshrc
$ source ~/.zshrc

# bash 替换 brew bintray 镜像
$ echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.bash_profile
$ source ~/.bash_profile

# 刷新源
$ brew update
```

- 重置为官方源

```bash
# 重置 brew.git 为官方源
$ git -C "$(brew --repo)" remote set-url origin https://github.com/Homebrew/brew.git

# 重置 homebrew-core.git 为官方源
$ git -C "$(brew --repo homebrew/core)" remote set-url origin https://github.com/Homebrew/homebrew-core.git

# 重置 homebrew-cask.git 为官方源
$ git -C "$(brew --repo homebrew/cask)" remote set-url origin https://github.com/Homebrew/homebrew-cask

# zsh 注释掉 HOMEBREW_BOTTLE_DOMAIN 配置
$ vi ~/.zshrc
# export HOMEBREW_BOTTLE_DOMAIN=xxxxxxxxx

# bash 注释掉 HOMEBREW_BOTTLE_DOMAIN 配置
$ vi ~/.bash_profile
# export HOMEBREW_BOTTLE_DOMAIN=xxxxxxxxx

# 刷新源
$ brew update
```

|              命令               |              描述              |
| :-----------------------------: | :----------------------------: |
|          `brew update`          |         更新 Homebrew          |
|      `brew search package`      |           搜索软件包           |
|     `brew install package`      |           安装软件包           |
|    `brew uninstall package`     |           卸载软件包           |
|         `brew upgrade`          |         升级所有软件包         |
|     `brew upgrade package`      |         升级指定软件包         |
|           `brew list`           |     列出已安装的软件包列表     |
| `brew services command package` |      管理 brew 安装软件包      |
|      `brew services list`       |    列出 brew 管理运行的服务    |
|       `brew info package`       |         查看软件包信息         |
|       `brew deps package`       |      列出软件包的依赖关系      |
|           `brew help`           |            查看帮助            |
|         `brew cleanup`          |         清除过时软件包         |
|       `brew link package`       |       创建软件包符号链接       |
|      `brew unlink package`      |       取消软件包符号链接       |
|          `brew doctor`          |      检查系统是否存在问题      |
| `brew deps --installed --tree`  | 查看已安装的包的依赖，树形显示 |

## [Nodebrew](https://github.com/hokaccha/nodebrew)

```bash
rm -rf $HOME/.nodebrew # 卸载nodebrew
```

|                命令                 |                      描述                       |
| :---------------------------------: | :---------------------------------------------: |
|           `nodebrew help`           |                   显示此消息                    |
|    `nodebrew install <version>`     | Download and install `<version>` (from binary)  |
|    `nodebrew compile <version>`     | Download and install `<version>` (from source)  |
| `nodebrew install-binary <version>` | Alias of `install` (For backward compatibility) |
|   `nodebrew uninstall <version>`    |              Uninstall `<version>`              |
|      `nodebrew use <version>`       |                 Use `<version>`                 |
|           `nodebrew lis`            |                 已安装版本列表                  |
|            `nodebrew ls`            |                Alias for `list`                 |
|        `nodebrew ls-remote`         |                  列出远程版本                   |
|          `nodebrew ls-all`          |            列出远程版本和已安装版本             |
|   `nodebrew alias <key> <value>`    |                    Set alias                    |
|      `nodebrew unalias <key>`       |                  Remove alias                   |
|        `nodebrew selfupdate`        |                 Update nodebrew                 |

## [MacPorts](https://www.macports.org/install.php)

|             命令              |            备注            |
| :---------------------------: | :------------------------: |
|    `sudo port selfupdate`     | 更新 MacPorts 程序级源列表 |
|     `port search package`     |         搜索软件包         |
|  `sudo port install package`  |         安装软件包         |
| `sudo port uninstall package` |         卸载软件包         |
|     `port list installed`     |     查看已安装的软件包     |
|        `port outdated`        |  查看有哪些软件包需要更新  |
| `sudo port upgrade outdated`  |       更新所有软件包       |
|  `sudo port upgrade package`  |       更新指定软件包       |

## nvm

```bash
brew install nvm # 下载 nvm
brew uninstall nvm && cd ~ && rm -rf .nvm # 卸载nvm
```

|             命令              |                  备注                  |
| :---------------------------: | :------------------------------------: |
|        `nvm ls-remote`        |          列出所有可安装的版本          |
|    `nvm install <version>`    | 安装指定的版本，如 nvm install v8.14.0 |
|   `nvm uninstall <version>`   |             卸载指定的版本             |
|           `nvm ls`            |         列出所有已经安装的版本         |
|      `nvm use <version>`      |           切换使用指定的版本           |
|         `nvm current`         |           显示当前使用的版本           |
| `nvm alias default <version>` |           设置默认 node 版本           |
|       `nvm deactivate`        |            解除当前版本绑定            |

## Node

```bash
sudo rm -rf /usr/local/{bin/{node,npm},lib/node_modules/npm,lib/node,share/man/*/node.*} # pkg安装nodejs方式 卸载
export NODE_OPTIONS=--openssl-legacy-provider # <<< open SSL 3.0 <<<  降级保证最新nodejs18正常运行
```

## 更新了 hosts 文件立刻生效

```bash
sudo vim /etc/hosts
sudo killall -HUP mDNSResponder
```

## Mac VSCode 更新失败问题

```bash
# 1
sudo chown -R $USER ~/Library/Caches/com.microsoft.VSCode.ShipIt;# 输入密码
# 2
xattr -dr com.apple.quarantine /Applications/Visual\ Studio\ Code.app;# 稳定版软件包路径
# or
xattr -dr com.apple.quarantine /Applications/Visual\ Studio\ Code\ -\ Insiders.app/# 预览版软件包路径
```

## Mac 下 Mysql

```bash
sudo /usr/local/mysql/support-files/mysql.server start # 启动服务
sudo /usr/local/mysql/support-files/mysql.server restart # 重启服务
sudo /usr/local/mysql/support-files/mysql.server stop # 关闭服务
# mysql.server 配置环境变量 方便之后每次的 开启、停止 和 重启，就不用像上面中命令一样每次都要加路径
vim ~/.base_profile # 打开 .bash_profile 添加 mysql.server 路径
export MYSQL_HOME=/usr/local/mysql # 添加
export PATH=${PATH}:${MYSQL_HOME}/support-files  # 添加
source !/.bash_profile # 保存.bash_profile后使用 source 命令让 刚才的改动生效
```

## Ruby Gem

```bash
# 安装rvm
$ curl -L get.rvm.io | bash -s stable
# 查看当前版本
$ rvm -v
# 卸载rvm (执行会彻底删除 .rvm 目录，从而删除 rvm)
$ rvm implode
# 查看gem版本
$ gem -v
# 查看ruby源
$ gem sources -l
# 更新gem版本
$ gem update --system
# 删除镜像源
$ gem sources --remove  https://gems.ruby-china.org/
# 添加镜像源
$ gem sources --add  https://gems.ruby-china.com/
```

|             命令             |             备注             |
| :--------------------------: | :--------------------------: |
|     `gem install mygem`      |             安装             |
|    `gem uninstall mygem`     |             卸载             |
|      `gem list --local`      |       列出已安装的 gem       |
|     `gem list --remote`      |        列出可用的 gem        |
|       `gem rdoc --all`       | 为所有的 gems 创建 RDoc 文档 |
|      `gem fetch mygem`       |    下载一个 gem，但不安装    |
| `gem search STRING --remote` |     从可用的 gem 中搜索      |
|       `nvm deactivate`       |       解除当前版本绑定       |

## 解决 iCloud Drive 上传文件卡住的问题

macOS 上经常会出现 iCloud Drive 上传或者下载文件一直卡住不动的情况。遇到这种情况除了重启电脑还可以用更简单的方法：杀掉 bird 进程具体方法如下，先打开 macOS 上的终端应用，执行以下命令来查看 bird 进程的 pid

```shell
$ ps -e | grep bird
```

开头的数字就是 pid，执行 `kill 457` 杀掉 bird 进程，文件就会立刻开始同步了。

因为 pid 每次 kill 之后会变化，有个更简单的方法是配合 pgrep 命令实现一行代码杀掉 bird 进程：

```shell
kill $(pgrep bird)
```
