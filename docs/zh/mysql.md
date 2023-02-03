# MySql

```mysql
mysql> SELECT 1 + 1 AS solution; # 测试MySql连接
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
```

## > explain

| Key  |      Value       |                           remarks                            |
| :--: | :--------------: | :----------------------------------------------------------: |
|  PK  |   primary key    |                             主键                             |
|  NN  |     not null     |                             非空                             |
|  UQ  |      unique      |                           唯一索引                           |
| BIN  |      binary      |              二进制数据(比text更大的二进制数据)              |
|  UN  |     unsigned     |                   无符号   整数（非负数）                    |
|  ZF  |    zero fill     |        填充0 例如字段内容是1 int(4), 则内容显示为0001        |
|  AI  |  auto increment  |                             自增                             |
|  G   | generated column | 生成列。在mysql查询语句中加\g、\G的意思：<br />1. \g  的作用是分号和在sql语句中写“；”是等效的；<br />2. \G  的作用是将查到的结构旋转90度变成纵向（换行打印） |
