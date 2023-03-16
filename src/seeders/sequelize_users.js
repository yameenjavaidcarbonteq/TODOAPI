const {faker}  from'@faker-js/faker');
const User from'.@infrastructure/database/sequelize/sequelizeModels/user');

const seedUsers = async () => {
  // create an array of fake user objects
  const users = [];
  for (let i = 0; i < 10; i++) {
    users.push({
      id: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      isVerified: faker.datatype.boolean(),
      googleId: faker.datatype.uuid(),
      provider: 'local',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  // insert the fake users into the database
  try {
    await User.bulkCreate(users);
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
    seedUsers();
  })
  .catch((err) => logger.info(err));
