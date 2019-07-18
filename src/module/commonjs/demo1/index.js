// 执行index.js
// 结果为:
// 在 b.js 之中，a.done = false
// b.js 执行完毕
// 在 a.js 之中，b.done = true
// a.js 执行完毕
// both a and b module exec
// 结论:
// CommonJS 模块遇到循环加载时，返回的是当前已经执行的部分的值，而不是代码全部执行后的值，两者可能会有差异。
// CommonJS 的一个模块，就是一个脚本文件。require命令第一次加载该脚本，就会执行整个脚本，然后缓存该模块执行结果(拷贝), 
//      后面用到这个模块的时候，就会到exports属性上面取值。即使再次执行require命令，也不会再次执行该模块，而是到缓存之中取值。
const a = require('./a');
setTimeout(function(){
    const b = require('./b');
    console.log('both a and b module exec', b.done);
}, 500)

