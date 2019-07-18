let a = require('./a');

console.log('a=====>', JSON.stringify(a.age))

a.updatePerson(2);

console.log('a=====>', JSON.stringify(a.age))

// a=====> 10
// a=====> 10