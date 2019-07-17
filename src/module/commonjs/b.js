exports.done = false;
var a = require('./a.js');
console.log('在 b.js 之中，a.done = %j', a.done);
setTimeout(function(){
    console.log('b.js模块输出的值发生了改变');
    exports.done = 'jack';
}, 100);
exports.done = true;
console.log('b.js 执行完毕');