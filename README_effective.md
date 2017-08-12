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



<sup>[(back to table of contents)](#table-of-contents)</sup>

## Object and Prototype


<sup>[(back to table of contents)](#table-of-contents)</sup>

## Arrays and Dictionary



<sup>[(back to table of contents)](#table-of-contents)</sup>

## Library and API Design



<sup>[(back to table of contents)](#table-of-contents)</sup>

## Concurrency

<sup>[(back to table of contents)](#table-of-contents)</sup>
