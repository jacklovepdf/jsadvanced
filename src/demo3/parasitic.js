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