# jsadvanced

The jsadvanced containing some tips, conclusions, best practices for your day to day workflow.
of course, we cannot miss graph and demos to demonstrate!

## Table of Contents

- [Process control statements-loop](#Process-control-statements-loop)
- [Es6 Generator](#Es6-Generator)
- [Several Solutions To Create Object](#Several-Solutions-To-Create-Object)
- [Variables Declaration](#var-let-const)

## Process control statements-loop

how to use loop statement more efficiently.

## Es6 Generator

```javascript

```
es6 generator

## Several Solutions To Create Object

组合继承模式
```javascript
    function SuperClass(name){
        this.name = name;
    }
    SuperClass.prototype = {
        constructor: SuperClass,
        sayName: function(){
            console.log(this.name);
        }
    };
    function SubClass(name, age){
        //借用父类构造函数
        SuperClass.call(this, name);
        this.age = age;
    }
    SubClass.prototype = {
        constructor: SubClass,

    };
    SubClass.prototype.sayAge = function(){
        console.log(this.age);
    };
    var SubObj = new SubClass("jacklin", 19);
```
<img src="./images/composite.png" height="300">

寄生组合继承模式
```javascript
    function SuperClass(name){
        this.name = name;
    }
    SuperClass.prototype = {
        constructor: SuperClass,
        sayName: function(){
            console.log(this.name);
        }
    };
    function SubClass(name, age){
        //借用父类构造函数
        SuperClass.call(this, name);
        this.age = age;
    }

    SubClass.prototype = Object.assign({}, SuperClass.prototype);
    SubClass.prototype.constructor = SubClass;

    SubClass.prototype.sayAge = function(){
        console.log(this.age);
    };
    var SubObj = new SubClass("jacklin", 19);
    console.log(SubObj);
```
<img src="./images/parasitic.png" height="300">

## Variables Declaration
    * var
    * let
    * const
var变量声明无论出现在代码的任何位置，都会在任何代码执行之前处理(var hoisting)。使用var语句声明的变量的*作用域*是*当前执行位置的上下文*：
一个函数的内部（声明在函数内）或者全局（声明在函数外）。

> **Best Practice**: 最好在作用域的最开始（函数或者全局代码的开头）声明变量。这样可以使变量的作用域变得清晰。

let允许你声明一个作用域被限制在块级中的变量、语句或者表达式。而var关键字声明的变量只能作用于全局或者整个函数块内。

在程序或者函数的顶层，let并不会像var一样在全局对象上创造一个属性，比如：
<img src="./images/var-let.png" height="150" width="500">

let 将会提升这个变量到语句块的顶部。然而，在这个语句块中，在变量声明之前引用这个变量会导致一个 ReferenceError的结果,
因为let变量 在"暂存死区" (从块的开始到声明这段).
<img src="./images/tempdead.png" height="150" width="500">

const声明并初始化一个只读的常量。常量拥有块作用域。常量的值不能通过再赋值改变，也不能再次声明。
这不意味着常量指向的值不可变，而是变量标识符的值只能赋值一次。
```javascript
    // 常量可以定义成对象
    const MY_OBJECT = {"key": "value"};
    // 重写对象一样会失败
    MY_OBJECT = {"OTHER_KEY": "value"};
    // 常量对象的属性是可以重写的
    MY_OBJECT.key = "otherValue";
```

## 深度赋值对象
