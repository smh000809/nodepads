# WindowsRegedit

## 第一课 注册表基础

1. 什么是注册表
   注册表是 windows 操作系统、硬件设备以及客户应用程序得以正常运行和保存设置的核心“数据库”，也可以说是一个非常巨大的树状分层结构的数据库系统。
   注册表记录了用户安装在计算机上的软件和每个程序的相互关联信息，它包括了计算机的硬件配置，包括自动配置的即插即用的设备和已有的各种设备说明、状态属性以及各种状态信息和数据。利用一个功能强大的注册表数据库来统一集中地管理系统硬件设施、软件配置等信息，从而方便了管理，增强了系统的稳定性。
2. 注册表的功能
   刚才我们看到了，注册表中记录了用户安装在计算机上的软件和每个程序的相关信息，通过它可以控制硬件、软件、用户环境和操作系统界面的数据信息文件。
   相关知识：注册表文件的数据信息保存在 system.dat 和 user.dat 中、利用 regedit.exe 程序能够存取注册表文件（其实大家可能也知道 regedt32.exe，这两个程序是一样的）
3. 编辑器说明：
   在运行里键入 regedit 就可以进入了
   **根键**：这个称为 HKEY…………，某一项的句柄项：附加的文件夹和一个或多个值
   **子项**：在某一个项（父项）下面出现的项（子项）
   **值项**：带有一个名称和一个值的有序值，每个项都可包括任何数量的值项，值项由三个部分组成：名称、数据类型和数据。
   - 名称：不包括反斜线的字符、数字、代表符和空格的任意组合。同一键中不可有相同的名称
   - 数据类型：包括字符串、二进制和双字节等
   - 数据：值项的具体值，它的大小可以占用 64KB

---

## 第二课 总体结构分析

1. 注册表包括以下 5 个根键
   1. HKEY_CLASSES_ROOT
      说明：该根键包括启动应用程序所需的全部信息，包括扩展名，应用程序与文档之间的关系，驱动程序名，DDE 和 OLE 信息，类 ID
      编号和应用程序与文档的图标等。
   2. HKEY_CURRENT_USER
      说明：该根键包括当前登录用户的配置信息，包括环境变量，个人程序以及桌面设置等
   3. HKEY_LOCAL_MACHINE
      说明：该根键包括本地计算机的系统信息，包括硬件和操作系统信息，安全数据和计算机专用的各类软件设置信息
   4. HKEY_USERS
      说明：该根键包括计算机的所有用户使用的配置数据，这些数据只有在用户登录系统时才能访问。这些信息告诉系统当前用户使
      用的图标，激活的程序组，开始菜单的内容以及颜色，字体
      5.HKEY_CURRENT_CONFIG
      说明：该根键包括当前硬件的配置信息，其中的信息是从 HKEY_LOCAL_MACHINE 中映射出来的。

---

## 第三课 HKEY_CLASSES_ROOT

我们知道，在这一个根键中记录的是 WINDOWS 操作系统中所有数据文件的信息内容，主要记录了不同文件的文件扩展名和与之相对应的应用程序。这就是为什么我们双击某一个文档的时候，可以由系统自动调出应用程序的所在了。这个根键的子键当大家展开时发现是非常多的，它主要分为两种：一是已经注册的各类文件的扩展名；一是各种文件类型的有关信息。下面我们以 AVIFILE 举例说明一下其下面的子项的含义： 1. CLSID：分类标识，系统可以用这个类标识来识别相同类型的文件 2. Compressors：它下面有两个子项：auds:用于设置音频数据压缩程序的类标识；vids:用于设置视频数据压缩程序的类标识 3. defaultlcon：用于设置默认图标，这个大家可以改一下试试 4. RIFFHandlers：在它的下面有两个类标识：AVI：用于设置 AVI 文件的类标识；WAVE：用于设置 WAVE 文件的类标识 5. protocol：包括了执行程序和编辑程序的路径和文件名：StdExecute（stdfileediting)\_server：用于指定编辑程序；StdExecute（stdfileediting)\_PackageObjects:用于指定后打开 AVI 包对象的编辑程序；StdExecute（stdfileediting)\_verb：用于设置编辑程序时的工作状态，其中有 0、1、2 等状态 6. Shell 子项：用于设置视频文件的外壳：open:用于设置打开 AVI 文件的程序；play：用于设置播放命令的程序 7. Shellex：包括了视频文件的外壳扩展

---

## 第四课 HKEY_CURRENT_USER

此根键中保存的信息（当前用户的子项信息）与 HKEY_USERS_DEFAULT 下面的一模一样的。任何对 HKEY_CURRENT_USER 根键中的信息的修改都会导致对 HKEY_USERS_DEFAULT 中子项的修改

---

## 第五课 HKEY_LOCAL_MACHINE

此根键中存放的是用来控制系统和软件的设置，由于这些设置是针对那些使用 Windows 系统的用户而设置的，是一个公共配置信息，所以它与具体的用户没多大关系。

- HARDWARE 子项：该子项包括了系统使用的浮点处理器、串口等信息：ACPI:存放高级电源管理接口数据；DEVICEMAP：用于存放设备映射；DEscriptION：存放有关系统信息
  ；RESOURCEMAP：用于存放资源列表
- SAM 子项：哈哈，这部分被保护了，看不到
- SECURITY 子项：该子项只是为将来的高级功能而预留的
- SOFTWARE 子项：该子项中保留的是所有已安装的 32 位应用程序的信息，各个程序的控制信息分别安装在相应的子项中，由于不同的计算机安装的应用程序互不相同，因此这个子项下面的子项信息也不完全一样。
- SYSTEM 子项：该子项是启动时所需的信息和修复系统时所需要的信息：currentcontrol:保存了当前驱动程序控制集中的所有信息

---

## 第六课 HKEY_USERS

此根键中保存的是默认用户（default)，当前登录用户和软件（software) 的信息，其中 DEFAULT 子项是其中最重要的，它的配置是针对未来将会被创建的新用户的。新用户根据默认用户的配置信息来生成自己的配置文件，该配置文件包括环境、屏幕和声音等多种信息，其中常用的 3 项有：

- AppEvents 子项：它包括了各种应用事件的列表：EventLabels:按字母顺序列表；Schemes:按事件分类列表
- Control Panel 子项：它包括内容与桌面、光标、键盘和鼠标等设置有关
- Keyboard layout 子项：用于键盘的布局（如语言的加载顺序等）
  - Preload:语言的加载顺序
  - Substitutes:设置可替换的键盘语言布局
  - Toggle:用于选择键盘语言

---

## 第七课 HKEY_CURRENT_CONFIG

此根键存放的是当前配置的文件信息。实际上细心的读者已经发现了，五大根键实际上并不是五个，现在把这个做了总结。我们都知道用 regedit 或 regedit32 都可以打开注册表文件，在 XP 系统下的时候，这两种方法其实都是一样的，当我们打开注册表后看到了类似资源管理器的东西，这里面都有什么呢？

- HKEY_CLASSES_ROOT
- HKEY_CURRENT_USER
- HKEY_LOCAL_MACHINE
- HKEY_USERS
- HKEY_CURRENT_CONFIG

看是五个分支，其实就是 HKEY_LOCAL_MACHINE、HKEY_USERS 这两个才是真正的注册表键，其它都是从某个分支映射出来的，相当于快捷方式或是别名，这样的话看注册表就简单了许多了，现在说一下每个分支的作用：

- HKEY_CLASSES_ROOT：列出当前计算机注册的所有 COM 服务器和与应用程序相关联的所有文件扩展名。
- HKEY_CURRENT_USER：保存着当前登录到由这个注册服务的计算机上的用户配置文件。
  HKEY_LOCAL_MACHINE：保存操作系统及硬件相关信息的配置单元，它是一个公共的配置信息与具体用户无关，其中关键是两个键值
- SOFTWARE：保存着与这台电脑中安装的应用程序相关的设置。
- SYSTEM：WINDOWS 所装载的设备驱动程序以及当 WINDOWS 启动时所需要的各种参数。
- HKEY_USERS：包含当前计算机所有用户配置文件。
- HKEY_CURRENT_CONFIG： 计算机当前会话中的所有硬件配置信息。

---

## 第八课 注册表的基本操作

1. 创建项和项值
2. 更值项的数据
3. 删除项、子项或值项
4. 查找项、值项或数据

注册表中常用的数据类型有 5 种：

1. 二进制值（reg_binary）:多数硬件信息以二进制数据存储，而以十六进制格式显示在注册表编辑器中
2. 字符串值（reg_sz）:包括字符串的注册表键，使用字符串数据类型
3. 双字节值（reg_dword）:是 32 位信息常显示成 4 个字节。它在出错控制功能上用处极大，其数据一般以十六进制格式显示在注册表编辑器中。
4. 多字符串值(reg_multi_sz):允许将一系列项目作为单独的一个值使用。对于多种网络协议、多个项目、设备列表以及其他类似的列表项目来说，可以使用多字符串值
5. 可扩充字符串值（reg_expand_sz）：代表一个可扩展的字符串

---

## 第九课 注册表破坏的现象及原因

### 一、注册表破坏后的常见现象

1. 无法启动系统
2. 无法运行或正常运行合法的应用程序
3. 找不到启动系统或运行应用程序所需的文件
4. 没有访问应用程序的权限
5. 不能正确安装或装入驱动程序
6. 不能进行网络连接
7. 注册表条目有错误

### 二、注册表被破坏的原因

1. 应用程序错误：这个出现的时候比较多，因为我们知道应用程序或多或少的时候都有错误，都有可能导致不同的后果；另外
   在系统中安装过多的软件后，有可能出现彼此之间的冲突。
2. 驱动程序不兼容：其实我发现好多出在系统自动安装的驱动程序上，如果你本身有驱动程序盘的话，还是用专业的比较好一
   些
3. 硬件问题：这里面好我问题出现在硬件质量上，比如硬盘或内存质量不过关造成读写错误，或超频或 CMOS 或病毒等
4. 误操作：这个大家不知出现了没有，您的误操作可能会导致注册表出现错误，有的时候甚至会很严重的。

---

## 第十课 备份注册表

### 一、手工备份注册表

大家把以下几个文件直接复制到另一个文件夹就可以了

1. 在 windows\system32\config 下有以下几个文件用以保存系统配置：SAM,SYSTEM,SOFYWARE,DEFAULT
2. 在 Documetents and settings\username 文件夹中保存用户配置文件：NETUSER.DAT,当然对应的 LOG 文件应该一块保存

### 二、注册表导出法导出注册表

在文件中选择导出命令,回答文件名和位置，OK 了

### 三、通过系统备份功能进行备份

1. 选择开始—程序—附件—系统工具—备份
2. 选择高级模式点下一步
3. 选择 system state(系统状态),在底下文件名中位置中回答路径及文件名
4. 点击开始备份

---

## 第十一课 恢复注册表

1. 重新启动系统恢复注册表
   一重启就可以修正各种在注册表中出现的错误了，但是以硬盘上的注册表的信息正确为前提的。
2. 手工恢复注册表
   把上节中复制出来的文件再弄回去就 OK 了。
3. 注册表导入法恢复
   首先上节中的导出的文件你要有啊，然后运行 regedit.exe 文件，文件中的导入，选择要导入的注册表文件，点找开就可以了
4. 利用高级启动选项恢复注册表
   重启计算机，启动时按 F8 键进入高级选项菜单， 选择最后一次正确的配置，回车了，OK
5. 通过局域网来恢复注册表
   这个我们一般是指连入局域网的某一计算机（我们假设叫 aaaaa）的注册表被管理员锁了，但有另一台计算机（我们假设叫 B）的注册表可以用，现在我们用 B 来解除 A 的锁定。
   进入 B 的注册表，选择文件中的连接网络注册表，在查找位置中输入 aaaaa，这时注册表中出现了 songxiang 计算机的注册表，修改键值：aaaaa\HEKY_USERS\S-1-5-21-823518204-688789844-842925246-500\Software\Microsoft\Windows\CurrentVersion\Policies\System 下的 disableregistrytools 值改为 0 就可以了。S-1-5-21-823518204-688789844-842925246-500 这一大堆数知道什么意思吗，是超级管理员，重新安装系统

---

## 第十二课 注册表的优化

一. 我们为什么要优化注册表

1. 在计算机使用过程中可能经常添加或删除应用程序；在上网时遇到恶意网站，向注册表强行添加信息；
2. 原来的应用程序卸载后注册表没删除，启动时出现没找到某某应用程序
3. 多余注册表的子项可能造成浪费或降低启动速度

### 二、手工优化注册表

1. 清除多余的 DLL 文件
   大家找到这个项：HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\ShareDLLs，在这个项下存放的
   是共享的 DLL 信息，注意看括号里面的数据，它表示共享文件的数目，如果为 0，那么删除掉吧
2. 安装卸载应用程序的垃圾信息
   这个主要是一些非法卸载应用程序导致的，我们首先要知道什么程序被非法卸载了，这个很好办，你自己现在正使着的你是知道的，其余的就没用了
   注册表位置：HKEY_CURRENT_USER\Software HKEY_LOCAL_MACHINE\Software
   看到没用的就全删了就行了
3. 系统安装时产生的无用信息：去掉吧，有可能启动变快呢
   1. 删除多余时区（我是只留北京时区）
      位置：HKEY_LOCAL_MACHINE\Software\Microsoft\WindowsNT\CurrentVersion\Time Zones
      如果你只要北京时区的话，那么除了 China Standard Time，其余的都删了吧
   2. 清除国家列表（我只留中华人民共和国）
      位置：HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Telephony\Country List
      保留 86 号文件夹，其余删
   3. 清除多余的语言代码（我只保留英语—0409 和中文—0804）
      位置：HKEY_LOCAL_MACHINE\SYSTEM\CurrnetControlSet\Control\Nls\Locale
      没用的删了吧
   4. 删除多余的键盘布局：
      位置：HKEY_LOCAL_MACHINE\SYSTEM\CurrnetControlSet\Control\Keyboard Layouts
      你可以把每个键值都打开看看，不需要的输入法删除即可
   5. 删除失效的文件关联
      位置：HKEY_CLASSES_ROOT 主键可分为两部分：第一部分用来定义文件类型；第二部分与第一部分一一对应，用于记录打开
      文件的应用程序。一般，在打开第二部分的可疑子项后，若该键下的 COMMAND 下没有内容，就可以删掉了

---

## 第十三课 个性化设置

- 去掉桌面快捷方式上的小键头
  位置：HKEY_CLASSES_ROOT\LNKFILE 项 ：IsShortcut
  操作：删除此项
- 隐藏桌面上的所有图标
  位置：HKEY_CURRENT_USER\Software\Windows\CurrentVersion\Policies\Explorer
  新建：NoDesktop（双字节）
  操作：值设为 1
- 修改桌面上“回收站”的名字及图标位置：
  HKEY_LOCAL_MACHINE\SOFTWARE\Classes\CLSID\{645FF040-5081-101B-9F08-00AA002F954E}（这个大家也可直接查找“回收站”
  修改：（默认）一项随便换个名字就可以了
  然后展开此项，选择 DEfaultIcon
  这时大家看到有 3 个子项，意思吗一看就明白了
  如果想改变图标时，只需将路径和文件名改了即可，比如改为"d:\tt.ico"
- 去掉桌面上的网上邻居
  位置：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer
  新建：NoNetHood（双字节）值： 1
- 在桌面上显示系统版本号
  位置：HKEY_CURRENT_USER\Control Panel\Desktop
  项：PaintDesktopVersion
  修改：将值改为 1
- 改变窗口按钮字体的颜色
  位置：HKEY_CURRENT_USER\Control Pannel\Colors
  键值：ButtonText
  修改：大家知道 PS 吧，比如改为红么(255,0,0)
- 屏蔽桌面上的 IE 图标
  位置：HKEY_CURRENT_USER\Software\Windows\CurrentVersion\Policies\Explorer
  新建值项：NoInternetIcon
  修改：1
- 禁止更改桌面墙纸
  位置：HKEY_CURRENT_USER\Software\Windows\CurrentVersion\Policies\Explorer
  新建项值：NoChangingWallPaper(双字节）
  修改：1
- 设置登录背景
  位置：HKEY_USERS\DEFAULT\ControlPanel\Desktop
  键值：WallPaper
  修改：把背景图片一写就 OK 了（比如 C:\aa.bmp）
  ----------------以上需重启计算机----------------
- 更改：我的电脑的提示信息位置：
  HKEY_LOCAL_MACHINE\SOFTWARE\Classes\CLSID\{20D04FE0-3AEA-1069-A2D8-08002B30309D}
  键值：InfoTip
  修改：哈，随便打吧，我打成了“这是我的电脑噢"
- 更改：回收站的提示信息位置：
  HKEY_LOCAL_MACHINE\SOFTWARE\Classes\CLSID\{645FF040-5081-101B-9F08-00AA002F954E}
  键值：InfoTip
  修改：跟上面一样,自己改吧
- 更改 IE 的提示信息位置：
  HKEY_LOCAL_MACHINE\SOFTWARE\Classes\CLSID\{871C5380-42A0-1069-A2EA-08002B30309D}
  键值：InfoTip
  修改：同上
- 更改网上邻居的提示信息位置：
  HKEY_LOCAL_MACHINE\SOFTWARE\Classes\CLSID\{208D2C60-3AEA-1069-A2D7-08002B30309D}
  键值：InfoTip
  修改：同上
- 更改我的文档的提示信息位置：
  HKEY_LOCAL_MACHINE\SOFTWARE\Classes\CLSID\{450D8FBA-AD25-11D0-98A8-0800361B1103}
  键值：InfoTip
  修改：同上
- 更改任务计划提示信息位置：
  HKEY_LOCAL_MACHINE\SOFTWARE\Classes\CLSID\{D6277990-4C6A-11CF-8D87-00AA0060F5BF}
  键值：InfoTip
  修改：同上
- 改变桌面图标顺序位置：
  HKEY_LOCAL_MACHINE\SOFTWARE\Classes\CLSID\{450D8FBA-AD25-11D0-98A8-0800361B1103}
  键值：SortOrderIndex
  修改：48（我的文档在第一位）
  54（我的电脑在第一位）
- 禁止帮助提示信息(需重启）
  位置：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced
  键值：showinfotip
  修改：0
- 用真彩色显示图标(需重启）
  位置：HKEY_CURRENT_USER\ControlPanel\Desktop\WindowMetrics
  键值：Shell Icon BPP
  修改：32
- 更改图标显示尺寸(需重启）
  位置：HKEY_CURRENT_USER\Control Panel\Desktop\WindowMetrics
  键值：Shell Icon SIZE
  修改：在显示器分辨率为 1024*768 时可改为：48；在显示器分辨率为 1600*1200 时可改为：64
- 自动清除“文档”菜单中的历史记录（需重启）
  位置：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer
  新建：CleanReccentDocsOn-Exit
  (REG-DWORD)值：1
- 禁止“文档”的历史记录（需重启）
  位置：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer
  新建：NoReccentDocsHistory
  (REG-DWORD)值：1
- 去掉开始菜单的“文档”项（需重启）
  位置：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer
  新建：NoReccentDocsMenu
  (REG-DWORD)值：1
- 去掉开始菜单的“查找”项（需重启）
  位置：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer
  新建：NoFind
  (REG-DWORD)值：1
- 去掉开始菜单的“运行”项（需重启）
  位置：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer
  新建：NoRun
  (REG-DWORD)值：1
- 禁止用户更改“开始”菜单（需重启）
  位置：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer
  新建：NoChangeStartMenu
  (REG-DWORD)值：1
- 禁止显示开始菜单中的 windows update 项（需重启）
  位置：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer
  新建：NoWindowsUpdate
  (REG-DWORD)值：1
- 屏蔽开始菜单中的“关闭计算机”项（需重启）
  位置：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer
  新建：NoClose (REG-DWORD)值：1
- 加快“开始”菜单与“任务栏”的速度
  位置：HKEY_CURRENT_USER\Control Panel\Desktop
  键值：MenuShowDelay
  值：数值资料改为 100 或更小（默认值为：400），建议不要使用 0，因为如此一来只要鼠标一不小心触碰到“所有程序”，整条菜单就会跑出来，那这乱了套。
- 为回收站的右键菜单增加“删除”和“重命名”
  位置：HKEY_CLASSES_ROOT\CLSID\{645FF040-5081-101B-9F08-00AA002F954E}\ShellFolder
  键值：Attributes
  值：70 01 00 20
- 为右键菜单添加“在新窗口打开”命令
  位置：HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Directory\shell
  新建子项：NewWindow
  修改：将默认值项值改为“在新窗口打开”
  继续：在 NewWindow 项下新建个子项 command
  修改：将默认值项值改为 explorer.exe
- 为右键菜单添加“快速关闭计算机”命令
  位置：HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Directory\shell
  新建子项：
  快速关闭计算机
  修改：将默认值项值改为“快速关闭计算机”
  继续：在 NewWindow 项下新建个子项 command
  修改：将默认值项值改为"c:\windows\rundll32.exe user.exe,exitwindowsexec"
- 禁止任务栏的快捷菜单（需重启)
  位置：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer
  新建键值：NoTrayContextMenu
  (REG_DWORD)值：1
- 将任务栏显示时间的地方改为要显示的文字（需重启）
  位置：HKEY_CURRENT_USER\Control Panel\International
  键值：STimeFormat
  修改：自己喜欢什么文字就改成什么吧
- 禁止使用任务栏（需重启）
  位置：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer
  新建键值：NoSetTaskBar
  (REG_DWORD)修改：1

---

## 第十四课 系统设置(控制面板常用选项设置，系统性能优化设置)

- 禁用“控制面板”中的“显示”选项
  位置：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies
  新建项值：System
  新建值项：NodispCPL
  （REG_DWORD）
  值：1
- 屏蔽显示选项中的“屏幕保护程序”
  位置：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\System
  新建值项：NoDispScrSavPage
  （REG_DWORD）
  值：1
- 屏蔽显示选项中的“外观”
  位置：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\System
  新建值项：NoDispAppearancePage
  （REG_DWORD）值：1
- 屏蔽显示选项中的“设置”
  位置：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\System
  新建值项：NoDispSettingsPage
  （REG_DWORD）值：1
- 屏蔽显示选项中的“屏幕保护程序密码”
  位置：HKEY_CURRENT_USER\Software\Policies\Microsoft
  新建项：Control Panel
  再新建子项：Desktop
  新建值：ScreenSaverIsSecure (REG_DWORD)值：1
- 禁止使用“添加删除程序”项
  位置：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies
  新建子项：Uninstall
  新建值项：NoAddRemovePrograms (REG_DWORD)值：1
- 屏蔽“添加删除程序”中的“更改或删除程序”选项
  位置：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\uninstall
  新建值项：NoRemovePage (REG_DWORD)值：1
- 屏蔽“添加删除程序”中的“添加新程序”选项
  位置：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\uninstall
  新建值项：NoAddpage (REG_DWORD)值：1
- 屏蔽“添加删除程序”中的“添加或删除 windows 组件”选项
  位置：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\uninstall
  新建值项：NoWindowsSetupPage (REG_DWORD)值：1
- 屏蔽“添加删除程序”中的“更改或删除程序”中的“单击此处获得支持信息”选项
  位置：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\uninstall
  新建值项：NoSupportInfo (REG_DWORD)值：1
- 屏蔽“更改或删除程序”中的“添加新程序”中的“从 CD-ROM 或软盘安装程序”选项
  位置：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\uninstall
  新建值项：NoAddFromCDorFloppy (REG_DWORD)值：1
- 屏蔽“更改或删除程序”中的“添加新程序”中的“从 Microsoft 添加程序程序”选项
  位置：HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\uninstall
  新建值项：NoAddFromInternet (REG_DWORD)值：1
- 设置 windows 的关机时间
  位置：HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control
  值项：WaitToKillServiceTimeout
  修改：它以毫秒为单位，请自行设置
- 更改 windows 服务启动的顺序
  位置：HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\ServiceGroupOrder
  值项：ServiceGroupOrder
  修改：按你想要的顺序自行输入
- 更改 windows 启动时运行的程序
  位置：HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session
  Manager
  值项：BootExecite
  修改：自行输入一行启动时要执行的命令即可
- 删除多余的 DLL 文件
  位置：HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\SharedDlls
  值项：这里好多了，都是 DLL 的，注意看好了，所有是 0 的都是没用的，删了即可，然后再将相应的系统文件夹中的文件删除
- 删除不必要的自启程序
  位置：HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run
  值项：这里面列出的都是启动项，不要的可以删掉，他和 msconig 中列出的是一样的
- 清除注册表垃圾（需重启）
  位置 1：HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall
  位置 2：HKEY_LOCAL_MACHINE\SOFTWARE
  操作：很简单了，没用的删了吧
- 自动刷新窗口（需重启）
  位置：HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Update
  键值：UpdateMode
  修改：0
- 更改开始菜单存放的目录（需重启）
  位置：HKEY_USERS\.DEFAULT\Software\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders
  键值：Start Menu
  修改：把要改到的路径添上就可以了,并将原源件复制到目标文件夹下
- 更改开始菜单中的程序的存放目录（需重启）
  位置：HKEY_USERS\.DEFAULT\Software\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders
  键值：Program
  修改：把要改到的路径添上就可以了，并将原源件复制到目标文件夹下
- 更改开始菜单中的程序里的应用程序存放目录（需重启）
  位置：HKEY_USERS\.DEFAULT\Software\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders
  键值：appdate
  修改：把要改到的路径添上就可以了，并将原源件复制到目标文件夹下
- 更改开始菜单中的程序里的发送到存放目录（需重启）
  位置：HKEY_USERS\.DEFAULT\Software\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders
  键值：SendTo
  修改：把要改到的路径添上就可以了，并将原源件复制到目标文件夹下,其实我们也可以在这里建立一个新的发送到项目，比如发送到你的 U 盘
- 更改开始菜单中的程序里的启动程序存放目录（需重启）
  位置：HKEY_USERS\.DEFAULT\Software\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders
  键值：StartUp
  修改：把要改到的路径添上就可以了，并将原源件复制到目标文件夹下
- 更改网页历史记录存放目录（需重启）
  位置：HKEY_USERS\.DEFAULT\Software\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders
  键值：History
  修改：把要改到的路径添上就可以了，并将原源件复制到目标文件夹下
- 更改我的文档存放目录（需重启）
  位置：HKEY_USERS\.DEFAULT\Software\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders
  键值：Personal
  修改：把要改到的路径添上就可以了，并将原源件复制到目标文件夹下
- 更改新建文件的存放目录（需重启）
  位置：HKEY_USERS\.DEFAULT\Software\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders
  键值：Templates
  修改：把要改到的路径添上就可以了
- 在我的电脑中显示网络连接
  位置：HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace
  新建子项：{992CFFA0-F557-101A-88EC-00DD010CCC48}
  修改默认值：网络连接
- 在我的电脑中显示打印机和传真
  位置：HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\MyComputer\NameSpace
  新建子项：{2227A280-3AEA-1069-A2DE-08002B3039D}
  修改默认值：打印机和传真
- 打开或关闭启动优化功能（启动时碎片整理）
  位置：HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Dfrg\BootOptimizeFunction
  键值：Enable
  修改：Y 开启 N 不开启
- 加快程序运行速度(需要重启)
  位置：HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem
  新建值项：configfileallocsize
  值：1f4
- 缩短关闭无响应程序的等待时间（需重启）
  位置：HKEY_USERS\.DEFAULT\Control Panel\Desktop
  值项：WaitToKillTimeout
  修改：增大一点可以加快处理程序的速度
- 关机时自动删除交换文件
  位置：HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Control\Session Manager\Memory Management
  值：ClearPageFileAtShutdown
  修改：1
- 自动关闭计算机（指关机后停在关机界面）
  位置：HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows
  NT\CurrentVersion\Winlogon
  值：PowerdownAfterShutdown
  修改：1

---

## 第十五课 硬件设置

- 启用 CPU 的二级缓存（需重启）
  位置：HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Memory Management
  值项：secondleveldatacache
  修改：我改成了 200 了，你呢
- 修改认证标识（拥有个性化的 CPU）
  位置：HKEY_LOCAL_MACHINE\HARDWARE\DEscriptION\System\CentralProcessor\0
  值项：ProcessorNameString
  修改：随便改，改成了奔 8CPU,9.99GHZ 主频
- 更改系统属性对话框里的 CPU 信息
  位置：HKEY_LOCAL_MACHINE\HARDWARE\DEscriptION\System\CentralProcessor\0
  值项：VendorIdentifer
  修改：随便改
- 清除内存中不使用的 DLL 文件（需重启）
  位置：HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer
  新建值项：Always UnloadDll
  (REG-DWORD)值：1
- 启动自动优化磁盘功能（需重启）
  位置：HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Dfrg\BootOptimizeFunction
  值项：Enable
  修改：Yes

## CMD

```bash
  NetSh Advfirewall ``set` `allprofiles state off #关闭防火墙
  Netsh Advfirewall show allprofiles      #查看防火墙状态
  netsh wlan show profiles name="" key=clear #查看WLAN
  ipconfig /flushdns #刷新DNS解析缓存
  attrib -h [文件或文件夹] #显示文件或文件夹
  attrib +h [文件或文件夹] #隐藏文件或文件夹
  del /a/s/f/q * #进入指定文件系统路径内删除所有普通文件
  rd /s/q * #进入指定文件系统路径内删除所有非空文件夹
  xcopy /e/h [文件或文件夹] [文件或文件夹] #复制文件夹到另外一个包括隐藏文件
```

## bat

- `显示隐藏文件或者文件夹.bat`[^对于不喜欢命令的人]

```bash
[:folderhider
@echo off
title 快速隐藏/还原文件
echo 请输入数字选择需要的操作,回车确认:
:reinp
echo 1. 隐藏
echo 2. 还原
set /p hj=
if %hj%==1 goto hi
if %hj%==2 goto sh
echo 命令输入错误，请重新输入:
goto :reinp
:hi
set/p folderr=请输入你想要隐藏的文件/文件夹或直接拖放:
if exist "%folderr%" goto hider
if not exist "%folderr%" goto noexist
:noexist
echo 你输入的文件/文件夹不存在,请重新输入
goto :hi
:hider
attrib +h +s %folderr%
echo %DATE% %TIME% 隐藏了: %folderr% >>隐藏日志.txt
echo 文件已隐藏成功,按任意键离开 & pause >nul
exit
:sh
set /p showern=请输入你想要还原的文件/文件夹:
if exist "%showern%" goto shower
if not exist "%showern%" goto noexist1
:noexist1
echo 你输入的文件/文件夹不存在,请重新输入
goto :sh
:shower
attrib -h -s %showern%
echo %DATE% %TIME% 还原了: %showern% >>隐藏日志.txt
echo 文件已还原成功,按任意键离开  & pause >nul
exit ]()
```

- 右键文本文档消失处理[^.bat]

```bash
Windows Registry Editor Version 5.00
[HKEY_CLASSES_ROOT\.txt]
@="txtfile"
"Content Type"="text/plain"
[HKEY_CLASSES_ROOT\.txt\ShellNew]
"NullFile"="" [HKEY_CLASSES_ROOT\txtfile]
@="文本文档"
[HKEY_CLASSES_ROOT\txtfile\shell]
[HKEY_CLASSES_ROOT\txtfile\shell\open]
[HKEY_CLASSES_ROOT\txtfile\shell\open\command]
@="NOTEPAD.EXE %1"
```
