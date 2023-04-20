const usersRouter = require('express').Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

usersRouter.patch('/me/avatar', updateAvatar);
usersRouter.patch('/me', updateUser);
usersRouter.get('/:userId', getUserById);
usersRouter.get('/', getAllUsers);
usersRouter.post('/', createUser);

module.exports = usersRouter;
