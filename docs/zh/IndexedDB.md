# IndexedDB

[简介](http://www.flydean.com/indexeddb-kickoff/#简介)[IndexedDB 简介](http://www.flydean.com/indexeddb-kickoff/#IndexedDB简介)[IndexedDB 的使用](http://www.flydean.com/indexeddb-kickoff/#IndexedDB的使用)

## 简介

IndexedDB 是一种在浏览器端存储数据的方式。既然称之为 DB，是因为它丰富了客户端的查询方式，并且因为是本地存储，可以有效的减少网络对页面数据的影响。

有了 IndexedDB，浏览器可以存储更多的数据，从而丰富了浏览器端的应用类型。

## IndexedDB 简介

IndexedDB 和传统的关系型数据不同的是，它是一个 key-value 型的数据库。

value 可以是复杂的结构体对象，key 可以是对象的某些属性值也可以是其他的对象（包括二进制对象）。你可以使用对象中的任何属性做为 index，以加快查找。

IndexedDB 是自带 transaction 的，所有的数据库操作都会绑定到特定的事务上，并且这些事务是自动提交了，IndexedDB 并不支持手动提交事务。

IndexedDB API 大部分都是异步的，在使用异步方法的时候，API 不会立马返回要查询的数据，而是返回一个 callback。

异步 API 的本质是向数据库发送一个操作请求，当操作完成的时候，会收到一个 DOM event，通过该 event，我们会知道操作是否成功，并且获得操作的结果。

IndexedDB 是一种 NoSQL 数据库，和关系型数据库不同的是，IndexedDB 是面向对象的，它存储的是 Javascript 对象。

IndexedDB 还有一个很重要的特点是其同源策略，每个源都会关联到不同的数据库集合，不同源是不允许访问其他源的数据库，从而保证了 IndexedDB 的安全性。

## IndexedDB 的使用

这一节，我们将会以具体的例子来讲解如何使用 IndexedDB。

## IndexedDB 的浏览器支持

不同的浏览器对于 IndexedDB 有不同的实现，正常来说，我们可以使用 window.indexedDB 来获取到浏览器的 indexedDB 对象。但是对于某些浏览器来说，还没有使用标准的 window.indexedDB，而是用带前缀的实现。

所以我们在使用过程中通常需要进行判断和转换：

```js
// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)
```

上面我们从 window 获取了 indexedDB，IDBTransaction 和 IDBKeyRange 三个对象。

其中 indexedDB 表示的是数据库的连接。IDBTransaction 表示的是 transaction，而 IDBKeyRange 则是用从数据库的某个特定 key range 中取出数据。

但是，通常来说带前缀的实现一般都是不稳定的，所以我们通常不建议在正式环境中使用，所以如果不支持标准表达式的话，需要直接报错：

```js
if (!window.indexedDB) {
  console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}
```

## 创建 IndexedDB

要使用 IndexedDB，我们首先需要 open it：

```js
// Let us open our database
var request = window.indexedDB.open("MyTestDatabase", 3);
```

open 方法返回一个 IDBOpenDBRequest 对象，同时这是一个异步操作，open 操作并不会立马打开数据库或者开启事务，我们可以通过监听 request 的事件来进行相应的处理。

open 方法传入两个参数，第一个参数是数据库的名字，第二个参数是数据库的版本号。

当你创建一个新的数据库或者升级一个现有的数据库版本的时候，将会触发一个 onupgradeneeded 事件，并在事件中传入 IDBVersionChangeEvent，我们可以通过 event.target.result 来获取到 IDBDatabase 对象，然后通过这个对象来进行数据库的版本升级操作。如下所示：

```js
// This event is only implemented in recent browsers
request.onupgradeneeded = function (event) {
  // Save the IDBDatabase interface
  var db = event.target.result;

  // Create an objectStore for this database
  var objectStore = db.createObjectStore("name", {keyPath: "myKey"});
};
```

注意，这里的版本号是一个整数。如果你传入一个 float，那么将会对该 float 进行取整操作。

有了 request,我们可以通过监听 onerror 或者 onsuccess 事件来进行相应的处理。

```js
var db;
var request = indexedDB.open("MyTestDatabase");
request.onerror = function (event) {
  console.log("Why didn't you allow my web app to use IndexedDB?!");
};
request.onsuccess = function (event) {
  db = event.target.result;
};
```

拿到 db 对象之后，我们可以设置全局的异常处理：

```js
db.onerror = function (event) {
  // Generic error handler for all errors targeted at this database's
  // requests!
  console.error("Database error: " + event.target.errorCode);
};
```

IndexedDB 中的 table 叫做 object stores，和关系型数据库中的 table 一样，object stores 中的每一个对象都和一个 key 相关联，和 key 相关的有两个概念 key path 和 key generator.

如果存储的是 javascript Object 对象，那么可以指定该对象中的某一个属性作为 key path，那么这个属性将会被作为 key。

如果没有指定 key path，那么存储的 Object 可以是任何对象，甚至是基础类型比如数字和 String。

而 key generator 就是 key 的生成器。

假如我们想要存储这样的数据：

```js
// This is what our customer data looks like.
const customerData = [
  {ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com"},
  {ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org"},
];
```

看一下对应的数据库操作是怎么样的：

```js
const dbName = "the_name";

var request = indexedDB.open(dbName, 2);

request.onerror = function (event) {
  // Handle errors.
};
request.onupgradeneeded = function (event) {
  var db = event.target.result;

  // Create an objectStore to hold information about our customers. We're
  // going to use "ssn" as our key path because it's guaranteed to be
  // unique - or at least that's what I was told during the kickoff meeting.
  var objectStore = db.createObjectStore("customers", {keyPath: "ssn"});

  // Create an index to search customers by name. We may have duplicates
  // so we can't use a unique index.
  objectStore.createIndex("name", "name", {unique: false});

  // Create an index to search customers by email. We want to ensure that
  // no two customers have the same email, so use a unique index.
  objectStore.createIndex("email", "email", {unique: true});

  // Use transaction oncomplete to make sure the objectStore creation is
  // finished before adding data into it.
  objectStore.transaction.oncomplete = function (event) {
    // Store values in the newly created objectStore.
    var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
    customerData.forEach(function (customer) {
      customerObjectStore.add(customer);
    });
  };
};
```

我们需要在 onupgradeneeded 事件中处理所有的 schema 相关的操作。

首先使用 db.createObjectStore 创建了一个 customers 的 ObjectStore，并且使用了对象的 keypath 作为 key。

除了 key 之外，我们创建了两个 index，以提高查询速度。

最后我们监听 transaction.oncomplete 事件，并在里面加入存储 object 的操作。

上面的代码中，我们使用了 keyPath 作为 key。

下面是一个使用 key Generator 的例子：

```js
var objStore = db.createObjectStore("names", {autoIncrement: true});
```

## indexdb 中的 CURD

indexedDB 的所有操作都需要在事务中，我们看一个开启事务的操作：

```js
var transaction = db.transaction(["customers"], "readwrite");
```

上面的例子中使用 readwrite 来操作 customers ObjectStore。

transaction 接收两个参数，第一个参数是一个数组，数组中是这个 trans 中将会处理的 ObjectStores，第二个参数是处理的模式。

有了 transaction 之后，我们可以监听事务的 complete 和 error 操作，然后就可以进行 add 操作了：

```js
// Do something when all the data is added to the database.
transaction.oncomplete = function (event) {
  console.log("All done!");
};

transaction.onerror = function (event) {
  // Don't forget to handle errors!
};

var objectStore = transaction.objectStore("customers");
customerData.forEach(function (customer) {
  var request = objectStore.add(customer);
  request.onsuccess = function (event) {
    // event.target.result === customer.ssn;
  };
});
```

上面的例子中，我们使用了 add 方法，add 的前提是数据库中并不存在相同 key 的对象。除了 add 方法之外，我们还可以使用 put 方法，put 方法主要用来进行更新操作。

再看一个删除的操作：

```js
var request = db.transaction(["customers"], "readwrite").objectStore("customers").delete("444-44-4444");
request.onsuccess = function (event) {
  // It's gone!
};
```

现在我们的数据库已经有了数据，我们看下怎么进行查询：

```js
var transaction = db.transaction(["customers"]);
var objectStore = transaction.objectStore("customers");
var request = objectStore.get("444-44-4444");
request.onerror = function(event) {
  // Handle errors!
};
request.onsuccess = function(event) {
  // Do something with the request.result!
  console.log("Name for SSN 444-44-4444 is " + request.result.name);
```

这里，我们直接使用了 db.transaction，默认情况下是 readonly 模式的。

下面是一个更新的例子：

```js
var objectStore = db.transaction(["customers"], "readwrite").objectStore("customers");
var request = objectStore.get("444-44-4444");
request.onerror = function (event) {
  // Handle errors!
};
request.onsuccess = function (event) {
  // Get the old value that we want to update
  var data = event.target.result;

  // update the value(s) in the object that you want to change
  data.age = 42;

  // Put this updated object back into the database.
  var requestUpdate = objectStore.put(data);
  requestUpdate.onerror = function (event) {
    // Do something with the error
  };
  requestUpdate.onsuccess = function (event) {
    // Success - the data is updated!
  };
};
```

更新我们使用的是 put 方法。

## 使用游标 cursor

indexedDB 支持游标操作，我们可以使用 cursor 来遍历 objectStore 的数据：

```js
var objectStore = db.transaction("customers").objectStore("customers");

objectStore.openCursor().onsuccess = function (event) {
  var cursor = event.target.result;
  if (cursor) {
    console.log("Name for SSN " + cursor.key + " is " + cursor.value.name);
    cursor.continue();
  } else {
    console.log("No more entries!");
  }
};
```

openCursor 可以接受多个参数，第一个参数可以接受 key 的查询范围，第二个参数用来指定遍历的方向。如果两个参数都为空的话，默认是所有的数据的以升序的顺序遍历。

如果想遍历下一个游标，则可以调用 cursor.continue。

我们看一下两个参数的游标使用：

```js
// Only match "Donna"
var singleKeyRange = IDBKeyRange.only("Donna");

// Match anything past "Bill", including "Bill"
var lowerBoundKeyRange = IDBKeyRange.lowerBound("Bill");

// Match anything past "Bill", but don't include "Bill"
var lowerBoundOpenKeyRange = IDBKeyRange.lowerBound("Bill", true);

// Match anything up to, but not including, "Donna"
var upperBoundOpenKeyRange = IDBKeyRange.upperBound("Donna", true);

// Match anything between "Bill" and "Donna", but not including "Donna"
var boundKeyRange = IDBKeyRange.bound("Bill", "Donna", false, true);

// To use one of the key ranges, pass it in as the first argument of openCursor()/openKeyCursor()
index.openCursor(boundKeyRange, "prev").onsuccess = function (event) {
  var cursor = event.target.result;
  if (cursor) {
    // Do something with the matches.
    cursor.continue();
  }
};
```

除了 openCursor，我们还可以通过使用 openKeyCursor 来遍历 KeyCursor：

```js
// Using a normal cursor to grab whole customer record objects
index.openCursor().onsuccess = function (event) {
  var cursor = event.target.result;
  if (cursor) {
    // cursor.key is a name, like "Bill", and cursor.value is the whole object.
    console.log("Name: " + cursor.key + ", SSN: " + cursor.value.ssn + ", email: " + cursor.value.email);
    cursor.continue();
  }
};

// Using a key cursor to grab customer record object keys
index.openKeyCursor().onsuccess = function (event) {
  var cursor = event.target.result;
  if (cursor) {
    // cursor.key is a name, like "Bill", and cursor.value is the SSN.
    // No way to directly get the rest of the stored object.
    console.log("Name: " + cursor.key + ", SSN: " + cursor.primaryKey);
    cursor.continue();
  }
};
```

除此之外，我们还可以直接通过 index 来进行查询：

```js
var index = objectStore.index("name");

index.get("Donna").onsuccess = function (event) {
  console.log("Donna's SSN is " + event.target.result.ssn);
};
```

要使用 index 的前提就是需要在 request.onupgradeneeded 中创建 index。

> 本文作者：flydean 程序那些事
>
> 本文链接：<http://www.flydean.com/indexeddb-kickoff/>
>
> 本文来源：flydean 的博客
>
> 欢迎关注我的公众号:「程序那些事」最通俗的解读，最深刻的干货，最简洁的教程，众多你不知道的小技巧等你来发现！
