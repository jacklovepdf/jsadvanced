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
2.1 js中只有一种数值型数据类型，就是双精度浮点型（64位）。


> 3.当心数据类型的隐式转换。


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
