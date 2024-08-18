[[toc]]

## Rust 的基本程序概念

### 一、变量以及可变性

主要包含 Rust 变量和常量的定义使用、Rust 数据类型、Rust 流程控制；

#### 1. 变量声明语法

- 变量必须先声明在使用
- rust 没有默认构造函数，变量没有默认值；
- variableName 以字母(unicode)、下划线、数字组成，但是必须以字母(unicode)、下划线开头；
- 未声明类型的为自动类型推导，但不意味着动态类型。

#### 2. 不可变变量

默认情况下，变量是不可变的，这是 Rust 提供的用于安全性和简单并发性方式编写代码。

例子：不可变变量

```rust
fn main() {
    let x = 5;
    println!("The value of x is: {x}");
    x = 6;
    println!("The value of x is: {x}");
}
```

错误提示

```bash
raojiamin@192 hello % cargo build
   Compiling hello v0.1.0 (/Users/raojiamin/Desktop/code/rust_code/hello)
error[E0384]: cannot assign twice to immutable variable `x`
 --> src/main.rs:4:5
  |
2 |     let x = 5;
  |         -
  |         |
  |         first assignment to `x`
  |         help: consider making this binding mutable: `mut x`
3 |     println!("The value of x is: {x}");
4 |     x = 6;
  |     ^^^^^ cannot assign twice to immutable variable

For more information about this error, try `rustc --explain E0384`.
error: could not compile `hello` (bin "hello") due to previous error
```

#### 3. 未使用变量警告

如果你声明了变量但是并未使用，编译器则会给你一个变量未使用的警告。

```bash
warning: unused variable: `x`
 --> src/main.rs:2:9
  |
2 |     let x = 5;
  |         ^ help: if this is intentional, prefix it with an underscore: `_x`
  |
  = note: `#[warn(unused_variables)]` on by default

warning: `hello` (bin "hello") generated 1 warning (run `cargo fix --bin "hello"` to apply 1 suggestion)
    Finished dev [unoptimized + debuginfo] target(s) in 0.89s
```

#### 4. 使用 let mut 可变变量

```rust
fn main() {
    let mut y = 100;

    // help: maybe it is overwritten before being read?rustc(unused_assignments)
    // 如果在第二次赋值前没有读取该变量会有上述警告
    println!("the y value is {}", y);

    y = 100;

    println!("the y value is {}", y);
}
```

#### 5. 使用 const 声明常量

初始化过程完全静态（编译器时期已知其值），且不会改变。

```rust
fn main() {

    const X:i32 = 100;
    // warning: constant is never used: `x` 警告：常量必须被使用
    // warning: constant `x` should have an upper case name 常量必须大写
    // error: missing type for `const` item 错误：常量必须声明类型

    println!("the X value is {}", X);
}
```

const 常量一定不能 使用 mut 修饰。

#### 6. Shadowing

该特性可以反复声明不可变对象，她可以重新更改不可变变量的数据类型，该语法特性一般用于中间变量。

```rust
fn main() {
    let x = 5;
    let x = x + 1;
    let x = x * 2;
    println!("The value of x is: {}", x);
}
```

该特性不允许使用在可变对象上。

```rust
fn main() {
    let mut spaces = "   ";
    spaces = spaces.len();
}
```

错误提示

```bash
cargo build
   Compiling hello v0.1.0 (/Users/raojiamin/Desktop/code/rust_code/hello)
error[E0308]: mismatched types
 --> src/main.rs:3:14
  |
2 |     let mut spaces = "   ";
  |                      ----- expected due to this value
3 |     spaces = spaces.len();
  |              ^^^^^^^^^^^^ expected `&str`, found `usize`
  |
help: try removing the method call
  |
3 -     spaces = spaces.len();
3 +     spaces = spaces;
  |

For more information about this error, try `rustc --explain E0308`.
error: could not compile `hello` (bin "hello") due to previous error
```

#### 7. 暂时不使用的变量

```rust
fn main() {
    let _ = "hello";
    let _num = 100;       // 表示可暂时不使用该变量
    println!("{}", _);    // 编译错误！“_” 的含义是忽略该变量绑定，之后不会再用了
}
```

以下划线开头的变量名，如 ”\_num“， 表示可以暂时不使用该变量；

#### 8. 全局常量和全局静态变量

在Rust 之中没有全局变量的概念，但是可以使用全局静态变量和全局常量。

##### 1. 全局常量

- 全局常量必须在声明的时候初始化；
- 全局常量名必须大写
- 全局常量必须在声明的时候显示声明类型；

##### 2. 全局常量

- 静态变量必须在声明时初始化；
- 静态变量必须编译时可确定的常量, 变量名必须大写;
- mut 修饰的静态变量，使用的时候必须 unsafe 函数或者 unsafe 代码块；
- 静态变量在声明时候必须指定静态的变量的数据类型；

### 二、数据类型

#### 1. 标量类型(Scalar Types)

标量类型表示单个值。Rust 中有四种主要的标量类型：整型、浮点型、布尔类型、字符。

##### 1. 整型(Integer Types)

###### 1. 几种整型类型

整型数据默认是 i32 类型， isize 或 usize 在 32 位机器上就是 4 个字节，在 64 位机器上就是 8 个字节。

| Length  | Signed | Unsigned |
| :-----: | :----: | :------: |
|  8-bit  |   i8   |    u8    |
| 16-bit  |  i16   |   u16    |
| 32-bit  |  i32   |   u32    |
| 64-bit  |  i64   |   u64    |
| 128-bit |  i128  |   u128   |
|  arch   | isize  |  usize   |

每一个变量都可以是有符号或无符号，并且具有明确的大小，有符号数使用二进制补码来表示存储。(早期8086 cpu只支持加法指令)

- 原码：最高位为符号位，0代表正数，1代表负数，其余各位为数值本身的绝对值
- 反码：
  - 正数：反码与原码相同，这是规定；
  - 负数：符号位为1不变，其余位对原码取反；
- 补码：
  - 正数：补码与原码相同
  - 负数：符号位为1不变，其余位对原码取反加1；

isize 和 usize的主要场景是对某种集合进行索引操作。

###### 2. 整型字面量(Integer Literals)

| Number literals |  Example   |
| :-------------: | :--------: |
|     Decimal     |   98_222   |
|       Hex       |    0xff    |
|      Octal      |    0o77    |
|     Binary      | 0b1111_000 |
|  Byte(u8 only)  |    b’a’    |

除了byte类型外，所有数值字面量都允许使用类型后缀，例如：67u8；

###### 3. 整数溢出

u8的范围是0-255，如果你把一个 u8的值设置为 256。

- 调试模式（Debug）下，rust 会检查整数溢出，如果发生溢出，程序会在运行时就会 panic。
- 发布模式（Release）下，rust 不会检查整数溢出，若果发生溢出，rust 会执行环绕操作，不会抛出 panic；

如果要在 release 模式下打开整数溢出检查后，只需要在 Cargo.toml 中配置

```toml
[profile.release]
overflow-checks = true
```

##### 2. 浮点型(Floating-Point Types)

浮点数有两种类型：f32(单精度)、f64(双精度)。Rust的浮点类型使用了 IEEE-754 标准来表述。 f64 是默认类型，因为在现代 CPU 上 f64 和 f32 的速度差不多，而且精度更高。

##### 3. 布尔类型(Boolean Type)

布尔类型只有两个值：true、false。布尔类型的大小为1 字节，在 rust 中 布尔类型使用 bool 关键字。

##### 4. 字符(Character Type)

字符类型是一个比较特别的，在 Java 和 CPP 之中 都只占用 1个字节，但是 Rust 为了支持描述任何一个 unicode 字符， char 类型需要 4个字节来描述，这样会带来空间资源的浪费，因为 ASCII 字符其实只需要 1 个字节的空间。如果只需要单字节即可，Rust 给出的解决方案是用 ‘b’ 来声明单字节，将字符以u8类型的形式存储。

```rust
let x: u8 = b'A';  // 占 1 个字节
let y: char = 'A'; // 占 4 个字节
```

##### 5. 数字操作

Rust 支持所有数字类型所需要的基本数学操作：+、-、\*、/、% 。 整数触发会向零截断到最接近的整数。

```rust
fn main() {
    // addition
    let sum = 5 + 10;

    // subtraction
    let difference = 95.5 - 4.3;

    // multiplication
    let product = 4 * 30;

    // division
    let quotient = 56.7 / 32.2;
    let truncated = -5 / 3; // Results in -1

    // remainder
    let remainder = 43 % 5;
}
```

#### 2.复合类型(Compound Types)

复合类型可以将多个值分组到一个类型中，Rust 中有两种基本复合类型：元组和数组。

##### 1. 元组(Tuple Type)

元组是一个具有多种数据类型的多个值组合成一个复合类型，元组有固有的长度。一旦声明它们的长度就不会增长或缩小。

2.2.1.1、元组定义
我们通常在括号内写一个逗号分隔的值列表来创建元组。

```rust
fn main() {
    let tup:(i32, f64, u8) = (500, 6.4, 1);
    // 定义空元组
    let tup01:() = ();
    // 单个元素元组
    let tup02 = (1,);

    println!("{:?}", tup01);
    println!("{:?}", tup02);

    println!("{:?}", tup);
}
```

需要注意：

- 如果你使用显示数据类型声明单个元素的元组，编译器会给出警告；
- 如果你要声明单个元素，必须使用自动类型推断，并且初始化的时候必须带有逗号，否则会被编译器认为是单个元素变量；

###### 1. 访问元组的方式

1. 模式解构

```rust
fn main() {
    let tup:(i32, f64, u8) = (500, 6.4, 1);
    let (x, y, z) = tup;
    println!("{:?}", tup);
    println!(" the value of x is :{}", x);
    println!(" the value of y is :{}", y);
    println!(" the value of z is :{}", z);
}
```

2. 数字索引(使用.来访问元组)

模式解构可以让我们一次性把元组全部获取出来，如果我们想要访问某个元组， 可以使用 . 操作符来访问；和其他语言一样 数组、字符串、元组的索引从0开始。

```rust
fn main() {
    let x: (i32, f64, u8) = (500, 6.4, 1);

    let five_hundred = x.0;
    let six_point_four = x.1;
    // 如果索引不在范围内，会报如下错误 error[E0609]: no field `3` on type `(i32, f64, u8)`

    println!("five_hundred is {}", five_hundred);
    println!("six_point_four is {}", six_point_four);

}
```

##### 2. 数组(Array Type)

数组的每个元素都必须具有相同的类型，数组具有固定的长度，依次线性排列。

###### 1. 数组的定义

数组的定义格式如下：let 变量名[类型; 数组长度] = [初始化列表];

```rust
fn main() {
    let array:[i32; 3] = [1,3,5];
    let months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

    // 如果一个数组有多个重复的元素的时候
    let a = [3;5];

    println!("array: {:?}", array);
    println!("months: {:?}", months);
}
```

###### 2. 数组的访问

使用索引访问数组的元素，索引从0开始，到数组长度-1；如果超出数组索引访问将会运行时报错。

```rust
fn main() {
    let a = [9, 8, 7, 6, 5];

    let first = a[0]; // 获取a数组第一个元素
    let second = a[1]; // 获取第二个元素

    println!("first: {:?}", first);
    println!("second: {:?}", second);
}
```

索引越界的时候，程序将会执行错误

```bash
error: this operation will panic at runtime
 --> src/main.rs:5:18
  |
5 |     let second = a[6]; // 获取第二个元素
  |                  ^^^^ index out of bounds: the length is 5 but the index is 6
  |
  = note: `#[deny(unconditional_panic)]` on by default

error: could not compile `hello` (bin "hello") due to previous error
```

### 三、函数

函数在Rust代码只能够很常见，我们已经见到了最重要的函数 main 函数，他是许多程序的入口函数，我们还看到了 fn 关键字。

#### 1. 函数定义

在 rust 里面函数使用 fn 关键字声明。rust中函数名采用所有字母都是小写的，并且使用下划线分隔单词。函数使用大括号包括起来。

```rust
// 无参函数
fn another_function() {
    println!("Another function.");
}
```

#### 2. 函数参数(parameters)

```rust
// 函数参数，函数的参数必须声明参数的类型
fn another_function(x: i32) {
    println!("Another function.");
}
```

- 定义函数的时候声明的参数叫做形式参数；
- 调用函数的时候传入的参数叫做实际参数；

#### 3. 返回值(Return Values)

```rust
// 函数返回值
fn five() -> i32 {
    println!("Another function.");
    return 5; //或者直接写 5
}
```

在 rust 里面，函数可以在函数里面定义，也可以在函数外面定义。

函数里包含了语句和表达式。在rust语言里面。函数定义也是语句，所以函数可以在函数内部定义。

需要注意的是我们在省略 return 关键字的时候，不能带有分号，否则会报错

```bash
error[E0308]: mismatched types
 --> src/main.rs:7:24
  |
7 | fn plus_one(x: i32) -> i32 {
  |    --------            ^^^ expected `i32`, found `()`
  |    |
  |    implicitly returns `()` as its body has no tail or `return` expression
8 |     x + 1;
  |          - help: remove this semicolon to return this value
```

#### 4. 语句和表达式(Statements and Expressions)

函数体是由一些语句组成，可选地以表达式结尾。

##### 1. 语句

执行某些操作但不返回值的指令

###### 1. 赋值语句

```rust
let y = 6;
```

let 语句不能作为赋值语句的右值。

###### 2. 代码块

```rust
fn main() {
    let y = {
        let x = 3;
        x + 1
    };

    println!("The value of y is: {y}");
}
```

##### 2. 表达式

表达式求值为结果值。

### 四、注释(Comments)

#### 1. 代码注释

```rust
// 第一种注释

/** 第二种注释 */

/**
 * 多行注释
 * 多行注释
 */
```

#### 2. 文档注释

````rust
/// Adds one to the number given.
///
/// # Examples
///
/// ```
/// let x = add(1, 2);
///
/// ```

fn add(a: i32, b: i32) -> i32 {
    return a + b;
}

fn main() {
    println!("{}",add(2,3));
}
````

### 五、控制流(Control Flow)

#### 1. if 表达式

if 表达式 允许根据条件对代码进行分支选择，如果条件满足，则运行，否则不运行。

if 后面必须得更 bool 类型变量或表达式，否则将会报错

```rust
error[E0308]: mismatched types
 --> src/main.rs:4:8
  |
4 |     if number {
  |        ^^^^^^ expected `bool`, found integer
```

##### 1. if else 表达式

###### 1. 双分支结构

```rust
fn main() {
    let number = 3;

    if number < 5 {
        println!("condition was true");
    } else {
        println!("condition was false");
    }
}
```

###### 2. 多分枝结构

```rust
fn main() {
    let number = 6;

    if number % 4 == 0 {
        println!("number is divisible by 4");
    } else if number % 3 == 0 {
        println!("number is divisible by 3");
    } else if number % 2 == 0 {
        println!("number is divisible by 2");
    } else {
        println!("number is not divisible by 4, 3, or 2");
    }
}
```

##### 2. 在let语句中使用 if

在 let 语句右边可以使用 if 表达式，但是要求两个分支的值要是相同的类型，否则将会报错

```rust
fn main() {
    let condition = true;
    let number = if condition { 5 } else { 6 };

    println!("The value of number is: {number}");
}
```

#### 2. 循环(loops)

##### 1. loop 循环

###### 1. loop 死循环

```rust
fn main() {
    loop {
        println!("again!");
    }
}
```

###### 2. loop 循环返回值

```rust
fn main() {
    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 {
            break counter * 2;
        }
    };

    println!("The result is {result}");
}
```

###### 3. loop 标签结合break 来跳出指定循环

```rust
fn main() {
    let mut count = 0;
    'counting_up: loop {
        println!("count = {count}");
        let mut remaining = 10;

        loop {
            println!("remaining = {remaining}");
            if remaining == 9 {
                break;
            }
            if count == 2 {
                break 'counting_up;
            }
            remaining -= 1;
        }

        count += 1;
    }
    println!("End count = {count}");
}
```

#### 3. while 循环

##### 1. while 循环

```rust
fn main() {
    let mut number = 3;

    while number != 0 {
        println!("{number}!");

        number -= 1;
    }

    println!("LIFTOFF!!!");
}
```

##### 2. 使用 while 循环遍历数组

```rust
fn main() {
    let mut number = 3;

    while number != 0 {
        println!("{number}!");

        number -= 1;
    }

    println!("LIFTOFF!!!");
}
```

#### 4. for 循环

##### 1. 遍历序列

```rust
fn main() {
    for i in 1..11  {
        println!("{}", i);
    }
}
```

其中 1…11 是 Range 对象的定义形式，表示的是1-10 的序列；

```rust
fn main() {
    for number in (1..4).rev() {
        println!("{number}!");
    }
    println!("LIFTOFF!!!");
}
```

##### 2. 迭代器循环

```rust
fn main(){
    let fruits=["mango","apple","banana","litchi","watermelon"];
    for fruit in fruits.iter()
    {
      print!("{:?} ",fruit);
    }
}
```

##### 3. 数组遍历

```rust
fn main() {
    let a = [10, 20, 30, 40, 50];

    for element in a {
        println!("the value is: {element}");
    }
}
```
