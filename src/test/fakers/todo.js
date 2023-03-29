const {faker}  = require ('@faker-js/faker');
todo = {
  title: faker.lorem.words(),
  description: faker.lorem.paragraph(),
  status: faker.helpers.arrayElement(['pending', 'in progress', 'completed'])
};
module.exports = todo;