# effective javascript

summary of effective javascript

## Table of Contents

- [Accustoming Yourself to Javascript](#accustoming-yourself-to-javascript)
- [Variable Scope](#variable-scope)
- [Working with Functions](#working-with-functions)
- [Object and Prototype](#object-and-prototype)
- [Arrays and Dictionary](#arrays-and-dictionary)
- [Library and API Design](#library-and-api-design)
- [Concurrency](#concurrency)

## Accustoming Yourself to Javascript

> 1.了解你使用的js版本。

1.1 总是在执行严格模式检查的环境中测试严格代码，尽量使用严格模式编写代码，并显示地将代码内容包裹在本地启用了严格模式的函数中；

(1) 启用程序的严格模式
```javascript
    "use strict"
    //...
    function(){
        //...
    }
```
(2) 启用函数的严格模式
```javascript
    //...
    function(){
        "use strict"
        //...
    }
```
(3) 最佳实践（现在模块系统在脚本链接的时候实现方式就是这样的）
```javascript
    // best practice
    (function(){
        "use strict"
        function f(){
            //......
        }
        //....
    })();
```
> **Note**: 由于"use strict"指令只有在脚本或者函数的顶部才能生效，导致实际项目开发过程中，由于链接多个模式不一致的文件可能导致一些没有启用严格模式的
文件（模块）启用了严格模式，从而引发潜在的兼容性问题。或者即使你自己保证在自己的编写所有代码都启用严格模式或者都没有启用严格模式，但是在多人协作的大型项目中或者引用外部库文件的场景中，
更本无法保证最终链接文件的运行模式。
.

> 2.理解js的浮点数。
（1）js中只有一种数值型数据类型，就是双精度浮点型（64位），但是浮点数却最存在一个致命的精度陷阱，一个有效的解决方案是尽可能的采用整数运算。
```javascript
    0.1 + 0.2 =
    0.30000000000000004
```
（2）对于位运算，首先会将操作数转化为32位整数，然后使用整数的位模式进行运算，最后将结果转化js标准的浮点数。

> 3.当心数据类型的隐式转换。

javascript中提供了6中数据类型，包括5中简单数据类型（或者称基本数据类型）(null、undefined、boolean、string以及number)和1中复杂数据类型object.

（1）算数运算
计算之前算术运算会尝试把操作数转化为数字类型，'＋'运算浮除外；
```javascript
    null -------------> 0
    undefined --------> NaN
    false/true -------> 0/1
    object -----------> 通过期valueOf方法转化为数字

    1 + null = 1;
    1 + false = 1;
    1 + true = 2;
    1 + undefined = NaN;
    1 + {valueOf: function(){return 3;}} = 4;
```
（2）位运算
计算之前算术运算会尝试把操作数转化为32位整数类型；

（3）＋运算符
＋运算符既重载了数字相加，又重载了字符串连接操作，当＋运算符两个操作数一个为字符串一个为数字类型时，＋运算符更偏爱进行字符串连接操作；
```javascript
    number(0) -------------> "0"
    undefined -------------> "undefined"
    false/true ------------> "false/true"
    object ----------------> 通过toString方法转化为字符串

    "aaa" + null = "aaanull";
    "aaa" + false = "aaafalse";
    "aaa" + true = "aaatrue";
    "aaa" + undefined = "aaaundefined";
    "aaa" + {toString: function(){return "bbb";}} = "aaabbb";
```

（4）真值运算（if || &&）
js中有7个假值: false、＋0、－0、null、undefined、NaN、"";

（5）关系运算
```javascript
    1、==运算浮
    null  == undefined                      true
    null/undefined == 其它非null/undefined   false
    原始类型(string/number/boolean)  ==  原始类型(string/number/boolean)      将原始类型转化为数字
    原始类型(string/number/boolean)  ==  Date对象                            将原始类型转化为数字，将Date转化为原始类型(优先使用toString，再尝试valueOf)
    原始类型(string/number/boolean)  ==  非Date对象                          将原始类型转化为数字，将非Date对象转化为原始类型(优先使用valueOf，再尝试toString)
    //使用==运算符会应用一套复杂的隐式强制转换规则，当比较不同类型的数据类型时，使用自己的显示强制转换方法使得程序的行为能给更好的被理解，尽量使用===运算符；
```

> **Note**: 隐式地强制类型转化虽然能够有时候带来遍历，但同时给有问题程序的调试带来了挑战，因为它掩盖了错误，使得错误更难诊断；
同时为了避免隐式地强制类型转化潜在的风险，应该尽量避免对混合类型使用==运算符；

> 4.了解分号插入的局限。


> 5.Think of Strings As Sequences of 16-Bit Code Units

现在unicode代码点由20位二进制数来表示，其中最初设定的$(2)^16个码点称为基本多文件平面，余下16个大小为$(2)^16d的范围被称为辅助平面；
unicode代码点与编码元素一一对应，utf-16中每个代码点需要一到两个16位的代码单元来表示，因此utf－16是可变长度的编码；
javascript字符串中是采用的是16位的代码单元，因此字符串方法和属性都是基于代码单元层级，而不是代码点层级，因此当字符串中包含辅助平面的代码点的时候
js字符串中该代码点表示长度为2；
```javascript
"💩".length = 2
```
> **Note**: 可以使用第三方库来编写可识别代码点的字符串操作；

<sup>[(back to table of contents)](#table-of-contents)</sup>

## Variable Scope

> 6.尽量用局部变量，而不是全局变量，使用全局对象来做平台特性检测。

**Note**: 故意创建全局变量是不好的风格，而意外的创建全局变量则是彻头彻尾的灾难，因此实际项目中推荐程序员使用lint等工具来检测程序中不好的风格和潜在的错误；

> 7.熟练使用闭包。

（1） definition
有权访问另一个函数作用域中变量的函数；

（2） feature
即时外部函数已经返回，闭包任然可以引用外部函数定义的变量；
```javascript
    function FullName(firstName){
        return function(lastName){
            return firstName + " " + lastName;
        };
    }
    var firtNameLin =  FullName("lin");
    firtNameLin("chengyong"); // lin chengyong
    firtNameLin("chengjia"); // lin chengjia
```
**Note**: 闭包会存储对外部变量的引用；闭包是js最优雅，最有表现力的特性之一；

闭包可以更新外部变量的值；因为闭包存储了外部变量的引用，而不是它们的副本，因此，它可以更新外部变量的值；
```javascript
    function Person(){
        var name = "";
        return{
            set: function(val){name=val;},
            get: function(){return name;}
        }
    }
    var person = Person();
    person.set("jack");
    person.get()// jack
```

> 8.理解变量的声明的提升。
javascript变量声明行为可以看成两部分，即声明和赋值，js会隐式地提升声明部分到函数的顶部，而将赋值留在原地；


**Note**: 在js的同一函数中，多次申明相同的变量是合法的；js中没有块级作用域的概念，es6中开始有块级作用域的概念；
js没有块级作用域额一个例外是try...catch语句将捕获的异常绑定到一个变量，该变量的作用域只是catch语句块；

> 9.使用匿名函数自执行创建局部作用域。

```javascript
    function wrapEle(a){
        var result = [];
        for(var i=0; i<a.length; i++){
            (function(j){
                result[0] = function(){return a[j];}
            })(i)
        }
        return result;
    }
```
> 10.命名函数表达式会导致很多问题，因此并不值得推荐使用；

> 11.始终避免将函数声明放在语句块或者子语句中；

> 12.关于eval函数的使用。
eval函数是一个难以置信强大和灵活的工具，它将其参数作为js程序来执行，但是该程序运行于调用着的局部作用域中；

```javascript
    var y = "global";
    function test(x){
        if(x){
            eval("var y = 'local';"); //dynamic binding,只有在eval函数被调用的时候var申明语句才执行；
        }
        return y;
    }
    test(true); // local;
    test(false); // global
```
**Note**: 要避免eval函数创建的变量污染调用着的作用域，如果eval函数可能创建全局变量，将此调用放在嵌套的函数中，以防止作用域的污染；

间接调用eval函数优于直接调用，因为直接调用可能导致函数作用域的污染，以及性能上的损耗；间接调用eval函数会使代码失去所有局部作用域的访问能力；

```javascript
    var y = "global";
    function test(){
        var y = "local";
        var f = eval;
        return f("y");
    }
    test(); // "global";
```
<sup>[(back to table of contents)](#table-of-contents)</sup>

## Working with Functions

> 13.函数应用场景

（1）函数的调用
    函数调用将全局对象（严格模式则为undefined）作为接受者，一般很少使用函数调用的语法调用方法；

（2）方法调用
    在方法调用中，是由调用表达式自身来确定this变量的绑定；绑定到this变量的对象被称为**调用接受者**。
    方法的本质是通过特定对象调用的函数；
```javascript
    var obj = {
        hello: function(){
            return "hello, " + this.username;
        },
        username: "jack"
    }
    var obj1 = {
        hello: obj.hello,
        username: "mark"
    }
    obj1.hello();//"hello, mark"
```
（3）构造函数
    构造函数将一个全新的对象作为函数的接受者，变返回这个新对象作为调用的结果；

（4）高阶函数
    高阶函数是将函数作为参数或者返回值的函数，将函数作为参数（通常称为回调函数）是一种特别强大的管用用法；

 **Note**: 需要引入高阶函数进行抽象的场景是出现重复或者相似的代码。

> 14.自定义函数的接受者
    函数或者方法的接受者（即绑定到this值）是由调用者的语法决定的。
    
（1）call
    函数对象内置的call方法自定义接受者；
```javascript
    var hasOwnProperty = {}.hasOwnProperty;
    var dict = {
        foo: 1
    };
    delete dict.hasOwnProperty;
    hasOwnProperty.call(dict, "foo"); //true
    hasOwnProperty.call(dict, "hasOwnProperty"); //false
```
 **Note**: 使用call方法可以调用在给定对象中不存在的方法；自定义高阶函数的时候，允许使用者给回调函数指定接受者；

（2）apply
    函数内置的apply方法与call方法类似，apply方法需要一个参数数组，然后将数组的每个元素作为调用的单独参数调用该函数；
```javascript
    function sum() {
       for(var i=0, sum=0; i<arguments.length; i++){
            sum +=arguments[i];
       }
       return sum;
    }
    var arr = [1,2,3,4,5];
    sum.apply(null,arr);//15
```

 **Note**: 使用apply方法可以指定一个参数数组来调用可变参数的函数；
 
 （3）this变量的隐式绑定问题
    关于回调函数的接受者的问题，不同api的回调函数默认值不同，因此为了保证回调函数正确执行，可以通过回调函数的bind方法，或者通过变量存储外部函数
    的this绑定的引用传给回调函数；

> 15.函数的参数arguments

（1）使用隐式的arguments对象实现可变参数的函数。

（2）永远不要修改arguments对象，可以使用[].slice.call(arguments)将arguments对象复制到一个真正的数组中再进行修改；

```javascript
    function sum() {
        console.log("arguments is a array:", Array.isArray(arguments))
       for(var i=0, sum=0; i<arguments.length; i++){
            sum +=arguments[i];
       }
       return sum;
    }
    sum();//arguments is a array: false;
```

（3）bind方法(es5)
    使用bind方法提取具有确定接受者的方法；
```javascript
    var buffer = {
        arr: [],
        add: function(s) {
          this.arr.push(s);
        }
    }
    var sources=["12","jack","mike"];
    //方法一
    sources.forEach(function(item) {
       buffer.add(item);//
    })
    //方法二
    sources.forEach(buffer.add.bind(buffer));//buffer.add.bind(buffer)创建了一个新函数，新函数的接受者绑定到buffer对象；
```

    使用bind方法实现函数的柯里化；
```javascript
    function simpleUrl(protocal, domain, path) {
      return protocal + "://" + domain + "/" + path;
    }
    var paths = ["www/index.html", "touch/index.html"];
    var urls = paths.map(function(path) {
       return simpleUrl("http","baidu.com",path);
    })
    //匿名函数中每次传给simpleUrl函数的前两个参数是固定的，只有第三个参数是变化的；
    //可以使用函数的bind方法来自动构建该匿名函数；
    var urls1 = paths.map(simpleUrl.bind(null,"http","baidu.com"));
    //函数柯里化，将函数与其参数的一个子集绑定的技术称为函数柯里化；
    //simpleUrl.bind除了绑定接受者参数的其余参数和提供给新函数的所有参数共同组成了传递给simpleUrl函数的参数；
```    

> 16.不要信赖函数的toString方法；

> 17.避免使用非标准的栈检查属性；

    避免使用非标准的arguments.callee和arguments.caller属性，因为它不具备良好的可移植性；

<sup>[(back to table of contents)](#table-of-contents)</sup>

## Object and Prototype

> 18.对象的创建

（1）理解prototype, getPrototypeOf 和_proto_之间的移动
    实例化对象的时候，prototype用于创建对象的原型；
    Object.getPrototypeOf(obj)是es5中用户获取对象原型的标准方法；
    obj._proto_是获取对象原型的非标准方法；
    //js中类是由一个构造函数和一个关联原型组成的设计模式；
    
```javascript
    //获取对象的原型，非es5环境，es5环境用Object.getPrototypeOf
    if(typeof Object.getPrototypeOf === "undefined"){
        Object.getPrototypeOf = function(obj) {
            var t = typeof obj;
            if(obj && (t === "object" || t === "function")){
                 return obj.__proto__;
            }else {
                throw new TypeError("not a object");
            }
        }
    }
```
    
**Note**: __proto__属性会污染所有对象，因此会导致大量的bug，应该禁止使用，同时应该禁止修改__proto__属性；

（2）实例属性和原型属性
    优先将方法存储在实例对象的原型中，避免每个实例对象都有一份方法的副本，从而占用更多的内存；
    
（3）使用闭包存储私有数据
    js中对象并没有鼓励信息隐藏，所有的属性都可以很容易的访问；但是对于一些数据安全要求就高的应用来说，需要一些信息隐藏的机制来确保应用的安全。
    js为信息隐藏提供来一种非常可靠的机制－闭包；
    
```javascript
    function User(age) {
        this.getAge = function() {
            return age;
        };
    }
    var user1 = new User(19);
    user1.getAge();//19
```

**Note**: 该实现是通过方法中引用变量的方式引用age，而不是通过this属性的方式引用；并且User实例中根本不包含任何实例属性，
因此外部变量根本不能直接访问实例中的变量；缺点是由于将方法存储在实例中，导致方法副本的扩散。

（4）将方法存储原型中优于存储在实例对象中；

> 19.原型及原型链（继承）

（1）借用父类构造函数
```javascript
    function Base(age) {
        this.age = age;
    }
    function SubClass(age, name) {
        Base.call(this, age);
        this.name = name; 
    }
    instance1 = new SubClass(12,"jack");
    console.log("instance1=======>", instance1);
```
**Note**: 通过借用父类构造函数的方式将父类的实例属性添加到子类中；

（2）引用父类的原型
```javascript
    //Object.create()的兼容写法
    if(typeof Object.create === "undefined"){
        Object.create = function(prototype) {
            function C() {}
            C.prototype = prototype;
            return new C();
        }
    } 
    function Base(age) {
        this.age = age;
    }
    function SubClass(age, name) {
        Base.call(this, age);
        this.name = name; 
    }
    SubClass.prototype = Object.create(Base.prototype);//继承父类的原型
```

**Note**: 通过Object.create或者Object.assign创建子类的原型对象，避免调用父类的构造函数；

（3）对象的创建与继承（最佳实践）

```javascript
    //基类构造函数
    function SuperClass(name){
            this.name = name;
    }
    //基类原型，原型复写的方式，需要指定constructor指向
    SuperClass.prototype = {
        constructor: SuperClass,
        sayName: function(){
            console.log(this.name);
        }
    };
    //子类
    function SubClass(name, age){
        //constructor stealing, inherit instance property of SuperClass
        SuperClass.call(this, name);
        this.age = age;
    }
    //inherit prototype property of SuperClass
    // es6 Object.assign
    // SubClass.prototype = Object.assign({}, SuperClass.prototype);
    // es5 Object.create
    SubClass.prototype = Object.create(SuperClass.prototype);
    SubClass.prototype.constructor = SubClass;

    SubClass.prototype.sayAge = function(){
        console.log(this.age);
    };
    var SubObj = new SubClass("jacklin", 19);
    console.log(SubObj);
```


<sup>[(back to table of contents)](#table-of-contents)</sup>

## Arrays and Dictionary



<sup>[(back to table of contents)](#table-of-contents)</sup>

## Library and API Design



<sup>[(back to table of contents)](#table-of-contents)</sup>

## Concurrency

<sup>[(back to table of contents)](#table-of-contents)</sup>
