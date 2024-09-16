
const {faker}  = require ('@faker-js/faker');
user = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};
module.exports = user;