# 实用程序类型

TypeScript 提供了多种实用程序类型来促进常见的类型转换。这些实用程序在全球范围内可用。

## `Awaited<Type>`

> 发布： [4.5](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html#the-awaited-type-and-promise-improvements)

这种类型旨在对函数`await`中的`async`操作或 s`.then()`上的方法进行建模 - 具体来说，是它们递归解开s`Promise`的方式。`Promise`

##### 例子

```ts
type A = Awaited<Promise<string>>; // type A = string

type B = Awaited<Promise<Promise<number>>>; // type B = number

type C = Awaited<boolean | Promise<number>>; // type C = number | boolean
```

## `Partial<Type>`

> 发布：
> [2.1](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#partial-readonly-record-and-pick)

构造一个类型，并将所有属性`Type`设置为可选。该实用程序将返回一个表示给定类型的所有子集的类型。

##### 例子

```ts
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return {...todo, ...fieldsToUpdate};
}

const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};

const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});
```

## `Required<Type>`

> 发布：
> [2.8](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#improved-control-over-mapped-type-modifiers)

`Type`构造一个由设置为 required 的所有属性组成的类型。的相反[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)。

##### 例子

```ts
interface Props {
  a?: number;
  b?: string;
}

const obj: Props = {a: 5};

const obj2: Required<Props> = {a: 5};
// Property 'b' is missing in type '{ a: number; }' but required in type 'Required<Props>'.
```

## `Readonly<Type>`

> 发布：
> [2.1](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#partial-readonly-record-and-pick)

构造一个类型，并将所有属性`Type`设置为`readonly`，这意味着构造类型的属性不能重新分配。

##### 例子

```ts
interface Todo {
  title: string;
}

const todo: Readonly<Todo> = {
  title: "Delete inactive users",
};

todo.title = "Hello"; // Cannot assign to 'title' because it is a read-only property.
```

该实用程序对于表示在运行时失败的赋值表达式非常有用（即，当尝试重新分配[冻结对象](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)的属性时）。

##### `Object.freeze`

```ts
function freeze<Type>(obj: Type): Readonly<Type>;
```

## `Record<Keys, Type>`

> 发布：
> [2.1](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#partial-readonly-record-and-pick)

构造一个对象类型，其属性键为`Keys`，属性值为`Type`。该实用程序可用于将一种类型的属性映射到另一种类型。

##### 例子

```ts
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

const cats: Record<CatName, CatInfo> = {
  miffy: {age: 10, breed: "Persian"},
  boris: {age: 5, breed: "Maine Coon"},
  mordred: {age: 16, breed: "British Shorthair"},
};

cats.boris; // const cats: Record<CatName, CatInfo>
```

## `Pick<Type, Keys>`

> 发布：
> [2.1](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#partial-readonly-record-and-pick)

通过从 中选取属性集`Keys`（字符串文字或字符串文字的并集）来构造类型`Type`。

##### 例子

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

todo; // const todo: TodoPreview
```

## `Omit<Type, Keys>`

> 发布：
> [3.5](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-5.html#the-omit-helper-type)

`Type`通过从中选取所有属性然后删除`Keys`（字符串文字或字符串文字的并集）来构造类型。的相反[`Pick`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)。

##### 例子

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};

todo; // const todo: TodoPreview

type TodoInfo = Omit<Todo, "completed" | "createdAt">;

const todoInfo: TodoInfo = {
  title: "Pick up kids",
  description: "Kindergarten closes at 5pm",
};

todoInfo; // const todoInfo: TodoInfo
```

## `Exclude<UnionType, ExcludedMembers>`

> 发布：
> [2.8](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types)

`UnionType`通过排除所有可分配给 的联合成员来构造类型`ExcludedMembers`。

##### 例子

```ts
type T0 = Exclude<"a" | "b" | "c", "a">; // type T0 = "b" | "c"

type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // type T1 = "c"

type T2 = Exclude<string | number | (() => void), Function>; // type T2 = string | number

type Shape = {kind: "circle"; radius: number} | {kind: "square"; x: number} | {kind: "triangle"; x: number; y: number};

type T3 = Exclude<Shape, {kind: "circle"}>;
/*
type T3 = {
    kind: "square";
    x: number;
} | {
    kind: "triangle";
    x: number;
    y: number;
}
*/
```

## `Extract<Type, Union>`

> 发布：
> [2.8](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types)

`Type`通过从可分配给 的所有联合成员中提取来构造类型`Union`。

##### 例子

```ts
type T0 = Extract<"a" | "b" | "c", "a" | "f">; // type T0 = "a"

type T1 = Extract<string | number | (() => void), Function>; // type T1 = () => void

type Shape = {kind: "circle"; radius: number} | {kind: "square"; x: number} | {kind: "triangle"; x: number; y: number};

type T2 = Extract<Shape, {kind: "circle"}>;
/*
type T2 = {
    kind: "circle";
    radius: number;
}
*/
```

## `NonNullable<Type>`

> 发布：
> [2.8](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types)

`null`通过排除和`undefined`from构造类型`Type`。

##### 例子

```ts
type T0 = NonNullable<string | number | undefined>; // type T0 = string | number

type T1 = NonNullable<string[] | null | undefined>; // type T1 = string[]
```

## `Parameters<Type>`

> 发布：
> [3.1](https://github.com/microsoft/TypeScript/pull/26243)

根据函数类型的参数中使用的类型构造元组类型`Type`。

##### 例子

```ts
declare function f1(arg: {a: number; b: string}): void;

type T0 = Parameters<() => string>; // type T0 = []

type T1 = Parameters<(s: string) => void>; // type T1 = [s: string]

type T2 = Parameters<<T>(arg: T) => T>; // type T2 = [arg: unknown]

type T3 = Parameters<typeof f1>;

/*
type T3 = [arg: {
  a: number;
  b: string;
}]
*/
type T4 = Parameters<any>;

type T4 = unknown[];
type T5 = Parameters<never>;

type T5 = never;
type T6 = Parameters<string>;
// Type 'string' does not satisfy the constraint '(...args: any) => any'.

type T6 = never;
type T7 = Parameters<Function>;
// Type 'Function' does not satisfy the constraint '(...args: any) => any'.
// Type 'Function' provides no match for the signature '(...args: any): any'.

type T7 = never;
```

## `ConstructorParameters<Type>`

> 发布：
> [3.1](https://github.com/microsoft/TypeScript/pull/26243)

从构造函数类型的类型构造元组或数组类型。它生成一个包含所有参数类型的元组类型（或者`never`如果`Type`不是函数则为该类型）。

##### 例子

```ts
type T0 = ConstructorParameters<ErrorConstructor>; // type T0 = [message?: string]

type T1 = ConstructorParameters<FunctionConstructor>; // type T1 = string[]

type T2 = ConstructorParameters<RegExpConstructor>; // type T2 = [pattern: string | RegExp, flags?: string]

class C {
  constructor(a: number, b: string) {}
}

type T3 = ConstructorParameters<typeof C>; // type T3 = [a: number, b: string]

type T4 = ConstructorParameters<any>; // type T4 = unknown[]

type T5 = ConstructorParameters<Function>;
// Type 'Function' does not satisfy the constraint 'abstract new (...args: any) => any'.
// Type 'Function' provides no match for the signature 'new (...args: any): any'.
// type T5 = never
```

## `ReturnType<Type>`

> 发布：
> [2.8](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types)

构造一个由 function 的返回类型组成的类型`Type`。

##### 例子

```ts
declare function f1(): {a: number; b: string};

type T0 = ReturnType<() => string>; // type T0 = string

type T1 = ReturnType<(s: string) => void>; // type T1 = void

type T2 = ReturnType<<T>() => T>; // type T2 = unknown

type T3 = ReturnType<<T extends U, U extends number[]>() => T>; // type T3 = number[]

type T4 = ReturnType<typeof f1>;
/*
type T4 = {
  a: number;
  b: string;
}
*/

type T5 = ReturnType<any>; // type T5 = any

type T6 = ReturnType<never>; // type T6 = never

type T7 = ReturnType<string>;
// Type 'string' does not satisfy the constraint '(...args: any) => any'.
// type T7 = any

type T8 = ReturnType<Function>;
// Type 'Function' does not satisfy the constraint '(...args: any) => any'.
// Type 'Function' provides no match for the signature '(...args: any): any'.
// type T8 = any
```

## `InstanceType<Type>`

> 发布：
> [2.8](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types)

构造一个由 中构造函数的实例类型组成的类型`Type`。

##### 例子

```ts
class C {
  x = 0;
  y = 0;
}

type T0 = InstanceType<typeof C>; // type T0 = C

type T1 = InstanceType<any>; // type T1 = any

type T2 = InstanceType<never>; // type T2 = never

type T3 = InstanceType<string>;
// Type 'string' does not satisfy the constraint 'abstract new (...args: any) => any'.
// type T3 = any

type T4 = InstanceType<Function>;
// Type 'Function' does not satisfy the constraint 'abstract new (...args: any) => any'.
// Type 'Function' provides no match for the signature 'new (...args: any): any'.
// type T4 = any
```

## `ThisParameterType<Type>`

> 发布：
> [3.3](https://github.com/microsoft/TypeScript/pull/28920)

提取函数类型的[this](https://www.typescriptlang.org/docs/handbook/functions.html#this-parameters)参数的类型，如果函数类型没有参数，则[提取未知](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type)`this`。

##### 例子

```ts
function toHex(this: Number) {
  return this.toString(16);
}

function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}
```

## `OmitThisParameter<Type>`

> 发布：
> [3.3](https://github.com/microsoft/TypeScript/pull/28920)

[`this`](https://www.typescriptlang.org/docs/handbook/functions.html#this-parameters)从 中删除参数`Type`。如果`Type`没有显式声明的`this`参数，则结果只是`Type`。`this`否则，将从 中创建一个不带参数的新函数类型`Type`。泛型被删除，只有最后一个重载签名被传播到新的函数类型中。

##### 例子

```ts
function toHex(this: Number) {
  return this.toString(16);
}

const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);

console.log(fiveToHex());
```

## `ThisType<Type>`

> 发布：
> [2.3](https://github.com/microsoft/TypeScript/pull/14141)

此实用程序不返回转换后的类型。相反，它充当上下文类型的标记[`this`](https://www.typescriptlang.org/docs/handbook/functions.html#this)。[`noImplicitThis`](https://www.typescriptlang.org/tsconfig#noImplicitThis)请注意，必须启用该标志才能使用此实用程序。

##### 例子

```ts
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return {...data, ...methods} as D & M;
}

let obj = makeObject({
  data: {x: 0, y: 0},
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    },
  },
});

obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);
```

在上面的示例中，`methods`参数 to 中的对象`makeObject`具有包含的上下文类型，因此对象内方法中的[this](https://www.typescriptlang.org/docs/handbook/functions.html#this)`ThisType<D & M>`类型为。请注意属性的类型如何同时成为推理目标和方法中类型的源。`methods``{ x: number, y: number } & { moveBy(dx: number, dy: number): void }``methods``this`

标记`ThisType<T>`接口只是在 中声明的一个空接口`lib.d.ts`。除了在对象字面量的上下文类型中被识别之外，该接口的行为就像任何空接口一样。

## 固有字符串操作类型

### `Uppercase<StringType>`

### `Lowercase<StringType>`

### `Capitalize<StringType>`

### `Uncapitalize<StringType>`

为了帮助围绕模板字符串文字进行字符串操作，TypeScript 包含一组可用于类型系统中的字符串操作的类型。[您可以在模板文字类型](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html#uppercasestringtype)文档中找到它们。

##### 在本页

- [等待<类型>](https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype)
- [部分<类型>](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)
- [必填<类型>](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype)
- [只读<类型>](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)
- [记录<键，类型>](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)
- [选择<类型，键>](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys)
- [省略<类型、键>](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)
- [排除](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludeuniontype-excludedmembers)
- [提取<类型，联合>](https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union)
- [不可空<类型>](https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype)
- [参数<类型>](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)
- [构造函数参数<类型>](https://www.typescriptlang.org/docs/handbook/utility-types.html#constructorparameterstype)
- [返回类型<类型>](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype)
- [实例类型<类型>](https://www.typescriptlang.org/docs/handbook/utility-types.html#instancetypetype)
- [此参数类型<类型>](https://www.typescriptlang.org/docs/handbook/utility-types.html#thisparametertypetype)
- [省略此参数<类型>](https://www.typescriptlang.org/docs/handbook/utility-types.html#omitthisparametertype)
- [此类型<类型>](https://www.typescriptlang.org/docs/handbook/utility-types.html#thistypetype)
- [固有字符串操作类型](https://www.typescriptlang.org/docs/handbook/utility-types.html#intrinsic-string-manipulation-types)
- [大写<字符串类型>](https://www.typescriptlang.org/docs/handbook/utility-types.html#uppercasestringtype)
- [小写<字符串类型>](https://www.typescriptlang.org/docs/handbook/utility-types.html#lowercasestringtype)
- [大写<字符串类型>](https://www.typescriptlang.org/docs/handbook/utility-types.html#capitalizestringtype)
- [取消大写](https://www.typescriptlang.org/docs/handbook/utility-types.html#uncapitalizestringtype)
