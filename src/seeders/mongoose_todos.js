const mongoose = require ('mongoose');
const Todo = require ('../infrastructure/database/mongoose/mongooseModels/todo');
const {faker}  = require ('@faker-js/faker');

const seedTodos = async () => {
  // create an array of fake todo objects
  const todos = [];
  for (let i = 0; i < 10; i++) {
    todos.push({
      title: faker.lorem.words(),
      description: faker.lorem.sentences(),
      status: faker.helpers.arrayElement(['pending', 'in progress', 'completed']),
      id: faker.datatype.uuid(),
      userId: faker.datatype.uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // insert the fake todos into the database
  try {
    await Todo.create(todos);
    logger.info('Seed data created successfully!');
  } catch (err) {
    logger.info('Error creating seed data:', err);
  }
};

// connect to the database and call the seed function
mongoose
  .connect('mongodb://localhost:27017/todoapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('Connected to database!');
    seedTodos();
  })
  .catch((err) => logger.info(err));
