const UserService = require('../services/UserService');

async function register({ username, password, email }) {
  try {
    const user = await UserService.register({ username, password, email });
    return user;
  } catch (error) {
    throw new Error(`Failed to register user: ${error}`);
  }
}

async function login({ username, password }) {
  try {
    const user = await UserService.login({ username, password });
    return user;
  } catch (error) {
    throw new Error(`Failed to login user: ${error}`);
  }
}

async function logout(userId) {
  try {
    await UserService.logout(userId);
  } catch (error) {
    throw new Error(`Failed to logout user: ${error}`);
  }
}

module.exports = {
  register,
  login,
  logout,
};