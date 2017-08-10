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
    ==运算浮
    null  == undefined                      true
    null/undefined == 其它非null/undefined   false
    原始类型(string/number/boolean)  ==  原始类型(string/number/boolean)      将原始类型转化为数字
    原始类型(string/number/boolean)  ==  Date对象                            将原始类型转化为数字，将Date转化为原始类型(优先使用toString，再尝试valueOf)
    原始类型(string/number/boolean)  ==  非Date对象                          将原始类型转化为数字，将非Date对象转化为原始类型(优先使用valueOf，再尝试toString)
    //使用==运算符会应用一套复杂的隐式强制转换规则，当比较不同类型的数据类型时，使用自己的显示强制转换方法使得程序的行为能给更好的被理解，尽量使用===运算符；
```

> **Note**: 隐式地强制类型转化虽然能够有时候带来遍历，但同时给有问题程序的调试带来了挑战，因为它掩盖了错误，使得错误更难诊断；
同时为了避免隐式地强制类型转化潜在的风险，应该尽量避免对混合类型使用 ＝＝ 运算浮

> 4.了解分号插入的局限。



> 5.Think of Strings As Sequences of 16-Bit Code Units




<sup>[(back to table of contents)](#table-of-contents)</sup>

## Variable Scope

> 6.尽量用局部变量，而不是全局变量。



> 7.熟练使用闭包。



> 8.理解变量的声明的提升。



> 9.关于eval函数的使用。



> 10.


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
