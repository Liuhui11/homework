interface Person {
    firstName: string;
    lastName: string;
  }
  function greeting(person: Person) {
    return 'Hello, ' + person.firstName + ' ' + person.lastName;
  }
  const user = {firstName1: 'Jane', lastName: 'User'};
  console.log(user);
  console.log(greeting(user));