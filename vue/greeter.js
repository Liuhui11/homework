function greeting(person) {
    return 'Hello, ' + person.firstName + ' ' + person.lastName;
}
var user = { firstName1: 'Jane', lastName: 'User' };
console.log(user);
console.log(greeting(user));
