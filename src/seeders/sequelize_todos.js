const {faker}  from'@faker-js/faker');
const Todo from'.@infrastructure/database/sequelize/sequelizeModels/todo');
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
    await Todo.bulkCreate(todos);
    logger.info('Seed data created successfully!');
  } catch (err) {
    logger.info('Error creating seed data:', err);
  }
};

// synchronize the model with the database and call the seed function
sequelize
  .sync({ force: true })
  .then(() => {
    logger.info('Connected to database!');
    seedTodos();
  })
  .catch((err) => logger.info(err));
