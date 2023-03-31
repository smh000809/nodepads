# MySql

## MySql 语句

```bash
mysql> SELECT 1 + 1 AS solution; # 测试MySql连接
mysql> mysqladmin -u root password # MacOS用Homebrew默认为管理员密码可修改密码
mysql> show database; #显示数据库
mysql> show databases; #显示所有数据库
mysql> use 数据库名称; #切换mysql数据库
mysql> show tables; #查看当前数据库中的表
mysql> select * from 表名; #查询表中的所有列
mysql> select id,name,age * from 表名; #查询id,name,age 字段的数据
mysql> select * from students WHERE id="3"; #查询id为3的行(用到WHERE)
mysql> select * from students WHERE id="3" and age="20"; #查询id为3,age为20的行(WHERE，and可以换成or)
mysql> select * from students where name like "%A%"; #查询name包含A的数据
mysql> select * from students where name like "%A"; #查询name以A结尾的数据
mysql> select * from students where name like "A%"; #查询name以A开头的数据
mysql> select * from students where age>=18 and age<=25; #查询age>=18和小于等于25的数据
mysql> create database 数据库名称; #创建数据库
mysql> English: Query OK, 0 rows affected (0.05 sec); #查询OK，0行受影响（0.05秒）
mysql> insert into students values(1,"AHao4",20,19990909); #增加数据
mysql> insert into students(id,name,age,birthday)values(1,"AHao",20,20000809); #增加数据
mysql> select * from students limit 3 offset 2; #显示从第2条开始的3条数据
mysql> drop database 数据库名称; #删库
mysql> ALTER user 'root'@'localhost' IDENTIFIED BY '新密码'; #改密码
mysql> flush privileges; # 重新加载
```

| Key |      Value       |                                                                        remarks                                                                        |
| :-: | :--------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: |
| PK  |   primary key    |                                                                         主键                                                                          |
| NN  |     not null     |                                                                         非空                                                                          |
| UQ  |      unique      |                                                                       唯一索引                                                                        |
| BIN |      binary      |                                                         二进制数据(比 text 更大的二进制数据)                                                          |
| UN  |     unsigned     |                                                                 无符号 整数（非负数）                                                                 |
| ZF  |    zero fill     |                                                   填充 0 例如字段内容是 1 int(4), 则内容显示为 0001                                                   |
| AI  |  auto increment  |                                                                         自增                                                                          |
|  G  | generated column | 生成列。在 mysql 查询语句中加\g、\G 的意思：1. \g 的作用是分号和在 sql 语句中写“；”是等效的；2. \G 的作用是将查到的结构旋转 90 度变成纵向（换行打印） |

## MySQL 数据类型

### 数值类型

MySQL 支持所有标准 SQL 数值数据类型。

这些类型包括严格数值数据类型(INTEGER、SMALLINT、DECIMAL 和 NUMERIC)，以及近似数值数据类型(FLOAT、REAL 和 DOUBLE PRECISION)。

关键字 INT 是 INTEGER 的同义词，关键字 DEC 是 DECIMAL 的同义词。

BIT 数据类型保存位字段值，并且支持 MyISAM、MEMORY、InnoDB 和 BDB 表。

作为 SQL 标准的扩展，MySQL 也支持整数类型 TINYINT、MEDIUMINT 和 BIGINT。下面的表显示了需要的每个整数类型的存储和范围。

| 类型           | 大小                                          | 范围（有符号）                                                                                                                      | 范围（无符号）                                                    | 用途            |
| :------------- | :-------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- | :-------------- |
| TINYINT        | 1 Bytes                                       | (-128，127)                                                                                                                         | (0，255)                                                          | 小整数值        |
| SMALLINT       | 2 Bytes                                       | (-32 768，32 767)                                                                                                                   | (0，65 535)                                                       | 大整数值        |
| MEDIUMINT      | 3 Bytes                                       | (-8 388 608，8 388 607)                                                                                                             | (0，16 777 215)                                                   | 大整数值        |
| INT 或 INTEGER | 4 Bytes                                       | (-2 147 483 648，2 147 483 647)                                                                                                     | (0，4 294 967 295)                                                | 大整数值        |
| BIGINT         | 8 Bytes                                       | (-9,223,372,036,854,775,808，9 223 372 036 854 775 807)                                                                             | (0，18 446 744 073 709 551 615)                                   | 极大整数值      |
| FLOAT          | 4 Bytes                                       | (-3.402 823 466 E+38，-1.175 494 351 E-38)，0，(1.175 494 351 E-38，3.402 823 466 351 E+38)                                         | 0，(1.175 494 351 E-38，3.402 823 466 E+38)                       | 单精度 浮点数值 |
| DOUBLE         | 8 Bytes                                       | (-1.797 693 134 862 315 7 E+308，-2.225 073 858 507 201 4 E-308)，0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308) | 0，(2.225 073 858 507 201 4 E-308，1.797 693 134 862 315 7 E+308) | 双精度 浮点数值 |
| DECIMAL        | 对 DECIMAL(M,D) ，如果 M>D，为 M+2 否则为 D+2 | 依赖于 M 和 D 的值                                                                                                                  | 依赖于 M 和 D 的值                                                | 小数值          |

## 日期和时间类型

表示时间值的日期和时间类型为 DATETIME、DATE、TIMESTAMP、TIME 和 YEAR。

每个时间类型有一个有效值范围和一个"零"值，当指定不合法的 MySQL 不能表示的值时使用"零"值。

TIMESTAMP 类型有专有的自动更新特性，将在后面描述。

| 类型      | 大小    | 范围                                                                                                                                                                  | 格式                | 用途                     |
| :-------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------ | :----------------------- |
| DATE      | 3 Bytes | 1000-01-01/9999-12-31                                                                                                                                                 | YYYY-MM-DD          | 日期值                   |
| TIME      | 3 Bytes | '-838:59:59'/'838:59:59'                                                                                                                                              | HH:MM:SS            | 时间值或持续时间         |
| YEAR      | 1 Bytes | 1901/2155                                                                                                                                                             | YYYY                | 年份值                   |
| DATETIME  | 8 Bytes | '1000-01-01 00:00:00' 到 '9999-12-31 23:59:59'                                                                                                                        | YYYY-MM-DD hh:mm:ss | 混合日期和时间值         |
| TIMESTAMP | 4 Bytes | '1970-01-01 00:00:01' UTC 到 '2038-01-19 03:14:07' UTC 结束时间是第 **2147483647** 秒，北京时间 **2038-1-19 11:14:07**，格林尼治时间 2038 年 1 月 19 日 凌晨 03:14:07 | YYYY-MM-DD hh:mm:ss | 混合日期和时间值，时间戳 |

## 字符串类型

字符串类型指 CHAR、VARCHAR、BINARY、VARBINARY、BLOB、TEXT、ENUM 和 SET。该节描述了这些类型如何工作以及如何在查询中使用这些类型。

| 类型       | 大小                  | 用途                            |
| :--------- | :-------------------- | :------------------------------ |
| CHAR       | 0-255 bytes           | 定长字符串                      |
| VARCHAR    | 0-65535 bytes         | 变长字符串                      |
| TINYBLOB   | 0-255 bytes           | 不超过 255 个字符的二进制字符串 |
| TINYTEXT   | 0-255 bytes           | 短文本字符串                    |
| BLOB       | 0-65 535 bytes        | 二进制形式的长文本数据          |
| TEXT       | 0-65 535 bytes        | 长文本数据                      |
| MEDIUMBLOB | 0-16 777 215 bytes    | 二进制形式的中等长度文本数据    |
| MEDIUMTEXT | 0-16 777 215 bytes    | 中等长度文本数据                |
| LONGBLOB   | 0-4 294 967 295 bytes | 二进制形式的极大文本数据        |
| LONGTEXT   | 0-4 294 967 295 bytes | 极大文本数据                    |

**注意**：char(n) 和 varchar(n) 中括号中 n 代表字符的个数，并不代表字节个数，比如 CHAR(30) 就可以存储 30 个字符。

CHAR 和 VARCHAR 类型类似，但它们保存和检索的方式不同。它们的最大长度和是否尾部空格被保留等方面也不同。在存储或检索过程中不进行大小写转换。

BINARY 和 VARBINARY 类似于 CHAR 和 VARCHAR，不同的是它们包含二进制字符串而不要非二进制字符串。也就是说，它们包含字节字符串而不是字符字符串。这说明它们没有字符集，并且排序和比较基于列值字节的数值值。

BLOB 是一个二进制大对象，可以容纳可变数量的数据。有 4 种 BLOB 类型：TINYBLOB、BLOB、MEDIUMBLOB 和 LONGBLOB。它们区别在于可容纳存储范围不同。

有 4 种 TEXT 类型：TINYTEXT、TEXT、MEDIUMTEXT 和 LONGTEXT。对应的这 4 种 BLOB 类型，可存储的最大长度不同，可根据实际情况选择。
